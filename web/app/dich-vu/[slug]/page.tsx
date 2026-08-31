import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ContactDirectory } from "@/components/content/ContactDirectory";
import { FixtureNotice } from "@/components/content/FixtureNotice";
import { MediaFigure } from "@/components/content/MediaFigure";
import { Chamber } from "@/components/structural/Chamber";
import { Gateway } from "@/components/structural/Gateway";
import { Release } from "@/components/structural/Release";
import { Threshold } from "@/components/structural/Threshold";
import { getServiceBySlug, getServices, getSiteSettings } from "@/lib/content";
import { approvedValue } from "@/types/domain";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getServices().map((service) => ({ slug: service.slug.value }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const service = getServiceBySlug((await params).slug);
  return service ? { title: service.title.value } : {};
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const service = getServiceBySlug((await params).slug);
  if (!service) notFound();
  const media = approvedValue(service.media) ?? [];

  return (
    <main id="main">
      <FixtureNotice />
      <Gateway
        eyebrow="Purpose gate · fixture"
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
        <Link className="text-link" href="/kien-thuc/cach-doc-thong-tin-an-toan">
          Cách đọc thông tin chăm sóc sức khỏe an toàn
        </Link>
      </Release>

      <Release title="Trao đổi với con người khi đã hiểu rõ">
        <ContactDirectory settings={getSiteSettings()} />
      </Release>
    </main>
  );
}
