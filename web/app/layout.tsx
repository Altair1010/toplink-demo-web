import type { Metadata } from "next";
import { Alegreya, IBM_Plex_Sans } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/shell/SiteFooter";
import { SiteHeader } from "@/components/shell/SiteHeader";

import "./globals.css";

const displayFont = Alegreya({
  variable: "--font-display-loaded",
  subsets: ["latin", "vietnamese"],
  weight: ["500", "600"],
  display: "swap",
});

const bodyFont = IBM_Plex_Sans({
  variable: "--font-body-loaded",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Y Viện Toplink",
    template: "%s | Y Viện Toplink",
  },
  description:
    "Frontend V1 fixture-driven của Y Viện Toplink — nội dung vận hành chưa được xuất bản.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="vi" className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Bỏ qua điều hướng
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
