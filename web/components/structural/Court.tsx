import type { ReactNode } from "react";

interface CourtProps {
  eyebrow: string;
  title: string;
  intro?: string;
  tone?: "reading" | "muted" | "dark";
  className?: string;
  children: ReactNode;
}

export function Court({
  eyebrow,
  title,
  intro,
  tone = "reading",
  className = "",
  children,
}: CourtProps) {
  return (
    <section className={`court court--${tone} ${className}`.trim()}>
      <header className="court-heading">
        <p className="chapter-mark">{eyebrow}</p>
        <h2>{title}</h2>
        {intro ? <p className="lead">{intro}</p> : null}
      </header>
      <div className="court-content">{children}</div>
    </section>
  );
}
