import Link from "next/link";

import type { BreadcrumbItem } from "@/lib/seo/structured-data";

export function Breadcrumbs({ items }: { readonly items: readonly BreadcrumbItem[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Đường dẫn trang">
      <ol>
        {items.map((item, index) => (
          <li key={item.path} aria-current={index === items.length - 1 ? "page" : undefined}>
            {index === items.length - 1 ? item.name : <Link href={item.path}>{item.name}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
