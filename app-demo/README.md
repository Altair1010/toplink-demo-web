# Y Viện Toplink — Demo tĩnh

Website Humanizer theo mô hình **đọc → hiểu → khám phá → cân nhắc trao đổi với con người**.
Ứng dụng dùng Next.js App Router với static export cho GitHub Pages.

## Chạy cục bộ

```bash
npm install
npm run dev
```

Mở `http://localhost:3000/toplink-demo-web`.

## Kiểm tra phát hành

```bash
npm run verify
```

Lệnh này chạy production build/export, TypeScript, Prettier, token checker và release-surface
assertion. Release assertion khóa allowlist, một `h1` trên mỗi trang, không booking, không
motion-lab công khai và không liên kết nội bộ chết.

## Public routes

- `/`
- `/gioi-thieu`
- `/dich-vu`
- `/quy-trinh-tri-lieu`
- `/tin-tuc`
- `/lien-he`

`/dat-lich` đã được gỡ khỏi sản phẩm. Nội dung chưa đủ nguồn nằm ngoài App Router tại
`deferred-content/`; motion specimens của maintainer nằm tại `dev-evidence/`.

## Runtime contract

- Be Vietnam Pro là font sans-first vận hành, không phải font thương hiệu chính thức.
- Ba skin `yvien`, `tet`, `an-tinh` tiếp tục dùng chung semantic runtime.
- Homepage chỉ có một handoff cuối trang cho hai loại kênh Zalo và Facebook Page.
- Chưa có URL kênh được duyệt nên giao diện không tạo link giả.
- Evidence sản xuất bằng 0 và tự collapse; M3P chờ admin cung cấp dữ liệu đã duyệt.
- Website không có booking, form đặt lịch, transport, trạng thái gửi hay xác nhận.
