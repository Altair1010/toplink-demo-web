# Implementation Report — Breath & Flow + 2 section (cảm hứng MyWebLab)

> Ngày: 2026-06-25 · Nhánh: `feat/dropbox-motion-system` · App: `app-demo/` (Next.js 16, static export).

## Pattern học từ MyWebLab (myweblab.it)
- **Easing chủ đạo `cubic-bezier(0.16, 1, 0.3, 1)`** (expo-out) → áp cho `--ease-ritual`.
- **Scroll-driven**, chỉ animate `transform/opacity/flex/color` (không layout-thrash).
- **"SvgStrokeProcess"** (Il Metodo): một mạch dẫn tự vẽ theo scroll, bước xen kẽ trái/phải,
  reveal khi mạch chạm tới → nguyên lý cho **Quy trình trị liệu**.
- **"ExpandingCards"** (DNA Digitale): một panel active nổi bật, panel khác lùi/co + đổi viền
  → nguyên lý cho **Không gian Y Viện** (dựng lại thành sticky deck dọc).
- Kỷ luật token: nền trung tính + 1 brand color + 1 accent; flat + đường kẻ 1px; spacing 8px.
- **KHÔNG** sao chép mã/asset/màu/font/text — chỉ rút nguyên lý.

## Đã chuyển hóa thành gì cho Y Viện
- **Quy trình trị liệu** (4 bước: Tiếp nhận · Tư vấn · Trị liệu · Theo dõi): ritual journey với
  mạch dẫn dọc tự vẽ, bước active sáng theo scroll + hover, zig-zag desktop, vertical stepper mobile.
- **Không gian Y Viện** (4 tầng): sticky-pin "spatial journey" — tầng active vào center (scale 1 +
  shadow + ảnh), tầng trước/sau lùi + mờ tạo chiều sâu; mobile stack reveal.

## File/component đã sửa & thêm
**Thêm:**
- `components/motion/MotionReveal.tsx` — reveal mềm GSAP (Breath & Flow).
- `components/motion/ScrollProgress.tsx` — mạch dẫn tự vẽ trong section.
- `components/HealingProcessMotion.tsx` — Quy trình 4 bước.
- `components/YVienSpaceExperience.tsx` — Không gian 4 tầng (sticky deck).

**Sửa:**
- `app/globals.css` — thêm block tokens Breath & Flow trong `@theme`.
- `styles/motion.css` — base-state `[data-breath-reveal]/[data-floor-panel]`, `.floor-scene`, nhánh reduced-motion.
- `lib/motion/config.ts` — thêm `breathFlow` (+ type).
- `lib/motion/easings.ts` — thêm `ritual` (gsap + css).
- `app/page.tsx` — section 3 → `<YVienSpaceExperience>`, section 4 → `<HealingProcessMotion>`, gỡ import thừa.
- `data/content.ts` — cập nhật text 4 tầng `SPACES` (theo brief mục 5). `PROCESS_STEPS` giữ nguyên (đã khớp mục 4).

**Xóa (orphan, chỉ dùng ở homepage):**
- `components/ProcessStepper.tsx`, `components/motion/StickyRevealScene.tsx`, `components/motion/MotionImageCard.tsx`.

**Giữ nguyên (đã thỏa yêu cầu):** `FloatingZalo.tsx` ≡ "FloatingZaloCTA" (đang dùng trong `layout.tsx`);
`Reveal.tsx` (IntersectionObserver, dùng khắp các trang khác).

## Motion đã thêm
- Reveal ritual (translate 32px + fade, easing expo-out, stagger).
- Sticky-pin deck 4 tầng (nội suy y/scale/opacity/z theo progress).
- Active-step theo tiến độ section (map `progress → index`, bền mọi tốc độ cuộn).
- Progress line scrub (scaleY 0→1) trong section quy trình.
- Toàn bộ qua Lenis + ScrollTrigger; cleanup khi unmount.

## Token mới
`--motion-fast/medium/slow` (180/420/760ms) · `--ease-soft` · `--ease-ritual`
(`cubic-bezier(0.16,1,0.3,1)`) · `--reveal-distance` (32px) · `--section-parallax-depth` (80px).
Bản GSAP: `breathFlow` trong `lib/motion/config.ts`.

## Cách test responsive (đã chạy)
- `npm run build` → PASS (TypeScript + 30 static pages, không lỗi import orphan).
- `npm run dev` → mở `http://localhost:3000/toplink-demo-web/` (lưu ý `basePath`).
- Playwright 1440px: deck đổi tầng theo scroll (tầng 4 active khi cuộn sâu, tầng khác lùi/mờ);
  progress line fill 0→1; active step chạy đủ tới "Theo dõi". Console 0 error.
- Playwright 375px: `.floor-scene` min-height auto (không pin), panel static stack dọc, reveal đủ opacity 1.
- Reduced-motion: guard `matchMedia` (JS return sớm) + `@media (prefers-reduced-motion: reduce)`
  trong `motion.css` ép `transform:none; opacity:1`.

## TODO thay ảnh thật
- **4 tầng**: `data/content.ts` → `SPACES[].image` (đang trỏ `/images/spaces/tang-*.jpg`).
  Thay file ảnh thật từng tầng vào `public/images/spaces/` cùng tên là xong.
- **Hero / Về Y Viện**: `HERO_IMAGE`, `ABOUT_BLOCKS[].image` (đang là Unsplash placeholder).
- Quy trình trị liệu hiện dùng icon (lucide), không cần ảnh; nếu muốn ảnh minh họa từng bước có thể
  thêm field `image` vào `PROCESS_STEPS` và render trong `HealingProcessMotion`.
- Ảnh dùng component `Img` (next/image `unoptimized` do static export) — giữ tỉ lệ khung hiện có để
  không vỡ layout.
