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
  /** Easing khối HỘI TỤ. CustomEase học từ nhịp ease-out của Dropbox (xem
   *  easings.ts → convergeRitual). Cần registerEases() trước khi parseEase. */
  ease: "convergeRitual",
  duration: 1.2,

  /** Khoảng trượt ban đầu của khối trước khi hội tụ (px). */
  convergeDistance: 96,
  /** Parallax phụ rất nhẹ để tạo chiều sâu (px). */
  parallaxDistance: 48,

  /** Trạng thái “chưa hội tụ”. */
  inactiveScale: 0.96,
  /** Đủ rõ để ĐỌC ĐƯỢC khi chưa hội tụ (≥ ~4.5:1) — tránh chữ hồng nhạt mờ (fail WCAG). */
  inactiveOpacity: 0.72,
  /** Trạng thái “đã hội tụ về giữa”. */
  activeScale: 1,
  activeOpacity: 1,

  /** Chiều cao scene converge (vh) — vừa đủ cho motion, tránh khoảng trắng thừa. */
  sceneHeightVh: 150,
  /** Pin có chừa khoảng trống không (true để layout không nhảy). */
  pinSpacing: true,
  /** Độ lệch nhịp giữa các block trong cùng một scene (theo progress 0–1). */
  stagger: 0.12,

  /** Reveal-scene (Không gian 4 tầng): mỗi card hé lộ trong cửa sổ progress này. */
  revealWindow: 0.55,
} as const;

/**
 * BREATH & FLOW — hệ motion riêng cho 2 section mới (Quy trình trị liệu + Không gian).
 * Nguyên lý chắt lọc từ MyWebLab (expo-out, scroll-driven, chỉ transform/opacity)
 * nhưng CHẬM hơn, biên độ nhỏ hơn, có nhịp thở — chất trị liệu Đông y.
 * Durations ở đây tính bằng GIÂY (cho GSAP); bản CSS (ms) nằm trong globals.css.
 */
export const breathFlow = {
  /** Thời lượng (giây) — khớp --motion-fast/medium/slow trong globals.css. */
  fast: 0.18,
  medium: 0.42,
  slow: 0.76,
  /** Easing GSAP "trị liệu" (xem gsapEasings.ritual). */
  ease: "power4.out",
  /** Biên độ reveal (px) — nhỏ, điềm tĩnh. Khớp --reveal-distance. */
  revealDistance: 32,
  /** Độ trễ nhịp giữa các phần tử (giây). */
  stagger: 0.12,

  /** Sticky-stack "Không gian 4 tầng". */
  stack: {
    /** Easing chuyển tầng — CustomEase học từ Dropbox (easings.ts → floorRitual). */
    ease: "floorRitual",
    /** Tầng inactive lùi sau bao nhiêu (px) để tạo chiều sâu. Khớp --section-parallax-depth. */
    recedeDistance: 80,
    inactiveScale: 0.94,
    inactiveOpacity: 0.72,
    activeScale: 1,
    activeOpacity: 1,
    /** Cửa sổ progress mỗi tầng "đứng giữa" trước khi nhường tầng sau. */
    holdWindow: 0.18,
    /** Chiều cao scene (vh) cho mỗi tầng — đủ không gian chuyển tầng. */
    perFloorVh: 70,
  },

  /** "Không gian 4 tầng" — CUỘN NGANG điện ảnh (pin + track ngang, KHÔNG chồng ảnh). */
  horizontal: {
    /** Easing chuyển tầng (CustomEase floorRitual). */
    ease: "floorRitual",
    /** Độ trễ scrub — cao hơn = trượt "dính" mượt. */
    scrub: 1,
    /** Chiều cuộn dọc đổi sang mỗi tầng (vh). N × giá trị này = tổng cao scene. */
    perPanelVh: 70,
    /** Parallax ảnh trong panel (px) — ảnh trôi ngược nhẹ tạo chiều sâu. */
    parallaxInner: 64,
    /** Có snap về từng tầng không (mượt nhưng vẫn dừng đúng tầng). */
    snap: true,
  },
} as const;

/**
 * WIND — hệ "gió cuốn lá trà" (Three.js GPU particles). Lá thật (PNG cắt nền) do người
 * dùng cấp ở /public/images/leaves; rỗng → fallback texture lá vẽ bằng canvas.
 * Chỉ animate trên GPU; tắt khi reduced-motion / không WebGL.
 */
export const wind = {
  /** Ảnh lá thật. Thêm path PNG nền-trong vào đây khi có asset. */
  leaves: [] as string[],
  /** Cấu hình theo "điểm đặt": hero (mạnh) vs section nền (nhẹ). */
  presets: {
    hero: { count: 30, speed: 0.45, sizeRange: [26, 60] as [number, number], opacity: 0.9 },
    ambient: { count: 16, speed: 0.35, sizeRange: [20, 44] as [number, number], opacity: 0.55 },
  },
  /** Gió theo vận tốc cuộn: nhân lực gió khi người dùng cuộn (gió "kéo" lá). */
  scrollGust: 0.001,
  /** Giới hạn devicePixelRatio để nhẹ máy. */
  maxDpr: 1.75,
} as const;

export type WindPreset = keyof typeof wind.presets;

export type BreathFlow = typeof breathFlow;

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
