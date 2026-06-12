"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/data/content";

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-sand rounded-2xl border border-sand bg-white/60">
      {FAQS.map((faq, i) => (
        <div key={i}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
            aria-expanded={open === i}
          >
            <span className="font-medium text-ink">{faq.q}</span>
            {open === i ? (
              <Minus className="h-5 w-5 shrink-0 text-gold-600" />
            ) : (
              <Plus className="h-5 w-5 shrink-0 text-clay-700" />
            )}
          </button>
          {open === i && (
            <p className="animate-fade-up px-5 pb-5 text-sm leading-relaxed text-ink-soft sm:px-6">{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  );
}
