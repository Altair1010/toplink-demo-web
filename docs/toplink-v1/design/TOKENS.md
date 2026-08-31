# Direction C Token Authority

**Status:** LOCKED FOR P4 except rows marked `CONDITIONAL`.  
**Naming:** semantic role first; components consume roles, never raw palette names.

## Color roles

| Token | Value | State | Role |
|---|---|---|---|
| `--color-surface-reading` | `#f3e9d8` | LOCKED | Primary warm reading field |
| `--color-surface-muted` | `#e2d3bc` | LOCKED | Secondary court / grouped reading |
| `--color-ink-strong` | `#211719` | LOCKED | Primary text and darkest threshold |
| `--color-ink-muted` | `#5d504b` | LOCKED | Supporting text on light fields |
| `--color-rule` | `#857267` | LOCKED | Structural joinery/rules |
| `--color-focus` | `#176b70` | LOCKED | 3px keyboard focus ring; functional, not decorative |
| `--color-identity-anchor` | `#722436` | CONDITIONAL DEFAULT | Wine/cinnabar chapter anchor; may tune to real identity/material evidence |
| `--color-identity-metal` | `#b48a54` | CONDITIONAL DEFAULT | Sparse metal accent on dark thresholds; never small text on light fields |
| `--color-material-plane` | `#d5c3a9` | CONDITIONAL DEFAULT | Abstract placeholder plane, not real Toplink material |

Conditional color override may alter hue/value only after contrast is rechecked. It may not create a
new semantic role or invert the light/dark chapter system.

## Type tokens

Use the exact family, scale, weight and line-height contract in `TYPE-SYSTEM.md`:

```css
--font-display: "Alegreya", Georgia, serif;
--font-body: "IBM Plex Sans", system-ui, sans-serif;
--type-display-hero: clamp(3rem, 7vw, 7.25rem);
--type-display-page: clamp(2.75rem, 6vw, 5.75rem);
--type-heading-1: clamp(2rem, 4vw, 4.25rem);
--type-heading-2: clamp(1.5rem, 2.4vw, 2.5rem);
--type-body-lg: clamp(1.0625rem, 0.95rem + 0.45vw, 1.25rem);
--type-body: 1rem;
--type-utility: 0.9375rem;
--type-note: 0.875rem;
```

## Spacing and layout

| Group | Locked tokens |
|---|---|
| Base spacing | `--space-1: .25rem`, `2: .5rem`, `3: .75rem`, `4: 1rem`, `5: 1.5rem`, `6: 2rem` |
| Chapter spacing | `--space-7: 3rem`, `8: 4rem`, `9: 6rem`, `10: 8rem` |
| Gutters | `--gutter: clamp(1.25rem, 4vw, 4rem)` |
| Reading width | `--measure-reading: 44rem` |
| Content width | `--measure-content: 76rem` |
| Wide frame | `--measure-wide: 90rem` |
| Section block | `--section-space: clamp(4rem, 9vw, 8rem)` |

Use the scale before introducing component-local gaps. Asymmetric indentation may use 12%, 18% or
24% only at `>= 80rem`, and must collapse at tablet/mobile.

## Shape, border and elevation

- `--radius-structural: 0` — LOCKED.
- `--radius-control: 0.125rem` — LOCKED; controls only.
- `--border-hairline: 1px` and `--border-emphasis: 3px` — LOCKED.
- `--shadow-none: none` — default LOCKED posture.
- `--shadow-focus: 0 0 0 3px var(--color-focus)` — LOCKED focus treatment.

Depth comes from nested planes, compression/release and line hierarchy, not floating cards.

## Density classes

- `density-ceremonial`: large chapter spacing, short copy, one dominant thesis.
- `density-reading`: 44rem measure, body rhythm, minimal ornament.
- `density-evidence`: tighter metadata rows but body-size facts and clear separators.
- `density-utility`: compact route intro, direct controls, no decorative chamber nesting.

Each class is a layout contract, not a utility class name requirement.

## Breakpoint logic

- Base/mobile: one column, linear procession, flattened portals, no indentation.
- `48rem`: paired courts and evidence rows may become two columns.
- `80rem`: processional asymmetry and wider gateway geometry become eligible.
- Components use intrinsic wrapping/clamp before adding another breakpoint.
- Required proof widths remain 375, 768, 1280 and 1440; no horizontal overflow.

## State tokens

```css
--state-hover-alpha: 0.08;
--state-disabled-opacity: 0.48;
--state-focus-width: 3px;
--state-pending-style: dashed;
```

Pending is not a disabled fake action: omit the action or render a clearly non-interactive factual
status. Hover never carries essential information. Motion tokens live in `MOTION.md`.

## Override slots

P4 must isolate the conditional defaults behind `identity.anchor`, `identity.metal`,
`material.plane`, `logo.*`, `ornament.asset` and `media.treatment` slots. Real inputs may override
those slots only through `ASSET-INTEGRATION-CONTRACT.md`. All other tokens are locked.
