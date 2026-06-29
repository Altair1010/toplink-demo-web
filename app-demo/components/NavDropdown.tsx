"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export type NavItem = { href: string; label: string };
export type NavGroup = { label: string; href?: string; children?: NavItem[] };

const LINK =
  "whitespace-nowrap text-sm font-bold uppercase tracking-wide text-ink-soft transition-colors hover:text-crimson-600";

/**
 * Một mục nav desktop: link đơn hoặc nhóm có dropdown.
 * Hiện panel bằng CSS (group-hover + group-focus-within) — robust, không phụ
 * thuộc timing JS. State `open` phục vụ touch tap (thiết bị không hover).
 * FIX: khi rời chuột, đóng panel VÀ bỏ focus — nếu không, click chuột sẽ
 * focus button khiến group-focus-within ghim panel mở tới khi click ra ngoài.
 */
export default function NavDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const close = (focusBtn = false) => {
    setOpen(false);
    if (focusBtn) {
      btnRef.current?.focus();
      return;
    }
    const active = document.activeElement as HTMLElement | null;
    if (active && ref.current?.contains(active)) active.blur();
  };

  // Mở panel rồi đưa focus tới item theo index (đợi render bằng requestAnimationFrame).
  const openAndFocus = (index: number) => {
    setOpen(true);
    requestAnimationFrame(() => {
      const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
      if (items.length) items[Math.max(0, Math.min(index, items.length - 1))]?.focus();
    });
  };

  if (!group.children?.length) {
    return (
      <Link href={group.href ?? "#"} className={LINK}>
        {group.label}
      </Link>
    );
  }

  const count = group.children.length;

  const onButtonKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openAndFocus(0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      openAndFocus(count - 1);
    } else if (e.key === "Escape") {
      close(true);
    }
  };

  const onItemKeyDown = (e: React.KeyboardEvent, i: number) => {
    const items = itemRefs.current.filter(Boolean) as HTMLAnchorElement[];
    if (e.key === "ArrowDown") {
      e.preventDefault();
      items[(i + 1) % count]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      items[(i - 1 + count) % count]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      items[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      items[count - 1]?.focus();
    } else if (e.key === "Escape") {
      e.preventDefault();
      close(true);
    } else if (e.key === "Tab") {
      close();
    }
  };

  return (
    <div ref={ref} className="group relative" onMouseLeave={() => close()}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={onButtonKeyDown}
        className={`${LINK} flex items-center gap-1`}
      >
        {group.label}
        <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
      </button>

      <div
        role="menu"
        aria-label={group.label}
        className={`invisible absolute left-0 top-full z-50 min-w-[15rem] translate-y-1 rounded-md border border-sand bg-ivory py-2 opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
          open ? "visible translate-y-0 opacity-100" : ""
        }`}
      >
        {group.children.map((c, i) => (
          <Link
            key={c.href}
            href={c.href}
            role="menuitem"
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            onClick={() => setOpen(false)}
            onKeyDown={(e) => onItemKeyDown(e, i)}
            className="block px-4 py-2.5 text-base font-semibold text-ink-soft transition-colors hover:bg-cream hover:text-crimson-600"
          >
            {c.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
