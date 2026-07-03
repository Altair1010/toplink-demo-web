"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, registerMotion } from "@/lib/motion/scrollTrigger";
import { breathFlow } from "@/lib/motion/config";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Số liệu "đếm lên" khi cuộn tới (kỹ thuật reveal-on-view). Tách phần SỐ ở đầu chuỗi để
 * tween 0 → giá trị, giữ nguyên tiền tố/hậu tố ("100%", "8+"). Chuỗi phi số ("An toàn")
 * → hiện tĩnh. Base-state = giá trị thật (SSR/no-JS/reduced-motion an toàn).
 */
export default function StatCounter({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const m = value.match(/^(\D*)(\d[\d.,]*)(.*)$/);

  useEffect(() => {
    const el = ref.current;
    if (!el || !m) return;
    if (prefersReducedMotion()) return;
    registerMotion();

    const [, prefix, numStr, suffix] = m;
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const target = parseFloat(numStr.replace(/,/g, ""));
    const obj = { n: 0 };

    const tween = gsap.to(obj, {
      n: target,
      duration: 1.6,
      ease: breathFlow.ease, // "trị liệu" power4.out — chậm dần mềm hơn power2
      paused: true,
      onUpdate: () => {
        el.textContent = `${prefix}${obj.n.toLocaleString("vi-VN", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })}${suffix}`;
      },
      onComplete: () => {
        // Settle nhẹ khi số chốt: nhấc lên 6% rồi hạ về — nhịp "thở", chỉ transform (GPU).
        gsap.fromTo(
          el,
          { yPercent: 6, opacity: 0.9 },
          { yPercent: 0, opacity: 1, duration: breathFlow.medium, ease: breathFlow.ease }
        );
      },
    });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        el.textContent = `${prefix}0${suffix}`;
        tween.play();
      },
    });

    return () => {
      st.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} className={className}>
      {value}
    </div>
  );
}
