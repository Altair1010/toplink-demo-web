# P0 Findings and Blockers

## Real findings

| ID     | Severity      | Finding                                                                                                                                                                                                                 | P0 disposition                                                                                            |
| ------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| P0-F01 | human gate    | GitHub repository is currently `PUBLIC`; D-006 intends production to become private. Visibility change may affect Pages and collaboration.                                                                              | Recorded only. Do not mutate visibility in P0 without explicit external-action approval.                  |
| P0-F02 | human gate    | Master plan requests a pre-V1 archival tag after user approval. Existing `humanizer-h7-final-20260829` and `archive/no-merge-snapshot` provide provenance, but neither is silently reinterpreted as the requested gate. | No tag created. Human may decide whether existing provenance is sufficient or authorize a new tag.        |
| P0-F03 | environment   | Project/CI contract is Node 20, while this local P0 shell ran Node `v24.16.0` and npm `11.13.0`.                                                                                                                        | All checks passed locally; future release qualification should also run in the pinned Node 20 CI/runtime. |
| P0-F04 | continuity    | `app-demo/` is the actual application directory but the Git repository root is its parent.                                                                                                                              | Resolved paths are recorded in `WORKSTATE.md`; all npm commands run from `app-demo`.                      |
| P0-F05 | architecture  | Static GitHub Pages workflow cannot implement the locked headless WordPress target without later architecture/deployment changes.                                                                                       | Expected phase drift, not a P0 failure. No deployment config was changed.                                 |
| P0-F06 | test coverage | Current verification has strong build/type/format/token/route gates but no aggregated test script, general component/e2e suite, real screen-reader speech proof or PR-only CI.                                          | Inventory only; do not expand tooling in P0.                                                              |

## Blocker assessment

No technical blocker prevents human review or later P1 planning. P0-F01 and P0-F02 are deliberate
human-gated external decisions and remain open; neither authorizes automatic action.

## Scope findings intentionally not fixed

- H7 hardcoded copy, route model, colors, typography, motion and navigation are deprecated but intact.
- The `app-demo → web` restructure is proposed by the target architecture but was not started.
- No dependency was removed even when a file or style appeared unused.
- No fake contact destination, health claim, facility media or business fact was added.
