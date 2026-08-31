import type { ReactNode } from "react";

interface ChamberProps {
  index?: string;
  title: string;
  tone?: "light" | "anchor" | "ink";
  children: ReactNode;
}

export function Chamber({ index, title, tone = "light", children }: ChamberProps) {
  return (
    <section className={`chamber chamber--${tone}`}>
      {index ? <span className="chamber-index">{index}</span> : null}
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  );
}
