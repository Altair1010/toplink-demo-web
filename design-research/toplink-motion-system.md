# Toplink Motion System — đặc tả

Hệ Motion UI reusable, config-driven cho Y Viện Toplink (Next.js 16 + React 19 +
Tailwind v4, **static export**). Engine: **GSAP + ScrollTrigger + Lenis** (`@gsap/react`).
Cảm hứng cơ chế: opening brand.dropbox.com (xem `dropbox-opening-motion-audit.md`).

## Cấu trúc file
```
lib/motion/config.ts            # motionConfig + breakpoints (NGUỒN cấu hình DUY NHẤT)
lib/motion/easings.ts           # gsapEasings / cssEasings + registerEases() (CustomEase học Dropbox)
app/motion-lab/page.tsx         # [Phase 2] route /motion-lab (noindex) — bàn thử cô lập converge + floors
lib/motion/scrollTrigger.ts     # registerMotion() — đăng ký plugin 1 lần, guard SSR
hooks/useReducedMotion.ts       # boolean reactive, SSR-safe
components/motion/SmoothScrollProvider.tsx   # Lenis ↔ gsap.ticker ↔ ScrollTrigger
components/motion/ScrollConvergeScene.tsx    # sticky stage + context phát progress (section "Về Y Viện")
components/motion/ConvergeBlock.tsx          # khối trượt → hội tụ về giữa
components/motion/MotionReveal.tsx           # [Breath & Flow] reveal mềm GSAP
components/motion/ScrollProgress.tsx         # [Breath & Flow] mạch dẫn tự vẽ trong section
components/HealingProcessMotion.tsx          # [Breath & Flow] Quy trình trị liệu 4 bước
components/YVienSpaceExperience.tsx          # [Breath & Flow] Không gian 4 tầng (sticky deck)
styles/motion.css               # base/no-JS + Lenis + reduced-motion (import vào globals.css)
```
> Lưu ý: `StickyRevealScene.tsx` + `MotionImageCard.tsx` (bản 4 tầng cũ) ĐÃ thay bằng
> `YVienSpaceExperience`; `ProcessStepper.tsx` đã thay bằng `HealingProcessMotion`.

## Easing (Phase 2 — CustomEase học từ deep crawl Dropbox)
`registerEases()` (idempotent, client-only) đăng ký GSAP CustomEase từ *nhịp ease-out* của
Dropbox, kéo chậm/mềm cho chất trị liệu (xem `dropbox-opening-motion-audit.md §9`):
`convergeRitual` = `cubic-bezier(0.32,0,0.16,1)` (khối *Về Y Viện*) ·
`floorRitual` = `cubic-bezier(0.22,0,0.18,1)` (deck *Không gian*). Gọi `registerEases()`
trước mọi `parseEase` tên ritual (đã đặt trong `ConvergeBlock` + `YVienSpaceExperience`).

## motionConfig (tập trung)
```ts
scrub: 0.8            // độ trễ bám cuộn (mượt/“dính”)
ease: "convergeRitual" // CustomEase học Dropbox — ease-out, đặt nhẹ vào chỗ
duration: 1.2
convergeDistance: 160 // px trượt ban đầu
parallaxDistance: 48  // biên độ parallax ảnh (chia nhỏ khi dùng)
inactiveScale: 0.94 / activeScale: 1
inactiveOpacity: 0.35 / activeOpacity: 1
sceneHeightVh: 220    // độ dài cuộn của scene converge
stagger: 0.12         // lệch nhịp giữa block (theo progress 0–1)
revealWindow: 0.55    // độ rộng cửa sổ hội tụ của mỗi block
PIN_MIN_WIDTH: 1024   // < lg → không pin, reveal tĩnh
```

## Hợp đồng component
- **`<SmoothScrollProvider>`** (bọc trong `layout.tsx`): bật Lenis + sync ScrollTrigger;
  **tắt khi reduced-motion** (native scroll); cleanup ticker + `lenis.destroy()`.
- **`<ScrollConvergeScene heightVh? className? stageClassName?>`**: container cao
  `sceneHeightVh`, stage `sticky` giữa màn; ScrollTrigger pin + scrub phát `progress`
  qua context. Reduced-motion / < lg → `progress = 1` (tĩnh, không pin).
- **`<ConvergeBlock from index dist? className?>`**: con của scene; nội suy
  translate (theo `from`: left/right/up/down) → 0, scale & opacity theo cửa sổ
  `[index*stagger, +revealWindow]`. Ghi bằng `gsap.quickSetter` (transform/opacity).
- **`<StickyRevealScene>`** + **`<MotionImageCard index>`**: lưới 4 tầng; mỗi card
  reveal (y+autoAlpha, `top 88%`, play-once) + parallax ảnh (`[data-parallax]`, scrub).

## Reduced-motion & fallback (an toàn)
- **Base CSS = hiển thị đầy đủ** (`opacity:1`, no transform) → no-JS / SSR đọc được, không layout shift.
- JS chỉ ghi đè trạng thái khởi đầu **trước paint** (useGSAP/useEffect layout) khi motion được phép.
- `@media (prefers-reduced-motion: reduce)`: ép `[data-converge-block]/[data-motion-card]`
  về `transform:none; opacity:1`; Lenis không khởi tạo.
- Chiều cao scene tall **chỉ** bật ở `(min-width:1024px) and (prefers-reduced-motion: no-preference)`
  → mobile/reduced không có khoảng trống.

## Performance
- Chỉ animate `transform`/`opacity`; `will-change` đặt đúng chỗ; `quickSetter` tránh reflow.
- ScrollTrigger/tween **kill khi unmount** (`useGSAP` scope + return cleanup).
- Ảnh `loading="lazy"` (component `Img` sẵn có); parallax dùng phần tử scale-110 để
  không lộ mép.

## Breakpoint nghiệm thu
375 · 768 · 1024 · 1440 px (pin/scrub chỉ ≥ 1024).

---

# BREATH & FLOW (mở rộng — cảm hứng MyWebLab)

Hệ con cho 2 section mới (Quy trình trị liệu + Không gian Y Viện). Nguyên lý chắt lọc
từ `myweblab.it` (xem `myweblab-motion-patterns.md`): expo-out, scroll-driven, chỉ
transform/opacity; nhưng **chậm hơn, biên độ nhỏ hơn, có nhịp thở**.

## Tokens
CSS (`globals.css` @theme): `--motion-fast/medium/slow` = 180/420/760ms ·
`--ease-soft` = `cubic-bezier(0.22,1,0.36,1)` · `--ease-ritual` = `cubic-bezier(0.16,1,0.3,1)`
(học từ MyWebLab) · `--reveal-distance` = 32px · `--section-parallax-depth` = 80px.
GSAP (`lib/motion/config.ts` → `breathFlow`): bản giây + easing `power4.out` + khối `stack`.
Easing đặt tên: `easings.ts` (`gsapEasings.ritual`, `cssEasings.ritual`).

## Hợp đồng component
- **`<MotionReveal from index as?>`**: GSAP fromTo (trượt `--reveal-distance` + fade),
  easing ritual, stagger theo `index`. Khác `Reveal.tsx` (IO, dùng toàn site) — bản này
  riêng cho 2 section. Reduced-motion → return sớm (hiện tĩnh).
- **`<ScrollProgress orientation>`**: tìm `[data-progress-scope]` gần nhất, fill `scaleY/scaleX`
  0→1 (scrub) theo tiến độ section — "mạch dẫn tự vẽ".
- **`<HealingProcessMotion>`**: 4 bước (`PROCESS_STEPS`). Desktop: line dọc trung tâm
  (`ScrollProgress`) + bước xen kẽ trái/phải, node trên line. Active = **1 ScrollTrigger map
  `progress → round(progress*(n-1))`** (bền mọi tốc độ cuộn, bước cuối luôn sáng) + hover override.
  Mobile: vertical stepper, line bên trái.
- **`<YVienSpaceExperience>`**: 4 tầng (`SPACES`). Desktop (≥lg + motion): pin stage, panel
  xếp lớp (absolute), nội suy `y/scale/opacity/z` theo progress — tầng active vào center
  (scale 1, rõ, z cao), tầng trước lùi **lên** & mờ, tầng sau chờ **dưới** & mờ. Ghi bằng
  `gsap.quickSetter`. Mobile/reduced → không pin, panel ở luồng thường + reveal nhẹ.

## Đã kiểm chứng (Playwright)
- Build static export PASS, console 0 error.
- Desktop: deck đổi tầng theo progress (tầng 1→4 active, các tầng khác lùi/mờ); progress line
  fill 0→1; active step chạy tới "Theo dõi".
- Mobile (375): không pin (`.floor-scene` min-height auto), panel static stack, reveal đủ.
- Reduced-motion: guard `matchMedia` (JS return sớm) + `@media` ép `transform:none;opacity:1`.
