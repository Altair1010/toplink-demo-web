import { RecordLink } from "@/components/content/RecordLink";
import { Gateway } from "@/components/structural/Gateway";
import { Release } from "@/components/structural/Release";
import { getProducts } from "@/lib/content";
import { createStaticPageMetadata } from "@/lib/seo/metadata";
import { currentPublicSiteEnvironment } from "@/lib/seo/origin";
import { isPublicSitemapRecord } from "@/lib/seo/sitemap";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const products = await getProducts();
  return createStaticPageMetadata(
    "/san-pham",
    currentPublicSiteEnvironment(),
    products.some(isPublicSitemapRecord),
  );
}

export default async function ProductIndexPage() {
  const products = await getProducts();

  return (
    <main id="main">
      <Gateway
        eyebrow="Informational registry"
        title="Sản phẩm được trình bày như hồ sơ thông tin"
        lead="Không giá, không tồn kho, không giỏ hàng và không nút mua. Mỗi record phải cho biết điều được hỗ trợ, giới hạn và trạng thái tài liệu."
      />
      <section className="route-frame" aria-labelledby="registry-title">
        <p className="chapter-mark">Registry · published</p>
        <h2 id="registry-title">Hồ sơ đã được phê duyệt</h2>
        <div className="registry">
          {products.map((product) => (
            <RecordLink
              key={product.slug.value}
              href={`/san-pham/${product.slug.value}`}
              eyebrow={product.documentation_status.value}
              title={product.title.value}
              summary={product.summary.value}
              meta={<span>{product.evidence_state.value}</span>}
            />
          ))}
        </div>
      </section>
      <Release eyebrow="Documentation key" title="Evidence trước hỗ trợ">
        <p>
          Hồ sơ thật chỉ được xuất bản khi tài liệu, phát biểu sử dụng và giới hạn đều có nguồn được
          phê duyệt.
        </p>
      </Release>
    </main>
  );
}
