"use client";

import { useState } from "react";
import { BODY_STATES, type BodyStateKey, type Symptom } from "@/data/content";
import { dominantStates } from "@/lib/recommendation";

/**
 * Section 2 — 4 trạng thái cơ thể: Tắc · Hàn · Hư · Loạn.
 * Học thuyết Đông y biến thành interface: click mở giải thích cực ngắn +
 * hướng chăm sóc. Expand bằng CSS grid-rows (motion #2). Trạng thái trội
 * từ selection ở Section 1 được đánh dấu chấm son.
 */
export default function FourBodyStates({ selected }: { selected: Symptom[] }) {
  const [open, setOpen] = useState<BodyStateKey | null>(null);
  const dominant = dominantStates(selected).map((s) => s.key);

  return (
    <section className="on-dark bg-crimson-800 section-pad">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-serif-display text-[length:var(--text-statement)] text-gold-200">
          Khí đang ở trạng thái nào?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-lg text-cream/80">
          Đông y nhìn cơ thể qua bốn trạng thái. Chạm để hiểu cơ thể mình.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden border border-gold-700 bg-gold-700 sm:grid-cols-2 lg:grid-cols-4">
          {BODY_STATES.map((st) => {
            const isOpen = open === st.key;
            const isDominant = dominant.includes(st.key);
            return (
              <div key={st.key} data-open={isOpen} className="state-card bg-crimson-800">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : st.key)}
                  className="flex w-full items-baseline justify-between px-7 py-8 text-left transition-colors hover:bg-crimson-700"
                >
                  <span className="font-serif-display text-3xl text-ivory">
                    {st.name}
                    {isDominant && (
                      <span
                        className="ml-2 inline-block h-2.5 w-2.5 rounded-full bg-gold-400 align-middle"
                        title="Trạng thái cơ thể anh/chị có thể đang gặp"
                      />
                    )}
                  </span>
                  <span aria-hidden className="text-xl text-gold-400">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div className="state-panel">
                  <div>
                    <div className="px-7 pb-8">
                      <p className="text-base leading-relaxed text-cream/90">{st.essence}</p>
                      <ul className="mt-3 space-y-1 text-sm text-cream/70">
                        {st.signals.map((sig) => (
                          <li key={sig}>· {sig}</li>
                        ))}
                      </ul>
                      <p className="mt-4 border-t border-gold-700 pt-4 text-base leading-relaxed text-gold-200">
                        {st.careDirection}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
