/**
 * EASINGS — hằng easing dùng chung, tránh hard-code rải rác.
 * GSAP easing (chuỗi tên) cho tween; CSS cubic-bezier cho fallback/transition.
 *
 * NGUYÊN LIỆU HỌC (deep crawl dembrandt --slow trên brand.dropbox.com):
 * Dropbox KHÔNG dùng CSS-transition để tạo cảm giác (durations ≈ 0.001s × 396 lần
 * → motion của họ chạy bằng scroll-progress + Lottie/JS). Cái ĐÁNG học là *bộ
 * cong easing* mà họ lặp lại nhiều nhất:
 *   cubic-bezier(0.4, 0, 0.2, 1)  ×106  → chuẩn "standard", vào–ra mượt
 *   cubic-bezier(0.5, 0, 0.2, 1)  (button) → ease-out mạnh, "đặt mạnh rồi dừng"
 *   cubic-bezier(0.5, 0, 0,   1)        → ease-out rất gắt, snap về cuối
 *   cubic-bezier(0.2, 0, 0.3, 1)        → vào chậm, dừng êm
 * Chỉ học NHỊP (đường cong là toán học, không phải tài sản nhận diện). Y Viện kéo
 * các curve này CHẬM & MỀM hơn cho chất trị liệu, rồi đăng ký qua GSAP CustomEase
 * để dùng THẬT trong converge/scroll (không chỉ power3.out chung chung).
 */
import { gsap } from "./scrollTrigger";

/** cubic-bezier(x1,y1,x2,y2) → path CustomEase "M0,0 C x1,y1 x2,y2 1,1". */
const bezierPath = (x1: number, y1: number, x2: number, y2: number) =>
  `M0,0 C${x1},${y1} ${x2},${y2} 1,1`;

/**
 * Bộ curve "chuyển hóa" từ nhịp Dropbox sang chất Y Viện (ease-out, hãm cực mềm
 * ở cuối = cảm giác "đặt nhẹ vào chỗ"). Đăng ký 1 LẦN, client-only, idempotent.
 */
const RITUAL_CURVES = {
  /** Học cubic-bezier(0.4,0,0.2,1) + (0.5,0,0.2,1) → kéo mềm cho khối hội tụ. */
  convergeRitual: bezierPath(0.32, 0, 0.16, 1),
  /** Học (0.2,0,0.3,1): vào chậm hơn, hãm rất êm — cho chuyển tầng "Không gian". */
  floorRitual: bezierPath(0.22, 0, 0.18, 1),
} as const;

let easesRegistered = false;

/**
 * Đăng ký CustomEase (miễn phí từ GSAP 3.11+) một lần phía client.
 * Gọi TRƯỚC khi parseEase tên ritual trong component motion để chắc curve đã có.
 */
export function registerEases() {
  if (easesRegistered || typeof window === "undefined") return;
  // Import động: tránh kéo plugin vào bundle SSR và giữ guard window an toàn.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { CustomEase } = require("gsap/CustomEase") as typeof import("gsap/CustomEase");
  gsap.registerPlugin(CustomEase);
  for (const [name, path] of Object.entries(RITUAL_CURVES)) {
    if (!CustomEase.get(name)) CustomEase.create(name, path);
  }
  easesRegistered = true;
}

/** Easing GSAP (dùng cho tween/ScrollTrigger). */
export const gsapEasings = {
  /** Vào mượt, ra chậm — chủ đạo, cảm giác thả lỏng. */
  soft: "power3.out",
  /** Nhịp "trị liệu": vào nhanh, hãm RẤT mượt ở cuối (expo-out). Tương đương
   *  cubic-bezier(0.16,1,0.3,1) — nguyên lý học từ MyWebLab cho Breath & Flow. */
  ritual: "power4.out",
  /** Curve CustomEase học từ Dropbox cho khối HỘI TỤ (cần registerEases trước). */
  convergeRitual: "convergeRitual",
  /** Curve CustomEase cho chuyển TẦNG "Không gian" (cần registerEases trước). */
  floorRitual: "floorRitual",
  /** Đối xứng, dùng cho parallax qua lại. */
  inOut: "power2.inOut",
  /** Gần tuyến tính, dùng khi scrub theo scroll. */
  linearish: "none",
} as const;

/** CSS easing (dùng cho transition/animation thuần — khớp globals.css hiện có). */
export const cssEasings = {
  /** cubic-bezier mềm đã dùng xuyên suốt dự án. */
  soft: "cubic-bezier(0.22, 1, 0.36, 1)",
  /** Nhịp "trị liệu" (Breath & Flow) — khớp var(--ease-ritual) trong globals. */
  ritual: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** easing đặc trưng kiểu slide-in (đã có trong globals). */
  slide: "cubic-bezier(0.15, 0.5, 0.05, 1)",
  /**
   * Spring rời rạc bằng linear() (kỹ thuật motion.dev): mô phỏng lò xo nhẹ cho
   * hover card/nút — "nảy" tinh tế rồi ổn định, KHÔNG cần runtime JS.
   */
  springSoft:
    "linear(0, 0.006, 0.025, 0.101, 0.27, 0.504, 0.737, 0.914, 1.012, 1.04, 1.027, 1.006, 0.997, 0.998, 1)",
} as const;
