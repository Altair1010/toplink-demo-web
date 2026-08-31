import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main id="main" className="not-found">
      <p className="chapter-mark">Không tìm thấy</p>
      <h1>Nội dung này chưa được xuất bản</h1>
      <p>Record có thể chưa tồn tại hoặc chưa qua đủ cổng phê duyệt.</p>
      <Link className="text-link" href="/">
        Trở về trang chủ
      </Link>
    </main>
  );
}
