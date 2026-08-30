# WORKSTATE — Toplink V1

**Updated:** 2026-08-30 23:22 +07:00  
**Project:** Y Viện Toplink Commercial Headless Redesign V1  
**Phase:** P0  
**Status:** COMPLETE — READY FOR HUMAN REVIEW  
**Local root:** `F:\Codex\Yvien Hotlink Website`  
**Resolved repository path:** `F:\Codex\Yvien Hotlink Website`  
**Application path:** `F:\Codex\Yvien Hotlink Website\app-demo`  
**P0 worktree:** `F:\Codex\yvien-v1-foundation`  
**Reference package:** `F:\Codex\Yvien Hotlink Website\Z-NeededUpdate\reference\toplink-headless-commercial-redesign-master-v1.0.0`  
**GitHub repository:** `https://github.com/Altair1010/toplink-demo-web`  
**Current branch:** `chore/v1-foundation`  
**Baseline origin/main SHA:** `b98dfd063f6bc8f63e43a65bb8cfe617c750c111`  
**Branch start HEAD:** `b98dfd063f6bc8f63e43a65bb8cfe617c750c111`  
**P0 content checkpoint HEAD:** `27e1239a47daf96850551fe218184a70f33b1d43`  
**Verified remote branch SHA before closeout commit:** `27e1239a47daf96850551fe218184a70f33b1d43`  
**Actor holding implementation:** Codex

**Gate state:** P0 COMPLETE — AWAITING HUMAN / CHATGPT REVIEW BEFORE P1

## Completed work

- Verified the read-only master package against all listed SHA-256 checksums.
- Resolved the repository root and captured clean pre-mutation Git/worktree state.
- Fetched and verified canonical GitHub metadata without pull/merge.
- Confirmed package baseline and current `origin/main` are the same SHA.
- Created isolated `chore/v1-foundation` worktree from `origin/main`.
- Installed the governing package under `docs/toplink-v1/` with the package-provided script.
- Added a minimal V1 authority notice to the existing `AGENTS.md`; preserved all H7 text.
- Inventoried architecture, routes, client boundaries, styling, accessibility, assets, content,
  dependencies, tooling and CI.
- Classified all 65 baseline tracked files across the four required salvage states.
- Captured six desktop routes, mobile homepage, mobile navigation and three semantic snapshots.
- Ran baseline dependency, state-test and full repository verification successfully.
- Committed logical P0 checkpoints and pushed only `chore/v1-foundation` to GitHub.

## In-progress work

- None. Work is stopped at the P0 human gate.

## Blockers

- No technical blocker to human review.
- Human-gated open items: repository-private transition and whether a separate pre-V1 archive tag is
  required beyond existing provenance.

## Decisions encountered

- Package branch convention `chore/v1-foundation` governed over the fallback branch name.
- No locked decision changed; no new ADR created.
- H7 remains engineering salvage only and has no target-design authority.

## Files changed

- Modified: `AGENTS.md` (V1 authority notice only).
- Created: master package payload under `docs/toplink-v1/` as prescribed by
  `bootstrap/install-plan.ps1`; the installer intentionally excludes its own `bootstrap/` helpers.
- Created: `P0-EXECUTION-PLAN.md`, `P0-REPOSITORY-BASELINE.md`,
  `P0-ARCHITECTURE-INVENTORY.md`, `P0-SALVAGE-CLASSIFICATION.md`,
  `P0-H7-AUTHORITY-BOUNDARY.md`, `P0-EVIDENCE-INDEX.md`, `P0-FINDINGS-BLOCKERS.md`,
  `P0-DECISION-LEDGER.md`, `SOURCE-REGISTER.md`, and this file.
- Created: 8 PNG screenshots and 3 YAML semantic snapshots under
  `evidence/p0-baseline/`.
- Application source/config/dependencies: unchanged.

## Evidence created

- See `P0-EVIDENCE-INDEX.md` for paths, capture conditions and SHA-256 hashes.
- Playwright scratch output was preserved outside the repo at
  `F:\tmp\toplink-p0-playwright-cli-20260830-1612` and is not part of the deliverable.

## Commands and checks actually run

- package checksum loop with `Get-FileHash -Algorithm SHA256`: PASS.
- `git fetch origin --prune --tags`: PASS.
- `gh repo view Altair1010/toplink-demo-web ...`: PASS; default `main`, visibility `PUBLIC`.
- `npm ci`: PASS; 49 packages added, 50 audited, 0 vulnerabilities.
- `node --test components/home-experience/corrected/orientation-state.test.mjs`: PASS 10/10.
- `node --test components/home-experience/corrected/evidence-visibility.test.mjs`: PASS 4/4.
- `npm run verify`: PASS (build, TypeScript, Prettier, 35 token colors, six-route release surface).
- Playwright route capture: six HTTP 200 routes; console 0 errors, 0 warnings.
- `git diff --check`: PASS after a scoped Git whitespace rule preserved intentional Markdown hard breaks.
- classification/evidence integrity script: PASS; 65 files classified and 11 evidence hashes matched.
- `git push -u origin chore/v1-foundation`: PASS; remote branch created.

## Test/build results

- Baseline build: PASS on local Node `v24.16.0`, npm `11.13.0`.
- No P0 application behavior was introduced, so no application regression fix was needed.
- Pinned Node 20 CI parity remains a future release check; this is not claimed by the local run.

## Unresolved findings

- Repository remains public while D-006 intends a later private production repo.
- Archive-tag gate needs human interpretation/authorization.
- `app-demo → web` restructure remains proposal only.
- H7 test coverage limits are documented in `P0-FINDINGS-BLOCKERS.md`.

## Next actor

`ChatGPT Web / Human` for P0 review.

## NEXT ACTION

Review and approve the pushed Phase P0 foundation branch before authorizing any P1 reference or brand extraction.

## Human gate

Required before P1, merge, deployment, repository visibility change or archive-tag creation.
