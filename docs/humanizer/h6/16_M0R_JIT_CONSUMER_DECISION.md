# 16 — M0R-JIT Consumer Decision

## Decision

**PASS / NO-OP — runtime alias count `0`**

- **Authority:** `DEC-H6-CONSOLIDATED-01 / C2 — M0R-JIT`
- **Baseline:** `6d7c52f69aff48d6bfa7d40a9463f52e6226f8f4`
- **Candidate runtime owner:** `app-demo/styles/tokens.css`
- **Runtime mutation:** none

M2A0, planned M2A1 and planned M2B share one bounded stylesheet owner:
`app-demo/styles/home-humanizer.css`. Their corrected surface/text relations can remain local without
creating a site-wide API. No current need meets the threshold of two independent runtime owners,
and the existing primitives already encode the required accessibility invariants.

## Fresh role classification

| Corrected role           | Classification                     | Current/planned basis                                                  | Decision |
| ------------------------ | ---------------------------------- | ---------------------------------------------------------------------- | -------- |
| `surface.canvas`         | existing primitive                 | `--color-ivory`; skin-aware                                            | no alias |
| `surface.reading`        | component local                    | M2A/M2B reading fields in `home-humanizer.css`                         | no alias |
| `surface.response`       | component local                    | bounded orientation/evidence answer only                               | no alias |
| `surface.attention`      | deferred                           | legacy crimson is not calibrated target truth                          | no alias |
| `surface.evidence`       | component local                    | `EvidenceAnswer` only when an approved record exists                   | no alias |
| `text.primary`           | existing primitive                 | `--color-ink`                                                          | no alias |
| `text.secondary`         | existing primitive                 | `--color-ink-soft`                                                     | no alias |
| `text.muted`             | existing primitive                 | `--color-ink-mute`; not yet needed in corrected subtree                | no alias |
| `text.inverse`           | existing primitive                 | existing contrast primitives; no corrected dark consumer yet           | no alias |
| `text.action`            | class/state                        | corrected action classes may use existing color primitives per context | no alias |
| `text.context`           | component local                    | evidence/learning context                                              | no alias |
| `rule.subtle`            | existing primitive                 | `--color-sand` where a real divider is needed                          | no alias |
| `rule.structural`        | component local                    | layout/spacing, not a mandatory global color                           | no alias |
| `rule.context`           | component local                    | evidence/caption relationship                                          | no alias |
| `rule.focus`             | system accessibility invariant     | current `:focus-visible` rules and existing tokens                     | no alias |
| `rule.boundary`          | class/state                        | text plus local layout; never color-only                               | no alias |
| action roles             | class/state                        | native buttons plus M2A1/M2B scoped classes                            | no alias |
| selected/error/uncertain | class/state                        | semantic attributes, visible text and scoped CSS                       | no alias |
| spacing roles            | documentation only                 | composition contract in M1C/M2A/M2B                                    | no alias |
| typography roles         | existing primitive + documentation | `--font-sans` plus M1C role contract                                   | no alias |
| motion verbs             | documentation only                 | consumer-owned CSS/GSAP behavior                                       | no alias |

## Why the historical 13 remain absent

```text
candidate role
     |
     v
two independent live owners? ---- no ----> keep local/existing
     |
    yes
     v
calibrated across yvien/tet/an-tinh? ---- no ----> defer
     |
    yes
     v
add one bounded alias
```

The historical 13-value pool mostly renames existing palette primitives. Adding it now would expose
dormant globals, imply calibration that has not occurred and risk elevating inherited crimson/gold
values into Target Truth. M0R-JIT therefore chooses the smaller valid result: zero aliases.

## Rollback

There is no runtime rollback. Reverting this documentation decision would not change computed
styles. Any later alias requires a new consumer count, cross-skin equality proof and its own bounded
rollback.
