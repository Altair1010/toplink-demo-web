"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/motion/scrollTrigger";
import { registerEases } from "@/lib/motion/easings";
import { motionConfig } from "@/lib/motion/config";
import { useConvergeScene } from "./ScrollConvergeScene";

type From = "left" | "right" | "up" | "down";

/**
 * CONVERGE BLOCK — một khối trượt từ `from` rồi HỘI TỤ về giữa theo progress của
 * scene cha. Mỗi block có cửa sổ nhịp riêng (stagger theo `index`).
 * Chỉ ghi transform/opacity qua quickSetter (GPU, không reflow).
 *
 * Base CSS (motion.css) đã để hiển thị đầy đủ → no-JS/SSR vẫn đọc được; ở đây
 * chỉ ghi đè khi đã subscribe được scene (client).
 */
export default function ConvergeBlock({
  from = "left",
  index = 0,
  dist = motionConfig.convergeDistance,
  className = "",
  children,
}: {
  from?: From;
  /** Thứ tự để tạo stagger (0,1,2…). */
  index?: number;
  /** Khoảng trượt ban đầu (px). */
  dist?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { subscribe } = useConvergeScene();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    registerEases(); // đảm bảo CustomEase "convergeRitual" có trước parseEase

    const off: Record<From, [number, number]> = {
      left: [-dist, 0],
      right: [dist, 0],
      up: [0, dist * 0.6],
      down: [0, -dist * 0.6],
    };
    const [ox, oy] = off[from];

    const setX = gsap.quickSetter(el, "x", "px") as (v: number) => void;
    const setY = gsap.quickSetter(el, "y", "px") as (v: number) => void;
    const setScale = gsap.quickSetter(el, "scale") as (v: number) => void;
    const setOpacity = gsap.quickSetter(el, "opacity") as (v: number) => void;
    const ease = gsap.parseEase(motionConfig.ease);

    // Cửa sổ nhịp của block trong tiến độ scene: [f0, f1].
    const f0 = Math.min(index * motionConfig.stagger, 0.6);
    const f1 = Math.min(f0 + motionConfig.revealWindow, 1);

    const apply = (p: number) => {
      const local = f1 > f0 ? (p - f0) / (f1 - f0) : 1;
      const e = ease(Math.max(0, Math.min(1, local)));
      setX(ox * (1 - e));
      setY(oy * (1 - e));
      setScale(motionConfig.inactiveScale + (motionConfig.activeScale - motionConfig.inactiveScale) * e);
      setOpacity(motionConfig.inactiveOpacity + (motionConfig.activeOpacity - motionConfig.inactiveOpacity) * e);
    };

    return subscribe(apply);
  }, [from, dist, index, subscribe]);

  return (
    <div
      ref={ref}
      data-converge-block
      className={className}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </div>
  );
}
