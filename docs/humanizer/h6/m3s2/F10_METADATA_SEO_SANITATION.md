# M3S-2 F10 — Metadata / SEO Sanitation

## Decision

- **Authority:** `DEC-H6-CONSOLIDATED-01 / C5.F10`
- **Baseline:** `a4d7c79925400e5fcffc8bfa107a3aa64b23a239`
- **Family:** visible/browser and machine metadata claims
- **Mutation:** exact metadata owners only; visible route body unchanged

## Safe meaning

Approved brand profile supports the name, Dưỡng Thân · Tỉnh Thức descriptor and communication
behavior. It does not verify service facts, facility location, price/duration, staff, program,
product or health claims. F10 therefore keeps only the approved brand orientation and replaces
fact-bearing descriptions with explicit review/verification boundaries.

## Exact paths

- `app/layout.tsx`, `app/page.tsx`;
- `app/dao-tao/page.tsx`, `app/dat-lich/page.tsx`;
- `app/dich-vu/page.tsx`, `app/dich-vu/[slug]/page.tsx`;
- `app/gioi-thieu/page.tsx`, `app/khong-gian/page.tsx`, `app/lien-he/page.tsx`;
- `app/nhuong-quyen/page.tsx`, `app/quy-trinh-tri-lieu/page.tsx`;
- `app/san-pham/page.tsx`, `app/tin-tuc/page.tsx`, `app/tin-tuc/[slug]/page.tsx`.

## Verification

- all static route/detail variants build;
- dynamic service/article metadata no longer reads price/duration/short/excerpt into output;
- root/open-graph descriptions match the safe brand/boundary copy;
- visible route JSX remains byte-unchanged outside metadata blocks;
- no JSON-LD emitter is restored;
- browser titles/descriptions checked on homepage, service detail and article detail;
- `npm run verify` and `git diff --check` pass.

Result: **PASS**. The production export generated all 34 static pages. Browser inspection of the
homepage, one service detail and one article detail returned HTTP 200, the bounded title and
description, zero JSON-LD nodes and zero console errors with metadata-only JavaScript disabled.

## Rollback

Revert only the F10 commit. Rollback must not be used to republish known mock metadata; the safe
release fallback is omission or the boundary descriptions in this batch.
