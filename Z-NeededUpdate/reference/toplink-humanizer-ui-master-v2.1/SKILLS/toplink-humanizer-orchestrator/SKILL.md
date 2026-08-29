---
name: toplink-humanizer-orchestrator
description: Primary router for the Toplink Humanizer UI program. Use at session start, phase changes, design migrations, or whenever agent authority/precedence is unclear.
---

# Toplink Humanizer Orchestrator

## First read
1. `00_START_HERE.md`
2. `GOVERNANCE/00_PRECEDENCE.md`
3. `GOVERNANCE/01_GOVERNANCE_BRIDGE.md`
4. `ROUTER.md`
5. repo `AGENTS.md`

## Determine before acting
- current Humanizer phase H0–H6;
- Runtime Truth vs Target Design Truth;
- active Locked/Approved decisions;
- next Human Gate;
- which specialist skill may act.

## Routing
- evidence missing → `human-evidence-harvest`;
- task/state/narrative ambiguity → `humanizer-ux-state-review`;
- direction exploration → `humanizer-art-direction`;
- release/audit → `humanizer-release-verifier`.

## Hard rules
- never treat proposed direction as approved target;
- never let an external skill become design authority;
- never mutate runtime from a target decision without migration approval;
- preserve repo engineering invariants;
- report missing evidence instead of fabricating it.

## Output at bootstrap
Return a Context Load Report with phase, truths, locks, missing evidence, permitted tools and next artifact. Do not code unless the current task explicitly belongs to implementation and mutation is authorized.

## Required knowledge load
- `CONTENT_COVERAGE_MAP.md`
- `FOUNDATION/03_HUMANIZER_MODEL.md`
- `FOUNDATION/14_GRAPH_GATES_PROCESS.md`
- `FOUNDATION/18_TOPLINK_EXECUTION_BRIEF.md`
