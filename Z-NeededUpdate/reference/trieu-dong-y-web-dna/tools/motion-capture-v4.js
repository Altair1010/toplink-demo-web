/* Motion Capture — Motion Graph Engine v4
 * Trích xuất ĐẶC TẢ chuyển động (không phải ảnh chụp trạng thái) từ một SITE đang chạy,
 * rồi phát ra graph + design token + recipe code để dựng lại.
 *
 *   MotionCapture.crawl()                    // quét cả site: tự tìm route, mỗi route một iframe
 *   MotionCapture.crawl({ maxRoutes: 10 })   // nới số trang
 *   MotionCapture.run()                      // chỉ quét document hiện tại
 *   MotionCapture.arm()                      // ghi cả entrance thật: đặt cờ rồi reload
 *
 * Chỉ dùng trên trang bạn sở hữu hoặc được phép kiểm tra.
 *
 * Khác biệt so với v3:
 *   - Ngữ cảnh thay được: engine chạy được trên window của iframe, không chỉ window hiện tại
 *     -> crawl được /about, /tinh-nang, /bang-gia... trong MỘT phiên console, không mất state.
 *   - Gộp trùng toàn cục: motion giống nhau trên nhiều trang (header/footer/nav) chỉ ghi một lần.
 *   - Serializer nén dòng: object lá nằm gọn một dòng, mảng nguyên thuỷ gói nhiều phần tử một dòng.
 *   - Ngân sách dòng: tự hạ mức chi tiết cho tới khi file nằm dưới maxOutputLines.
 *
 * Kiến trúc:
 *   1. Toán thuần   — decompose ma trận, khớp cubic-bezier, suy ngược spring, gom stagger, cụm token
 *   2. Ngữ cảnh+DOM — selector ổn định, kênh số hoá, chuyển đổi window đích
 *   3. Cấy hook     — Element.animate / IntersectionObserver / MutationObserver
 *   4. Bộ lấy mẫu   — rAF, phân giải ~16ms
 *   5. Bộ khám phá  — scroll sweep, dò ghép nối, tab lồng, hover, phát lại entrance
 *   6. Tổng hợp     — motion spec, gộp trùng, token, graph, recipe
 *   7. Bộ crawl     — tìm route, nạp từng route vào iframe, hợp nhất báo cáo
 */
(function motionCaptureFactory(bootWindow) {
  'use strict';

  const VERSION = '4.0.0';
  const DANGEROUS = /\b(delete|remove|erase|logout|sign\s*out|buy|purchase|pay|checkout|submit|send|publish|confirm|unsubscribe|xóa|xoá|đăng\s*xuất|mua|thanh\s*toán|gửi|đặt\s*hàng)\b/i;

  /* ==========================================================================
   * 1. TOÁN THUẦN — không chạm DOM, test được độc lập
   * ========================================================================== */

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function round(value, digits = 2) {
    const scale = 10 ** digits;
    const number = Number(value);
    if (!Number.isFinite(number)) return 0;
    return Math.round(number * scale) / scale;
  }

  function median(values) {
    if (!values.length) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
  }

  function parseTimeList(value) {
    return String(value || '').split(',').map((part) => {
      const text = part.trim();
      const number = Number.parseFloat(text) || 0;
      return text.endsWith('ms') ? number : number * 1000;
    });
  }

  const IDENTITY_MATRIX = Object.freeze({
    translateX: 0, translateY: 0, translateZ: 0,
    scaleX: 1, scaleY: 1, rotateDeg: 0, skewXDeg: 0,
    is3d: false, identity: true,
  });

  /* getComputedStyle trả `matrix(1,0,0,1,0,40)` — vô dụng để dựng lại.
   * Tách ngược về translate/scale/rotate/skew mà con người và framework dùng. */
  function decomposeMatrix(transform) {
    const text = String(transform || 'none').trim();
    if (!text || text === 'none') return { ...IDENTITY_MATRIX };
    const match = text.match(/^matrix(3d)?\(([^)]+)\)$/);
    if (!match) return { ...IDENTITY_MATRIX, unparsed: text };
    const values = match[2].split(',').map((part) => Number.parseFloat(part));
    if (values.some((value) => !Number.isFinite(value))) return { ...IDENTITY_MATRIX, unparsed: text };

    let a; let b; let c; let d; let translateX; let translateY;
    let translateZ = 0;
    const is3d = Boolean(match[1]);
    if (is3d) {
      if (values.length < 16) return { ...IDENTITY_MATRIX, unparsed: text };
      [a, b] = [values[0], values[1]];
      [c, d] = [values[4], values[5]];
      translateX = values[12];
      translateY = values[13];
      translateZ = values[14];
    } else {
      if (values.length < 6) return { ...IDENTITY_MATRIX, unparsed: text };
      [a, b, c, d, translateX, translateY] = values;
    }

    let scaleX = Math.hypot(a, b);
    let normalA = a; let normalB = b;
    if (scaleX) { normalA /= scaleX; normalB /= scaleX; }
    let shear = normalA * c + normalB * d;
    let normalC = c - normalA * shear;
    let normalD = d - normalB * shear;
    let scaleY = Math.hypot(normalC, normalD);
    if (scaleY) { normalC /= scaleY; normalD /= scaleY; shear /= scaleY; }
    if (normalA * normalD - normalB * normalC < 0) {
      normalA = -normalA; normalB = -normalB;
      scaleX = -scaleX;
    }

    return {
      translateX: round(translateX, 2),
      translateY: round(translateY, 2),
      translateZ: round(translateZ, 2),
      scaleX: round(scaleX, 4),
      scaleY: round(scaleY, 4),
      rotateDeg: round(Math.atan2(normalB, normalA) * (180 / Math.PI), 2),
      skewXDeg: round(Math.atan(shear) * (180 / Math.PI), 2),
      is3d,
      identity: false,
    };
  }

  function parseFilterBlur(filter) {
    const match = String(filter || '').match(/blur\(([-\d.]+)px\)/);
    return match ? Number.parseFloat(match[1]) || 0 : 0;
  }

  function bezierY(x1, y1, x2, y2, x) {
    const cx = 3 * x1;
    const bx = 3 * (x2 - x1) - cx;
    const ax = 1 - cx - bx;
    const cy = 3 * y1;
    const by = 3 * (y2 - y1) - cy;
    const ay = 1 - cy - by;
    let t = clamp(x, 0, 1);
    for (let iteration = 0; iteration < 10; iteration += 1) {
      const currentX = ((ax * t + bx) * t + cx) * t - x;
      if (Math.abs(currentX) < 1e-6) break;
      const derivative = (3 * ax * t + 2 * bx) * t + cx;
      if (Math.abs(derivative) < 1e-6) break;
      t = clamp(t - currentX / derivative, 0, 1);
    }
    return ((ay * t + by) * t + cy) * t;
  }

  function bezierRmse(params, samples) {
    let sum = 0;
    for (const sample of samples) {
      const delta = bezierY(params[0], params[1], params[2], params[3], sample.x) - sample.y;
      sum += delta * delta;
    }
    return Math.sqrt(sum / samples.length);
  }

  /* Lưới thô rồi tinh chỉnh toạ độ. Nhanh (~25k lần đánh giá), đủ chính xác cho 4 tham số. */
  function fitCubicBezier(samples) {
    if (!samples || samples.length < 4) return { params: [0.25, 0.1, 0.25, 1], rmse: 1 };
    let best = [0.25, 0.1, 0.25, 1];
    let bestError = bezierRmse(best, samples);
    for (let x1 = 0; x1 <= 1.0001; x1 += 0.25) {
      for (let y1 = -0.2; y1 <= 1.2001; y1 += 0.35) {
        for (let x2 = 0; x2 <= 1.0001; x2 += 0.25) {
          for (let y2 = -0.2; y2 <= 1.2001; y2 += 0.35) {
            const candidate = [x1, y1, x2, y2];
            const error = bezierRmse(candidate, samples);
            if (error < bestError) { bestError = error; best = candidate; }
          }
        }
      }
    }
    let step = 0.12;
    for (let pass = 0; pass < 8 && step > 0.002; pass += 1) {
      let improved = false;
      for (let axis = 0; axis < 4; axis += 1) {
        for (const direction of [-1, 1]) {
          const candidate = best.slice();
          candidate[axis] += direction * step;
          if (axis % 2 === 0) candidate[axis] = clamp(candidate[axis], 0, 1);
          const error = bezierRmse(candidate, samples);
          if (error < bestError) { bestError = error; best = candidate; improved = true; }
        }
      }
      if (!improved) step /= 2;
    }
    return { params: best.map((value) => round(value, 3)), rmse: round(bestError, 4) };
  }

  const NAMED_EASINGS = Object.freeze({
    linear: [0, 0, 1, 1],
    ease: [0.25, 0.1, 0.25, 1],
    'ease-in': [0.42, 0, 1, 1],
    'ease-out': [0, 0, 0.58, 1],
    'ease-in-out': [0.42, 0, 0.58, 1],
    easeInQuad: [0.11, 0, 0.5, 0], easeOutQuad: [0.5, 1, 0.89, 1], easeInOutQuad: [0.45, 0, 0.55, 1],
    easeInCubic: [0.32, 0, 0.67, 0], easeOutCubic: [0.33, 1, 0.68, 1], easeInOutCubic: [0.65, 0, 0.35, 1],
    easeInQuart: [0.5, 0, 0.75, 0], easeOutQuart: [0.25, 1, 0.5, 1], easeInOutQuart: [0.76, 0, 0.24, 1],
    easeInQuint: [0.64, 0, 0.78, 0], easeOutQuint: [0.22, 1, 0.36, 1], easeInOutQuint: [0.83, 0, 0.17, 1],
    easeInExpo: [0.7, 0, 0.84, 0], easeOutExpo: [0.16, 1, 0.3, 1], easeInOutExpo: [0.87, 0, 0.13, 1],
    easeInCirc: [0.55, 0, 1, 0.45], easeOutCirc: [0, 0.55, 0.45, 1], easeInOutCirc: [0.85, 0, 0.15, 1],
    easeInBack: [0.36, 0, 0.66, -0.56], easeOutBack: [0.34, 1.56, 0.64, 1], easeInOutBack: [0.68, -0.6, 0.32, 1.6],
  });

  function nearestNamedEasing(samples) {
    let bestName = 'linear';
    let bestError = Infinity;
    for (const [name, params] of Object.entries(NAMED_EASINGS)) {
      const error = bezierRmse(params, samples);
      if (error < bestError) { bestError = error; bestName = name; }
    }
    return { name: bestName, rmse: round(bestError, 4), params: NAMED_EASINGS[bestName] };
  }

  /* Overshoot + thời điểm đỉnh -> hệ dao động bậc hai -> stiffness/damping kiểu framer-motion.
   * Đây là con đường duy nhất lấy được cấu hình spring khi thư viện nằm trong bundle đã minify. */
  function springFromOvershoot(overshoot, timeToPeakMs) {
    const ratio = clamp(overshoot, 0.001, 0.95);
    const logRatio = Math.log(ratio);
    const dampingRatio = -logRatio / Math.sqrt(Math.PI * Math.PI + logRatio * logRatio);
    const peakSeconds = Math.max(timeToPeakMs, 8) / 1000;
    const dampedFrequency = Math.PI / peakSeconds;
    const naturalFrequency = dampedFrequency / Math.sqrt(Math.max(1e-6, 1 - dampingRatio * dampingRatio));
    const mass = 1;
    return {
      dampingRatio: round(dampingRatio, 3),
      naturalFrequencyHz: round(naturalFrequency / (2 * Math.PI), 2),
      framerMotion: {
        type: 'spring',
        stiffness: round(naturalFrequency * naturalFrequency * mass, 1),
        damping: round(2 * dampingRatio * naturalFrequency * mass, 2),
        mass,
      },
    };
  }

  function classifyEasing(samples, durationMs) {
    if (!samples || samples.length < 5) return null;
    const ys = samples.map((sample) => sample.y);
    const maxY = Math.max(...ys);
    const minY = Math.min(...ys);
    let crossings = 0;
    for (let index = 1; index < ys.length; index += 1) {
      if ((ys[index - 1] - 1) * (ys[index] - 1) < 0) crossings += 1;
    }
    const fit = fitCubicBezier(samples);
    const nearest = nearestNamedEasing(samples);
    const overshoot = round(maxY - 1, 3);
    const result = {
      kind: 'bezier',
      fittedCubicBezier: fit.params,
      cssTimingFunction: `cubic-bezier(${fit.params.join(', ')})`,
      fitRmse: fit.rmse,
      nearestNamed: nearest.name,
      nearestNamedRmse: nearest.rmse,
      overshoot: Math.max(0, overshoot),
      undershoot: round(Math.max(0, -minY), 3),
      oscillations: Math.max(0, crossings - 1),
    };
    if (overshoot > 0.03) {
      const peakIndex = ys.indexOf(maxY);
      result.kind = crossings >= 3 ? 'spring' : 'back-overshoot';
      result.spring = springFromOvershoot(overshoot, samples[peakIndex].x * durationMs);
    } else if (fit.rmse > 0.05) {
      result.kind = 'complex';
    }
    return result;
  }

  /* Motion trên web hiếm khi đơn lẻ. Nhận diện nhịp lệch giữa các phần tử cùng nhóm. */
  function detectStagger(items) {
    const ordered = items.filter((item) => Number.isFinite(item.startMs)).sort((a, b) => a.startMs - b.startMs);
    if (ordered.length < 3) return null;
    const gaps = [];
    for (let index = 1; index < ordered.length; index += 1) gaps.push(ordered[index].startMs - ordered[index - 1].startMs);
    const mean = gaps.reduce((sum, gap) => sum + gap, 0) / gaps.length;
    if (mean < 8) return null;
    const variance = gaps.reduce((sum, gap) => sum + (gap - mean) ** 2, 0) / gaps.length;
    const consistency = round(clamp(1 - Math.sqrt(variance) / Math.max(mean, 1), 0, 1), 3);
    if (consistency < 0.5) return null;

    const domRanks = ordered.map((item) => item.domIndex);
    const timeRanks = ordered.map((_, index) => index);
    const correlation = spearman(domRanks, timeRanks);
    let order = 'custom';
    if (correlation > 0.8) order = 'dom-order';
    else if (correlation < -0.8) order = 'reverse-dom';
    else {
      const middle = (Math.max(...domRanks) + Math.min(...domRanks)) / 2;
      const centerCorrelation = spearman(domRanks.map((rank) => Math.abs(rank - middle)), timeRanks);
      if (centerCorrelation > 0.8) order = 'center-out';
      else if (centerCorrelation < -0.8) order = 'edges-in';
    }
    return { staggerMs: round(mean, 1), consistency, order, memberCount: ordered.length };
  }

  function spearman(a, b) {
    const n = a.length;
    if (n < 2) return 0;
    const meanA = a.reduce((sum, value) => sum + value, 0) / n;
    const meanB = b.reduce((sum, value) => sum + value, 0) / n;
    let numerator = 0; let denomA = 0; let denomB = 0;
    for (let index = 0; index < n; index += 1) {
      const da = a[index] - meanA;
      const db = b[index] - meanB;
      numerator += da * db; denomA += da * da; denomB += db * db;
    }
    const denominator = Math.sqrt(denomA * denomB);
    return denominator ? numerator / denominator : 0;
  }

  function clusterNumbers(values, tolerance) {
    const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
    const clusters = [];
    for (const value of sorted) {
      const last = clusters[clusters.length - 1];
      if (last && Math.abs(value - last.center) <= tolerance) {
        last.members.push(value);
        last.center = last.members.reduce((sum, item) => sum + item, 0) / last.members.length;
      } else {
        clusters.push({ center: value, members: [value] });
      }
    }
    return clusters
      .map((cluster) => ({ value: round(cluster.center, 1), count: cluster.members.length }))
      .sort((a, b) => b.count - a.count);
  }

  /* Least-squares slope + r² — dùng để phát hiện motion bị "ghép" vào scroll hoặc con trỏ. */
  function linearFit(points) {
    const n = points.length;
    if (n < 3) return { slope: 0, r2: 0 };
    const meanX = points.reduce((sum, point) => sum + point.x, 0) / n;
    const meanY = points.reduce((sum, point) => sum + point.y, 0) / n;
    let sxy = 0; let sxx = 0; let syy = 0;
    for (const point of points) {
      const dx = point.x - meanX;
      const dy = point.y - meanY;
      sxy += dx * dy; sxx += dx * dx; syy += dy * dy;
    }
    if (!sxx || !syy) return { slope: 0, r2: 0 };
    const slope = sxy / sxx;
    return { slope: round(slope, 4), r2: round((sxy * sxy) / (sxx * syy), 3) };
  }

  /* Nav "Giới thiệu / Tính năng / Bảng giá" hầu như luôn là <a>, không phải role="tab".
   * Cho phép anchor trong-trang và anchor cùng origin; rời document bị navigation guard chặn
   * rồi được đẩy vào hàng đợi route để crawl riêng bằng iframe. */
  function isSafeActivator(info) {
    const isTabLike = info.role === 'tab' || info.role === 'menuitem'
      || info.dataSlot === 'tabs-trigger'
      || info.ariaSelected != null || info.dataTab != null;
    const text = `${info.text || ''} ${info.ariaLabel || ''}`.trim();
    if (!isTabLike && DANGEROUS.test(text)) return false;
    if (info.type === 'submit') return false;
    if (info.tag === 'a') {
      const href = String(info.href || '').trim();
      if (!href || /^(#|javascript:)/i.test(href)) return true;
      if (/^(mailto:|tel:|blob:|data:)/i.test(href)) return false;
      return info.sameOrigin === true;
    }
    return true;
  }

  function forceHoverSelector(selector) {
    return String(selector || '').replace(/:hover\b/g, '[data-motion-force-hover]');
  }

  /* --------------------------------------------------------------------------
   * 1b. SERIALIZER NÉN DÒNG
   * JSON.stringify(x, null, 2) xổ mỗi giá trị nguyên thuỷ ra một dòng riêng — đó là
   * lý do file cũ 17k dòng dù lượng thông tin chỉ bằng một phần nhỏ. Ở đây:
   *   - object/array nào flatten lại vẫn ngắn hơn `width` thì giữ nguyên MỘT dòng
   *   - mảng toàn giá trị nguyên thuỷ được gói nhiều phần tử trên cùng một dòng
   * Không mất một bit thông tin nào; vẫn là JSON hợp lệ.
   * ------------------------------------------------------------------------ */
  function stringifyCompact(value, options = {}) {
    const indentSize = Number.isFinite(options.indent) ? options.indent : 2;
    const width = Number.isFinite(options.width) ? options.width : 200;
    const pad = (level) => ' '.repeat(level * indentSize);
    const isPrimitive = (input) => input === null || typeof input !== 'object';

    function flat(input) {
      try {
        const text = JSON.stringify(input);
        return typeof text === 'string' ? text : null;
      } catch (_) { return null; }
    }

    function walk(input, level) {
      if (isPrimitive(input)) {
        const text = JSON.stringify(input);
        return typeof text === 'string' ? text : 'null';
      }
      const single = flat(input);
      if (single !== null && single.length + level * indentSize <= width) return single;
      const inner = level + 1;

      if (Array.isArray(input)) {
        if (!input.length) return '[]';
        if (input.every(isPrimitive)) {
          const budget = Math.max(40, width - inner * indentSize);
          const lines = [];
          let current = '';
          for (const item of input) {
            const piece = flat(item) ?? 'null';
            if (current && current.length + piece.length + 2 > budget) {
              lines.push(pad(inner) + current);
              current = '';
            }
            current += (current ? ', ' : '') + piece;
          }
          if (current) lines.push(pad(inner) + current);
          return `[\n${lines.join(',\n')}\n${pad(level)}]`;
        }
        const parts = input.map((item) => pad(inner) + walk(item, inner));
        return `[\n${parts.join(',\n')}\n${pad(level)}]`;
      }

      const keys = Object.keys(input).filter((key) => input[key] !== undefined);
      if (!keys.length) return '{}';
      const parts = keys.map((key) => `${pad(inner)}${JSON.stringify(key)}: ${walk(input[key], inner)}`);
      return `{\n${parts.join(',\n')}\n${pad(level)}}`;
    }

    return walk(value, 0);
  }

  function countLines(text) {
    let lines = 1;
    for (let index = 0; index < text.length; index += 1) if (text.charCodeAt(index) === 10) lines += 1;
    return lines;
  }

  const PURE_API = {
    parseTimeList, round, clamp, median, decomposeMatrix, parseFilterBlur,
    bezierY, fitCubicBezier, nearestNamedEasing, classifyEasing, springFromOvershoot,
    detectStagger, spearman, clusterNumbers, linearFit, isSafeActivator,
    forceHoverSelector, stringifyCompact, countLines, NAMED_EASINGS,
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = PURE_API;
  if (!bootWindow || !bootWindow.document) return;

  /* ==========================================================================
   * 2. NGỮ CẢNH + THĂM DÒ DOM
   *
   * `root`/`doc` KHÔNG còn là hằng số. Bộ crawl trỏ chúng sang window của iframe
   * đang giữ route cần đào, chạy xong thì trỏ về. Mọi hàm bên dưới vì thế chạy
   * được trên bất kỳ document nào mà không phải truyền tham số xuống từng tầng.
   *
   * `hostWin`/`hostDoc` thì cố định — dùng cho iframe, timer và tải file xuống,
   * vì những thứ đó phải sống lâu hơn từng route.
   * ========================================================================== */

  const hostWin = bootWindow;
  const hostDoc = bootWindow.document;
  let root = bootWindow;
  let doc = bootWindow.document;

  function setContext(win) {
    root = win;
    doc = win.document;
  }

  /* instanceof Element hỏng khi phần tử đến từ realm khác (iframe có Element riêng).
   * nodeType === 1 đúng ở mọi realm. */
  const isEl = (node) => Boolean(node) && node.nodeType === 1;
  const cs = (element) => root.getComputedStyle(element);
  const raf = (callback) => root.requestAnimationFrame(callback);
  const wait = (ms) => new Promise((resolve) => hostWin.setTimeout(resolve, ms));
  const nextFrame = () => new Promise((resolve) => raf(() => raf(resolve)));
  const nowMs = () => hostWin.performance.now();
  const cssEscape = (value) => (hostWin.CSS && hostWin.CSS.escape ? hostWin.CSS.escape(value) : String(value).replace(/["\\]/g, '\\$&'));

  const selectorCache = new WeakMap();

  function textOf(element, max = 60) {
    return String(element?.getAttribute?.('aria-label') || element?.innerText || element?.textContent || '')
      .replace(/\s+/g, ' ').trim().slice(0, max);
  }

  function selectorOf(element) {
    if (!isEl(element)) return null;
    const cached = selectorCache.get(element);
    if (cached) return cached;
    let value;
    if (element.id) {
      value = `#${cssEscape(element.id)}`;
    } else {
      const parts = [];
      let node = element;
      const stop = element.ownerDocument?.documentElement || doc.documentElement;
      while (node && node !== stop && parts.length < 6) {
        let part = node.localName;
        const role = node.getAttribute('role');
        if (role) part += `[role="${cssEscape(role)}"]`;
        const dataSlot = node.getAttribute('data-slot');
        if (dataSlot) part += `[data-slot="${cssEscape(dataSlot)}"]`;
        const parent = node.parentElement;
        if (parent) {
          const peers = [...parent.children].filter((item) => item.localName === node.localName);
          if (peers.length > 1) part += `:nth-of-type(${peers.indexOf(node) + 1})`;
        }
        parts.unshift(part);
        node = parent;
      }
      value = parts.join(' > ');
    }
    selectorCache.set(element, value);
    return value;
  }

  function isVisible(element) {
    if (!isEl(element) || !element.isConnected) return false;
    const rect = element.getBoundingClientRect();
    if (rect.width <= 1 || rect.height <= 1) return false;
    const style = cs(element);
    return style.display !== 'none' && style.visibility !== 'hidden';
  }

  const NUMERIC_CHANNELS = Object.freeze({
    opacity: 0.008,
    translateX: 0.4, translateY: 0.4, translateZ: 0.4,
    scaleX: 0.004, scaleY: 0.004,
    rotate: 0.15, skewX: 0.15,
    blur: 0.15,
    width: 0.4, height: 0.4,
  });
  const CATEGORICAL_CHANNELS = Object.freeze(['color', 'backgroundColor', 'clipPath', 'borderRadius', 'boxShadow', 'visibility', 'display', 'filterRaw']);

  function readChannels(element) {
    const style = cs(element);
    const rect = element.getBoundingClientRect();
    const matrix = decomposeMatrix(style.transform);
    return {
      opacity: Number(style.opacity),
      translateX: matrix.translateX, translateY: matrix.translateY, translateZ: matrix.translateZ,
      scaleX: matrix.scaleX, scaleY: matrix.scaleY, rotate: matrix.rotateDeg, skewX: matrix.skewXDeg,
      blur: parseFilterBlur(style.filter),
      width: round(rect.width, 2), height: round(rect.height, 2),
      color: style.color, backgroundColor: style.backgroundColor, clipPath: style.clipPath,
      borderRadius: style.borderRadius, boxShadow: style.boxShadow,
      visibility: style.visibility, display: style.display, filterRaw: style.filter,
    };
  }

  /* Lọc trước: chỉ những phần tử THỰC SỰ có khả năng chuyển động mới đáng lấy mẫu 60fps. */
  function isAnimatable(element) {
    const style = cs(element);
    if (parseTimeList(style.transitionDuration).some(Boolean)) return true;
    if (parseTimeList(style.animationDuration).some(Boolean)) return true;
    if (style.animationName && style.animationName !== 'none') return true;
    if (style.willChange && style.willChange !== 'auto') return true;
    if (style.transform && style.transform !== 'none') return true;
    if (element.getAnimations && element.getAnimations().length) return true;
    return false;
  }

  const REVEAL_HINT = /menu|dropdown|popover|tooltip|submenu|flyout|panel|overlay|reveal|collapse|hidden|backdrop|modal/i;

  /* Phần tử ĐANG ẩn vẫn phải theo dõi: dropdown/tooltip nằm ở display:none hoặc opacity:0
   * lúc nghỉ — và đó CHÍNH LÀ motion cần ghi. isVisible() loại sạch chúng, nên không dùng ở đây. */
  function couldAnimate(element) {
    if (!isEl(element) || !element.isConnected) return false;
    const style = cs(element);
    if (style.display === 'none') {
      if (parseTimeList(style.transitionDuration).some(Boolean)) return true;
      if (style.animationName && style.animationName !== 'none') return true;
      return REVEAL_HINT.test(`${element.getAttribute('class') || ''} ${element.getAttribute('data-slot') || ''}`);
    }
    if (isAnimatable(element)) return true;
    return Number(style.opacity) < 0.99 || style.visibility === 'hidden';
  }

  function scopeTargets(rootElement, limit) {
    if (!isEl(rootElement)) return [];
    const picked = [rootElement];
    for (const element of rootElement.querySelectorAll('*')) {
      if (picked.length >= limit) break;
      if (couldAnimate(element)) picked.push(element);
    }
    return picked;
  }

  /* Dropdown thường là ANH EM của trigger (`<li><a>Tính năng</a><ul class="sub">`),
   * không phải con. Nới scope lên tổ tiên gần nhất mang ngữ nghĩa nhóm. */
  function hoverScopeOf(element) {
    return element.closest('li,[class*="menu" i],[class*="nav" i],[class*="dropdown" i],[class*="card" i],[data-slot]')
      || element.parentElement
      || element;
  }

  function animatableInViewport(limit, margin = 200) {
    const picked = [];
    const viewportHeight = root.innerHeight;
    for (const element of doc.querySelectorAll('body *')) {
      if (picked.length >= limit) break;
      const rect = element.getBoundingClientRect();
      if (rect.bottom < -margin || rect.top > viewportHeight + margin) continue;
      if (rect.width <= 1 || rect.height <= 1) continue;
      if (!isAnimatable(element)) continue;
      picked.push(element);
    }
    return picked;
  }

  function domIndexOf(element) {
    const parent = element.parentElement;
    return parent ? [...parent.children].indexOf(element) : 0;
  }

  function documentScrollHeight() {
    return Math.max(
      doc.body?.scrollHeight || 0, doc.body?.offsetHeight || 0,
      doc.documentElement.scrollHeight, doc.documentElement.offsetHeight,
    );
  }

  /* ==========================================================================
   * 3. CẤY HOOK — bắt ý định gốc thay vì đoán từ pixel
   * ========================================================================== */

  function serializable(value, depth = 0, seen = new WeakSet()) {
    if (value == null || ['string', 'number', 'boolean'].includes(typeof value)) return value;
    if (typeof value === 'function') return { type: 'function', source: String(value).slice(0, 400) };
    if (depth > 4) return '[depth-limit]';
    if (typeof value !== 'object') return String(value);
    if (seen.has(value)) return '[circular]';
    seen.add(value);
    if (isEl(value)) return { type: 'Element', selector: selectorOf(value) };
    if (ArrayBuffer.isView(value)) return { type: value.constructor.name, values: [...value].slice(0, 24) };
    if (Array.isArray(value)) return value.slice(0, 40).map((item) => serializable(item, depth + 1, seen));
    const output = {};
    for (const key of Object.keys(value).slice(0, 40)) {
      try { output[key] = serializable(value[key], depth + 1, seen); } catch (error) { output[key] = `[unreadable: ${error.message}]`; }
    }
    return output;
  }

  /* Cài lên realm ĐANG là ngữ cảnh (root), không phải realm của script. Bộ crawl gọi
   * hàm này ngay khi document của iframe vừa tồn tại, nên bắt được cả lời gọi lúc mount. */
  function installHooks(config) {
    const store = {
      window: root,
      webAnimationCalls: [],
      intersectionObservers: [],
      stateChanges: [],
    };
    const restore = [];
    const targetWindow = root;
    const targetDoc = doc;

    // Element.animate — Framer Motion / Motion One / GSAP-web đều đi qua đây.
    // Bắt được keyframes VÀ options gốc (kể cả easing chuỗi, spring config).
    const ElementCtor = targetWindow.Element;
    const originalAnimate = ElementCtor && ElementCtor.prototype.animate;
    if (typeof originalAnimate === 'function') {
      ElementCtor.prototype.animate = function hookedAnimate(keyframes, animateOptions) {
        try {
          if (store.webAnimationCalls.length < config.maxHookRecords) {
            store.webAnimationCalls.push({
              target: selectorOf(this),
              atMs: round(nowMs(), 1),
              keyframes: serializable(keyframes),
              options: serializable(animateOptions),
            });
          }
        } catch (_) { /* hook không được phép làm hỏng trang */ }
        return originalAnimate.apply(this, arguments);
      };
      restore.push(() => { ElementCtor.prototype.animate = originalAnimate; });
    }

    // IntersectionObserver — nguồn sự thật cho reveal-on-scroll: threshold + rootMargin thật.
    const OriginalIntersectionObserver = targetWindow.IntersectionObserver;
    if (typeof OriginalIntersectionObserver === 'function') {
      function HookedIntersectionObserver(callback, observerOptions) {
        const record = {
          atMs: round(nowMs(), 1),
          options: serializable(observerOptions || {}),
          targets: [],
        };
        if (store.intersectionObservers.length < config.maxHookRecords) store.intersectionObservers.push(record);
        const instance = new OriginalIntersectionObserver(callback, observerOptions);
        const originalObserve = instance.observe.bind(instance);
        instance.observe = (element) => {
          try { if (record.targets.length < 40) record.targets.push(selectorOf(element)); } catch (_) {}
          return originalObserve(element);
        };
        return instance;
      }
      HookedIntersectionObserver.prototype = OriginalIntersectionObserver.prototype;
      targetWindow.IntersectionObserver = HookedIntersectionObserver;
      restore.push(() => { targetWindow.IntersectionObserver = OriginalIntersectionObserver; });
    }

    // Đổi state (class / data-state / aria-expanded) chính là "variant contract" mà
    // người dựng lại cần: motion nào gắn với state nào.
    if (targetDoc.documentElement) {
      const mutationObserver = new targetWindow.MutationObserver((records) => {
        for (const record of records) {
          if (store.stateChanges.length >= config.maxHookRecords) break;
          const element = record.target;
          if (!isEl(element)) continue;
          const name = record.attributeName;
          const next = element.getAttribute(name);
          if (record.oldValue === next) continue;
          store.stateChanges.push({
            atMs: round(nowMs(), 1),
            target: selectorOf(element),
            attribute: name,
            from: String(record.oldValue || '').slice(0, 120),
            to: String(next || '').slice(0, 120),
          });
        }
      });
      try {
        mutationObserver.observe(targetDoc.documentElement, {
          subtree: true,
          attributes: true,
          attributeOldValue: true,
          attributeFilter: ['class', 'style', 'data-state', 'data-open', 'aria-expanded', 'aria-selected', 'data-motion', 'data-inview'],
        });
        restore.push(() => mutationObserver.disconnect());
      } catch (_) {}
    }

    store.uninstall = () => { for (const undo of restore.reverse()) { try { undo(); } catch (_) {} } };
    return store;
  }

  /* ==========================================================================
   * 4. BỘ LẤY MẪU rAF — phân giải đủ để khớp đường cong
   * ========================================================================== */

  /* Bốn tính chất bắt buộc, thiếu một là mất motion:
   *   1. frame 0 phải là trạng thái NGHỈ  -> `onArmed` chỉ chạy SAU khi frame 0 đã ghi
   *   2. phần tử mount sau khi kích hoạt phải được bắt -> MutationObserver trên `watchRoot`
   *      (Radix/Headless UI render dropdown qua portal thẳng vào <body>, ngoài mọi scope tĩnh)
   *   3. phần tử ẩn lúc nghỉ vẫn phải nằm trong danh sách -> lọc bằng couldAnimate, không phải isVisible
   *   4. rAF trong iframe có thể ngừng tick (tab nền, iframe bị cull) -> watchdog trên timer
   *      của host, nếu không cả phiên crawl treo vĩnh viễn ở một route.
   */
  function sampleTimeline(options) {
    const {
      targets: fixedTargets = null,
      resolveTargets = null,
      durationMs,
      maxTargets,
      onArmed = null,
      watchRoot = null,
    } = options;

    return new Promise((resolve) => {
      const entries = [];
      const known = new Set();
      const start = nowMs();
      const sampleWindow = root;
      let observer = null;
      let armed = false;
      let settled = false;

      function finish() {
        if (settled) return;
        settled = true;
        hostWin.clearTimeout(watchdog);
        if (observer) { try { observer.disconnect(); } catch (_) {} }
        resolve(entries);
      }
      const watchdog = hostWin.setTimeout(finish, durationMs + 4000);

      function addTarget(element, atMs, filtered) {
        if (entries.length >= maxTargets) return;
        if (!isEl(element) || known.has(element)) return;
        if (filtered && !couldAnimate(element)) return;
        known.add(element);
        entries.push({ element, appearedAtMs: round(atMs, 1), frames: [] });
      }

      if (isEl(watchRoot) && typeof sampleWindow.MutationObserver === 'function') {
        observer = new sampleWindow.MutationObserver((records) => {
          const atMs = nowMs() - start;
          for (const record of records) {
            for (const node of record.addedNodes) {
              if (!isEl(node)) continue;
              addTarget(node, atMs, false);
              for (const child of node.querySelectorAll('*')) addTarget(child, atMs, true);
            }
          }
        });
        try { observer.observe(watchRoot, { childList: true, subtree: true }); } catch (_) {}
      }

      function tick() {
        if (settled) return;
        const elapsed = nowMs() - start;
        if (!armed) {
          for (const element of (fixedTargets || resolveTargets?.() || []).slice(0, maxTargets)) addTarget(element, 0, false);
          for (const entry of entries) entry.frames.push({ t: 0, channels: readChannels(entry.element) });
          armed = true;
          if (onArmed) { try { onArmed(); } catch (error) { console.warn('[MotionCapture] onArmed lỗi:', error); } }
          sampleWindow.requestAnimationFrame(tick);
          return;
        }
        for (const entry of entries) {
          if (!entry.element.isConnected) continue;
          entry.frames.push({ t: round(elapsed, 1), channels: readChannels(entry.element) });
        }
        if (elapsed < durationMs) sampleWindow.requestAnimationFrame(tick);
        else finish();
      }
      sampleWindow.requestAnimationFrame(tick);
    });
  }

  function buildChannelSpec(name, serie, eps) {
    const values = serie.map((point) => point.v);
    if (values.some((value) => !Number.isFinite(value))) return null;
    const from = values[0];
    const to = values[values.length - 1];
    const net = to - from;
    const max = Math.max(...values);
    const min = Math.min(...values);
    const travel = max - min;
    if (Math.abs(net) < eps && travel < eps * 2) return null;

    let startIndex = 0;
    while (startIndex < values.length - 1 && Math.abs(values[startIndex] - from) < eps) startIndex += 1;
    startIndex = Math.max(0, startIndex - 1);
    let endIndex = values.length - 1;
    while (endIndex > startIndex + 1 && Math.abs(values[endIndex] - values[endIndex - 1]) < eps * 0.2) endIndex -= 1;
    endIndex = Math.min(values.length - 1, endIndex + 1);

    const startT = serie[startIndex].t;
    const endT = serie[endIndex].t;
    const durationMs = round(endT - startT, 1);

    let kind = 'transition';
    let denominator = net;
    if (Math.abs(net) < eps) {
      kind = 'pulse';
      const extreme = Math.abs(max - from) > Math.abs(min - from) ? max : min;
      denominator = extreme - from;
    }
    if (!denominator) return null;

    let easing = null;
    if (kind === 'transition' && durationMs >= 32 && endIndex - startIndex >= 4) {
      const samples = [];
      for (let index = startIndex; index <= endIndex; index += 1) {
        const x = (serie[index].t - startT) / (endT - startT);
        const y = (values[index] - from) / denominator;
        if (Number.isFinite(x) && Number.isFinite(y)) samples.push({ x: clamp(x, 0, 1), y });
      }
      easing = classifyEasing(samples, durationMs);
    }

    return {
      property: name,
      kind,
      from: round(from, 3),
      to: round(to, 3),
      peak: kind === 'pulse' ? round(Math.abs(max - from) > Math.abs(min - from) ? max : min, 3) : undefined,
      delayMs: round(startT, 1),
      durationMs,
      easing,
    };
  }

  function buildElementMotion(entry) {
    const element = entry.element;
    const frames = entry.frames;
    const appearedAtMs = entry.appearedAtMs || 0;
    if (!frames || frames.length < 4) {
      // Xuất hiện muộn, không đủ frame để dựng đường cong — vẫn phải ghi sự kiện xuất hiện.
      if (!appearedAtMs || !frames?.length) return null;
      return {
        target: selectorOf(element), domIndex: domIndexOf(element), parent: selectorOf(element.parentElement),
        label: textOf(element, 40), appearedAtMs, startMs: appearedAtMs, endMs: appearedAtMs,
        channels: [], discrete: [], mountOnly: true,
      };
    }
    const channels = [];
    for (const [name, eps] of Object.entries(NUMERIC_CHANNELS)) {
      const serie = frames.map((frame) => ({ t: frame.t, v: frame.channels[name] }));
      const spec = buildChannelSpec(name, serie, eps);
      if (spec) channels.push(spec);
    }
    const first = frames[0].channels;
    const last = frames[frames.length - 1].channels;
    const discrete = [];
    for (const name of CATEGORICAL_CHANNELS) {
      if (first[name] !== last[name]) discrete.push({ property: name, from: first[name], to: last[name] });
    }
    if (!channels.length && !discrete.length) return null;
    const startMs = Math.min(...channels.map((channel) => channel.delayMs), Infinity);
    const endMs = Math.max(...channels.map((channel) => channel.delayMs + channel.durationMs), 0);
    return {
      target: selectorOf(element),
      domIndex: domIndexOf(element),
      parent: selectorOf(element.parentElement),
      label: textOf(element, 40),
      appearedAtMs: appearedAtMs || undefined,
      startMs: Number.isFinite(startMs) ? startMs : appearedAtMs,
      endMs: round(endMs, 1),
      channels,
      discrete,
    };
  }

  function harvest(session, entries, trigger) {
    const { report, config } = session;
    let added = 0;
    for (const entry of entries) {
      if (report.motions.length >= config.maxMotionsPerRoute) break;
      const motion = buildElementMotion(entry);
      if (!motion) continue;
      motion.id = `${session.routeId}m${report.motions.length}`;
      motion.trigger = trigger;
      report.motions.push(motion);
      added += 1;
    }
    return added;
  }

  /* ==========================================================================
   * 5. BỘ KHÁM PHÁ
   * ========================================================================== */

  /* Mỗi route có hạn mức thời gian riêng. Không có nó, một trang dài với 70 mục hover
   * ăn hết phiên và các route còn lại không bao giờ được đào — đúng lỗi của v3. */
  function overBudget(session) {
    return nowMs() > session.deadline || session.report.motions.length >= session.config.maxMotionsPerRoute;
  }

  async function recordMotion(session, trigger, resolveTargets, extra = {}) {
    const { config } = session;
    if (overBudget(session)) return 0;
    const entries = await sampleTimeline({
      resolveTargets,
      durationMs: extra.durationMs || config.sampleWindowMs,
      maxTargets: config.maxSampleTargets,
      onArmed: extra.onArmed,
      watchRoot: extra.watchRoot,
    });
    return harvest(session, entries, trigger);
  }

  /* Sweep thô: cuộn hết TOÀN BỘ chiều cao, tính lại mỗi vòng vì lazy-load kéo dài trang. */
  async function scrollSweep(session) {
    const { report, config } = session;
    const step = Math.max(120, Math.round(root.innerHeight * config.scrollStepRatio));
    let y = 0;
    let steps = 0;
    for (let guard = 0; guard < config.maxScrollSteps; guard += 1) {
      if (overBudget(session)) break;
      const maxScroll = Math.max(0, documentScrollHeight() - root.innerHeight);
      if (y > maxScroll) y = maxScroll;
      const targetY = y;
      root.scrollTo({ left: 0, top: targetY, behavior: 'auto' });
      root.dispatchEvent(new root.Event('scroll'));
      doc.dispatchEvent(new root.Event('scroll', { bubbles: true }));
      await recordMotion(session, { type: 'scroll', scrollY: targetY }, () => animatableInViewport(config.maxSampleTargets));
      steps += 1;
      if (targetY >= maxScroll) break;
      y = targetY + step;
    }
    report.scrollSweep = { steps, stepPx: step, documentHeight: documentScrollHeight(), viewportHeight: root.innerHeight };
  }

  /* Phân biệt REVEAL (một lần, không hoàn lại) với SCRUB (bám liên tục vào scroll).
   * Hai thứ này cần hai kiến trúc code hoàn toàn khác nhau khi dựng lại. */
  async function probeScrollCoupling(session) {
    const { report, config } = session;
    const couplings = [];
    const anchors = [0.2, 0.5, 0.8];
    const maxScroll = Math.max(0, documentScrollHeight() - root.innerHeight);

    for (const fraction of anchors) {
      if (overBudget(session)) break;
      const base = Math.round(maxScroll * fraction);
      root.scrollTo({ left: 0, top: base, behavior: 'auto' });
      await nextFrame();
      await wait(config.settleMs);
      const targets = animatableInViewport(config.maxCouplingTargets);
      if (!targets.length) continue;

      const deltas = [0, 30, 60, 90, 120];
      const readings = targets.map(() => []);
      for (const delta of deltas) {
        root.scrollTo({ left: 0, top: base + delta, behavior: 'auto' });
        root.dispatchEvent(new root.Event('scroll'));
        await nextFrame();
        for (let index = 0; index < targets.length; index += 1) readings[index].push(readChannels(targets[index]));
      }
      root.scrollTo({ left: 0, top: base, behavior: 'auto' });
      root.dispatchEvent(new root.Event('scroll'));
      await nextFrame();
      await wait(120);
      const returned = targets.map((element) => readChannels(element));

      for (let index = 0; index < targets.length; index += 1) {
        const element = targets[index];
        const style = cs(element);
        for (const property of ['translateY', 'translateX', 'scaleX', 'rotate', 'opacity', 'width']) {
          const points = deltas.map((delta, step) => ({ x: delta, y: readings[index][step][property] }));
          const spread = Math.max(...points.map((point) => point.y)) - Math.min(...points.map((point) => point.y));
          const threshold = property === 'opacity' ? 0.05 : property === 'scaleX' ? 0.01 : 1;
          if (spread < threshold) continue;
          const fit = linearFit(points);
          if (fit.r2 < 0.85) continue;
          const reverted = Math.abs(returned[index][property] - readings[index][0][property]) < threshold;
          couplings.push({
            target: selectorOf(element),
            property,
            unitsPerScrollPx: fit.slope,
            linearity: fit.r2,
            behaviour: reverted ? 'scroll-scrubbed' : 'one-shot-reveal',
            parallaxFactor: property === 'translateY' ? round(-fit.slope, 3) : undefined,
            nativeScrollTimeline: style.animationTimeline && style.animationTimeline !== 'auto' ? style.animationTimeline : null,
          });
          if (couplings.length >= config.maxCouplings) break;
        }
        if (couplings.length >= config.maxCouplings) break;
      }
      if (couplings.length >= config.maxCouplings) break;
    }
    report.scrollCoupling = couplings;
  }

  /* Hover "từ tính" / tilt theo con trỏ: dịch pointer qua 3 vị trí, đo hệ số ghép nối. */
  async function probePointerCoupling(element, session) {
    const rect = element.getBoundingClientRect();
    if (rect.width < 24 || rect.height < 24) return null;
    const positions = [0.15, 0.5, 0.85];
    const readings = [];
    for (const fraction of positions) {
      const clientX = rect.left + rect.width * fraction;
      const clientY = rect.top + rect.height * 0.5;
      const PointerCtor = root.PointerEvent || root.MouseEvent;
      element.dispatchEvent(new PointerCtor('pointermove', { bubbles: true, composed: true, clientX, clientY, view: root }));
      element.dispatchEvent(new root.MouseEvent('mousemove', { bubbles: true, composed: true, clientX, clientY, view: root }));
      await nextFrame();
      await wait(session.config.pointerSettleMs);
      readings.push({ x: rect.width * fraction, channels: readChannels(element) });
    }
    const results = [];
    for (const property of ['translateX', 'translateY', 'rotate', 'skewX', 'scaleX']) {
      const points = readings.map((reading) => ({ x: reading.x, y: reading.channels[property] }));
      const spread = Math.max(...points.map((point) => point.y)) - Math.min(...points.map((point) => point.y));
      if (spread < (property === 'scaleX' ? 0.01 : 0.6)) continue;
      const fit = linearFit(points);
      if (fit.r2 < 0.9) continue;
      results.push({ property, unitsPerPointerPx: fit.slope, linearity: fit.r2 });
    }
    if (!results.length) return null;
    return { target: selectorOf(element), channels: results };
  }

  function installForcedHoverStyles() {
    const css = [];
    const roots = new Set();
    const inaccessibleStyleSheets = [];
    function walk(rules) {
      for (const rule of [...rules]) {
        if (rule.constructor?.name === 'CSSMediaRule') {
          try { if (!root.matchMedia(rule.conditionText).matches) continue; } catch (_) {}
        }
        if (typeof rule.selectorText === 'string' && rule.selectorText.includes(':hover')) {
          css.push(`${forceHoverSelector(rule.selectorText)}{${rule.style.cssText}}`);
          for (const selector of rule.selectorText.split(',')) {
            const index = selector.indexOf(':hover');
            if (index < 0) continue;
            const rootSelector = selector.slice(0, index).trim();
            if (!rootSelector) continue;
            try { for (const element of doc.querySelectorAll(rootSelector)) roots.add(element); } catch (_) {}
          }
        }
        if (rule.cssRules) walk(rule.cssRules);
      }
    }
    for (const sheet of [...doc.styleSheets]) {
      try { walk(sheet.cssRules); }
      catch (error) { inaccessibleStyleSheets.push({ href: sheet.href, reason: error.name }); }
    }
    const styleElement = doc.createElement('style');
    styleElement.setAttribute('data-motion-capture-hover-rules', '');
    styleElement.textContent = css.join('\n');
    (doc.head || doc.documentElement).appendChild(styleElement);
    return { styleElement, roots, ruleCount: css.length, inaccessibleStyleSheets };
  }

  function pointerInit(element, extra = {}) {
    const rect = element.getBoundingClientRect();
    return {
      bubbles: true, cancelable: true, composed: true, view: root,
      clientX: Math.round(rect.left + rect.width / 2),
      clientY: Math.round(rect.top + rect.height / 2),
      screenX: Math.round(rect.left + rect.width / 2),
      screenY: Math.round(rect.top + rect.height / 2),
      // Thiếu pointerId/pointerType/isPrimary thì nhiều thư viện bỏ qua event như nhiễu.
      pointerId: 1, pointerType: 'mouse', isPrimary: true,
      width: 1, height: 1, pressure: 0, buttons: 0, detail: 0,
      ...extra,
    };
  }

  function fire(element, name, extra) {
    const usePointer = name.startsWith('pointer') && root.PointerEvent;
    const EventCtor = usePointer ? root.PointerEvent : root.MouseEvent;
    const init = pointerInit(element, extra);
    if (name.endsWith('enter') || name.endsWith('leave')) init.bubbles = false;
    try { element.dispatchEvent(new EventCtor(name, init)); } catch (_) {}
  }

  function dispatchHover(element, entering) {
    if (entering) {
      for (const name of ['pointerover', 'pointerenter', 'mouseover', 'mouseenter']) fire(element, name);
      // mousemove là điều kiện bắt buộc của phần lớn hover effect viết bằng JS.
      fire(element, 'pointermove');
      fire(element, 'mousemove');
    } else {
      for (const name of ['pointerout', 'pointerleave', 'mouseout', 'mouseleave']) fire(element, name);
    }
  }

  /* Nhiều component đổi tab ở `mousedown` hoặc `pointerdown`, không đợi `click`. */
  function dispatchActivation(element) {
    for (const name of ['pointerover', 'mouseover', 'pointermove', 'mousemove']) fire(element, name);
    fire(element, 'pointerdown', { buttons: 1, pressure: 0.5 });
    fire(element, 'mousedown', { buttons: 1 });
    try { element.focus({ preventScroll: true }); } catch (_) {}
    fire(element, 'pointerup');
    fire(element, 'mouseup');
    try { element.click(); } catch (_) {}
  }

  async function hoverSweep(session) {
    const { report, config } = session;
    const harness = installForcedHoverStyles();
    const generic = [...doc.querySelectorAll(
      'a,button,[role="button"],[role="tab"],[role="menuitem"],[data-slot],[class*="card" i],[class*="btn" i],[class*="item" i],[class*="link" i],li',
    )];
    const candidates = [...new Set([...harness.roots, ...generic])]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.width < 8 || rect.height < 8) return false;
        // roots = phần tử có luật :hover thật trong CSS. Luôn thử, kể cả khi
        // isAnimatable() cho false vì hiệu ứng nằm ở phần tử con hoặc ở ::after.
        return harness.roots.has(element) || isAnimatable(element) || element.matches('a,button,[role="button"],[role="menuitem"]');
      })
      .slice(0, config.maxHoverTargets);

    const pointerCouplings = [];
    let recorded = 0;
    let exercised = 0;
    for (const target of candidates) {
      if (overBudget(session)) break;
      exercised += 1;
      target.scrollIntoView({ block: 'center', behavior: 'auto' });
      await nextFrame();

      const scope = hoverScopeOf(target);
      const entries = await sampleTimeline({
        // Giải phân TRƯỚC khi hover, gồm cả phần tử đang ẩn; portal mount vào body do watchRoot bắt.
        targets: [...new Set([...scopeTargets(scope, config.maxSampleTargets), target])],
        durationMs: config.hoverWindowMs,
        maxTargets: config.maxSampleTargets,
        watchRoot: doc.body,
        onArmed: () => {
          target.setAttribute('data-motion-force-hover', '');
          dispatchHover(target, true);
        },
      });
      recorded += harvest(session, entries, { type: 'hover', on: selectorOf(target), label: textOf(target, 30) });

      if (config.probePointer && pointerCouplings.length < config.maxCouplings) {
        const coupling = await probePointerCoupling(target, session);
        if (coupling) pointerCouplings.push(coupling);
      }

      // Ghi luôn chiều RỜI chuột — thời lượng ra thường khác chiều vào.
      const leaveEntries = await sampleTimeline({
        targets: [...new Set([...scopeTargets(scope, config.maxSampleTargets), target])],
        durationMs: config.hoverWindowMs,
        maxTargets: config.maxSampleTargets,
        onArmed: () => {
          dispatchHover(target, false);
          target.removeAttribute('data-motion-force-hover');
        },
      });
      recorded += harvest(session, leaveEntries, { type: 'hover-leave', on: selectorOf(target) });
      await wait(40);
    }
    harness.styleElement.remove();
    report.pointerCoupling = pointerCouplings;
    report.hoverAutomation = {
      forcedCssRules: harness.ruleCount,
      candidates: candidates.length,
      exercisedTargets: exercised,
      motionsRecorded: recorded,
      inaccessibleStyleSheets: harness.inaccessibleStyleSheets.slice(0, 10),
    };
  }

  const CONTROL_QUERY = [
    '[role="tab"]', '[role="menuitem"]', '[role="tablist"] > *', '[role="navigation"] a',
    '[aria-controls]', '[aria-expanded]', '[aria-selected]', 'summary',
    '[data-slot="tabs-trigger"]', '[data-slot="accordion-trigger"]', '[data-slot="collapsible-trigger"]',
    '[data-tab]', '[data-toggle]', '[data-bs-toggle]', '[data-target]',
    '[class*="tab-" i]', '[class*="-tab" i]', '[class*="nav-link" i]', '[class*="menu-item" i]',
    'nav a', 'nav button', 'nav li',
  ].join(',');

  function controlKey(element) {
    return `${selectorOf(element)}|${textOf(element, 30)}`;
  }

  function controlInfo(element) {
    const href = element.getAttribute('href');
    let sameOrigin = false;
    if (href) {
      try { sameOrigin = new URL(element.href, root.location.href).origin === root.location.origin; } catch (_) { sameOrigin = false; }
    }
    return {
      role: element.getAttribute('role') || '', tag: element.localName, text: textOf(element),
      ariaLabel: element.getAttribute('aria-label'), ariaControls: element.getAttribute('aria-controls'),
      ariaSelected: element.getAttribute('aria-selected'), dataTab: element.getAttribute('data-tab'),
      href, sameOrigin, type: element.getAttribute('type'), dataSlot: element.getAttribute('data-slot'),
    };
  }

  function controlPriority(element) {
    if (element.matches('[role="tab"],[data-slot="tabs-trigger"],[aria-selected]')) return 0;
    if (element.matches('[data-tab],[data-toggle],[data-bs-toggle],[aria-controls]')) return 1;
    if (element.matches('nav a,[role="menuitem"],[class*="nav-link" i],[class*="menu-item" i]')) return 2;
    if (element.matches('summary,[aria-expanded]')) return 3;
    return 4;
  }

  function safeControls() {
    return [...doc.querySelectorAll(CONTROL_QUERY)]
      .filter((element) => {
        if (!isVisible(element)) return false;
        // Loại phần tử bọc chỉ chứa đúng một control khác — click nó là click trùng.
        if (element.children.length === 1 && element.firstElementChild.matches('a,button')) return false;
        return isSafeActivator(controlInfo(element));
      })
      .sort((a, b) => controlPriority(a) - controlPriority(b));
  }

  function panelOf(control) {
    const id = control.getAttribute('aria-controls')
      || (control.getAttribute('data-target') || control.getAttribute('href') || '').replace(/^#/, '');
    if (id) {
      const panel = doc.getElementById(id);
      if (panel) return panel;
    }
    if (control.localName === 'summary') return control.closest('details') || control.parentElement;
    const tabsRoot = control.closest('[data-slot="tabs"],[role="tablist"],nav,[class*="tabs" i]');
    // Panel thật thường là ANH EM của tablist, không phải hậu duệ. Lên một cấp rồi lấy cả cụm.
    return tabsRoot?.parentElement || control.closest('section,main,article') || doc.body;
  }

  /* Không có guard, click vào <a href="/tinh-nang"> làm iframe rời trang và mất sạch dữ liệu
   * của route đang đào. Chặn ở capture phase: SPA router vẫn nhận được event (nó nghe ở bubble)
   * nên vẫn pushState. Href bị chặn được đẩy sang hàng đợi route cho bộ crawl. */
  function installNavigationGuard() {
    const blocked = [];
    const seen = new Set();
    const onClick = (event) => {
      const link = isEl(event.target) ? event.target.closest('a[href]') : null;
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (!href || /^(#|javascript:)/i.test(href)) return;
      // baseURI chứ không phải location: trong frame nạp bằng document.write,
      // location là about:blank còn baseURI mới là URL thật của route.
      let base;
      let url;
      try {
        base = new URL(doc.baseURI);
        url = new URL(link.getAttribute('href'), base);
      } catch (_) { return; }
      if (url.origin === base.origin && url.pathname === base.pathname) return;
      event.preventDefault();
      if (!seen.has(url.href) && blocked.length < 80) {
        seen.add(url.href);
        blocked.push({ href: url.href, text: textOf(link, 40) });
      }
    };
    doc.addEventListener('click', onClick, true);
    return { blocked, uninstall: () => doc.removeEventListener('click', onClick, true) };
  }

  function structureFingerprint() {
    const main = doc.querySelector('main') || doc.body;
    return `${main.childElementCount}:${main.querySelectorAll('*').length}:${(main.innerText || '').length}`;
  }

  /* Query LẠI sau mỗi click: tab lồng chỉ được mount khi tab cha đang mở,
   * nên danh sách chốt một lần sẽ không bao giờ nhìn thấy chúng. */
  async function activateControls(session) {
    const { report, config } = session;
    const visited = new Set();
    const switches = [];
    let activated = 0;
    let passes = 0;
    let effective = 0;

    for (let pass = 0; pass < config.maxControlPasses; pass += 1) {
      if (overBudget(session)) break;
      const pending = safeControls().filter((element) => !visited.has(controlKey(element)));
      if (!pending.length) break;
      passes += 1;
      for (const control of pending) {
        if (activated >= config.maxControls || overBudget(session)) break;
        visited.add(controlKey(control));
        if (!doc.contains(control) || !isVisible(control)) continue;
        const isExpandable = control.matches('summary,[aria-expanded],[data-slot="accordion-trigger"],[data-slot="collapsible-trigger"]');
        const alreadyOpen = control.matches('summary')
          ? Boolean(control.closest('details')?.open)
          : control.getAttribute('aria-expanded') === 'true';
        if (isExpandable && alreadyOpen) continue;

        activated += 1;
        const label = textOf(control, 30);
        control.scrollIntoView({ block: 'center', behavior: 'auto' });
        await nextFrame();

        const panel = panelOf(control);
        const beforeFingerprint = structureFingerprint();
        const beforeUrl = root.location.href;
        const targets = [...new Set([
          control,
          ...scopeTargets(panel, config.maxSampleTargets - 4),
          ...animatableInViewport(6),
        ])];

        const entries = await sampleTimeline({
          targets,
          durationMs: config.sampleWindowMs,
          maxTargets: config.maxSampleTargets,
          // Panel tab được mount MỚI sau click; portal/route render vào body.
          watchRoot: doc.body,
          onArmed: () => dispatchActivation(control),
        });
        harvest(session, entries, { type: 'activate', on: selectorOf(control), label });

        await wait(config.settleMs);
        const afterFingerprint = structureFingerprint();
        const changed = afterFingerprint !== beforeFingerprint || root.location.href !== beforeUrl;
        if (changed) effective += 1;
        if (switches.length < 60) {
          switches.push({
            control: selectorOf(control), label,
            contentChanged: changed,
            routeChanged: root.location.href !== beforeUrl,
            newUrl: root.location.href !== beforeUrl ? root.location.href : undefined,
            mountedNodes: entries.filter((entry) => entry.appearedAtMs > 0).length,
          });
        }
      }
    }
    report.controlActivation = { activated, passes, effective, switches };
  }

  /* Script chạy sau load nên entrance đã kết thúc. Buộc phát lại:
   * CSS animation bằng cách reset thuộc tính; WAAPI bằng cancel + play. Không phá DOM. */
  async function replayEntrance(session) {
    const { report, config } = session;
    root.scrollTo({ left: 0, top: 0, behavior: 'auto' });
    await nextFrame();
    const targets = animatableInViewport(config.maxSampleTargets, 0);
    if (!targets.length) { report.entranceReplay = { replayed: 0 }; return; }

    const entries = await sampleTimeline({
      targets,
      durationMs: config.entranceWindowMs,
      maxTargets: config.maxSampleTargets,
      onArmed: () => {
        for (const element of targets) {
          const inlineAnimation = element.style.animation;
          element.style.animation = 'none';
          void element.offsetWidth;
          element.style.animation = inlineAnimation || '';
          try {
            for (const animation of element.getAnimations()) { animation.cancel(); animation.play(); }
          } catch (_) {}
        }
      },
    });
    report.entranceReplay = { replayed: harvest(session, entries, { type: 'entrance-replay' }) };
  }

  async function manualObservation(session) {
    const { report, config } = session;
    if (!config.manualSeconds) return;
    let busy = false;
    const handler = (event) => {
      if (busy) return;
      const target = isEl(event.target) ? event.target : null;
      if (!target || !isAnimatable(target)) return;
      busy = true;
      recordMotion(
        session,
        { type: `manual:${event.type}`, on: selectorOf(target) },
        () => scopeTargets(hoverScopeOf(target), config.maxSampleTargets),
        { watchRoot: doc.body },
      ).finally(() => { busy = false; });
    };
    for (const type of ['pointerover', 'focusin', 'click']) doc.addEventListener(type, handler, true);
    console.info(`[MotionCapture] ${config.manualSeconds}s: hãy tự hover / click / cuộn để ghi phần còn lại.`);
    await wait(config.manualSeconds * 1000);
    for (const type of ['pointerover', 'focusin', 'click']) doc.removeEventListener(type, handler, true);
    report.manualObservation = { seconds: config.manualSeconds };
  }

  function collectCssContext(config) {
    const keyframes = [];
    const keyframeNames = new Set();
    const scrollTimelines = [];
    const registeredProperties = [];
    const inaccessibleStyleSheets = [];
    let reducedMotionBlocks = 0;

    function walk(rules, source, insideReducedMotion) {
      for (const rule of [...rules]) {
        const typeName = rule.constructor?.name;
        if (typeName === 'CSSKeyframesRule' && !keyframeNames.has(rule.name) && keyframes.length < config.maxKeyframes) {
          keyframeNames.add(rule.name);
          keyframes.push({ name: rule.name, source, cssText: rule.cssText.slice(0, 1200) });
        }
        if (typeName === 'CSSPropertyRule') registeredProperties.push({ name: rule.name, syntax: rule.syntax, inherits: rule.inherits, initialValue: rule.initialValue });
        if (typeName === 'CSSScrollTimelineRule' || typeName === 'CSSViewTimelineRule') scrollTimelines.push({ type: typeName, cssText: rule.cssText?.slice(0, 400) });
        let reduced = insideReducedMotion;
        if (typeName === 'CSSMediaRule' && /prefers-reduced-motion/.test(rule.conditionText || '')) {
          reduced = true;
          reducedMotionBlocks += 1;
        }
        if (rule.cssRules) walk(rule.cssRules, source, reduced);
      }
    }
    for (const sheet of [...doc.styleSheets]) {
      try { walk(sheet.cssRules, sheet.href || 'inline', false); }
      catch (error) { inaccessibleStyleSheets.push({ href: sheet.href, reason: error.name }); }
    }
    return { keyframes, scrollTimelines, registeredProperties, reducedMotionBlocks, inaccessibleStyleSheets: inaccessibleStyleSheets.slice(0, 10) };
  }

  /* Nhận diện các mẫu motion "cấp cao" mà báo cáo theo từng phần tử không nói ra. */
  function detectPatterns(report) {
    const patterns = [];
    const infinite = [];
    const textSplits = [];
    const nativeTimelines = [];
    const viewTransitions = [];

    for (const element of doc.querySelectorAll('body *')) {
      const style = cs(element);
      if (style.animationIterationCount && style.animationIterationCount.includes('infinite') && infinite.length < 30) {
        infinite.push({ target: selectorOf(element), name: style.animationName, duration: style.animationDuration, timing: style.animationTimingFunction });
      }
      if (style.animationTimeline && style.animationTimeline !== 'auto' && nativeTimelines.length < 30) {
        nativeTimelines.push({ target: selectorOf(element), animationTimeline: style.animationTimeline, animationRange: style.animationRange });
      }
      if (style.viewTransitionName && style.viewTransitionName !== 'none' && viewTransitions.length < 30) {
        viewTransitions.push({ target: selectorOf(element), viewTransitionName: style.viewTransitionName });
      }
      const children = element.children;
      if (children.length >= 6 && textSplits.length < 20) {
        const inlineChildren = [...children].filter((child) => child.localName === 'span' && child.textContent.trim().length <= 3);
        if (inlineChildren.length >= 6) {
          const animated = inlineChildren.filter(isAnimatable).length;
          if (animated >= inlineChildren.length * 0.6) {
            textSplits.push({ target: selectorOf(element), pieces: inlineChildren.length, sample: textOf(element, 40) });
          }
        }
      }
    }

    if (infinite.length) patterns.push({ pattern: 'ambient-loop', count: infinite.length, samples: infinite.slice(0, 6) });
    if (textSplits.length) patterns.push({ pattern: 'split-text', count: textSplits.length, samples: textSplits.slice(0, 6) });
    if (nativeTimelines.length) patterns.push({ pattern: 'native-scroll-timeline', count: nativeTimelines.length, samples: nativeTimelines.slice(0, 6) });
    if (viewTransitions.length) patterns.push({ pattern: 'view-transitions', count: viewTransitions.length, samples: viewTransitions.slice(0, 6) });

    const scrubbed = (report.scrollCoupling || []).filter((item) => item.behaviour === 'scroll-scrubbed');
    if (scrubbed.length) patterns.push({ pattern: 'scroll-scrub', count: scrubbed.length, samples: scrubbed.slice(0, 6) });
    if ((report.pointerCoupling || []).length) patterns.push({ pattern: 'pointer-magnetic', count: report.pointerCoupling.length, samples: report.pointerCoupling.slice(0, 6) });
    return patterns;
  }

  /* ==========================================================================
   * 6. TỔNG HỢP — gộp trùng, token, graph, recipe
   * ========================================================================== */

  /* Nhóm stagger phải tính TRƯỚC khi gộp trùng: nó cần domIndex và parent thật của
   * từng phần tử, mà gộp trùng lại xoá đúng hai thứ đó. */
  function buildRouteGroups(report) {
    const buckets = new Map();
    for (const motion of report.motions) {
      const signature = motion.channels.map((channel) => `${channel.property}:${Math.sign(channel.to - channel.from)}`).sort().join('|');
      const key = `${motion.trigger?.type}::${motion.parent}::${signature}`;
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push(motion);
    }
    const groups = [];
    for (const members of buckets.values()) {
      if (members.length < 3) continue;
      const stagger = detectStagger(members.map((motion) => ({ startMs: motion.startMs, domIndex: motion.domIndex })));
      if (!stagger) continue;
      const id = `${report.routeId}g${groups.length}`;
      for (const motion of members) motion.groupId = id;
      groups.push({
        id,
        route: report.path,
        trigger: members[0].trigger?.type,
        container: members[0].parent,
        rawMembers: members.map((motion) => motion.id),
        ...stagger,
      });
    }
    return groups;
  }

  function compactEasing(easing) {
    if (!easing) return undefined;
    const out = { fn: easing.cssTimingFunction, named: easing.nearestNamed };
    if (easing.kind !== 'bezier') out.kind = easing.kind;
    if (easing.fitRmse > 0.05) out.rmse = easing.fitRmse;
    if (easing.overshoot > 0.03) out.overshoot = easing.overshoot;
    if (easing.oscillations) out.oscillations = easing.oscillations;
    if (easing.spring) out.spring = easing.spring.framerMotion;
    return out;
  }

  /* Chữ ký CỐ TÌNH bỏ selector và route. Header, nav, footer lặp trên mọi trang;
   * card trong một lưới lặp hàng chục lần. Chúng là CÙNG MỘT đặc tả chuyển động,
   * nên ghi một lần rồi đếm — đây là nguồn phình to lớn nhất của bản v3. */
  function channelSignature(channel) {
    const bucket = (value, step) => Math.round(value / step) * step;
    return [
      channel.property, channel.kind,
      round(channel.from, 2), round(channel.to, 2),
      bucket(channel.durationMs, 25), bucket(channel.delayMs, 25),
      channel.easing ? channel.easing.nearestNamed : '-',
    ].join(':');
  }

  function motionSignature(motion) {
    const channels = motion.channels.map(channelSignature).sort().join(';');
    const discrete = (motion.discrete || []).map((item) => `${item.property}:${item.from}>${item.to}`).sort().join(';');
    return `${motion.trigger?.type || '-'}|${channels}|${discrete}|${motion.mountOnly ? 'mount' : ''}`;
  }

  function dedupeMotions(rawMotions, config) {
    const buckets = new Map();
    const bucketOfRawId = new Map();

    for (const motion of rawMotions) {
      const signature = motionSignature(motion);
      let bucket = buckets.get(signature);
      if (!bucket) {
        bucket = { source: motion, count: 0, targets: [], labels: [], routes: [], triggers: [] };
        buckets.set(signature, bucket);
      }
      bucket.count += 1;
      if (motion.target && bucket.targets.length < config.maxVariantTargets && !bucket.targets.includes(motion.target)) bucket.targets.push(motion.target);
      if (motion.label && bucket.labels.length < 3 && !bucket.labels.includes(motion.label)) bucket.labels.push(motion.label);
      if (motion.route && !bucket.routes.includes(motion.route)) bucket.routes.push(motion.route);
      const on = motion.trigger?.label || motion.trigger?.on;
      if (on && bucket.triggers.length < 3 && !bucket.triggers.includes(on)) bucket.triggers.push(on);
      bucketOfRawId.set(motion.id, bucket);
    }

    const ordered = [...buckets.values()].sort((a, b) => b.count - a.count || a.source.startMs - b.source.startMs);
    const motions = ordered.map((bucket, index) => {
      const source = bucket.source;
      bucket.id = `m${index}`;
      return {
        id: bucket.id,
        trigger: source.trigger?.type || 'unknown',
        triggeredBy: bucket.triggers.length ? bucket.triggers : undefined,
        occurrences: bucket.count,
        routes: bucket.routes,
        targets: bucket.targets,
        labels: bucket.labels.length ? bucket.labels : undefined,
        container: source.parent || undefined,
        startMs: source.startMs,
        endMs: source.endMs,
        mountOnly: source.mountOnly || undefined,
        channels: source.channels.map((channel) => ({
          property: channel.property,
          kind: channel.kind,
          from: channel.from,
          to: channel.to,
          peak: channel.peak,
          delayMs: channel.delayMs,
          durationMs: channel.durationMs,
          easing: compactEasing(channel.easing),
        })),
        discrete: source.discrete && source.discrete.length ? source.discrete : undefined,
        groupId: source.groupId,
      };
    });

    const remap = new Map();
    for (const [rawId, bucket] of bucketOfRawId) remap.set(rawId, bucket.id);
    return { motions, remap };
  }

  function buildTokens(motions) {
    const durations = [];
    const delays = [];
    const distances = [];
    const easingCounts = new Map();
    const springs = [];
    for (const motion of motions) {
      // Nhân theo số lần xuất hiện: token là giá trị LẶP NHIỀU, gộp trùng không được xoá tần suất.
      const weight = Math.min(motion.occurrences || 1, 40);
      for (const channel of motion.channels) {
        for (let copy = 0; copy < weight; copy += 1) {
          if (channel.durationMs) durations.push(channel.durationMs);
          if (channel.delayMs) delays.push(channel.delayMs);
          if (channel.property === 'translateX' || channel.property === 'translateY') distances.push(Math.abs(channel.to - channel.from));
        }
        const easing = channel.easing;
        if (!easing) continue;
        const name = easing.kind === 'spring' || easing.kind === 'back-overshoot' ? easing.kind : easing.named;
        easingCounts.set(name, (easingCounts.get(name) || 0) + weight);
        if (easing.spring) springs.push(easing.spring);
      }
    }
    return {
      durationsMs: clusterNumbers(durations, 35).slice(0, 12),
      delaysMs: clusterNumbers(delays, 25).slice(0, 12),
      travelDistancesPx: clusterNumbers(distances, 4).slice(0, 12),
      easings: [...easingCounts.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 12),
      spring: springs.length ? {
        count: springs.length,
        medianStiffness: round(median(springs.map((spring) => spring.stiffness)), 1),
        medianDamping: round(median(springs.map((spring) => spring.damping)), 2),
      } : null,
    };
  }

  const FRAMER_KEYS = { translateX: 'x', translateY: 'y', translateZ: 'z', scaleX: 'scaleX', scaleY: 'scaleY', rotate: 'rotate', skewX: 'skewX', opacity: 'opacity', blur: 'filter' };

  function cssTransformFrom(channels, side) {
    const parts = [];
    for (const channel of channels) {
      const value = side === 'from' ? channel.from : channel.to;
      switch (channel.property) {
        case 'translateX': parts.push(`translateX(${round(value, 2)}px)`); break;
        case 'translateY': parts.push(`translateY(${round(value, 2)}px)`); break;
        case 'translateZ': parts.push(`translateZ(${round(value, 2)}px)`); break;
        case 'scaleX': parts.push(`scaleX(${round(value, 3)})`); break;
        case 'scaleY': parts.push(`scaleY(${round(value, 3)})`); break;
        case 'rotate': parts.push(`rotate(${round(value, 2)}deg)`); break;
        case 'skewX': parts.push(`skewX(${round(value, 2)}deg)`); break;
        default: break;
      }
    }
    return parts.join(' ');
  }

  function buildRecipe(motion, group) {
    const channels = motion.channels.filter((channel) => channel.kind === 'transition');
    if (!channels.length) return null;
    const duration = Math.max(...channels.map((channel) => channel.durationMs));
    const delay = Math.min(...channels.map((channel) => channel.delayMs));
    const primary = channels.find((channel) => channel.easing) || channels[0];
    const easing = primary.easing;
    const timingFunction = easing ? easing.fn : 'ease';
    const selector = motion.targets[0] || '.target';
    const name = `mc-${motion.id}`;
    const isScroll = motion.trigger === 'scroll';

    const fromTransform = cssTransformFrom(channels, 'from');
    const toTransform = cssTransformFrom(channels, 'to');
    const opacityChannel = channels.find((channel) => channel.property === 'opacity');
    const blurChannel = channels.find((channel) => channel.property === 'blur');

    const declarations = (side) => [
      opacityChannel ? `opacity: ${round(opacityChannel[side], 3)};` : '',
      (side === 'from' ? fromTransform : toTransform) ? `transform: ${side === 'from' ? fromTransform : toTransform};` : '',
      blurChannel ? `filter: blur(${round(blurChannel[side], 2)}px);` : '',
    ].filter(Boolean).join(' ');

    const framerInitial = {};
    const framerAnimate = {};
    for (const channel of channels) {
      const key = FRAMER_KEYS[channel.property];
      if (!key) continue;
      if (key === 'filter') {
        framerInitial.filter = `blur(${round(channel.from, 2)}px)`;
        framerAnimate.filter = `blur(${round(channel.to, 2)}px)`;
      } else {
        framerInitial[key] = round(channel.from, 3);
        framerAnimate[key] = round(channel.to, 3);
      }
    }
    const framerTransition = easing?.spring
      ? { ...easing.spring }
      : { duration: round(duration / 1000, 3), ease: easing ? easing.fn : 'easeOut', delay: round(delay / 1000, 3) };
    if (group) framerTransition.staggerChildren = round(group.staggerMs / 1000, 3);

    const gsapVars = Object.entries(framerInitial)
      .map(([key, value]) => `${key}: ${typeof value === 'string' ? `"${value}"` : value}`)
      .join(', ');

    return {
      motionId: motion.id,
      appliesTo: motion.targets,
      occurrences: motion.occurrences,
      css: `@keyframes ${name} { from { ${declarations('from')} } to { ${declarations('to')} } }\n${selector} { animation: ${name} ${round(duration)}ms ${timingFunction} ${round(delay)}ms both; }`,
      framerMotion: `<motion.div initial={${JSON.stringify(framerInitial)}} ${isScroll ? 'whileInView' : 'animate'}={${JSON.stringify(framerAnimate)}} transition={${JSON.stringify(framerTransition)}}${isScroll ? ' viewport={{ once: true, amount: 0.3 }}' : ''} />`,
      gsap: `gsap.from("${selector}", { ${gsapVars}, duration: ${round(duration / 1000, 3)}, ease: "${easing?.named || 'power2.out'}", delay: ${round(delay / 1000, 3)}${group ? `, stagger: ${round(group.staggerMs / 1000, 3)}` : ''}${isScroll ? `, scrollTrigger: { trigger: "${selector}", start: "top 80%" }` : ''} });`,
    };
  }

  /* Graph: node giữ id ngắn, cạnh nén thành chuỗi "from>to" gom theo loại.
   * Selector chỉ nằm MỘT lần trong bảng node -> vừa truy vấn được, vừa cắt mạnh số dòng. */
  function buildGraph(report) {
    const nodes = [];
    const edges = { animates: [], triggers: [], childOf: [], memberOf: [], couples: [] };
    const elementIds = new Map();

    function elementNode(selector, label) {
      if (!selector) return null;
      if (elementIds.has(selector)) return elementIds.get(selector);
      const id = `e${elementIds.size}`;
      elementIds.set(selector, id);
      nodes.push({ id, kind: 'element', selector, label: label || undefined });
      return id;
    }

    const triggerIds = new Map();
    function triggerNode(motion) {
      const key = motion.trigger;
      if (!key) return null;
      if (triggerIds.has(key)) return triggerIds.get(key);
      const id = `t${triggerIds.size}`;
      triggerIds.set(key, id);
      nodes.push({ id, kind: 'trigger', triggerType: key });
      return id;
    }

    for (const motion of report.motions) {
      nodes.push({
        id: motion.id,
        kind: 'motion',
        properties: motion.channels.map((channel) => channel.property),
        durationMs: round(motion.endMs - motion.startMs, 1),
        delayMs: motion.startMs,
        easing: motion.channels.find((channel) => channel.easing)?.easing?.named || null,
        occurrences: motion.occurrences,
      });
      const target = elementNode(motion.targets[0], motion.labels?.[0]);
      if (target) edges.animates.push(`${motion.id}>${target}`);
      const trigger = triggerNode(motion);
      if (trigger) edges.triggers.push(`${trigger}>${motion.id}`);
      const container = elementNode(motion.container);
      if (container && target) edges.childOf.push(`${target}>${container}`);
      if (motion.groupId) edges.memberOf.push(`${motion.id}>${motion.groupId}`);
    }
    for (const group of report.groups) {
      nodes.push({ id: group.id, kind: 'group', staggerMs: group.staggerMs, order: group.order, size: group.memberCount });
    }
    for (const coupling of report.scrollCoupling) {
      const id = `cs${edges.couples.length}`;
      nodes.push({ id, kind: 'coupling', source: 'scroll', property: coupling.property, slope: coupling.unitsPerScrollPx, behaviour: coupling.behaviour });
      const target = elementNode(coupling.target);
      if (target) edges.couples.push(`${id}>${target}`);
    }
    for (const coupling of report.pointerCoupling) {
      const id = `cp${edges.couples.length}`;
      nodes.push({ id, kind: 'coupling', source: 'pointer', channels: coupling.channels.map((channel) => channel.property) });
      const target = elementNode(coupling.target);
      if (target) edges.couples.push(`${id}>${target}`);
    }
    return { nodes, edges };
  }

  function mergeInstrumentation(partials) {
    const animateCalls = new Map();
    const observers = new Map();
    const states = new Map();

    for (const partial of partials) {
      const instrumentation = partial.instrumentation || {};
      for (const call of instrumentation.webAnimationCalls || []) {
        const key = `${JSON.stringify(call.keyframes)}|${JSON.stringify(call.options)}`;
        let entry = animateCalls.get(key);
        if (!entry) { entry = { count: 0, targets: [], keyframes: call.keyframes, options: call.options }; animateCalls.set(key, entry); }
        entry.count += 1;
        if (call.target && entry.targets.length < 3 && !entry.targets.includes(call.target)) entry.targets.push(call.target);
      }
      for (const observer of instrumentation.intersectionObservers || []) {
        const key = JSON.stringify(observer.options);
        let entry = observers.get(key);
        if (!entry) { entry = { count: 0, observedTargets: 0, options: observer.options, sampleTargets: [] }; observers.set(key, entry); }
        entry.count += 1;
        entry.observedTargets += observer.targets.length;
        for (const target of observer.targets) {
          if (entry.sampleTargets.length < 4 && !entry.sampleTargets.includes(target)) entry.sampleTargets.push(target);
        }
      }
      for (const change of instrumentation.stateChanges || []) {
        const key = `${change.target}|${change.attribute}`;
        let entry = states.get(key);
        if (!entry) { entry = { target: change.target, attribute: change.attribute, count: 0, samples: [] }; states.set(key, entry); }
        entry.count += 1;
        if (entry.samples.length < 2) entry.samples.push({ from: change.from, to: change.to });
      }
    }

    return {
      webAnimationCalls: [...animateCalls.values()].sort((a, b) => b.count - a.count).slice(0, 40),
      intersectionObservers: [...observers.values()].sort((a, b) => b.count - a.count).slice(0, 20),
      stateChanges: [...states.values()].sort((a, b) => b.count - a.count).slice(0, 60),
    };
  }

  function mergeCssContext(partials, config) {
    const keyframes = new Map();
    const scrollTimelines = [];
    const registeredProperties = new Map();
    const inaccessible = new Map();
    let reducedMotionBlocks = 0;
    for (const partial of partials) {
      const context = partial.cssContext || {};
      for (const frame of context.keyframes || []) {
        if (!keyframes.has(frame.name)) keyframes.set(frame.name, frame);
      }
      for (const timeline of context.scrollTimelines || []) scrollTimelines.push(timeline);
      for (const property of context.registeredProperties || []) registeredProperties.set(property.name, property);
      for (const sheet of context.inaccessibleStyleSheets || []) inaccessible.set(sheet.href || 'inline', sheet);
      reducedMotionBlocks += context.reducedMotionBlocks || 0;
    }
    return {
      keyframes: [...keyframes.values()].slice(0, config.maxKeyframes),
      scrollTimelines: scrollTimelines.slice(0, 20),
      registeredProperties: [...registeredProperties.values()].slice(0, 40),
      reducedMotionBlocks,
      inaccessibleStyleSheets: [...inaccessible.values()].slice(0, 10),
    };
  }

  function mergeByKey(items, keyOf, limit) {
    const map = new Map();
    for (const item of items) {
      const key = keyOf(item);
      if (!map.has(key)) map.set(key, item);
    }
    return [...map.values()].slice(0, limit);
  }

  function mergePatterns(partials) {
    const map = new Map();
    for (const partial of partials) {
      for (const pattern of partial.patterns || []) {
        let entry = map.get(pattern.pattern);
        if (!entry) { entry = { pattern: pattern.pattern, count: 0, routes: [], samples: [] }; map.set(pattern.pattern, entry); }
        entry.count += pattern.count;
        if (!entry.routes.includes(partial.path)) entry.routes.push(partial.path);
        for (const sample of pattern.samples || []) if (entry.samples.length < 6) entry.samples.push(sample);
      }
    }
    return [...map.values()].sort((a, b) => b.count - a.count);
  }

  const LEGEND = Object.freeze({
    motions: 'Mỗi mục là MỘT đặc tả chuyển động đã gộp trùng. `occurrences` = số phần tử/lần quan sát khớp đúng đặc tả này; `targets` là vài selector đại diện, `routes` là các trang đã thấy nó.',
    trigger: 'scroll = vào viewport khi cuộn | hover / hover-leave = con trỏ vào-ra | activate = click tab/menu/accordion | entrance-replay = phát lại animation lúc tải trang | manual:* = do người dùng thao tác.',
    channels: 'from/to là giá trị đầu-cuối đo được. kind=transition đi một chiều, kind=pulse quay về chỗ cũ. delayMs tính từ lúc kích hoạt.',
    easing: 'fn = cubic-bezier khớp từ dữ liệu đo, named = tên easing chuẩn gần nhất, rmse chỉ hiện khi khớp kém (>0.05), spring = cấu hình framer-motion suy ngược từ overshoot.',
    scrollCoupling: 'scroll-scrubbed = bám liên tục vào tiến trình cuộn (parallax, dựng bằng scroll-timeline / useScroll / ScrollTrigger scrub). one-shot-reveal = kích hoạt một lần khi vào viewport (IntersectionObserver / whileInView).',
    pointerCoupling: 'Phần tử bám vị trí con trỏ — magnetic button, 3D tilt, spotlight. Dựng bằng mousemove + chuẩn hoá theo tâm phần tử.',
    groups: 'Nhóm phần tử chạy lệch nhau đều đặn. staggerMs là nhịp lệch, order là thứ tự phát (dom-order / reverse-dom / center-out / edges-in).',
    tokens: 'Cụm giá trị lặp lại nhiều nhất — chính là design token chuyển động của site.',
    instrumentation: 'Ý ĐỊNH gốc do trang tự khai báo qua Element.animate và IntersectionObserver, chính xác hơn mọi suy luận từ pixel.',
    graph: 'nodes: element / motion / trigger / group / coupling. edges gom theo loại, mỗi cạnh là chuỗi "from>to" trỏ tới id trong nodes.',
    recipes: 'Code dựng lại sẵn dùng cho ba stack: CSS keyframes, framer-motion, GSAP.',
  });

  /* ==========================================================================
   * 7. BỘ CRAWL — mỗi route một iframe, một phiên console duy nhất
   * ========================================================================== */

  const SKIP_EXTENSION = /\.(png|jpe?g|gif|svg|webp|avif|ico|bmp|pdf|zip|rar|7z|docx?|xlsx?|pptx?|mp4|webm|mov|mp3|wav|css|js|mjs|json|xml|txt|rss)$/i;
  const SKIP_PATH = /(wp-admin|wp-login|wp-json|\/api\/|\/feed|logout|dang-xuat|signout|sign-out|checkout|thanh-toan|gio-hang|\/cart|tai-khoan|\/account|\/admin)/i;

  function normalizeRoute(href, base) {
    let url;
    try { url = new URL(href, base); } catch (_) { return null; }
    let origin;
    try { origin = new URL(base).origin; } catch (_) { return null; }
    if (url.origin !== origin) return null;
    if (!/^https?:$/.test(url.protocol)) return null;
    if (SKIP_EXTENSION.test(url.pathname) || SKIP_PATH.test(url.pathname)) return null;
    const path = url.pathname.replace(/\/{2,}/g, '/').replace(/\/+$/, '') || '/';
    const search = url.search || '';
    return { key: path + search, path, url: origin + path + search };
  }

  function discoverRoutes(config, extraLinks) {
    const base = root.location.href;
    const currentKey = normalizeRoute(base, base)?.key;
    const found = new Map();

    const add = (href, label, score) => {
      const route = normalizeRoute(href, base);
      if (!route || route.key === currentKey) return;
      if (label && DANGEROUS.test(label)) return;
      const depth = route.path.split('/').filter(Boolean).length;
      const rank = score + Math.max(0, depth - 1) * 0.6;
      const existing = found.get(route.key);
      if (existing && existing.rank <= rank) {
        if (!existing.label && label) existing.label = label;
        return;
      }
      found.set(route.key, { ...route, label: label || existing?.label || '', rank });
    };

    const query = (selector, score) => {
      let links = [];
      try { links = [...doc.querySelectorAll(selector)]; } catch (_) { return; }
      for (const link of links) add(link.href, textOf(link, 40), score);
    };

    // Nav/header trước: đó chính là "các tab" mà bản v3 không bao giờ đào tới.
    query('header a[href], nav a[href], [role="navigation"] a[href], [class*="menu" i] a[href], [class*="nav" i] a[href]', 0);
    for (const link of extraLinks) add(link.href || link, link.text || '', 1);
    query('main a[href], [role="main"] a[href]', 3);
    query('footer a[href], [class*="footer" i] a[href]', 4);
    query('a[href]', 5);

    return [...found.values()].sort((a, b) => a.rank - b.rank).slice(0, config.maxRoutes);
  }

  async function sitemapLinks(limit) {
    const collected = [];
    const origin = root.location.origin;
    const visit = async (url, depth) => {
      if (collected.length >= limit || depth > 1) return;
      let text;
      try {
        const response = await root.fetch(url, { credentials: 'omit' });
        if (!response.ok) return;
        text = await response.text();
      } catch (_) { return; }
      if (!/<(urlset|sitemapindex)/i.test(text)) return;
      const isIndex = /<sitemapindex/i.test(text);
      const locations = [...text.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/gi)].map((match) => match[1]);
      for (const location of locations.slice(0, isIndex ? 2 : 300)) {
        if (collected.length >= limit) return;
        if (isIndex) await visit(location, depth + 1);
        else collected.push({ href: location, text: '' });
      }
    };
    await visit(`${origin}/sitemap.xml`, 0);
    return collected;
  }

  /* Cài hook NGAY khi document của iframe vừa tồn tại, trước khi bundle của trang kịp
   * gọi Element.animate lần đầu. Chạy trễ thì mất trọn entrance do JS dựng. Nếu thua
   * cuộc đua thì cũng vô hại: capturePage sẽ tự cài bản muộn. */
  function armFrameHooks(frame, config, slot) {
    let tries = 0;
    const tick = () => {
      if (slot.cancelled || slot.hooks) return;
      if (tries > 3000) return;
      tries += 1;
      let frameWindow = null;
      let frameDoc = null;
      try { frameWindow = frame.contentWindow; frameDoc = frame.contentDocument; } catch (_) { return; }
      if (!frameWindow || !frameDoc || !frameDoc.documentElement || frameDoc.URL === 'about:blank') {
        hostWin.setTimeout(tick, 1);
        return;
      }
      const previous = root;
      setContext(frameWindow);
      try { slot.hooks = installHooks(config); slot.early = true; } catch (_) { slot.hooks = null; }
      setContext(previous);
    };
    hostWin.setTimeout(tick, 0);
  }

  async function waitForStableDom(frameWindow, config) {
    let previous = -1;
    for (let check = 0; check < config.maxStabilityChecks; check += 1) {
      await wait(config.stabilityIntervalMs);
      let count = 0;
      try { count = frameWindow.document.querySelectorAll('*').length; } catch (_) { return previous; }
      if (count > 0 && count === previous) return count;
      previous = count;
    }
    return previous;
  }

  async function capturePage(config, meta) {
    const report = {
      routeId: meta.routeId,
      path: meta.path,
      url: meta.url || root.location.href,
      title: doc.title,
      viewport: { width: root.innerWidth, height: root.innerHeight, devicePixelRatio: root.devicePixelRatio },
      documentHeight: documentScrollHeight(),
      prefersReducedMotion: root.matchMedia('(prefers-reduced-motion: reduce)').matches,
      motions: [],
      scrollCoupling: [],
      pointerCoupling: [],
    };
    const session = { report, config, routeId: meta.routeId, deadline: nowMs() + meta.budgetMs };
    const hooks = meta.hooks || installHooks(config);
    const navigationGuard = installNavigationGuard();
    const cssContext = collectCssContext(config);

    try {
      // Hook sớm chỉ bắt được LỜI GỌI Element.animate, không có dữ liệu pixel.
      // Vẫn phải replay để đo from/to/easing thật.
      if (config.replayEntrance) await replayEntrance(session);
      if (config.scrollSweep) await scrollSweep(session);
      if (config.probeScroll) await probeScrollCoupling(session);
      if (config.captureControls) await activateControls(session);
      if (config.captureHover) await hoverSweep(session);
      if (meta.isPrimary) await manualObservation(session);
    } catch (error) {
      report.error = String(error && error.message ? error.message : error);
      console.warn('[MotionCapture] lỗi khi đào route', meta.path, error);
    } finally {
      try { root.scrollTo({ left: 0, top: 0, behavior: 'auto' }); } catch (_) {}
      try { hooks.uninstall(); } catch (_) {}
      try { navigationGuard.uninstall(); } catch (_) {}
    }

    report.cssContext = cssContext;
    report.navigationBlocked = navigationGuard.blocked;
    report.instrumentation = {
      webAnimationCalls: hooks.webAnimationCalls,
      intersectionObservers: hooks.intersectionObservers,
      stateChanges: hooks.stateChanges,
      hookedEarly: Boolean(meta.hooksWereEarly),
    };
    report.groups = buildRouteGroups(report);
    report.patterns = detectPatterns(report);
    return report;
  }

  function forceStyle(element, declarations) {
    for (const [property, value] of Object.entries(declarations)) {
      element.style.setProperty(property, value, 'important');
    }
  }

  /* Khoá trang chủ lại trong lúc crawl route con. Không khoá thì lớp phủ vẫn ở đó
   * nhưng người dùng thấy trang chủ cuộn phía sau và tưởng script đứng yên. */
  function lockHostScroll() {
    const html = hostDoc.documentElement;
    const body = hostDoc.body;
    const previous = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body ? body.style.overflow : '',
      scrollX: hostWin.scrollX,
      scrollY: hostWin.scrollY,
    };
    try { hostWin.scrollTo({ left: 0, top: 0, behavior: 'auto' }); } catch (_) {}
    html.style.setProperty('overflow', 'hidden', 'important');
    if (body) body.style.setProperty('overflow', 'hidden', 'important');
    return () => {
      html.style.overflow = previous.htmlOverflow;
      if (body) body.style.overflow = previous.bodyOverflow;
      try { hostWin.scrollTo({ left: previous.scrollX, top: previous.scrollY, behavior: 'auto' }); } catch (_) {}
    };
  }

  /* Gắn vào <html>, không phải <body>: nhiều trang đặt transform/filter/perspective
   * lên body (Lenis, Locomotive, Framer). Bất kỳ thứ nào trong số đó biến body thành
   * containing block, position:fixed hết bám viewport và lớp phủ trôi mất khỏi màn hình. */
  function mountFrameShell(route) {
    const shell = hostDoc.createElement('div');
    shell.setAttribute('data-motion-capture-shell', '');
    forceStyle(shell, {
      position: 'fixed', left: '0', top: '0', right: '0', bottom: '0',
      width: '100vw', height: '100vh', margin: '0', padding: '0', border: '0',
      background: '#fff', 'z-index': '2147483646', display: 'block',
      transform: 'none', filter: 'none', opacity: '1', visibility: 'visible',
      'pointer-events': 'auto', contain: 'none',
    });

    const frame = hostDoc.createElement('iframe');
    frame.setAttribute('data-motion-capture-frame', '');
    frame.setAttribute('title', `Motion Capture — ${route.path}`);
    forceStyle(frame, {
      width: '100%', height: '100%', border: '0', margin: '0', padding: '0',
      display: 'block', background: '#fff', 'clip-path': 'none',
    });

    shell.appendChild(frame);
    hostDoc.documentElement.appendChild(shell);

    // Nếu <html> cũng bị transform, fixed vẫn vỡ. Đo rồi bù đúng bằng độ lệch.
    const rect = shell.getBoundingClientRect();
    if (Math.abs(rect.top) > 1 || Math.abs(rect.left) > 1) {
      forceStyle(shell, { top: `${-rect.top}px`, left: `${-rect.left}px` });
    }
    return { shell, frame };
  }

  function waitFrameLoad(frame, timeoutMs) {
    return new Promise((resolve) => {
      let done = false;
      const finish = (how) => { if (!done) { done = true; resolve(how); } };
      frame.addEventListener('load', () => finish('load'), { once: true });
      hostWin.setTimeout(() => finish('timeout'), timeoutMs);
    });
  }

  function frameDocumentOf(frame) {
    try { return frame.contentDocument && frame.contentWindow ? frame.contentWindow : null; } catch (_) { return null; }
  }

  async function fetchRouteHtml(route) {
    try {
      const response = await hostWin.fetch(route.url, { credentials: 'include', redirect: 'follow' });
      const frameOptions = response.headers.get('x-frame-options') || '';
      const csp = response.headers.get('content-security-policy') || '';
      if (!response.ok) return { error: `http-${response.status}`, frameOptions, csp };
      const html = await response.text();
      return { html, frameOptions, csp, finalUrl: response.url || route.url };
    } catch (error) {
      return { error: String((error && error.message) || error) };
    }
  }

  /* <base> để mọi đường dẫn tương đối trong HTML vẫn trỏ đúng khi document được
   * ghi vào một frame mang URL about:blank. Cũng là thứ giữ cho doc.baseURI đúng,
   * nhờ đó installNavigationGuard vẫn phân biệt được link nội bộ và link ngoài. */
  function injectBase(html, url) {
    const tag = `<base href="${String(url).replace(/"/g, '&quot;')}">`;
    if (/<base[\s>]/i.test(html)) return html;
    if (/<head[^>]*>/i.test(html)) return html.replace(/<head([^>]*)>/i, (_, attrs) => `<head${attrs}>${tag}`);
    if (/<html[^>]*>/i.test(html)) return html.replace(/<html([^>]*)>/i, (_, attrs) => `<html${attrs}><head>${tag}</head>`);
    return tag + html;
  }

  /* Đường vòng khi X-Frame-Options / CSP frame-ancestors chặn iframe: header chỉ áp
   * cho phản hồi HTTP của frame. Tự fetch HTML rồi document.write vào một frame
   * about:blank thì không có phản hồi nào để chặn, mà frame vẫn same-origin.
   * Phần thưởng kèm theo: hook cài được giữa open() và write(), tức trước script
   * đầu tiên của trang — không còn phải đua với bundle như khi dùng frame.src. */
  async function writeRouteIntoFrame(frame, route, config, slot) {
    const fetched = await fetchRouteHtml(route);
    if (!fetched.html) return { error: fetched.error || 'empty-response', frameOptions: fetched.frameOptions, csp: fetched.csp };

    frame.src = 'about:blank';
    await waitFrameLoad(frame, 8000);
    const frameWindow = frameDocumentOf(frame);
    if (!frameWindow) return { error: 'blank-frame-unavailable' };

    const frameDoc = frameWindow.document;
    frameDoc.open();
    const previous = root;
    setContext(frameWindow);
    try { slot.hooks = installHooks(config); slot.early = true; } catch (_) { slot.hooks = null; }
    setContext(previous);

    const settled = waitFrameLoad(frame, config.routeLoadTimeoutMs);
    frameDoc.write(injectBase(fetched.html, fetched.finalUrl));
    frameDoc.close();
    await settled;
    return { frameWindow, url: fetched.finalUrl, mode: 'document-write' };
  }

  async function captureRouteInFrame(route, config) {
    const unlock = lockHostScroll();
    const { shell, frame } = mountFrameShell(route);
    const teardown = () => { shell.remove(); unlock(); };

    const slot = { hooks: null, early: false, cancelled: false };
    let frameWindow = null;
    let mode = 'src';
    let effectiveUrl = route.url;
    let failure = '';

    const loaded = waitFrameLoad(frame, config.routeLoadTimeoutMs);
    frame.src = route.url;
    armFrameHooks(frame, config, slot);
    const how = await loaded;

    const direct = frameDocumentOf(frame);
    if (direct && direct.document && direct.document.body && direct.document.URL !== 'about:blank') {
      frameWindow = direct;
    } else {
      failure = how === 'timeout' ? 'load-timeout' : 'framing-blocked';
      slot.cancelled = true;
      slot.hooks = null;
      const written = await writeRouteIntoFrame(frame, route, config, slot);
      if (written.frameWindow) {
        frameWindow = written.frameWindow;
        mode = written.mode;
        effectiveUrl = written.url;
      } else {
        teardown();
        return {
          blocked: {
            path: route.path,
            url: route.url,
            reason: failure,
            fallbackError: written.error,
            xFrameOptions: written.frameOptions || undefined,
            csp: written.csp ? written.csp.slice(0, 200) : undefined,
          },
        };
      }
    }

    await wait(config.routeSettleMs);
    await waitForStableDom(frameWindow, config);

    const previous = root;
    setContext(frameWindow);
    let partial;
    try {
      partial = await capturePage(config, {
        routeId: route.routeId,
        path: route.path,
        url: effectiveUrl,
        budgetMs: config.routeBudgetMs,
        hooks: slot.hooks,
        hooksWereEarly: slot.early,
        isPrimary: false,
      });
    } finally {
      slot.cancelled = true;
      setContext(previous);
      teardown();
    }
    partial.loadMode = mode;
    if (failure) partial.directFrameBlocked = failure;
    return { partial };
  }

  function createOverlay() {
    const bar = hostDoc.createElement('div');
    bar.setAttribute('data-motion-capture-overlay', '');
    forceStyle(bar, {
      position: 'fixed', left: '0', right: '0', top: '0', height: '26px', padding: '0 10px',
      background: '#0b0b0b', color: '#7cffb2',
      font: '12px/26px ui-monospace,SFMono-Regular,Menlo,Consolas,monospace',
      'z-index': '2147483647', 'pointer-events': 'none',
      'white-space': 'nowrap', overflow: 'hidden',
      transform: 'none', filter: 'none', opacity: '1', visibility: 'visible', display: 'block',
    });
    hostDoc.documentElement.appendChild(bar);
    const rect = bar.getBoundingClientRect();
    if (Math.abs(rect.top) > 1 || Math.abs(rect.left) > 1) {
      forceStyle(bar, { top: `${-rect.top}px`, left: `${-rect.left}px` });
    }
    return {
      set(text) {
        bar.textContent = `[MotionCapture] ${text}`;
        console.info(`[MotionCapture] ${text}`);
      },
      remove() { bar.remove(); },
    };
  }

  /* ==========================================================================
   * 8. NGÂN SÁCH DÒNG — hạ dần mức chi tiết cho tới khi file vừa khổ
   * ========================================================================== */

  function rebuildDerived(report) {
    report.graph = buildGraph(report);
    report.tokens = buildTokens(report.motions);
  }

  function serializeWithBudget(report, config) {
    const steps = [
      { note: 'bỏ chỉ số phụ của easing (rmse, oscillations)', apply() {
        for (const motion of report.motions) {
          for (const channel of motion.channels) {
            if (!channel.easing) continue;
            delete channel.easing.rmse;
            delete channel.easing.oscillations;
          }
        }
      } },
      { note: 'cắt bớt keyframes CSS và bản ghi state', apply() {
        report.cssContext.keyframes = report.cssContext.keyframes.slice(0, 60);
        report.instrumentation.stateChanges = report.instrumentation.stateChanges.slice(0, 25);
      } },
      { note: 'cắt recipes xuống 20', apply() { report.recipes = report.recipes.slice(0, 20); } },
      { note: 'bỏ motion chỉ xuất hiện một lần và chỉ có một kênh', apply() {
        report.motions = report.motions.filter((motion) => motion.occurrences > 1 || motion.channels.length > 1);
        rebuildDerived(report);
      } },
      { note: 'giữ 250 motion nhiều lần xuất hiện nhất', apply() {
        report.motions = report.motions.slice(0, 250);
        rebuildDerived(report);
      } },
      { note: 'bỏ graph (mọi thông tin của nó đã nằm trong motions)', apply() {
        report.graph = { note: 'Bỏ để giữ ngân sách dòng. Dựng lại được từ motions.' };
      } },
    ];

    const applied = [];
    report.budget = { maxOutputLines: config.maxOutputLines, trimsApplied: applied, lines: 0 };
    let text = stringifyCompact(report, { width: config.lineWidth });
    for (const step of steps) {
      if (countLines(text) <= config.maxOutputLines) break;
      step.apply();
      applied.push(step.note);
      text = stringifyCompact(report, { width: config.lineWidth });
    }
    // Ghi số dòng vào chính báo cáo. `lines` đã chiếm sẵn một dòng ở lần dựng trước
    // nên gán rồi dựng lại không làm tổng số dòng lệch đi.
    report.budget.lines = countLines(text);
    text = stringifyCompact(report, { width: config.lineWidth });
    return { text, lines: countLines(text) };
  }

  function download(text, filename) {
    const blob = new hostWin.Blob([text], { type: 'application/json' });
    const url = hostWin.URL.createObjectURL(blob);
    const link = hostDoc.createElement('a');
    link.href = url;
    link.download = filename;
    link.style.display = 'none';
    hostDoc.body.appendChild(link);
    link.click();
    link.remove();
    hostWin.setTimeout(() => hostWin.URL.revokeObjectURL(url), 5000);
  }

  /* ==========================================================================
   * 9. ĐIỀU PHỐI
   * ========================================================================== */

  function makeConfig(options = {}) {
    const number = (value, fallback) => (Number.isFinite(value) ? value : fallback);
    return {
      replayEntrance: options.replayEntrance !== false,
      scrollSweep: options.scrollSweep !== false,
      probeScroll: options.probeScroll !== false,
      captureControls: options.captureControls !== false,
      captureHover: options.captureHover !== false,
      probePointer: options.probePointer !== false,
      useSitemap: options.useSitemap !== false,
      manualSeconds: number(options.manualSeconds, 0),

      sampleWindowMs: number(options.sampleWindowMs, 1100),
      hoverWindowMs: number(options.hoverWindowMs, 800),
      entranceWindowMs: number(options.entranceWindowMs, 2200),
      settleMs: number(options.settleMs, 240),
      pointerSettleMs: number(options.pointerSettleMs, 140),
      scrollStepRatio: number(options.scrollStepRatio, 0.6),

      maxRoutes: number(options.maxRoutes, 6),
      primaryBudgetMs: number(options.primaryBudgetMs, 150000),
      routeBudgetMs: number(options.routeBudgetMs, 90000),
      routeLoadTimeoutMs: number(options.routeLoadTimeoutMs, 20000),
      routeSettleMs: number(options.routeSettleMs, 900),
      stabilityIntervalMs: number(options.stabilityIntervalMs, 350),
      maxStabilityChecks: number(options.maxStabilityChecks, 6),

      maxSampleTargets: number(options.maxSampleTargets, 28),
      maxMotionsPerRoute: number(options.maxMotionsPerRoute, 400),
      maxScrollSteps: number(options.maxScrollSteps, 40),
      maxCouplingTargets: number(options.maxCouplingTargets, 24),
      maxCouplings: number(options.maxCouplings, 60),
      maxHoverTargets: number(options.maxHoverTargets, 60),
      maxControls: number(options.maxControls, 60),
      maxControlPasses: number(options.maxControlPasses, 4),
      maxKeyframes: number(options.maxKeyframes, 120),
      maxHookRecords: number(options.maxHookRecords, 300),
      maxRecipes: number(options.maxRecipes, 40),
      maxVariantTargets: number(options.maxVariantTargets, 4),
      maxOutputLines: number(options.maxOutputLines, 7500),
      lineWidth: number(options.lineWidth, 200),
    };
  }

  function assemble(partials, config, crawlMeta) {
    const rawMotions = [];
    const groups = [];
    for (const partial of partials) {
      for (const motion of partial.motions) {
        motion.route = partial.path;
        rawMotions.push(motion);
      }
      for (const group of partial.groups || []) groups.push(group);
    }

    const { motions, remap } = dedupeMotions(rawMotions, config);
    for (const group of groups) {
      group.members = [...new Set((group.rawMembers || []).map((id) => remap.get(id)).filter(Boolean))];
      delete group.rawMembers;
    }

    const report = {
      schemaVersion: 'motion-capture/4',
      toolVersion: VERSION,
      capturedAt: crawlMeta.capturedAt,
      site: {
        origin: crawlMeta.origin,
        title: crawlMeta.title,
        viewport: partials[0]?.viewport,
        prefersReducedMotion: partials[0]?.prefersReducedMotion,
      },
      crawl: {
        mode: crawlMeta.mode,
        routesCaptured: partials.length,
        routesBlocked: crawlMeta.blocked,
        routesSkipped: crawlMeta.skipped,
        routes: partials.map((partial) => ({
          routeId: partial.routeId,
          path: partial.path,
          title: partial.title,
          motionsRaw: partial.motions.length,
          controlsClicked: partial.controlActivation?.activated || 0,
          controlsEffective: partial.controlActivation?.effective || 0,
          hoverTargets: partial.hoverAutomation?.exercisedTargets || 0,
          scrollSteps: partial.scrollSweep?.steps || 0,
          documentHeight: partial.documentHeight,
          loadMode: partial.loadMode || 'direct',
          directFrameBlocked: partial.directFrameBlocked,
          hookedEarly: partial.instrumentation?.hookedEarly || false,
          error: partial.error,
        })),
        navigationBlocked: mergeByKey(
          partials.flatMap((partial) => partial.navigationBlocked || []),
          (item) => item.href, 60,
        ),
      },
      legend: LEGEND,
      motions,
      groups: groups.filter((group) => group.members.length),
      scrollCoupling: mergeByKey(
        partials.flatMap((partial) => (partial.scrollCoupling || []).map((item) => ({ ...item, route: partial.path }))),
        (item) => `${item.target}|${item.property}|${item.behaviour}`, config.maxCouplings,
      ),
      pointerCoupling: mergeByKey(
        partials.flatMap((partial) => (partial.pointerCoupling || []).map((item) => ({ ...item, route: partial.path }))),
        (item) => `${item.target}|${item.channels.map((channel) => channel.property).join(',')}`, config.maxCouplings,
      ),
      patterns: mergePatterns(partials),
      tokens: null,
      cssContext: mergeCssContext(partials, config),
      instrumentation: mergeInstrumentation(partials),
      graph: null,
      recipes: [],
      limitations: [
        'Easing/spring là suy ngược từ pixel quan sát được, không phải config gốc trong source. Sai số tăng khi thời lượng < 100ms.',
        'Mỗi route nạp trong iframe cùng origin. Trang trả X-Frame-Options: DENY hoặc frame-ancestors chặt sẽ tự chuyển sang chế độ document-write (fetch HTML rồi ghi vào frame about:blank) — xem crawl.routes[].loadMode. Route nào vẫn hỏng nằm ở crawl.routesBlocked và phải chạy riêng bằng MotionCapture.run() trên chính trang đó.',
      'Ở chế độ document-write, tài nguyên tải qua <base>; service worker và mọi thứ phụ thuộc location.href thật của trang sẽ không hoạt động giống hệt bản gốc.',
        'Hook Element.animate / IntersectionObserver cài ngay khi document iframe tồn tại; route nào hookedEarly=false là thua cuộc đua nên thiếu lời gọi lúc mount.',
        'Synthetic pointer event không kích hoạt CSS :hover thật; harness ép bằng [data-motion-force-hover]. Luật :hover trong stylesheet cross-origin không ép được.',
        'Trang dùng smooth-scroll ảo (Lenis/Locomotive) có thể không phản ứng với scrollTo.',
        'Mỗi route có hạn mức thời gian; route dài có thể dừng giữa chừng — xem crawl.routes để biết đã đào tới đâu.',
        'Gộp trùng dùng chữ ký kênh + easing. Hai chuyển động khác nhau nhưng cùng đặc tả sẽ nằm chung một mục, phân biệt qua `targets`.',
      ],
    };

    rebuildDerived(report);

    const groupById = new Map(report.groups.map((group) => [group.id, group]));
    for (const motion of report.motions) {
      if (report.recipes.length >= config.maxRecipes) break;
      const recipe = buildRecipe(motion, motion.groupId ? groupById.get(motion.groupId) : null);
      if (recipe) report.recipes.push(recipe);
    }

    report.summary = {
      routesCaptured: partials.length,
      motionsRaw: rawMotions.length,
      motionsUnique: motions.length,
      dedupeRatio: rawMotions.length ? round(1 - motions.length / rawMotions.length, 3) : 0,
      byTrigger: [...motions.reduce((map, motion) => map.set(motion.trigger, (map.get(motion.trigger) || 0) + 1), new Map())]
        .map(([trigger, count]) => `${trigger}×${count}`),
      staggerGroups: report.groups.length,
      scrollCouplings: report.scrollCoupling.length,
      pointerCouplings: report.pointerCoupling.length,
      patterns: report.patterns.map((pattern) => `${pattern.pattern}×${pattern.count}`),
      durationTokens: report.tokens.durationsMs.slice(0, 5),
      easingTokens: report.tokens.easings.slice(0, 5),
      springProfile: report.tokens.spring,
      graphNodes: report.graph.nodes.length,
      recipes: report.recipes.length,
      capturedIntent: {
        elementAnimateSignatures: report.instrumentation.webAnimationCalls.length,
        intersectionObserverSignatures: report.instrumentation.intersectionObservers.length,
        stateChangeSignatures: report.instrumentation.stateChanges.length,
      },
    };
    report.finishedAt = new Date().toISOString();
    return report;
  }

  async function crawl(options = {}) {
    const config = makeConfig(options);
    const overlay = createOverlay();
    const partials = [];
    const blocked = [];
    const capturedAt = new Date().toISOString();
    const origin = hostWin.location.origin;
    const siteTitle = hostDoc.title;
    let queue = [];

    try {
      setContext(hostWin);
      const here = normalizeRoute(hostWin.location.href, hostWin.location.href);
      overlay.set(`route 1 — ${here?.path || '/'} (trang hiện tại)`);
      const primary = await capturePage(config, {
        routeId: 'r0',
        path: here?.path || '/',
        budgetMs: config.primaryBudgetMs,
        hooks: options.primaryHooks || null,
        hooksWereEarly: Boolean(options.primaryHooks),
        isPrimary: true,
      });
      partials.push(primary);

      if (options.routes) {
        queue = options.routes
          .map((href) => normalizeRoute(href, hostWin.location.href))
          .filter(Boolean)
          .slice(0, config.maxRoutes);
      } else {
        const extra = [...(primary.navigationBlocked || [])];
        if (config.useSitemap) {
          overlay.set('đọc sitemap.xml…');
          for (const link of await sitemapLinks(config.maxRoutes * 4)) extra.push(link);
        }
        queue = discoverRoutes(config, extra);
      }

      for (let index = 0; index < queue.length; index += 1) {
        const route = { ...queue[index], routeId: `r${index + 1}` };
        overlay.set(`route ${index + 2}/${queue.length + 1} — ${route.path} ${route.label ? `(${route.label})` : ''}`);
        const outcome = await captureRouteInFrame(route, config);
        if (outcome.blocked) {
          blocked.push(outcome.blocked);
          overlay.set(`route ${route.path} bị chặn: ${outcome.blocked.reason}`);
          await wait(300);
        } else {
          outcome.partial.label = route.label;
          partials.push(outcome.partial);
        }
      }
    } finally {
      setContext(hostWin);
      overlay.set('tổng hợp…');
    }

    const report = assemble(partials, config, {
      mode: 'crawl',
      capturedAt,
      origin,
      title: siteTitle,
      blocked,
      skipped: Math.max(0, queue.length + 1 - partials.length - blocked.length),
    });
    report.configuration = config;

    const { text, lines } = serializeWithBudget(report, config);
    download(text, `motion-graph-${hostWin.location.hostname}-${Date.now()}.json`);
    overlay.remove();
    console.info('[MotionCapture] Hoàn tất.', { lines, ...report.summary });
    return report;
  }

  async function run(options = {}) {
    const config = makeConfig({ ...options, maxRoutes: 0 });
    const overlay = createOverlay();
    const capturedAt = new Date().toISOString();
    setContext(hostWin);
    const here = normalizeRoute(hostWin.location.href, hostWin.location.href);
    overlay.set(`quét một trang — ${here?.path || '/'}`);
    let partial;
    try {
      partial = await capturePage(config, {
        routeId: 'r0',
        path: here?.path || '/',
        budgetMs: config.primaryBudgetMs,
        isPrimary: true,
      });
    } finally {
      overlay.set('tổng hợp…');
    }
    const report = assemble([partial], config, {
      mode: 'single-page',
      capturedAt,
      origin: hostWin.location.origin,
      title: hostDoc.title,
      blocked: [],
      skipped: 0,
    });
    report.configuration = config;
    const { text, lines } = serializeWithBudget(report, config);
    download(text, `motion-graph-${hostWin.location.hostname}-${Date.now()}.json`);
    overlay.remove();
    console.info('[MotionCapture] Hoàn tất.', { lines, ...report.summary });
    return report;
  }

  const ARM_KEY = '__motion_capture_arm__';

  /* arm(): đặt cờ rồi reload. Sau reload script chạy từ DOMContentLoaded nên hook
   * Element.animate của TRANG CHÍNH được cài trước bundle — bắt được lời gọi lúc mount.
   * Các route con không cần cờ này: armFrameHooks đã lo phần đó trong iframe. */
  function arm() {
    try { hostWin.sessionStorage.setItem(ARM_KEY, '1'); } catch (_) {}
    console.info('[MotionCapture] Đã đặt cờ. Reload trang để bắt lời gọi animate lúc mount của trang hiện tại.');
  }

  hostWin.MotionCapture = Object.freeze({ version: VERSION, crawl, run, arm, ...PURE_API });

  if (!hostWin.__MOTION_CAPTURE_NO_AUTO_RUN__ && hostWin.top === hostWin.self) {
    let armed = false;
    try { armed = hostWin.sessionStorage.getItem(ARM_KEY) === '1'; hostWin.sessionStorage.removeItem(ARM_KEY); } catch (_) {}
    let primaryHooks = null;
    if (armed && hostDoc.readyState === 'loading') {
      // Cài hook NGAY, không đợi DOMContentLoaded — bundle của trang có thể gọi
      // Element.animate trước sự kiện đó.
      setContext(hostWin);
      try { primaryHooks = installHooks(makeConfig({})); } catch (_) { primaryHooks = null; }
    }
    const start = () => {
      crawl(primaryHooks ? { primaryHooks } : {}).catch((error) => console.error('[MotionCapture] Thất bại:', error));
    };
    if (armed && hostDoc.readyState === 'loading') hostDoc.addEventListener('DOMContentLoaded', start, { once: true });
    else start();
  }

})(typeof globalThis !== 'undefined' ? globalThis : this);
