import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/data/content";

/**
 * Nút Zalo nổi (desktop) — MẶC ĐỊNH là icon tròn gọn ở góc dưới phải để KHÔNG che
 * nội dung (caption hero, heading). Khi hover/focus mới nở rộng lộ dòng mời tư vấn.
 * Zalo là CTA PHỤ; CTA chính "Đặt lịch" luôn hiện ở header. Ẩn trên mobile (đã có
 * MobileBottomBar). Pulse nhẹ tắt khi prefers-reduced-motion.
 */
export default function FloatingZalo() {
  return (
    <a
      href={CONTACT.zalo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nhắn Zalo để được tư vấn liệu trình"
      className="zalo-pulse group fixed bottom-6 right-6 z-40 hidden h-14 items-center rounded-full bg-[#0068FF] px-4 text-base font-semibold text-white shadow-[var(--shadow-zalo)] transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 lg:flex"
    >
      <MessageCircle className="h-6 w-6 shrink-0" aria-hidden />
      <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 group-hover:ml-2 group-hover:max-w-[16rem] group-hover:opacity-100 group-focus-visible:ml-2 group-focus-visible:max-w-[16rem] group-focus-visible:opacity-100">
        Inbox Zalo để được tư vấn
      </span>
    </a>
  );
}
