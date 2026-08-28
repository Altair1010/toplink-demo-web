# 04 — Migration Batch DAG

- **Status:** `PROPOSED — AWAITING HUMAN MIGRATION APPROVAL`
- **Rule:** approval must name batches; approval of one node does not approve descendants.
- **Rollback:** every node is independently revertible.

## Eligibility summary

| Batch                                     | Eligibility                                                         | Risk        | Human approval meaning                                                |
| ----------------------------------------- | ------------------------------------------------------------------- | ----------- | --------------------------------------------------------------------- |
| M0 — Semantic alias foundation            | `READY NOW`                                                         | Low–Medium  | add a non-visual compatibility bridge only                            |
| M1 — Scoped typography/reading foundation | `READY WITH CALIBRATION`                                            | Medium      | add Be Vietnam role classes/spacing without global Noto removal       |
| M2 — Bounded homepage core                | `READY WITH CALIBRATION`, conditional on ED-02 copy review          | Medium–High | replace only HP-01/02/03/07 core; no evidence population or transport |
| M3 — Evidence surfaces                    | `BLOCKED BY REAL EVIDENCE`                                          | High        | no approval available until named ED packages exist                   |
| M4 — Booking transport/confirmed          | `BLOCKED BY OPERATION` and `BLOCKED BY SECURITY / PRIVACY DECISION` | Critical    | separate future architecture/operation approval required              |
| M5 — Legacy retirement/cleanup            | `DEFERRED`; requires zero consumers                                 | Medium–High | cleanup only after migrated batches verify                            |

## Dependency DAG

```text
M0 semantic aliases  [READY NOW]
  ↓
M1 scoped Be Vietnam roles  [READY WITH CALIBRATION]
  ↓
M2 bounded homepage core  [CONDITIONAL: ED-02 reviewed copy]
  ├─ HP-01 Cover Record
  ├─ HP-02 Guided Intake
  ├─ HP-03 Scope Boundary
  └─ HP-07 local Action Receipt: REVIEW / UNCERTAIN, zero transport
       │
       ├──────────────┐
       ↓              ↓
M3 evidence units     M4 booking transport
[BLOCKED]             [CRITICAL / BLOCKED]
 ED-01/03/04/05/07/08  ED-06 + owner/channel/provider
 ED-02/09 review       + data/security/privacy/operations
       │              │
       └──────┬───────┘
              ↓
M5 cleanup / Runtime Truth re-baseline
[DEFERRED: zero-consumer proof + verified release]
```

M2 does not depend on M3 if evidence units are omitted rather than replaced by placeholders. M2
does not depend on M4 because its receipt is local review/uncertainty and cannot send.

## M0 — Governance / semantic alias foundation

**Intent:** add the 18-alias `--h-*` bridge outside `@theme`; preserve all current visuals and
legacy consumers.

| Exact path                          | Operation     | Why                                               | Risk                                                   | Rollback                                        |
| ----------------------------------- | ------------- | ------------------------------------------------- | ------------------------------------------------------ | ----------------------------------------------- |
| `app-demo/styles/tokens.css`        | **MODIFY**    | append 18 semantic aliases; no primitive deletion | alias cycles, invalid CSS, accidental utility exposure | revert this one file; no consumer has moved yet |
| `app-demo/styles/skins.css`         | **READ-ONLY** | prove existing overrides resolve through aliases  | semantic meaning may drift under skins                 | no change to roll back                          |
| `app-demo/scripts/check-tokens.mjs` | **READ-ONLY** | confirm checker remains valid                     | false token hygiene assumption                         | no change                                       |
| `app-demo/package.json`             | **READ-ONLY** | no dependency/script change                       | none                                                   | no change                                       |

- **Dependencies:** none beyond locked Gate B.
- **Blast radius:** one modified CSS source; zero intentional computed-style changes because no
  production consumer uses `--h-*` yet.
- **Excluded:** color calibration, global focus switch, skins, component migration.

## M1 — Typography and reading foundation

**Intent:** add scoped Be Vietnam role classes and consume the M0 spacing/type relationships only
inside later Humanizer components. Keep global serif behavior and loading unchanged.

| Exact path                            | Operation              | Why                                                                   | Risk                                   | Rollback                                       |
| ------------------------------------- | ---------------------- | --------------------------------------------------------------------- | -------------------------------------- | ---------------------------------------------- |
| `app-demo/styles/typography.css`      | **MODIFY**             | add eight `.h-type-*` role classes with responsive/zoom-safe behavior | class collision, line wrap, diacritics | revert scoped class block; global rules remain |
| `app-demo/styles/tokens.css`          | **READ-ONLY after M0** | consume surface/text/rule/action/state aliases                        | raw calibration drift                  | revert M1 consumers only                       |
| `app-demo/app/layout.tsx`             | **READ-ONLY**          | Be Vietnam already loads; Noto remains                                | no load change                         | no change                                      |
| 26 Noto consumer files in artifact 02 | **READ-ONLY**          | global migration is not M1                                            | avoids site-wide wrap regression       | no change                                      |

- **Calibration:** body ≥18px, line height 1.55–1.7, preferred 55–72 characters, hero accent
  clearance, 375px and 200% zoom.
- **Blast radius:** one authored stylesheet; no legacy consumer changes until M2.
- **Retirement condition:** none; Noto remains 55/26 at M1 exit.

## M2 — Homepage structural Humanizer core

**Intent:** introduce the evidence-independent core in parallel, then switch `/` in one reversible
route commit. The route includes HP-01, HP-02, HP-03 and a local HP-07 review/uncertainty receipt.
It does not send data.

### Exact candidate paths

| Exact path                                                        | Operation  | Why                                                                                       | Risk                                           | Rollback                                                                    |
| ----------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------- |
| `app-demo/components/humanizer-home/CoverRecord.tsx`              | **CREATE** | bounded entry, only HP-01 threshold                                                       | content/heading/contrast                       | route stops importing it                                                    |
| `app-demo/components/humanizer-home/GuidedIntake.tsx`             | **CREATE** | editable familiar phrase and no-choice path                                               | privacy/focus/forbidden outputs                | remove new import tree                                                      |
| `app-demo/components/humanizer-home/ScopeBoundary.tsx`            | **CREATE** | visible non-diagnostic limit                                                              | weak or unreviewed health copy                 | remove with parent tree                                                     |
| `app-demo/components/humanizer-home/ActionReceipt.tsx`            | **CREATE** | editable REVIEW/UNCERTAIN record; zero transport                                          | false action implication                       | route rollback restores old tree; no request was sent                       |
| `app-demo/components/humanizer-home/HomeHumanizerExperience.tsx`  | **CREATE** | owns local phrase/review state and a static fail-closed mode                              | state/focus regression                         | switch to Cover + Scope Boundary static mode                                |
| `app-demo/components/humanizer-home/guided-intake-state.mjs`      | **CREATE** | pure reducer with forbidden-state boundary                                                | logic mismatch                                 | revert state module                                                         |
| `app-demo/components/humanizer-home/guided-intake-state.d.mts`    | **CREATE** | TypeScript contract for reducer                                                           | declaration drift                              | revert with reducer                                                         |
| `app-demo/components/humanizer-home/guided-intake-state.test.mjs` | **CREATE** | prove edit/remove/no-choice/no-network/no-confirmed                                       | incomplete state cases                         | revert test with feature                                                    |
| `app-demo/data/humanizer-home.ts`                                 | **CREATE** | keep reviewed phrase/boundary copy separate from mock business data                       | copy mistaken for business fact                | remove module with route rollback                                           |
| `app-demo/styles/home-experience.css`                             | **MODIFY** | add scoped HP-01/02/03/07 rules and reduced-motion parity                                 | selector collision/current homepage regression | revert scoped additions                                                     |
| `app-demo/app/page.tsx`                                           | **MODIFY** | switch imports and replace unsupported homepage metadata with ED-02-reviewed generic copy | homepage task/SEO/visual regression            | pre-release: revert; post-release trust defect: use static fail-closed mode |

### Required read-only references

- all current `app-demo/components/home-experience/*.tsx`;
- `app-demo/lib/recommendation.ts`;
- `app-demo/data/content.ts`;
- H4 prototype under `app-demo/app/motion-lab/humanizer-h4/**`.

### Conditions

- ED-02 reviewer approves the production phrase set and boundary wording.
- M2 color proposal, responsive behavior and screenshot delta are explicitly accepted.
- No ED-01/03/04/05/06/07/08/09 fact is populated.
- No network request, service match, `Tắc/Hàn/Hư/Loạn`, body verdict or `CONFIRMED` state exists.

- **Blast radius:** homepage `/` only plus a scoped CSS block; header/footer/booking/routes remain
  unchanged.
- **Rollback:** before release, a Git revert can restore the baseline for technical comparison.
  After a public M2 release, a health/trust defect fails closed to Cover Record + Scope Boundary
  static mode with no verdict, match or send; it must not silently reactivate the known legacy
  inference path. Old files remain only for zero-consumer proof and bounded recovery until M5.

## M3 — Evidence-dependent surfaces

**Status:** blocked. Do not create empty public systems.

Candidate paths become eligible only when their named evidence exists:

| Exact candidate path                                          | Operation now                                 | Future purpose                                                                   | Blocking evidence                                                                     | Rollback                                                                |
| ------------------------------------------------------------- | --------------------------------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `app-demo/components/humanizer-home/ProofIndex.tsx`           | **DEFERRED**                                  | public real evidence units                                                       | ED-01/03/04/07/08                                                                     | omit unit and narrative-link around it                                  |
| `app-demo/components/humanizer-home/ServiceScopeRegister.tsx` | **DEFERRED**                                  | approved scope/limit rows                                                        | ED-02/05; ED-06 for action                                                            | omit; retain verified navigation only                                   |
| `app-demo/components/humanizer-home/VisitProcessRecord.tsx`   | **DEFERRED**                                  | verified visit sequence                                                          | ED-04/07/08                                                                           | omit; never restore ritual fiction                                      |
| `app-demo/components/humanizer-home/QuietContinuation.tsx`    | **DEFERRED**                                  | reviewed practical questions/links                                               | ED-02/09; ED-01/06 for contact                                                        | omit unreviewed items                                                   |
| `app-demo/data/humanizer-evidence.ts`                         | **DEFERRED**                                  | typed approved records only                                                      | provenance/consent/publication scope                                                  | remove affected record/unit                                             |
| `app-demo/app/page.tsx`                                       | **DEFERRED MODIFY**                           | insert only eligible primitives in narrative order                               | same evidence per unit                                                                | revert each unit import independently                                   |
| `app-demo/app/layout.tsx`                                     | **DEFERRED MODIFY / SAFE OMISSION CANDIDATE** | remove unverified business JSON-LD now or repopulate only from ED-01/05 evidence | current mock address, price, hours, channels and services are machine-readable claims | restore only a verified structured-data graph, never current mock facts |
| `app-demo/data/content.ts`                                    | **READ-ONLY until evidence review**           | current source for mock JSON-LD and route claims                                 | demo constants are not Real Evidence                                                  | keep data isolated; do not copy into target records                     |
| `app-demo/styles/home-experience.css`                         | **DEFERRED MODIFY**                           | scoped evidence/process styles                                                   | real content geometry                                                                 | revert unit style block                                                 |

Real assets cannot have exact paths before ED packages identify permitted files. No asset directory
or placeholder is proposed now.

The JSON-LD omission can be approved separately as a content/trust sanitation sub-batch because
omission is safer than publishing mock structured facts. It does not authorize evidence population
or any other M3 component.

## M4 — Booking transport and production confirmation

**Status:** `BLOCKED — SEPARATE EXPLICIT APPROVAL REQUIRED`.

Exact current impact boundary:

```text
app-demo/app/dat-lich/page.tsx
app-demo/components/BookingStepper.tsx
app-demo/lib/booking.ts
app-demo/components/booking/Action.tsx
app-demo/components/booking/TextField.tsx
app-demo/components/booking/TextArea.tsx
app-demo/components/booking/ChoiceField.tsx
app-demo/components/notice/NoticeRegion.tsx
app-demo/styles/interface.css
app-demo/data/content.ts
```

All are **READ-ONLY / DEFERRED** in this Migration Gate. A future record must add the exact
provider/config/data paths after the architecture is chosen; inventing them here would hide the
missing decision.

Prerequisites:

- ED-06 recipient, owner, channel, SLA and real handoff;
- approved fields, purpose, data controller, retention/deletion and privacy notice;
- provider/security architecture and static-export compatibility;
- transport result semantics, idempotency, duplicate protection, timeout/ambiguous response,
  retry and audit behavior;
- integration and E2E proof before `CONFIRMED`.

Fail-closed rollback is review/contact-only with no send and no confirmation.

## M5 — Legacy retirement and re-baseline

M5 is not an initial migration batch. It splits into independently approved cleanup units.

### M5A — Homepage legacy cleanup after M2 verification

`DELETE LATER`, only after import/consumer count is zero:

```text
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
```

Also **MODIFY LATER** `app-demo/data/content.ts` and
`app-demo/styles/home-experience.css` to remove only now-unconsumed homepage body-state/ritual/space
exports and selectors. Rollback restores M5A without reverting M2.

### M5B — Noto retirement after site-wide zero-consumer proof

- **MODIFY LATER:** `app-demo/app/layout.tsx`, `app-demo/styles/tokens.css`,
  `app-demo/styles/typography.css`.
- **MODIFY LATER:** the 26 exact TSX consumer files enumerated in artifact 02, each through a
  route-scoped migration before load removal.
- **Condition:** 0 explicit display/serif class sites and 0 implicit global h1/h2 consumers, then
  build/performance/visual/zoom verification.

### M5C — Palette/material/skin retirement

`DEFERRED BY GATE B`. No exact deletion list is approvable until jade/seasonal policy is decided
and consumer counts for gold/wood/material aliases reach zero. `skins.css` is not a cleanup target
by implication.

### M5D — Runtime Truth re-baseline

- **MODIFY LATER:** `DESIGN.md`, `HUMANIZER.md` and the approved migration record.
- **Condition:** only after implementation and verification establish a new Runtime Truth.
- **Rollback:** documentation batch reverts independently if release rolls back.

## Approval menu

The current human may approve:

1. `M0` only;
2. `M0 + M1` with named typography calibration;
3. `M0 + M1 + M2` only after ED-02 and the M2 color/content conditions are satisfied;
4. request revisions.

M3, M4 and M5 are not presently approvable for implementation.
