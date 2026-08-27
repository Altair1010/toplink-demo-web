# Kho effect — Y viện (hiện tượng cục bộ · 1 engine GSAP)

Thư mục `components/effects/` chứa các hiệu ứng trang trí được mô tả bằng hiện tượng
và hành vi cục bộ. Không dùng thư viện, registry hay style guide bên ngoài làm nguồn
thẩm quyền thiết kế.

> Phân vai: `components/motion/` = các scene GSAP chính của site (converge, floor-stack,
> reveal…). `components/effects/` = hiện tượng trang trí cục bộ, giới hạn trong một bề mặt.

---

## Nguyên tắc gốc

- **KHÔNG** thêm motion engine thứ hai (`framer-motion`, `motion`, `anime.js`).
- **Đúng 1 animation engine = GSAP.** Effect động phải chạy bằng GSAP (nối vào
  `@/lib/motion/`), hoặc thuần **CSS / canvas / SVG** (không cần engine JS).
- Effect Framer Motion → **PORT sang GSAP trước** khi nhận vào. Không có ngoại lệ.

---

## Rules cứng (bắt buộc khi thêm 1 effect)

1. **1 element = 1 engine.** Không để 2 engine cùng animate một element. Toàn bộ effect
   động trong thư mục này dùng GSAP.
2. **Chỉ GSAP làm scroll.** ScrollTrigger/pin/scrub/marquee đều qua GSAP. Site dùng **native
   scroll** (`scroll-behavior: smooth` trong `app/globals.css`) — Lenis và Three.js đã gỡ hẳn
   và **KHÔNG** được đưa lại. **KHÔNG** tạo `requestAnimationFrame` loop riêng: reveal đơn
   giản dùng IntersectionObserver (`components/Reveal.tsx`), mọi thứ theo tiến độ cuộn dùng
   ScrollTrigger.
3. **Cấm import `framer-motion` / `motion` / `motion/react`.** Nếu effect gốc dùng Framer,
   port sang GSAP rồi mới đưa vào (xoá mọi `motion.*`, `AnimatePresence`, `useAnimate`…).
4. **Effect nặng phải lười tải.** Particle/beam/WebGL/canvas lớn → `next/dynamic` với
   `{ ssr: false }`; không đặt ở hero đầu tiên. Chỉ bật pin/scrub khi ≥ `PIN_MIN_WIDTH`
   (desktop) — dùng hằng từ `@/lib/motion/config.ts`.
5. **Reduced-motion bắt buộc.** React: `useReducedMotion()` (`@/hooks/useReducedMotion`).
   Ngoài React / trong callback GSAP: `prefersReducedMotion()` cùng file. Hoặc guard CSS
   trong `styles/motion.css`. Khi bật reduced-motion → hiện trạng thái tĩnh cuối, không animate.
6. **Tailwind 4 + token brand.** Component 3 bộ thường viết cho Tailwind 3 → sửa syntax
   (`@theme`, class tuỳ biến). KHÔNG hardcode màu ngoài token brand
   (`--color-crimson-*`, `--color-gold-*`, … khai trong `styles/tokens.css`; `app/globals.css`
   chỉ còn import + base + a11y).
7. **Tái dùng preset motion — CSS là nguồn.** Thời lượng và biên độ lấy bằng
   `readMotionTheme()` (`@/lib/motion/theme.ts`), gọi TRONG effect phía client; nó đọc
   `--motion-*` / `--reveal-distance` từ `styles/tokens.css` nên skin `[data-brand]` đổi
   theo. Easing CSS dùng `var(--ease-soft|ritual|slide|spring)`. Chỉ đường cong riêng của
   GSAP mới nằm trong TS (`gsapEasings`, `registerEases`, `breathFlow.ease`). KHÔNG khai
   lại thời lượng bằng số trong TS — đó là nguồn sự thật thứ hai.

8. **Không đặt React state trong scroll handler.** Ghi CSS custom property thẳng lên
   element, để CSS nội suy (mẫu: `components/ConvergeOnScroll.tsx` — một IntersectionObserver
   chọn item cần đo, một listener + một vòng rAF dùng chung cho tất cả).

9. **Class viết tay không được trùng namespace Tailwind.** `--shadow-x` sinh `.shadow-x`,
   `--color-x` sinh `.bg-x`, `--ease-x` sinh `.ease-x`. Trùng tên là đè lên bản Tailwind
   sinh và phá composition của nó. Đặt tên ngoài namespace (`.elev-soft`, `.surface-paper`,
   `.stagger-1..4`).

---

## Quy trình nhận 1 effect

1. Đặt tên hiện tượng theo hành vi người dùng nhìn thấy, không theo nguồn tham khảo.
2. Tạo file trong `components/effects/`, thêm **header chú thích** (mẫu dưới).
3. Áp rules 1–7. Chạy `npm run build` + kiểm tra reduced-motion.

### Mẫu header mỗi file effect

```tsx
/**
 * Hiện tượng: <tên theo hành vi>
 * Engine: GSAP | CSS | canvas | SVG
 * Reduced-motion: <cách xử lý>
 */
```

---

## Hiện tượng hiện có

| Hiện tượng    | Engine        | Reduced-motion     | Dùng ở       |
| ------------- | ------------- | ------------------ | ------------ |
| Pointer light | CSS + pointer | không gắn listener | `ReviewWall` |
