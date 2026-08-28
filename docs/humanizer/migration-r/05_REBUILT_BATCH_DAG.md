# 05 — Rebuilt Batch DAG

## Full rebuilt migration DAG

Actual source corrects the candidate graph in one important way: machine-readable sanitation does
not depend on homepage completion and may proceed independently.

```text
DEC-H5R-GBR-01 LOCKED
        |
        +--------------------+-----------------------+----------------------+
        |                    |                       |                      |
        v                    v                       v                      v
 M0R semantic bridge   M1 scoped sans         M3S-1 machine       M3S-B booking
 CONDITIONAL           CONDITIONAL             sanitation READY    sanitation READY
        |                    |                       |                      |
        +----------+---------+                       |                      |
                   |                                 |                      |
                   v                                 |                      |
            M2A0 STATIC SAFE SHELL                    |                      |
            CONDITIONAL                              |                      |
                   |                                 |                      |
                   v                                 |                      |
            M2A1 GUIDED ORIENTATION                  |                      |
            CONDITIONAL                              |                      |
                   |                                 |                      |
                   v                                 |                      |
            M2B NARRATIVE COMPLETION                 |                      |
            CONDITIONAL                              |                      |
                   |                                 |                      |
                   +------------+--------------------+----------------------+
                                v
                     M3S-2 RENDERED/METADATA
                     SPLIT / CONDITIONAL

M0R does not cause M1. M2A requires either approved M1 or an exact M2A-local sans contract; M0R may
be consumed only after named H4R-C/default/skin calibration is approved.
```

## Deferred evidence branch

```text
DE-01 PLACE
DE-02 PERSON / ROLE
DE-03 PROCESS / SERVICE
DE-04 REVIEWED SERVICE FACT
        |
        v
ADMIN VERIFIES RELATIONSHIP + PROVENANCE
        + PERMISSION / CONSENT + APPROVED REVIEW
        |
        v
M3P REAL EVIDENCE POPULATION
DEFERRED CONTENT / REALITY DEBT
        |
        +--> approved record --> contextual Evidence Answer
        `--> absent/unapproved -> true collapse

This branch does not block M0R, M1, M2A, M3S-1 or M3S-B.
```

## Blocked booking branch

```text
ENDPOINT / PROVIDER + RECEIVING OWNER
DATA MINIMIZATION + PRIVACY + SECURITY
TIMEOUT / RETRY / IDEMPOTENCY / HANDOFF
MONITORING + REAL CONFIRMED E2E
        |
        v
M4 BOOKING TRANSPORT
BLOCKED — SEPARATE FUTURE APPROVAL

Until then: local orientation / review / uncertain / no-send disclosure only. Failure/retry may
exist only as an unreachable internal specimen until a real fallible operation exists.
```

## Cleanup DAG

```text
CORRECTED BATCH IMPLEMENTED
        |
        v
VERIFY ROUTE / STATE / A11Y / VISUAL / NETWORK
        |
        v
EXACT LEGACY CONSUMER COUNT = 0?
   no ------------------------> KEEP COMPATIBILITY + ROLLBACK
   yes
    |
    +--> M5A old homepage cleanup
    +--> M5B Noto retirement
    +--> M5C old token/skin/component cleanup
    `--> M5D DESIGN.md + Runtime Truth rebaseline [last]
```

## Readiness register

| Batch     | Status                                 | Reason                                                                                       |
| --------- | -------------------------------------- | -------------------------------------------------------------------------------------------- |
| M0R       | **CONDITIONAL**                        | exact 13-candidate pool; immediate set 0 until a named calibrated consumer                   |
| M1        | **CONDITIONAL**                        | exact scoped owner, but no standalone consumer/value; pair only with a named route/component |
| M2A0      | **CONDITIONAL**                        | exact static safe shell; requires reviewed structural copy and local visual calibration      |
| M2A1      | **CONDITIONAL AFTER M2A0**             | guided state; requires M1 or exact local sans contract and keeps M2A0 as rollback floor      |
| M2B       | **CONDITIONAL AFTER M2A**              | structure may exist without evidence, but rendered facts/learning destinations remain gated  |
| M3S-1     | **READY FOR HUMAN MIGRATION APPROVAL** | four exact JSON-LD emitters; omission is safe and bounded                                    |
| M3S-B     | **READY FOR HUMAN MIGRATION APPROVAL** | exact booking false-success boundary; fail-closed local state; M4 stays blocked              |
| M3S-2     | **CONDITIONAL / SPLIT REQUIRED**       | rendered claims need per-family replacement or true collapse                                 |
| M3P       | **DEFERRED CONTENT**                   | admin population after private opening; not a UI-design blocker                              |
| M4        | **BLOCKED OPERATIONALLY**              | provider, recipient, architecture, privacy, security, recovery and monitoring unresolved     |
| M5A/B/C/D | **DEFERRED CLEANUP**                   | requires successful migration and zero-consumer proof                                        |

## Exact file delta per batch

### M0R

```text
PATH: app-demo/styles/tokens.css
ACTION: CONDITIONAL / NO CHANGE UNTIL NAMED CONSUMER
PURPOSE: add only the calibrated subset required by the approved consumer
TARGET: H5R functional role model
CURRENT: raw palette primitives; no --h-* aliases
DELTA NOW: 0 aliases; future subset selected from the exact 13-candidate pool
RISK: legacy crimson/cream/ink/sand and skin remaps could become accidental target calibration
VERIFY: first approve named H4R-C/default/skin calibration; then computed equality, utility count and full static gate
ROLLBACK: detach the named consumer, then remove only its bounded alias subset
```

**Consumption lock:** no `--h-*` alias is created or consumed until the target value relationship is
approved across default, `tet` and `an-tinh`; M0R is CONDITIONAL and just-in-time.

### M1

```text
PATH: app-demo/styles/typography.css
ACTION: MODIFY
PURPOSE: scoped sans-first VX-02 classes
TARGET: Vietnamese-safe Q/A hierarchy
CURRENT: Noto global h1/h2 and 55 consumer sites; Be Vietnam Pro already loaded
DELTA: scoped classes only; consumer adoption belongs to M2A/M2B
RISK: dormant API or later line-wrap drift
VERIFY: format/token/static now; browser matrix with first consumer
ROLLBACK: while unused, remove scoped block; after adoption first move consumers to equivalent local
sans declarations or roll back M1 atomically with the consumer
```

### M2A0 — static safe shell

```text
MODIFY app-demo/app/page.tsx
MODIFY app-demo/app/globals.css
CREATE app-demo/styles/home-humanizer.css
CREATE app-demo/components/home-experience/corrected/StaticOrientationShell.tsx

PURPOSE: replace the unsafe body-verdict/recommendation route with a static truthful floor
TARGET: Opening Question + Clear Boundary + static uncertainty/no-send/stop disclosure
CURRENT: SYMPTOMS -> body taxonomy -> ranked SERVICES
DELTA: no interaction, inference, transport or factual branch
RISK: copy/hierarchy/mobile regression
VERIFY: full browser/a11y/network matrix; reviewed structural copy; unequal static composition
ROLLBACK: revert M2A0 only before release; after release never reactivate unsafe inference
```

### M2A1 — guided orientation

```text
MODIFY app-demo/app/page.tsx
MODIFY app-demo/styles/home-humanizer.css
CREATE app-demo/components/home-experience/corrected/OrientationCore.tsx
CREATE app-demo/components/home-experience/corrected/OpeningQuestion.tsx
CREATE app-demo/components/home-experience/corrected/GuidedOrientation.tsx
CREATE app-demo/components/home-experience/corrected/ClearBoundary.tsx
CREATE app-demo/components/home-experience/corrected/ConsequenceBeforeAction.tsx
CREATE app-demo/components/home-experience/corrected/orientation-state.mjs
CREATE app-demo/components/home-experience/corrected/orientation-state.d.mts
CREATE app-demo/components/home-experience/corrected/orientation-state.test.mjs
READ app-demo/data/content.ts
READ app-demo/lib/recommendation.ts

PURPOSE: replace the body-verdict/recommendation path with editable, bounded local orientation
TARGET: four M2A primitives; consequence before action
CURRENT: tested M2A0 `StaticOrientationShell`
DELTA: new isolated state owner and guided composition; old source retained for M5A
RISK: health inference, copy, focus/order, mobile and false-send regression
VERIFY: reducer tests + full browser/state/network matrix; computed font is sans; forbidden display
classes and production specimen controls absent; exchanges remain unequal at desktop/mobile
ROLLBACK: page switch exactly to retained M2A0 `StaticOrientationShell`; keep shared stylesheet
```

### M2B

```text
MODIFY app-demo/app/page.tsx
MODIFY app-demo/styles/home-humanizer.css
CREATE app-demo/components/home-experience/corrected/NarrativeCompletion.tsx
CREATE app-demo/components/home-experience/corrected/ServiceScope.tsx
CREATE app-demo/components/home-experience/corrected/VisitProcessExplanation.tsx
CREATE app-demo/components/home-experience/corrected/ContinueUnderstanding.tsx
CREATE app-demo/components/home-experience/corrected/EvidenceAnswer.tsx
CREATE app-demo/components/home-experience/corrected/evidence-visibility.mjs
CREATE app-demo/components/home-experience/corrected/evidence-visibility.d.mts
CREATE app-demo/components/home-experience/corrected/evidence-visibility.test.mjs
READ app-demo/data/content.ts

PURPOSE: complete scope/visit/learning relations with optional evidence
TARGET: M2B primitives and evidence-later true collapse
CURRENT: ritual/space/service/FAQ-post mock content
DELTA: contextual optional branches; no generic card grid or empty widget
RISK: mock fact leakage, Q/A metronome, empty architecture
VERIFY: 0/1/multiple fixture behavior; production zero-evidence DOM; route/a11y/visual matrix
ROLLBACK: remove NarrativeCompletion import; M2A remains intact
```

### M3S-1 — machine sanitation

```text
MODIFY app-demo/app/layout.tsx
MODIFY app-demo/app/dich-vu/[slug]/page.tsx
MODIFY app-demo/app/lien-he/page.tsx
MODIFY app-demo/components/Breadcrumbs.tsx
READ app-demo/data/content.ts

PURPOSE: stop publishing unverified machine-readable business/service/FAQ claims
TARGET: evidence/no-fabrication discipline
CURRENT: four JSON-LD emitters backed partly or wholly by mock content
DELTA: omit JSON-LD scripts; visible breadcrumb remains
RISK: reduced rich-result/structured-data coverage
VERIFY: zero application/ld+json at affected surfaces; pages/routes unchanged; static build
ROLLBACK: restore an emitter only with verified source facts; technical revert is four-file bounded
```

### M3S-B — booking false-success sanitation

```text
MODIFY app-demo/app/dat-lich/page.tsx
MODIFY app-demo/components/BookingStepper.tsx
READ ONLY app-demo/lib/booking.ts
READ ONLY app-demo/data/content.ts

PURPOSE: remove the active timer/iframe false-success and callback/recipient claims
TARGET: truthful local-only consequence while M4 transport remains blocked
CURRENT: hidden placeholder form plus timer/onLoad success can imply an unproven request
DELTA: no enabled submit, no mutating request, no success state; edit/remain uncertain/stop remain
RISK: booking route may expose a dead end unless the no-send stopping state is explicit
VERIFY: state/source/network assertions plus four-viewport browser and a11y matrix
ROLLBACK: exact two-file technical revert only; never release the known false-success baseline
```

### M3S-2 — rendered/metadata sanitation

```text
CANDIDATE PATHS:
app-demo/app/layout.tsx
app-demo/app/page.tsx
app-demo/app/dich-vu/page.tsx
app-demo/app/dich-vu/[slug]/page.tsx
app-demo/app/lien-he/page.tsx
app-demo/app/dao-tao/page.tsx
app-demo/app/dat-lich/page.tsx
app-demo/app/gioi-thieu/page.tsx
app-demo/app/khong-gian/page.tsx
app-demo/app/nhuong-quyen/page.tsx
app-demo/app/quy-trinh-tri-lieu/page.tsx
app-demo/app/san-pham/page.tsx
app-demo/app/tin-tuc/page.tsx
app-demo/app/tin-tuc/[slug]/page.tsx
app-demo/components/{BookingStepper,FaqAccordion,HealingProcessMotion,ReviewWall,ServiceFilterGrid,SiteFooter,MobileBottomBar,FloatingZalo}.tsx
app-demo/components/home-experience/*.tsx
app-demo/data/content.ts
app-demo/lib/{booking,recommendation}.ts

ACTION: SPLIT BEFORE MODIFY
PURPOSE: neutralize 20 untouched non-JSON-LD surfaces plus residual booking claims in CL-15
TARGET: truthful rendered content with coherent tasks
CURRENT: mock business facts after booking false-success is separated into M3S-B
DELTA: unavailable until each claim family has exact replacement/collapse behavior
RISK: very high if approved as one batch
VERIFY: per-family claim scan + task continuity
ROLLBACK: per-family only; never restore a known false claim as a release fallback
```

Booking ownership is sequential: M3S-B exclusively removes transport/success/callback behavior
first. A later split M3S-2-booking may revisit `dat-lich/page.tsx` and `BookingStepper.tsx` only for
residual mock branch/service labels; it may not restore or alter the M3S-B no-send boundary. The two
changes require separate commits and consumer scans despite sharing paths.

### M3P

```text
PATH: future admin-selected content boundary — NOT YET CHOSEN
ACTION: DEFER
PURPOSE: populate approved real evidence
TARGET: Evidence Answer/admin governance
CURRENT: DE-01..04 open
DELTA: no runtime path may be invented before the content/admin mechanism is approved
RISK: consent, provenance, factual and privacy failure
VERIFY: record-level relationship/provenance/permission/review evidence
ROLLBACK: visibility off for the individual record
```

### M4

```text
CURRENT BOUNDARY:
app-demo/app/dat-lich/page.tsx
app-demo/components/BookingStepper.tsx
app-demo/lib/booking.ts
app-demo/components/booking/Action.tsx
app-demo/components/booking/ChoiceField.tsx
app-demo/components/booking/TextArea.tsx
app-demo/components/booking/TextField.tsx
app-demo/components/notice/NoticeRegion.tsx
app-demo/styles/interface.css
app-demo/data/content.ts

ACTION: BLOCK
PURPOSE: real booking transport and handoff
TARGET: truthful pending/uncertain/confirmed semantics
CURRENT: placeholder Google Form IDs and unproven success
DELTA: provider/config/server paths unavailable until architecture decision; do not invent them
RISK: critical privacy, duplicate request, false success and lost handoff
VERIFY: future failure matrix + real recipient/handoff E2E
ROLLBACK: disable send and return to local no-send review, never fake success
```

### M5A — homepage cleanup

```text
DELETE LATER, only at zero consumers:
app-demo/components/home-experience/BodyMap.tsx
app-demo/components/home-experience/BodySignalInterface.tsx
app-demo/components/home-experience/BodyStatePanel.tsx
app-demo/components/home-experience/FourBodyStates.tsx
app-demo/components/home-experience/HomeExperience.tsx
app-demo/components/home-experience/HomeFinalCTA.tsx
app-demo/components/home-experience/HomeHero.tsx
app-demo/components/home-experience/RecommendationDrawer.tsx
app-demo/components/home-experience/RitualTimeline.tsx
app-demo/components/home-experience/SpaceAsTherapy.tsx
app-demo/lib/recommendation.ts
MODIFY LATER app-demo/styles/home-experience.css
MODIFY LATER app-demo/data/content.ts [only zero-consumer homepage exports]
ROLLBACK: retain through migration verification; cleanup is separately revertible
```

### M5B — Noto retirement

```text
MODIFY LATER app-demo/app/layout.tsx
MODIFY LATER app-demo/styles/tokens.css
MODIFY LATER app-demo/styles/typography.css
MODIFY LATER the exact 26-file consumer list in artifact 02
CONDITION: explicit Noto/display consumer count = 0
ROLLBACK: restore import/aliases and only the affected type rules
```

### M5C — legacy material/token/skin cleanup

```text
MODIFY LATER app-demo/styles/{tokens,skins,components,typography,home-experience}.css
MODIFY LATER only exact zero-consumer component selectors/classes
CONDITION: corrected route verified; skin/contrast policy separately approved; rollback bridge unused
ROLLBACK: one selector/token family at a time
```

### M5D — Runtime Truth rebaseline

```text
MODIFY LAST DESIGN.md
MODIFY LAST HUMANIZER.md and relevant release/migration status docs
CONDITION: implemented and verified runtime, not target intention
ROLLBACK: documentation follows the runtime rollback
```

## H6 first-batch eligibility graph

```text
MIGRATION GATE-R PASS
        |
        v
HUMAN NAMES A READY BATCH?
   no ------------------------> H6 INACTIVE
   yes
    |
    +--> M3S-1 approved ------> bounded machine trust sanitation
    `--> M3S-B approved ------> fail-closed booking sanitation

CONDITIONAL M0R/M1/M2A0/M2A1/M2B/M3S-2 do not activate without their named conditions.
```

## Smallest useful H6 start

Scale: value/reversibility/assumption exposure 5 is best; risk/dependency/verification cost 1 is
best.

| Option              | User-visible value | Risk | Dependency burden | Verification cost | Rollback simplicity | Exposes hidden assumptions |
| ------------------- | -----------------: | ---: | ----------------: | ----------------: | ------------------: | -------------------------: |
| A — M0R only        |                  1 |    1 |                 1 |                 2 |                   5 |                          2 |
| B — M1 only         |                  0 |    1 |                 1 |                 2 |                   5 |                          1 |
| C — M0R + M1        |                  1 |    2 |                 2 |                 3 |                   4 |                          2 |
| D — small M2A slice |                  5 |    4 |                 3 |                 5 |                   3 |                          5 |
| E — M3S-1           |                  4 |    1 |                 1 |                 2 |                   5 |                          4 |
| F — M3S-B           |                  5 |    1 |                 1 |                 3 |                   3 |                          5 |

**Recommended first H6 batch: M3S-B — booking false-success sanitation.**

1. It removes an active false-success path at the point where a visitor could believe a request was sent.
2. Its two modified paths and fail-closed local outcome are exact.
3. It is independent of M0R, M1, homepage composition, deferred evidence and real M4 transport.
4. Network mutation remains zero and rollback is bounded, while the unsafe baseline is never a release fallback.
5. It exposes the real handoff dependency before any larger booking or homepage work.

Human approval is still required; this recommendation does not activate H6.
