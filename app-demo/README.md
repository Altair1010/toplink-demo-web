# Y Viện Toplink — Bản demo giao diện

Demo website tương tác cho **Y Viện Toplink** (Y Viện Dưỡng Thân – Tỉnh Thức).
Đây là **bản demo giao diện**: dữ liệu tĩnh (mock), chưa kết nối database/Supabase.

## Tech

- Next.js 16 (App Router, static export ra GitHub Pages) + TypeScript strict
- Tailwind CSS v4 + CSS thuần tách lớp (`styles/tokens · typography · components · utilities · motion · home-experience`)
- GSAP 3 + ScrollTrigger (chỉ inner pages) — native scroll, KHÔNG Lenis/Three.js
- lucide-react icons
- Font: Be Vietnam Pro (body + h3 trở xuống) + Noto Serif (h1/h2/statement)

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

## Cổng chất lượng

```bash
npm run verify   # build → typecheck → format:check → check:tokens
```

CI chạy đúng lệnh này. `check:tokens` bắt thứ `next build` mù: class Tailwind trỏ tới
token không tồn tại (ví dụ `bg-crimson-900`) — Tailwind lặng lẽ không sinh CSS, build
vẫn xanh, giao diện thì sai.

## Đổi bộ nhận diện

Đặt `data-brand` lên thẻ `<html>` — ví dụ `data-brand="tet"`. Một thuộc tính đổi toàn
bộ màu và nhịp motion, kể cả phần CSS viết tay. Skin khai trong `styles/skins.css`
(mặc định `yvien`, kèm sẵn `tet` và `an-tinh`); thử nhanh bằng cách sửa thuộc tính
trong DevTools.

## Bảng màu thương hiệu

Đỏ dược liệu (`crimson`) · Vàng kim (`gold`) · Nâu gỗ (`wood`) · Ngọc trầm (`jade`) · Trắng ngà / be (`ivory`, `cream`, `sand`).
Giá trị chuẩn nằm ở `styles/tokens.css`; bản mô tả cho người và agent nằm ở `DESIGN.md` (root repo).
Tiền tố `clay-*` là alias di cư cũ, đang được rút — không dùng cho code mới.

## Trang đã dựng

- `/` Trang chủ — "Nghi thức chẩn thân": hero, chọn dấu hiệu cơ thể → 4 trạng thái Tắc/Hàn/Hư/Loạn → gợi ý liệu trình, timeline một ngày, không gian, CTA
- `/gioi-thieu` Giới thiệu
- `/dich-vu` + `/dich-vu/[slug]` Dịch vụ & chi tiết (sticky booking card)
- `/quy-trinh-tri-lieu` Quy trình 8 bước
- `/khong-gian` Không gian 4 tầng
- `/dat-lich` Đặt lịch 3 bước (stepper tương tác)
- `/san-pham` Sản phẩm
- `/tin-tuc` + `/tin-tuc/[slug]` Tin tức & bài viết
- `/lien-he` Liên hệ + cơ sở + FAQ
- `/dao-tao` Đào tạo
- `/nhuong-quyen` Nhượng quyền

Một route sandbox dev-only, không link trong nav, noindex ở cả `robots.ts` lẫn metadata
của chính page: `/motion-lab` — bàn thử motion tách khỏi nội dung thật.

## Thành phần tương tác

- Header IA phẳng + menu mobile, mobile bottom bar (Gọi · Zalo · Đặt lịch · Chỉ đường)
- Body Signal Interface: chọn dấu hiệu → suy ra trạng thái → drawer gợi ý liệu trình
- Booking stepper 3 bước có nút "Tôi chưa biết chọn dịch vụ nào"
- FAQ accordion

## Lưu ý nội dung

Dùng ngôn ngữ an toàn sức khỏe ("hỗ trợ", "góp phần"), không cam kết chữa khỏi.
Ảnh đang là placeholder — thay bằng ảnh thật của Y Viện khi có.
`public/images/home/` hiện chỉ có 1 ảnh; homepage sau hero chưa có ảnh nào.
