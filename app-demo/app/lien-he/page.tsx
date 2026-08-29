import Link from "next/link";

export const metadata = {
  title: "Thông tin liên hệ",
  description: "Địa chỉ, điện thoại và kênh liên hệ đang chờ nguồn vận hành được xác minh.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <span className="block text-base font-semibold uppercase tracking-[0.14em] text-crimson-600">
        Liên hệ
      </span>
      <h1 className="mt-2 text-balance font-display text-3xl leading-tight text-crimson-600 sm:text-4xl">
        Thông tin vận hành chưa được xác minh
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
        Website demo chưa có nguồn được duyệt cho địa chỉ, số điện thoại, giờ hoạt động hoặc kênh
        nhắn tin của Y Viện Toplink. Vì vậy, trang này không công bố cơ sở, bản đồ hay lời hứa phản
        hồi.
      </p>

      <section
        className="mt-10 border-l-2 border-gold-500 bg-cream p-8"
        aria-labelledby="contact-boundary"
      >
        <h2 id="contact-boundary" className="text-2xl font-semibold text-crimson-600">
          Điều có thể làm lúc này
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink">
          Chị/anh có thể tiếp tục xem phạm vi thông tin trên website. Kênh liên hệ chỉ xuất hiện sau
          khi dữ kiện vận hành được xác minh và phê duyệt công bố.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex min-h-11 items-center rounded-sm border border-crimson-600 px-6 py-3 text-base font-semibold text-crimson-600 hover:bg-crimson-50"
        >
          Trở về phần định hướng
        </Link>
      </section>
    </div>
  );
}
