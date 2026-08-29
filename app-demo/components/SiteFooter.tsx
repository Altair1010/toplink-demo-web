import Link from "next/link";

const INFORMATION_LINKS = [
  ["/dich-vu", "Phạm vi dịch vụ"],
  ["/quy-trinh-tri-lieu", "Trước một trải nghiệm"],
  ["/gioi-thieu", "Về Y Viện"],
  ["/tin-tuc", "Hiểu thêm"],
] as const;

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-sand bg-cream/45 text-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.15fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 bg-ivory text-lg font-semibold text-ink">
              Y
            </span>
            <span className="text-xl font-semibold">Y Viện Toplink</span>
          </div>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-ink-soft">
            Một nơi để đọc, hiểu phạm vi hiện có và tự cân nhắc trước khi trao đổi trực tiếp với con
            người.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Thông tin chính</h2>
          <ul className="mt-4 space-y-2 text-base">
            {INFORMATION_LINKS.map(([href, label]) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex min-h-11 items-center text-ink-soft underline-offset-4 hover:underline"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Trao đổi trực tiếp</h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Zalo và Facebook Page là hai kênh trao đổi đã được chọn. Đường dẫn chính thức vẫn đang
            chờ xác minh trước khi công bố.
          </p>
          <Link
            href="/lien-he"
            className="mt-5 inline-block text-base font-semibold text-ink underline underline-offset-4"
          >
            Xem thông tin liên hệ
          </Link>
        </div>
      </div>

      <div className="border-t border-sand">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-sm text-ink-mute sm:px-6">
          © {new Date().getFullYear()} Y Viện Toplink · Thông tin thực tế chỉ được công bố sau khi
          xác minh.
        </div>
      </div>
    </footer>
  );
}
