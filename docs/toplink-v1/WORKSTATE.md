# WORKSTATE — Toplink V1

**Updated:** 2026-08-31 12:00 +07:00  
**Project:** Y Viện Toplink Commercial Headless Redesign V1  
**Phase:** P3A  
**Status:** IN PROGRESS — ART DIRECTION SPRINT  
**Local root:** `F:\Codex\Yvien Hotlink Website`  
**Resolved repository path:** `F:\Codex\Yvien Hotlink Website`  
**Application path:** `F:\Codex\Yvien Hotlink Website\app-demo`  
**P0 worktree:** `F:\Codex\yvien-v1-foundation`  
**Reference package:** `F:\Codex\Yvien Hotlink Website\Z-NeededUpdate\reference\toplink-headless-commercial-redesign-master-v1.0.0`  
**GitHub repository:** `https://github.com/Altair1010/toplink-demo-web`  
**P1 branch:** `research/v1-reference-system`  
**Baseline origin/main SHA:** `b98dfd063f6bc8f63e43a65bb8cfe617c750c111`  
**Approved P0 base SHA:** `12be3fe9e99d022c3a11005712244b2877002733`  
**Branch start HEAD:** `12be3fe9e99d022c3a11005712244b2877002733`  
**P1 content checkpoint HEAD:** `f05c7715a6bed44fc1d0461d04acb7762a510375`  
**Verified remote checkpoint before closeout commit:** `f05c7715a6bed44fc1d0461d04acb7762a510375`  
**Approved P1 base SHA:** `4c93285bb1290100c388e4efe6a40879310f4393`  
**P2 branch start HEAD:** `4c93285bb1290100c388e4efe6a40879310f4393`  
**Approved P2 base SHA:** `c568ff39fd640d383b84c150a3be65d1ac04c9ca`  
**P3A branch start HEAD:** `c568ff39fd640d383b84c150a3be65d1ac04c9ca`  
**Current branch:** `design/v1-direction`  
**Resolved P2 worktree:** `F:\Codex\yvien-v1-foundation`  
**P2 remote checkpoint before closeout commit:** `dcfa8fce6f2aec3aaf04506a4f45d08929db13e7`  
**Resolved P3A worktree:** `F:\Codex\yvien-v1-foundation`  
**Actor holding implementation:** Codex

**Active route:** TOOL SETUP → DIRECTION SPRINT  
**Gate state:** P3A IN PROGRESS

## Completed work

- Human / ChatGPT approved the single transition P1 → P2.
- Fetched origin and verified `origin/research/v1-reference-system` at approved SHA
  `4c93285bb1290100c388e4efe6a40879310f4393` and `origin/main` unchanged at
  `b98dfd063f6bc8f63e43a65bb8cfe617c750c111`.
- Reused the clean linked worktree and created `product/v1-ia-content` exactly from the approved P1 SHA.
- Read the minimum P2 authority set; no authority contradiction blocked product specification.
- Defined the V1 product role, outcomes, commercial path, trust model, in-scope/out-of-scope and bounded
  future-English readiness.
- Mapped all five audience journeys, including a knowledge-only completion path with no contact requirement.
- Promoted a 12-pattern candidate route graph with 12 distinct page jobs; knowledge/news remain distinct
  and `/nhuong-quyen` remains backlog-only.
- Defined exactly five domain objects with 57 production-facing field contracts, including 39 required
  fields and universal fail-closed pending behavior.
- Separated four canonical fact statuses from the private editorial lifecycle.
- Defined navigation/discovery/learn/contact action classes and verified-destination gates for Zalo,
  Facebook/Messenger and phone.
- Defined the real-story/consent/media evidence policy, semantic SEO architecture and WordPress P5 draft.
- Completed reverse-graph and same-agent consistency review for P3/P4/P5 consumers.
- Ran the bounded P2 verification ladder and the unchanged application verifier successfully.
- Committed product/IA and content/conversion/CMS checkpoints and created the remote P2 branch.

## In-progress work

- Fetch and verify pinned Hallmark/Impeccable method sources.
- Prepare the same representative content and three materially distinct browser directions.

## Blockers

- No technical blocker to P2 human review.
- P3 remains blocked by the required Human / ChatGPT approval gate.

## Decisions encountered

- The initial 12 route patterns all retain distinct jobs; no route was collapsed or added.
- Knowledge and news share an Article domain but retain different page jobs, URL namespaces and
  editorial intent.
- Five domain objects are sufficient for current consumers; no branch, CTA, FAQ or taxonomy object was
  added speculatively.
- `editorial_lifecycle` is private control metadata, not a fact-status field.
- Organization/contact/service/product/place/story facts that are not supplied remain `PENDING` and
  fail closed.
- No visual family, palette, font, pattern, token, motion or composition was selected.
- Hallmark and Impeccable have no P2 consumer and were not fetched or installed.
- No locked decision changed; no new ADR was required.

## Files changed

- Created: `docs/toplink-v1/PRODUCT.md`, `docs/toplink-v1/P2-EXECUTION-PLAN.md`.
- Created: `docs/toplink-v1/product/AUDIENCE-JOURNEY-MAP.md`, `IA-CONTENT-MAP.md`,
  `CONTENT-CONTRACTS.md`, `CTA-CONVERSION-MAP.md`, `EDITORIAL-EVIDENCE-POLICY.md`,
  `SEO-CONTENT-ARCHITECTURE.md`.
- Modified: `docs/toplink-v1/art-direction/PAGE-ARCHETYPES.md`,
  `docs/toplink-v1/architecture/WORDPRESS-CONTENT-MODEL.md`,
  `docs/toplink-v1/SOURCE-REGISTER.md`, `docs/toplink-v1/WORKSTATE.md`.
- Application source/config/dependencies: unchanged.

## Evidence created

- Product truth and route/page-job contracts for P3 comparison.
- Five audience journey records for P3/P4 content requirements.
- Five-domain, 57-field contract with 39 required production fields for P4/P5/P6.
- CTA/contact, editorial evidence, SEO and WordPress alignment contracts for P5/P7.
- Deterministic audit output: 12 routes, 12 page jobs, five audiences, zero app diff/deletion/schema
  violations and complete field governance.

## Commands and checks actually run

- `git fetch --prune origin`: PASS; P1/base and main refs matched the approved prompt.
- Linked-worktree/Git start checks: PASS; clean P1 state, exact base, no existing P2 branch.
- Markdown formatting writes/check: PASS. One initial check was run from `app-demo` with root-relative
  paths and matched no docs; rerunning from repository root passed.
- Deterministic P2 audit: PASS after replacing a PowerShell backtick-sensitive dynamic `rg` pattern
  with literal matching; 12 routes/jobs, five audiences, 57 fields, 39 required, all field governance.
- `npm run verify`: PASS once at closeout (Next build 12 static surfaces, TypeScript, formatting,
  35 token colors, six-route legacy release-surface guard).
- `git diff --check`: PASS.
- Application-diff, tracked-deletion, dependency/tool-install, secret-signature, fake-contact,
  final-hex and forbidden-schema checks: PASS, all zero.
- `git push -u origin product/v1-ia-content`: PASS; remote branch created at
  `dcfa8fce6f2aec3aaf04506a4f45d08929db13e7` before the closeout commit.

## Test/build results

- P2 contract/integrity audit: PASS.
- Existing application verification: PASS on the unchanged application.
- No browser/visual QA was run because P2 contains no application or visual change.

## Unresolved findings

- Approved service taxonomy/facts and product records have not yet been supplied; their public records
  remain unpublished under the contract.
- Exact Zalo, Facebook/Messenger and phone destinations, address, hours and legal identifiers remain
  `PENDING`.
- Actual authorized Toplink space/people/media and real consented customer stories remain unavailable.
- Final art direction, palette, typography, pattern, media system and motion intensity remain P3/later
  decisions by design.
- Repository visibility, archive tag and all production/release actions remain human-gated.

## Next actor

`Codex` until P3A reaches the human direction gate.

## NEXT ACTION

Fetch and verify the pinned Hallmark and Impeccable method sources for the P3A direction sprint.

## Human gate

Required before selecting a direction, P3B, P4, merge, deployment, repository visibility change or archive-tag creation.
