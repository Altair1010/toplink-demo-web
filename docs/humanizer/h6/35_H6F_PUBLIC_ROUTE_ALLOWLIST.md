# 35 — H6-F Public Route Allowlist

## Decision

The release surface is deliberately smaller than the retained source tree. A route is public only
when the production static export generates it and its content is truthful enough for the current
information-first product.

## Classification

| Route | Class | Public job |
|---|---|---|
| `/` | PUBLIC CORE | orient, understand, explore, optionally hand off |
| `/gioi-thieu` | PUBLIC CORE | understand approved brand intent and current limits |
| `/dich-vu` | PUBLIC CORE | understand bounded service categories |
| `/quy-trinh-tri-lieu` | PUBLIC CORE | understand what a credible future process must answer |
| `/tin-tuc` | PUBLIC CORE | continue reviewed learning without mock article detail |
| `/lien-he` | PUBLIC CORE | share the approved channel types and URL boundary |
| `/dich-vu/[slug]` | DEFERRED CONTENT | detail facts require review |
| `/tin-tuc/[slug]` | DEFERRED CONTENT | article bodies require review |
| `/khong-gian` | DEFERRED CONTENT | place evidence is unavailable |
| `/san-pham` | DEFERRED CONTENT | commercial facts are unavailable |
| `/dao-tao` | DEFERRED CONTENT | program facts are unavailable |
| `/nhuong-quyen` | DEFERRED CONTENT | partnership facts are unavailable |
| `/motion-lab*` | DEV / MAINTAINER ONLY | historical specimen evidence |
| `/dat-lich` | RETIRED | outside the target product |

Deferred source is retained under `app-demo/deferred-content/routes/`. Motion source is retained
under `app-demo/dev-evidence/motion-lab/`. Neither location participates in the App Router.

## Static-export assertion

The production build generates six public content routes and no deferred, retired or dev route.
`scripts/check-release-surface.mjs` checks the allowlist, route HTML, heading count, booking traces
and internal links after every `npm run verify`.

