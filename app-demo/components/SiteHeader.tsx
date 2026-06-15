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
  { href: "/dao-tao", label: "Đào tạo" },
  { href: "/nhuong-quyen", label: "Nhượng quyền" },
  { href: "/tin-tuc", label: "Tin tức" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-ivory">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-crimson-600 font-display text-2xl text-gold-400">
            Y
          </span>
          <span className="leading-tight">
            <span className="block whitespace-nowrap font-display text-2xl font-bold text-crimson-600">Y Viện Toplink</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-3 xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm font-bold uppercase tracking-wide text-ink-soft transition-colors hover:text-crimson-600"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${CONTACT.hotline.replace(/\s/g, "")}`}
            className="hidden items-center gap-1.5 whitespace-nowrap text-base font-bold text-crimson-600 sm:flex"
          >
            <Phone className="h-4 w-4 shrink-0" />
            {CONTACT.hotline}
          </a>
          <Link
            href="/dat-lich"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm bg-crimson-600 px-6 py-3 text-base font-bold uppercase tracking-wide text-gold-200 shadow-sm transition-colors hover:bg-crimson-700"
          >
            Đặt lịch
          </Link>
          <button
            aria-label="Mở menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-crimson-600 xl:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
