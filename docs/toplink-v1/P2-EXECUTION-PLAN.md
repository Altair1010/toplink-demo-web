# Toplink V1 P2 Product / IA / Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. P2 is one-agent work; do not dispatch sub-agents.

**Goal:** Establish an evidence-backed product, route, content, conversion, SEO and CMS contract that lets P3, P4 and P5 work from one stable product truth without selecting a visual direction.

**Architecture:** Documentation is split by downstream consumer: `PRODUCT.md` owns product truth, product files own audience/IA/content/conversion/editorial/SEO contracts, and the existing page-archetype and WordPress files are promoted rather than duplicated. `WORKSTATE.md` remains the single live handoff. All facts fail closed through owner/source/status and `PENDING` semantics.

**Tech Stack:** Markdown contracts, Git, PowerShell-based deterministic checks, existing Next.js verifier as a single closeout regression guard.

**Spec:** `docs/toplink-v1/execution/PHASE-2-IA-CONTENT.md` plus the current P2 execution prompt.

## Global Constraints

- Base P2 exactly on approved P1 SHA `4c93285bb1290100c388e4efe6a40879310f4393`.
- Do not modify `app-demo/**`, install dependencies, fetch Hallmark/Impeccable, or begin P3.
- Do not add public pricing, ecommerce, lead forms, booking storage, franchise navigation or invented contact facts.
- Treat Sen as UI/UX/morphology reference only; `REFERENCE GRAMMAR != TOPLINK DESIGN`.
- Use exactly the canonical fact states `APPROVED`, `PENDING`, `REJECTED`, `REFERENCE_ONLY`.
- Keep fact status independent from editorial lifecycle `draft`, `in_review`, `approved`, `published`.
- No file deletion, merge, deploy, repository visibility change or production mutation.

---

### Task 1: Establish the P2 execution surface

**Files:**

- Create: `docs/toplink-v1/P2-EXECUTION-PLAN.md`
- Modify: `docs/toplink-v1/WORKSTATE.md`

**Interfaces:**

- Consumes: approved P1 branch/HEAD and P1 human-gate state.
- Produces: isolated P2 branch metadata, active route and one exact `NEXT ACTION`.

- [x] Verify `origin/research/v1-reference-system`, `origin/main`, clean worktree and P1 gate.
- [x] Create `product/v1-ia-content` at the approved P1 SHA.
- [x] Move WORKSTATE to `P2 / IN PROGRESS — PRODUCT / IA / CONTENT` with the resolved worktree and active route.
- [x] Verify branch start and status using `git status --short --branch` and `git merge-base`.

### Task 2: Define product truth, audiences and route jobs

**Files:**

- Create: `docs/toplink-v1/PRODUCT.md`
- Create: `docs/toplink-v1/product/AUDIENCE-JOURNEY-MAP.md`
- Create: `docs/toplink-v1/product/IA-CONTENT-MAP.md`
- Modify: `docs/toplink-v1/art-direction/PAGE-ARCHETYPES.md`

**Interfaces:**

- Consumes: D-001, D-017 through D-022, D-028 through D-032, D-039, audience authority and approved P1 synthesis.
- Produces: product boundaries, five journeys, canonical candidate route graph and complete page-job records.

- [x] Write product definition, user outcomes, commercial path, trust model and explicit in/out scope.
- [x] Map all five audiences from need through a safe next step, including a non-converting knowledge-only completion path.
- [x] Validate each route by distinct page job, content model or navigation need.
- [x] Specify all 12 route patterns with audience, intent, content, trust, conversion, links, owner and pending behavior.
- [x] Separate evergreen knowledge from news/operations/customer stories and keep `/nhuong-quyen` backlog-only.

### Task 3: Define production content and fact contracts

**Files:**

- Create: `docs/toplink-v1/product/CONTENT-CONTRACTS.md`

**Interfaces:**

- Consumes: product route jobs, source-of-truth fact classes and health-copy constraints.
- Produces: P4 fixture and P5 schema inputs for `Service`, `Product`, `Article`, `Media` and `SiteSettings`.

- [x] Define the four owner families `BUSINESS`, `EDITORIAL`, `MEDIA`, `SYSTEM` and canonical status axes.
- [x] Define each field with owner, authoritative source, fact status, required/optional semantics and pending behavior.
- [x] Add editorial lifecycle only where content operations require it.
- [x] Define evidence, limitation, caution and professional-escalation requirements without diagnosing users.
- [x] Prove no field exists without a P3/P4/P5/P6/P7 consumer.

### Task 4: Define conversion and editorial evidence policy

**Files:**

- Create: `docs/toplink-v1/product/CTA-CONVERSION-MAP.md`
- Create: `docs/toplink-v1/product/EDITORIAL-EVIDENCE-POLICY.md`

**Interfaces:**

- Consumes: external-only handoff decisions, product journeys and content status model.
- Produces: CTA intent taxonomy, fail-closed destination rules and real-story publication gate.

- [x] Separate `NAVIGATION`, `DISCOVERY`, `LEARN` and `CONTACT` actions.
- [x] Specify `contact_zalo`, `contact_facebook`, `contact_phone` by intent, page eligibility, verified destination and pending behavior.
- [x] Prohibit pressure patterns and keep contact subordinate to learning/trust.
- [x] Define consent, identity/media authorization, context and health-claim gates for customer stories.
- [x] Confirm no synthetic testimonial surface exists when evidence is absent.

### Task 5: Align SEO and WordPress downstream contracts

**Files:**

- Create: `docs/toplink-v1/product/SEO-CONTENT-ARCHITECTURE.md`
- Modify: `docs/toplink-v1/architecture/WORDPRESS-CONTENT-MODEL.md`
- Modify: `docs/toplink-v1/SOURCE-REGISTER.md`

**Interfaces:**

- Consumes: final candidate routes and content contracts.
- Produces: semantic URL/topic/metadata/schema rules and an implementation-ready P5 draft with no duplicate domain model.

- [x] Define clean URL patterns, bounded contextual links, metadata fields and verified-fact schema eligibility.
- [x] Align WordPress CPT/core-post/page/settings fields to content contracts.
- [x] Keep `toplink-content-model`, native REST, no paid field/page-builder/GraphQL/ecommerce/translation dependency.
- [x] Record the current P2 prompt and approved P1 corpus authority without changing locked precedence.
- [x] Bound English readiness to future compatibility only.

### Task 6: Reverse-audit, verify and stop at the human gate

**Files:**

- Modify: `docs/toplink-v1/WORKSTATE.md`

**Interfaces:**

- Consumes: every P2 contract.
- Produces: a pushed, clean P2 branch with exactly one human-review next action.

- [ ] Audit backward from P3 comparable directions, P4 fixtures and P5 WordPress schema; remove speculative items with no consumer.
- [ ] Cross-check PRODUCT, page jobs, journeys, contracts, CTA, SEO, WordPress and DECISIONS once.
- [ ] Run deterministic contract checks, Markdown formatting, secret/deletion/app-diff checks and `git diff --check`.
- [ ] Run `npm run verify` at most once as the closeout regression guard.
- [ ] Commit in semantic groups, push `product/v1-ia-content`, verify local/remote parity and no PR/merge/deploy.
- [ ] Close WORKSTATE as `P2 COMPLETE — AWAITING HUMAN / CHATGPT REVIEW BEFORE P3` with exactly one `NEXT ACTION`.

## Self-review

- Spec coverage: tasks map to every required P2 artifact and exit criterion.
- Placeholder scan: no implementation placeholders or speculative artifact tasks remain.
- Contract consistency: route, field, fact-state, editorial-state and contact identifiers are defined once and reused downstream.
