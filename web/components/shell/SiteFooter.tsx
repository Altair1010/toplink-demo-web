import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Y Viện Toplink</strong>
        <p>Thân khỏe – Tâm an – Trí sáng</p>
      </div>
      <nav aria-label="Điều hướng cuối trang">
        <Link href="/gioi-thieu" prefetch={false}>
          Giới thiệu
        </Link>
        <Link href="/kien-thuc" prefetch={false}>
          Kiến thức
        </Link>
        <Link href="/lien-he" prefetch={false}>
          Liên hệ
        </Link>
      </nav>
      <p className="footer-status">Các điểm đến liên hệ đang chờ xác minh.</p>
    </footer>
  );
}
