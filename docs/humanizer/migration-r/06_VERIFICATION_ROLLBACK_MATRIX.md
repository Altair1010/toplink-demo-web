# 06 — Verification and Rollback Matrix

## Common gate

Every implemented batch must run from `app-demo`:

```text
npm run verify
  -> next build
  -> tsc --noEmit
  -> prettier --check .
  -> node scripts/check-tokens.mjs
```

Also require `git diff --check`, an exact staged-scope review and a before/after consumer count. A
successful static gate does not replace browser, state, content or network evidence when those are
material to the batch.

## Per-batch matrix

| Batch | Static                                                                                                    | Browser / visual                                                                                               | A11y / state / network                                                                                          | Acceptance                                                                                                                                               | Exact rollback                                                                                    |
| ----- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| M0R   | common gate on the future named subset; token checker                                                     | first approve named H4R-C calibration; then computed values on default, `tet`, `an-tinh`; baseline at 375/1280 | focus/selected/error colors unchanged; no state/network delta                                                   | immediate aliases 0; future subset is consumed, calibrated, outside `@theme`, with no utility/visual drift                                               | detach named consumer, then remove its bounded subset                                             |
| M1    | common gate; Noto count remains 55/26 unless consumer scope separately approved                           | Vietnamese diacritics, line wrap and baseline/post at 375/768/1280/1440 + 200%                                 | heading order unchanged; focus/touch unchanged; reduced-motion N/A                                              | scoped classes only; no Noto removal; no global h1/h2 regression                                                                                         | if unused remove block; after adoption first localize consumers or roll back atomically with them |
| M2A0  | common gate; structural/forbidden-content scan                                                            | all four viewports, 200%, grayscale then calibrated color, H4R-C comparison                                    | keyboard/focus/heading order/reduced motion; mutating requests 0; console errors 0                              | static question → limit → uncertainty/no-send/stop disclosure; no interactive control, body taxonomy/match/send; unequal hierarchy                       | exact M2A0 commit revert before release only; unsafe legacy graph is never a release fallback     |
| M2A1  | common gate + `node --test .../orientation-state.test.mjs` + forbidden type/specimen scan                 | same matrix against retained M2A0 baseline                                                                     | keyboard, focus, edit/remove/no-choice/uncertain, heading order, 44px targets, reduced motion; network 0        | computed sans; no specimen/diagnosis/auto-match/send/confirmed; unequal arrival/boundary/consequence at desktop/mobile                                   | change `page.tsx` import/render back to retained `StaticOrientationShell`; keep shared stylesheet |
| M2B   | common gate + evidence visibility tests + repeated-shell scan                                             | 0/1/multiple approved-fixture layouts at all viewports; production capture has no empty evidence UI            | DOM order; contextual insertion focus; learning return; reduced-motion parity; network 0                        | zero evidence coherent; no placeholder/grid/repeated Q/A shell; job-specific unequal composition survives mobile; only reviewed facts/destination render | remove `NarrativeCompletion` import; M2A remains                                                  |
| M3S-1 | common gate; repository-wide `app-demo` scan for `application/ld+json`                                    | `/`, service detail and contact render at 375/1280; visible breadcrumbs retained                               | heading/nav semantics unchanged; no network delta                                                               | four known scripts absent and no replacement emitter introduced; routes unchanged                                                                        | four-file technical revert boundary; safe release fallback is omission, never mock schema         |
| M3S-B | common gate; two-file route-scope scan for placeholder form, timer/onLoad success and success-state names | booking route at 375/768/1280/1440 + 200%; baseline/post review                                                | keyboard/focus; edit/remain uncertain/stop; reduced motion; mutating requests 0; console errors 0               | no enabled submit, hidden POST, recipient/callback claim, timer/onLoad success or submitted/pending/sent/confirmed state                                 | two-file technical revert boundary; safe operational fallback stays fail-closed                   |
| M3S-2 | common gate plus per-claim source scan                                                                    | affected route/task matrix per approved sub-batch                                                              | task continuity, focus, clear omission; booking claim family additionally requires no-send tests                | each claim has safe replacement/collapse; no broad blank page                                                                                            | per claim-family commit; never one global content revert                                          |
| M3P   | record schema/content checks when a mechanism exists                                                      | evidence available/absent twin capture                                                                         | alt/caption, consent scope, removal/expiry behavior                                                             | relationship + provenance + permission/consent + approved review                                                                                         | set individual record visibility off                                                              |
| M4    | future architecture-specific static and integration gates                                                 | full booking flow at four viewports                                                                            | keyboard/focus/privacy; timeout, offline, rejection, retry, duplicate click, reload; real E2E recipient/handoff | pending/uncertain/confirmed distinguish real operation; idempotency and monitoring proven                                                                | disable send and return to local no-send review                                                   |
| M5A   | common gate + old-home import/selector/data count zero                                                    | corrected homepage regression matrix                                                                           | all M2 state/a11y tests remain                                                                                  | every deleted file/export has zero consumer                                                                                                              | revert M5A only while compatibility commit remains available                                      |
| M5B   | common gate + Noto/import/class count zero                                                                | all route families at four viewports + 200%                                                                    | headings/diacritics/contrast unchanged                                                                          | font payload removed only after zero consumer                                                                                                            | restore load/aliases/type rules as one M5B unit                                                   |
| M5C   | common gate + selector/token/skin count zero                                                              | default and retained skin matrix                                                                               | focus/error/selected/inverse contrast                                                                           | no live consumer or rollback dependency                                                                                                                  | one token/selector family per revert                                                              |
| M5D   | common gate + docs format/diff                                                                            | compare docs to deployed verified runtime                                                                      | decision/status integrity                                                                                       | Runtime Truth matches code, not intention                                                                                                                | docs follow exact runtime rollback                                                                |

## M0R equality checks

M0R is a visual no-op. Before and after values must be identical for canvas/reading/response,
primary/secondary/muted/inverse/action text, subtle/structural/focus/boundary rules and current
buttons/focus. Every alias in an approved subset remains outside `@theme`, so Tailwind generates no
new utility family. Any intentional color or typography change fails M0R and belongs to a consumer/
calibration batch.

## M2A1 state assertions

1. IDLE exposes ordinary-language options, an editable “other” path and equal uncertainty.
2. Selecting a phrase preserves the user's wording; no Tắc/Hàn/Hư/Loạn or service output appears.
3. Edit and remove update only the intended local state.
4. Clear Boundary follows the answer it qualifies in DOM/mobile order.
5. REVIEW sends nothing, starts no success timer and explains that fact before action.
6. Invalid/overlong input produces a specific recoverable error.
7. Uncertainty can continue without choosing a service.
8. Reduced motion exposes identical content immediately.
9. `pending`, `sent`, `confirmed` and receiving-owner claims are unreachable.
10. No internal specimen control or fabricated FAILURE/RETRY state appears in the production DOM.
11. Corrected question/response/consequence text computes to Be Vietnam Pro or an approved sans;
    the corrected subtree contains none of `font-display`, `font-serif-display`, `heading-font`,
    `--font-serif` or prestige-serif fallbacks.
12. Arrival, boundary and consequence use job-specific unequal composition and remain distinct at
    375px; a repeated label → heading → paragraph → action shell fails the batch.

## M2B evidence assertions

- Absent/unapproved record: component returns no placeholder, frame, generic reassurance or debt ID.
- One approved record: it answers one named question with minimum public context.
- Multiple approved records: placement follows question/context, not a generic grid.
- Revoked/expired/unreviewed record: visibility fails closed.
- Service/process/learning content is independently gated; evidence approval does not approve every
  adjacent claim.
- Service, visit, learning and evidence relations must not repeat one shared section/card shell;
  desktop and mobile are compared to accepted H4R-C unequal-composition evidence.

## M3S-1 omission checks

| Path                          | Before                              | After                                           | SEO/UX consequence                                          | Rollback rule                      |
| ----------------------------- | ----------------------------------- | ----------------------------------------------- | ----------------------------------------------------------- | ---------------------------------- |
| `app/layout.tsx`              | root business/offer/address JSON-LD | no root business schema                         | rich-result/business graph reduced; visible shell unchanged | restore only verified fields       |
| `app/dich-vu/[slug]/page.tsx` | service/provider/offer schema       | no service JSON-LD                              | service rich result removed; route remains                  | restore per reviewed service fact  |
| `app/lien-he/page.tsx`        | FAQ schema from mock answers        | no FAQ JSON-LD                                  | FAQ rich result removed                                     | restore only reviewed FAQ          |
| `components/Breadcrumbs.tsx`  | BreadcrumbList schema + visible nav | visible nav only where labels remain unreviewed | machine breadcrumb reduced; user orientation preserved      | restore when label/source is valid |

## M3S-B fail-closed checks

1. The two-file route scope contains no hidden placeholder POST form or callback/recipient promise;
   the current hidden form owner is `BookingStepper.tsx`.
2. `BookingStepper.tsx` contains no timer, iframe `onLoad` success or reachable submitted/pending/sent/confirmed state.
3. The last local state says plainly that nothing has been sent and offers edit, remain uncertain or stop.
4. Browser network audit records zero mutating requests through every reachable state.
5. No disabled or decorative submit affordance is shown; M4 remains the only path to real transport.

## Browser matrix for consumer-changing batches

```text
VIEWPORTS: 375 / 768 / 1280 / 1440 / 200%-equivalent reflow
A11Y: keyboard / focus / heading order / labels / touch targets / contrast / reduced motion
VISUAL: baseline screenshot -> post-batch screenshot -> intentional-delta review
STATE: every batch-owned state, including empty/error/uncertain/recovery
NETWORK: expected requests only; M2A/M2B mutating requests = 0
CONSOLE: unexpected errors = 0
```

## Rollback rule

```text
ADD / ALIAS
      |
      v
BOUNDED CONSUMER
      |
      v
VERIFY
      |
      v
EXPAND ONLY BY NEW APPROVAL
      |
      v
ZERO LEGACY CONSUMERS
      |
      v
RETIRE IN M5
```

Rollback is an exact batch boundary, not permission to restore a known misleading claim, unsafe
recommendation or false booking success. Compatibility remains until the corresponding zero-
consumer gate closes.

## Architecture and dependency check

- M0R–M3S-B require no framework, rendering, deployment, backend, CMS or dependency change.
- M1 does not depend on M0R.
- M2A may consume calibrated M0R only if explicitly approved. It requires approved M1 or its exact
  local sans equivalent and cannot silently bundle either batch.
- M3P has no runtime path until an admin/content mechanism is separately chosen.
- M4 remains blocked because its future provider/config/server path cannot be truthfully named.
