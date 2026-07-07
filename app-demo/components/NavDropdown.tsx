"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export type NavItem = { href: string; label: string };
export type NavGroup = { label: string; href?: string; children?: NavItem[] };

const LINK =
  "whitespace-nowrap text-sm font-bold uppercase tracking-wide text-ink-soft transition-colors hover:text-crimson-600";

/**
 * Một mục nav desktop: link đơn hoặc nhóm dropdown (shadcn DropdownMenu / Radix).
 * Radix lo a11y + keyboard sẵn; ta chỉ điều khiển `open` để giữ hành vi MỞ KHI HOVER.
 * `modal={false}` để không khoá pointer-events toàn trang (cần hover được các nhóm khác).
 * Trễ nhẹ khi rời chuột để có thể di từ trigger xuống panel (portal) mà không đóng.
 */
export default function NavDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  if (!group.children?.length) {
    return (
      <Link href={group.href ?? "#"} className={LINK}>
        {group.label}
      </Link>
    );
  }

  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };
  const openMenu = () => {
    cancelClose();
    setOpen(true);
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          onMouseEnter={openMenu}
          onMouseLeave={scheduleClose}
          className={`${LINK} flex items-center gap-1 outline-none`}
        >
          {group.label}
          <ChevronDown
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        sideOffset={8}
        onMouseEnter={openMenu}
        onMouseLeave={scheduleClose}
        className="min-w-[15rem] rounded-md border-sand bg-ivory p-2"
      >
        {group.children.map((c) => (
          <DropdownMenuItem
            key={c.href}
            asChild
            className="cursor-pointer rounded-sm px-4 py-2.5 text-base font-semibold text-ink-soft focus:bg-cream focus:text-crimson-600"
          >
            <Link href={c.href}>{c.label}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
