/**
 * MOTION THEME — đọc nhịp motion TỪ CSS, để CSS là nguồn sự thật duy nhất.
 *
 * Trước đây `--motion-slow: 760ms` (tokens.css) và `slow: 0.76` (config.ts) được khai
 * bằng tay ở hai nơi, chỉ nối với nhau bằng một dòng comment. Không có gì bắt chúng
 * khớp, và skin đổi CSS thì GSAP không hay biết. File này xoá cặp trùng đó.
 *
 * ⚠️ CHỈ gọi trong effect phía client (`useEffect` / `useGSAP`). Gọi ở module scope
 * hay trong default-prop sẽ làm vỡ static export với `document is not defined`.
 *
 * ⚠️ Đơn vị KHÔNG cố định. Token khai `760ms` trong nguồn nhưng trình biên dịch CSS
 * chuẩn hoá thành `.76s` ở bản build. Parser dưới đây nhận cả hai — chia 1000 mù
 * quáng sẽ sai đúng 1000 lần.
 */

export type MotionTheme = {
  /** Giây — hợp đơn vị GSAP. */
  fast: number;
  medium: number;
  slow: number;
  /** Pixel. */
  revealDistance: number;
  parallaxDepth: number;
};

/** "760ms" → 0.76 · ".76s" → 0.76 · "0.76" → 0.76. Phải xét "ms" TRƯỚC "s". */
function toSeconds(raw: string): number | null {
  const v = raw.trim();
  if (!v) return null;
  const n = Number.parseFloat(v);
  if (!Number.isFinite(n)) return null;
  if (v.endsWith("ms")) return n / 1000;
  return n; // "s" hoặc số trần — đều đã là giây
}

/** "32px" → 32 · "32" → 32. */
function toPx(raw: string): number | null {
  const n = Number.parseFloat(raw.trim());
  return Number.isFinite(n) ? n : null;
}

/**
 * Trả về nhịp motion hiện hành, đã tính cả skin `[data-brand]` đang bật.
 *
 * Trả `null` khi thiếu/hỏng token thay vì rơi về hằng số dự phòng — hằng số dự phòng
 * sẽ dựng lại đúng cái nguồn sự thật thứ hai mà file này sinh ra để xoá. Caller xử lý
 * `null` y như `prefersReducedMotion()`: bỏ qua animation, để phần tử ở trạng thái
 * tĩnh cuối (CSS base-state vốn đã hiển thị đầy đủ).
 *
 * KHÔNG cache: skin có thể đổi lúc chạy, và mỗi lần gọi chỉ tốn một lần đọc computed
 * style trong effect.
 */
export function readMotionTheme(): MotionTheme | null {
  if (typeof document === "undefined") return null;

  const cs = getComputedStyle(document.documentElement);
  const fast = toSeconds(cs.getPropertyValue("--motion-fast"));
  const medium = toSeconds(cs.getPropertyValue("--motion-medium"));
  const slow = toSeconds(cs.getPropertyValue("--motion-slow"));
  const revealDistance = toPx(cs.getPropertyValue("--reveal-distance"));
  const parallaxDepth = toPx(cs.getPropertyValue("--section-parallax-depth"));

  if (
    fast === null ||
    medium === null ||
    slow === null ||
    revealDistance === null ||
    parallaxDepth === null
  ) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[motion] Thiếu token nhịp motion trong styles/tokens.css — bỏ qua animation. " +
          "Cần đủ: --motion-fast, --motion-medium, --motion-slow, --reveal-distance, " +
          "--section-parallax-depth.",
      );
    }
    return null;
  }

  return { fast, medium, slow, revealDistance, parallaxDepth };
}
