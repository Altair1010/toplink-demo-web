export default function StaticOrientationShell() {
  return (
    <section
      className="hh-home-shell"
      aria-labelledby="hh-home-opening-question"
      data-humanizer-home="m2a0"
    >
      <div className="hh-home-shell__opening">
        <h2 id="hh-home-opening-question" className="hh-home-shell__opening-question">
          Anh/chị đang muốn bắt đầu từ điều gì?
        </h2>
        <p className="hh-home-shell__opening-context">
          Có thể bắt đầu từ một vùng đang khó chịu, từ việc chưa biết nên chọn dịch vụ nào, hoặc chỉ
          từ mong muốn hiểu thêm trước khi quyết định.
        </p>
      </div>

      <div className="hh-home-shell__boundary">
        <p className="hh-home-shell__boundary-purpose">
          Phần này chỉ giúp anh/chị sắp xếp điều muốn trao đổi.
        </p>
        <p className="hh-home-shell__boundary-limit">
          Website không tự kết luận tình trạng và không tự chọn dịch vụ thay anh/chị.
        </p>
      </div>

      <div className="hh-home-shell__consequence">
        <p className="hh-home-shell__consequence-state">
          Ở bước định hướng này, không có thông tin nào được gửi đi.
        </p>
        <p className="hh-home-shell__consequence-permission">
          Anh/chị có thể dừng lại và quay lại khi thấy phù hợp.
        </p>
      </div>
    </section>
  );
}
