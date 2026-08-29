import Link from "next/link";

export const metadata = {
  title: "Nội dung kiến thức",
  description: "Nội dung sức khỏe chỉ được công bố sau khi có nguồn và review phù hợp.",
};

export default function NewsPage() {
  return (
    <div className="info-page">
      <header className="info-page__header">
        <p className="info-eyebrow">Hiểu thêm</p>
        <h1>Chưa có bài viết được duyệt để công bố</h1>
        <p>
          Nội dung sức khỏe và dưỡng sinh cần có nguồn, người chịu trách nhiệm và trạng thái rà soát
          phù hợp. Bộ bài viết demo hiện tại không đáp ứng các điều kiện đó nên không được hiển thị.
        </p>
      </header>

      <section className="info-boundary" aria-labelledby="knowledge-boundary">
        <h2 id="knowledge-boundary">Tiếp tục từ điều đang quan tâm</h2>
        <p>
          Chị/anh có thể trở về phần định hướng để xem phạm vi thông tin hiện có mà không nhận một
          kết luận sức khỏe hoặc lời khuyên chưa được duyệt.
        </p>
        <Link href="/" className="info-text-link mt-6">
          Trở về phần định hướng
        </Link>
      </section>
    </div>
  );
}
