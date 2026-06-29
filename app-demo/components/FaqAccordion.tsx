"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { FAQS } from "@/data/content";

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-sand rounded-md border border-sand bg-cream">
      {FAQS.map((faq, i) => (
        <div key={i}>
          <button
            id={`faq-trigger-${i}`}
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-6"
            aria-expanded={open === i}
            aria-controls={`faq-panel-${i}`}
          >
            <span className="text-lg font-medium text-ink">{faq.q}</span>
            {open === i ? (
              <Minus className="h-5 w-5 shrink-0 text-gold-600" />
            ) : (
              <Plus className="h-5 w-5 shrink-0 text-crimson-600" />
            )}
          </button>
          {open === i && (
            <p
              id={`faq-panel-${i}`}
              role="region"
              aria-labelledby={`faq-trigger-${i}`}
              className="animate-fade-up px-6 pb-5 text-base leading-relaxed text-ink-soft sm:px-6"
            >
              {faq.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
