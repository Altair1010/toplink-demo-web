import Link from "next/link";
import { Phone, MapPin, Clock, Mail, MessageCircle, Facebook } from "lucide-react";
import { CONTACT, BRANCHES } from "@/data/content";

export default function SiteFooter() {
  return (
    <footer className="mt-20 bg-wood-700 text-cream/90">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 font-display text-lg text-wood-700">
              Y
            </span>
            <span className="font-display text-xl font-black text-ivory">Y Viện Toplink</span>
          </div>
          <p className="mt-4 text-base leading-relaxed text-cream/70">
            Y Viện Dưỡng Thân · Tỉnh Thức. Đông y dưỡng sinh kết hợp lý liệu trị liệu và công nghệ cao,
            chăm sóc cá nhân hóa.
          </p>
        </div>

        <div>
          <h4 className="font-display text-xl font-bold text-gold-300">Khám phá</h4>
          <ul className="mt-4 space-y-2 text-base">
            {[
              ["/dich-vu", "Dịch vụ"],
              ["/quy-trinh-tri-lieu", "Quy trình trị liệu"],
              ["/khong-gian", "Không gian Y Viện"],
              ["/san-pham", "Sản phẩm"],
              ["/dao-tao", "Đào tạo"],
              ["/nhuong-quyen", "Nhượng quyền"],
              ["/tin-tuc", "Tin tức"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-cream/70 transition-colors hover:text-gold-300">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl font-bold text-gold-300">Hệ thống cơ sở</h4>
          <ul className="mt-4 space-y-3 text-base text-cream/70">
            {BRANCHES.map((b) => (
              <li key={b.slug} className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-300" />
                <span>{b.address}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-xl font-bold text-gold-300">Liên hệ</h4>
          <ul className="mt-4 space-y-3 text-base text-cream/70">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gold-300" />
              <a href={`tel:${CONTACT.hotline.replace(/\s/g, "")}`} className="hover:text-gold-300">
                {CONTACT.hotline}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-gold-300" />
              <a href={CONTACT.zalo} className="hover:text-gold-300">Nhắn Zalo tư vấn</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gold-300" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-gold-300">{CONTACT.email}</a>
            </li>
            <li className="flex items-center gap-2">
              <Facebook className="h-4 w-4 text-gold-300" />
              <a href={CONTACT.facebook} className="hover:text-gold-300">Fanpage Facebook</a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gold-300" />
              {CONTACT.hours}
            </li>
          </ul>
          <Link
            href="/dat-lich"
            className="mt-5 inline-block rounded-sm bg-gold-500 px-6 py-3 text-base font-semibold text-wood-700 transition-colors hover:bg-gold-400"
          >
            Đặt lịch trải nghiệm
          </Link>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-sm text-cream/50 sm:px-6">
          © {new Date().getFullYear()} Y Viện Toplink · Bản demo giao diện · Các liệu trình hỗ trợ chăm sóc
          sức khỏe, không thay thế tư vấn y khoa chuyên môn.
        </div>
      </div>
    </footer>
  );
}
