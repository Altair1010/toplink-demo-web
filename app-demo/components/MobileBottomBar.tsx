import Link from "next/link";
import { Phone, MessageCircle, CalendarPlus, MapPin } from "lucide-react";
import { CONTACT } from "@/data/content";

export default function MobileBottomBar() {
  const items = [
    { label: "Gọi ngay", icon: Phone, href: `tel:${CONTACT.hotline.replace(/\s/g, "")}`, external: true },
    { label: "Zalo", icon: MessageCircle, href: CONTACT.zalo, external: true },
    { label: "Đặt lịch", icon: CalendarPlus, href: "/dat-lich", external: false },
    { label: "Chỉ đường", icon: MapPin, href: `https://maps.google.com/?q=${CONTACT.mapsQuery}`, external: true },
  ];

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-sand bg-ivory/95 backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-4">
        {items.map(({ label, icon: Icon, href, external }) => {
          const inner = (
            <span className="flex flex-col items-center gap-0.5 py-3 text-crimson-600">
              <Icon className="h-6 w-6" />
              <span className="text-xs font-medium">{label}</span>
            </span>
          );
          return external ? (
            <a key={label} href={href} className="active:bg-cream">
              {inner}
            </a>
          ) : (
            <Link key={label} href={href} className="active:bg-cream">
              {inner}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
