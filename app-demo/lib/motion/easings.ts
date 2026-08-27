/**
 * EASINGS — hằng easing dùng chung, tránh hard-code rải rác.
 * GSAP easing (chuỗi tên) cho tween; CSS cubic-bezier cho fallback/transition.
 *
 * Các curve riêng của Toplink được đăng ký qua GSAP CustomEase cho hội tụ và
 * chuyển tầng; chúng không đại diện cho palette, typography hay asset bên ngoài.
 */
import { gsap } from "./scrollTrigger";

/** cubic-bezier(x1,y1,x2,y2) → path CustomEase "M0,0 C x1,y1 x2,y2 1,1". */
const bezierPath = (x1: number, y1: number, x2: number, y2: number) =>
  `M0,0 C${x1},${y1} ${x2},${y2} 1,1`;

/**
 * Bộ curve ease-out, hãm mềm ở cuối để tạo cảm giác "đặt nhẹ vào chỗ".
 * Đăng ký 1 LẦN, client-only, idempotent.
 */
const RITUAL_CURVES = {
  /** Curve cho khối hội tụ. */
  convergeRitual: bezierPath(0.32, 0, 0.16, 1),
  /** Curve vào chậm, hãm êm cho chuyển tầng "Không gian". */
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
  /** Nhịp "trị liệu": vào nhanh, hãm RẤT mượt ở cuối (expo-out). */
  ritual: "power4.out",
  /** Curve CustomEase cho khối HỘI TỤ (cần registerEases trước). */
  convergeRitual: "convergeRitual",
  /** Curve CustomEase cho chuyển TẦNG "Không gian" (cần registerEases trước). */
  floorRitual: "floorRitual",
  /** Đối xứng, dùng cho parallax qua lại. */
  inOut: "power2.inOut",
  /** Gần tuyến tính, dùng khi scrub theo scroll. */
  linearish: "none",
} as const;

/**
 * KHÔNG khai easing CSS ở đây nữa. CSS là nguồn sự thật duy nhất cho easing dùng
 * trong transition/animation thuần: `--ease-soft`, `--ease-ritual`, `--ease-slide`,
 * `--ease-spring` khai trong `styles/tokens.css` và skin ghi đè được.
 * File này chỉ còn giữ curve riêng của GSAP (CustomEase + tên ease dựng sẵn).
 */
