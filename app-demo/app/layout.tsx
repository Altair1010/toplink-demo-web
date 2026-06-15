import type { Metadata } from "next";
import { Be_Vietnam_Pro, Cormorant_Garamond, Dancing_Script } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomBar from "@/components/MobileBottomBar";
import { CONTACT, BRANCHES } from "@/data/content";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display-google",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://altair1010.github.io/toplink-demo-web"),
  title: {
    default: "Y Viện Toplink — Dưỡng Thân · Tỉnh Thức",
    template: "%s",
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
    title: "Y Viện Toplink — Dưỡng Thân · Tỉnh Thức",
    description:
      "Đông y dưỡng sinh, lý liệu trị liệu và công nghệ cao — chăm sóc sức khỏe cá nhân hóa tại Y Viện Toplink.",
  },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "Y Viện Toplink",
  description:
    "Y Viện dưỡng thân – tỉnh thức: Đông y dưỡng sinh, lý liệu trị liệu và công nghệ cao.",
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
    <html lang="vi" className={`${beVietnam.variable} ${cormorant.variable} ${dancing.variable}`}>
      <body className="bg-paper min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <SiteHeader />
        <main className="pb-20 lg:pb-0">{children}</main>
        <SiteFooter />
        <MobileBottomBar />
      </body>
    </html>
  );
}
