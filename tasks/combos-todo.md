> ARCHIVE — ghi chép lịch sử, KHÔNG phải trạng thái hiện tại. Có thể mô tả phương án đã bị loại bỏ (Lenis, Three.js, marquee, hero cũ). Nguồn sự thật: `app-demo/styles/tokens.css` + `DESIGN.md` + `AGENTS.md`.

# TODO — 11 Combo tài nguyên (shadcn + animation) cho Yvien

Nguồn plan: `C:\Users\MCBAu\.claude\plans\valiant-swimming-cherny.md`
Chế độ: thực thi theo phase ưu tiên · Full breakthrough · 1-engine-GSAP (EFFECTS.md).

## Phase 0 — Foundation
- [x] **T0.1 · C11 dải state màu + registry**
  - [x] Thêm `--primary-hover/active/disabled` (crimson 700/800/200) vào `globals.css` `:root` + `@theme inline`
  - [x] `button` default dùng `hover:bg-primary-hover active:bg-primary-active`
  - [x] Xác nhận `components.json` sẵn sàng `npx shadcn add <url>` (không cần field registries)
  - [x] Verify: `npm run build` xanh (toàn bộ trang prerender OK)

### Checkpoint 0  ✅
- [x] Build xanh, token state áp vào button; chờ review trước Phase 1.

## Phase 1 — Quick wins (low-risk)
- [x] **T1.1 · C7 Feedback** — cài `sonner` (bỏ next-themes, brand ivory/crimson bo sắc); `<Toaster top-center>` vào layout; toast success + error trong `BookingStepper`. (lien-he không có form → bỏ qua)
- [x] **T1.2 · C8 Loader/skeleton** — `Skeleton` brand kem/cát + `ImgFade` (shimmer→fade khi ảnh load, reduced-motion safe); gắn vào `BlogIndex` (list tin tức có filter swap ảnh).
- [x] **T1.3 · C9 Stat counter** — GIỮ GSAP (từ chối number-flow vì WAAPI = engine thứ 3, phạm 1-engine); nâng easing `breathFlow.ease` + settle "thở" khi số chốt.
### Checkpoint 1  ✅ — `npm run build` xanh sau mỗi task

## Phase 2 — Core flows
- [x] **T2.1 · C1 Đặt lịch** — GIỮ input native (chọn: hợp người lớn tuổi); breakthrough: `StepConnector` line vẽ **drawSVG** khi qua bước + con **triện "Y" stamp** (back.out) thay PartyPopper. Toast đã có từ T1.1.
- [x] **T2.2 · C6 Cards** — KHÔNG import origin-ui/commerce-ui (sẽ phá tính nhất quán); tách `ProductCard` dùng chung (chống drift) + **badge triện "Y"** góc ảnh; thêm `type Product`.
- [x] **T2.3 · C4 Testimonials** — REVIEWS chỉ 3 item (không có tập để carousel); thêm effect **Spotlight** (CSS + pointer, animata-inspired) cho 3 thẻ cảm nhận; đăng ký `EFFECTS.md`.
### Checkpoint 2  ✅ — build xanh · grep 0 import framer-motion (chỉ khớp text rule trong EFFECTS.md)

## Phase 3 — Motion/effects (PORT GSAP, high-risk)
- [x] **T3.1 · C3 Marquee** — KHÔNG port GSAP (marquee vốn đã CSS + hover-pause + nút WCAG → port = regression). Thêm **mask fade 2 mép** (CSS). Giữ chữ sans (quyết định cũ).
- [x] **T3.2 · C5 Timeline** — đã có sẵn combo xịn hơn plan: `ScrollProgress` **scaleY scrub** (GPU, nhẹ hơn drawSVG) + node sáng theo progress + breathFlow + reduced-motion. Thêm **quầng gold "ép dấu"** quanh node active (CSS).
- [x] **T3.3 · C2 Hero** — thêm **lớp gradient chiều sâu** (quầng champagne → tối mép dưới, CSS 0-JS) dưới lá & nội dung. KHÔNG split-text vào H1 (bảo vệ LCP).
- [x] **T3.4 · C10 Icons/Tabs** — pill filter active **TRƯỢT** giữa chip (`ServiceFilterGrid`, CSS transition + đo vị trí, reduced-motion tắt). Bỏ phần port icon pqoqubbw (site đã giàu micro-interaction, port Motion→GSAP tốn/rủi ro thấp giá trị).
### Checkpoint 3 — Complete  ✅ — build xanh · grep 0 import framer-motion · EFFECTS.md registry có Spotlight

## Ghi chú
- `lingua-time` (parse tiếng Việt) hoãn sang bản sau — C1 dùng date-picker trước.
- Không đè `tasks/plan.md`/`tasks/todo.md` (đang chứa setup-claude-agent-system).
