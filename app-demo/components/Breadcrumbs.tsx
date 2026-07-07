import Link from "next/link";

const BASE = "https://altair1010.github.io/toplink-demo-web";

export interface Crumb {
  href: string; // path tương đối, vd "/dich-vu"
  label: string;
}

/**
 * Breadcrumbs — điều hướng ngữ cảnh + BreadcrumbList schema (SEO).
 * Item cuối = trang hiện tại (không link).
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${BASE}${c.href}${c.href.endsWith("/") ? "" : "/"}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-mute">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {last ? (
                <span aria-current="page" className="text-ink-soft">{c.label}</span>
              ) : (
                <Link href={c.href} className="hover:text-crimson-600">{c.label}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
