import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Serif } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomBar from "@/components/MobileBottomBar";
import FloatingZalo from "@/components/FloatingZalo";
import { CONTACT, BRANCHES } from "@/data/content";

// Be Vietnam Pro — DÙNG CHUNG cho cả heading (display) lẫn body (giảm còn 1 sans
// family thay vì 2). Bỏ weight 300 ít dùng để cắt số file font preload (FOUT/CLS).
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

// Serif Á Đông (Bộ 1 "Cổ phương") — font HEADING chính toàn site + statement lớn.
// Noto Serif (regular, KHÔNG Display): tương phản nét vừa phải → dấu tiếng Việt rõ ở
// MỌI cỡ heading kể cả H4–H6 nhỏ, hợp người lớn tuổi. SemiBold 600 cho H1–H2.
const notoSerif = Noto_Serif({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-noto-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://altair1010.github.io/toplink-demo-web"),
  title: {
    default: "Y Viện Toplink · Dưỡng Thân · Tỉnh Thức",
    template: "%s · Y Viện Toplink",
  },
  description:
    "Không gian chăm sóc sức khỏe kết hợp Đông y dưỡng sinh, lý liệu trị liệu và công nghệ cao. Đặt lịch trải nghiệm tại Y Viện Toplink.",
  keywords: [
    "Y Viện Toplink",
    "Đông y dưỡng sinh",
    "trị liệu cổ vai gáy",
    "ngâm chân thảo dược",
    "gội đầu dưỡng sinh",
    "chăm sóc sức khỏe",
  ],
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Y Viện Toplink",
    title: "Y Viện Toplink · Dưỡng Thân · Tỉnh Thức",
    description:
      "Đông y dưỡng sinh, lý liệu trị liệu và công nghệ cao, chăm sóc sức khỏe cá nhân hóa tại Y Viện Toplink.",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Y Viện Toplink",
  description:
    "Y Viện dưỡng thân · tỉnh thức: Đông y dưỡng sinh, lý liệu trị liệu và công nghệ cao.",
  telephone: CONTACT.hotline,
  email: CONTACT.email,
  url: "https://altair1010.github.io/toplink-demo-web",
  openingHours: "Mo-Su 08:00-21:00",
  address: BRANCHES.map((b) => ({
    "@type": "PostalAddress",
    name: b.name,
    streetAddress: b.address,
    addressCountry: "VN",
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${notoSerif.variable}`}>
      <body className="bg-paper min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <a href="#main" className="skip-link">Bỏ qua, tới nội dung chính</a>
        <SiteHeader />
        {/* Lenis smooth-scroll KHÔNG đặt ở đây nữa: nó được bọc riêng trong từng trang
            cần motion (/, /gioi-thieu, /khong-gian, /motion-lab) để trang tĩnh không
            phải tải GSAP/Lenis (giảm initial JS). */}
        <main id="main" className="pb-20 lg:pb-0">{children}</main>
        <SiteFooter />
        <FloatingZalo />
        <MobileBottomBar />
      </body>
    </html>
  );
}
