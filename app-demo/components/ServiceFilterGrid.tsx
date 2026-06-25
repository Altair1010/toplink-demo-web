"use client";

import { useState } from "react";
import BookCard from "@/components/BookCard";
import Reveal from "@/components/Reveal";
import { SERVICES, LEVELS, type ServiceLevel } from "@/data/content";

/**
 * Lưới Sản phẩm & Dịch vụ có filter theo nhóm (cảm hứng "Popular products" của
 * Autodesk — chỉ rút nguyên lý: card rõ ràng, có phân nhóm, hover tinh tế, CTA rõ).
 * Card tái dùng BookCard (hiệu ứng "mở sách" của Toplink) — mỗi card tự có CTA.
 */
type Filter = "all" | ServiceLevel;

// 3 liệu trình chủ lực — đưa lên đầu để "chỉ đường" cho khách (kiểu Popular products).
const FEATURED_SLUGS = ["tri-lieu-co-vai-gay", "duong-sinh-khi-huyet", "lieu-trinh-than-tam-tri"];

export default function ServiceFilterGrid() {
  const [filter, setFilter] = useState<Filter>("all");
  const list = filter === "all" ? SERVICES : SERVICES.filter((s) => s.level === filter);

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
            onClick={() => setFilter(c.key)}
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

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((s, i) => (
          <Reveal key={s.slug} from="up" delay={(i % 3) * 100}>
            <BookCard service={s} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
