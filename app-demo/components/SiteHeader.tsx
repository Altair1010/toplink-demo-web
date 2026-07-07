"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

/**
 * Header IA PHẲNG — người đang đau cổ vai gáy không cần thấy "nhượng quyền".
 * 6 lối đi chính + nút Đặt lịch; đào tạo/nhượng quyền/sản phẩm/tin tức ở footer.
 */
const NAV = [
  { href: "/gioi-thieu", label: "Về Y Viện" },
  { href: "/dich-vu", label: "Liệu trình" },
  { href: "/quy-trinh-tri-lieu", label: "Quy trình" },
  { href: "/khong-gian", label: "Không gian" },
  { href: "/dich-vu#bang-gia", label: "Bảng giá" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-ivory">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-2 px-4 sm:px-6 lg:h-20">
        <Link href="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-crimson-600 font-display text-xl text-gold-400 lg:h-12 lg:w-12 lg:text-2xl">
            Y
          </span>
          <span className="truncate font-display text-lg font-bold text-crimson-600 sm:text-xl lg:text-2xl">
            Y Viện Toplink
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Điều hướng chính">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-base font-medium text-ink transition-colors hover:text-crimson-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/dat-lich"
            className="btn-press inline-flex items-center justify-center whitespace-nowrap rounded-sm bg-crimson-600 px-3.5 py-2.5 text-sm font-semibold uppercase tracking-wide text-gold-200 shadow-sm transition-colors hover:bg-crimson-700 lg:px-5"
          >
            Đặt lịch
          </Link>
          <button
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-crimson-600 lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-sand/70 bg-ivory lg:hidden"
          aria-label="Điều hướng chính (mobile)"
        >
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-sand/40 py-3.5 text-base font-medium text-ink last:border-0"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
