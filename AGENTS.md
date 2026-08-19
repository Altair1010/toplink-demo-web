# AGENTS.md — context chung cho mọi agent làm việc trên repo này

Đọc file này trước khi sửa bất cứ thứ gì. Nó là nguồn context duy nhất được git track
và đi theo mọi clone.

## Dự án là gì

Website demo cho **Y Viện Toplink** — cơ sở chăm sóc sức khỏe Đông y dưỡng sinh tại Hà Nội.
Đây là **bản demo giao diện**: dữ liệu tĩnh trong `app-demo/data/content.ts`, chưa có
database, chưa có backend. Deploy tĩnh lên GitHub Pages.

Khách hàng mục tiêu lệch về **trung niên và cao tuổi** — chữ lớn, tương phản cao, khối
nội dung rộng, ít chuyển động. Mọi quyết định thiết kế phải đi qua ràng buộc này.

## Ngôn ngữ

Nội dung site, comment trong code, commit message: **tiếng Việt**. Tên biến/hàm: tiếng Anh.

## Bản đồ repo

```
app-demo/               ← ứng dụng. Gần như mọi việc nằm ở đây.
  app/                  App Router. globals.css chỉ import + base + a11y.
  styles/
    tokens.css          @theme — MỌI token màu/chữ/bo góc/nhịp motion
    skins.css           [data-brand] ghi đè token → hoán đổi thương hiệu
    typography · components · utilities · motion · home-experience
  components/
    home-experience/    các section của trang chủ
    motion/             scene GSAP
    effects/            effect trang trí nhập từ ngoài — đọc EFFECTS.md trước khi thêm
    ui/                 primitive kiểu shadcn (Radix + CVA)
  lib/motion/
    theme.ts            readMotionTheme() — đọc nhịp motion TỪ CSS lúc chạy
    config.ts           ràng buộc engine GSAP (ease, scrub, ngưỡng pin)
    easings.ts          CustomEase riêng của GSAP
    scrollTrigger.ts    đăng ký plugin
  scripts/
    check-tokens.mjs    bắt class Tailwind trỏ tới token không tồn tại
  data/content.ts       toàn bộ nội dung tĩnh
DESIGN.md               ← hệ thiết kế (mô tả cho người + agent)
design-research/        ARCHIVE — ghi chép nghiên cứu cũ, có thể đã lỗi thời
tasks/                  ARCHIVE — todo cũ, có thể đã lỗi thời
```

## Nguồn sự thật

| Câu hỏi | Đọc file nào |
|---|---|
| Màu, chữ, bo góc, nhịp motion là gì? | `app-demo/styles/tokens.css` — **code thắng doc** |
| Đổi cả bộ nhận diện thế nào? | `app-demo/styles/skins.css` |
| Vì sao lại thế, dùng ở đâu, cấm gì? | `DESIGN.md` |
| Thêm effect trang trí thế nào? | `app-demo/components/effects/EFFECTS.md` |
| Chạy/deploy ra sao? | `app-demo/README.md`, `.github/workflows/deploy.yml` |
| Nội dung hiển thị? | `app-demo/data/content.ts` |

Khi `DESIGN.md` và `tokens.css` lệch nhau, **`tokens.css` đúng** — sửa `DESIGN.md`, đừng
sửa code cho khớp doc.

`design-research/` và `tasks/` là lưu trữ lịch sử. Chúng ghi lại các phương án **đã bị
loại bỏ** (Lenis, Three.js, marquee, hero cũ). Đừng khôi phục thứ gì từ đó nếu không
được yêu cầu rõ ràng.

## Hệ skin — đổi thương hiệu bằng một thuộc tính

`<html data-brand="tet">` đổi toàn bộ diện mạo. Cơ chế: `@theme` biên dịch ra
`:root { --color-*: … }` và mọi utility Tailwind lẫn CSS viết tay đều tham chiếu lại
biến đó, nên ghi đè biến trong `:root[data-brand="…"]` là cả hai phía đổi theo — **0
dòng JSX phải sửa**. Thêm skin = thêm một khối trong `styles/skins.css`, không hơn.

Bề mặt skin giữ hẹp có chủ ý: neo màu, nhịp motion, bo góc. Không đổi thang chữ,
container hay đo dòng — đó là quyết định hệ thống, không phải bản sắc từng mùa.
Đánh đổi duy nhất (55 class opacity-modifier trên trình duyệt trước 2023) ghi rõ ở
đầu `skins.css`.

## Ràng buộc cứng

1. **Một engine motion = GSAP.** Không cài `framer-motion`, `motion`, `anime.js`,
   aceternity/magic-ui/react-bits dưới dạng package. Effect Framer phải port sang GSAP
   trước khi nhận vào. Chi tiết ở `EFFECTS.md`.
2. **Native scroll.** Lenis và Three.js đã gỡ hẳn. Không đưa lại. Không tự viết
   `requestAnimationFrame` loop cho scroll — dùng IntersectionObserver (reveal đơn giản)
   hoặc ScrollTrigger (theo tiến độ cuộn).
3. **Không hardcode màu / thời lượng / bo góc.** Luôn dùng token từ `styles/tokens.css`.
   Hardcode nghĩa là skin `[data-brand]` không chạm tới được — giá trị đó sẽ đứng yên
   trong khi cả site đổi màu.
4. **Nhịp motion đọc TỪ CSS, không khai lại trong TS.** Dùng `readMotionTheme()`
   (`lib/motion/theme.ts`) trong effect phía client. `lib/motion/config.ts` chỉ giữ
   ràng buộc engine GSAP (tên ease, scrub, ngưỡng pin). Đơn vị không cố định —
   `760ms` trong nguồn biên dịch thành `.76s`; parser đã xử lý cả hai.
5. **Reduced-motion là bắt buộc.** Mọi thứ động phải về trạng thái tĩnh cuối dưới
   `prefers-reduced-motion: reduce`.
6. **Class CSS viết tay KHÔNG được trùng namespace Tailwind.** Tailwind v4 sinh class
   từ `@theme` (`--shadow-soft` → `.shadow-soft`, `--color-x` → `.bg-x`, `--ease-x` →
   `.ease-x`). Một class viết tay trùng tên sẽ đè bản sinh và phá cấu trúc
   ring/inset/composition của Tailwind. Đặt tên ngoài namespace: `.elev-soft`,
   `.surface-paper`, `.stagger-1..4`, `.frame-gold`, `.seal`.
7. **Static export.** `output: "export"`. `basePath` khai MỘT chỗ duy nhất trong
   `next.config.mjs` và truyền sang client qua `NEXT_PUBLIC_BASE_PATH` — đừng viết lại
   chuỗi đó ở đâu khác. Không server action, không route handler động, không
   `next/image` optimizer. URL trong CSS **không** nhận basePath — ảnh phải qua
   `<Img>` hoặc `lib/asset.ts`.
8. **Không đưa React state vào scroll handler.** Ghi thẳng CSS custom property lên
   element và để CSS nội suy (xem `ConvergeOnScroll.tsx`). setState ở tần số cuộn là
   re-render mỗi khung hình.
9. **Không dùng IN HOA cho tiêu đề tiếng Việt.** Chỉ eyebrow/nav rất ngắn.
10. **Gold không làm chữ nhỏ trên nền sáng** — tương phản ~2.1:1, trượt WCAG.

## Nghiệm thu trước khi báo xong

Repo **không có test suite**. Cổng tự động là một lệnh, CI chạy đúng nó:

```bash
cd app-demo
npm run verify   # build → typecheck → format:check → check:tokens
```

Thứ tự cố ý: `build` phải chạy trước vì nó tái sinh `.next/types/validator.ts` mà `tsc`
đọc — chạy typecheck trước sẽ đỏ oan khi vừa xoá hoặc đổi tên một route.

Cộng kiểm mắt: viewport 375 / 768 / 1280 / 1440 · bật `prefers-reduced-motion: reduce` ·
tab-only toàn trang (không được focus vào phần tử ngoài màn hình) · zoom 200% ·
console sạch. Thử skin: đặt `data-brand="tet"` lên `<html>` bằng DevTools.

Cảnh báo — thứ **`next build` KHÔNG bắt được**:

- Class Tailwind trỏ tới token không tồn tại (`bg-crimson-900` không sinh CSS nào, im
  lặng cho ra nền trong suốt). `npm run check:tokens` bắt ca này.
- Selector CSS bị đổi tên mà quên consumer. Không công cụ nào bắt — phải kiểm mắt.
- `getComputedStyle` gọi sai chỗ chỉ vỡ lúc prerender, nên build xanh là bằng chứng
  hợp lệ cho ràng buộc số 4.

## Quy tắc làm việc

- Sửa tối thiểu. Không "cải thiện" code lân cận, không refactor thứ không hỏng.
- Không thêm abstraction cho chỗ dùng một lần, không thêm tính năng không được yêu cầu.
- Nêu giả định trước khi code. Nếu có nhiều cách hiểu, hỏi — đừng chọn thầm.
- Thấy code chết không liên quan thì báo, đừng tự xóa.
- Không commit/push nếu không được yêu cầu.
- Hai file `plaud-tokens.json` và `purity-tokens.json` ở root: **không đụng**.

## Công cụ nội bộ (chỉ có trên máy dev, không nằm trong repo)

`.trellis/`, `.claude/`, `.agents/`, `.codegraph/`, `.mcp.json` đều bị gitignore. Nếu
clone mới không thấy chúng thì đó là bình thường — mọi thứ cần thiết để làm việc đã nằm
trong file này và các file được liệt kê ở mục "Nguồn sự thật".

<!-- TRELLIS:START -->
# Trellis Instructions

These instructions are for AI assistants working in this project.

This project is managed by Trellis. The working knowledge you need lives under `.trellis/`:

- `.trellis/workflow.md` — development phases, when to create tasks, skill routing
- `.trellis/spec/` — package- and layer-scoped coding guidelines (read before writing code in a given layer)
- `.trellis/workspace/` — per-developer journals and session traces
- `.trellis/tasks/` — active and archived tasks (PRDs, research, jsonl context)

If a Trellis command is available on your platform (e.g. `/trellis:finish-work`, `/trellis:continue`), prefer it over manual steps. Not every platform exposes every command.

If you're using Codex or another agent-capable tool, additional project-scoped helpers may live in:
- `.agents/skills/` — reusable Trellis skills
- `.codex/agents/` — optional custom subagents

Managed by Trellis. Edits outside this block are preserved; edits inside may be overwritten by a future `trellis update`.

<!-- TRELLIS:END -->

> Khối Trellis ở trên **chỉ áp dụng cho bản checkout có sẵn `.trellis/`**. Thư mục đó bị
> gitignore, nên với clone mới nó không tồn tại — bỏ qua khối này.
