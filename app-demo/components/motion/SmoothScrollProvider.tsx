"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerMotion } from "@/lib/motion/scrollTrigger";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Smooth-scroll cao cấp bằng Lenis, đồng bộ với GSAP ScrollTrigger.
 * - TẮT hoàn toàn khi prefers-reduced-motion: reduce → rơi về native scroll.
 * - Drive Lenis bằng gsap.ticker (một nguồn thời gian, không double-rAF).
 * - Cleanup đầy đủ khi unmount để tránh memory leak.
 *
 * Đặt bọc {children} trong layout. Header/Footer/Zalo nằm NGOÀI luồng pin nên
 * không bị ảnh hưởng; nút Zalo (fixed) vẫn hiển thị bình thường.
 */
export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    registerMotion();

    if (prefersReducedMotion()) {
      return; // tôn trọng người dùng: không hijack scroll
    }

    // CHỈ bật Lenis trên desktop có chuột (pointer:fine). Trên mobile/cảm ứng, dùng
    // native scroll để tránh Lenis (smooth) tranh quyền với snap GSAP → hết giật.
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.9, // cuộn mềm nhưng khớp nhịp scrub GSAP hơn (giảm lệch)
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000); // gsap.ticker tính bằng giây
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
