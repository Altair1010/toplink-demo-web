"use client";

import { SYMPTOMS, type Symptom } from "@/data/content";
import BodyMap from "./BodyMap";
import BodyStatePanel from "./BodyStatePanel";

/**
 * Section 1 — Body Signal Interface (thay hero truyền thống).
 * Trái: câu hỏi lớn + chips triệu chứng + panel chẩn mềm.
 * Phải: body map trừu tượng, vùng sáng theo selection (ẩn dưới md — mobile chips là chính).
 * State nâng lên page-level qua props để RecommendationDrawer dùng chung.
 */
export default function BodySignalInterface({
  selected,
  onToggle,
}: {
  selected: Symptom[];
  onToggle: (key: string) => void;
}) {
  const selectedKeys = selected.map((s) => s.key);
  const activeRegions = selected.map((s) => s.region);

  return (
    <section className="relative overflow-hidden bg-ivory">
      <div className="mx-auto grid min-h-[88svh] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[7fr_5fr] lg:py-20">
        <div>
          <p className="eyebrow text-sm font-semibold text-crimson-600">Y Viện Toplink · Dưỡng Thân · Tỉnh Thức</p>
          <h1 className="mt-6 max-w-xl text-balance font-serif-display text-[length:var(--text-hero)] text-ink">
            Hôm nay cơ thể đang báo điều gì?
          </h1>
          <p className="measure-lead mt-5 text-lg leading-relaxed text-ink-soft">
            Chạm vào dấu hiệu anh/chị đang cảm nhận — Y Viện lắng nghe trước khi chăm sóc.
          </p>

          {/* Chips triệu chứng */}
          <div className="mt-8 flex max-w-xl flex-wrap gap-2.5" role="group" aria-label="Dấu hiệu cơ thể">
            {SYMPTOMS.map((sym) => {
              const on = selectedKeys.includes(sym.key);
              return (
                <button
                  key={sym.key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => onToggle(sym.key)}
                  className={`rounded-sm border px-5 py-2.5 text-base font-medium transition-colors ${
                    on
                      ? "border-crimson-600 bg-crimson-600 text-ivory"
                      : "border-sand bg-ivory text-ink hover:border-crimson-300 hover:text-crimson-600"
                  }`}
                >
                  {sym.label}
                </button>
              );
            })}
          </div>

          <div className="mt-8 min-h-[9rem] border-t border-sand pt-6">
            <BodyStatePanel selected={selected} />
          </div>
        </div>

        {/* Body map — desktop */}
        <div className="hidden h-[520px] lg:block" aria-hidden>
          <BodyMap activeRegions={activeRegions} />
        </div>
      </div>
    </section>
  );
}
