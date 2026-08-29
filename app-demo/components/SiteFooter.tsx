import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-20 bg-wood-700 text-cream/90">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500 font-display text-lg text-wood-700">
              Y
            </span>
            <span className="font-display text-xl font-bold text-ivory">Y Viện Toplink</span>
          </div>
          <p className="mt-4 text-base leading-relaxed text-cream/70">
            Dưỡng Thân · Tỉnh Thức. Website demo giúp xem phạm vi thông tin và giới hạn trước khi
            quyết định.
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
          <h4 className="font-display text-xl font-bold text-gold-300">Thông tin vận hành</h4>
          <p className="mt-4 text-base leading-relaxed text-cream/70">
            Địa chỉ, số điện thoại, giờ hoạt động và kênh liên hệ chưa có nguồn vận hành được xác
            minh nên chưa được công bố.
          </p>
          <Link
            href="/lien-he"
            className="mt-5 inline-block text-base font-semibold text-gold-300 underline underline-offset-4 hover:text-gold-200"
          >
            Xem trạng thái liên hệ
          </Link>
        </div>
      </div>

      <div className="border-t border-cream/15">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-sm text-cream/50 sm:px-6">
          © {new Date().getFullYear()} Y Viện Toplink · Bản demo giao diện · Chỉ công bố dữ kiện vận
          hành sau khi được xác minh.
        </div>
      </div>
    </footer>
  );
}
