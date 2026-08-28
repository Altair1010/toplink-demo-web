# H6.2 — Verification và rollback M3S-1

## TDD source assertion

Assertion yêu cầu cả bốn file không còn `application/ld+json`/`schema.org`, đồng thời
`Breadcrumbs` vẫn có `nav[aria-label="Breadcrumb"]` và `aria-current="page"`.

- RED: thất bại đúng ở cả bốn emitter trước mutation.
- GREEN: pass sau mutation.

## Static và build

- `npm run verify`: PASS.
  - Next production build: PASS, 34 static/SSG routes.
  - TypeScript: PASS.
  - Prettier: PASS.
  - token checker: PASS — 35 token màu, 0 class mồ côi.
- `git diff --check`: PASS.
- source emitter scan: `0`.
- built-output emitter scan: `0`.

## Browser

Origin kiểm thử: `http://localhost:3000/toplink-demo-web`.

| Check                                                              | 375  | 1280 |
| ------------------------------------------------------------------ | ---- | ---- |
| `/` render, không overflow, JSON-LD = 0                            | PASS | PASS |
| `/dich-vu/goi-dau-duong-sinh/` render, không overflow, JSON-LD = 0 | PASS | PASS |
| `/lien-he/` render, không overflow, JSON-LD = 0                    | PASS | PASS |

Breadcrumb service detail:

- visible `nav`: PASS;
- hai link trung gian: PASS;
- current item `Gội đầu dưỡng sinh`: PASS;
- link nhận focus bằng keyboard: PASS.

Contact heading và visible FAQ: PASS. Console error trên các route kiểm tra: `0`.

## Network

M3S-1 không thêm request/fetch nào. Diff chỉ xóa script/object/import machine-readable.
Iframe Google Maps hiện hữu ở `/lien-he` vẫn tự phát request tới Google Maps; đó là hành vi baseline
ngoài M3S-1 và source iframe không đổi.

Regression riêng `/dat-lich`:

- hidden POST form: `0`;
- mutating request trong booking flow: `0`;
- false-success copy: `0`;
- no-send consequence, edit, uncertain và stop: PASS;
- booking console error: `0`.

## Scope assertions

- production mutation đúng bốn file được duyệt;
- homepage source: unchanged;
- booking files: unchanged;
- `tokens.css`, `skins.css`, `DESIGN.md`, dependencies: unchanged;
- metadata và visible factual copy: unchanged.

## SEO consequence

Rich-result eligibility có thể giảm tạm thời do JSON-LD bị bỏ. Đây là trade-off được chấp nhận:

```text
TRUTHFUL MACHINE OUTPUT > UNVERIFIED SEO ENRICHMENT
```

## Rollback

Technical revert boundary là bốn production file của M3S-1. Tuy nhiên safe release fallback không
được khôi phục schema chưa xác minh chỉ để lấy lại SEO. Nếu omission gây lỗi implementation, sửa
omission theo hướng không phát machine claim. Chỉ phục hồi emitter khi mọi field có nguồn factual
được phê duyệt.
