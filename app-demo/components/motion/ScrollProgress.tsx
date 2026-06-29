"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerMotion } from "@/lib/motion/scrollTrigger";
import { motionConfig } from "@/lib/motion/config";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * SCROLL PROGRESS — đường/thanh "tự vẽ" theo nhịp cuộn TRONG PHẠM VI một section
 * (không phải toàn trang). Nguyên lý học từ MyWebLab "SvgStrokeProcess": nét dẫn
 * dắt hành trình. Fill scale theo progress của ScrollTrigger (scrub) → mềm theo Lenis.
 *
 * Tự tìm vùng scope qua ancestor `[data-progress-scope]`. Chỉ scale transform (GPU).
 * Reduced-motion: hiện đầy (fill = 1), không scrub.
 */
export default function ScrollProgress({
  orientation = "vertical",
  className = "",
}: {
  orientation?: "vertical" | "horizontal";
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const vertical = orientation === "vertical";

  useGSAP(
    () => {
      registerMotion();
      const track = trackRef.current;
      const fill = fillRef.current;
      if (!track || !fill) return;

      const scope = track.closest<HTMLElement>("[data-progress-scope]") ?? track.parentElement;
      if (!scope) return;

      if (prefersReducedMotion()) {
        gsap.set(fill, { scaleX: vertical ? 1 : 1, scaleY: 1 });
        return;
      }

      const axis = vertical ? "scaleY" : "scaleX";
      gsap.set(fill, { [axis]: 0, transformOrigin: vertical ? "top center" : "left center" });

      const tween = gsap.fromTo(
        fill,
        { [axis]: 0 },
        {
          [axis]: 1,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top 70%",
            end: "bottom 70%",
            scrub: motionConfig.scrub,
          },
        }
      );

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    },
    { scope: trackRef, dependencies: [vertical] }
  );

  return (
    <div
      ref={trackRef}
      aria-hidden
      className={`pointer-events-none overflow-hidden bg-sand/70 ${
        vertical ? "w-px" : "h-px w-full"
      } ${className}`}
    >
      <div
        ref={fillRef}
        className={`bg-gold-500 ${vertical ? "h-full w-px" : "h-px w-full"}`}
      />
    </div>
  );
}
