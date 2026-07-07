import { RITUAL_MOMENTS } from "@/data/content";
import Reveal from "@/components/Reveal";

/**
 * Section 3 — "Một ngày ở Y Viện": timeline cảm giác, 7 khoảnh khắc.
 * Mỗi moment = 1 dòng serif + 1 câu. Fade-in bằng Reveal (IntersectionObserver,
 * CSS transition) — không pin, không scroll hijack.
 */
export default function RitualTimeline() {
  return (
    <section className="section-pad-lg bg-cream">
      <div className="mx-auto container-narrow px-4 sm:px-6">
        <h2 className="text-center font-serif-display text-[length:var(--text-statement)] text-crimson-700">
          Một ngày ở Y Viện
        </h2>
        <ol className="mt-14 space-y-10">
          {RITUAL_MOMENTS.map((m, i) => (
            <li key={m.key}>
              <Reveal from="up" delay={Math.min(i, 3) * 80}>
                <div className="flex items-baseline gap-6">
                  <span
                    aria-hidden
                    className="w-8 shrink-0 text-right font-serif-display text-sm text-gold-700"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif-display text-2xl text-ink">{m.label}</h3>
                    <p className="measure-lead mt-1.5 text-lg leading-relaxed text-ink-soft">
                      {m.line}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
