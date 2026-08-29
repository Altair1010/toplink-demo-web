const SERVICE_SCOPE = [
  {
    label: "Lý liệu / thao tác chăm sóc",
    meaning:
      "Cách gọi cho phần giải thích cơ thể được chăm sóc bằng thao tác hoặc vận động có hướng dẫn. Tên nhóm không tự nói ai phù hợp.",
  },
  {
    label: "Dược liệu",
    meaning:
      "Cách gọi cho phần có liên quan đến dược liệu. Thành phần, cách dùng và lưu ý chỉ được công bố khi có hồ sơ riêng đã xác minh.",
  },
  {
    label: "Dưỡng liệu",
    meaning:
      "Cách gọi cho phần hỗ trợ thói quen chăm sóc. Nó không thay cho chẩn đoán, điều trị hay hướng dẫn y khoa cá nhân.",
  },
  {
    label: "Thiết bị hỗ trợ",
    meaning:
      "Cách gọi cho công cụ được đặt trong trải nghiệm chăm sóc. Tên thiết bị không phải bằng chứng về công dụng hoặc độ phù hợp.",
  },
] as const;

export default function ServiceScope() {
  return (
    <section className="hh-narrative__scope" aria-labelledby="hh-service-scope-title">
      <div className="hh-narrative__scope-intro">
        <p className="hh-narrative__label">Phạm vi dịch vụ</p>
        <h2 id="hh-service-scope-title" className="hh-narrative__scope-title">
          Đọc tên nhóm để biết mình đang tìm hiểu điều gì — không dùng nó để tự kết luận phù hợp.
        </h2>
      </div>
      <ol className="hh-narrative__scope-index">
        {SERVICE_SCOPE.map((item, index) => (
          <li key={item.label}>
            <span className="hh-narrative__scope-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{item.label}</h3>
            <p>{item.meaning}</p>
          </li>
        ))}
      </ol>
      <p className="hh-narrative__scope-boundary">
        Đây không phải danh mục dịch vụ đầy đủ và không công bố thời lượng, giá, kết quả sức khỏe
        hoặc khả năng phù hợp của một người cụ thể.
      </p>
    </section>
  );
}
