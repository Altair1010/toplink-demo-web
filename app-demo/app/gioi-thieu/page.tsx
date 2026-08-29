export const metadata = {
  title: "Về Y Viện Toplink",
  description:
    "Định hướng Dưỡng Thân · Tỉnh Thức và cách Toplink muốn giúp người đọc hiểu trước khi lựa chọn.",
};

export default function AboutPage() {
  return (
    <div className="info-page">
      <header className="info-page__header">
        <p className="info-eyebrow">Về Y Viện</p>
        <h1>Toplink định hướng trở thành một nơi dưỡng thân và giúp người đọc hiểu rõ hơn</h1>
        <p>
          Hồ sơ thương hiệu 2026 mô tả Toplink bằng tinh thần Caregiver, Sage và Guide: ấm áp nhưng
          không làm thay, có hiểu biết nhưng không lên lớp, dẫn đường nhưng không quyết định hộ.
        </p>
      </header>

      <section className="info-editorial-pair" aria-labelledby="about-purpose">
        <h2 id="about-purpose">Điều thương hiệu muốn giữ</h2>
        <div>
          <p>
            Đưa những giá trị phù hợp của Đông y dưỡng sinh vào đời sống hiện đại bằng ngôn ngữ dễ
            hiểu; xây dựng trải nghiệm lấy con người làm trung tâm và tôn trọng khác biệt cá nhân.
          </p>
          <p>
            “Dưỡng Thân · Tỉnh Thức” là descriptor đã có trong hồ sơ thương hiệu. Nó không thay cho
            hồ sơ pháp lý, danh mục dịch vụ, quy trình vận hành, nhân sự, cơ sở hoặc bằng chứng thực
            tế.
          </p>
        </div>
      </section>

      <section className="info-boundary" aria-labelledby="about-boundary">
        <p className="info-eyebrow">Giới hạn hiện tại</p>
        <h2 id="about-boundary">
          Website chưa dùng hình ảnh, con người hay không gian để chứng minh điều chưa được xác
          minh.
        </h2>
        <p>
          Bằng chứng về địa điểm, nhân sự, quy trình và dịch vụ sẽ chỉ xuất hiện sau khi có nguồn,
          quyền công bố và rà soát phù hợp. Phần bằng chứng này sẽ được bổ sung ở giai đoạn sau.
        </p>
      </section>
    </div>
  );
}
