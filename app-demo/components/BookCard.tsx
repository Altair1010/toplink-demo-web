import Link from "next/link";
import Img from "@/components/Img";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import type { Service } from "@/data/content";

/**
 * BookCard — thẻ "mở sách" (kỹ thuật Popular products của Autodesk), bản nâng cấp:
 * bìa CHỈ MỞ HÉ khi hover/focus, để lộ ảnh "trang sách" bên trong qua khe bìa,
 * kèm shadow + glow vàng ở mép (ánh sáng tri thức, nhẹ nhàng). Bìa tự chứa đủ
 * thông tin nên không cần mở banh; cả thẻ là link tới trang chi tiết.
 */

const LEVEL_COLORS: Record<string, string> = {
  "co-ban": "bg-jade-600 text-ivory",
  "nang-cao": "bg-gold-500 text-wood-700",
  "chuyen-sau": "bg-crimson-600 text-gold-200",
};

const INNER_FALLBACK = "/images/spaces/tang-2-treatment.jpg";

export default function BookCard({ service }: { service: Service }) {
  return (
    <Link href={`/dich-vu/${service.slug}`} className="book group block h-full focus:outline-none">
      <div className="book-inner h-full min-h-[24rem] overflow-hidden rounded-md">
        {/* PAGE — ảnh "trang sách" lộ qua khe bìa khi mở hé */}
        <div className="absolute inset-0 rounded-md border border-gold-700/60 bg-crimson-900">
          <Img
            src={service.image ?? INNER_FALLBACK}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-crimson-800/20 to-crimson-800/60" aria-hidden />
        </div>

        {/* COVER — bìa sách, mở hé khi hover/focus */}
        <div className="book-cover on-dark flex h-full flex-col rounded-md border border-gold-700 bg-crimson-800 p-7 text-ivory">
          <div className="flex items-center justify-between">
            <span className={`rounded-sm px-3 py-1 text-sm font-semibold ${LEVEL_COLORS[service.level]}`}>
              {service.levelLabel}
            </span>
            <span className="flex items-center gap-1 text-sm text-gold-300/90">
              <Clock className="h-3.5 w-3.5" /> {service.duration}
            </span>
          </div>
          <span className="seal mt-5 flex h-12 w-12 items-center justify-center text-xl text-gold-300" aria-hidden>
            Y
          </span>
          <h3 className="mt-4 text-2xl leading-tight text-ivory">{service.name}</h3>
          <p className="mt-2 flex-1 text-base leading-relaxed text-cream/80">{service.short}</p>
          <div className="mt-5 flex items-center justify-between border-t border-gold-700/50 pt-4">
            <span className="text-base">
              <span className="text-cream/70">Từ </span>
              <span className="font-semibold text-gold-300">{service.priceFrom}</span>
            </span>
            <span className="flex items-center gap-1.5 text-base font-semibold text-gold-300">
              <BookOpen className="h-4 w-4" /> Xem chi tiết <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
