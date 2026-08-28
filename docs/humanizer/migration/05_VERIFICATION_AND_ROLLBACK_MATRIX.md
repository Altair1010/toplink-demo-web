# 05 — Verification and Rollback Matrix

- **Status:** proposed acceptance contract for later approved implementation
- **Static gate:** `cd app-demo && npm run verify`
- **Browser anchors:** 375, 768, 1280, 1440 and 200% zoom
- **Reference protection:** H4 remains untouched evidence

## Shared verification requirements

Every implemented batch must pass:

### Static

- production build;
- TypeScript;
- Prettier/format check;
- token checker;
- batch-specific unit/state tests where present;
- changed-file and dependency diff audit.

### Browser and visual

- 375, 768, 1280 and 1440 screenshots;
- 200% zoom and no horizontal content scroll;
- console clean;
- baseline versus target screenshot review with every intentional delta named;
- current `yvien` skin; alternate skins only where the batch claims compatibility.

### Accessibility

- keyboard-only path and visible focus;
- semantic headings/landmarks;
- labels, instructions and errors;
- no color-only meaning and contrast on real surface/state pairs;
- `prefers-reduced-motion: reduce` parity;
- practical ≥44px targets;
- state announcements/focus continuity only where state changes occur.

### Evidence and integrity

- no public ED code, X-frame, placeholder person/place/process or mock metric;
- no sensitive customer/health data in fixtures, screenshots or docs;
- no Runtime Evidence promoted to Real Evidence;
- no provider/owner/SLA or business fact inferred from demo content.

## Batch matrix

| Batch   | Static                                                                                              | Browser/visual                                                                                                                                    | A11y                                                                                                                   | State/evidence                                                                                                                                                                                    | Rollback test                                                                                                                         |
| ------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **M0**  | `npm run verify`; parse 18 aliases; token count/checker unchanged; no package diff                  | computed styles before/after identical for representative body, focus, button and homepage surfaces; yvien/tet/an-tinh primitive resolution smoke | focus appearance must not change because aliases have no consumers                                                     | assert zero runtime `--h-*` consumers outside the new bridge                                                                                                                                      | revert `tokens.css`; rebuild; confirm prior computed styles and clean diff                                                            |
| **M1**  | verify; authored class scan; no Noto/load/dependency diff                                           | typography fixture/current approved surface at 375/768/1280/1440; Vietnamese wraps/diacritics; measure at 200%                                    | heading semantics independent of class; focus/targets unchanged                                                        | no visitor content/state mutation                                                                                                                                                                 | revert scoped `.h-type-*` block; global typography remains byte-equivalent                                                            |
| **M2**  | verify; `node --test .../guided-intake-state.test.mjs`; forbidden-output/network scan               | `/` baseline/target screenshots at all anchors; paper/ink dominance; threshold only HP-01/07; DOM order equals reading order                      | tab start/edit/remove/reset/no-choice/review/back; fieldset/legend/labels; live update not noisy; reduced motion; zoom | empty/selected/edited/removed/reset/no-choice/review/uncertain; exact phrase preserved; assert no `Tắc/Hàn/Hư/Loạn`, service match, request, timer, fetch/form submit or confirmed; ED-02 signoff | pre-release Git revert; post-release health/trust defect switches to static Cover + Boundary fail-closed mode, never legacy inference |
| **M3**  | not runnable until evidence fixtures are approved; later verify schemas and missing-record behavior | each evidence unit screenshot with real permitted content; unit omission must leave coherent narrative                                            | alt/caption division; disclosures; ordered process; metadata not first                                                 | provenance/consent/publication audit; absent evidence means omitted unit, not empty shell                                                                                                         | remove only affected import/record/style; verify neutral bridge and no placeholder                                                    |
| **M4**  | blocked; future unit/integration/contract/build/type/token tests                                    | booking at all anchors including offline/slow/timeout/duplicate response                                                                          | keyboard, labels, errors, pending/alert/status announcements, focus on failure/review/result                           | IDLE/ORIENTED/INPUT/REVIEW/SENDING/FAILURE/RETRY/UNCERTAIN/HANDOFF/CONFIRMED; transport + handoff E2E; idempotency; privacy/security audit                                                        | disable send and confirmed; restore review/contact-only safe mode; provider-specific rollback drill required                          |
| **M5A** | verify; `rg` import/selector/export count = 0 before deletion                                       | homepage matches verified M2/M3 baseline                                                                                                          | rerun homepage keyboard/reduced/zoom                                                                                   | no legacy state reappears                                                                                                                                                                         | restore deleted legacy files without switching route; prove M2 still works                                                            |
| **M5B** | verify; Noto explicit + implicit consumer count = 0; font bundle/performance check                  | every route family screenshot and Vietnamese line-wrap diff                                                                                       | 200% zoom and heading structure site-wide                                                                              | no content/state change                                                                                                                                                                           | restore Noto load/aliases independently; verify layout returns without reverting route work                                           |
| **M5C** | blocked until skin/palette policy; later per-token zero-consumer check                              | every retained skin/route/surface contrast matrix                                                                                                 | focus/error/selected/inverse contrast across skins                                                                     | semantic meaning must survive skin                                                                                                                                                                | restore each retired alias/override independently                                                                                     |
| **M5D** | docs format/diff check and source-to-doc crosswalk                                                  | not applicable                                                                                                                                    | not applicable                                                                                                         | decision IDs and release evidence must match actual Runtime Truth                                                                                                                                 | revert documentation only if runtime release rolls back                                                                               |

## M0 acceptance detail

M0 is visual no-op by contract. The following must compare equal before and after:

- body canvas/paper background and primary/secondary text;
- skip link and focus treatment;
- current primary/secondary buttons;
- default, `tet` and `an-tinh` computed primitive values;
- number of generated Tailwind utilities (the `--h-*` block is outside `@theme`).

Any intentional visual delta fails M0 and moves the change to a calibrated consumer batch.

## M1 acceptance detail

- Capture strings with stacked Vietnamese diacritics, long words and natural line breaks.
- At 375px, hero text may wrap but must not use a fixed line count or clip accents.
- At 200% zoom, no metadata falls below legible size, no fixed-height text container clips and no
  horizontal scrolling is introduced.
- Noto count must remain 55 consumer sites / 26 files unless the batch scope is explicitly revised;
  M1 cannot claim retirement.

## M2 state test contract

Minimum reducer/DOM assertions:

1. empty state offers reviewed phrases, `Điều khác` and an equal no-choice route;
2. selecting a phrase copies its exact wording without body-state/service output;
3. edit persists into review; remove/reset clears only the intended phrase;
4. review transition sends no request and creates no timer;
5. back/edit preserves safe local context and focus continuity;
6. invalid/overlong input produces a specific recoverable error;
7. no selection can still reach an honest no-choice review/continuation;
8. reduced motion displays the same information immediately;
9. `CONFIRMED`, transport owner and fake availability are unreachable.

## M3 evidence test contract

For each record, verification must name:

- ED package and approval status;
- source/provenance owner;
- consent/publication scope;
- exact public fields;
- alt/caption job;
- missing/private/expired behavior;
- review/expiry date if operationally required.

A development missing-record fixture may exist in tests. Production must omit/restructure and never
render an ED code or placeholder frame.

## M4 future critical test contract

M4 cannot pass on a happy path alone. Future approval must require:

- payload/data-minimization review before request;
- server/provider success distinguished from receiving-human handoff;
- timeout and ambiguous result produce `UNCERTAIN`, not success;
- retry is idempotent and double click cannot duplicate the request;
- invalid contact, rejection, network loss, offline, reload and provider failure are recoverable;
- audit/receipt contains no secret and only permitted personal data;
- deletion/retention and alternative contact behavior match published policy;
- production `CONFIRMED` requires real transport and defined handoff in one E2E test.

## Independent rollback boundary

| Defect found in       | Revert unit                                           | Must not require                                                                |
| --------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------- |
| semantic alias        | M0 `tokens.css` alias block                           | reverting typography/homepage                                                   |
| type class/scale      | M1 scoped type block                                  | reintroducing old homepage logic                                                |
| Guided Intake/receipt | M2 static fail-closed mode or scoped component revert | reactivating a known misleading recommendation path, deleting target docs or H4 |
| one evidence record   | that M3 record/import/unit                            | removing all evidence primitives                                                |
| transport/provider    | future M4 integration + send enablement               | reverting the whole Humanizer homepage                                          |
| legacy cleanup        | exact M5 cleanup sub-batch                            | reverting successful M0–M3 work                                                 |

Compatibility aliases and old components remain until the relevant zero-consumer gate. H4 never
participates in rollback because it is immutable reference evidence.

## H4 prototype protection

The final documentation publication rechecks SHA-256 for:

```text
app-demo/app/motion-lab/humanizer-h4/page.tsx
app-demo/app/motion-lab/humanizer-h4/_components/HeroCover.tsx
app-demo/app/motion-lab/humanizer-h4/_components/ProofIndex.tsx
app-demo/app/motion-lab/humanizer-h4/_components/GuidedAction.tsx
app-demo/app/motion-lab/humanizer-h4/_components/H4Prototype.tsx
app-demo/app/motion-lab/humanizer-h4/_components/h4-prototype.module.css
app-demo/app/motion-lab/humanizer-h4/_components/prototype-state.mjs
app-demo/app/motion-lab/humanizer-h4/_components/prototype-state.test.mjs
```

Any hash drift outside the authorized documentation scope fails this Migration Gate publication.
