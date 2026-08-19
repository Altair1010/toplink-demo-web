"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Hiệu ứng mở đầu kiểu brand.dropbox.com: khi cuộn tới, các khối TRƯỢT VỀ GIỮA
 * và phóng to dần tới kích thước thật.
 *
 * KIẾN TRÚC (đã viết lại — bản cũ gọi setState trong rAF trên MỖI scroll event, MỖI
 * item, kèm getBoundingClientRect mỗi item mỗi frame → React re-render ở tần số cuộn):
 *
 *   1. IntersectionObserver quyết định item nào ĐANG cần đo. Item ngoài màn hình
 *      không tốn phép đo nào.
 *   2. MỘT listener scroll + MỘT vòng rAF dùng chung cho toàn bộ item, thay vì mỗi
 *      item một cặp riêng.
 *   3. Tiến độ ghi thẳng vào custom property `--converge-p` trên element. CSS lo
 *      transform/opacity. React KHÔNG render lại lần nào sau khi mount.
 *
 * Base-state trong CSS là `--converge-p: 1` (đã hội tụ) nên SSR/no-JS hiển thị đầy
 * đủ. Tôn trọng prefers-reduced-motion (guard cả ở JS lẫn CSS).
 * Hợp static export: không thư viện, không đo lúc render.
 */

type From = "left" | "right" | "up" | "down";

/* ── Sổ đăng ký dùng chung ────────────────────────────────────────────────── */

const active = new Set<HTMLElement>();
let frame = 0;
let listening = false;

function measure() {
  frame = 0;
  const vh = window.innerHeight || 800;
  const start = vh * 0.95;
  const end = vh * 0.5;
  for (const el of active) {
    const r = el.getBoundingClientRect();
    const mid = r.top + r.height / 2;
    const p = Math.max(0, Math.min(1, (start - mid) / (start - end)));
    el.style.setProperty("--converge-p", p.toFixed(3));
  }
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(measure);
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
}

function stopListening() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  if (frame) {
    cancelAnimationFrame(frame);
    frame = 0;
  }
}

/** Bật/tắt việc đo một element theo tầm nhìn, dùng chung listener + rAF. */
function useConverge(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          active.add(el);
          startListening();
          schedule();
        } else {
          active.delete(el);
          if (active.size === 0) stopListening();
        }
      },
      // rootMargin nới ra để item bắt đầu được đo TRƯỚC khi lọt vào khung nhìn,
      // tránh nhảy giá trị ở khung hình đầu tiên.
      { rootMargin: "20% 0px 20% 0px" },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      active.delete(el);
      if (active.size === 0) stopListening();
    };
  }, [ref]);
}

/* ── Component ────────────────────────────────────────────────────────────── */

const OFFSET: Record<From, [number, number]> = {
  left: [-1, 0],
  right: [1, 0],
  up: [0, 0.6],
  down: [0, -0.6],
};

export function ConvergeItem({
  from = "left",
  dist = 240,
  className = "",
  children,
}: {
  from?: From;
  /** Khoảng cách trượt ban đầu (px). Cho so le để độc đáo. */
  dist?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useConverge(ref);

  const [fx, fy] = OFFSET[from];
  // Biến tĩnh — đặt một lần lúc render, không đổi khi cuộn.
  const style = {
    "--converge-x": `${fx * dist}px`,
    "--converge-y": `${fy * dist}px`,
  } as CSSProperties;

  return (
    <div ref={ref} data-converge className={className} style={style}>
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
      <path
        d="M30 24c4 1 8 0 11-3M28 34c4 1 9 0 12-4"
        stroke="#fffcf7"
        strokeOpacity="0.4"
        strokeWidth="1.2"
      />
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
