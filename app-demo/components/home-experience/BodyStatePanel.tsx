"use client";

import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { CONTACT, type Symptom } from "@/data/content";
import { dominantStates } from "@/lib/recommendation";

/**
 * Panel "chẩn đoán mềm": hiện nguyên nhân + hướng chăm sóc của các triệu chứng
 * đã chọn, kèm trạng thái cơ thể trội. Copy tối giản — 3 dòng, không brochure.
 */
export default function BodyStatePanel({ selected }: { selected: Symptom[] }) {
  if (selected.length === 0) {
    return (
      <p className="text-lg leading-relaxed text-ink-mute">
        Chọn một hoặc vài dấu hiệu — Y Viện sẽ gợi ý hướng chăm sóc phù hợp.
      </p>
    );
  }

  const states = dominantStates(selected);
  const primary = selected[selected.length - 1];

  return (
    <div aria-live="polite">
      {states.length > 0 && (
        <p className="text-sm uppercase tracking-wide text-crimson-600">
          Cơ thể có thể đang ở trạng thái{" "}
          <strong className="font-semibold">{states.map((s) => s.name).join(" + ")}</strong>
        </p>
      )}
      <p className="measure-lead mt-3 text-lg leading-relaxed text-ink">{primary.cause}</p>
      <p className="measure-lead mt-2 text-lg leading-relaxed text-ink-soft">
        {primary.suggestion}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href={CONTACT.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-sm bg-crimson-600 px-6 py-3 text-base font-semibold text-ivory transition-colors hover:bg-crimson-700"
        >
          <MessageCircle className="h-5 w-5" /> Nhắn Zalo để được tư vấn
        </a>
        <Link
          href="/dich-vu"
          className="flex items-center gap-1.5 px-2 py-3 text-base font-semibold text-crimson-600 underline-offset-4 hover:underline"
        >
          Xem liệu trình phù hợp <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
