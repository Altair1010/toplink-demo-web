"use client";

import { useEffect, useRef } from "react";
import { asset } from "@/lib/asset";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { wind, type WindPreset } from "@/lib/motion/config";

/**
 * GIÓ CUỐN LÁ TRÀ — trường hạt lá trên GPU (Three.js, lazy-load).
 * Lá thật (PNG cắt nền, khai báo trong config.wind.leaves) trôi theo "gió": rơi xiên,
 * đảo/xoay (tumble), parallax theo chiều sâu. GIÓ MẠNH HƠN KHI CUỘN (gió kéo lá).
 *
 * An toàn & nhẹ: lazy-import three (không phình bundle route khác); cap DPR; pause khi
 * offscreen/tab ẩn; TẮT hẳn khi prefers-reduced-motion hoặc không hỗ trợ WebGL; dispose
 * sạch khi unmount. Canvas pointer-events-none, nằm SAU nội dung.
 */
export default function WindLeafField({
  preset = "ambient",
  className = "",
}: {
  preset?: WindPreset;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (prefersReducedMotion()) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    // Lazy-load three chỉ khi cần (client).
    import("three")
      .then((THREE) => {
        if (disposed) return;
        cleanup = initWindField(THREE, host, wind.presets[preset]);
      })
      .catch(() => {
        /* WebGL/three lỗi → bỏ qua, trang vẫn chạy bình thường */
      });

    return () => {
      disposed = true;
      cleanup?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preset]);

  return (
    <div
      ref={hostRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    />
  );
}

type PresetCfg = (typeof wind.presets)[WindPreset];

/** Khởi tạo scene; trả về hàm cleanup. Tách khỏi React để dễ dispose. */
function initWindField(
  THREE: typeof import("three"),
  host: HTMLElement,
  cfg: PresetCfg
): (() => void) | undefined {
  const renderer = (() => {
    try {
      return new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    } catch {
      return null;
    }
  })();
  if (!renderer) return;

  let w = host.clientWidth || window.innerWidth;
  let h = host.clientHeight || window.innerHeight;
  const dpr = Math.min(window.devicePixelRatio || 1, wind.maxDpr);

  renderer.setPixelRatio(dpr);
  renderer.setSize(w, h);
  renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;";
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  // Ortho camera dùng đơn vị PIXEL → kích thước/vị trí lá trực quan theo px.
  const camera = new THREE.OrthographicCamera(-w / 2, w / 2, h / 2, -h / 2, -1000, 1000);
  camera.position.z = 10;

  // ----- Texture: lá thật nếu có, ngược lại fallback vẽ canvas -----
  const loader = new THREE.TextureLoader();
  const sources = wind.leaves.length ? wind.leaves.map((p) => asset(p)) : [null];
  const textures = sources.map((src) => {
    const tex = src ? loader.load(src) : new THREE.CanvasTexture(makeLeafCanvas());
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 2;
    return tex;
  });

  // Mỗi texture một InstancedMesh (chia đều count).
  const geo = new THREE.PlaneGeometry(1, 1);
  const total = cfg.count;
  const perMesh = Math.ceil(total / textures.length);
  const margin = 120; // px tràn mép để lá vào/ra mượt
  const dummy = new THREE.Object3D();

  type Leaf = {
    x: number; y: number; z: number;
    size: number; depth: number;
    rot: number; rotSpeed: number;
    swayPhase: number; swayAmp: number;
    flip: number; flipSpeed: number;
  };

  const meshes: import("three").InstancedMesh[] = [];
  const leafData: Leaf[][] = [];

  const rand = (a: number, b: number) => a + Math.random() * (b - a);
  const spawn = (): Leaf => {
    const depth = rand(0.4, 1); // gần (1) trôi nhanh hơn xa (0.4) → parallax
    return {
      x: rand(-w / 2 - margin, w / 2 + margin),
      y: rand(-h / 2 - margin, h / 2 + margin),
      z: depth * 5,
      size: rand(cfg.sizeRange[0], cfg.sizeRange[1]) * depth,
      depth,
      rot: rand(0, Math.PI * 2),
      rotSpeed: rand(-0.6, 0.6),
      swayPhase: rand(0, Math.PI * 2),
      swayAmp: rand(8, 26),
      flip: rand(0, Math.PI * 2),
      flipSpeed: rand(0.4, 1.2),
    };
  };

  textures.forEach((tex, ti) => {
    const n = Math.min(perMesh, total - ti * perMesh);
    if (n <= 0) return;
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      opacity: cfg.opacity,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.InstancedMesh(geo, mat, n);
    mesh.frustumCulled = false;
    const data: Leaf[] = [];
    for (let i = 0; i < n; i++) data.push(spawn());
    leafData.push(data);
    meshes.push(mesh);
    scene.add(mesh);
  });

  // ----- Gió: hướng cơ bản rơi xiên + cơn gió theo VẬN TỐC CUỘN -----
  const baseWindX = -18; // px/s, trôi sang trái nhẹ
  const baseFallY = -26; // px/s, rơi xuống
  let gust = 0; // cộng thêm theo cuộn
  let lastScrollY = window.scrollY;
  const onScroll = () => {
    const dy = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;
    gust += dy * wind.scrollGust * 60; // dồn lực gió theo lượng cuộn
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  // ----- Vòng lặp render (pause khi offscreen / tab ẩn) -----
  let raf = 0;
  let visible = true;
  let last = performance.now();
  let elapsed = 0;

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!visible || document.hidden) return;
    elapsed += dt;
    gust *= 0.94; // gió lặng dần
    const windX = (baseWindX + gust * 220) * cfg.speed;
    const fallY = baseFallY * cfg.speed;
    const t = elapsed;

    meshes.forEach((mesh, mi) => {
      const data = leafData[mi];
      for (let i = 0; i < data.length; i++) {
        const lf = data[i];
        lf.x += windX * lf.depth * dt;
        lf.y += (fallY * lf.depth + Math.sin(t * 0.6 + lf.swayPhase) * lf.swayAmp * dt) * 1;
        lf.rot += lf.rotSpeed * dt;
        lf.flip += lf.flipSpeed * dt;

        // Wrap: ra khỏi khung → tái sinh ở mép đối diện trên đỉnh.
        if (lf.x < -w / 2 - margin) lf.x = w / 2 + margin;
        if (lf.x > w / 2 + margin) lf.x = -w / 2 - margin;
        if (lf.y < -h / 2 - margin) {
          lf.y = h / 2 + margin;
          lf.x = rand(-w / 2 - margin, w / 2 + margin);
        }

        dummy.position.set(lf.x, lf.y, lf.z);
        dummy.rotation.set(0, 0, lf.rot);
        const flipScale = Math.cos(lf.flip); // đảo mặt lá (tumble) qua scale x
        dummy.scale.set(lf.size * flipScale, lf.size, 1);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    });

    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(frame);

  // Pause khi section ra khỏi viewport.
  const io = new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
    },
    { threshold: 0 }
  );
  io.observe(host);

  // Resize theo container.
  const ro = new ResizeObserver(() => {
    w = host.clientWidth || w;
    h = host.clientHeight || h;
    renderer.setSize(w, h);
    camera.left = -w / 2;
    camera.right = w / 2;
    camera.top = h / 2;
    camera.bottom = -h / 2;
    camera.updateProjectionMatrix();
  });
  ro.observe(host);

  // ----- Cleanup: dispose toàn bộ tài nguyên GPU -----
  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener("scroll", onScroll);
    meshes.forEach((m) => {
      (m.material as import("three").Material).dispose();
      scene.remove(m);
    });
    geo.dispose();
    textures.forEach((t) => t.dispose());
    renderer.dispose();
    if (renderer.domElement.parentNode === host) host.removeChild(renderer.domElement);
  };
}

/** Texture lá fallback (vẽ canvas) — dùng tạm trước khi có ảnh lá thật. */
function makeLeafCanvas(): HTMLCanvasElement {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = c.height = s;
  const ctx = c.getContext("2d")!;
  ctx.translate(s / 2, s / 2);
  // Thân lá (hình giọt) với gradient xanh trà → vàng nhạt.
  const grad = ctx.createLinearGradient(0, -s / 2, 0, s / 2);
  grad.addColorStop(0, "#7d9b6a");
  grad.addColorStop(1, "#4f6b46");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.42);
  ctx.bezierCurveTo(s * 0.34, -s * 0.24, s * 0.3, s * 0.3, 0, s * 0.44);
  ctx.bezierCurveTo(-s * 0.3, s * 0.3, -s * 0.34, -s * 0.24, 0, -s * 0.42);
  ctx.fill();
  // Gân lá.
  ctx.strokeStyle = "rgba(255,252,247,0.45)";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.38);
  ctx.lineTo(0, s * 0.4);
  for (let i = 1; i <= 4; i++) {
    const y = -s * 0.3 + i * s * 0.16;
    ctx.moveTo(0, y);
    ctx.lineTo(s * 0.16, y - s * 0.06);
    ctx.moveTo(0, y);
    ctx.lineTo(-s * 0.16, y - s * 0.06);
  }
  ctx.stroke();
  return c;
}
