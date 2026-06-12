import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { Service } from "@/data/content";

const LEVEL_COLORS: Record<string, string> = {
  "co-ban": "bg-jade-600 text-ivory",
  "nang-cao": "bg-gold-500 text-wood-700",
  "chuyen-sau": "bg-crimson-600 text-gold-200",
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/dich-vu/${service.slug}`}
      className="group flex flex-col rounded-md border border-sand bg-cream p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-gold-500 hover:shadow-md"
    >
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
        <span className="flex items-center gap-1 text-base font-semibold text-gold-700 transition-transform group-hover:translate-x-0.5">
          Xem chi tiết <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
