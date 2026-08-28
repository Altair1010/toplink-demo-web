# 03 — Exact Target Delta

- **Target:** locked `DEC-H5-GB-01`
- **Status:** `PROPOSED MIGRATION DELTA — NOT IMPLEMENTED`
- **Architecture change:** none approved or hidden in this map

## Delta strategy

The locked set contains 45 design roles. The runtime does **not** need 45 global custom
properties. The minimal implementation proposal is:

- **18 actual CSS semantic aliases** in a non-Tailwind `:root` bridge;
- **14 of those 18** initially resolve to existing runtime primitives;
- **4 of those 18** are new/calibrated aliases whose values remain batch inputs;
- **27 roles** remain component-private or documentation/state semantics.

Alias names use an `--h-` prefix and live outside `@theme`, so Tailwind does not generate another
global utility namespace. Existing palette tokens remain intact and skins continue to resolve the
primitive values at use time.

## Forty-five-role implementation map

Legend:

- `A` — new/calibrated CSS alias;
- `B` — CSS alias to an existing runtime primitive;
- `C` — component/private authored CSS or class contract;
- `D` — documentation/state semantic; no scalar CSS token.

| Target role                   | Class | Current primitive or condition                 | Proposed implementation                                                        | First consumers          | Batch    |
| ----------------------------- | ----- | ---------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------ | -------- |
| `surface.canvas`              | B     | `--color-cream`                                | `--h-surface-canvas: var(--color-cream)`                                       | Humanizer page ground    | M0/M2    |
| `surface.paper`               | B     | `--color-ivory`                                | `--h-surface-paper: var(--color-ivory)`                                        | reading field            | M0/M2    |
| `surface.paper-raised`        | C     | cards mix cream/ivory/shadow                   | private record variable; distinguish by rule before shadow                     | review/disclosure only   | M1/M2    |
| `surface.threshold`           | A     | current crimson; H4 used `#7b1f2a` locally     | `--h-surface-threshold`; current alias at M0, calibrated in M2                 | Cover Record             | M0/M2    |
| `surface.decision`            | C     | final CTA crimson/gold                         | component aliases threshold unless contrast proves a separate grounded neutral | Action Receipt           | M2       |
| `surface.evidence-neutral`    | C     | mist/cream/placeholder treatments              | private to real evidence unit; no public empty surface                         | Proof Index              | M3       |
| `text.primary`                | B     | `--color-ink`                                  | `--h-text-primary: var(--color-ink)`                                           | all Humanizer reading    | M0/M2    |
| `text.secondary`              | B     | `--color-ink-soft`                             | `--h-text-secondary: var(--color-ink-soft)`                                    | body/support             | M0/M2    |
| `text.muted`                  | B     | `--color-ink-mute`                             | `--h-text-muted: var(--color-ink-mute)`                                        | optional context         | M0/M2    |
| `text.inverse`                | B     | ivory/gold-200 vary by surface                 | `--h-text-inverse: var(--color-ivory)`; contrast test                          | threshold text           | M0/M2    |
| `text.action`                 | B     | crimson-600 links                              | `--h-text-action: var(--color-crimson-600)` initially                          | quiet links              | M0/M2    |
| `text.provenance`             | B     | ink-soft/mute metadata                         | `--h-text-provenance: var(--color-ink-soft)`                                   | evidence captions        | M0/M3    |
| `rule.subtle`                 | B     | `--color-sand`                                 | `--h-rule-subtle: var(--color-sand)`                                           | related record rows      | M0/M2    |
| `rule.structural`             | B     | sand/gold/ink-mute vary                        | `--h-rule-structural: var(--color-ink-mute)` initially                         | chapter boundaries       | M0/M2    |
| `rule.evidence`               | C     | gold frames/status chrome                      | private evidence binding rule, only when evidence exists                       | Proof Index              | M3       |
| `rule.focus`                  | A     | crimson on light, gold on dark                 | `--h-rule-focus`; calibrate both surface contexts                              | global/scoped focus      | M0/M1    |
| `rule.boundary`               | B     | crimson/sand warning dividers                  | `--h-rule-boundary: var(--color-crimson-700)` initially                        | Scope Boundary           | M0/M2    |
| `action.primary`              | A     | crimson/gold buttons                           | `--h-action-primary: var(--h-surface-threshold)`                               | one decision action      | M0/M2    |
| `action.secondary`            | B     | gold fill or border variants                   | `--h-action-secondary: var(--color-ink)`; anatomy stays private                | no-choice path           | M0/M2    |
| `action.quiet`                | B     | ink-soft/crimson links                         | `--h-action-quiet: var(--color-ink-soft)`                                      | edit/remove/back         | M0/M2    |
| `action.danger`               | D     | no required Humanizer destructive action       | reserve contract; create implementation only with a real destructive job       | none                     | deferred |
| `action.disabled`             | C     | opacity plus disabled attribute                | `.h-action:disabled`; reason remains visible                                   | Guided/Receipt           | M1/M2    |
| `state.selected`              | A     | crimson fill/gold/ivory text                   | `--h-state-selected: var(--h-action-primary)` plus pressed semantics           | phrase selection         | M0/M2    |
| `state.focus`                 | D     | duplicate of focus rule                        | semantic relationship to `rule.focus`; no second scalar alias                  | all controls             | M1/M2    |
| `state.pending`               | D     | booking `submitting`, no trustworthy transport | state contract and data attribute only when a real process exists              | future booking           | M4       |
| `state.error`                 | B     | `--color-accent-red`                           | `--h-state-error: var(--color-accent-red)` plus text/icon/recovery             | validation/failure       | M0/M2/M4 |
| `state.uncertain`             | D     | absent                                         | state copy/anatomy; neutral rule, never a yellow status token by default       | review/booking           | M2/M4    |
| `state.confirmed-future`      | D     | current false-success path                     | test/operation contract only; no CSS alias until M4 is approved and proven     | future booking           | M4       |
| `space.reading`               | C     | repeated `mt-*`, `space-y-*`                   | scoped rhythm in `.h-type-*`/primitive styles; calibrate against 18px body     | Humanizer typography     | M1       |
| `space.chapter`               | C     | `section-pad*` clamps                          | private chapter rhythm, not universal equal padding                            | chapter transitions      | M1/M2    |
| `space.evidence-interruption` | C     | no semantic equivalent                         | private to a real Proof Index; no empty global alias                           | Proof Index              | M3       |
| `space.compact-record`        | C     | card/list gaps                                 | private record gap; preserve label/touch clearance                             | scope/review rows        | M1/M2    |
| `space.action-receipt`        | C     | final CTA/form card gaps                       | private receipt grouping for consequence/recovery                              | Action Receipt           | M2       |
| `type.hero`                   | C     | `--text-hero` + Noto                           | `.h-type-hero` using Be Vietnam Pro 600                                        | Cover Record             | M1/M2    |
| `type.chapter`                | C     | statement token + mixed serif                  | `.h-type-chapter` using Be Vietnam Pro 600                                     | chapters                 | M1/M2    |
| `type.heading`                | C     | global h1/h2 serif, h3 sans                    | `.h-type-heading` using Be Vietnam Pro 600                                     | primitive headings       | M1/M2    |
| `type.body`                   | C     | Be Vietnam Pro body 18px/1.65                  | `.h-type-body`; retain baseline and measure                                    | reading                  | M1/M2    |
| `type.body-strong`            | C     | weight utilities                               | `.h-type-body-strong` using 500/600                                            | emphasis                 | M1/M2    |
| `type.utility`                | C     | mixed caps/serif utilities                     | `.h-type-utility`; sentence case by default                                    | labels/forms             | M1/M2    |
| `type.metadata`               | C     | 12–16px mixed metadata                         | `.h-type-metadata`; normally ≥16px public                                      | evidence/review metadata | M1/M3    |
| `type.action`                 | C     | button utilities                               | `.h-type-action` using Be Vietnam Pro 600                                      | all Humanizer actions    | M1/M2    |
| `motion.KHAI`                 | D     | Reveal/fade/GSAP scene names                   | component annotation/contract; reuse approved engine and CSS tempo             | Cover Record             | M2       |
| `motion.DAN` (`DẪN`)          | D     | state expand, connectors, scroll scenes        | component annotation; DOM/static relation is authoritative                     | Guided/Process           | M2/M3    |
| `motion.TU` (`TỤ`)            | D     | recommendation drawer/converge mechanics       | local state transition into editable review, not a global timing token         | Guided → Receipt         | M2       |
| `motion.AN` (`AN`)            | D     | toast/stamp/settle patterns                    | non-celebratory state settle; no scalar token                                  | Receipt/Continuation     | M2/M4    |

## Proposed alias bridge

M0 would add this category of block after `@theme` in `styles/tokens.css`; it is shown here as a
contract, not an authorized edit:

```css
:root {
  /* 18 --h-* aliases; existing --color-* and skin overrides remain untouched. */
}
```

No aliases are added to `@theme`; no new Tailwind color utilities are generated; no existing token
is deleted. `skins.css` remains unchanged because `var(--color-*)` is resolved when the semantic
alias is consumed.

## Threshold color calibration proposal

M0 preserves current appearance by resolving threshold aliases through current crimson. M2 may
approve an exact anchor only after screenshot and contrast calibration.

WCAG contrast ratios from the current candidate set:

| Candidate                | On ivory `#fffcf7` | On cream `#f6f4df` | With inverse `#f7e8c2` | Reading                                                  |
| ------------------------ | -----------------: | -----------------: | ---------------------: | -------------------------------------------------------- |
| current anchor `#95131f` |             8.58:1 |             7.92:1 |                 7.23:1 | strongest current brand continuity                       |
| H4 candidate `#7b1f2a`   |             9.90:1 |             9.14:1 |                 8.34:1 | calmer/darker threshold; preserves H4 signature behavior |
| current dark `#7e0a15`   |            10.57:1 |             9.75:1 |                 8.90:1 | highest contrast, risk of over-grounding                 |

Additional references: current error `#c70002` is 5.98:1 on ivory; ink is 17.82:1 and ink-soft is
8.66:1 on ivory.

**M2 calibration proposal:** use `#7b1f2a` as the threshold/action candidate, not as an H5 fact.
Accept it only if:

1. HP-01/HP-07 remain the only warm threshold bands;
2. inverse text, focus and selected states pass contrast at real weights;
3. error remains distinguishable through wording/icon/rule, never color alone;
4. uncertainty uses explicit neutral copy rather than another warm status color;
5. visual comparison shows stronger paper/ink dominance than current runtime;
6. yvien continuity is acceptable and skin behavior is not silently redefined.

If rejected, M2 may keep `#95131f`; the semantic system does not depend on `#7b1f2a`.

## Typography migration map

| Current consumer                  | Target                              | Batch                | Visual risk                       | Retirement condition                      |
| --------------------------------- | ----------------------------------- | -------------------- | --------------------------------- | ----------------------------------------- |
| H5/Humanizer homepage surfaces    | scoped `.h-type-*` Be Vietnam roles | M1/M2                | Vietnamese wraps/measure          | component screenshots + zoom pass         |
| Global `h1,h2,.heading-font`      | route-by-route Be Vietnam roles     | M5 expansion, not M1 | all route headings reflow         | every route migrated and reviewed         |
| `.font-serif-display`             | scoped replacements per consumer    | M2 then M5           | decorative labels/numerals change | zero explicit class matches               |
| `--font-display`, `--font-serif`  | compatibility aliases remain        | M5                   | fallback/loading regression       | zero authored/runtime consumers           |
| `Noto_Serif` load in `layout.tsx` | remove only after all above         | M5                   | font payload and layout shift     | 0 consumer sites + build/perf/visual pass |

M1 therefore adds scoped classes only. It does not rewrite the global heading selector or unload
Noto.

## Homepage current→target map

| Current surface        | Target disposition                      | Target primitive/job                                             | Safe now                                                     | Must wait                                                                  |
| ---------------------- | --------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `HomeHero`             | **REPLACE**                             | Cover Record / orient with bounded threshold and no-choice start | structure and generic truthful purpose                       | verified identity/place/arrival facts (ED-01/03)                           |
| `BodySignalInterface`  | **REPLACE, preserve user-language job** | Guided Intake / editable familiar phrase                         | local phrase select/edit/remove/reset and minimization cue   | final phrase inventory/health copy (ED-02)                                 |
| `BodyMap`              | **RETIRE LATER**                        | none                                                             | omit from target                                             | no replacement unless future evidence gives a real job                     |
| `BodyStatePanel`       | **REPLACE**                             | Scope Boundary                                                   | explicit “prepares conversation, not conclusion”; no network | approved scope/escalation language (ED-02/05/06)                           |
| `FourBodyStates`       | **RETIRE LATER**                        | none                                                             | omit `Tắc/Hàn/Hư/Loạn` output                                | no automatic target equivalent                                             |
| `RecommendationDrawer` | **REPLACE**                             | editable review within Action Receipt                            | exact local wording, edit/back, `UNCERTAIN`, zero transport  | service/recipient/send behavior (ED-05/06)                                 |
| `RitualTimeline`       | **OMIT UNTIL EVIDENCE**                 | Visit / Process Record                                           | remove from new narrative; do not build empty public shell   | ED-07 verified process, ED-04 roles, ED-08 documentary context             |
| `SpaceAsTherapy`       | **OMIT UNTIL EVIDENCE**                 | Proof Index/place evidence where justified                       | omit/restructure with a neutral narrative bridge             | ED-03/08 real place/material evidence                                      |
| `HomeFinalCTA`         | **REPLACE**                             | Action Receipt + Quiet Continuation                              | local review/no-send state and low-pressure continuation     | verified channel/owner/provider/operation (ED-01/06); ED-09 FAQ population |

This is not one-to-one component renaming. Current body-state logic and ritual/space claims are not
reused as target business meaning.

## Evidence-blocked surfaces

| Surface                      | Eligibility              | What can be implemented safely now                                         | What must wait                                 |
| ---------------------------- | ------------------------ | -------------------------------------------------------------------------- | ---------------------------------------------- |
| Cover Record                 | conditional              | layout, threshold behavior, generic purpose, no-choice path                | ED-01/03 facts/assets                          |
| Guided Intake                | ready with calibration   | local reducer, edit/remove/reset, privacy minimization, boundary link      | ED-02 final phrases and health review          |
| Scope Boundary               | conditional              | generic non-diagnostic contract                                            | ED-02/05 specific Toplink scope/escalation     |
| Proof Index                  | blocked by real evidence | no public empty component; document interface only                         | ED-01/03/04/07/08 permitted evidence           |
| Service Scope Register       | blocked by real evidence | omit; retain verified generic navigation only                              | ED-02/05 service register and current facts    |
| Visit / Process Record       | blocked by real evidence | omit; do not render mock sequence                                          | ED-04/07/08 verified roles/process/material    |
| Action Receipt, local review | ready with calibration   | exact editable summary, request-vs-confirmation, zero network, uncertainty | recipient/channel/send/handoff (ED-01/05/06)   |
| Quiet Continuation           | conditional              | verified navigation; low-pressure close                                    | ED-02/09 reviewed FAQ/knowledge and provenance |

Current root JSON-LD in `app-demo/app/layout.tsx` serializes mock contact, address, hours, price and
service facts. M3 must either omit that graph as a separately approved trust-sanitation delta or
repopulate it only after ED-01/05 evidence; leaving it outside the consumer graph is not acceptable.

## Booking delta — separate critical batch

Current `/dat-lich` cannot truthfully enter `SENDING`, `HUMAN HANDOFF` or `CONFIRMED`. A future M4
would have to replace the timer/iframe success inference with a real result contract, define data
controller/recipient/channel/retention, protect retry/idempotency, implement failure/uncertainty,
and prove handoff end to end.

No provider is selected. No integration path can be approved until ED-06 and separate
security/privacy/operations decisions exist.

**M4 BOOKING TRANSPORT: `BLOCKED — SEPARATE EXPLICIT APPROVAL REQUIRED`.**

## Architecture and dependency delta

- Framework, static export, deployment, basePath, motion engine and native scroll: no change.
- No new runtime or development dependency is proposed.
- M2 may add scoped components and a pure local reducer/test, which is application structure, not a
  rendering/data architecture change.
- Any booking provider, backend, persistence, analytics or data retention design is a future
  architecture proposal requiring separate approval.
