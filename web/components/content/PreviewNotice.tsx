import Link from "next/link";

import type { EditorialLifecycle } from "@/types/domain";

export function PreviewNotice({ lifecycle }: { lifecycle: EditorialLifecycle }) {
  if (lifecycle === "published") return null;
  return (
    <aside className="fixture-notice" aria-label="Chế độ xem trước riêng tư">
      <strong>Private preview · {lifecycle}</strong>
      <span>Nội dung này chưa công khai và không đi qua public cache.</span>
      <Link href="/api/cms/preview/exit" prefetch={false}>
        Thoát preview
      </Link>
    </aside>
  );
}
