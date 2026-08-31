import type { Metadata } from "next";

import { FixtureNotice } from "@/components/content/FixtureNotice";
import { RecordLink } from "@/components/content/RecordLink";
import { Court } from "@/components/structural/Court";
import { Gateway } from "@/components/structural/Gateway";
import { Release } from "@/components/structural/Release";
import { getServices } from "@/lib/content";

export const metadata: Metadata = { title: "Dịch vụ" };

export default function ServiceIndexPage() {
  const services = getServices();

  return (
    <main id="main">
      <FixtureNotice />
      <Gateway
        eyebrow="Discovery court"
        title="Hiểu dịch vụ trước khi cân nhắc"
        lead="Trang này chứng minh cách các hồ sơ dịch vụ được so sánh bằng mục đích, giới hạn và nghĩa vụ thông tin — không bằng giá hoặc lời hứa kết quả."
      />
      <Court
        eyebrow="Các hồ sơ tham chiếu"
        title="Taxonomy thật vẫn đang chờ"
        intro="Mỗi record dưới đây chỉ kiểm tra độ dài, thứ tự và đường discovery của frontend."
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
