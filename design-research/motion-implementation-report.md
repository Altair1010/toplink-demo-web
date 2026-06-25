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
