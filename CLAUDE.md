# CLAUDE.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.
## 0. Always answer in Vietnamese. 
## 0.1. Không miêu tả từng bước làm gì. Không cung cấp phân tích từng bước nếu tôi không yêu cầu. Chỉ cần trả summary đầu ra
## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## 5. Kho Effect — 1 engine GSAP (bắt buộc)

Khi thêm bất kỳ effect trang trí nào (từ Aceternity/Magic UI/react-bits), tuân theo
`app-demo/components/effects/EFFECTS.md`. Tóm tắt ràng buộc:

- **KHÔNG** cài `framer-motion`/`motion`/aceternity/magic-ui/react-bits như package — chỉ copy-paste effect lẻ.
- **Đúng 1 engine = GSAP** (nối `@/lib/motion/`), hoặc thuần CSS/canvas/SVG. Effect Framer phải **port sang GSAP** trước.
- Chỉ GSAP làm ScrollTrigger/pin/scrub. Site dùng **native scroll** — Lenis/Three.js đã gỡ hẳn, không đưa lại. Không tự viết rAF loop: reveal đơn giản dùng IntersectionObserver (`components/Reveal.tsx`).
- Reduced-motion bắt buộc (`useReducedMotion` / `prefersReducedMotion`); effect nặng `dynamic import ssr:false`.
- Dùng token brand khai trong `app-demo/styles/tokens.css` (`app/globals.css` chỉ còn import + base + a11y), không hardcode màu ngoài palette. Hardcode = skin `[data-brand]` không chạm tới được.
- Nhịp motion đọc từ CSS bằng `readMotionTheme()` (`lib/motion/theme.ts`), gọi trong effect client. Không khai lại thời lượng bằng số trong TS.
- Class CSS viết tay không được trùng namespace Tailwind sinh từ `@theme` (`.shadow-*`, `.bg-*`, `.ease-*`, `.delay-*`).
- Cổng nghiệm thu: `cd app-demo && npm run verify`.
- Context chung cho mọi agent: `AGENTS.md` ở root. Hệ thiết kế: `DESIGN.md`. Hệ skin: `app-demo/styles/skins.css`.
