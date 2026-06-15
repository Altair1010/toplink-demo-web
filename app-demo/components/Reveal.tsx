"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveal-on-scroll: phần tử mờ + trượt nhẹ lên khi cuộn vào màn hình.
 * Kỹ thuật rút từ Dropbox/Autodesk — easing chậm, chỉ chạy 1 lần.
 * Không dùng thư viện: chỉ IntersectionObserver thuần (hợp static export).
 */
export default function Reveal({
  children,
  delay = 0,
  from = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  /** Hướng khối trôi vào (kỹ thuật Dropbox). "up" giữ tương thích ngược. */
  from?: "left" | "right" | "up" | "down";
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-${from} ${shown ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
