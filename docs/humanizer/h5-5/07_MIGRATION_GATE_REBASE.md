# 07 — Migration Gate Rebase

## Status

The committed migration documents are the **PRE-H5.5 MIGRATION PLAN**. They remain historical provenance and do not authorize mutation. H5.5 finds an R4 at H3-B, so the Migration Gate is **BLOCKED / PARTIAL REBUILD REQUIRED**. It cannot be rebased into readiness until the H3 visual subtree, H4 brand retest and affected H5 relock complete.

## J. Pre-H5.5 migration DAG

```text
GATE B LOCK
    │
    ▼
M0: 18 semantic aliases (ready)
    │
    ├──────────────► M1: scoped type/readability (ready)
    │
    └──────────────► M2: HP-01/02/03/07 bounded core (conditional)
                         │
                         ├────► M3 sanitation (conditional omission)
                         ├────► M3 evidence population (blocked ED-01..09)
                         └────► M4 booking transport (blocked ED-06 + operation)
                                      │
                                      ▼
                              M5A/B/C/D cleanup (deferred)
```

## K. Rebased migration DAG

```text
CORRECTED H3 VISUAL SUBTREE
              │
              ▼
H4 BRAND/VISUAL RETEST
              │
              ▼
H5 AFFECTED SUBTREE RELOCK
              │
              ▼
PARTIALLY REBUILT MIGRATION GATE
              │
              ├────────────► M1 candidate: independent typography/readability
              ├────────────► M0R candidate: exact corrected alias map
              └────────────► M2A candidate: fail-closed Orientation Core
              │                 Bounded Entry + Guided Intake
              │                 + Scope Boundary
              │                 + local Action Review & Status
              │                         │
              │                         └── conditional on ED-02 copy/privacy review
              │
              ├────────────► M3S: machine-readable trust sanitation
              │                 root + service + FAQ/other mock claims
              │                 omission only; exact inventory first
              │
              └────────────► M2B: Narrative Completion
                                Trust Evidence + Service Scope
                                + Visit/Process Guide
                                + bounded knowledge bridge
                                      │
                         ┌────────────┼─────────────┐
                         ▼            ▼             ▼
                    M3P evidence   M4 transport   M5 cleanup
                    population     and true state zero-consumer only
                    BLOCKED        BLOCKED         DEFERRED

No edge is executable now. A rebuilt plan still requires human H5.5/subtree approval and human migration approval.
```

M2A is an orientation pilot, not a complete homepage and not evidence that the full H5 narrative has shipped. M2B restores trust, service, visit and knowledge relationships before any full-homepage claim.

## Batch decision rebase

| Pre-H5.5 decision                         | H5.5 finding                                                                                                                 | Rebase state                      | New status                                                |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | --------------------------------------------------------- |
| M0 — 18 global semantic aliases           | Historical function is valid, but exact corrected target map/count does not exist while H5 visual/token subtree is reopened. | **BLOCK UNTIL H5 RELOCK**         | M0R must be regenerated.                                  |
| M1 — scoped Be Vietnam Pro / reading      | Independently supported; its dependency on M0 was not demonstrated.                                                          | **KEEP AS INDEPENDENT CANDIDATE** | No activation before rebuilt Migration Gate approval.     |
| M2 — HP-01/02/03/07 bounded homepage core | Crosses invalid H3/H4 visual lineage and is narratively partial.                                                             | **BLOCK / SPLIT IN FUTURE PLAN**  | M2A/M2B are planning hypotheses only.                     |
| M3 sanitation — root JSON-LD omission     | Omission principle survives, but exact claim/path/behavior inventory is incomplete, including breadcrumbs.                   | **BLOCK UNTIL EXACT INVENTORY**   | Then return to rebuilt Migration Gate.                    |
| M3 evidence population                    | References cannot create Toplink facts, consent, reviewer identity or provenance.                                            | **BLOCK BY EVIDENCE**             | Blocked on applicable ED-01..09 evidence and review.      |
| M4 — booking transport                    | True transport needs ED-06 plus architecture, security, privacy, recovery and operational ownership.                         | **BLOCK BY OPERATION**            | Blocked; local review/status must not claim transmission. |
| M5A — legacy selector cleanup             | Names and consumers change under M0R/M2 split.                                                                               | **DEFER / REBASE**                | Zero-consumer proof required after successful migration.  |
| M5B — typography cleanup                  | Depends on M1 reaching stable consumers.                                                                                     | **DEFER**                         | Zero-consumer proof required.                             |
| M5C — component/token cleanup             | Depends on corrected semantic target and consumer inventory.                                                                 | **DEFER / REBASE**                | No removal before H6 migration succeeds.                  |
| M5D — rebaseline                          | Baseline must describe a corrected, approved target.                                                                         | **DEFER / REBASE**                | Last step only.                                           |

## Detailed batch findings

### M0 — semantic aliases

- Keep the alias-foundation strategy and visual-no-op constraint.
- Replace nine archive-coded names according to the H5.5 token register before implementation.
- Recalculate the exact alias count after rename/defer mapping; do not advertise “18” as immutable if the runtime mapping changes.
- Exact values remain unauthorized.

**Verdict: BLOCK.** Re-derive the exact 45-role map, alias count and skin/primitive relationships only after target relock.

### M1 — typography/readability

- Be Vietnam Pro sans-first is independent of both references.
- Keep scoped rollout, fallback stability, Vietnamese diacritic checks and separate rollback.
- No actual alias consumption establishes an M0R dependency. Treat M1 as an independent candidate in the rebuilt plan unless a concrete dependency is demonstrated.

**Verdict: KEEP AS CANDIDATE / NOT READY.**

### M2 — homepage target

The original subset can serve only as a bounded orientation pilot:

- **M2A:** Bounded Entry, Guided Intake, Scope Boundary, and a local Action Review & Status that truthfully says no request was sent.
- **M2B:** Trust Evidence, Service Scope, Visit/Process Guide, people/place evidence where verified, Knowledge Entry/Care ↔ Knowledge Bridge, and Quiet Continuation.

M2A must not operationalize the `Hồ Sơ Sống` archive identity or imply the full narrative is complete. M2B cannot populate proof, people, place, service or visit facts without real evidence.

**Verdict: BLOCK / FUTURE SPLIT.** H4 did not validate the proposed learning exit, and an exact rollback switch/path is still required.

### M3 — sanitation and population

Sanitation remains an omission-only safety candidate. Its inventory must cover every structured and rendered consumer, including root JSON-LD, service-detail JSON-LD, contact FAQ JSON-LD, Breadcrumb JSON-LD and other machine-readable mock assertions. Record each claim, source path, post-omission behavior and rollback. It must not replace unverified values with reference content.

Population remains blocked until each fact, identity, source, reviewer and consent scope is verified.

**Sanitation: BLOCK UNTIL EXACT INVENTORY. Population: BLOCKED BY EVIDENCE.**

### M4 — transport

No reference unlocks real transport. Required inputs remain ED-06, backend/endpoint ownership, data minimization, privacy notice, threat/security review, error/retry behavior, monitoring and rollback. Until then, the interface may only review local input and disclose that nothing was sent.

**Verdict: BLOCKED BY ED-06 + ARCHITECTURE + OPERATION + SECURITY + PRIVACY.**

### M5 — cleanup and rebaseline

Cleanup is destructive relative to rollback and therefore follows successful, verified migration. All consumers must be zero against the corrected target before removal. Rebaseline uses post-H5.5 names and batch boundaries.

**Verdict: DEFER / REBASE.**

## L. Blocker graph

```text
ED-01..09 REAL TOPLINK EVIDENCE
        │
        ├──── missing people/place/service/process facts ───► M2B BLOCKED
        ├──── missing proof/source/review/consent ──────────► M3P BLOCKED
        └──── ED-06 true booking evidence ───────┐
                                                 ▼
ARCHITECTURE + SECURITY + PRIVACY + OPERATIONS ─► M4 BLOCKED

M0R/M1/M2A/M3S
        │
        ├──── invalid H3 visual lineage ───────────────────► BLOCKED
        └──── missing corrected gates + approvals ─────────► NOT AUTHORIZED

CORRECTED ZERO-CONSUMER INVENTORY
        │
        └──── absent until successful migration ───────────► M5 DEFERRED
```

## M. H6 eligibility graph

```text
H5.5 PARTIAL / R4 IDENTIFIED
        │
        ▼
CORRECT H3-B VISUAL SUBTREE
        ▼
H4 BRAND RETEST + H5 AFFECTED RELOCK
        ▼
REBUILD MIGRATION GATE
        │
        ▼
HUMAN MIGRATION APPROVAL? ───────── no ─► NO BATCH ACTIVE
        │ yes, only then evaluate named corrected batches

M2B / M3P / M4 ── evidence or operation blockers remain
M5 ─────────────── after verified zero-consumer target only

H6 becomes active only when the approved eligible batch is explicitly activated.
```

## Readiness register

### Migration ready after H5.5

**NONE.** H5.5 terminates at an R4 and blocks the current Migration Gate.

### Still blocked or deferred

- **M0R:** blocked pending corrected H5 role/alias map and exact count.
- **M1:** preserved as an independent candidate, but not authorized/ready before rebuilt Gate approval.
- **M2A/M2B:** blocked by visual lineage; M2A also needs ED-02, validation and exact rollback; M2B needs evidence/review.
- **M3S:** blocked pending exact structured/rendered claim inventory and omission behavior.
- **M3P:** blocked by real evidence, provenance, reviewer identity and consent.
- **M4:** blocked by ED-06 plus architecture, security, privacy and operations.
- **M5A/B/C/D:** deferred until corrected consumers reach verified zero and rollback conditions hold.

## Rollback reconciliation

The pre-H5.5 per-batch rollback principle survives. Rebased batches must remain independently reversible. Rollback never restores misleading structured claims, false booking success or archive-coded public semantics merely to reproduce an old screenshot. Each batch records before/after consumer counts, exact file scope and verification evidence before the next edge opens.
