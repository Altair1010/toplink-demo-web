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
    <div className="rounded-lg border border-sand bg-white/60 p-8 shadow-sm sm:p-12">
      <h2 className="text-center font-display text-3xl font-black text-crimson-600 sm:text-4xl">
        Hôm nay cơ thể chị/anh đang cần gì?
      </h2>
      <p className="mt-2 text-center text-lg text-ink-soft">Chọn một nhu cầu, Toplink sẽ gợi ý liệu trình phù hợp.</p>

      <div className="mt-7 flex flex-wrap justify-center gap-2.5">
        {NEEDS.map((need) => (
          <button
            key={need.key}
            onClick={() => setActive(need.key)}
            className={`flex items-center gap-2 rounded-md border px-5 py-3 text-base font-medium transition-all ${
              active === need.key
                ? "border-crimson-600 bg-crimson-600 text-gold-200 shadow-sm"
                : "border-sand bg-ivory text-ink hover:border-gold-400"
            }`}
          >
            <span aria-hidden>{need.emoji}</span>
            {need.label}
          </button>
        ))}
      </div>

      {active && (
        <div className="animate-fade-up mt-8 rounded-md bg-cream/60 p-6 sm:p-6">
          <p className="text-base text-ink-soft">
            Gợi ý cho nhu cầu <span className="font-semibold text-crimson-600">{activeNeed?.label}</span>:
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {matches.map((s) => (
              <Link
                key={s.slug}
                href={`/dich-vu/${s.slug}`}
                className="group rounded-md border border-sand bg-white p-4 transition-colors hover:border-gold-400"
              >
                <h4 className="font-display text-lg font-semibold text-crimson-600">{s.name}</h4>
                <p className="mt-1 text-sm text-ink-soft">{s.duration} · từ {s.priceFrom}</p>
              </Link>
            ))}
          </div>
          <Link
            href={`/dat-lich?need=${active}`}
            className="mt-5 inline-flex items-center gap-2 rounded-sm bg-gold-500 px-6 py-3 text-base font-semibold text-wood-700 transition-colors hover:bg-gold-400"
          >
            Đặt lịch với nhu cầu này <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
