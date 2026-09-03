import { RecordLink } from "@/components/content/RecordLink";
import { Court } from "@/components/structural/Court";
import { Gateway } from "@/components/structural/Gateway";
import { Release } from "@/components/structural/Release";
import { getServices } from "@/lib/content";
import { createStaticPageMetadata } from "@/lib/seo/metadata";
import { currentPublicSiteEnvironment } from "@/lib/seo/origin";
import { isPublicSitemapRecord } from "@/lib/seo/sitemap";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const services = await getServices();
  return createStaticPageMetadata(
    "/dich-vu",
    currentPublicSiteEnvironment(),
    services.some(isPublicSitemapRecord),
  );
}

export default async function ServiceIndexPage() {
  const services = await getServices();

  return (
    <main id="main">
      <Gateway
        eyebrow="Discovery court"
        title="Hiểu dịch vụ trước khi cân nhắc"
        lead="Trang này chứng minh cách các hồ sơ dịch vụ được so sánh bằng mục đích, giới hạn và nghĩa vụ thông tin — không bằng giá hoặc lời hứa kết quả."
      />
      <Court
        eyebrow="Hồ sơ đã xuất bản"
        title="Các nhóm dịch vụ đã được phê duyệt"
        intro="Danh sách tự giữ trống khi chưa có hồ sơ nào vượt qua đầy đủ cổng xuất bản."
      >
        <ul className="plain-list service-discovery">
          {services.map((service) => (
            <li key={service.slug.value}>
              <RecordLink
                href={`/dich-vu/${service.slug.value}`}
                eyebrow={service.service_group.value}
                title={service.title.value}
                summary={service.summary.value}
                meta={<span>{service.evidence_state.value}</span>}
              />
            </li>
          ))}
        </ul>
      </Court>
      <Release title="Hiểu nghĩa vụ của một hồ sơ dịch vụ">
        <div className="obligation-ledger">
          <p>Mục đích và phạm vi hỗ trợ</p>
          <p>Trải nghiệm và quy trình đã xác minh</p>
          <p>Giới hạn, lưu ý và chuyển tiếp chuyên môn</p>
        </div>
      </Release>
    </main>
  );
}
