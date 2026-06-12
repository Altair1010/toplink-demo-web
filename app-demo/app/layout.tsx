import type { Metadata } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import MobileBottomBar from "@/components/MobileBottomBar";

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600", "700"],
  variable: "--font-display-google",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Y Viện Toplink — Dưỡng Thân · Tỉnh Thức",
  description:
    "Không gian chăm sóc sức khỏe kết hợp Đông y dưỡng sinh, lý liệu trị liệu và công nghệ cao. Đặt lịch trải nghiệm tại Y Viện Toplink.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={`${beVietnam.variable} ${playfair.variable}`}>
      <body className="bg-paper min-h-screen">
        <SiteHeader />
        <main className="pb-20 lg:pb-0">{children}</main>
        <SiteFooter />
        <MobileBottomBar />
      </body>
    </html>
  );
}
