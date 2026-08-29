import Link from "next/link";

export const metadata = {
  title: "Liên hệ",
  description: "Zalo và Facebook Page là hai kênh handoff; URL chính thức đang chờ xác minh.",
};

export default function ContactPage() {
  return (
    <div className="info-page">
      <header className="info-page__header">
        <p className="info-eyebrow">Liên hệ</p>
        <h1>Hai kênh để tiếp tục trao đổi với con người</h1>
        <p>
          Zalo và Facebook Page là hai loại kênh đã được xác nhận cho handoff. Website không nhận
          lịch hẹn, không thu thập yêu cầu và không hứa thời gian phản hồi.
        </p>
      </header>

      <section className="info-editorial-pair" aria-labelledby="contact-boundary">
        <h2 id="contact-boundary">Đường dẫn chính thức vẫn đang được xác minh</h2>
        <div>
          <ul className="info-channel-list" aria-label="Kênh trao đổi trực tiếp">
            <li>
              <span>Zalo</span>
              <small>Chưa có URL được duyệt</small>
            </li>
            <li>
              <span>Facebook Page</span>
              <small>Chưa có URL được duyệt</small>
            </li>
          </ul>
          <p>
            Khi có cấu hình vận hành được phê duyệt, trang này sẽ cung cấp đúng đường dẫn. Hiện tại
            không có nút giả, username suy đoán, số điện thoại, địa chỉ hoặc bản đồ.
          </p>
          <Link href="/" className="info-text-link mt-6">
            Trở về trang chủ
          </Link>
        </div>
      </section>
    </div>
  );
}
