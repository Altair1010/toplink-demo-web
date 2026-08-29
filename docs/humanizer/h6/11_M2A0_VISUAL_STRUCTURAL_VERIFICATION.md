# 11 — M2A0 Visual and Structural Verification

## Test-first source evidence

The pre-change assertion failed for all expected reasons: `page.tsx` still used `HomeExperience`,
and the new component/CSS owner did not exist. The post-change UTF-8 assertion passes:

- no `HomeExperience` import/render in `page.tsx`;
- `StaticOrientationShell` is present;
- no `"use client"`, form, button, input, reducer/state, fetch, timer or storage use;
- all approved safety copy is present;
- CSS import is present;
- no global `:root`, `[data-brand]` or bare element selector;
- local `var(--font-sans)` contract is present.

## Browser and responsive matrix

| Check | Result |
| --- | --- |
| 375 / 768 / 1280 / 1440 | PASS; no horizontal overflow |
| 200%-equivalent at 384 CSS px | PASS; no overflow or clipped Vietnamese |
| Opening / Boundary / Consequence order | PASS |
| Forms / fake controls in shell | `0 / 0` |
| Mutating requests on reload | `0` |
| Reduced motion | PASS; all static information remains visible |
| Console errors / warnings | `0 / 0` in final clean dev session |

Computed font for the opening question, boundary lead and consequence statement is:

`"Be Vietnam Pro", "Be Vietnam Pro Fallback", "Segoe UI", system-ui, sans-serif`.

No Noto Serif is inherited inside M2A0. The shell uses semantic section + H2 reading order and no
unnecessary ARIA grouping or fake interactive semantics.

## Skin checks

| Skin | Layout/font | Minimum measured local contrast |
| --- | --- | ---: |
| default / `yvien` | PASS / sans | `7.51:1` |
| `tet` | PASS / sans | `7.51:1` |
| `an-tinh` | PASS / sans | `7.54:1` |

The calibration is neutral: canvas from `--color-ivory`, text from `--color-ink`/`--color-ink-soft`
and one consequence field mixed locally from those primitives. No red, gold, gradient, shadow,
paper/archive metaphor or final target color is introduced.

## Composition / H4R-C review

The first browser review found Boundary and Consequence too physically similar. The bounded fix
removed the Boundary panel and reduced the oversized opening void. Final independent re-review:

- Opening: large question with offset contextual answer;
- Boundary: narrower, unboxed clarification with its limit offset;
- Consequence: the only contained tonal state field, with state visually before permission;
- mobile retains those differences;
- Q/A metronome, administrative chrome and archive relapse are absent;
- grayscale signature and relational warmth pass.

## Sen structural audit

**Verdict: PASS WITH BOUNDED M2B DEBT.** Orientation now precedes service choice, and the shell fits
between the existing hero and downstream narrative without making a service decision. It is not a
three-card explainer. Existing header/final conversion pressure and the missing verified
place/people/service relationship were not introduced by M2A0 and remain later M2B/M3S-2 debt.
No Sen palette, type, geometry, image or motif was transferred.

## Adversarial passes

- Health/trust: PASS within the explicit four-path delta; no diagnosis, match, fact or send claim.
- Visual/Humanizer: PASS after the unequal-composition correction.
- Structure/Sen: PASS with bounded downstream debt.
- Engineering/a11y: PASS after removing two redundant generic-div `aria-label` attributes and an
  accidental browser-assertion scratch file.

Adjacent legacy hero/process/space/action claims and red/gold/serif/card treatments remain visible
and are recorded, not silently approved. The master task explicitly forbids changing them here.

## Screenshot evidence

Before: `before-home-{375,768,1280,1440}.png`.

After: `after-m2a0-{375,768,1280,1440}.png` and `after-m2a0-200pct.png` under
`docs/humanizer/h6/screenshots/m2a0/`.
