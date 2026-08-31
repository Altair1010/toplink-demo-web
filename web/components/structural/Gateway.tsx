import type { ReactNode } from "react";

interface GatewayProps {
  eyebrow: string;
  title: string;
  lead: string;
  variant?: "home" | "page" | "reading" | "utility";
  children?: ReactNode;
}

export function Gateway({ eyebrow, title, lead, variant = "page", children }: GatewayProps) {
  return (
    <section className={`gateway gateway--${variant}`} aria-labelledby="page-title">
      {variant !== "utility" ? (
        <div className="gateway-frame" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      ) : null}
      <div className="gateway-copy">
        <p className="chapter-mark">{eyebrow}</p>
        <h1 id="page-title">{title}</h1>
        <p className="lead">{lead}</p>
      </div>
      {children}
    </section>
  );
}
