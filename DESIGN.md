---
version: h7
name: Y Viện Toplink
description: Information-first Humanizer runtime with booking retired and a bounded human-contact handoff.
typography:
  runtime-workhorse: Be Vietnam Pro
  official-brand-font: unverified
skins:
  - yvien
  - tet
  - an-tinh
---

# Y Viện Toplink — Runtime Design Truth

> Code remains authoritative. This document records what runs after H6-F; it is not permission to
> fabricate operational facts, evidence, contact destinations or a future brand identity.

## H7 Release Hygiene

H7 giữ nguyên graph, art direction và product scope của H6-F. Các chỉnh sửa runtime chỉ loại bỏ
ngôn ngữ scaffold như “demo”, “mock”, `SOP` và `Service Menu` khỏi metadata/nội dung công khai;
không thêm fact, evidence, contact URL hay khả năng mới.

## H6-F Runtime Status

The website is an information, understanding and exploration surface. It does not book
appointments, collect requests, choose services, manage booking state or confirm outcomes.

```text
READ
  ↓
UNDERSTAND
  ↓
EXPLORE THE Y VIỆN / SERVICE SCOPE / EXPERIENCE BOUNDARIES
  ↓
MORE READING
  ↓
optional HUMAN CONTACT
  ├── Zalo
  └── Facebook Page
```

Contact is a quiet exit/handoff, not a conversion funnel. Exact channel URLs remain unpublished
until an approved operational source supplies them.

## Public Route Allowlist

- `/` — orientation, bounded understanding and the single homepage contact handoff;
- `/gioi-thieu` — approved brand intent and current evidence boundary;
- `/dich-vu` — structural service scope without detail claims or booking;
- `/quy-trinh-tri-lieu` — questions that must be answered before a real process can be published;
- `/tin-tuc` — bounded knowledge/read-more route;
- `/lien-he` — contact-directory boundary for Zalo and Facebook Page.

`/dat-lich` is retired. Dynamic service/article detail routes and unsupported commercial/place
routes are deferred outside `app/`. Motion labs live under `app-demo/dev-evidence/` and are absent
from the production route graph.

## Homepage Graph

```text
HomeHero
  ↓
OrientationCore
  ├── OpeningQuestion
  ├── GuidedOrientation
  ├── ClearBoundary
  └── ConsequenceBeforeAction (local, no-send)
  ↓
NarrativeCompletion
  ├── ServiceScope
  ├── VisitProcessExplanation
  ├── EvidenceAnswer → null with 0 approved records
  └── ContinueUnderstanding
  ↓
HumanContactHandoff
  ├── Zalo — URL deferred
  └── Facebook Page — URL deferred
```

The previous symptom taxonomy, automatic service recommendation and booking paths are absent.

## Typography

- Be Vietnam Pro is the sans-first runtime workhorse for headings, body and controls.
- It is not claimed as the official brand font; that decision remains unlocked.
- Noto is not loaded or consumed by the public runtime.
- Headings use sentence case, readable Vietnamese leading and responsive measures rather than
  ceremonial display styling.

## Visual Grammar

- Public pages use calm warm surfaces, strong ink contrast and editorial unequal rhythm.
- Crimson/gold/wood tokens remain compatibility anchors and skin inputs, not verified official
  digital brand colors and not prestige-theatre permission.
- Public compositions avoid stock imagery as Toplink proof, repeated generic card grids, sticky
  conversion controls and decorative gradients.
- Information hierarchy precedes contact; action never outranks consequence or uncertainty.

## Layout and Semantics

- Every public page has one meaningful `h1` with logical `h2`/`h3` nesting.
- Removed booking sidebars, fixed mobile bars and header CTAs are fully reflowed; no compensation
  padding or empty aside remains.
- Desktop uses measured editorial columns; mobile becomes a natural single reading column.
- Interactive targets are at least 44px where the public interface expects direct touch.

## Motion

- Scrolling is native and public motion is bounded to opacity/transform behavior.
- Orientation state changes preserve user control and never simulate transport or success.
- `prefers-reduced-motion: reduce` reaches the final readable state without active animation.
- Motion-lab specimens are maintainer evidence only and are not production routes.

## Skins and Tokens

- `yvien`, `tet` and `an-tinh` remain supported runtime skins.
- M0R-JIT introduced zero aliases; corrected Humanizer roles use existing primitives or scoped
  component contracts.
- Tokens in `app-demo/styles/tokens.css` and `app-demo/styles/skins.css` remain runtime authority.
- A retained compatibility token is not automatically approved brand identity.

## Trust and Evidence

- Booking capability, booking UI, booking state and booking transport are absent.
- Production evidence count remains zero and evidence UI truly collapses.
- No staff, facility, review, price, duration, suitability, process or outcome is inferred.
- M3P remains **DEFERRED TO ADMIN** for future approved place, people, process and service facts.
- M4 is **DEPRECATED — REMOVED FROM TARGET PRODUCT**.

## Deferred Content

Source retained under `app-demo/deferred-content/` is not part of the static release graph. It may
be reviewed and migrated later, but it must not be treated as current public truth. This includes
space, service/article detail, product, training and partnership material.

## Accessibility Contract

- Keyboard focus is visible, skip navigation reaches `main`, and mobile navigation exposes state
  with `aria-expanded` and `aria-controls`.
- Text reflows at 375, 768, 1280 and 1440 widths and at a 200%-equivalent viewport without
  horizontal overflow.
- Touch targets, Vietnamese wrapping, contrast and reduced motion are release gates.
