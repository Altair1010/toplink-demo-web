# 01 — Gate B Decision and Migration Scope

- **Program position:** Post-H5 Migration Gate
- **Date:** 2026-08-28
- **Gate B:** `APPROVED — DEC-H5-GB-01`
- **Target system:** `LOCKED`
- **Migration Gate:** `PROPOSED — AWAITING HUMAN APPROVAL`
- **Runtime mutation authority:** none
- **H6:** not active

## Context load report

| Context             | Current reading                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Canonical flow      | H0 → H1 → H2 → H3 → H4 → H5 → **Migration Gate** → H6 → H7.                                                      |
| Runtime Truth       | Actual `app-demo` source; `styles/tokens.css` and `styles/skins.css`; current components, content and behavior.  |
| Target Design Truth | Locked H5 contracts under `DEC-H5-GB-01`.                                                                        |
| Evidence posture    | H0/H1 remains partial; ED-01→09 retain their H2 meanings.                                                        |
| Primary skill       | `toplink-humanizer-orchestrator`; Migration Gate must translate target to an exact, reversible delta.            |
| Supporting review   | `humanizer-ux-state-review`; current defects, target recommendations and unvalidated hypotheses remain separate. |
| Next human decision | Approve only named migration batches, request revision or reject the map.                                        |

## Purpose

This gate joins the locked Target Design System to a fresh runtime inventory, then proposes bounded
mutation batches. It does not implement those batches and does not treat “redesign website” as a
single approval unit.

```text
Gate-B-approved target
        +
fresh Runtime Truth inventory
        ↓
exact consumer graph and delta
        ↓
independently reversible batches
        ↓
HUMAN MIGRATION APPROVAL
```

## Approved target authority

The exact Gate B decision is recorded in `docs/humanizer/h5/08_H5_GATE_B_DECISION.md`. Locked scope:

- B spine; A only HP-01/HP-07; C only HP-02/HP-03;
- 45 semantic roles and Be Vietnam Pro sans-first behavior;
- eight editorial primitives;
- Vietnamese-first content voice;
- evidence, interaction/state, motion, responsive, accessibility and anti-pattern contracts.

Deferred scope remains deferred: raw values, evidence population, skin policy, final health/service
copy and booking/provider/data architecture.

## Runtime baseline

- Branch: `main`
- Baseline commit: `a234e142b42fd4e4c4fbba77d8b5e851f15ec0ee`
- Upstream: `origin/main`
- Worktree at entry: clean

Immutable baseline SHA-256:

| File/surface                 | SHA-256                                                            |
| ---------------------------- | ------------------------------------------------------------------ |
| `app-demo/styles/tokens.css` | `AB08626466981EFA58BBF6DBD0DA73EEB37FE5517E350E4156663B33A284FEE6` |
| `app-demo/styles/skins.css`  | `A680B9CC1DFF55C83DCC3FD65C1CB98E547BA4E24898B865AF5D9CEA2A001561` |
| `DESIGN.md`                  | `D6F17EB3F9B8D56F094FFB65BFE4DEE630A56933FE80CBCE85EC8C2F88D9A905` |
| `app-demo/package.json`      | `38BABD3C07535F34FB4DF7E35AC84E41515C3E1B6ED2AE42A71D1C1697B26411` |
| H4 prototype                 | Per-file baseline retained in the final verification audit.        |

## Classification vocabulary

Each proposed item controls H6 eligibility through one of these states:

- `READY NOW`: no deferred raw/evidence/operation decision is required.
- `READY WITH CALIBRATION`: target is locked, but an explicitly named raw/value or responsive
  calibration must be accepted in the same batch.
- `BLOCKED BY REAL EVIDENCE`: public population would otherwise invent Toplink facts.
- `BLOCKED BY OPERATION`: real owner/channel/process is absent.
- `BLOCKED BY SECURITY / PRIVACY DECISION`: collection/transport/retention is not approved.
- `DEFERRED BY GATE B`: Gate B explicitly left the decision open.

## Authorized publication in this task

- `docs/humanizer/h5/08_H5_GATE_B_DECISION.md`;
- `docs/humanizer/migration/**`;
- minimal status update in `HUMANIZER.md`;
- documentation-only commit and push after verification.

## Not authorized

- any `app-demo` mutation;
- changes to `tokens.css`, `skins.css`, `DESIGN.md`, dependencies or H4 prototype;
- production booking/provider/data work;
- H6 activation;
- placeholder proof, invented service/process facts or public ED codes.

## Migration safety rule

```text
ADD SEMANTIC ALIAS
  → MIGRATE BOUNDED CONSUMERS
  → VERIFY
  → EXPAND
  → VERIFY ZERO LEGACY CONSUMERS
  → RETIRE
```

Global search/replace, early deletion and repair-after-breakage are not approved strategies.
