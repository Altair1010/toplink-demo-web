import BrandVisual from "@/components/BrandVisual";
import { type Product } from "@/data/content";

/**
 * ProductCard — thẻ sản phẩm dùng chung (tách khỏi inline /san-pham để chuẩn hoá 1 phong
 * cách, chống drift). Giữ đúng brand: cream + gold badge nhóm + crimson tên + CTA Zalo.
 * Điểm nhấn: con TRIỆN "Y" góc ảnh — dấu nhận diện thống nhất với BookCard.
 */
export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <div className="lift flex h-full flex-col overflow-hidden rounded-md border border-sand bg-cream p-8 shadow-sm">
      <div className="relative aspect-square overflow-hidden rounded-md border border-sand">
        <BrandVisual variant="cream" src={p.image} label={p.group} className="zoom-media" />
        <span
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-sm border border-gold-400 bg-crimson-600/95 font-display text-sm font-bold text-gold-200"
          aria-hidden
        >
          Y
        </span>
      </div>
      <span className="mt-4 text-sm font-semibold uppercase tracking-wide text-gold-700">
        {p.group}
      </span>
      <h3 className="mt-1 text-xl font-semibold text-crimson-600">{p.name}</h3>
      <p className="mt-1 flex-1 text-base text-ink-soft">{p.desc}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-base font-semibold text-crimson-600">từ {p.priceFrom}</span>
      </div>
    </div>
  );
}
