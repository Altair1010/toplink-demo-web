import type { Metadata } from "next";
import { Be_Vietnam_Pro, Noto_Serif } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomBar from "@/components/MobileBottomBar";
import { NoticeProvider } from "@/components/notice/NoticeRegion";

// Be Vietnam Pro — sans cho body + h3 trở xuống. 3 weight đủ hierarchy
// (400 body / 500 nhấn nhẹ / 600 title); tiếng Việt mỗi weight = subset
// Latin + Vietnamese nên cắt weight là cắt payload thật.
const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  variable: "--font-be-vietnam",
  display: "swap",
});

// Serif Á Đông (Bộ 1 "Cổ phương") — CHỈ h1/h2/statement/quote lớn.
// 600 heading chính + 700 nhấn (.emph). Không 800: brand tĩnh tại.
const notoSerif = Noto_Serif({
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700"],
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
    "Website demo giới thiệu định hướng dưỡng thân, tỉnh thức và các giới hạn thông tin hiện có của Y Viện Toplink.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "Y Viện Toplink",
    title: "Y Viện Toplink · Dưỡng Thân · Tỉnh Thức",
    description:
      "Website demo giới thiệu định hướng dưỡng thân, tỉnh thức và các giới hạn thông tin hiện có của Y Viện Toplink.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-brand chọn skin (styles/skins.css). "yvien" = nhận diện mặc định.
    <html lang="vi" data-brand="yvien" className={`${beVietnam.variable} ${notoSerif.variable}`}>
      <body className="surface-paper min-h-screen">
        <a href="#main" className="skip-link">
          Bỏ qua, tới nội dung chính
        </a>
        <NoticeProvider>
          <SiteHeader />
          {/* Native scroll toàn site (scroll-behavior: smooth) — Lenis/Three đã gỡ. */}
          <main id="main" className="pb-20 lg:pb-0">
            {children}
          </main>
          <SiteFooter />
          <MobileBottomBar />
        </NoticeProvider>
      </body>
    </html>
  );
}
