"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="main" className="not-found">
      <p className="chapter-mark">Nội dung tạm thời gián đoạn</p>
      <h1>Chưa thể tải dữ liệu đã xuất bản</h1>
      <p>
        Hệ thống nội dung đang không phản hồi hoặc trả về dữ liệu không hợp lệ. Không có dữ liệu mẫu
        nào được dùng thay thế.
      </p>
      <button className="text-link" type="button" onClick={reset}>
        Thử tải lại
      </button>
    </main>
  );
}
