# 18 — M2A1 Approval and Scope

## Decision

- **Authority:** `DEC-H6-CONSOLIDATED-01 / C3 — M2A1`
- **Predecessors:** M1C PASS; M0R-JIT PASS / NO-OP
- **Baseline:** `1f81e57976ad5a36f0487b5fe9f7a67e52b7b8be`
- **Rollback floor:** M2A0 `StaticOrientationShell`
- **Result:** guided local orientation replaces the static shell at `/`

## Production mutation boundary

Modified:

- `app-demo/app/page.tsx`;
- `app-demo/styles/home-humanizer.css`.

Created:

- `OrientationCore.tsx`;
- `OpeningQuestion.tsx`;
- `GuidedOrientation.tsx`;
- `ClearBoundary.tsx`;
- `ConsequenceBeforeAction.tsx`;
- `orientation-state.mjs`;
- `orientation-state.d.mts`;
- `orientation-state.test.mjs`.

`app-demo/data/content.ts` and `app-demo/lib/recommendation.ts` remain unmodified and unimported by
the corrected subtree. `StaticOrientationShell.tsx` and its CSS remain intact as the rollback floor.

## Authorized behavior

- bounded predefined ordinary-language options;
- equal first-class “Tôi chưa biết” option;
- editable “Khác” path;
- exact user wording retained in local state;
- specific empty/overlong recovery;
- boundary before review consequence;
- edit, remove, uncertainty and stop routes;
- focus movement to the changed state heading.

## Permanent exclusions

No diagnosis, Tắc/Hàn/Hư/Loạn classification, body-state taxonomy, service score, service match,
booking transport, evidence, person, facility, recipient, pending/sent/confirmed state or public
specimen control is present.

## Typography and semantic ownership

The corrected subtree uses `var(--font-sans)` and the M1C behavior contract. Its opening now computes
at `40px / 43.2px` on 375 CSS px (`line-height: 1.08`), replacing M2A0's recorded `0.99` leading.
M0R-JIT remains a no-op: corrected colors/states are component-local and consume existing
skin-aware primitives.

## Rollback

Revert the C3 commit to restore the unchanged M2A0 import/render. A release recovery must not restore
the older `HomeExperience` symptom → verdict → recommendation graph.
