# Y Viện Toplink — Web Demo

Website tĩnh giới thiệu **Y Viện Toplink**, một cơ sở chăm sóc sức khỏe Đông y dưỡng sinh tại
Hà Nội. Đây là bản demo giao diện: nội dung tĩnh, không database, không backend.

## Demo

https://altair1010.github.io/toplink-demo-web/

## Phạm vi

Website phục vụ bốn việc:

```
ĐỌC → HIỂU → KHÁM PHÁ → (tùy chọn) LIÊN HỆ CON NGƯỜI
```

Không có hệ thống đặt lịch. Không có form gửi dữ liệu. Liên hệ là lối ra tùy chọn qua hai
loại kênh đã duyệt là Zalo và Facebook Page; đường dẫn chính xác của hai kênh đó chưa được
cung cấp nên giao diện nói thẳng điều đó thay vì tạo link giả.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · static export · GitHub Pages.

## Chạy cục bộ

```bash
cd app-demo
npm ci
npm run dev
```

Mở http://localhost:3000/toplink-demo-web

## Kiểm tra

```bash
cd app-demo
npm run verify
```

Chạy production build/export, TypeScript, Prettier, token checker và release-surface assertion.

## Public routes

| Route                 | Nội dung                                    |
| --------------------- | ------------------------------------------- |
| `/`                   | Trang chủ, định hướng và lối liên hệ cuối trang |
| `/gioi-thieu`         | Giới thiệu Y Viện                           |
| `/dich-vu`            | Phạm vi dịch vụ                             |
| `/quy-trinh-tri-lieu` | Quy trình trị liệu                          |
| `/tin-tuc`            | Tin tức và bài đọc thêm                     |
| `/lien-he`            | Kênh liên hệ                                |

## Deploy

Push lên `main`. GitHub Actions build rồi deploy lên GitHub Pages —
xem `.github/workflows/deploy.yml`.

## Tài liệu

- `AGENTS.md` — hợp đồng bảo trì, ràng buộc kỹ thuật, quy tắc làm việc.
- `DESIGN.md` — hệ thiết kế đang chạy.
- `app-demo/README.md` — chi tiết kỹ thuật của ứng dụng.
