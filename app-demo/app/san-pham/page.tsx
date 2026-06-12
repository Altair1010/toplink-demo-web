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

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((p) => (
          <div key={p.slug} className="flex flex-col rounded-md border border-sand bg-white/70 p-8 shadow-sm">
            <div className="aspect-square overflow-hidden rounded-md bg-gradient-to-br from-cream to-sand">
              <div className="flex h-full items-center justify-center text-sm text-ink-soft/60">Ảnh sản phẩm</div>
            </div>
            <span className="mt-4 text-sm font-semibold uppercase tracking-wide text-gold-700">{p.group}</span>
            <h3 className="mt-1 font-display text-xl font-black text-crimson-600">{p.name}</h3>
            <p className="mt-1 flex-1 text-base text-ink-soft">{p.desc}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-base font-semibold text-crimson-600">từ {p.priceFrom}</span>
            </div>
            <a
              href={CONTACT.zalo}
              className="mt-3 flex items-center justify-center gap-2 rounded-sm border border-gold-400 px-6 py-3 text-base font-semibold text-gold-700 transition-colors hover:bg-gold-500/10"
            >
              <MessageCircle className="h-4 w-4" /> Tư vấn qua Zalo
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
