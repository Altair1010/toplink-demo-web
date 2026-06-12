---
version: alpha
name: Y Viện Toplink
description: Deep, soulful Đông-y wellness brand — saturated crimson red, heritage gold, dark wood, and warm ivory for a luxurious, grounded, traditional-Eastern medicine experience.
colors:
  primary: "#95131f"
  primary-light: "#f9dcd9"
  primary-soft: "#efb0aa"
  primary-dark: "#7a0f18"
  primary-deep: "#5c0a11"
  accent-red: "#c70002"
  accent-red-dark: "#b20000"
  secondary: "#c8a02e"
  secondary-light: "#fdd79a"
  secondary-bright: "#fff1c1"
  secondary-dark: "#9c7a1c"
  wood: "#502c1e"
  wood-dark: "#3a1f15"
  tertiary: "#2f5d50"
  tertiary-dark: "#244a3f"
  neutral: "#fbf7f0"
  surface: "#ede7d3"
  surface-high: "#d0c2a7"
  mist: "#e6e5d7"
  on-surface: "#313131"
  on-surface-soft: "#5c534c"
  on-primary: "#fff1c1"
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 60px
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: -0.02em
  display-1:
    fontFamily: Playfair Display
    fontSize: 44px
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 34px
    fontWeight: 800
    lineHeight: 1.15
  headline-md:
    fontFamily: Playfair Display
    fontSize: 26px
    fontWeight: 700
    lineHeight: 1.25
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.75
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.7
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
    fontWeight: 700
    lineHeight: 1
    letterSpacing: 0.18em
  script-accent:
    fontFamily: Dancing Script
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.1
  script-lg:
    fontFamily: Dancing Script
    fontSize: 56px
    fontWeight: 700
    lineHeight: 1.1
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
  max-width: 1200px
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
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

## Overview

Y Viện Toplink is an Đông-y (traditional Vietnamese medicine) wellness clinic and
dưỡng sinh sanctuary, styled after its parent brand **nhatlieuyvien.vn**. The
interface must feel **luxurious, grounded, serene, and deeply rooted in Eastern
tradition** — a calm, dignified place to slow down and be cared for. The primary
audience skews **middle-aged and elderly**, so the design favors **large type,
large content blocks, high color contrast, and generous breathing room** over
clinical sterility or trendy minimalism.

The look is rich and warm: a **deep, saturated crimson red** anchors the brand,
paired with **heritage gold**, **dark wood**, and a warm ivory paper background.
It must **never** read as pale or washed-out, coldly medical, like a mass-market
spa, or over-animated. Restraint guides the motion and layout; saturation and
craft give it soul.

## Colors

The palette is built on a deep, saturated crimson with gold and wood — the
traditional Eastern language of vitality (đỏ son), prosperity (vàng kim), and
natural materials (nâu gỗ).

- **Primary — Crimson (#95131f):** A deep, saturated brand red for primary actions,
  the brand mark, hero gradients, and key emphasis. Conveys vitality, warmth, and
  permanence. Pairs with warm cream text (#fff1c1), never pure white-on-thin-red.
- **Accent Red (#c70002):** A brighter red reserved for a single high-emphasis cue
  (e.g. the hotline). Used very sparingly so it never competes with the primary.
- **Secondary — Heritage Gold (#c8a02e):** A rich gold for accents, decorative
  rules, seals, and highlights. As text, restricted to large headings/eyebrows or
  use on dark backgrounds (it lacks contrast as body text on light surfaces).
- **Wood (#502c1e → #3a1f15):** Deep earthy browns for the footer and grounding
  surfaces, evoking natural materials.
- **Tertiary — Deep Jade (#2f5d50):** A restrained, darkened teal for occasional
  restful accents and balance cues.
- **Neutral — Ivory (#fbf7f0):** A warm off-white forming the page foundation.
- **Surface — Cream / Sand (#ede7d3, #d0c2a7):** Layered warm tones for cards and
  raised containers, with enough depth to give blocks clear edges.
- **On-surface — Ink (#313131):** A warm charcoal for body text and headings.

## Typography

Three families carry the system: **Playfair Display** (headings, at weight **900**
for impact) for an elegant, prestigious voice; **Be Vietnam Pro** for body and UI
text, chosen for excellent Vietnamese diacritic rendering and high legibility; and
**Dancing Script** as a decorative calligraphic accent that gives the brand soul.

- **Headlines:** Playfair Display, Black (900) for hero/display, 700–800 for
  smaller headings. Never set body copy in the display face.
- **Body:** Be Vietnam Pro Regular at **18–20px** (base 18px) with generous
  line-height for comfortable reading by middle-aged and elderly guests. Body text
  is never set below 16px.
- **Labels:** Be Vietnam Pro Medium/Semi-Bold. Caps labels use light uppercase with
  wide letter spacing for metadata and eyebrow text.
- **Script accent:** Dancing Script is **decorative only** — short Vietnamese
  phrases, hero flourishes, and section eyebrows. Never used for body copy or long
  passages, to protect readability.

## Layout

The layout uses a **fluid single-column grid on mobile** (the priority device) and
a **fixed max-width grid (1200px)** on desktop. A consistent spacing scale (4/8/16/
24/40/64/96px) maintains rhythm, with **section vertical padding of 80–112px** and
**card padding of 32px** for spacious, easy-to-scan blocks.

Content favors abundant whitespace, clearly delineated large content blocks, and
generous internal padding. Body line length is capped (~max 3xl) for readability.
On mobile, a persistent bottom action bar (Gọi · Zalo · Đặt lịch · Chỉ đường) stays
visible without covering forms, with touch targets ≥44px.

## Elevation & Depth

Depth is conveyed through **tonal layering and soft shadows**, not heavy drop
shadows. The ivory page background recedes while cream and ivory cards sit gently
above it. A 2px gold gradient rule, gold "seal" ring motifs, and subtle layered
paper-texture gradients (crimson + gold tints) add warmth, hierarchy, and an
Eastern decorative touch without visual noise.

## Shapes

The shape language is **structured and formal** — modest, near-square corners that
evoke architectural, traditional-Eastern craft rather than soft, trendy roundness.
Buttons use a small **4px** radius (not pills); cards use **8px**; large hero and
CTA panels use **12px**. Full rounding (circles) is reserved only for true circular
elements: the logo dot, icon buttons, stepper number circles, and avatars.

## Components

- **Buttons:** Primary buttons are deep crimson with warm cream text, near-square
  (4px radius), with generous padding (≥20px, ≥44px tall). Secondary buttons are
  gold with wood text. Hover deepens the fill rather than changing hue. CTAs are
  prominent but never harsh.
- **Cards:** Ivory or cream background, 8px radius, soft shadow, 32px internal
  padding, large type — used for services, branches, products, reviews, and
  dashboard stats.
- **Need selector chips:** 8px-radius selection chips (not pills) for "Hôm nay cơ
  thể chị/anh đang cần gì?" that reveal suggested services on selection.
- **Input fields:** Clearly labeled, large touch targets (≥44px), visible gold
  focus rings, explicit error messages, minimal required fields in booking forms.
- **Mobile bottom bar:** Four fixed actions with clear icons and short labels,
  thumb-reachable with one hand.

## Do's and Don'ts

- Do use the deep crimson primary for the single most important action per screen.
- Do keep gold as a sparing accent — rules, seals, highlights — not large fills,
  and not as body text on light backgrounds.
- Do keep colors deep and saturated; never let the palette look pale or washed-out.
- Do maintain WCAG AA contrast (4.5:1 for body text); use ink on warm surfaces and
  warm cream on crimson.
- Do keep body text large (≥18px) and legible for middle-aged and elderly guests.
- Do use restrained, gentle motion: short fade-up only; respect reduced-motion.
- Don't use pressuring sales language ("Mua ngay", "Chốt đơn ngay").
- Don't over-round — no full-pill buttons or heavily rounded cards.
- Don't crowd screens with small text, especially on mobile.
- Don't mix a cold clinical aesthetic into the warm, deep, traditional palette.
