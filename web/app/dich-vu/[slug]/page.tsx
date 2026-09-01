import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";

import { ContactDirectory } from "@/components/content/ContactDirectory";
import { Breadcrumbs } from "@/components/content/Breadcrumbs";
import { JsonLd } from "@/components/content/JsonLd";
import { MediaFigure } from "@/components/content/MediaFigure";
import { PreviewNotice } from "@/components/content/PreviewNotice";
import { Chamber } from "@/components/structural/Chamber";
import { Gateway } from "@/components/structural/Gateway";
import { Release } from "@/components/structural/Release";
import { Threshold } from "@/components/structural/Threshold";
import { getContentRedirect, getServiceBySlug, getServices, getSiteSettings } from "@/lib/content";
import { isPublicSeoRecord } from "@/lib/seo/eligibility";
import { createServiceMetadata } from "@/lib/seo/metadata";
import { configuredPublicSiteOrigin, currentPublicSiteEnvironment } from "@/lib/seo/origin";
import { createBreadcrumbList, createServiceStructuredData } from "@/lib/seo/structured-data";
import { approvedValue } from "@/types/domain";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return (await getServices()).map((service) => ({ slug: service.slug.value }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = await getServiceBySlug((await params).slug);
  return service ? createServiceMetadata(service, currentPublicSiteEnvironment()) : {};
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const slug = (await params).slug;
  const service = await getServiceBySlug(slug);
  if (!service) {
    const redirect = await getContentRedirect("services", slug);
    if (redirect) permanentRedirect(redirect);
    notFound();
  }
  const media = approvedValue(service.media) ?? [];
  const breadcrumbItems = [
    { name: "Trang chủ", path: "/" },
    { name: "Dịch vụ", path: "/dich-vu" },
    { name: service.title.value, path: service.seo.value.canonicalPath },
  ];
  const publicOrigin = configuredPublicSiteOrigin(currentPublicSiteEnvironment());

  return (
    <main id="main">
      <JsonLd
        data={
          publicOrigin && isPublicSeoRecord(service)
            ? createBreadcrumbList(breadcrumbItems, publicOrigin)
            : undefined
        }
      />
      <JsonLd
        data={publicOrigin ? createServiceStructuredData(service, publicOrigin) : undefined}
      />
      <PreviewNotice lifecycle={service.editorial_lifecycle} />
      <Breadcrumbs items={breadcrumbItems} />
      <Gateway
        eyebrow="Purpose gate · published"
        title={service.title.value}
        lead={service.summary.value}
      />

      <div className="detail-procession">
        {media.map((item) => (
          <MediaFigure key={item.asset.value.src} media={item} />
        ))}
        <Chamber index="01" title="Mục đích">
          {service.body.value.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </Chamber>
        <Chamber index="02" title="Ai có thể cân nhắc" tone="anchor">
          <ul>
            {service.who_it_may_fit.value.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Chamber>
        <Chamber index="03" title="Trải nghiệm và quy trình">
          <ol>
            {service.experience_process.value.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </Chamber>
      </div>

      <Threshold title="Giới hạn phải được đọc trước liên hệ">
        <ul>
          {service.limitations_cautions.value.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p>{service.professional_evaluation.value}</p>
        <div className="evidence-note">
          <strong>Trạng thái bằng chứng</strong>
          <p>{service.evidence_state.value}</p>
        </div>
      </Threshold>

      <Release eyebrow="Knowledge bridge" title="Đọc thêm trước khi quyết định">
        <p>Quan hệ kiến thức chỉ xuất hiện khi có lý do ngữ nghĩa, không phải cửa ngõ bán hàng.</p>
        <Link
          className="text-link"
          href={
            service.related_knowledge?.value[0]
              ? `/kien-thuc/${service.related_knowledge.value[0]}`
              : "/kien-thuc"
          }
        >
          Đọc nội dung kiến thức liên quan
        </Link>
      </Release>

      <Release title="Trao đổi với con người khi đã hiểu rõ">
        {service.editorial_lifecycle === "published" ? (
          <ContactDirectory settings={await getSiteSettings()} placement="service_detail" />
        ) : null}
      </Release>
    </main>
  );
}
