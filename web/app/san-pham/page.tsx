import type { Metadata } from "next";

import { FixtureNotice } from "@/components/content/FixtureNotice";
import { RecordLink } from "@/components/content/RecordLink";
import { Gateway } from "@/components/structural/Gateway";
import { Release } from "@/components/structural/Release";
import { getProducts } from "@/lib/content";

export const metadata: Metadata = { title: "Sản phẩm" };

export default function ProductIndexPage() {
  const products = getProducts();

  return (
    <main id="main">
      <FixtureNotice />
      <Gateway
        eyebrow="Informational registry"
        title="Sản phẩm được trình bày như hồ sơ thông tin"
        lead="Không giá, không tồn kho, không giỏ hàng và không nút mua. Mỗi record phải cho biết điều được hỗ trợ, giới hạn và trạng thái tài liệu."
      />
      <section className="route-frame" aria-labelledby="registry-title">
        <p className="chapter-mark">Registry · fixture</p>
        <h2 id="registry-title">Hồ sơ tham chiếu</h2>
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
