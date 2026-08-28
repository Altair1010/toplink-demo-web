# 06 — Migration Gate Report

- **Migration Gate status:** `PASS — PROPOSED FOR HUMAN APPROVAL`
- **Gate B:** `APPROVED — DEC-H5-GB-01`
- **Target system:** `LOCKED / PASS`
- **Migration authority:** none until human approval names batches
- **H6:** not active
- **Date:** 2026-08-28

## Proposed decision

Present this migration record for human approval with these boundaries:

### Ready migration batches

- **M0 — semantic alias foundation:** `READY NOW`; one visual-no-op modification to future
  `styles/tokens.css`, 18 aliases, no consumer migration or deletion.

### Conditional batches

- **M1 — scoped typography/reading foundation:** `READY WITH CALIBRATION`; one scoped stylesheet,
  no global heading rewrite and no Noto removal.
- **M2 — bounded homepage core:** `READY WITH CALIBRATION`, conditional on ED-02-reviewed phrase,
  boundary and metadata copy; no evidence population or transport.
- **M3 trust sanitation sub-batch only:** omission of unverified root JSON-LD may be approved
  separately; this does not approve Proof/Service/Process population.

### Blocked batches

- **M3 evidence population:** blocked by ED-01/03/04/05/07/08 and applicable ED-02/09 review.
- **M4 booking transport/confirmed:** blocked by ED-06, operation, provider/data architecture and
  security/privacy decisions; separate Critical approval required.

### Deferred cleanup

- **M5A:** current homepage component/logic/data/CSS retirement after zero consumers.
- **M5B:** Noto/global serif retirement after 55 consumer sites reach zero.
- **M5C:** gold/jade/wood/material/skin policy and retirement; deferred by Gate B.
- **M5D:** re-baseline `DESIGN.md` and Runtime Truth only after verified release.

## System and inventory summary

| Area                    | Result                                                                                                                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Consumer inventory      | 9 meaningful groups; direct footprints include 49 color/surface files, 55 Noto sites/26 files, 11 body/recommendation files, 45 motion files and 10 booking core paths. |
| Semantic implementation | 18 CSS aliases; 14 initially alias existing primitives; 27 roles remain component-private/docs/state semantics.                                                         |
| Homepage map            | ready as an exact conditional map: replace HP-01/02/03/07 core; omit evidence-dependent HP-04/05/06/08 until eligible.                                                  |
| Architecture            | none approved; M4 future architecture is explicitly outside this gate.                                                                                                  |
| Dependencies            | no change proposed.                                                                                                                                                     |

## Independent critique pass 1 — Design integrity

| Finding                                                                        | Severity | Correction                                                                                                                      | Re-run |
| ------------------------------------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Treating all 45 roles as public CSS would turn semantics into token explosion. | P1       | Reduced the bridge from an early 23-alias draft to 18; spacing, type, motion and composite surfaces remain private/contractual. | `PASS` |
| A separate decision color could spread the A import beyond HP-01/HP-07.        | P1       | `surface.decision` is component-private and aliases the threshold unless contrast proves otherwise; no third accent is created. | `PASS` |
| `#7b1f2a` could be read as already locked.                                     | P1       | It is labeled an M2 calibration proposal with measured alternatives and rejection fallback to current `#95131f`.                | `PASS` |
| Existing gold/jade/wood motifs could enter target aliases by convenience.      | P1       | No new Humanizer component contract depends on them; raw tokens/skins stay compatibility-only and cleanup is deferred.          | `PASS` |
| C seam/motion could become site-wide.                                          | P1       | M2 exact paths keep phrase state inside Guided Intake → Scope Boundary → local review; DẪN/TỤ end before transport.             | `PASS` |

**Pass 1 conclusion:** B remains the spine. A is local to HP-01/HP-07, C to HP-02/HP-03, and raw
calibration does not replace semantic authority.

## Independent critique pass 2 — UX / evidence / trust

| Finding                                                                                         | Severity | Correction                                                                                                                            | Re-run |
| ----------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| A naïve M2 rollback would reactivate the known body verdict/service recommendation graph.       | P0       | Post-release rollback now fails closed to static Cover + Scope Boundary; legacy inference is only a pre-release technical baseline.   | `PASS` |
| Mock root JSON-LD was outside the first evidence map.                                           | P0       | Added exact `layout.tsx`/`content.ts` impact and a separately approvable omission-only sanitation path; repopulation remains blocked. | `PASS` |
| Generic orientation copy could bypass final health review.                                      | P1       | M2 is conditional on ED-02 production copy review; current H4 phrases are not final content.                                          | `PASS` |
| Missing Proof/Service/Process evidence could produce polished empty shells.                     | P1       | M3 paths are deferred and production behavior is omit/restructure; no empty component or asset path is created.                       | `PASS` |
| Existing booking reports success without receipt and timeout also upgrades configured attempts. | P0       | M4 is isolated and blocked; future timeout is `UNCERTAIN`, and `CONFIRMED` requires transport + handoff E2E proof.                    | `PASS` |
| No-choice path could disappear during M2.                                                       | P1       | M2 reducer/test contract makes no-choice, edit/remove/reset and zero-send review first-class states.                                  | `PASS` |

**Pass 2 conclusion:** no mock content becomes business truth, Guided Intake remains non-diagnostic,
evidence absence remains honest and booking cannot enter H6 through a visual batch.

## Independent critique pass 3 — Engineering / reversibility

| Finding                                                                           | Severity | Correction                                                                                                                                | Re-run |
| --------------------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| Global alias placement inside `@theme` would generate an unnecessary utility API. | P1       | M0 places 18 `--h-*` aliases in ordinary `:root` after `@theme`; existing primitives/utilities remain.                                    | `PASS` |
| M1 could accidentally combine type migration and font cleanup.                    | P1       | M1 adds scoped classes only; Noto stays loaded and the 55/26 count is an explicit acceptance invariant.                                   | `PASS` |
| M2 candidate paths could be vague “homepage files”.                               | P1       | Exact CREATE/MODIFY/READ-ONLY paths and route rollback are enumerated; old components are not deleted until M5A.                          | `PASS` |
| M4 integration paths cannot be exact before provider architecture exists.         | P0       | Current ten-file boundary is exact; unknown provider/config paths are declared unavailable and block approval rather than being invented. | `PASS` |
| M5 could become one irreversible cleanup.                                         | P1       | Split M5A homepage, M5B Noto, M5C palette/skin and M5D docs with independent zero-consumer/rollback gates.                                | `PASS` |
| H4 could be used as a migration source and changed during cleanup.                | P1       | H4 is immutable reference evidence with a per-file hash recheck.                                                                          | `PASS` |

**Pass 3 conclusion:** batches have real file boundaries, no dependency/framework/engine change is
hidden, and compatibility remains until zero-consumer proof.

## Contract re-run

| Contract                                                 | Result                                                                       |
| -------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Gate B decision recorded and target locked               | `PASS`                                                                       |
| Fresh runtime consumer inventory                         | `PASS`                                                                       |
| Exact current→target mapping                             | `PASS`                                                                       |
| Minimal token implementation                             | `PASS` — 18/45 global aliases                                                |
| Noto inventory and retirement condition                  | `PASS` — 55 sites / 26 files; retirement deferred                            |
| Homepage mapping                                         | `PASS` — exact conditional paths and dispositions                            |
| Evidence blockers / safe-now behavior                    | `PASS`                                                                       |
| Booking isolated Critical/blocked                        | `PASS`                                                                       |
| Independently reversible batches                         | `PASS`                                                                       |
| Dependency DAG                                           | `PASS`                                                                       |
| Exact candidate paths                                    | `PASS`; provider paths intentionally unavailable until architecture decision |
| Verification and rollback matrix                         | `PASS`                                                                       |
| Production/tokens/skins/DESIGN/dependencies/H4 unchanged | `PASS` — Git scope and all immutable SHA-256 values match entry baseline     |

## Exit criteria

| Criterion                                           | Result |
| --------------------------------------------------- | ------ |
| Gate B decision recorded                            | `PASS` |
| Fresh runtime consumer inventory exists             | `PASS` |
| Exact current→target mapping exists                 | `PASS` |
| Token strategy is minimal                           | `PASS` |
| Noto consumer inventory exists                      | `PASS` |
| Homepage component map exists                       | `PASS` |
| Evidence blockers explicit                          | `PASS` |
| Booking critical/blocked                            | `PASS` |
| Batches independently reversible                    | `PASS` |
| DAG and exact paths exist                           | `PASS` |
| Verification/rollback per batch exists              | `PASS` |
| Documentation-only final scope and immutable hashes | `PASS` |

## Final verification evidence

- `npm run verify`: `PASS` — Next static build, TypeScript, Prettier and token check completed;
  token checker reported 35 color tokens and 0 orphan classes.
- `git diff --check`: `PASS`.
- Publication scope: `HUMANIZER.md`, one H5 Gate B decision and six Migration Gate documents only.
- SHA-256: `tokens.css`, `skins.css`, `DESIGN.md`, `package.json` and all eight protected H4 files
  match the entry baseline.
- Production app changed: no.
- Dependencies changed: no.
- Architecture mutation: no.

## Human decision requested

The Migration Gate may approve only named eligible batches, request named revisions or reject this
map. Approval of M0 does not approve M1/M2; approval of M2 does not approve M3/M4/M5.

Next only after approval:

```text
HUMAN MIGRATION APPROVAL
  → activate ONLY named READY/CONDITIONAL batches whose conditions are satisfied
  → H6 Design / Code Loop
```

Do not begin H6 automatically.
