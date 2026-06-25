# Motion QA Checklist — Converging Ritual Motion System

> Cách chạy: `cd app-demo && npm run dev` → mở `/toplink-demo-web/motion-lab/` và `/`.
> Build kiểm: `npm run build` (static export, phải PASS).

## A. Desktop ≥ 1024px (verify 1440×900)
- [x] *Về Y Viện*: stage **được pin**, scene cao `220vh` (đo 1980px @900).
- [x] 4 khối **hội tụ về giữa** theo scroll progress, có **stagger** (opacity 1 → 0.999 →
      0.972 → 0.885; translate Y biến thiên: +0.23 / +4.08 / −16.9 px).
- [x] Ease = CustomEase `convergeRitual` (console **0 warning** "invalid ease" ⇒ đã đăng ký).
- [x] *Không gian*: deck 4 tầng đổi tầng active theo progress (panel `position:absolute`).
- [ ] (Thủ công) Cảm giác chậm/mềm, không chóng mặt, không snap gắt.

## B. Mobile 375 (verify 375×760, reload)
- [x] *Về Y Viện*: scene **KHÔNG pin** — `min-height auto` (đo 616px, không 220vh).
- [x] Blocks opacity = 1 (reveal tĩnh, đủ chữ), không horizontal overflow.
- [x] Deck: panel `position: static` (stack dọc luồng thường, không absolute), không lag.
- [ ] (Thủ công) Số tầng `0n/0N` rõ; cuộn mượt.

## C. Reduced-motion
- [x] Đi chung nhánh `!canPin` (đã verify qua mobile): converge `progress=1`, deck reveal/return.
- [x] CSS `@media (prefers-reduced-motion: reduce)` ép `transform:none; opacity:1 !important`.
- [x] `SmoothScrollProvider` không init Lenis khi reduced.
- [ ] (Thủ công) Bật OS reduced-motion / DevTools → Rendering → emulate: mọi thứ tĩnh.

## D. Performance & accessibility
- [x] Chỉ animate `transform`/`opacity` (GPU); `will-change` đặt đúng; `quickSetter` tránh reflow.
- [x] ScrollTrigger **kill khi unmount** (`useGSAP` scope + `return () => st.kill()`).
- [x] `registerEases()` idempotent, client-only (`typeof window`), không double-register.
- [x] StrictMode-safe: `useGSAP`/`gsap.context` cleanup (verify dev StrictMode 0 lỗi).
- [x] Không layout shift: base CSS hiển thị đầy đủ; scene-tall chỉ ở desktop+no-preference.
- [x] Ảnh `loading="lazy"` (component `Img`) + `alt`; parallax dùng phần tử scale-110.
- [x] CTA có focus state; **nút Zalo `fixed z-50` không bị che** (ẩn ở mobile, có MobileBottomBar).
- [x] Build static export PASS (31 trang, gồm `/motion-lab`); TypeScript PASS.
- [x] Console **0 lỗi · 0 warning** mọi viewport đã test.

## E. Không copy Dropbox
- [x] Chỉ học **nhịp easing** (đường cong toán học) → kéo chậm/mềm cho Y Viện.
- [x] KHÔNG mượn màu/font/asset/text/layout, keyframe `drawIn`, motif bo góc khía.
- [x] Giữ identity Toplink (đỏ dược liệu + vàng kim, nền kem/ngọc).

> `[ ]` = bước cảm quan thủ công còn lại; `[x]` = đã verify (build/Playwright/đọc code).
