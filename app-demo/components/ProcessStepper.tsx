"use client";

import { useEffect, useRef, useState } from "react";
import { ClipboardList, MessagesSquare, Hand, HeartPulse, type LucideIcon } from "lucide-react";
import { PROCESS_STEPS, type ProcessStep } from "@/data/content";

/**
 * Quy trình trị liệu 4 bước (cảm hứng "Il Metodo" của MyWebLab — chỉ rút nguyên lý:
 * ít chữ, số thứ tự rõ, bước active nổi bật theo scroll/hover). Không thư viện:
 * IntersectionObserver theo pattern của Reveal. Desktop hàng ngang có đường nối,
 * mobile vertical stepper. Respect prefers-reduced-motion (mọi bước hiện sẵn).
 */
const ICONS: Record<ProcessStep["icon"], LucideIcon> = {
  ClipboardList,
  MessagesSquare,
  Hand,
  HeartPulse,
};

export default function ProcessStepper() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const els = refs.current.filter(Boolean) as HTMLLIElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        });
      },
      { threshold: 0.6, rootMargin: "-20% 0px -40% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {PROCESS_STEPS.map((step, i) => {
        const Icon = ICONS[step.icon];
        const isActive = hover === i || (hover === null && active === i);
        return (
          <li
            key={step.title}
            data-idx={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
            className="relative"
          >
            {/* Đường nối ngang (desktop), nối các bước thành một hành trình */}
            {i < PROCESS_STEPS.length - 1 && (
              <span
                className="absolute left-[calc(50%+2.5rem)] right-[-1.25rem] top-9 hidden h-px bg-sand lg:block"
                aria-hidden
              />
            )}
            <div
              className={`flex h-full flex-col items-center rounded-md border p-7 text-center transition-all duration-500 ${
                isActive
                  ? "-translate-y-1 border-gold-500 bg-crimson-600 text-ivory shadow-soft"
                  : "border-sand bg-ivory text-ink"
              }`}
            >
              <span
                className={`flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                  isActive ? "border-gold-400 bg-crimson-700 text-gold-300" : "border-gold-500 text-crimson-600"
                }`}
              >
                <Icon className="h-8 w-8" />
              </span>
              <span
                className={`mt-4 font-display text-3xl ${isActive ? "text-gold-300" : "text-gold-600"}`}
              >
                0{i + 1}
              </span>
              <h3 className={`mt-1 font-display text-2xl ${isActive ? "text-ivory" : "text-crimson-600"}`}>
                {step.title}
              </h3>
              <p
                className={`mt-2 text-base leading-relaxed ${isActive ? "text-cream/90" : "text-ink-soft"}`}
              >
                {step.desc}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
