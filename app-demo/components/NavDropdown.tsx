"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type NavItem = { href: string; label: string };
export type NavGroup = { label: string; href?: string; children?: NavItem[] };

const LINK =
  "whitespace-nowrap text-sm font-bold uppercase tracking-wide text-ink-soft transition-colors hover:text-crimson-600";

/**
 * Một mục nav desktop: link đơn hoặc nhóm có dropdown.
 * Hiện panel bằng CSS (group-hover + group-focus-within) — robust, không phụ
 * thuộc timing JS. State `open` chỉ phục vụ touch tap (thiết bị không hover).
 */
export default function NavDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);

  if (!group.children?.length) {
    return (
      <Link href={group.href ?? "#"} className={LINK}>
        {group.label}
      </Link>
    );
  }

  return (
    <div
      className="group relative"
      onMouseLeave={() => setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          (e.currentTarget.querySelector("button") as HTMLButtonElement | null)?.blur();
        }
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`${LINK} flex items-center gap-1`}
      >
        {group.label}
        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </button>

      <div
        role="menu"
        className={`invisible absolute left-0 top-full z-50 min-w-[15rem] translate-y-1 rounded-md border border-sand bg-ivory py-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
          open ? "visible translate-y-0 opacity-100" : ""
        }`}
      >
        {group.children.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block px-4 py-2.5 text-base font-semibold text-ink-soft transition-colors hover:bg-cream hover:text-crimson-600"
          >
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
