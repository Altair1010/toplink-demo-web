"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "@/components/Glyph";

const NAV = [
  { href: "/gioi-thieu", label: "Về Y Viện" },
  { href: "/dich-vu", label: "Phạm vi dịch vụ" },
  { href: "/quy-trinh-tri-lieu", label: "Trước một trải nghiệm" },
  { href: "/tin-tuc", label: "Hiểu thêm" },
  { href: "/#lien-he", label: "Liên hệ" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-ivory/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-20">
        <Link href="/" className="flex min-w-0 items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/20 bg-ivory text-xl font-semibold text-ink lg:h-12 lg:w-12 lg:text-2xl">
            Y
          </span>
          <span className="truncate text-lg font-semibold text-ink sm:text-xl lg:text-2xl">
            Y Viện Toplink
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Điều hướng chính">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-medium text-ink transition-colors hover:text-crimson-600 xl:text-base"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-ink lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
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
