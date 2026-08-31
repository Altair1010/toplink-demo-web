# P6 Headless Integration Implementation Plan

> **Execution:** Inline, one agent. Implement each task with a focused RED → GREEN cycle, one bounded correction batch, one confirmation, then stop at the P7 human gate.

**Goal:** Replace fixture-backed public reads with validated, normalized WordPress server reads while preserving the five Toplink domains and locked React morphology.

**Architecture:** `toplink/v1` remains the transport and gains only consumer-driven pagination, relation, redirect, preview and integration-event support. `web/lib/cms/` owns untrusted transport validation, normalization, cache tags, HMAC and preview state; `web/lib/content/` remains the only application-facing access boundary. React receives only `Service`, `Product`, `Article`, `Media`, and `SiteSettings`.

**Tech stack:** WordPress 7.1/PHP 8.3, native REST and hooks; Next.js 16.3.3 App Router, React 19.2.7, strict TypeScript 5.9.3, Node crypto/test runner, existing Playwright.

**Spec:** Current P6 master execution prompt plus `architecture/CMS-ADAPTER-CONTRACT.md`, P5 `REST-SCHEMA-MAP.md`, and `product/CONTENT-CONTRACTS.md`.

## Global constraints

- Base exactly `71361d18ead8b84fdafeb17e8fc28856d2fa3d50`; branch `feat/v1-headless-integration`.
- Exactly five public normalized domains; raw WordPress shapes and IDs never reach React.
- Public reads are server-only and never fall back to fixtures.
- Preview is short-lived, signed, HttpOnly and no-store; public endpoints remain draft-blind.
- Webhook uses HMAC SHA-256 over `timestamp.rawBody`, a five-minute replay window, bounded body size, and scoped revalidation.
- No existing file deletion, no P7 work, no merge, no deployment, no production change.

## File map

- `web/lib/cms/`: transport errors/client, guards, normalizers, domain readers, relations, cache/event map, preview/HMAC utilities.
- `web/lib/content/index.ts`: async application boundary delegating only to CMS readers.
- `web/app/api/cms/`: signed revalidation, preview entry and preview exit route handlers.
- `web/app/**/page.tsx`: await the existing content boundary and remove public fixture notices without changing composition.
- `wordpress/plugins/toplink-content-model/src/`: backward-compatible REST pagination/relation/redirect/preview and independent event emitter.
- `web/tests/` and `wordpress/tests/`: pure contract/security tests plus local lifecycle integration harness.
- `docs/toplink-v1/p6/`: adapter, normalization, cache, preview, failure and verification records.

### Task 1 — Lock transport and normalization contracts

**Produces:** Typed `Cms*Error` classes; validated collection/detail envelopes and five normalized domain outputs.

- [ ] Add Node tests that reject missing required fields, non-APPROVED wrappers, wrong owner/type, empty source, bad article type, invalid media URL/dimensions and generic-stock evidence.
- [ ] Run the focused test and confirm RED because the CMS modules do not exist.
- [ ] Implement small explicit guards and normalizers without a new dependency; derive `editorial_lifecycle: "published"` only after the public envelope passes.
- [ ] Run focused tests and typecheck; confirm GREEN.

### Task 2 — Add bounded P5 REST refinements

**Produces:** `page`/`per_page` collections with `pagination`, route-safe relation slugs, previous-slug resolution and private preview projection.

- [ ] Extend PHP runtime tests first for bounded pagination, no silent truncation, route-safe relation output, redirect lookup and anonymous preview denial.
- [ ] Run P5/P6 focused PHP tests and confirm RED on the missing contract.
- [ ] Add backward-compatible REST fields/endpoints; retain `items` and `count`; cap `per_page`; never expose private governance.
- [ ] Run PHP lint and focused runtime tests; confirm GREEN.

### Task 3 — Cut public reads over to WordPress

**Produces:** Server-only `wp-client`, cached domain readers, async `lib/content`, and CMS-backed server pages.

- [ ] Add boundary tests proving production source cannot import `lib/fixtures/data.ts`, browser code cannot import `lib/cms`, and CMS outage has no fixture fallback.
- [ ] Run the boundary test and confirm RED against the P4 implementation.
- [ ] Implement URL construction, timeout, status/content-type/JSON classification and `next: { revalidate, tags }` fetch policy.
- [ ] Convert content accessors, pages, metadata and static params to async server reads; keep fixture files untouched; remove runtime fixture notices and fixture wording.
- [ ] Add controlled CMS error UI through App Router error boundaries while preserving true 404 behavior.
- [ ] Run adapter tests, typecheck, content boundary check and build; confirm GREEN.

### Task 4 — Signed scoped revalidation and slug behavior

**Produces:** WordPress event emitter, Next revalidation route, explicit event-to-tag/path map and permanent old-slug redirect.

- [ ] Add tests for valid, missing, invalid, stale and tampered signatures plus unsupported event/domain; assert no secret logging.
- [ ] Run focused tests and confirm RED.
- [ ] Implement HMAC helpers and route validation before JSON parse; call Next 16 `revalidateTag(tag, "max")` and only mapped `revalidatePath` values.
- [ ] Add WordPress hooks for publish/update/unpublish/trash/delete/slug/settings/media, deduplicate one save, and fail independently when integration config is absent/unreachable.
- [ ] Persist previous slugs only for P6-owned semantics and redirect old canonical detail paths permanently to the current route.
- [ ] Run security/unit/PHP tests and a localhost Docker→host connectivity probe; confirm GREEN.

### Task 5 — Private draft preview

**Produces:** Five-minute HMAC intent, HttpOnly preview session, private WordPress projection and exit flow.

- [ ] Add tests for valid, expired and modified intents; public draft absence; preview no-store; exit state removal.
- [ ] Run focused tests and confirm RED.
- [ ] Implement WordPress editor preview links/intents and signed private projection without weakening public REST.
- [ ] Implement Next preview entry validation, HttpOnly same-site cookie, canonical redirect, private no-store fetch and preview exit.
- [ ] Run preview security tests and browser smoke; confirm GREEN.

### Task 6 — Local lifecycle and failure verification

**Produces:** Repeatable test-only lifecycle evidence for all five domains and cache propagation.

- [ ] Create/reuse only `__P6_INTEGRATION_TEST__` records and local authorized test media; never mutate user records.
- [ ] Prove draft → valid preview → publish → update → slug redirect → unpublish → trash/delete for one representative record.
- [ ] Prove Service, Product, Article, Media and SiteSettings all traverse REST → validation → normalization → existing React boundary.
- [ ] Prove pagination, relation slugs, cache update without Next restart, controlled CMS 404/outage/schema errors and no fixture fallback.
- [ ] Restore temporary optional SiteSettings data to its prior governed state.

### Task 7 — Regression, review and closeout

**Produces:** P6 documentation, clean commits, pushed branch and P7 human gate.

- [ ] Run P5 verifier after plugin changes.
- [ ] Run web build, typecheck, formatting, content-boundary and 12-route browser audit at 375/768/1280/1440 where publishable state permits.
- [ ] Scan source/build/Git/public REST for integration secrets and credentials; check fixture/app-demo preservation and tracked deletions.
- [ ] Review the full diff once across correctness, simplicity, architecture, security and performance; group blockers into one correction batch.
- [ ] Run one complete confirmation, `git diff --check`, exact base/ahead checks and secret/deletion audits.
- [ ] Update P6 docs and WORKSTATE to `COMPLETE — READY FOR HUMAN REVIEW`, create logical commits, push without merge/deploy, and stop before P7.

## Self-review

- Coverage includes every critical P6 boundary: transport validation, five domains, relations, pagination, async cutover, cache, HMAC/replay, preview, slug change, lifecycle, outage and regressions.
- No new domain, repository framework, queue, GraphQL, page builder, SEO/analytics or deployment layer is introduced.
- Test-owned mutation is namespaced; user CMS records and persistent Docker volumes remain untouched.
