import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FixtureNotice } from "@/components/content/FixtureNotice";
import { Chamber } from "@/components/structural/Chamber";
import { Gateway } from "@/components/structural/Gateway";
import { Release } from "@/components/structural/Release";
import { Threshold } from "@/components/structural/Threshold";
import { getProductBySlug, getProducts } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug.value }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getProductBySlug((await params).slug);
  return product ? { title: product.title.value } : {};
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = getProductBySlug((await params).slug);
  if (!product) notFound();

  return (
    <main id="main">
      <FixtureNotice />
      <Gateway
        eyebrow="Documentation hall · fixture"
        title={product.title.value}
        lead={product.safe_positioning.value}
      />
      <div className="detail-procession">
        <Chamber index="01" title="Điều tài liệu có thể hỗ trợ">
          <ul>
            {product.supported_use_statements.value.map((statement) => (
              <li key={statement}>{statement}</li>
            ))}
          </ul>
        </Chamber>
        <Chamber index="02" title="Trạng thái tài liệu" tone="anchor">
          <p>{product.documentation_status.value}</p>
          <p>{product.evidence_state.value}</p>
        </Chamber>
      </div>
      <Threshold title="Giới hạn trước mọi hỗ trợ">
        <ul>
          {product.limitations_cautions.value.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Threshold>
      <Release eyebrow="Knowledge bridge" title="Đọc ngữ cảnh liên quan">
        <p>Trang sản phẩm không có mua hàng hoặc upsell.</p>
        <Link className="text-link" href="/kien-thuc/cach-doc-thong-tin-an-toan">
          Cách đọc thông tin an toàn
        </Link>
      </Release>
    </main>
  );
}
