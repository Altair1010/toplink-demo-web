/**
 * Cấu hình gửi form đặt lịch sang GOOGLE FORM ẩn.
 *
 * Vì site là static export (GitHub Pages) → KHÔNG có API route. Ta POST dữ liệu
 * vào một Google Form qua <form target="iframe-ẩn">. Trình duyệt không đọc được
 * response (CORS opaque), nên coi iframe.onLoad (lần điều hướng thứ 2) hoặc timeout
 * là "đã gửi xong".
 *
 * ───────────────────────────────────────────────────────────────────────────
 * CÁCH LẤY GIÁ TRỊ THẬT (làm 1 lần):
 * 1. Tạo Google Form với các câu hỏi: Họ tên, SĐT, Ngày/giờ, Cơ sở, Nhu cầu,
 *    Dịch vụ, Ghi chú (đều dạng "Câu trả lời ngắn"/"Đoạn văn bản").
 * 2. Bấm ⋮ → "Lấy liên kết được điền sẵn" (Get pre-filled link), điền giá trị
 *    mẫu cho từng ô rồi "Lấy liên kết". URL trả về chứa entry.123456=... cho mỗi ô.
 * 3. Dán FORM_ID (đoạn /d/e/XXXX/ trong URL) và từng entry.xxx vào dưới đây.
 * ───────────────────────────────────────────────────────────────────────────
 */

/** TODO(user): thay bằng FORM_ID thật (đoạn giữa /d/e/ và /formResponse). */
const FORM_ID = "__GOOGLE_FORM_ID__";

/** TODO(user): thay từng entry id thật lấy từ "pre-filled link". */
export const GFORM = {
  action: `https://docs.google.com/forms/d/e/${FORM_ID}/formResponse`,
  fields: {
    name: "entry.__NAME__",
    phone: "entry.__PHONE__",
    datetime: "entry.__DATETIME__",
    branch: "entry.__BRANCH__",
    need: "entry.__NEED__",
    service: "entry.__SERVICE__",
    note: "entry.__NOTE__",
  },
} as const;

/** Đã cấu hình entry thật chưa? Nếu chưa → form fallback (không POST, chỉ báo thành công). */
export const isBookingConfigured = () =>
  !GFORM.action.includes("__GOOGLE_FORM_ID__") &&
  !Object.values(GFORM.fields).some((v) => v.includes("__"));

/** Số điện thoại VN: 10 chữ số bắt đầu bằng 0 (bỏ khoảng trắng trước khi kiểm). */
export const isValidPhone = (phone: string) => /^0\d{9}$/.test(phone.replace(/\s+/g, ""));
