import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/data/content";

/**
 * Nút Zalo nổi — desktop floating pill góc dưới phải. Màu xanh Zalo để nổi bật
 * trên mọi nền, shadow rõ, nhịp pulse rất nhẹ (tắt khi prefers-reduced-motion).
 * Ẩn trên mobile vì đã có MobileBottomBar (ô Zalo nổi bật).
 */
export default function FloatingZalo() {
  return (
    <a
      href={CONTACT.zalo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nhắn Zalo để được tư vấn liệu trình"
      className="zalo-pulse fixed bottom-6 right-6 z-50 hidden items-center gap-3 rounded-full bg-[#0068FF] px-5 py-3.5 text-base font-semibold text-white transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 lg:flex"
    >
      <MessageCircle className="h-6 w-6 shrink-0" aria-hidden />
      <span className="max-w-[14rem] leading-tight">Anh/chị cần tư vấn liệu trình thì inbox Zalo</span>
    </a>
  );
}
