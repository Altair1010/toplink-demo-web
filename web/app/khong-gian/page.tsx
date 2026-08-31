import type { Metadata } from "next";

import { Gateway } from "@/components/structural/Gateway";

export const metadata: Metadata = { title: "Không gian" };

export default function SpacePage() {
  return (
    <main id="main">
      <Gateway
        eyebrow="Evidence gallery"
        title="Không gian chỉ được kể bằng tư liệu thật"
        lead="Hình ảnh Toplink, vật liệu và thông tin trải nghiệm thực tế chưa được cung cấp với provenance và authorization cần thiết."
      />
      <section className="empty-evidence" aria-labelledby="evidence-title">
        <div>
          <p className="chapter-mark">Safe pending state</p>
          <h2 id="evidence-title">Gallery đang được giữ lại</h2>
          <p>
            Template đã dành chỗ cho media, caption và nguồn. Không có ảnh stock nào được trình bày
            như cơ sở, nhân sự, khách hàng hoặc kết quả của Toplink.
          </p>
        </div>
        <div
          className="material-slot"
          role="img"
          aria-label="Slot vật liệu trừu tượng đang chờ bằng chứng Toplink"
        />
      </section>
      <section className="utility-hall" aria-labelledby="needed-title">
        <p className="chapter-mark">Evidence contract</p>
        <h2 id="needed-title">Điều cần có trước khi xuất bản</h2>
        <dl className="definition-ledger">
          <div>
            <dt>Nguồn và thời điểm</dt>
            <dd>Hồ sơ cho biết tư liệu được tạo ở đâu, khi nào và bởi ai.</dd>
          </div>
          <div>
            <dt>Quyền sử dụng</dt>
            <dd>Authorization và consent phù hợp với người, nơi chốn và mục đích hiển thị.</dd>
          </div>
          <div>
            <dt>Vai trò media</dt>
            <dd>Orientation, evidence, explanation hoặc atmosphere được khai báo rõ.</dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
