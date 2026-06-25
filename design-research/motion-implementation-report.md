# Motion Implementation Report

Áp dụng hệ Motion UI (cảm hứng cơ chế Dropbox Brand) vào trang chủ Y Viện Toplink.
Engine: GSAP + ScrollTrigger + Lenis. Đặc tả: `toplink-motion-system.md`.

## File đã tạo
- `app-demo/lib/motion/config.ts` · `easings.ts` · `scrollTrigger.ts`
- `app-demo/hooks/useReducedMotion.ts`
- `app-demo/components/motion/SmoothScrollProvider.tsx`
- `app-demo/components/motion/ScrollConvergeScene.tsx` + `ConvergeBlock.tsx`
- `app-demo/components/motion/StickyRevealScene.tsx` + `MotionImageCard.tsx`
- `app-demo/styles/motion.css`

## File đã sửa
- `app-demo/package.json` — thêm `gsap`, `@gsap/react`, `lenis`.
- `app-demo/app/globals.css` — `@import "../styles/motion.css"`.
- `app-demo/app/layout.tsx` — bọc `<main>` bằng `<SmoothScrollProvider>`.
- `app-demo/app/page.tsx`:
  - *Về Y Viện* → `<ScrollConvergeScene>` + `<ConvergeBlock>` (bỏ `ConvergeItem`).
  - *Không gian Y Viện* → `<StickyRevealScene>` + `<MotionImageCard>` (thay grid `Reveal`).
- Giữ nguyên `components/ConvergeOnScroll.tsx` (không còn dùng ở homepage nhưng để lại).

## Kết quả verify (Playwright MCP, dev server)
- **Build static export**: PASS (`npm run build`, 30 trang).
- **Console**: 0 lỗi · 0 cảnh báo (mọi viewport).
- **Về Y Viện (desktop 1440/1280)**: đầu scene block mờ (~0.51) & lệch −120px; giữa
  scene hội tụ dần có **stagger** (opacity 0.99 → 0.96 → 0.84 theo index); stage **được pin**
  (top ≈ −41 khi cuộn). ✔ trượt + hội tụ về giữa.
- **Không gian (desktop)**: 4 card khởi đầu autoAlpha 0 (không flash) → reveal về opacity 1;
  ảnh parallax chạy (scale 1.1, translateY ~−13px). ✔
- **Mobile 375 (reload)**: scene cao tự nhiên (min-height auto, **không khoảng trống**);
  block opacity 1; không pin. ✔
- **Zalo**: nút desktop `fixed z-50` không bị che; ẩn ở mobile (đã có MobileBottomBar). ✔
- **Reduced-motion**: dùng chung nhánh `!canPin` (đã verify qua mobile) + CSS ép tĩnh +
  Lenis không khởi tạo. ✔

## Checklist nghiệm thu
- [x] Dembrandt Dropbox (tái dùng token) → audit `dropbox-opening-motion-audit.md`
- [x] Motion system reusable (config + hooks + components/motion)
- [x] *Về Y Viện*: khối trượt hội tụ về giữa (sticky converge scene)
- [x] *Không gian*: 4 tầng scroll-driven cards (reveal + parallax)
- [x] Mượt desktop · mobile không pin/không lag · `prefers-reduced-motion` · fallback no-JS
- [x] Không copy code/layout/text/asset/màu Dropbox; giữ identity Toplink
- [x] Không lỗi console · Build pass · CTA/Zalo không bị che

## Ghi chú khi launch
- Thay ảnh Unsplash trong `ABOUT_BLOCKS`/`SPACES` (`data/content.ts`) bằng **ảnh người thật**
  của Y Viện (TODO đã đánh dấu trong `page.tsx`).
- Tinh chỉnh cảm giác bằng `lib/motion/config.ts` (scrub/stagger/convergeDistance…), không sửa component.

---

# PHASE 2 — Converging Ritual Motion System (deep crawl upgrade)

### Pattern học từ Dropbox (deep crawl `--slow`)
- Durations ≈ `0.001s` ×396 ⇒ motion chạy bằng **scroll-progress + Lottie/JS**, không CSS-transition.
- **Bộ easing ease-out** lặp nhiều: `(0.4,0,0.2,1)` ×106, button `(0.5,0,0.2,1)`, `(0.2,0,0.3,1)`.
- Motion theo context (nav/button/media/link), keyframe `drawIn`, bo góc khía, shadow mềm nông.
- Chi tiết: `dropbox-opening-motion-audit.md §9`.

### Cách đã chuyển hóa sang Y Viện
- Kéo nhịp ease-out **chậm & mềm hơn** (chất trị liệu), đăng ký bằng **GSAP CustomEase**
  (miễn phí 3.11+) để dùng THẬT trong scroll — không còn `power3.out` chung chung:
  - `convergeRitual` `cubic-bezier(0.32,0,0.16,1)` → khối *Về Y Viện*.
  - `floorRitual` `cubic-bezier(0.22,0,0.18,1)` → deck *Không gian*.
- KHÔNG mượn keyframe `drawIn`, motif bo góc, màu/font/asset/text Dropbox.

### Component đã tạo / sửa (Phase 2)
- **Sửa** `lib/motion/easings.ts`: thêm `registerEases()` (CustomEase, idempotent, client-only)
  + curve `convergeRitual`/`floorRitual` + doc nhịp Dropbox.
- **Sửa** `lib/motion/config.ts`: `motionConfig.ease='convergeRitual'`, `breathFlow.stack.ease='floorRitual'`.
- **Sửa** `components/motion/ConvergeBlock.tsx` + `components/YVienSpaceExperience.tsx`:
  gọi `registerEases()` trước `parseEase`; deck đọc `breathFlow.stack.ease`.
- **Tạo** `app/motion-lab/page.tsx`: route `/motion-lab` (noindex) cô lập converge + floors.

### Motion config đã dùng
`scrub 0.8` · converge ease `convergeRitual` · deck ease `floorRitual` · `convergeDistance 160` ·
`stagger 0.12` · `revealWindow 0.55` · `sceneHeightVh 220` · deck `perFloorVh 70` · `PIN_MIN_WIDTH 1024`.

### Cách test (đã verify)
- **Desktop 1440**: scene pin (1980px), 4 khối hội tụ có stagger (opacity 1→0.885, translateY biến thiên),
  console 0 warning ⇒ CustomEase resolve thật.
- **Mobile 375**: scene 616px (no-pin), blocks opacity 1, panel `position:static`.
- **Reduced-motion**: chung nhánh `!canPin` + CSS `!important` ép tĩnh + Lenis không init.
- **Build**: static export PASS (31 trang gồm `/motion-lab`), TypeScript PASS. Chi tiết: `motion-qa-checklist.md`.

### TODO tiếp theo
- Thay ảnh thật Y Viện (`ABOUT_BLOCKS`/`SPACES`).
- Cảm quan thủ công: bật OS reduced-motion + cuộn thật trên thiết bị để duyệt "chất chậm/mềm".
- (Tùy chọn) Cân nhắc tách `floor indicator` thành `ScrollProgressRail` nếu cần tái dùng ở section khác.
