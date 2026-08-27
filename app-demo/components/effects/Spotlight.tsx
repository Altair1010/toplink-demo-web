"use client";

/**
 * Hiện tượng: pointer light (đèn rọi theo con trỏ)
 * Engine: CSS (radial-gradient) + pointer tracking (KHÔNG dùng engine animation JS)
 * Reduced-motion: tắt hẳn (không gắn listener) → thẻ tĩnh
 *
 * Đặt làm con của khối `relative overflow-hidden`. Tự gắn listener lên parentElement.
 */
import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/hooks/useReducedMotion";

export default function PointerLight({ radius = 220 }: { radius?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent || prefersReducedMotion()) return;

    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
      el.style.opacity = "1";
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[6] opacity-0 transition-opacity duration-300 motion-reduce:hidden"
      style={{
        background: `radial-gradient(${radius}px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--color-gold-300) 32%, transparent), transparent 70%)`,
      }}
    />
  );
}
