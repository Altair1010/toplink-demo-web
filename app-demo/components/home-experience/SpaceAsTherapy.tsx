import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SPACE_QUALITIES } from "@/data/content";

/**
 * Section 4 — "Không gian như liệu pháp": 4 khung Tĩnh · Thông · Dưỡng · Tỉnh.
 * Không mô tả dài, không card, không icon — chỉ frame line + chữ lớn + 1 câu.
 */
export default function SpaceAsTherapy() {
  return (
    <section className="section-pad bg-ivory">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="measure-lead mx-auto text-center text-xl leading-relaxed text-ink">
          Không gian không để ngắm.
          <span className="block text-ink-soft">Không gian để cơ thể hạ xuống.</span>
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SPACE_QUALITIES.map((q) => (
            <div key={q.key} className="frame-gold flex min-h-44 flex-col items-center justify-center p-8 text-center">
              <span className="font-serif-display text-4xl text-crimson-700">{q.name}</span>
              <p className="mt-3 text-base text-ink-soft">{q.line}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/khong-gian"
            className="inline-flex items-center gap-1.5 text-base font-semibold text-crimson-600 underline-offset-4 hover:underline"
          >
            Bước vào không gian bốn tầng <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
