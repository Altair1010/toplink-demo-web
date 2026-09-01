import { Gateway } from "@/components/structural/Gateway";
import { Release } from "@/components/structural/Release";
import { createStaticPageMetadata } from "@/lib/seo/metadata";
import { currentPublicSiteEnvironment } from "@/lib/seo/origin";

export function generateMetadata() {
  return createStaticPageMetadata("/gioi-thieu", currentPublicSiteEnvironment(), true);
}

export default function AboutPage() {
  return (
    <main id="main">
      <Gateway
        eyebrow="Grounded philosophy"
        title="Dưỡng Thân – Tỉnh Thức"
        lead="Y Viện Toplink được định hướng như một người chăm sóc, người chỉ dẫn và người hiểu biết: ấm áp, bình tĩnh, minh bạch."
      />
      <div className="philosophy-procession">
        <section>
          <p className="chapter-mark">01 · Vai trò</p>
          <h2>Hiểu trước khi lựa chọn</h2>
          <p>
            Website giúp người đọc nhận biết nhu cầu, hiểu thông tin, giới hạn và lựa chọn một bước
            tiếp theo có ý thức.
          </p>
        </section>
        <section>
          <p className="chapter-mark">02 · Phạm vi</p>
          <h2>Không chẩn đoán, không hứa kết quả</h2>
          <p>
            Nội dung hỗ trợ việc hiểu; không thay thế đánh giá chuyên môn, không dùng sợ hãi để bán
            hàng và không biến câu chuyện riêng thành kết quả phổ quát.
          </p>
        </section>
        <section>
          <p className="chapter-mark">03 · Tin cậy</p>
          <h2>Quyền riêng tư, đồng thuận và giới hạn</h2>
          <p>
            Dữ liệu con người, không gian và câu chuyện chỉ xuất hiện khi có nguồn gốc và quyền sử
            dụng phù hợp.
          </p>
        </section>
      </div>
      <Release title="Tiếp tục bằng thông tin có ích">
        <p>
          Thông tin tổ chức, lịch sử, pháp lý và con người chưa được xác minh sẽ không được bịa
          thêm.
        </p>
      </Release>
    </main>
  );
}
