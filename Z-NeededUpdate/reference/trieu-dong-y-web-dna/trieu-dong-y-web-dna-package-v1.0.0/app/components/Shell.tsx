import Link from "next/link";

export function SiteHeader({ baseline = false }: { baseline?: boolean }) {
  return (
    <header className={baseline ? "site-header baseline-header" : "site-header"}>
      <Link className="brand" href="/">
        <span className="brand-seal">東</span>
        <span><strong>TRIỀU ĐÔNG Y</strong><small>{baseline ? "BẢN TÁI DỰNG NGUỒN" : "Y HỌC CỔ TRUYỀN VIỆT NAM"}</small></span>
      </Link>
      <nav aria-label="Điều hướng chính">
        <Link href="/knowledge">Tàng thư</Link>
        <Link href="/lookup">Tra cứu</Link>
        <Link href="/care">Hành trình hỗ trợ</Link>
        <Link href="/package">Web DNA</Link>
      </nav>
      <Link className="header-action" href="/care">Tìm hiểu phương pháp</Link>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div><span className="brand-seal small">東</span><strong>Triều Đông Y Web DNA</strong></div>
      <p>Nội dung mang tính tham khảo, không thay thế chẩn đoán hoặc chỉ định chuyên môn.</p>
      <div className="footer-links"><Link href="/knowledge">Tàng thư</Link><Link href="/package">Provenance</Link><Link href="/baseline">Baseline</Link></div>
    </footer>
  );
}

export function PageShell({ children, baseline = false }: { children: React.ReactNode; baseline?: boolean }) {
  return <><SiteHeader baseline={baseline} /><main>{children}</main><SiteFooter /></>;
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow"><span />{children}</p>;
}

