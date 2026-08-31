import Link from "next/link";
import type { ReactNode } from "react";

interface RecordLinkProps {
  href: string;
  eyebrow?: string;
  title: string;
  summary: string;
  meta?: ReactNode;
}

export function RecordLink({ href, eyebrow, title, summary, meta }: RecordLinkProps) {
  return (
    <article className="record-link">
      {eyebrow ? <p className="record-eyebrow">{eyebrow}</p> : null}
      <h3>
        <Link href={href}>{title}</Link>
      </h3>
      <p>{summary}</p>
      {meta ? <div className="record-meta">{meta}</div> : null}
    </article>
  );
}
