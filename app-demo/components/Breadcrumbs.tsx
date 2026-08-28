import Link from "next/link";

export interface Crumb {
  href: string; // path tương đối, vd "/dich-vu"
  label: string;
}

/**
 * Breadcrumbs — điều hướng ngữ cảnh hiển thị cho người dùng.
 * Item cuối = trang hiện tại (không link).
 */
export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-mute">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>/</span>}
              {last ? (
                <span aria-current="page" className="text-ink-soft">
                  {c.label}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-crimson-600">
                  {c.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
