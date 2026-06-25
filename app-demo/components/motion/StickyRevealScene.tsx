"use client";

import type { ReactNode } from "react";

/**
 * STICKY REVEAL SCENE — khung lưới cho các MotionImageCard scroll-driven
 * (4 tầng “Không gian Y Viện”). Chỉ lo layout/khoảng thở; motion nằm trong
 * từng card để mỗi card tự cleanup và tự respect reduced-motion.
 */
export default function StickyRevealScene({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {children}
    </div>
  );
}
