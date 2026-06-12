import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import type { Service } from "@/data/content";

const LEVEL_COLORS: Record<string, string> = {
  "co-ban": "bg-jade-500/10 text-jade-600",
  "nang-cao": "bg-gold-500/15 text-gold-600",
  "chuyen-sau": "bg-clay-700/10 text-clay-700",
};

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/dich-vu/${service.slug}`}
      className="group flex flex-col rounded-2xl border border-sand bg-white/70 p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-gold-400 hover:shadow-md"
    >
      <div className="flex items-center justify-between">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${LEVEL_COLORS[service.level]}`}>
          {service.levelLabel}
        </span>
        <span className="flex items-center gap-1 text-xs text-ink-soft">
          <Clock className="h-3.5 w-3.5" /> {service.duration}
        </span>
      </div>
      <h3 className="mt-4 font-display text-xl font-semibold text-clay-700">{service.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{service.short}</p>
      <div className="mt-5 flex items-center justify-between border-t border-sand/70 pt-4">
        <span className="text-sm">
          <span className="text-ink-soft">Từ </span>
          <span className="font-semibold text-clay-700">{service.priceFrom}</span>
        </span>
        <span className="flex items-center gap-1 text-sm font-semibold text-gold-600 transition-transform group-hover:translate-x-0.5">
          Xem chi tiết <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
