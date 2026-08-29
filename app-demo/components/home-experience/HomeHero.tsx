export default function HomeHero() {
  return (
    <section className="info-hero" aria-labelledby="home-title">
      <div className="info-hero__inner">
        <p className="info-eyebrow">Y Viện Dưỡng Thân · Tỉnh Thức</p>
        <h1 id="home-title">Đọc để hiểu trước khi quyết định có cần trao đổi trực tiếp</h1>
        <div className="info-hero__answer">
          <p>
            Website này giúp chị/anh sắp xếp điều đang quan tâm, hiểu phạm vi dịch vụ và những giới
            hạn hiện có. Nó không chẩn đoán, không chọn dịch vụ thay và không tiếp nhận lịch hẹn.
          </p>
          <a href="#hh-orientation-title" className="info-text-link">
            Bắt đầu từ điều đang quan tâm
          </a>
        </div>
      </div>
    </section>
  );
}
