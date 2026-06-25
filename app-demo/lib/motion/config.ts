/**
 * MOTION CONFIG — nguồn cấu hình DUY NHẤT cho toàn bộ hệ Motion UI.
 * Cảm hứng cơ chế từ opening của brand.dropbox.com (khối trượt + hội tụ về giữa
 * theo nhịp cuộn), nhưng KHÔNG mượn màu/typography/asset của Dropbox.
 *
 * Triết lý Y Viện: motion CHẬM – MỀM – TRỊ LIỆU, không gây chóng mặt.
 * Chỉ animate transform/opacity (GPU). Mọi component motion đọc config ở đây.
 */
export const motionConfig = {
  /** Độ trễ scrub của ScrollTrigger (giây). Cao hơn = mượt/“dính” hơn. */
  scrub: 0.8,
  /** Easing chủ đạo cho tween GSAP rời rạc. */
  ease: "power3.out",
  duration: 1.2,

  /** Khoảng trượt ban đầu của khối trước khi hội tụ (px). */
  convergeDistance: 160,
  /** Parallax phụ rất nhẹ để tạo chiều sâu (px). */
  parallaxDistance: 48,

  /** Trạng thái “chưa hội tụ”. */
  inactiveScale: 0.94,
  inactiveOpacity: 0.35,
  /** Trạng thái “đã hội tụ về giữa”. */
  activeScale: 1,
  activeOpacity: 1,

  /** Chiều cao scene converge (vh) — đủ không gian cho motion diễn ra. */
  sceneHeightVh: 220,
  /** Pin có chừa khoảng trống không (true để layout không nhảy). */
  pinSpacing: true,
  /** Độ lệch nhịp giữa các block trong cùng một scene (theo progress 0–1). */
  stagger: 0.12,

  /** Reveal-scene (Không gian 4 tầng): mỗi card hé lộ trong cửa sổ progress này. */
  revealWindow: 0.55,
} as const;

/** Breakpoint nghiệm thu responsive (px). */
export const breakpoints = {
  sm: 375,
  md: 768,
  lg: 1024,
  xl: 1440,
} as const;

/** Dưới ngưỡng này (px) coi là mobile → tắt pin/scrub, dùng reveal tĩnh nhẹ. */
export const PIN_MIN_WIDTH = breakpoints.lg;

export type MotionConfig = typeof motionConfig;
