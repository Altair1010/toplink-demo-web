import Link from "next/link";
import { CalendarPlus } from "@/components/Glyph";

/**
 * Thanh hành động mobile giữ duy nhất lối vào luồng xem nhu cầu fail-closed.
 * Không hiển thị kênh liên hệ khi dữ kiện vận hành chưa được xác minh.
 */
export default function MobileBottomBar() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-sand bg-ivory lg:hidden">
      <Link
        href="/dat-lich"
        aria-label="Xem lại nhu cầu"
        className="mx-auto flex min-h-14 max-w-sm items-center justify-center bg-crimson-600 text-gold-200 active:bg-crimson-700"
      >
        <span className="flex items-center gap-2 px-6 py-3">
          <CalendarPlus className="h-6 w-6" />
          <span className="text-sm font-semibold">Xem lại nhu cầu</span>
        </span>
      </Link>
    </nav>
  );
}
