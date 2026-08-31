import type { ReactNode } from "react";

export function Threshold({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="threshold" aria-labelledby="threshold-title">
      <p className="chapter-mark">Ngưỡng tin cậy</p>
      <h2 id="threshold-title">{title}</h2>
      {children}
    </aside>
  );
}
