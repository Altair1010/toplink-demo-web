import { MessageCircle } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import BrandVisual from "@/components/BrandVisual";
import Reveal from "@/components/Reveal";
import { PRODUCTS, CONTACT } from "@/data/content";

export const metadata = {
  title: "Sản phẩm",
  description: "Thảo dược, máy sức khỏe và sản phẩm hỗ trợ dưỡng sinh tại nhà từ Y Viện Toplink.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <SectionHeader
        eyebrow="Sản phẩm"
        title="Hỗ trợ chăm sóc tại nhà"
        desc="Thảo dược, máy sức khỏe và sản phẩm hỗ trợ để chị/anh duy trì dưỡng sinh giữa các buổi trị liệu."
      />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 80}>
            <div className="lift flex h-full flex-col overflow-hidden rounded-md border border-sand bg-cream p-8 shadow-sm">
              <div className="aspect-square overflow-hidden rounded-md border border-sand">
                <BrandVisual variant="cream" src={p.image} label={p.group} className="zoom-media" />
              </div>
              <span className="mt-4 text-sm font-semibold uppercase tracking-wide text-gold-600">{p.group}</span>
              <h3 className="mt-1 text-xl font-black text-crimson-600">{p.name}</h3>
              <p className="mt-1 flex-1 text-base text-ink-soft">{p.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-base font-semibold text-crimson-600">từ {p.priceFrom}</span>
              </div>
              <a
                href={CONTACT.zalo}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center justify-center gap-2 rounded-sm border border-gold-500 px-6 py-3 text-base font-semibold text-gold-600 transition-colors hover:bg-gold-200"
              >
                <MessageCircle className="h-4 w-4" /> Tư vấn liệu trình
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
