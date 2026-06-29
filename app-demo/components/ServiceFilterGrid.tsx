"use client";

import { useLayoutEffect, useRef, useState } from "react";
import BookCard from "@/components/BookCard";
import Reveal from "@/components/Reveal";
import { gsap, registerAdvanced } from "@/lib/motion/scrollTrigger";
import { SERVICES, LEVELS, type ServiceLevel } from "@/data/content";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Lưới Sản phẩm & Dịch vụ có filter theo nhóm. Khi đổi nhóm, các card TÁI BỐ TRÍ mượt
 * bằng GSAP **Flip** (kỹ thuật gsap.com: chụp layout trước → tween về layout sau), card
 * vào/ra fade-scale. Reduced-motion / chưa nạp Flip → đổi tức thì (fallback an toàn).
 */
type Filter = "all" | ServiceLevel;

// 3 liệu trình chủ lực — đưa lên đầu để "chỉ đường" cho khách (kiểu Popular products).
const FEATURED_SLUGS = ["tri-lieu-co-vai-gay", "duong-sinh-khi-huyet", "lieu-trinh-than-tam-tri"];

export default function ServiceFilterGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = filter === "all" ? SERVICES : SERVICES.filter((s) => s.level === filter);

  const gridRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const flipRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stateRef = useRef<any>(null);

  useLayoutEffect(() => {
    let on = true;
    (async () => {
      await registerAdvanced();
      const { Flip } = await import("gsap/Flip");
      if (on) flipRef.current = Flip;
    })();
    return () => {
      on = false;
    };
  }, []);

  // Sau khi danh sách đổi → tween từ layout đã chụp về layout mới.
  useLayoutEffect(() => {
    const Flip = flipRef.current;
    if (!Flip || !stateRef.current) return;
    Flip.from(stateRef.current, {
      duration: 0.55,
      ease: "power3.inOut",
      absolute: true,
      scale: true,
      prune: true, // bỏ card KHÔNG đổi vị trí khỏi tween → nhẹ hơn, stagger sạch hơn
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onEnter: (els: any) =>
        gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onLeave: (els: any) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.3, ease: "power2.in" }),
    });
    stateRef.current = null;
  }, [filter]);

  const changeFilter = (key: Filter) => {
    const Flip = flipRef.current;
    const reduced = typeof window !== "undefined" && prefersReducedMotion();
    if (Flip && gridRef.current && !reduced) {
      stateRef.current = Flip.getState(gridRef.current.querySelectorAll("[data-flip-id]"));
    }
    setFilter(key);
  };

  const featured = FEATURED_SLUGS.map((slug) => SERVICES.find((s) => s.slug === slug)).filter(
    (s): s is (typeof SERVICES)[number] => Boolean(s)
  );

  const chips: { key: Filter; label: string }[] = [
    { key: "all", label: "Tất cả" },
    ...LEVELS.map((l) => ({ key: l.key as Filter, label: l.label })),
  ];

  return (
    <div>
      {/* Liệu trình được chọn nhiều — 3 card lớn nổi bật */}
      <div className="mb-12">
        <p className="text-center font-display text-base font-bold uppercase tracking-[0.14em] text-crimson-600">
          Liệu trình được chọn nhiều
        </p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => (
            <Reveal key={s.slug} from="up" delay={i * 100}>
              <BookCard service={s} featured />
            </Reveal>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2.5">
        {chips.map((c) => (
          <button
            key={c.key}
            onClick={() => changeFilter(c.key)}
            aria-pressed={filter === c.key}
            className={`rounded-md border px-5 py-2.5 text-base font-medium transition-all ${
              filter === c.key
                ? "border-crimson-600 bg-crimson-600 text-gold-200 shadow-soft"
                : "border-sand bg-ivory text-ink hover:border-gold-400"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s) => (
          <div key={s.slug} data-flip-id={s.slug}>
            <BookCard service={s} />
          </div>
        ))}
      </div>
    </div>
  );
}
