# Toplink Commercial Redesign P0 Implementation Plan

> **For agentic workers:** Execute this plan inline on the isolated P0 worktree. Do not dispatch
> additional agents; `DECISIONS.md` limits project actors and the current session forbids delegation.

**Goal:** Establish a verified, reversible and GitHub-resumable V1 foundation without changing the
legacy application experience.

**Architecture:** Preserve `origin/main` as the immutable starting point and perform P0 on
`chore/v1-foundation` in a separate worktree. Install the governing package under
`docs/toplink-v1/`, capture legacy evidence, inventory the repository, and publish documentation-only
handoff state.

**Tech Stack:** Git worktrees, Next.js 16, React 19, TypeScript 5, Tailwind CSS 4, Playwright CLI,
Markdown governance.

**Spec:** `docs/toplink-v1/execution/PHASE-0-FOUNDATION.md`

## Global Constraints

- No existing repository file may be deleted.
- No visual or application behavior change is allowed in P0.
- No WordPress, P1, merge, deployment, DNS change or repository-visibility mutation.
- Branch from verified `origin/main`; package branch convention is `chore/v1-foundation`.
- The H7 implementation is engineering salvage only and has no V1 design authority.
- Exactly one next action must remain in `WORKSTATE.md`.

---

### Task 1: Verify authority and repository identity

**Files:** Read package documents and Git metadata; create no repository files.

- [x] Verify every package entry against `CHECKSUMS.sha256`.
- [x] Capture repo root, remotes, branch, HEAD, worktrees, staged/unstaged/untracked state.
- [x] Run `git fetch origin --prune --tags` without merge or pull.
- [x] Verify GitHub URL, default branch and visibility with `gh repo view`.

### Task 2: Establish isolated P0 worktree

**Files:** Git worktree metadata only.

- [x] Confirm `chore/v1-foundation` does not already exist locally or remotely.
- [x] Create `F:\Codex\yvien-v1-foundation` from verified `origin/main`.
- [x] Confirm the new worktree is clean and `main` remains in its existing worktree.

### Task 3: Prove the unchanged legacy baseline

**Files:** Create browser evidence only under `docs/toplink-v1/evidence/p0-baseline/`.

- [x] Run `npm ci` from `app-demo`.
- [x] Run both Node state test files.
- [x] Run `npm run verify`.
- [x] Run the local app at `http://127.0.0.1:3000/toplink-demo-web/`.
- [x] Capture desktop routes, mobile homepage, open mobile navigation and accessibility snapshots.
- [x] Check browser console errors and warnings.

### Task 4: Install governance and inventory the baseline

**Files:** Modify `AGENTS.md`; create/update P0 records under `docs/toplink-v1/`.

- [x] Install the package with its provided `bootstrap/install-plan.ps1`.
- [x] Add a minimal V1 authority notice to `AGENTS.md` while preserving the H7 contract.
- [x] Document Git/GitHub state, architecture, routes, client boundaries, styles, content, assets,
      accessibility, tooling and dependencies.
- [x] Classify all 65 baseline tracked files as `KEEP-ENGINEERING`, `ADAPT`, `REBUILD` or
      `DELETE-CANDIDATE` with reasons.
- [x] Record evidence hashes, open findings and the live handoff state.

### Task 5: Close P0 without entering P1

**Files:** P0 documents and Git history only.

- [x] Re-run verification, package checksum verification and `git diff --check`.
- [x] Confirm the diff contains no application-source change, deletion, secret or generated build output.
- [x] Commit logical P0 checkpoints and push only `chore/v1-foundation`.
- [x] Update `WORKSTATE.md` to `COMPLETE — READY FOR HUMAN REVIEW` with one next action.
- [x] Stop before P1; do not merge and do not open a PR because the current workflow does not make
      external PR creation an automatic P0 action.
