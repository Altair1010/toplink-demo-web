# WORKSTATE — Toplink V1

**Updated:** 2026-08-30 23:22 +07:00  
**Project:** Y Viện Toplink Commercial Headless Redesign V1  
**Phase:** P1  
**Status:** IN PROGRESS — REFERENCE EXTRACTION  
**Local root:** `F:\Codex\Yvien Hotlink Website`  
**Resolved repository path:** `F:\Codex\Yvien Hotlink Website`  
**Application path:** `F:\Codex\Yvien Hotlink Website\app-demo`  
**P0 worktree:** `F:\Codex\yvien-v1-foundation`  
**Reference package:** `F:\Codex\Yvien Hotlink Website\Z-NeededUpdate\reference\toplink-headless-commercial-redesign-master-v1.0.0`  
**GitHub repository:** `https://github.com/Altair1010/toplink-demo-web`  
**Current branch:** `research/v1-reference-system`  
**Baseline origin/main SHA:** `b98dfd063f6bc8f63e43a65bb8cfe617c750c111`  
**Approved P0 base SHA:** `12be3fe9e99d022c3a11005712244b2877002733`  
**Branch start HEAD:** `12be3fe9e99d022c3a11005712244b2877002733`  
**Actor holding implementation:** Codex

**Active route:** RECOVER MINIMUM STATE → SEN LIVE EXTRACTION  
**Gate state:** P1 ACTIVE — REFERENCE EXTRACTION ONLY

## Completed work

- P0 was approved by ChatGPT Web / Human for the single transition P0 → P1.
- Fetched origin and verified `origin/main` remains
  `b98dfd063f6bc8f63e43a65bb8cfe617c750c111`.
- Verified `origin/chore/v1-foundation` and the clean P0 worktree are both at approved SHA
  `12be3fe9e99d022c3a11005712244b2877002733`.
- Created `research/v1-reference-system` at the approved P0 SHA in the existing linked worktree.
- Read the minimum P1 authority and source-policy set; no conflict blocks capture.

## In-progress work

- Discovering the current live Sen route/state surface before representative capture.

## Blockers

- None at the P1 start gate.

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

Discover the current live Sen route and morphology set, then select the smallest representative capture corpus.

## Human gate

Required before P2, merge, deployment, repository visibility change or archive-tag creation.
