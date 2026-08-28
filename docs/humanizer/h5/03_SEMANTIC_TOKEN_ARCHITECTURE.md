# 03 — Semantic Token Architecture

- **Status:** `PROPOSED FOR GATE B`
- **Count:** **45 human-facing semantic tokens**
- **Value status:** semantic roles and relationships are proposed for lock; exact color hex, duration and breakpoint values remain migration calibration inputs unless explicitly stated.
- **Runtime mutation:** none

## Layer model

```text
raw implementation primitives (private)
        ↓ alias
45 Humanizer semantic tokens (public design API)
        ↓ consume
editorial primitives and states
```

Raw ramps may remain implementation details for compatibility, but new Humanizer components should not expose palette names such as `crimson-600`, `gold-500` or H4-local values as their design contract. A semantic token exists only when it has a reusable job.

## Token inventory

### Surface — 6

| Token                      | Semantic job                                                                                              | Candidate relationship; not a final raw value                                                  |
| -------------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `surface.canvas`           | site/page ground behind chapters                                                                          | warm, low-chroma field; closest current source may be `cream`, subject to contrast calibration |
| `surface.paper`            | dominant long-reading field                                                                               | light warm neutral; closest current source may be `ivory`                                      |
| `surface.paper-raised`     | contained review/disclosure above paper                                                                   | distinguish by lightness/rule, not default shadow/card treatment                               |
| `surface.threshold`        | rare HP-01 warm entry event                                                                               | deep warm crimson behavior; exact H4/current crimson is not locked                             |
| `surface.decision`         | grounded HP-07 action/consequence field                                                                   | may alias threshold or a darker neutral after contrast testing; not a third decorative accent  |
| `surface.evidence-neutral` | neutral context for truthful evidence/proof absence in internal tools and calm proof framing in public UI | warm neutral; public UI must not render a placeholder just because this token exists           |

### Text — 6

| Token             | Semantic job                           | Constraint                                                          |
| ----------------- | -------------------------------------- | ------------------------------------------------------------------- |
| `text.primary`    | headings and main reading              | highest normal contrast on paper/canvas                             |
| `text.secondary`  | supporting explanation                 | WCAG-compliant; never faded fashion copy                            |
| `text.muted`      | optional/de-emphasized public context  | may collapse responsively before primary meaning; still readable    |
| `text.inverse`    | text on threshold/decision             | contrast-tested against every allowed dark surface                  |
| `text.action`     | quiet links and actionable text        | action remains identifiable without color alone                     |
| `text.provenance` | minimum useful public evidence context | normally at least 16px; not museum microtext or ornamental metadata |

### Border / rule — 5

| Token             | Semantic job                              | Constraint                                                                        |
| ----------------- | ----------------------------------------- | --------------------------------------------------------------------------------- |
| `rule.subtle`     | separate related rows without card chrome | may not become a hairline texture across the page                                 |
| `rule.structural` | chapter/record boundary                   | stronger than subtle; expresses real hierarchy                                    |
| `rule.evidence`   | bind evidence to its caption/context      | cannot imply verification by itself                                               |
| `rule.focus`      | visible keyboard focus                    | high contrast on light and dark surfaces; minimum treatment remains repo baseline |
| `rule.boundary`   | health/scope/uncertainty limit            | accompanied by heading/text/icon as needed; never color-only                      |

### Action — 5

| Token              | Semantic job                                       | Constraint                                                                 |
| ------------------ | -------------------------------------------------- | -------------------------------------------------------------------------- |
| `action.primary`   | one main next step in a decision context           | threshold-family fill only when consequence is clear                       |
| `action.secondary` | valid alternative/no-choice route                  | comparable legibility and target size; not visually hidden                 |
| `action.quiet`     | edit, remove, back, disclosure                     | text/rule treatment; still visibly interactive                             |
| `action.danger`    | genuinely destructive or irreversible local action | reserved; not used for ordinary error copy or urgency                      |
| `action.disabled`  | unavailable action                                 | not focusable/submit-capable as appropriate; reason remains understandable |

### State — 6

| Token                    | Semantic job                                     | Constraint                                                                          |
| ------------------------ | ------------------------------------------------ | ----------------------------------------------------------------------------------- |
| `state.selected`         | user-selected editable choice                    | label/pressed semantics plus visual treatment                                       |
| `state.focus`            | current keyboard focus                           | aliases `rule.focus`; never removed for aesthetics                                  |
| `state.pending`          | real transport/process pending                   | only while an actual process is active; no fake spinner/live status                 |
| `state.error`            | validation/submission failure                    | includes specific message and recovery; no color-only meaning                       |
| `state.uncertain`        | owner/channel/availability/suitability not known | uncertainty stated plainly; offers only verified alternatives                       |
| `state.confirmed-future` | future successful transport + defined handoff    | **FUTURE CONTRACT**; must not be used until ED-06 and implementation tests prove it |

### Spacing — 5

| Token                         | Semantic job                                   | Relationship principle                                              |
| ----------------------------- | ---------------------------------------------- | ------------------------------------------------------------------- |
| `space.reading`               | paragraph/heading/list rhythm                  | compact enough for continuity, generous enough for 18px+ body       |
| `space.chapter`               | major narrative transition                     | largest rhythm; varied by chapter role, not repeated metronomically |
| `space.evidence-interruption` | separate proof from surrounding interpretation | visually noticeable pause without decorative emptiness              |
| `space.compact-record`        | related fact/scope rows                        | tighter than reading, but never crowds labels or touch targets      |
| `space.action-receipt`        | review/consequence/recovery grouping           | makes current consequence and recovery scannable                    |

### Type — 8

| Token              | Role                                 | Target behavior                                                              |
| ------------------ | ------------------------------------ | ---------------------------------------------------------------------------- |
| `type.hero`        | one bounded opening thought          | Be Vietnam Pro 600; responsive display; sentence case; no clipped diacritics |
| `type.chapter`     | chapter anchor                       | Be Vietnam Pro 600; clear transition below hero scale                        |
| `type.heading`     | primitive/record heading             | Be Vietnam Pro 600; direct, short and scannable                              |
| `type.body`        | primary reading                      | Be Vietnam Pro 400; ≥18px production baseline; line-height about 1.55–1.7    |
| `type.body-strong` | meaningful emphasis                  | Be Vietnam Pro 500/600; not a substitute for heading structure               |
| `type.utility`     | short label/navigation/form helper   | Be Vietnam Pro 500/600; sentence case by default                             |
| `type.metadata`    | permitted source/role/update context | Be Vietnam Pro 400/500; normally ≥16px public; progressive disclosure        |
| `type.action`      | buttons/links                        | Be Vietnam Pro 600; verb/consequence first; no artificial urgency            |

### Motion — 4

| Token         | Semantic job                          | Default behavior                                                              | Reduced motion                                                 |
| ------------- | ------------------------------------- | ----------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `motion.KHAI` | open a major chapter/threshold        | one restrained opacity/transform or mask event; content available immediately | render final open state with no animation                      |
| `motion.DAN`  | explain relationship/progress (`DẪN`) | local rule/progress/disclosure movement tied to a real sequence               | static rule, labels and DOM order convey the same relationship |
| `motion.TU`   | converge input into review (`TỤ`)     | preserve identity of selected phrase/context into editable summary            | immediate state replacement with focus/announcement continuity |
| `motion.AN`   | settle state/consequence (`AN`)       | short non-celebratory settle; no confetti/checkmark theatre                   | immediate stable state                                         |

ASCII-safe implementation aliases `DAN` and `TU` may be used in code, while design documentation and visitor language retain **DẪN** and **TỤ**.

## Typography recommendation

Keep the already-loaded **Be Vietnam Pro** for every target role. H4 demonstrated Vietnamese-safe sans-first hierarchy with the existing family, so adding Source Sans 3, Literata or another family has no evidenced benefit large enough to justify loading, licensing review, visual regression or dependency cost. Noto Serif may remain in Runtime Truth until migration, but it is not a target role requirement.

### Scale and measure principles

- Hero/chapter sizes use bounded fluid scaling with a content-tested minimum and maximum; exact H4 clamps are not tokens.
- Mobile scale is chosen by Vietnamese line breaks and accent clearance, not viewport math alone.
- Body measure prefers 55–72 characters; narrower support copy may be shorter, never forced into newspaper columns.
- Hero leading is compact but must clear stacked diacritics; chapter/heading leading is tighter than body without collision.
- 200% zoom retains DOM order, visible labels, natural reflow and no horizontal content scrolling.

## Color and material calibration rules

1. Threshold behavior is approved input; current `#95131f`, H4 `#7b1f2a` and any other sampled crimson are **calibration candidates**, not locked H5 values.
2. Select final pairs by contrast and role differentiation across paper, canvas, threshold, decision, focus, selected, error and uncertainty states.
3. A single threshold family should serve warm event/action roles where possible; do not rebuild a large public palette ramp merely for token symmetry.
4. Gold and jade remain legacy/runtime primitives, not Humanizer requirements. Physical evidence may later justify a separate material decision, not implicit reuse.
5. Texture and physical motifs remain deferred until ED-03/08 supplies real Toplink evidence.

## Current-runtime alias bridge — proposed only

| H5 semantic                            | Likely current starting point                  | Required migration check                                                                        |
| -------------------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `surface.canvas` / `surface.paper`     | `--color-cream` / `--color-ivory`              | recalibrate proportion and contrast; do not rename blindly                                      |
| `surface.threshold` / `action.primary` | current crimson family                         | choose exact anchor after pairwise contrast and screenshot review                               |
| `text.primary` / `text.secondary`      | `--color-ink` / `--color-ink-soft`             | verify on every target surface and at actual font weights                                       |
| `rule.*`                               | sand/mist/ink-derived colors                   | reduce decorative gold rule use; prove hierarchy in grayscale                                   |
| `type.*`                               | `--font-sans` / Be Vietnam Pro                 | migrate target heading consumers away from serif only after Gate B + Migration Gate             |
| `motion.*`                             | current duration/ease primitives + GSAP config | retain engine; map verbs to allowed choreography rather than exposing duration names as meaning |

## Token hygiene and non-goals

- These 45 names are the proposed human-facing API, not a command to delete every compatible raw token in one migration.
- Raw ramps, radii, shadows, z-index, component anatomy and responsive implementation values remain private implementation concerns unless a recurring semantic job emerges.
- No H5 token encodes ED codes, H4 placeholders, archive appearance, physical motifs or a backend state that does not exist.
- Final CSS custom-property naming and alias placement belong to the later approved Migration Map implementation.
