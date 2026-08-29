import SectionHeader from "@/components/SectionHeader";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { PRODUCTS } from "@/data/content";

export const metadata = {
  title: "Thông tin sản phẩm",
  description: "Danh mục, công dụng và giá sản phẩm đang chờ hồ sơ được xác minh.",
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
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
