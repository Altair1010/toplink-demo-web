"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { CONTACT } from "@/data/content";

const NAV = [
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/dich-vu", label: "Dịch vụ" },
  { href: "/quy-trinh-tri-lieu", label: "Quy trình" },
  { href: "/khong-gian", label: "Không gian" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand/70 bg-ivory/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-crimson-600 font-display text-lg text-gold-400">
            Y
          </span>
          <span className="leading-tight">
            <span className="block font-display text-xl font-black text-crimson-600">Y Viện Toplink</span>
            <span className="block text-xs uppercase tracking-[0.2em] text-ink-soft">Dưỡng thân · Tỉnh thức</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base font-medium text-ink-soft transition-colors hover:text-crimson-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${CONTACT.hotline.replace(/\s/g, "")}`}
            className="hidden items-center gap-1.5 text-base font-semibold text-crimson-600 sm:flex"
          >
            <Phone className="h-4 w-4" />
            {CONTACT.hotline}
          </a>
          <Link
            href="/dat-lich"
            className="rounded-sm bg-crimson-600 px-5 py-3 text-base font-semibold text-gold-200 shadow-sm transition-colors hover:bg-crimson-700"
          >
            Đặt lịch
          </Link>
          <button
            aria-label="Mở menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-crimson-600 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-sand/70 bg-ivory lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-sand/40 py-3 text-base font-medium text-ink last:border-0"
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
