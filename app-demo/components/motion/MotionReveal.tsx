"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger, registerMotion } from "@/lib/motion/scrollTrigger";
import { breathFlow } from "@/lib/motion/config";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * MOTION REVEAL — reveal-on-scroll của hệ "Breath & Flow" (GSAP + ScrollTrigger).
 * Khác `Reveal.tsx` (IntersectionObserver, dùng khắp site): bản này nhịp CHẬM – SÂU,
 * easing "ritual" (expo-out học từ MyWebLab), biên độ nhỏ (revealDistance), stagger
 * tinh tế theo `index`. Chỉ chạm transform/opacity (GPU). Reduced-motion: hiện tĩnh.
 *
 * Dùng cho tiêu đề/khối phụ trong 2 section mới. Tự cleanup ScrollTrigger theo trigger.
 */
type From = "up" | "down" | "left" | "right";

export default function MotionReveal({
  children,
  from = "up",
  index = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  from?: From;
  /** Thứ tự để tạo stagger nhịp thở (0,1,2…). */
  index?: number;
  className?: string;
  as?: "div" | "span" | "li";
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      registerMotion();
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) return;

      const d = breathFlow.revealDistance;
      const offset: Record<From, { x?: number; y?: number }> = {
        up: { y: d },
        down: { y: -d },
        left: { x: -d },
        right: { x: d },
      };

      gsap.fromTo(
        el,
        { ...offset[from], autoAlpha: 0 },
        {
          x: 0,
          y: 0,
          autoAlpha: 1,
          duration: breathFlow.slow,
          ease: breathFlow.ease,
          delay: index * breathFlow.stagger,
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none none" },
        }
      );

      return () => {
        ScrollTrigger.getAll()
          .filter((t) => t.trigger === el)
          .forEach((t) => t.kill());
      };
    },
    { scope: ref, dependencies: [from, index] }
  );

  return (
    // @ts-expect-error — Tag là union literal hợp lệ, ref tương thích HTMLElement.
    <Tag ref={ref} data-breath-reveal className={className}>
      {children}
    </Tag>
  );
}
