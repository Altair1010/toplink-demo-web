import Link from "next/link";

import { ContactDirectory } from "@/components/content/ContactDirectory";
import { RecordLink } from "@/components/content/RecordLink";
import { Court } from "@/components/structural/Court";
import { Gateway } from "@/components/structural/Gateway";
import { Release } from "@/components/structural/Release";
import { Threshold } from "@/components/structural/Threshold";
import { getArticles, getServices, getSiteSettings } from "@/lib/content";

const orientation = [
  [
    "Tĩnh",
    "Dừng lại để nhận biết",
    "Lắng nghe nhu cầu mà không tự chẩn đoán hay bị thúc ép hành động.",
  ],
  ["Thông", "Làm rõ điều đã biết", "Tách thông tin đã xác minh khỏi điều còn chờ bằng chứng."],
  ["Dưỡng", "Khám phá hỗ trợ phù hợp", "Đọc dịch vụ và kiến thức cùng giới hạn, lưu ý cần thiết."],
  [
    "Tỉnh",
    "Chọn bước tiếp theo có ý thức",
    "Tiếp tục đọc, tìm đánh giá chuyên môn hoặc liên hệ khi đã sẵn sàng.",
  ],
] as const;

export default async function HomePage() {
  const [services, knowledge, settings] = await Promise.all([
    getServices(),
    getArticles("knowledge"),
    getSiteSettings(),
  ]);

  return (
    <main id="main">
      <Gateway
        variant="home"
        eyebrow="Dưỡng Thân · Tỉnh Thức"
        title="Hiểu để chăm sóc, tĩnh để lắng nghe."
        lead="Toplink giúp người đọc đi từ nhu cầu còn mơ hồ đến thông tin rõ ràng, giới hạn minh bạch và một bước tiếp theo an toàn — kể cả khi bước đó chỉ là tiếp tục đọc."
      >
        <nav className="orientation-rail" aria-label="Bốn nhịp định hướng">
          {orientation.map(([key], index) => (
            <a key={key} href={`#orientation-${index + 1}`}>
              <span>0{index + 1}</span>
              <strong>{key}</strong>
            </a>
          ))}
        </nav>
      </Gateway>

      <section aria-label="Bốn nhịp để hiểu rõ hơn">
        {orientation.map(([key, title, body], index) => (
          <article className="procession-stage" id={`orientation-${index + 1}`} key={key}>
            <p className="chapter-mark">
              0{index + 1} · {key}
            </p>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>

      <Court
        eyebrow="Court · khám phá"
        title="Dịch vụ chỉ bắt đầu khi sự thật đã rõ"
        intro="Chỉ các hồ sơ đã vượt qua cổng nguồn, bằng chứng và phê duyệt mới xuất hiện tại đây."
      >
        <div className="obligation-ledger">
          {services.map((service) => (
            <RecordLink
              key={service.slug.value}
              href={`/dich-vu/${service.slug.value}`}
              eyebrow={service.service_group.value}
              title={service.title.value}
              summary={service.summary.value}
            />
          ))}
          <Link className="text-link" href="/dich-vu">
            Xem discovery court của dịch vụ
          </Link>
        </div>
      </Court>

      <Threshold title="Tin cậy được tạo bằng cách làm rõ">
        <div className="trust-ledger">
          <article>
            <h3>Giải thích rõ</h3>
            <p>Sự thật, định hướng và điều còn chờ xác minh luôn được tách biệt.</p>
          </article>
          <article>
            <h3>Giới hạn dễ đọc</h3>
            <p>Nội dung hỗ trợ không trở thành tuyên bố chữa khỏi hay cam kết thời gian.</p>
          </article>
          <article>
            <h3>Đồng thuận hiển thị</h3>
            <p>Hình ảnh và câu chuyện chỉ xuất hiện với nguồn gốc, quyền sử dụng phù hợp.</p>
          </article>
        </div>
      </Threshold>

      <Court
        eyebrow="Hall · đọc và hiểu"
        title="Kiến thức là một điểm đến hoàn chỉnh"
        intro="Người đọc có thể học, hiểu và dừng lại an toàn mà không phải liên hệ cơ sở."
        tone="muted"
      >
        <div>
          {knowledge.map((article) => (
            <RecordLink
              key={article.slug.value}
              href={`/kien-thuc/${article.slug.value}`}
              eyebrow="Kiến thức evergreen"
              title={article.title.value}
              summary={article.summary.value}
            />
          ))}
          <Link className="text-link" href="/kien-thuc">
            Đi vào reading hall
          </Link>
        </div>
      </Court>

      <section className="empty-evidence" aria-labelledby="space-title">
        <div>
          <p className="chapter-mark">Evidence · pending</p>
          <h2 id="space-title">Không gian phải là bằng chứng thật</h2>
          <p>
            Chưa có ảnh hoặc hồ sơ vật liệu Toplink được ủy quyền. Vùng này giữ đúng contract và
            không giả làm cơ sở thực.
          </p>
          <Link className="text-link" href="/khong-gian">
            Xem trạng thái evidence gallery
          </Link>
        </div>
        <div
          className="material-slot"
          role="img"
          aria-label="Mặt phẳng vật liệu trừu tượng, không phải không gian Toplink"
        />
      </section>

      <Release title="Liên hệ khi đã sẵn sàng">
        <ContactDirectory settings={settings} />
      </Release>
    </main>
  );
}
