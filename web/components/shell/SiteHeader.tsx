import Link from "next/link";

const navigation = [
  ["Dịch vụ", "/dich-vu"],
  ["Sản phẩm", "/san-pham"],
  ["Kiến thức", "/kien-thuc"],
  ["Tin tức", "/tin-tuc"],
  ["Không gian", "/khong-gian"],
  ["Giới thiệu", "/gioi-thieu"],
  ["Liên hệ", "/lien-he"],
] as const;

function NavigationLinks() {
  return navigation.map(([label, href]) => (
    <Link key={href} href={href} prefetch={false}>
      {label}
    </Link>
  ));
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link
        className="text-identity"
        href="/"
        prefetch={false}
        aria-label="Y Viện Toplink — trang chủ"
      >
        <strong>Y VIỆN TOPLINK</strong>
        <span>Dưỡng Thân – Tỉnh Thức</span>
      </Link>
      <nav className="desktop-navigation" aria-label="Điều hướng chính">
        <NavigationLinks />
      </nav>
      <details className="mobile-navigation">
        <summary>Danh mục</summary>
        <nav aria-label="Điều hướng trên thiết bị di động">
          <NavigationLinks />
        </nav>
      </details>
    </header>
  );
}
