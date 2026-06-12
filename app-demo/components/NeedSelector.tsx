"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { NEEDS, SERVICES } from "@/data/content";

export default function NeedSelector() {
  const [active, setActive] = useState<string | null>(null);
  const matches = active ? SERVICES.filter((s) => s.needs.includes(active)).slice(0, 3) : [];
  const activeNeed = NEEDS.find((n) => n.key === active);

  return (
    <div className="rounded-3xl border border-sand bg-white/60 p-6 shadow-sm sm:p-10">
      <h2 className="text-center font-display text-2xl font-semibold text-clay-700 sm:text-3xl">
        Hôm nay cơ thể chị/anh đang cần gì?
      </h2>
      <p className="mt-2 text-center text-sm text-ink-soft">Chọn một nhu cầu, Toplink sẽ gợi ý liệu trình phù hợp.</p>

      <div className="mt-7 flex flex-wrap justify-center gap-2.5">
        {NEEDS.map((need) => (
          <button
            key={need.key}
            onClick={() => setActive(need.key)}
            className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition-all ${
              active === need.key
                ? "border-clay-700 bg-clay-700 text-ivory shadow-sm"
                : "border-sand bg-ivory text-ink hover:border-gold-400"
            }`}
          >
            <span aria-hidden>{need.emoji}</span>
            {need.label}
          </button>
        ))}
      </div>

      {active && (
        <div className="animate-fade-up mt-8 rounded-2xl bg-cream/60 p-5 sm:p-6">
          <p className="text-sm text-ink-soft">
            Gợi ý cho nhu cầu <span className="font-semibold text-clay-700">{activeNeed?.label}</span>:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {matches.map((s) => (
              <Link
                key={s.slug}
                href={`/dich-vu/${s.slug}`}
                className="group rounded-xl border border-sand bg-white p-4 transition-colors hover:border-gold-400"
              >
                <h4 className="font-display text-base font-semibold text-clay-700">{s.name}</h4>
                <p className="mt-1 text-xs text-ink-soft">{s.duration} · từ {s.priceFrom}</p>
              </Link>
            ))}
          </div>
          <Link
            href={`/dat-lich?need=${active}`}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-wood-700 transition-colors hover:bg-gold-400"
          >
            Đặt lịch với nhu cầu này <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
