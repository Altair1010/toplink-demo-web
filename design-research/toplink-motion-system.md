# Toplink Motion System — đặc tả

Hệ Motion UI reusable, config-driven cho Y Viện Toplink (Next.js 16 + React 19 +
Tailwind v4, **static export**). Engine: **GSAP + ScrollTrigger + Lenis** (`@gsap/react`).
Cảm hứng cơ chế: opening brand.dropbox.com (xem `dropbox-opening-motion-audit.md`).

## Cấu trúc file
```
lib/motion/config.ts            # motionConfig + breakpoints (NGUỒN cấu hình DUY NHẤT)
lib/motion/easings.ts           # gsapEasings / cssEasings
lib/motion/scrollTrigger.ts     # registerMotion() — đăng ký plugin 1 lần, guard SSR
hooks/useReducedMotion.ts       # boolean reactive, SSR-safe
components/motion/SmoothScrollProvider.tsx   # Lenis ↔ gsap.ticker ↔ ScrollTrigger
components/motion/ScrollConvergeScene.tsx    # sticky stage + context phát progress
components/motion/ConvergeBlock.tsx          # khối trượt → hội tụ về giữa
components/motion/StickyRevealScene.tsx      # lưới cho card scroll-driven
components/motion/MotionImageCard.tsx        # card reveal + parallax ảnh
styles/motion.css               # base/no-JS + Lenis + reduced-motion (import vào globals.css)
```

## motionConfig (tập trung)
```ts
scrub: 0.8            // độ trễ bám cuộn (mượt/“dính”)
ease: "power3.out"    // ease-out: đặt nhẹ vào chỗ
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
