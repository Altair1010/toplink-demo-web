import Link from "next/link";
import { Phone, MessageCircle, CalendarPlus, MapPin } from "lucide-react";
import { CONTACT } from "@/data/content";

/**
 * Thanh CTA dưới đáy (mobile). Ô "Đặt lịch" là CTA CHÍNH — nền crimson nổi bật, rộng
 * hơn, đặt giữa — vì khách lớn tuổi cần đường đặt lịch rõ ràng (không phụ thuộc Zalo).
 * Zalo/Gọi/Chỉ đường là phụ. z-50, không che footer (main có pb-20).
 */
export default function MobileBottomBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_1fr_1.6fr_1fr] border-t border-sand bg-ivory lg:hidden">
      <a href={`tel:${CONTACT.hotline.replace(/\s/g, "")}`} className="active:bg-cream">
        <span className="flex flex-col items-center gap-0.5 py-3 text-crimson-600">
          <Phone className="h-6 w-6" />
          <span className="text-xs font-medium">Gọi ngay</span>
        </span>
      </a>

      <a
        href={CONTACT.zalo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn Zalo để được tư vấn liệu trình"
        className="active:bg-cream"
      >
        <span className="flex flex-col items-center gap-0.5 py-3 text-[#0068FF]">
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs font-medium">Zalo</span>
        </span>
      </a>

      {/* CTA CHÍNH — nổi bật, rộng hơn, đặt giữa */}
      <Link href="/dat-lich" aria-label="Đặt lịch hẹn" className="bg-crimson-600 text-gold-200 active:bg-crimson-700">
        <span className="flex flex-col items-center gap-0.5 py-3">
          <CalendarPlus className="h-6 w-6" />
          <span className="text-xs font-bold">Đặt lịch</span>
        </span>
      </Link>

      <a href={`https://maps.google.com/?q=${CONTACT.mapsQuery}`} className="active:bg-cream">
        <span className="flex flex-col items-center gap-0.5 py-3 text-crimson-600">
          <MapPin className="h-6 w-6" />
          <span className="text-xs font-medium">Chỉ đường</span>
        </span>
      </a>
    </nav>
  );
}
