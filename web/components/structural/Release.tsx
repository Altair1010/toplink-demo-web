import type { ReactNode } from "react";

interface ReleaseProps {
  eyebrow?: string;
  title: string;
  children: ReactNode;
}

export function Release({ eyebrow = "Bước tiếp theo", title, children }: ReleaseProps) {
  return (
    <section className="release">
      <header>
        <p className="chapter-mark">{eyebrow}</p>
        <h2>{title}</h2>
      </header>
      <div>{children}</div>
    </section>
  );
}
