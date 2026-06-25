/**
 * EASINGS — hằng easing dùng chung, tránh hard-code rải rác.
 * GSAP easing (chuỗi tên) cho tween; CSS cubic-bezier cho fallback/transition.
 */

/** Easing GSAP (dùng cho tween/ScrollTrigger). */
export const gsapEasings = {
  /** Vào mượt, ra chậm — chủ đạo, cảm giác thả lỏng. */
  soft: "power3.out",
  /** Đối xứng, dùng cho parallax qua lại. */
  inOut: "power2.inOut",
  /** Gần tuyến tính, dùng khi scrub theo scroll. */
  linearish: "none",
} as const;

/** CSS easing (dùng cho transition/animation thuần — khớp globals.css hiện có). */
export const cssEasings = {
  /** cubic-bezier mềm đã dùng xuyên suốt dự án. */
  soft: "cubic-bezier(0.22, 1, 0.36, 1)",
  /** easing đặc trưng kiểu slide-in (đã có trong globals). */
  slide: "cubic-bezier(0.15, 0.5, 0.05, 1)",
} as const;
