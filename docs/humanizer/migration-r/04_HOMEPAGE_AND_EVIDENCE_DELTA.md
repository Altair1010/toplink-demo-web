# 04 — Homepage and Evidence Delta

## Current → target → evidence graph

```text
CURRENT HOMEPAGE
  HomeHero
  Body Signal -> body taxonomy -> recommendation
  RitualTimeline
  SpaceAsTherapy
  HomeFinalCTA
       |
       v
CORRECTED TARGET
  Opening Question
  Guided Orientation
  Clear Boundary
  Consequence Before Action
  Service Scope
  Visit / Process Explanation
  Continue Understanding
  Evidence Answer [optional]
       |
       v
EVIDENCE / FACT AVAILABLE AND APPROVED?
       |
   +---+---+
   |       |
  YES      NO
   |       |
contextual true collapse
answer     no placeholder / empty widget / virtue copy
   |       |
   +---+---+
       v
NEXT VALID QUESTION
```

This is not a one-to-one section migration. Opening Question and Guided Orientation may share an
arrival chapter; Service Scope and Visit Explanation may share one reviewed answer; Evidence Answer
may have zero runtime instances.

## Deterministic zero-evidence route

When every M2B factual branch is unavailable, the production route is still complete:

```text
M2A ORIENTATION
  -> CLEAR LIMIT
  -> LOCAL / NOT-SENT CONSEQUENCE
  -> EDIT | REMAIN UNCERTAIN | STOP
```

Every unavailable Evidence Answer, Service Scope, Visit/Process or learning branch returns `null`
without an empty wrapper or enabled affordance. No CTA may point to omitted content. “Stop” is a
valid understandable end state; M2B is not required to manufacture a continuation.

## Current homepage mapping

| Current owner              | Current job / defect                    | Target contract                        | Disposition                                          | Population boundary                                                   |
| -------------------------- | --------------------------------------- | -------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------- |
| `HomeHero.tsx`             | prestige claim + unapproved place image | Opening Question                       | REPLACE presentation/copy; keep route position only  | structural question may be reviewed now; image collapses              |
| `HomeExperience.tsx`       | selected symptom state owner            | Guided Orientation state owner         | REPLACE                                              | ordinary-language input only                                          |
| `BodySignalInterface.tsx`  | symptom chips and body map              | Opening Question + Guided Orientation  | REPLACE; do not reuse body visualization as evidence | no diagnosis/inference                                                |
| `BodyStatePanel.tsx`       | body-state verdict and suggested care   | Clear Boundary                         | REPLACE logic and copy                               | structural limit ready                                                |
| `BodyMap.tsx`              | decorative/inference visualization      | none required                          | TRUE-COLLAPSE / RETIRE LATER                         | no substitute illustration                                            |
| `FourBodyStates.tsx`       | Tắc/Hàn/Hư/Loạn taxonomy                | bounded learning only if reviewed      | RETIRE LATER from homepage                           | current taxonomy does not become verdict                              |
| `RecommendationDrawer.tsx` | ranked SERVICES and booking links       | Service Scope / Continue Understanding | REPLACE; no auto-match                               | DE-04 or reviewed learning content                                    |
| `RitualTimeline.tsx`       | authored seven-step experience          | Visit / Process Explanation            | TRUE-COLLAPSE until reviewed                         | DE-03/04                                                              |
| `SpaceAsTherapy.tsx`       | unverified place/virtue claim           | Evidence Answer                        | TRUE-COLLAPSE                                        | DE-01                                                                 |
| `HomeFinalCTA.tsx`         | large CTA using mock branch/contact     | Consequence Before Action              | REPLACE hierarchy                                    | local/no-send structural copy only; channel facts reviewed separately |
| no current peer branch     | no bounded learning continuation        | Continue Understanding                 | CREATE only when destination content is valid        | current `POSTS`/`FAQS` are mock/unreviewed                            |

Old files are not deleted in M2. `app-demo/app/page.tsx` stops consuming them only after the new
route composition passes; deletion is M5A.

## M2A — Orientation core

**Target primitives:** Opening Question + Guided Orientation + Clear Boundary + Consequence Before
Action.

### M2A0 — static safe shell

```text
MODIFY app-demo/app/page.tsx
MODIFY app-demo/app/globals.css                     [one new stylesheet import]
CREATE app-demo/styles/home-humanizer.css
CREATE app-demo/components/home-experience/corrected/StaticOrientationShell.tsx
```

M2A0 renders only Opening Question, Clear Boundary and static uncertainty/no-send/stop disclosure.
It has no edit control, symptom taxonomy, service match, transport or interactive state. It is the
tested safe rollback floor for M2A1, not a visual placeholder.

### M2A1 — guided interaction over the safe shell

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
READ ONLY app-demo/data/content.ts
READ ONLY app-demo/lib/recommendation.ts
```

Typography predecessor: M2A must either consume approved M1 classes `.type-question`,
`.type-response`, `.type-boundary`, `.type-consequence` and `.type-action`, or define those exact
sans declarations locally in `home-humanizer.css`. Corrected markup may not use `font-display`,
`font-serif-display`, `heading-font`, `--font-serif` or a prestige-serif fallback.

### Delta and safety

- The production reducer owns IDLE, ORIENTED, REVIEW, LOCAL-ONLY and UNCERTAIN. FAILURE/RETRY is
  internal test-fixture behavior only and must be unreachable and absent from the production DOM.
- It may use a separately reviewed small phrase fixture; it may not import `BODY_STATES`,
  `dominantStates`, `recommend` or ranked `SERVICES`.
- Review states say what exists, what has not happened, what can be edited and how to remain
  uncertain. No network request, timer or `CONFIRMED` state exists.
- `page.tsx` is the M2A1 rollback switch. Old components remain in source but never become a release
  fallback. Reverting M2A1 returns exactly to the already-tested M2A0 `StaticOrientationShell` and
  retained `home-humanizer.css`, never to the misleading inference graph.

**Readiness:** `M2A0 CONDITIONAL`; `M2A1 CONDITIONAL AFTER M2A0`. Exact files, state contract and
safe rollback floor are known, but production phrase/boundary copy and visual calibration remain
named approval conditions.

## M2B — Narrative completion

**Target primitives:** Service Scope + Visit / Process Explanation + Continue Understanding +
optional Evidence Answer insertion points.

### Exact candidate paths

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
READ ONLY app-demo/data/content.ts
```

The visibility helper is fail-closed and conceptual: absent/unapproved input returns no rendered
unit. It is not a CMS, database or transport layer. M2B must not create an empty evidence component,
generic card grid or second knowledge visual system.

**Structure readiness:** `CONDITIONAL AFTER M2A`. The optional/collapse architecture is exact and
does not need real evidence. **Factual population readiness:** `DEFERRED/BLOCKED PER FACT`; existing
mock services, process, FAQ/posts, people and place may not populate it.

## Evidence-later migration matrix

| Target surface              | Structure                     | Content population                          | Current safe behavior                            |
| --------------------------- | ----------------------------- | ------------------------------------------- | ------------------------------------------------ |
| Opening Question            | READY                         | READY after structural-copy review          | ordinary question; no claim                      |
| Guided Orientation          | READY                         | READY after phrase review                   | editable/no-choice phrases; no diagnosis         |
| Clear Boundary              | READY                         | READY after safety-copy review              | plain limit immediately after answer             |
| Consequence Before Action   | READY                         | READY for local/no-send truth               | state → edit/recover/uncertain → action          |
| Evidence Answer             | OPTIONAL / READY TO BE ABSENT | DEFERRED DE-01/02/03/04                     | true collapse                                    |
| Service Scope               | READY as conditional relation | DEFERRED DE-04                              | omit unreviewed scope/duration/suitability       |
| Visit / Process Explanation | READY as conditional relation | DEFERRED DE-03/04                           | omit unsupported sequence                        |
| Continue Understanding      | READY as bounded relation     | BLOCKED until a reviewed destination exists | omit affordance rather than link to mock content |

## M3S claim inventory

The inventory unit is a **claim-bearing runtime surface**, not each string in a mock array. Fresh
inspection found **25 surfaces: 14 machine/metadata and 11 rendered groups**.

| ID    | Type            | Exact path(s)                                                                                                                        | Current claim/source                                            | Verified?                | Safe post-omission behavior                                    |
| ----- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------- |
| CL-01 | metadata        | `app-demo/app/layout.tsx`                                                                                                            | site description, personalized care, location/service framing   | no                       | retain neutral site identity/title only                        |
| CL-02 | JSON-LD         | `app-demo/app/layout.tsx`                                                                                                            | business, hours, price range, address, services, social/contact | no                       | remove script; page renders normally                           |
| CL-03 | metadata        | `app-demo/app/page.tsx`                                                                                                              | services, technology, location and benefit framing              | no                       | neutral structural description or omit claim fields            |
| CL-04 | metadata        | `app-demo/app/dich-vu/[slug]/page.tsx`                                                                                               | duration, price and service description from `SERVICES`         | no                       | omit factual metadata until reviewed                           |
| CL-05 | JSON-LD         | `app-demo/app/dich-vu/[slug]/page.tsx`                                                                                               | service/provider/offer price                                    | no                       | remove script; visible route unaffected                        |
| CL-06 | JSON-LD         | `app-demo/app/lien-he/page.tsx`                                                                                                      | FAQ answers from `FAQS`                                         | no                       | remove script; visible FAQ handled separately                  |
| CL-07 | JSON-LD         | `app-demo/components/Breadcrumbs.tsx`                                                                                                | route labels including mock service names                       | partial route truth only | keep visible nav; omit schema when labels are unreviewed       |
| CL-08 | rendered        | `HomeHero.tsx`                                                                                                                       | Toplink place image/alt and care/technology claims              | no                       | M2A replaces with structural opening                           |
| CL-09 | rendered        | `BodySignalInterface.tsx`, `BodyStatePanel.tsx`, `FourBodyStates.tsx`, `RecommendationDrawer.tsx`, `recommendation.ts`, `content.ts` | diagnostic/inference and service match                          | no / unsafe              | M2A replaces; no old-graph rollback                            |
| CL-10 | rendered        | `RitualTimeline.tsx`, `content.ts`                                                                                                   | visit/process moments                                           | no                       | true collapse until DE-03/04                                   |
| CL-11 | rendered        | `SpaceAsTherapy.tsx`, `content.ts`                                                                                                   | place qualities and therapy claim                               | no                       | true collapse until DE-01                                      |
| CL-12 | rendered        | `HomeFinalCTA.tsx`, `content.ts`                                                                                                     | branch/contact/action claims                                    | no                       | M2A uses local consequence; omit factual channel               |
| CL-13 | rendered        | `app/dich-vu/page.tsx`, `app/dich-vu/[slug]/page.tsx`, `ServiceFilterGrid.tsx`, `content.ts`                                         | service scope, price, duration, suitability, process, feeling   | no                       | keep route only when reviewed; otherwise omit fact blocks      |
| CL-14 | rendered        | `app/lien-he/page.tsx`, `FaqAccordion.tsx`, `content.ts`                                                                             | branch, map, hours, response expectation, FAQ                   | no                       | omit factual panels/FAQ; retain valid contact only if verified |
| CL-15 | rendered/state  | `app/dat-lich/page.tsx`, `BookingStepper.tsx`, `booking.ts`, `content.ts`                                                            | recipient, branch/service, send and callback success            | no / false success       | named M3S-B fail-closed sanitation; M4 stays blocked           |
| CL-16 | rendered        | `app/gioi-thieu/page.tsx`, `ReviewWall.tsx`, `content.ts`                                                                            | people, roles, reviews/testimonials                             | no                       | omit until DE-02/permission/review                             |
| CL-17 | rendered        | `app/quy-trinh-tri-lieu/page.tsx`, `HealingProcessMotion.tsx`, `content.ts`                                                          | actual treatment/process sequence                               | no                       | omit until DE-03/04                                            |
| CL-18 | rendered/shared | `SiteFooter.tsx`, `MobileBottomBar.tsx`, `FloatingZalo.tsx`, `content.ts`                                                            | contact/location channels                                       | no                       | preserve only a separately verified channel                    |
| CL-19 | metadata        | `app-demo/app/dao-tao/page.tsx`                                                                                                      | training scope/benefit framing                                  | no                       | neutral title or omit factual description                      |
| CL-20 | metadata        | `app-demo/app/gioi-thieu/page.tsx`                                                                                                   | organization/people/role framing                                | no                       | neutral title or omit factual description                      |
| CL-21 | metadata        | `app-demo/app/khong-gian/page.tsx`                                                                                                   | facility/place/experience framing                               | no                       | neutral title or omit factual description                      |
| CL-22 | metadata        | `app-demo/app/nhuong-quyen/page.tsx`                                                                                                 | franchise/business offer framing                                | no                       | neutral title or omit factual description                      |
| CL-23 | metadata        | `app-demo/app/san-pham/page.tsx`                                                                                                     | product/material claims                                         | no                       | neutral title or omit factual description                      |
| CL-24 | metadata        | `app-demo/app/tin-tuc/page.tsx`                                                                                                      | knowledge/editorial framing                                     | no                       | neutral title or omit factual description                      |
| CL-25 | metadata        | `app-demo/app/tin-tuc/[slug]/page.tsx`                                                                                               | post-derived factual description                                | no                       | omit until reviewed post content exists                        |

No reference corpus can mark any row verified.

CL-15 has two owners by consequence, not two counted surfaces. M3S-B first removes hidden-form/
timer/onLoad success and recipient/callback claims. Residual mock branch/service labels remain a
later M3S-2-booking claim-family batch; it may not modify the established no-send boundary.

## M3S split

### M3S-1 — machine-readable sanitation

```text
MODIFY app-demo/app/layout.tsx
MODIFY app-demo/app/dich-vu/[slug]/page.tsx
MODIFY app-demo/app/lien-he/page.tsx
MODIFY app-demo/components/Breadcrumbs.tsx
READ ONLY app-demo/data/content.ts
```

Delta: remove four JSON-LD emitters that currently publish unverified business/service/FAQ/label
assertions. Visible breadcrumb navigation remains. No reference or replacement fact is added.

**Safe omission: PASS.** Search rich-result/structured-data coverage decreases intentionally; page
rendering and routes remain. Rollback restores the exact scripts only after their source facts are
verified, not merely to reproduce the baseline.

**Readiness:** `READY FOR HUMAN MIGRATION APPROVAL` as M3S-1.

### M3S-B — booking false-success sanitation

This is current-safety sanitation, not booking transport.

```text
MODIFY app-demo/app/dat-lich/page.tsx
MODIFY app-demo/components/BookingStepper.tsx
READ ONLY app-demo/lib/booking.ts
READ ONLY app-demo/data/content.ts
```

Delta: remove the timer/iframe success path, hidden POST form and success/callback claims from the
active UI. The last local step states that online sending is unavailable and that no information
has been sent; the user may edit, remain uncertain or stop. It exposes no enabled submit control and
uses no unverified recipient/contact channel.

Acceptance: mutating requests 0; no timer/onLoad success; no `submitted`, `pending`, `sent` or
`confirmed` state; no recipient/callback promise; keyboard/reflow/reduced-motion preserved. A real
send action remains unavailable until M4.

**Safe sanitation: PASS. Readiness: READY FOR HUMAN MIGRATION APPROVAL.** Rollback restores only a
previous technical baseline and must not be used as a release fallback because that baseline is
known to make a false success claim.

### M3S-2 — rendered/metadata sanitation

Twenty untouched non-JSON-LD surfaces plus residual mock branch/service claims within partially
sanitized CL-15 require neutral replacement, M2 composition or verified business channels;
blind removal could make core tasks incoherent. Exact path ownership is known, but the replacement
copy/content decisions are not all resolved.

**Readiness:** `CONDITIONAL`; split by claim family and approve only with its safe replacement or
true-collapse behavior.

## M3P — evidence population

**Status: DEFERRED TO ADMIN AFTER PRIVATE OPENING.** DE-01..04 are not UI-design blockers. Future
population must satisfy verified relationship, provenance, permission/consent and approved review;
until then visibility is off.

## UX copy / fact boundary

- Structural and generally safe after copy review: “Anh/chị có thể bắt đầu từ điều đang quan tâm.”,
  “Thông tin này chưa được gửi đi.”, edit/remove/uncertain/stop labels.
- Factual and blocked without authority: duration, price, suitability, process sequence, person or
  role, branch/location/hours, health benefit, callback SLA and operational availability.
