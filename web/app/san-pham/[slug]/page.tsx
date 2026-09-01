import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { JsonLd } from "@/components/content/JsonLd";
import { PreviewNotice } from "@/components/content/PreviewNotice";
import { Chamber } from "@/components/structural/Chamber";
import { Gateway } from "@/components/structural/Gateway";
import { Release } from "@/components/structural/Release";
import { Threshold } from "@/components/structural/Threshold";
import { getContentRedirect, getProductBySlug, getProducts } from "@/lib/content";
import { isPublicSeoRecord } from "@/lib/seo/eligibility";
import { createProductMetadata } from "@/lib/seo/metadata";
import { configuredPublicSiteOrigin, currentPublicSiteEnvironment } from "@/lib/seo/origin";
import { createBreadcrumbList } from "@/lib/seo/structured-data";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getProducts()).map((product) => ({ slug: product.slug.value }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  return product ? createProductMetadata(product, currentPublicSiteEnvironment()) : {};
}

export default async function ProductDetailPage({ params }: PageProps) {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);
  if (!product) {
    const redirect = await getContentRedirect("products", slug);
    if (redirect) permanentRedirect(redirect);
    notFound();
  }
  const breadcrumbItems = [
    { name: "Trang chủ", path: "/" },
    { name: "Sản phẩm", path: "/san-pham" },
    { name: product.title.value, path: product.seo.value.canonicalPath },
  ];
  const publicOrigin = configuredPublicSiteOrigin(currentPublicSiteEnvironment());

  return (
    <main id="main">
      <JsonLd
        data={
          publicOrigin && isPublicSeoRecord(product)
            ? createBreadcrumbList(breadcrumbItems, publicOrigin)
            : undefined
        }
      />
      <PreviewNotice lifecycle={product.editorial_lifecycle} />
      <Breadcrumbs items={breadcrumbItems} />
      <Gateway
        eyebrow="Documentation hall · published"
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
        <Link
          className="text-link"
          href={
            product.related_knowledge?.value[0]
              ? `/kien-thuc/${product.related_knowledge.value[0]}`
              : "/kien-thuc"
          }
        >
          Đọc nội dung kiến thức liên quan
        </Link>
      </Release>
    </main>
  );
}
