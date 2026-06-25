"use client";

import { useEffect, useState } from "react";

/**
 * Trả về true khi người dùng bật prefers-reduced-motion.
 * SSR-safe: mặc định false đến khi mount, sau đó lắng nghe thay đổi.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
