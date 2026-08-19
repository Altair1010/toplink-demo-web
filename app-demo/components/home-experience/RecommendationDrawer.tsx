"use client";

import { useState } from "react";
import Link from "next/link";
import { X, CalendarPlus } from "lucide-react";
import type { Symptom } from "@/data/content";
import { recommend } from "@/lib/recommendation";

/**
 * Drawer gợi ý liệu trình — chỉ hiện SAU khi người dùng chọn triệu chứng.
 * Liệu trình xuất hiện như KẾT QUẢ của tương tác, không phải catalogue.
 * Slide-up CSS (motion #3). Đặt trên MobileBottomBar (bottom offset + z-index).
 */
export default function RecommendationDrawer({ selected }: { selected: Symptom[] }) {
  const [dismissed, setDismissed] = useState(false);
  const recos = recommend(selected);
  const open = selected.length > 0 && recos.length > 0 && !dismissed;

  if (selected.length === 0) return null;

  return (
    <div
      data-open={open}
      // Khi đóng, drawer chỉ trượt khỏi màn hình bằng transform — link và nút bên
      // trong VẪN nằm trong tab order nếu không chặn. `inert` gỡ cả focus lẫn cây
      // a11y, tránh người dùng bàn phím focus vào phần tử vô hình.
      inert={!open}
      className="reco-drawer fixed inset-x-0 bottom-20 z-40 px-3 lg:inset-x-auto lg:bottom-4 lg:right-4 lg:w-full lg:max-w-md"
      role="region"
      aria-label="Gợi ý liệu trình cho anh/chị"
    >
      <div className="mx-auto max-h-[42svh] max-w-3xl overflow-y-auto rounded-md border border-gold-500 bg-ivory p-4 elev-soft sm:p-6 lg:max-h-none">
        <div className="flex items-start justify-between gap-4">
          <p className="text-sm font-semibold uppercase tracking-wide text-crimson-600">
            Dựa trên lựa chọn: {selected.map((s) => s.label).join(" + ")}
          </p>
          <button
            type="button"
            aria-label="Đóng gợi ý"
            onClick={() => setDismissed(true)}
            className="shrink-0 rounded-sm p-1 text-ink-mute transition-colors hover:bg-cream hover:text-ink"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <ul className="mt-3 divide-y divide-sand">
          {recos.map((s, i) => (
            <li key={s.slug} className="flex items-center justify-between gap-3 py-2.5 sm:py-3">
              <div>
                <Link
                  href={`/dich-vu/${s.slug}`}
                  className="font-semibold text-ink underline-offset-4 hover:text-crimson-600 hover:underline"
                >
                  {i + 1}. {s.name}
                </Link>
                <span className="mt-0.5 block text-sm text-ink-mute">
                  {s.duration} · từ {s.priceFrom}
                </span>
              </div>
              <Link
                href="/dat-lich"
                className="shrink-0 rounded-sm border border-crimson-600 px-4 py-2 text-sm font-semibold text-crimson-600 transition-colors hover:bg-crimson-600 hover:text-ivory"
              >
                <span className="flex items-center gap-1.5">
                  <CalendarPlus className="h-4 w-4" /> Đặt lịch
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
