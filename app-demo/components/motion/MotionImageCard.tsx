"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerMotion } from "@/lib/motion/scrollTrigger";
import { motionConfig } from "@/lib/motion/config";

/**
 * MOTION IMAGE CARD — card scroll-driven: hé lộ (trượt lên + mờ→rõ) khi vào
 * viewport, ảnh bên trong parallax rất nhẹ theo nhịp cuộn. Dùng cho 4 tầng
 * “Không gian Y Viện”. Reduced-motion: hiển thị tĩnh, không parallax.
 *
 * Ảnh cần parallax: đặt `data-parallax` trên phần tử ảnh bên trong children.
 */
export default function MotionImageCard({
  index = 0,
  className = "",
  children,
}: {
  index?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      registerMotion();
      const el = ref.current;
      if (!el) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // 1) Reveal: trượt lên + mờ→rõ, stagger nhẹ theo index.
      gsap.fromTo(
        el,
        { y: 56, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: motionConfig.duration,
          ease: motionConfig.ease,
          delay: (index % 4) * 0.08,
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
        }
      );

      // 2) Parallax ảnh: dịch dọc rất nhẹ theo tiến độ cuộn qua card.
      const media = el.querySelector<HTMLElement>("[data-parallax]");
      if (media) {
        gsap.fromTo(
          media,
          { yPercent: -motionConfig.parallaxDistance / 12 },
          {
            yPercent: motionConfig.parallaxDistance / 12,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: motionConfig.scrub },
          }
        );
      }

      return () => {
        ScrollTrigger.getAll()
          .filter((t) => t.trigger === el)
          .forEach((t) => t.kill());
      };
    },
    { scope: ref, dependencies: [index] }
  );

  return (
    <div ref={ref} data-motion-card className={className}>
      {children}
    </div>
  );
}
