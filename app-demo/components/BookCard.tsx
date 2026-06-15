"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import type { Service } from "@/data/content";

/**
 * BookCard — thẻ "mở sách" (kỹ thuật Popular products của Autodesk).
 * Bìa lật 3D (rotateY) để lộ nội dung bên trong khi hover / focus / tap.
 * Nội dung luôn nằm trong DOM (chỉ bị bìa che) → screen reader đọc được.
 */

const LEVEL_COLORS: Record<string, string> = {
  "co-ban": "bg-jade-600 text-ivory",
  "nang-cao": "bg-gold-500 text-wood-700",
  "chuyen-sau": "bg-crimson-600 text-gold-200",
};

export default function BookCard({ service }: { service: Service }) {
  const [open, setOpen] = useState(false);
  const pageId = `book-${service.slug}`;

  return (
    <div className={`book h-full ${open ? "is-open" : ""}`}>
      <div className="book-inner h-full min-h-[23rem] rounded-md">
        {/* PAGE — nội dung "trong sách" */}
        <div id={pageId} className="flex h-full flex-col rounded-md border border-sand bg-cream p-7">
          <div className="flex items-center justify-between">
            <span className={`rounded-sm px-3 py-1 text-sm font-semibold ${LEVEL_COLORS[service.level]}`}>
              {service.levelLabel}
            </span>
            <span className="flex items-center gap-1 text-sm text-ink-soft">
              <Clock className="h-3.5 w-3.5" /> {service.duration}
            </span>
          </div>
          <h3 className="mt-4 font-display text-2xl font-bold text-crimson-600">{service.name}</h3>
          <p className="mt-2 flex-1 text-base leading-relaxed text-ink-soft">{service.short}</p>
          <div className="mt-5 flex items-center justify-between border-t border-sand/70 pt-4">
            <span className="text-base">
              <span className="text-ink-soft">Từ </span>
              <span className="font-semibold text-crimson-600">{service.priceFrom}</span>
            </span>
            <Link
              href={`/dich-vu/${service.slug}`}
              className="flex items-center gap-1 text-base font-semibold text-gold-700 transition-colors hover:text-crimson-600"
            >
              Xem chi tiết <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* COVER — bìa sách lật mở */}
        <button
          type="button"
          aria-expanded={open}
          aria-controls={pageId}
          onClick={() => setOpen((v) => !v)}
          className="book-cover on-dark flex flex-col items-center justify-center gap-3 rounded-md border border-gold-700 bg-crimson-800 p-7 text-center text-ivory"
        >
          <span className="seal flex h-14 w-14 items-center justify-center font-display text-2xl text-gold-300" aria-hidden>
            Y
          </span>
          <span className="font-display text-2xl leading-tight text-ivory">{service.name}</span>
          <span className="text-sm uppercase tracking-[0.2em] text-gold-300/80">{service.levelLabel}</span>
          <span className="mt-2 flex items-center gap-1.5 text-sm text-gold-300" aria-hidden>
            <BookOpen className="h-4 w-4" /> Mở xem
          </span>
        </button>
      </div>
    </div>
  );
}
