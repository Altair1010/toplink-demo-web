import Link from "next/link";

export const metadata = {
  title: "Nội dung kiến thức",
  description: "Nội dung sức khỏe chỉ được công bố sau khi có nguồn và trạng thái review phù hợp.",
};

export default function NewsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <span className="block text-base font-semibold uppercase tracking-[0.14em] text-crimson-600">
        Kiến thức
      </span>
      <h1 className="mt-2 text-balance font-display text-3xl leading-tight text-crimson-600 sm:text-4xl">
        Chưa có bài viết được duyệt để công bố
      </h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
        Nội dung sức khỏe và dưỡng sinh cần có nguồn, người chịu trách nhiệm và trạng thái rà soát
        phù hợp. Bộ bài viết demo hiện tại không đáp ứng các điều kiện đó nên không được hiển thị.
      </p>

      <section
        className="mt-10 border-l-2 border-gold-500 bg-cream p-8"
        aria-labelledby="knowledge-boundary"
      >
        <h2 id="knowledge-boundary" className="text-2xl font-semibold text-crimson-600">
          Tiếp tục từ điều đang quan tâm
        </h2>
        <p className="mt-3 text-base leading-relaxed text-ink">
          Chị/anh có thể trở về phần định hướng để xem phạm vi thông tin hiện có mà không nhận một
          kết luận sức khỏe hoặc lời khuyên chưa được duyệt.
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
