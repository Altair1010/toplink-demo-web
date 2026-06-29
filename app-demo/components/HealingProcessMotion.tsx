"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { ClipboardList, MessagesSquare, Hand, HeartPulse, type LucideIcon } from "lucide-react";
import { gsap, ScrollTrigger, registerMotion } from "@/lib/motion/scrollTrigger";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";
import { breathFlow } from "@/lib/motion/config";
import { PROCESS_STEPS, type ProcessStep } from "@/data/content";
import ScrollProgress from "@/components/motion/ScrollProgress";

/**
 * QUY TRÌNH TRỊ LIỆU — "ritual journey" 4 bước (hệ Breath & Flow).
 * Nguyên lý học từ MyWebLab "SvgStrokeProcess": một mạch dẫn tự vẽ theo scroll,
 * mỗi bước hé lộ + sáng lên khi mạch chạm tới; bước chưa tới mờ + lùi nhẹ.
 *
 * - Desktop: line dọc TRUNG TÂM (ScrollProgress) + các bước xen kẽ trái/phải, node trên line.
 * - Mobile: vertical stepper — line dọc bên trái, bước stack xuống.
 * - Active theo scroll (ScrollTrigger center) + hover override (micro-interaction).
 * - Reduced-motion: tất cả hiện tĩnh, bước đầu coi như active.
 */
const ICONS: Record<ProcessStep["icon"], LucideIcon> = {
  ClipboardList,
  MessagesSquare,
  Hand,
  HeartPulse,
};

export default function HealingProcessMotion() {
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);

  useGSAP(
    () => {
      registerMotion();
      const reduced = prefersReducedMotion();
      const items = itemRefs.current.filter(Boolean) as HTMLLIElement[];
      if (reduced || !items.length) return;

      const triggers: ScrollTrigger[] = [];

      // 1) Reveal từng bước: trượt lên + mờ→rõ với nhịp ritual (forgiving: chỉ play).
      items.forEach((el) => {
        gsap.fromTo(
          el.querySelector("[data-step-card]"),
          { y: breathFlow.revealDistance, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: breathFlow.slow,
            ease: breathFlow.ease,
            scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      });

      // 2) Active theo TIẾN ĐỘ cả section (bền với mọi tốc độ cuộn — bước cuối luôn
      //    được sáng khi cuộn tới cuối; tránh bỏ sót như cửa sổ trigger hẹp).
      const n = items.length;
      const journey = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 60%",
        end: "bottom 65%",
        onUpdate: (self) => {
          const idx = Math.min(n - 1, Math.round(self.progress * (n - 1)));
          // Guard: chỉ setState khi index ĐỔI tầng — tránh re-render React mỗi tick cuộn.
          setActive((prev) => (prev === idx ? prev : idx));
        },
      });
      triggers.push(journey);

      return () => triggers.forEach((t) => t.kill());
    },
    { scope: rootRef, dependencies: [] }
  );

  return (
    <div ref={rootRef} data-progress-scope className="relative mt-12">
      {/* Mạch dẫn dọc: TRUNG TÂM trên desktop, bên trái trên mobile. */}
      <ScrollProgress
        orientation="vertical"
        className="absolute bottom-6 top-6 left-[1.625rem] lg:left-1/2 lg:-translate-x-1/2"
      />

      <ol className="relative space-y-10 lg:space-y-0">
        {PROCESS_STEPS.map((step, i) => {
          const Icon = ICONS[step.icon];
          const isActive = hover === i || (hover === null && active === i);
          const flip = i % 2 === 1; // chẵn = trái, lẻ = phải (zig-zag desktop)
          return (
            <li
              key={step.title}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className="relative lg:grid lg:min-h-[15rem] lg:grid-cols-2 lg:items-center lg:gap-16"
            >
              {/* Node trên mạch dẫn */}
              <span
                className={`absolute top-7 left-[1.625rem] z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 transition-all duration-500 lg:left-1/2 lg:block ${
                  isActive ? "scale-125 border-gold-400 bg-gold-500" : "border-sand bg-ivory"
                }`}
                aria-hidden
              />

              {/* Card bước — desktop đặt lệch trái/phải; mobile thụt vào sau mạch dẫn */}
              <div className={flip ? "lg:col-start-2" : "lg:col-start-1 lg:text-right"}>
                <div
                  data-step-card
                  className={`relative ml-14 rounded-md border p-7 transition-all duration-500 lg:ml-0 ${
                    isActive
                      ? "-translate-y-1 border-gold-500 bg-crimson-600 text-ivory shadow-soft"
                      : "border-sand bg-ivory text-ink lg:opacity-45"
                  } ${flip ? "" : "lg:text-left"}`}
                >
                  <div className={`flex items-center gap-4 ${flip ? "" : "lg:flex-row-reverse"}`}>
                    <span
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                        isActive ? "border-gold-400 bg-crimson-700 text-gold-300" : "border-gold-500 text-crimson-600"
                      }`}
                    >
                      <Icon className="h-7 w-7" />
                    </span>
                    <span className={`font-serif-display text-5xl leading-none ${isActive ? "text-gold-300" : "text-gold-600"}`}>
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className={`mt-4 font-display text-2xl ${isActive ? "text-ivory" : "text-crimson-600"}`}>
                    {step.title}
                  </h3>
                  <p className={`mt-2 text-base leading-relaxed ${isActive ? "text-cream/90" : "text-ink-soft"}`}>
                    {step.desc}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
