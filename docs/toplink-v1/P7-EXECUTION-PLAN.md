# P7 Commercial Web Capabilities — Implementation Plan

> **Execution mode:** Codex thực thi nội tuyến trong một batch; không tạo agent/verifier khác. Mọi bước dừng tại human gate trước P8.

**Goal:** Tạo lớp liên hệ đã xác minh, analytics trung lập vendor và SEO/structured-data fail-closed cho frontend CMS-backed V1.

**Architecture:** `SiteSettings` đã normalize là nguồn duy nhất cho contact. Các pure boundary dưới `web/lib/` chịu trách nhiệm validation, analytics payload, public origin, metadata và JSON-LD; React chỉ nhận action đã hợp lệ. Next.js Metadata API cùng `app/sitemap.ts` và `app/robots.ts` chiếu các public record đã publish, không tạo thêm domain hoặc production fact.

**Tech stack:** Next.js 16.3.3, React 19.2.7, TypeScript 5.9.3, Node built-in test runner, Playwright hiện có; không thêm dependency.

**Authority:** Master P7 execution prompt ngày 2026-09-01; `DECISIONS.md`, `PRODUCT.md`, CTA/SEO/content contracts và P6 CMS/domain contracts.

## Global constraints

- Base chính xác `dac2f933f65a05417094bb4261a21e32c78d1f5a`; branch `feat/v1-commercial-web`.
- Chỉ `APPROVED` contact fact có thể tạo action; destination không hợp lệ phải fail closed.
- Analytics payload chỉ gồm event, channel, placement và destination class; không chứa URL, phone, nội dung, PII, health data hoặc provenance.
- Không tải GA/GTM/Meta/TikTok nếu chưa có cấu hình và explicit allow; không hardcode ID.
- `TOPLINK_PUBLIC_SITE_URL` là origin canonical duy nhất: loopback HTTP được phép local, nonlocal bắt buộc HTTPS.
- Preview `noindex,nofollow`, không analytics, không sitemap/public-cache contamination.
- Không `Offer`, giá, rating, review, fake author/media, Organization hoặc LocalBusiness khi thiếu fact.
- Không xóa file, không thay `app-demo/`, không merge/deploy và không bắt đầu P8.

## File map

- `web/lib/contact/actions.ts`: chuyển `APPROVED SiteSettings` thành validated contact actions.
- `web/lib/analytics/events.ts`, `data-layer.ts`, `config.ts`: typed event contract, first-party dataLayer boundary và disabled-by-default vendor config.
- `web/components/content/TrackedContactLink.tsx`: client island nhỏ, track đồng bộ rồi để native navigation tiếp tục.
- `web/components/content/ContactDirectory.tsx`: render action đã validate theo placement; zero link khi pending/invalid.
- `web/lib/seo/origin.ts`, `metadata.ts`, `sitemap.ts`, `structured-data.ts`: canonical origin, metadata/OG, route eligibility và JSON-LD serialization.
- `web/components/content/Breadcrumbs.tsx`, `JsonLd.tsx`: semantic route ancestry và sanitized structured-data output.
- `web/app/**`: route metadata, preview policy, breadcrumbs/contact placements; `sitemap.ts`, `robots.ts`.
- `web/tests/p7-*.test.ts`: deterministic contracts; existing P5/P6 suites remain regression authority.
- `web/scripts/verify-p7-browser.mjs`: representative metadata/contact/network/preview checks without fake production facts.
- `docs/toplink-v1/p7/*`: contracts, implementation/test evidence, Search Console/local SEO boundary và open findings.

## Task 1 — Contact and analytics boundary (RED → GREEN)

- [ ] Add failing tests proving approved valid Zalo/Facebook/phone actions, pending zero-action and invalid approved-looking values fail closed.
- [ ] Add failing tests proving the three canonical events and six placement types serialize exactly without raw destination or content fields.
- [ ] Run only P7 contact/analytics tests and confirm expected missing-module failures.
- [ ] Implement minimal pure validators/action builder, typed analytics payload and first-party dataLayer dispatch.
- [ ] Wrap only outbound contact anchors in a client component; native outbound navigation is never awaited.
- [ ] Pass explicit placement from existing Direction C surfaces; do not add new sales surfaces.
- [ ] Re-run focused tests and existing P6 contract tests.

## Task 2 — Origin, metadata, sitemap and robots (RED → GREEN)

- [ ] Add failing tests for loopback/nonlocal origin validation, canonical composition, environment indexing policy and metadata omission rules.
- [ ] Add failing sitemap tests for public/new slug inclusion, old/draft/preview/backlog/API/held route exclusion, uniqueness and meaningful article dates.
- [ ] Add failing robots tests for local/staging deny-all and explicitly configured production policy with sitemap URL.
- [ ] Run focused tests and confirm failures are caused by absent P7 modules.
- [ ] Implement pure SEO helpers and Next.js 16 metadata/file conventions.
- [ ] Populate static metadata with only locked project identity wording; populate detail metadata from approved normalized `seo` and authorized media only.
- [ ] Keep `/lien-he` and `/khong-gian` out of sitemap until current approved facts make those pages useful.
- [ ] Re-run focused tests and build/typecheck.

## Task 3 — Breadcrumbs and structured data (RED → GREEN)

- [ ] Add failing tests for BreadcrumbList, bounded Service and verified Article/BlogPosting; parse output as JSON.
- [ ] Assert prohibited fields/types are structurally absent: `Offer`, price, rating, review and LocalBusiness/Organization under current facts.
- [ ] Confirm RED, then implement centralized builders and `<`-safe JSON serialization.
- [ ] Add semantic breadcrumbs to Service/Product/Knowledge/News details using real canonical ancestry.
- [ ] Emit preview robots only; suppress detail JSON-LD for non-published preview records.
- [ ] Re-run focused and full deterministic suites.

## Task 4 — Documentation and verification harness

- [ ] Create P7 contract/readiness documents and record missing real contact/NAP/media as `PENDING`.
- [ ] Extend package scripts with deterministic P7 and browser commands; do not add packages.
- [ ] Run build, typecheck, formatting, content boundary, P7 tests, P6 verifier, P5 regression, secret/truth/dormant-script/deletion/app-demo scans.
- [ ] Run CMS-backed browser matrix at 375/768/1280/1440 plus P7 metadata/network/contact/preview/slug checks using only restored test-owned state.
- [ ] Record actual Node version and exact outputs in `TEST-REPORT.md`.

## Task 5 — One review, bounded correction and confirmation

- [ ] Inspect full diff, public output and requirement checklist; group defects by root cause.
- [ ] Apply at most one correction batch.
- [ ] Run one complete confirmation ladder and inspect `git diff --check`/status/deletions/app-demo.
- [ ] Update WORKSTATE to `COMPLETE — READY FOR HUMAN REVIEW` only if every P7 gate has fresh evidence.
- [ ] Commit logical checkpoints, push only `feat/v1-commercial-web`, verify remote HEAD/ahead-behind and stop before P8.

## Source notes

- Next Metadata API: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- Next sitemap convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- Next robots convention: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- Next JSON-LD guide and script-context escaping: https://nextjs.org/docs/app/guides/json-ld
