import Link from "next/link";

const CHANNELS = ["Zalo", "Facebook Page"] as const;

export default function HumanContactHandoff() {
  return (
    <section id="lien-he" className="info-contact-handoff" aria-labelledby="contact-handoff-title">
      <div className="info-contact-handoff__intro">
        <p className="info-eyebrow">Sau khi đã đọc đủ</p>
        <h2 id="contact-handoff-title">
          Nếu muốn trao đổi trực tiếp, cuộc trò chuyện sẽ tiếp tục ngoài website.
        </h2>
      </div>
      <div className="info-contact-handoff__body">
        <p>
          Toplink đã chọn Zalo và Facebook Page làm hai kênh trao đổi với con người. Đường dẫn chính
          thức chưa có nguồn vận hành được xác minh, nên website chưa tạo nút bấm hoặc đoán tài
          khoản.
        </p>
        <ul className="info-channel-list" aria-label="Kênh trao đổi trực tiếp">
          {CHANNELS.map((channel) => (
            <li key={channel}>
              <span>{channel}</span>
              <small>Đường dẫn đang được xác minh</small>
            </li>
          ))}
        </ul>
        <Link href="/lien-he" className="info-text-link">
          Xem trạng thái liên hệ
        </Link>
      </div>
    </section>
  );
}
