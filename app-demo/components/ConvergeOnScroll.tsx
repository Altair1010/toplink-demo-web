"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Hiệu ứng mở đầu kiểu brand.dropbox.com: khi cuộn tới, các khối TRƯỢT VỀ GIỮA
 * và phóng to dần tới kích thước thật. Mỗi item tự tính tiến độ theo vị trí của
 * chính nó trong viewport (không thư viện, hợp static export). Tôn trọng
 * prefers-reduced-motion (hiện sẵn, không animate).
 */
function useConverge(from: "left" | "right" | "up" | "down", dist: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight || 800;
        const start = vh * 0.95;
        const end = vh * 0.5;
        const y = r.top + r.height / 2;
        const prog = (start - y) / (start - end);
        setP(Math.max(0, Math.min(1, prog)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [from, dist]);

  const off: Record<string, [number, number]> = {
    left: [-dist, 0],
    right: [dist, 0],
    up: [0, dist * 0.6],
    down: [0, -dist * 0.6],
  };
  const [ox, oy] = off[from] ?? [0, 0];
  return { ref, tx: ox * (1 - p), ty: oy * (1 - p), p };
}

export function ConvergeItem({
  from = "left",
  dist = 240,
  className = "",
  children,
}: {
  from?: "left" | "right" | "up" | "down";
  /** Khoảng cách trượt ban đầu (px). Cho so le để độc đáo. */
  dist?: number;
  className?: string;
  children: ReactNode;
}) {
  const { ref, tx, ty, p } = useConverge(from, dist);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate(${tx.toFixed(1)}px, ${ty.toFixed(1)}px) scale(${(0.84 + 0.16 * p).toFixed(3)})`,
        opacity: 0.25 + 0.75 * p,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

/** Lá thảo dược trang trí, trôi nhẹ theo nền (chất Đông y, cổ truyền). */
export function HerbLeaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden fill="none">
      <path
        d="M32 4C16 14 8 30 12 52c0 0 18-2 28-16C50 22 44 10 32 4Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M32 8C28 22 26 38 24 50" stroke="#fffcf7" strokeOpacity="0.5" strokeWidth="1.4" />
      <path d="M30 24c4 1 8 0 11-3M28 34c4 1 9 0 12-4" stroke="#fffcf7" strokeOpacity="0.4" strokeWidth="1.2" />
    </svg>
  );
}

/** Trường lá thảo dược trôi (đặt absolute trong khối có overflow-hidden). */
export function LeafField() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <HerbLeaf className="leaf-float absolute left-[4%] top-[12%] h-12 w-12 text-jade-500/40" />
      <HerbLeaf className="leaf-float leaf-delay-2 absolute right-[8%] top-[20%] h-16 w-16 text-gold-500/30" />
      <HerbLeaf className="leaf-float leaf-delay-3 absolute left-[16%] bottom-[14%] h-10 w-10 text-crimson-600/25" />
      <HerbLeaf className="leaf-float leaf-delay-1 absolute right-[18%] bottom-[10%] h-14 w-14 text-jade-500/30" />
    </div>
  );
}
