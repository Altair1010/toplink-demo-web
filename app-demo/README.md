# Y Viện Toplink — Bản demo giao diện

Demo website tương tác cho **Y Viện Toplink** (Y Viện Dưỡng Thân – Tỉnh Thức).
Đây là **bản demo giao diện**: dữ liệu tĩnh (mock), chưa kết nối database/Supabase.

## Tech
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS v4
- lucide-react icons
- Font: Noto Sans (body) + Be Vietnam Pro IN HOA (heading)

## Chạy trên localhost
```bash
cd app-demo
npm install
npm run dev
```
Mở http://localhost:3000

Build production thử:
```bash
npm run build && npm start
```

## Bảng màu thương hiệu
Đỏ trầm (`clay`) · Vàng kim (`gold`) · Nâu gỗ (`wood`) · Ngọc trầm (`jade`) · Trắng ngà / be (`ivory`, `cream`, `sand`).

## Trang đã dựng (giai đoạn P0)
- `/` Trang chủ — hero, module "Cơ thể bạn cần gì?", dịch vụ, quy trình, không gian, cảm nhận, FAQ, CTA
- `/gioi-thieu` Giới thiệu
- `/dich-vu` + `/dich-vu/[slug]` Dịch vụ & chi tiết (sticky booking card)
- `/quy-trinh-tri-lieu` Quy trình 8 bước
- `/khong-gian` Không gian 4 tầng
- `/dat-lich` Đặt lịch 3 bước (stepper tương tác)
- `/san-pham` Sản phẩm
- `/tin-tuc` Tin tức
- `/lien-he` Liên hệ + cơ sở

## Thành phần tương tác
- Header + menu mobile, mobile bottom bar (Gọi · Zalo · Đặt lịch · Chỉ đường)
- Need selector (chọn nhu cầu → gợi ý dịch vụ)
- Booking stepper 3 bước có nút "Tôi chưa biết chọn dịch vụ nào"
- FAQ accordion

## Lưu ý nội dung
Dùng ngôn ngữ an toàn sức khỏe ("hỗ trợ", "góp phần"), không cam kết chữa khỏi.
Ảnh đang là placeholder — thay bằng ảnh thật của Y Viện khi có.
