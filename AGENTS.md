# AGENTS.md — hợp đồng bảo trì cho mọi agent làm việc trên repo này

> **V1 authority notice (Phase P0):** Với mọi công việc thuộc Y Viện Toplink Commercial
> Headless Redesign V1, hãy đọc `docs/toplink-v1/START-HERE.md`,
> `docs/toplink-v1/DECISIONS.md`, `docs/toplink-v1/SOURCE-OF-TRUTH.md` và
> `docs/toplink-v1/WORKSTATE.md` trước khi thay đổi code. Các quy tắc H7 bên dưới
> chỉ mô tả baseline runtime lịch sử và không còn là thẩm quyền cho thiết kế mục tiêu.

## Ranh giới thẩm quyền V1

- Master package được theo dõi tại `docs/toplink-v1/` là hợp đồng điều hành cho V1.
- H7 chỉ là nguồn salvage kỹ thuật. H7 không định nghĩa visual hierarchy, page morphology,
  section order, color palette, typography, motion language, copy, navigation architecture,
  information architecture hoặc conversion model của V1.
- `app-demo/` tiếp tục là baseline kỹ thuật trong P0. Đề xuất đổi tên thành `web/` không cho
  phép di chuyển file trong P0.
- Không bắt đầu phase tiếp theo nếu `WORKSTATE.md` chưa ghi đúng một exact next action và
  human gate chưa được thông qua.
- Không merge `main`, deploy, đổi DNS/repo visibility, tạo archive tag hoặc triển khai
  WordPress nếu chưa có chấp thuận riêng cho hành động đó.

Đọc file này trước khi sửa bất cứ thứ gì. Đây là file context duy nhất được git track và đi
theo mọi clone. Nó mô tả trạng thái **đang chạy**, không phải lịch sử thiết kế.

## Dự án

Website tĩnh công khai của **Y Viện Toplink** — cơ sở chăm sóc sức khỏe Đông y dưỡng sinh tại
Hà Nội. Bản demo giao diện: nội dung tĩnh, không database, không backend.

Khách hàng mục tiêu lệch về trung niên và cao tuổi — chữ lớn, tương phản cao, khối nội dung
rộng, ít chuyển động. Mọi quyết định thiết kế đi qua ràng buộc này.

## Vai trò sản phẩm

```
ĐỌC → HIỂU → KHÁM PHÁ → (tùy chọn) LIÊN HỆ CON NGƯỜI
```

Website không đặt lịch, không nhận yêu cầu, không chọn dịch vụ hộ người dùng, không quản lý
trạng thái đơn và không xác nhận kết quả.

- **KHÔNG BOOKING.**
- **KHÔNG BACKEND.**
- **KHÔNG FORM TRANSPORT** — không gửi dữ liệu đi đâu cả.

## Runtime

Next.js App Router · React · TypeScript · static export · GitHub Pages.

## Public routes

`/` · `/gioi-thieu` · `/dich-vu` · `/quy-trinh-tri-lieu` · `/tin-tuc` · `/lien-he`

Sáu route này là toàn bộ bề mặt công khai. `scripts/check-release-surface.mjs` khóa allowlist
đó và sẽ đỏ nếu xuất hiện route lạ.

## Liên hệ

Hai loại kênh đã được duyệt: **Zalo** và **Facebook Page**.

URL chính xác **chưa có**. Không đoán. Cấm tuyệt đối:

- href đoán mò;
- `href="#"` giả làm nút hoạt động;
- tài khoản/trang giả;
- URL kết quả tìm kiếm thay cho kênh chính thức;
- trạng thái gửi/nhận thành công giả;
- lời hứa thời gian phản hồi tự bịa.

Trạng thái hiện tại — nêu tên kênh, nói thẳng là chưa có đường dẫn — là trạng thái đúng.
`PENDING != FAKE`.

Khi có URL chính thức, quy trình vá là:

```
nhận URL → xác minh danh tính kênh với nguồn vận hành → thêm link thật
→ npm run verify → commit → push main → GitHub Pages deploy → bấm thử link
```

Bước xác minh danh tính là bắt buộc, không phải thủ tục. Đây là thay đổi nội dung
thông thường; không cần mở lại quy trình thiết kế nào.

## Evidence

Không được bịa: nhân sự, cơ sở vật chất, đánh giá khách hàng, bằng cấp, tuyên bố sức khỏe,
giá, thời lượng, mức độ phù hợp, kết quả điều trị, chi tiết quy trình.

Evidence sản xuất hiện bằng 0 và giao diện tự collapse khi không có dữ liệu. Dữ liệu người/
nơi chốn/quy trình/dịch vụ đã duyệt (M3P) **chờ admin cung cấp**.

## Nguồn sự thật

| Câu hỏi                              | Đọc file nào                                             |
| ------------------------------------ | -------------------------------------------------------- |
| Màu, chữ, bo góc, nhịp motion?       | `app-demo/styles/tokens.css` — **code thắng doc**        |
| Đổi cả bộ nhận diện?                 | `app-demo/styles/skins.css`                              |
| Vì sao lại thế, dùng ở đâu, cấm gì?  | `DESIGN.md`                                              |
| Nội dung hiển thị?                   | `app-demo/app/**/page.tsx` + `app-demo/components/`      |
| Đường dẫn deploy?                    | `app-demo/next.config.mjs`                               |
| Chạy/deploy ra sao?                  | `app-demo/README.md`, `.github/workflows/deploy.yml`     |

Nội dung công khai nằm **trực tiếp trong page/component**, không có file dữ liệu tập trung.
Khi `DESIGN.md` và `tokens.css` lệch nhau, `tokens.css` đúng — sửa doc, đừng sửa code.

## Ràng buộc kỹ thuật

1. **Static export.** `output: "export"`. Không server action, không route handler động, không
   `next/image` optimizer.
2. **basePath khai một chỗ duy nhất** trong `next.config.mjs`, truyền sang client qua
   `NEXT_PUBLIC_BASE_PATH`. Đừng viết lại chuỗi đó ở đâu khác. URL trong CSS **không** nhận
   basePath — ảnh phải đi qua `components/Img.tsx` hoặc `lib/asset.ts`.
3. **Accessibility là cổng phát hành.** Một `h1` mỗi trang, thứ tự heading hợp lý, skip link tới
   `#main`, focus nhìn thấy được, `aria-expanded`/`aria-controls` cho menu mobile, target chạm
   ≥ 44px, không tràn ngang ở 375/768/1280/1440 và ở zoom 200%.
4. **Reduced motion là bắt buộc.** `prefers-reduced-motion: reduce` phải về trạng thái tĩnh
   cuối, 0 animation đang chạy.
5. **Native scroll.** Không Lenis, không Three.js, không tự viết `requestAnimationFrame` loop
   cho scroll.
6. **Một engine motion = GSAP, và hiện chưa cài.** Motion công khai chỉ là opacity/transform
   bằng CSS nên repo không giữ package motion nào. Nếu sau này cần motion nâng cao, GSAP là
   engine duy nhất được phép cài thêm. Không cài `framer-motion`, `motion`, `anime.js` hay
   package effect dựng sẵn.
7. **Không hardcode màu / thời lượng / bo góc.** Luôn dùng token từ `styles/tokens.css`, nếu
   không skin `[data-brand]` sẽ không chạm tới được.
8. **Class CSS viết tay không được trùng namespace Tailwind.** Tailwind v4 sinh class từ
   `@theme` (`--color-x` → `.bg-x`). Đặt tên ngoài namespace: `.elev-soft`, `.surface-paper`.
9. **Không IN HOA cho tiêu đề tiếng Việt.** Chỉ eyebrow/nav rất ngắn.
10. **Gold không làm chữ nhỏ trên nền sáng** — tương phản ~2.1:1, trượt WCAG.

## Nghiệm thu

Repo không có test runner tập trung; cổng tự động là một lệnh:

```bash
cd app-demo
npm run verify
```

Chuỗi: `build → typecheck → format:check → check:tokens → check:release`. Thứ tự cố ý —
`build` phải chạy trước vì nó tái sinh `.next/types/validator.ts` mà `tsc` đọc.

Hai bộ test trạng thái thuần chạy riêng:

```bash
node --test components/home-experience/corrected/orientation-state.test.mjs
node --test components/home-experience/corrected/evidence-visibility.test.mjs
```

Cộng kiểm mắt: 375 / 768 / 1280 / 1440 · `prefers-reduced-motion: reduce` · tab-only toàn
trang · zoom 200% · console sạch. Thử skin: đặt `data-brand="tet"` lên `<html>`.

`next build` **không** bắt được: class Tailwind trỏ tới token không tồn tại (đó là việc của
`check:tokens`) và selector CSS bị đổi tên mà quên consumer (phải kiểm mắt).

## Deploy

Push `main` → GitHub Actions (`.github/workflows/deploy.yml`) → GitHub Pages.

Demo công khai: https://altair1010.github.io/toplink-demo-web/

Không deploy sang hosting khác, không đổi DNS, không cấu hình custom domain nếu không được
yêu cầu rõ ràng.

## Quy tắc làm việc

- Sửa tối thiểu. Không "cải thiện" code lân cận, không refactor thứ không hỏng.
- Không thêm abstraction cho chỗ dùng một lần, không thêm tính năng không được yêu cầu.
- Nêu giả định trước khi code. Nhiều cách hiểu thì hỏi, đừng chọn thầm.
- Thấy code chết không liên quan thì báo, đừng tự xóa.
- Không commit/push nếu không được yêu cầu.
- Nội dung site, comment trong code, commit message: tiếng Việt. Tên biến/hàm: tiếng Anh.

## Công cụ nội bộ

`.trellis/`, `.claude/`, `.agents/`, `.codegraph/`, `.mcp.json` bị gitignore và chỉ tồn tại
trên máy dev. Clone mới không thấy chúng là bình thường — mọi thứ cần thiết đã nằm trong file
này, `DESIGN.md` và `app-demo/`.
