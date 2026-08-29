---
version: alpha
name: Y Viện Toplink
description: Partial H6 runtime — corrected sans-first homepage narrative inside a retained crimson/gold compatibility shell; legacy routes are not yet converged.
colors:
  primary: "#95131f"
  primary-light: "#f5d9d6"
  primary-soft: "#e6a9a3"
  primary-dark: "#7e0a15"
  primary-deep: "#6a0511"
  accent-red: "#c70002"
  accent-red-dark: "#b20000"
  secondary: "#d8aa4b"
  secondary-light: "#f3d27a"
  secondary-bright: "#f7e8c2"
  secondary-dark: "#a9802c"
  wood: "#56351f"
  wood-dark: "#3a2114"
  tertiary: "#2f5d50"
  tertiary-dark: "#244a3f"
  neutral: "#fffcf7"
  surface: "#f6f4df"
  surface-high: "#e7d6b4"
  mist: "#e6e5d7"
  on-surface: "#1a1410"
  on-surface-soft: "#4a4a4a"
  on-primary: "#f7e8c2"
typography:
  display-hero:
    fontFamily: Noto Serif
    fontSize: clamp(3rem, 6vw, 4.75rem)
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.025em
  display-1:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: -0.005em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: -0.005em
  headline-md:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.65
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.65
  body-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: 600
    lineHeight: 1.2
  label-caps:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.06em
spacing:
  base: 16px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  2xl: 64px
  3xl: 96px
  gutter: 24px
  margin: 32px
  card-pad: 32px
  max-width: 1280px
rounded:
  sm: 2px
  md: 4px
  lg: 6px
  xl: 8px
  2xl: 16px
  3xl: 24px
  full: 9999px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    padding: 20px
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.wood}"
    rounded: "{rounded.sm}"
    padding: 20px
  card:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.on-surface}"
    rounded: "{rounded.md}"
    padding: 32px
---

# Y Viện Toplink — Design System

> **Nguồn sự thật là code, không phải file này.** Mọi giá trị ở trên được rút từ
> `app-demo/styles/tokens.css`. Khi hai bên lệch nhau, `tokens.css` đúng và file này
> phải được sửa. Xem bảng đối chiếu ở mục [Token crosswalk](#token-crosswalk).

> **Phạm vi sau khi kích hoạt Humanizer v2.1:** file này mô tả **Runtime Truth/current
> design** của implementation hiện tại, không phải Target Design Truth hay redesign đã xảy ra.
> Direction Humanizer chỉ có thể supersede các legacy art-direction defaults sau Human Gate
> phù hợp và Approved Migration Record. Xem `HUMANIZER.md`; cho đến khi migration được
> implementation + verification, `tokens.css` vẫn là Runtime Truth.

## H6 Runtime Status — PARTIAL

This file describes the runtime at H6 final rebase, not a finished Humanizer system.

### Corrected homepage graph

```text
HomeHero (bounded opening context; legacy visual shell)
    ↓
OrientationCore
    ├─ OpeningQuestion
    ├─ GuidedOrientation
    ├─ ClearBoundary
    └─ ConsequenceBeforeAction (local / no-send)
    ↓
NarrativeCompletion
    ├─ ServiceScope
    ├─ VisitProcessExplanation
    ├─ EvidenceAnswer → null in production (0 approved records)
    └─ ContinueUnderstanding → local return to orientation
```

`HomeExperience → Tắc/Hàn/Hư/Loạn → service recommendation` is deleted and unreachable.
`StaticOrientationShell` remains the M2A0 rollback floor.

### Actual typography consumers

- Corrected homepage roles use Be Vietnam Pro through component-local `hh-*` rules and the M1C
  behavior contract.
- `HomeHero`, `HealingProcessMotion` and `YVienSpaceExperience` still consume
  `.font-serif-display`/Noto Serif.
- Noto has 10 remaining load, alias and consumer references across 6 files. It is a runtime
  compatibility font, **not** an official brand font.
- The official font family remains unverified.

### Actual semantic tokens and skins

- M0R-JIT added zero aliases; corrected roles remain component-local or use existing primitives.
- `tokens.css` still exposes the legacy crimson/gold/wood/ivory system and is not Humanizer Target
  Truth.
- All three live skins remain: `yvien` (default), `tet`, `an-tinh`. Browser verification confirms
  distinct primary/surface/motion values for each.

### Actual motion

- Corrected orientation/narrative uses bounded CSS state/reveal behavior and native scroll.
- `prefers-reduced-motion: reduce` disables homepage fade/leaf animation in the verified browser.
- Legacy route motion (`Reveal`, `ConvergeOnScroll`, space/process motion and decorative leaves)
  remains active compatibility behavior and route migration debt.

### Trust and operational state

- Booking is fail-closed: local review only, no form, submit control, iframe, recipient, transport,
  confirmed/success state or mutating request.
- Booking still contains unverified need labels, service matching, duration and price. It is not H7
  ready.
- Production evidence count is zero. Evidence UI truly collapses; reviews, staff metrics and demo
  article bodies are removed from reachable production.
- Contact publishes no branch, phone, map, email, social channel or response promise.
- M3P remains **DEFERRED TO ADMIN**. M4 remains **BLOCKED OPERATIONALLY**.

### Remaining route debt

`/`, `/dich-vu`, `/dich-vu/[slug]`, `/dat-lich`, `/gioi-thieu`, `/khong-gian`,
`/quy-trinh-tri-lieu`, `/san-pham`, `/dao-tao`, `/nhuong-quyen` and public `/motion-lab*`
surfaces remain H6-blocking debt. The homepage still retains a red/gold prestige hero and stock
ambience; other legacy routes retain unverified service, health, place, process or commercial
claims and repeated card grammar. Eight route families also lack an `h1`.

H6 is therefore **PARTIAL — CROSS-PAGE MIGRATION DELTA REQUIRED**, not full convergence and not H7
eligible.

## Overview

The current runtime is a mixed system. Its corrected homepage uses a sans-first editorial sequence
to help a person state uncertainty, understand boundaries and keep decision authority. Its global
shell and most inner routes still use the older crimson/gold/wood design, Noto display type,
decorative material language and card-heavy layouts.

The approved brand profile supports warm Caregiver, clear Sage and non-coercive Guide behavior. It
does not verify the legacy palette as official digital identity, a facility, service facts, health
outcomes, staff, evidence, contact data or operational programs. Those runtime remnants must not be
read as brand approval.

## Colors

The retained compatibility palette is built on crimson, gold and wood. It is what currently runs,
not a verified official brand palette and not the locked Humanizer visual target.

- **Primary — Crimson (#95131f):** A deep, saturated brand red for primary actions,
  the brand mark, hero surfaces, and key emphasis. Conveys vitality, warmth, and
  permanence. Pairs with warm gold-tinted cream text (#f7e8c2), never pure
  white-on-thin-red. Hover deepens to #7e0a15; pressed to #6a0511.
- **Accent Red (#c70002):** A brighter red reserved for a single high-emphasis cue
  (e.g. the hotline). Used very sparingly so it never competes with the primary.
- **Secondary — Heritage Gold (#d8aa4b):** A rich gold for accents, decorative
  rules, seals, and highlights. **Contrast rule:** gold on ivory is ~2.1:1 and fails
  WCAG — use it for lines, borders, large icons and decoration only. Never for text
  below 24px on a light surface. On dark crimson, #f3d27a and #f7e8c2 are safe.
- **Wood (#56351f → #3a2114):** Deep earthy browns for the footer and grounding
  surfaces, evoking natural materials.
- **Tertiary — Deep Jade (#2f5d50):** A restrained, darkened teal for occasional
  restful accents and balance cues.
- **Neutral — Ivory (#fffcf7):** A warm off-white forming the page foundation.
- **Surface — Cream / Sand (#f6f4df, #e7d6b4):** Layered warm tones for cards,
  raised containers and hairline rules, with enough depth to give blocks clear edges.
- **On-surface — Ink (#1a1410):** A warm near-black for body text and headings.
  Secondary body text uses #4a4a4a to stay ≥4.5:1 on cream and ivory.

### Skins

The palette above is the default identity (`data-brand="yvien"`). The whole look —
colors, motion tempo, corner radii — is swappable from a single attribute on `<html>`,
because every utility and every hand-written rule reads the same custom properties.
Alternate skins live in `app-demo/styles/skins.css`; two ship today (`tet`, `an-tinh`).

A skin may retune brand anchors, motion tempo and radii. It must **not** redefine the
type scale, container widths or measure — those are system decisions, not seasonal
identity. Keep a skin recognisably the same brand; if it needs more than the anchors,
it is a different brand, not a skin.

## Typography

Two families remain loaded in runtime: **Noto Serif** for legacy display consumers and **Be Vietnam
Pro** for body/UI plus the corrected homepage. Neither is claimed as the official brand font.

- **Serif is reserved.** Noto Serif is used **only** for h1, h2, brand statements
  and large pull quotes. If every sentence is ceremonial, none of them are.
  Loaded weights: 600 (headings) and 700 (`.emph` keyword emphasis). No 800/900 —
  the brand is still, not loud.
- **Headings h3 and below** are Be Vietnam Pro 600, not serif. This is what keeps
  the page from feeling uniformly ritualized.
- **Never uppercase Vietnamese headings.** Full-caps Vietnamese with diacritics
  measurably slows reading, especially for older guests. Uppercase is allowed only
  for very short eyebrow/nav labels (`.label-caps`, `.eyebrow`) at 0.06em tracking.
  Longer Vietnamese eyebrow lines use `.eyebrow-long` (no caps).
- **Body:** Be Vietnam Pro Regular at **18–20px** (base 18px) with line-height 1.65
  for comfortable reading. Body text is never set below 16px.
- **Measure:** line length is capped by utility class — 62ch body, 54ch lead,
  36ch card. Long unconstrained lines are a bug.
- **No script/calligraphic face.** The brand has no decorative script font. Eastern
  character comes from the seal motif, gold rules and frame borders, not handwriting.

## Layout

The layout uses a **fluid single-column grid on mobile** (the priority device) and
a **fixed max-width grid (1280px)** on desktop, with a **760px narrow column** for
quotes, intros and FAQ. A consistent spacing scale (4/8/16/24/40/64/96px) maintains
rhythm; section vertical padding is fluid — `clamp(4rem, 9vw, 7rem)` normally and
`clamp(5.5rem, 12vw, 11rem)` for pillar sections, so the page does not feel evenly
metronomic.

Content favors abundant whitespace, clearly delineated large content blocks, and
generous internal padding. On mobile, a persistent bottom action bar (Gọi · Zalo ·
Đặt lịch · Chỉ đường) stays visible without covering forms, with touch targets ≥44px.

## Elevation & Depth

Depth is conveyed through **tonal layering and soft shadows**, not heavy drop
shadows. The ivory page background recedes while cream and ivory cards sit gently
above it. Shadows are warm-tinted and shallow, never black.

A **2px solid gold rule** (flat, not a gradient), gold "seal" ring motifs, and inset
double-border frames (`.frame-gold`, `.frame-herb`) add warmth, hierarchy, and an
Eastern decorative touch without visual noise.

**On gradients:** the palette is flat by default — solid fills, no blends for
surfaces, rules or type. Gradients are permitted in exactly three places, as a
lighting device rather than a color device: the hero scrim, the closing CTA glow
(`.cta-glow`), and the readability overlay on photography (`BrandVisual`). Do not
introduce gradients elsewhere, and do not remove these three.

## Shapes

The shape language is **structured and formal** — modest, near-square corners that
evoke architectural, traditional-Eastern craft rather than soft, trendy roundness.
Buttons and chips use a **2px** radius (not pills); cards use **4px**; larger panels
use **6–8px**. Big photographic cards and hero panels may use **16–24px**. Full
rounding (circles) is reserved only for true circular elements: the logo dot, icon
buttons, stepper number circles, and avatars.

## Motion

Motion is **slow, soft and therapeutic** — it should read as breathing, never as
technology demoing itself. Only `transform` and `opacity` are animated.

- **Durations:** 180ms micro-interaction · 420ms state change · 760ms reveal.
- **Easing:** `--ease-soft` `cubic-bezier(0.22, 1, 0.36, 1)` for hover and
  micro-interaction; `--ease-ritual` `cubic-bezier(0.16, 1, 0.3, 1)` for reveals;
  `--ease-slide` for directional slide-ins; `--ease-spring`, a discrete `linear()`
  spring, for hover states that want weight. No JS runtime needed for any of them.
- **CSS owns the tempo, including for GSAP.** Durations and reveal distance live in
  `styles/tokens.css` and are read at runtime by `readMotionTheme()`
  (`lib/motion/theme.ts`). TypeScript keeps only GSAP-specific curve names. There is
  no second copy of these numbers — retuning motion is a CSS edit.
- **Reveal amplitude is small** — 32px of travel. Calm, not cinematic.
- **The homepage motion budget is three**, all pure CSS: body-region glow, state
  panel expand, recommendation drawer slide-up. No GSAP on the homepage, no
  marquee, no parallax, no scroll hijacking.
- **Scroll is native** (`scroll-behavior: smooth`). There is no smooth-scroll
  library. Lenis and Three.js were removed and must not return.
- **Reduced motion is mandatory.** Every animated element must reach its final
  static state under `prefers-reduced-motion: reduce`.

Engine split: CSS owns micro-interaction and decorative keyframes;
IntersectionObserver owns the single reveal primitive; GSAP owns pin, scrub,
horizontal scenes, Flip, SplitText, DrawSVG and counters — on inner pages only.

## Components

- **Buttons:** Primary buttons are deep crimson with warm cream text, near-square
  (2px radius), with generous padding (≥44px tall). Secondary buttons are gold with
  wood text. Hover deepens the fill rather than changing hue. CTAs are prominent but
  never harsh.
- **Cards:** Ivory or cream background, 4px radius, soft shadow, 32px internal
  padding, large type — used for services, branches, products and reviews.
- **Symptom chips:** 2px-radius selection chips (not pills) for "Hôm nay cơ thể
  đang báo điều gì?" that reveal suggested treatments on selection. Selected state
  is a filled crimson chip; unselected is a gold-bordered ivory chip.
- **Input fields:** Clearly labeled, large touch targets (≥44px), visible focus
  rings, explicit error messages, minimal required fields in booking forms.
- **Interactive ownership:** booking uses native `Action`, `TextField`, `TextArea` and
  `ChoiceField`; feedback uses the local `NoticeRegion`; glyphs come from the closed
  Toplink vocabulary in `components/Glyph.tsx`. Tailwind remains a layout utility,
  while `styles/interface.css` owns component anatomy and state.
- **Mobile bottom bar:** Four fixed actions with clear icons and short labels,
  thumb-reachable with one hand.
- **Focus:** a single site-wide `:focus-visible` treatment — 3px crimson outline on
  light surfaces, gold on `.on-dark`. Keyboard-only; it must not fire on mouse click.

## Do's and Don'ts

- Do use the deep crimson primary for the single most important action per screen.
- Do keep gold as a sparing accent — rules, seals, highlights — not large fills,
  and not as text under 24px on light backgrounds.
- Do keep colors deep and saturated; never let the palette look pale or washed-out.
- Do maintain WCAG AA contrast (4.5:1 for body text); use ink on warm surfaces and
  warm cream on crimson.
- Do keep body text large (≥18px) and legible for middle-aged and elderly guests.
- Do use restrained, gentle motion, and respect reduced-motion everywhere.
- Do reach for an existing token before writing a literal color, size or duration.
- Don't use pressuring sales language ("Mua ngay", "Chốt đơn ngay").
- Don't over-round — no full-pill buttons or heavily rounded cards.
- Don't crowd screens with small text, especially on mobile.
- Don't mix a cold clinical aesthetic into the warm, deep, traditional palette.
- Don't set Vietnamese headings in full caps.

## Token crosswalk

Front-matter keys above map to CSS custom properties declared in
`app-demo/styles/tokens.css`. The CSS name is what you write in code.

| DESIGN.md key                     | CSS token                             | Value                       |
| --------------------------------- | ------------------------------------- | --------------------------- |
| `primary`                         | `--color-crimson-600`                 | `#95131f`                   |
| `primary-light`                   | `--color-crimson-100`                 | `#f5d9d6`                   |
| `primary-soft`                    | `--color-crimson-200`                 | `#e6a9a3`                   |
| `primary-dark`                    | `--color-crimson-700`                 | `#7e0a15`                   |
| `primary-deep`                    | `--color-crimson-800`                 | `#6a0511`                   |
| `accent-red`                      | `--color-accent-red`                  | `#c70002`                   |
| `accent-red-dark`                 | `--color-accent-red-dark`             | `#b20000`                   |
| `secondary`                       | `--color-gold-500`                    | `#d8aa4b`                   |
| `secondary-light`                 | `--color-gold-300`                    | `#f3d27a`                   |
| `secondary-bright` / `on-primary` | `--color-gold-200`                    | `#f7e8c2`                   |
| `secondary-dark`                  | `--color-gold-600`                    | `#a9802c`                   |
| `wood`                            | `--color-wood-500`                    | `#56351f`                   |
| `wood-dark`                       | `--color-wood-700`                    | `#3a2114`                   |
| `tertiary`                        | `--color-jade-500`                    | `#2f5d50`                   |
| `tertiary-dark`                   | `--color-jade-600`                    | `#244a3f`                   |
| `neutral`                         | `--color-ivory`                       | `#fffcf7`                   |
| `surface`                         | `--color-cream`                       | `#f6f4df`                   |
| `surface-high`                    | `--color-sand`                        | `#e7d6b4`                   |
| `mist`                            | `--color-mist`                        | `#e6e5d7`                   |
| `on-surface`                      | `--color-ink`                         | `#1a1410`                   |
| `on-surface-soft`                 | `--color-ink-soft`                    | `#4a4a4a`                   |
| `display-hero.fontSize`           | `--text-hero`                         | `clamp(3rem, 6vw, 4.75rem)` |
| `display-1.fontSize`              | `--text-statement`                    | `clamp(1.75rem, 3vw, 2rem)` |
| `body-lg.fontSize`                | `--text-body-lg`                      | `1.25rem`                   |
| `body-md.fontSize`                | `--text-body-md`                      | `1.125rem`                  |
| `label-caps.letterSpacing`        | `--tracking-eyebrow`                  | `0.06em`                    |
| `rounded.sm` … `rounded.3xl`      | `--radius-sm` … `--radius-3xl`        | `2/4/6/8/16/24px`           |
| `max-width`                       | `--container-wide`                    | `1280px`                    |
| `max-width-narrow`                | `--container-narrow`                  | `760px`                     |
| —                                 | `--motion-fast` / `-medium` / `-slow` | `180ms` / `420ms` / `760ms` |
| —                                 | `--ease-soft` / `--ease-ritual`       | see Motion                  |

Tokens with no front-matter key (`--color-crimson-50/300/400/500`, `--color-gold-400/700`,
`--color-wood-400`, `--color-ink-mute`, `--color-paper-light`) exist in CSS only.
The `--color-clay-*` entries are migration aliases mapping to crimson and are being
retired — do not use them in new code.
