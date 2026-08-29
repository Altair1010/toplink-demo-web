import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Triều Đông Y Web DNA",
  description: "Evidence-backed route census and reconstruction console for trieudongy.vn.",
  other: { "codex-preview": "development" },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="vi"><body>{children}</body></html>;
}
