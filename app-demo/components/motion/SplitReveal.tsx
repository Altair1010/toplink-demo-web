"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap, ScrollTrigger, registerAdvanced } from "@/lib/motion/scrollTrigger";
import { registerEases } from "@/lib/motion/easings";
import { breathFlow } from "@/lib/motion/config";

/**
 * Reveal chữ theo DÒNG bằng GSAP SplitText (kỹ thuật gsap.com): mỗi dòng trượt lên +
 * hiện dần, lệch nhịp (stagger), khi cuộn tới. Base-state hiển thị ĐỦ chữ (SSR/no-JS an
 * toàn) — chỉ khi JS chạy & không reduced-motion mới split + animate, xong revert sạch.
 */
export default function SplitReveal({
  as: Tag = "div",
  className = "",
  children,
  type = "lines",
  delay = 0,
  start = "top 85%",
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  type?: "lines" | "words" | "chars";
  delay?: number;
  start?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let split: { revert: () => void } | undefined;
    let st: ScrollTrigger | undefined;
    let cancelled = false;

    (async () => {
      // Chờ font thật tải xong để SplitText đo DÒNG chính xác (tránh split sai khi
      // còn font fallback → reflow giật). Có timeout an toàn nếu fonts API thiếu.
      if (document.fonts?.ready) {
        await Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 1500))]);
      }
      await registerAdvanced();
      registerEases();
      if (cancelled || !ref.current) return;
      const { SplitText } = await import("gsap/SplitText");
      if (cancelled || !ref.current) return;

      split = new SplitText(el, {
        type,
        linesClass: "split-line",
      }) as unknown as { revert: () => void; lines: Element[]; words: Element[]; chars: Element[] };
      const targets =
        type === "lines"
          ? (split as unknown as { lines: Element[] }).lines
          : type === "words"
            ? (split as unknown as { words: Element[] }).words
            : (split as unknown as { chars: Element[] }).chars;

      gsap.set(el, { autoAlpha: 1 }); // chữ đã có sẵn; bật lại nếu trước đó ẩn
      const tween = gsap.from(targets, {
        yPercent: 120,
        autoAlpha: 0,
        duration: breathFlow.slow,
        ease: breathFlow.ease,
        stagger: 0.08,
        delay,
        scrollTrigger: { trigger: el, start, toggleActions: "play none none none" },
      });
      st = tween.scrollTrigger;
    })();

    return () => {
      cancelled = true;
      st?.kill();
      split?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
