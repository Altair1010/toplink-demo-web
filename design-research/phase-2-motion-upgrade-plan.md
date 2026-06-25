# Phase 2 — Motion Upgrade Plan ("Converging Ritual Motion System")

> Nền: deep crawl `dembrandt --slow` brand.dropbox.com (xem `dropbox-opening-motion-audit.md §9`).
> Mục tiêu: nâng hệ motion sẵn có thành bản **cao cấp, reusable, production-ready**,
> dùng THẬT bộ easing học được — không copy màu/asset/text/layout Dropbox.

## 1. Hiện trạng codebase (audit)
Hạ tầng Phase 1 + "Breath & Flow" đã có và đạt phần lớn spec:
- Engine tập trung: `lib/motion/config.ts` · `easings.ts` · `scrollTrigger.ts` (register guard SSR).
- Hook: `hooks/useReducedMotion.ts`.
- Components/motion reusable: `SmoothScrollProvider` · `ScrollConvergeScene` + `ConvergeBlock`
  · `MotionReveal` · `ScrollProgress`.
- Section thật: *Về Y Viện* (`ScrollConvergeScene`+`ConvergeBlock` trong `page.tsx`),
  *Không gian* (`YVienSpaceExperience` — deck 4 tầng), *Quy trình* (`HealingProcessMotion`).
- Base CSS no-JS/SSR + reduced-motion guard: `styles/motion.css`. Tokens: `globals.css @theme`.

## 2. Hệ motion hiện tại yếu ở đâu (trước Phase 2)
- **Easing chung chung**: converge dùng `power3.out`, deck dùng `power4.out` — chưa khai
  thác *nhịp ease-out thật* của Dropbox (dữ liệu chỉ có sau deep crawl).
- **Thiếu Motion Lab**: `/preview-motion` là trang hero/dược liệu, KHÔNG cô lập test
  `ScrollConvergeScene`/`ConvergeBlock`/`YVienSpaceExperience` + reduced-motion/mobile.
- **Research chưa đủ**: chưa có `phase-2-motion-upgrade-plan.md`, `motion-qa-checklist.md`;
  audit chưa có dữ liệu `motion{}` (durations/easings/contexts/keyframes) từ deep crawl.

## 3. Section cần refactor / component cần tạo
| Hạng mục | Quyết định |
|---|---|
| *Về Y Viện* | GIỮ cấu trúc (đã đạt cinematic converge); chỉ **đổi ease → `convergeRitual`**. |
| *Không gian* | GIỮ deck; **đổi ease deck → `floorRitual`** (config-driven). |
| Motion Lab | **TẠO MỚI** `/app/motion-lab` — cô lập converge + floors, test fallback. |
| Easings | **NÂNG CẤP** `easings.ts`: đăng ký CustomEase từ nhịp Dropbox. |

> Không tạo mới `StickyMotionStage`/`MotionImageCard`/`ScrollProgressRail` rời: chức năng
> đã nằm trong `ScrollConvergeScene` (stage) + `YVienSpaceExperience` (floor indicator nội bộ)
> + `ScrollProgress`. Thêm component trùng vai = vi phạm "simplicity first".

## 4. Animation: GSAP vs CSS
- **GSAP (scrub/scroll-driven)**: converge blocks (`quickSetter` x/y/scale/opacity),
  deck 4 tầng (y/scale/opacity/z), reveal `MotionReveal`, progress `ScrollProgress`.
  → cần scroll progress điều khiển ⇒ bắt buộc GSAP + ScrollTrigger.
- **CSS thuần**: hover lift/zoom, marquee, ken-burns, fade-up hero, base-state no-JS,
  reduced-motion override. → không phụ thuộc scroll ⇒ CSS rẻ hơn, để CSS lo.

## 5. Fallback mobile / reduced-motion (giữ nguyên nguyên tắc đã verify)
- Base CSS = hiển thị đầy đủ (`opacity:1`, no transform) → no-JS/SSR an toàn, 0 layout shift.
- `< 1024px` hoặc `prefers-reduced-motion`: JS đi nhánh `!canPin` → KHÔNG pin/scrub;
  converge phát `progress=1` (tĩnh), deck để panel `position:static` stack dọc + reveal nhẹ.
- `@media (prefers-reduced-motion: reduce)`: ép `transform:none;opacity:1 !important`; Lenis không init.
- Scene cao (`220vh`/`N*70vh`) **chỉ** bật ở `(min-width:1024px) and (no-preference)`.

## 6. Kế hoạch theo commit logic
1. **easings**: `registerEases()` + CustomEase `convergeRitual`/`floorRitual` (học Dropbox), doc.
2. **wire config**: `motionConfig.ease='convergeRitual'`, `breathFlow.stack.ease='floorRitual'`;
   gọi `registerEases()` trong `ConvergeBlock` + `YVienSpaceExperience` trước `parseEase`.
3. **motion-lab**: route `/motion-lab` (noindex) cô lập 2 hệ + hướng dẫn test fallback.
4. **research**: audit §9 (deep data) · plan (file này) · implementation-report · qa-checklist.
5. **verify**: build static export + Playwright (desktop converge stagger, mobile no-pin, console 0).

## 7. Nghiệm thu (tóm tắt — chi tiết ở `motion-qa-checklist.md`)
Cinematic converge ✓ · hội tụ theo scroll progress ✓ · sticky desktop ✓ · mobile no-pin ✓ ·
deck spatial 4 tầng ✓ · config tập trung ✓ · reusable, không hard-code rời ✓ · reduced-motion ✓ ·
không che Zalo ✓ · console 0 lỗi ✓ · build pass ✓.
