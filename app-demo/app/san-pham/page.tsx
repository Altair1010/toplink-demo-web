import { MessageCircle } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { PRODUCTS, CONTACT } from "@/data/content";

export const metadata = { title: "Sản phẩm — Y Viện Toplink" };

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        eyebrow="Sản phẩm"
        title="Hỗ trợ chăm sóc tại nhà"
        desc="Thảo dược, máy sức khỏe và sản phẩm hỗ trợ để chị/anh duy trì dưỡng sinh giữa các buổi trị liệu."
      />

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((p) => (
          <div key={p.slug} className="flex flex-col rounded-2xl border border-sand bg-white/70 p-5 shadow-sm">
            <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-cream to-sand">
              <div className="flex h-full items-center justify-center text-xs text-ink-soft/60">Ảnh sản phẩm</div>
            </div>
            <span className="mt-4 text-xs font-semibold uppercase tracking-wide text-gold-600">{p.group}</span>
            <h3 className="mt-1 font-display text-base font-semibold text-clay-700">{p.name}</h3>
            <p className="mt-1 flex-1 text-sm text-ink-soft">{p.desc}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm font-semibold text-clay-700">từ {p.priceFrom}</span>
            </div>
            <a
              href={CONTACT.zalo}
              className="mt-3 flex items-center justify-center gap-2 rounded-full border border-gold-400 px-4 py-2 text-sm font-semibold text-gold-600 transition-colors hover:bg-gold-500/10"
            >
              <MessageCircle className="h-4 w-4" /> Tư vấn qua Zalo
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
