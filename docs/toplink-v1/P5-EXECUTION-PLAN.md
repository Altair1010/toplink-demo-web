# P5 WordPress Foundation Implementation Plan

> **Execution:** One Codex agent executes this plan inline. No P6 integration, verifier agent, merge or deployment is authorized.

**Goal:** Build a reproducible localhost WordPress editorial system whose five-domain REST projection fails closed and is ready for human review before P6.

**Architecture:** Docker Compose runs pinned official WordPress, MariaDB and WP-CLI images with persistent named volumes and untracked local secrets. A single `toplink-content-model` plugin owns the schema registry, native editorial UI, capabilities, publication validation, media/settings governance and read-only `toplink/v1` REST projection. `web/` remains fixture-driven and `app-demo/` remains untouched.

**Tech stack:** Docker Compose, WordPress core, PHP, MariaDB, WP-CLI, Python standard library verification scripts, native WordPress REST API.

**Spec:** Current P5 master execution prompt plus `docs/toplink-v1/product/CONTENT-CONTRACTS.md` and `docs/toplink-v1/architecture/WORDPRESS-CONTENT-MODEL.md`.

## Global constraints

- Branch `feat/v1-wordpress-foundation` is based exactly on `74ca8f120fa6a1630d9bca16191291bd6a366afa`.
- Public normalized domains are exactly `Service`, `Product`, `Article`, `Media`, `SiteSettings`.
- Fact statuses are exactly `APPROVED`, `PENDING`, `REJECTED`, `REFERENCE_ONLY`; lifecycle values are exactly `draft`, `in_review`, `approved`, `published`.
- WordPress binds only to `127.0.0.1`; the database has no host port; secrets and runtime data remain untracked.
- No price, commerce, booking, WPGraphQL, ACF, page builder, frontend CMS client, preview, webhook, deployment, merge or production change.
- Tests may mutate only unmistakably local `__P5_CONTRACT_TEST__` records and must not delete user-created CMS records.
- Verification is V0, one same-agent V1 review, one batch fix and one confirmation only unless a P5 exit blocker remains.

## Task 1 — Reproducible local foundation

**Files:** `wordpress/compose.yaml`, `.env.example`, `.gitignore`, `README.md`, `IMAGE-LOCK.md`, `scripts/bootstrap.ps1`, `scripts/wp.ps1`.

- [ ] Resolve supported official image tags and immutable digests from actual pulls.
- [ ] Add localhost-only WordPress publishing, internal-only database networking and persistent named volumes.
- [ ] Add untracked local credentials and an idempotent install/activation/bootstrap path.
- [ ] Prove database health, HTTP reachability, installed core and repeatable second bootstrap.

## Task 2 — Contract-first plugin and RED tests

**Files:** `wordpress/plugins/toplink-content-model/toplink-content-model.php`, focused files under `src/`, and `wordpress/tests/contract/`.

- [ ] Add a static contract test that initially fails because the plugin/schema/endpoints do not exist.
- [ ] Implement one central schema registry for core mappings, owners, requiredness, types, status/source gates, sanitizers, enums and REST eligibility.
- [ ] Register Service/Product CPTs, `service_group`, core Article category mapping, attachment governance and SiteSettings without a theme or field framework.
- [ ] Run PHP syntax and focused contract checks to GREEN before expanding runtime behavior.

## Task 3 — Editorial workflow and publication gates

**Files:** plugin role, admin UI, persistence and gate modules.

- [ ] Add native meta boxes/settings controls with nonce, capability, sanitization and escaped output.
- [ ] Enforce Author draft/review-only capabilities across Article, Service and Product; grant Editor review/publish/settings capability without plugin/theme administration.
- [ ] Validate required value/status/source, lifecycle, evidence, customer-story consent and related media before publication; retain blocked records as draft/pending and display actionable notices.
- [ ] Add idempotent categories, roles and local dev users through bootstrap.

## Task 4 — Safe five-domain REST projection

**Files:** plugin projection and REST route modules.

- [ ] Register read-only `toplink/v1` endpoints for service/product/article collections and detail, media, site-settings and explicit schema.
- [ ] Query only eligible published records and emit only approved allowlisted fields; omit internal governance and optional non-approved facts.
- [ ] Return stable empty/not-found behavior and verify mutation methods are unavailable anonymously.

## Task 5 — Nonproduction seeds and deterministic A–L verification

**Files:** `wordpress/scripts/seed.ps1`, `verify-p5.py`, contract fixtures only where needed.

- [ ] Seed only draft/reference-only records labelled `P5 FIXTURE — KHÔNG PHẢI NỘI DUNG SẢN XUẤT`, idempotently.
- [ ] Implement A–L runtime tests for roles, publication gates, omission semantics, story/media/settings gates, five domains, forbidden commerce and secrets.
- [ ] Reuse stable test records and never delete or alter user-created CMS content.

## Task 6 — Documentation, preservation and closeout

**Files:** `docs/toplink-v1/p5/*.md`, `docs/toplink-v1/WORKSTATE.md`.

- [ ] Document implementation, REST map/examples, editorial workflow, gates, seeds, actual versions/digests, tests and genuine open findings.
- [ ] Run V0: Docker/runtime, plugin, PHP syntax, A–L, secret scan, fixture-boundary verifier, preservation diffs and `git diff --check`.
- [ ] Perform one same-agent V1 audit, one bounded correction batch, then one fresh confirmation.
- [ ] On complete evidence only, set WORKSTATE to P5 human gate, create logical commits, push the P5 branch and stop before P6.
