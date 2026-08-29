import ServiceScope from "@/components/home-experience/corrected/ServiceScope";

export const metadata = {
  title: "Phạm vi dịch vụ",
  description:
    "Đọc phạm vi các nhóm chăm sóc mà không suy ra giá, thời lượng hay độ phù hợp cá nhân.",
};

export default function ServicesPage() {
  return (
    <div className="info-page">
      <header className="info-page__header">
        <p className="info-eyebrow">Phạm vi dịch vụ</p>
        <h1>Hiểu từng nhóm trước khi tìm một tên dịch vụ cụ thể</h1>
        <p>
          Hồ sơ thương hiệu đã duyệt cấu trúc Lý liệu · Dược liệu · Dưỡng liệu và vai trò hỗ trợ của
          thiết bị. Tên, thời lượng, giá và điều kiện áp dụng của từng dịch vụ vẫn cần một bảng
          thông tin đã được xác minh trước khi công bố.
        </p>
      </header>
      <ServiceScope />
    </div>
  );
}
