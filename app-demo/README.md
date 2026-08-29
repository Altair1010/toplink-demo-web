# app-demo — ứng dụng Next.js

Static export cho GitHub Pages. Ngữ cảnh sản phẩm và quy tắc làm việc nằm ở `../AGENTS.md`;
hệ thiết kế nằm ở `../DESIGN.md`.

## Chạy cục bộ

```bash
npm ci
npm run dev
```

Mở `http://localhost:3000/toplink-demo-web` — `basePath` áp dụng cả khi chạy dev.

## Static export và basePath

`next.config.mjs` là nguồn sự thật duy nhất cho đường dẫn deploy:

- `output: "export"` — sinh HTML tĩnh vào `out/`, không cần Node lúc chạy;
- `basePath: "/toplink-demo-web"` — GitHub Pages phục vụ repo dưới `/<repo-name>/`;
- `trailingSlash: true` — mỗi route thành `<route>/index.html`;
- `images.unoptimized: true` — không có optimizer trên host tĩnh;
- `env.NEXT_PUBLIC_BASE_PATH` — truyền `basePath` sang client cho `lib/asset.ts`.

`next/image` và `next/link` tự thêm `basePath`. `<img>` thuần và `background-image` thì không:
dùng `components/Img.tsx` hoặc `lib/asset.ts`. Đừng viết lại chuỗi basePath ở nơi khác.

## Public routes

- `/`
- `/gioi-thieu`
- `/dich-vu`
- `/quy-trinh-tri-lieu`
- `/tin-tuc`
- `/lien-he`

Ngoài ra bản export sinh `404.html`, `icon.svg`, `opengraph-image`, `robots.txt` và
`sitemap.xml`. `/dat-lich` đã được gỡ khỏi sản phẩm.

## Cấu trúc

```
app/                    App Router. globals.css chỉ import + base + a11y.
components/
  home-experience/      các section của trang chủ
    corrected/          lõi định hướng + hai bộ test trạng thái thuần
  notice/               vùng thông báo a11y
styles/
  tokens.css            @theme — MỌI token màu/chữ/bo góc/nhịp motion
  skins.css             [data-brand] ghi đè token → hoán đổi thương hiệu
  typography · components · utilities · motion · information · interface
  home-experience · home-humanizer
lib/asset.ts            prefix basePath cho asset tĩnh
scripts/
  check-tokens.mjs      bắt class Tailwind trỏ tới token không tồn tại
  check-release-surface.mjs  khóa allowlist route, h1, booking, link chết
```

## Kiểm tra phát hành

```bash
npm run verify
```

Chạy `build → typecheck → format:check → check:tokens → check:release`. `build` phải đi trước
vì nó tái sinh `.next/types/validator.ts` mà `tsc` đọc.

`check:release` khẳng định: đúng sáu route công khai, một `h1` mỗi trang, 0 dấu vết booking,
0 route bị cấm, 0 liên kết nội bộ chết.

Hai bộ test trạng thái thuần:

```bash
node --test components/home-experience/corrected/orientation-state.test.mjs
node --test components/home-experience/corrected/evidence-visibility.test.mjs
```

Kiểm mắt trình duyệt sau khi deploy chạy bằng `@playwright/cli` — devDependency QA duy nhất,
không có source nào import. Giữ lại vì đây là công cụ soi bản demo công khai thật.

## Runtime contract

- Be Vietnam Pro là font sans-first vận hành, không phải font thương hiệu chính thức.
- Ba skin `yvien`, `tet`, `an-tinh` dùng chung semantic runtime.
- Trang chủ chỉ có một lối liên hệ ở cuối trang, cho hai loại kênh Zalo và Facebook Page.
- Chưa có URL kênh nào được duyệt nên giao diện không tạo link giả.
- Evidence sản xuất bằng 0 và tự collapse; dữ liệu đã duyệt chờ admin cung cấp.
- Không booking, không form đặt lịch, không transport, không trạng thái gửi hay xác nhận.

## Deploy

Push `main` → `.github/workflows/deploy.yml` → GitHub Pages.
