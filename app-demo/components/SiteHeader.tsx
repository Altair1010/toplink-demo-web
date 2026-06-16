"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import NavDropdown, { type NavGroup } from "@/components/NavDropdown";

const NAV: NavGroup[] = [
  {
    label: "Giới thiệu",
    children: [
      { href: "/gioi-thieu", label: "Về Y Viện" },
      { href: "/khong-gian", label: "Không gian Y Viện" },
    ],
  },
  {
    label: "Dịch vụ",
    children: [
      { href: "/dich-vu", label: "Liệu trình & dịch vụ" },
      { href: "/quy-trinh-tri-lieu", label: "Quy trình trị liệu" },
      { href: "/san-pham", label: "Sản phẩm" },
    ],
  },
  {
    label: "Hợp tác",
    children: [
      { href: "/dao-tao", label: "Đào tạo" },
      { href: "/nhuong-quyen", label: "Nhượng quyền" },
    ],
  },
  { label: "Tin tức", href: "/tin-tuc" },
  { label: "Liên hệ", href: "/lien-he" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const closeAll = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-ivory">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-20">
        <Link href="/" className="flex items-center gap-3" onClick={closeAll}>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-crimson-600 font-display text-xl text-gold-400 lg:h-12 lg:w-12 lg:text-2xl">
            Y
          </span>
          <span className="block whitespace-nowrap font-display text-xl font-bold text-crimson-600 lg:text-2xl">
            Y Viện Toplink
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV.map((group) => (
            <NavDropdown key={group.label} group={group} />
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            href="/dat-lich"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm bg-crimson-600 px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-gold-200 shadow-sm transition-colors hover:bg-crimson-700 lg:px-5"
          >
            Đặt lịch
          </Link>
          <button
            aria-label="Mở menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-crimson-600 lg:hidden"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-sand/70 bg-ivory lg:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-2">
            {NAV.map((group) =>
              group.children?.length ? (
                <div key={group.label} className="border-b border-sand/40 last:border-0">
                  <button
                    type="button"
                    aria-expanded={expanded === group.label}
                    onClick={() => setExpanded((v) => (v === group.label ? null : group.label))}
                    className="flex w-full items-center justify-between py-3 text-base font-semibold text-ink"
                  >
                    {group.label}
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${expanded === group.label ? "rotate-180" : ""}`}
                    />
                  </button>
                  {expanded === group.label && (
                    <div className="flex flex-col pb-2">
                      {group.children.map((c) => (
                        <Link
                          key={c.href}
                          href={c.href}
                          onClick={closeAll}
                          className="py-2.5 pl-4 text-base text-ink-soft"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={group.label}
                  href={group.href ?? "#"}
                  onClick={closeAll}
                  className="border-b border-sand/40 py-3 text-base font-medium text-ink last:border-0"
                >
                  {group.label}
                </Link>
              )
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
