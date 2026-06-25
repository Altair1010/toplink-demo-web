import Link from "next/link";
import { Phone, MessageCircle, CalendarPlus, MapPin } from "lucide-react";
import { CONTACT } from "@/data/content";

/**
 * Thanh CTA dưới đáy (mobile). Ô Zalo được làm NỔI BẬT (nền xanh Zalo) để mời
 * gọi tư vấn, các nút còn lại giữ nền sáng. z-50, không che footer (main có pb-20).
 */
export default function MobileBottomBar() {
  const items = [
    { label: "Gọi ngay", icon: Phone, href: `tel:${CONTACT.hotline.replace(/\s/g, "")}`, external: true },
    { label: "Đặt lịch", icon: CalendarPlus, href: "/dat-lich", external: false },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_1fr_1.4fr_1fr] border-t border-sand bg-ivory lg:hidden">
      {items.map(({ label, icon: Icon, href, external }) =>
        external ? (
          <a key={label} href={href} className="active:bg-cream">
            <span className="flex flex-col items-center gap-0.5 py-3 text-crimson-600">
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{label}</span>
            </span>
          </a>
        ) : (
          <Link key={label} href={href} className="active:bg-cream">
            <span className="flex flex-col items-center gap-0.5 py-3 text-crimson-600">
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{label}</span>
            </span>
          </Link>
        )
      )}

      {/* Ô Zalo nổi bật — nền xanh Zalo, chiếm nhiều chỗ hơn */}
      <a
        href={CONTACT.zalo}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nhắn Zalo để được tư vấn liệu trình"
        className="bg-[#0068FF] text-white active:bg-[#0057d6]"
      >
        <span className="flex flex-col items-center gap-0.5 py-3">
          <MessageCircle className="h-6 w-6" />
          <span className="text-xs font-semibold">Zalo tư vấn</span>
        </span>
      </a>

      <a
        href={`https://maps.google.com/?q=${CONTACT.mapsQuery}`}
        className="active:bg-cream"
      >
        <span className="flex flex-col items-center gap-0.5 py-3 text-crimson-600">
          <MapPin className="h-6 w-6" />
          <span className="text-xs font-medium">Chỉ đường</span>
        </span>
      </a>
    </nav>
  );
}
