# 28 — H6 Route Coverage Audit

## Decision

**H6 coverage status: PARTIAL — CROSS-PAGE MIGRATION DELTA REQUIRED.**

The homepage orientation/narrative and the new truthful contact/knowledge boundaries are real
runtime. The locked H5R system has not converged across the whole production route graph. This
audit therefore stops automatic art-direction mutation and does not begin H7.

## Method

- build inventory: 34 generated pages, including eight service details, six article details and
  three public motion-lab routes;
- browser evidence: representative route from every family at 375 and 1280 with reduced motion;
- runtime checks: HTTP status, real horizontal scrollability, `h1`, console errors, mutating
  requests and form presence;
- score scale per dimension: `0` blocking, `1` bounded legacy/partial, `2` H7-ready;
- maximum score: 18. A high total never overrides a truth, trust or public-dev-surface hard fail.

The service table has an intentional inner horizontal scroller at 375. Although Chromium counts
its clipped 560px table in `documentElement.scrollWidth`, `body.scrollWidth` remains 375 and an
attempt to scroll the page horizontally leaves `window.scrollX = 0`; this is not page reflow
failure.

## Route-family scores

| Route family                | Truth | Task | Type | Visual | State | A11y | Resp. | Fit | Legacy | Total | Classification        | Exact reason                                                                                                 |
| --------------------------- | ----: | ---: | ---: | -----: | ----: | ---: | ----: | --: | -----: | ----: | --------------------- | ------------------------------------------------------------------------------------------------------------ |
| `/`                         |     2 |    2 |    2 |      0 |     2 |    2 |     2 |   1 |      0 |    13 | H6 BLOCKING DEBT      | corrected graph is truthful; legacy red/gold hero and stock ambience remain a Humanizer visual hard fail     |
| `/dich-vu`                  |     0 |    1 |    1 |      0 |     1 |    0 |     2 |   0 |      0 |     5 | H6 BLOCKING DEBT      | mock catalogue, price/duration, card grid, no `h1`, false booking labels                                     |
| `/dich-vu/[slug]`           |     0 |    1 |    1 |      0 |     1 |    1 |     2 |   0 |      0 |     6 | H6 BLOCKING DEBT      | suitability, caution, process, outcome, price and service facts are unverified                               |
| `/dat-lich`                 |     0 |    1 |    1 |      1 |     2 |    0 |     2 |   0 |      0 |     7 | H6 BLOCKING DEBT      | transport is fail-closed, but mock need taxonomy, service auto-match, price/duration and missing `h1` remain |
| `/lien-he`                  |     2 |    2 |    1 |      1 |     2 |    2 |     2 |   2 |      1 |    15 | H7 READY              | truthful no-channel boundary, `h1 → h2`, local continuation, no external contact action                      |
| `/gioi-thieu`               |     0 |    1 |    1 |      0 |     1 |    0 |     2 |   0 |      0 |     5 | H6 BLOCKING DEBT      | staff/reviews collapsed, but health mission, safety, facility imagery, CTA and missing `h1` remain           |
| `/khong-gian`               |     0 |    1 |    1 |      0 |     1 |    0 |     2 |   0 |      0 |     5 | H6 BLOCKING DEBT      | invented four-floor facility journey and place claims                                                        |
| `/quy-trinh-tri-lieu`       |     0 |    1 |    1 |      0 |     1 |    0 |     2 |   0 |      0 |     5 | H6 BLOCKING DEBT      | unverified operational sequence and conversion promise                                                       |
| `/san-pham`                 |     0 |    1 |    1 |      0 |     1 |    0 |     2 |   0 |      0 |     5 | H6 BLOCKING DEBT      | mock products, effects and prices; no reviewed catalogue                                                     |
| `/tin-tuc`                  |     2 |    2 |    1 |      1 |     2 |    2 |     2 |   2 |      1 |    15 | H7 READY              | reviewed-content boundary; zero article/evidence shell                                                       |
| `/tin-tuc/[slug]`           |     2 |    2 |    1 |      1 |     2 |    2 |     2 |   2 |      1 |    15 | H7 READY              | all six URLs retain continuity without demo body, author, image or health claim                              |
| `/dao-tao`                  |     0 |    1 |    1 |      0 |     1 |    0 |     2 |   0 |      0 |     5 | H6 BLOCKING DEBT      | unverified academy, benefits, roadmap, intake and schedule promises                                          |
| `/nhuong-quyen`             |     0 |    1 |    1 |      0 |     1 |    0 |     2 |   0 |      0 |     5 | H6 BLOCKING DEBT      | unverified model, partner support, cost/roadmap and partnership intake                                       |
| `/motion-lab`               |     1 |    0 |    1 |      0 |     1 |    1 |     2 |   0 |      0 |     6 | H6 BLOCKING DEBT — P0 | production-discovered developer/specimen index                                                               |
| `/motion-lab/humanizer-h4`  |     1 |    0 |    1 |      0 |     1 |    1 |     2 |   0 |      0 |     6 | H6 BLOCKING DEBT — P0 | public prototype controls and specimen states                                                                |
| `/motion-lab/humanizer-h4r` |     1 |    0 |    1 |      0 |     1 |    1 |     2 |   0 |      0 |     6 | H6 BLOCKING DEBT — P0 | public correction prototype and specimen controls                                                            |

## Non-page build outputs

`/_not-found`, `/icon.svg`, `/opengraph-image`, `/robots.txt` and `/sitemap.xml` are framework or
machine outputs. They build successfully and introduce no factual population, transport or
specimen control. They are **ACCEPTABLE RETAINED / NON-BLOCKING** for this coverage decision.

## Classification lists

### H7 ready

- `/lien-he`;
- `/tin-tuc`;
- `/tin-tuc/[slug]` (all six generated paths).

### Acceptable retained legacy / non-blocking

- framework not-found and machine/image outputs only.

### H6 blocking debt

- `/`, `/dich-vu`, `/dich-vu/[slug]`, `/dat-lich`, `/gioi-thieu`, `/khong-gian`;
- `/quy-trinh-tri-lieu`, `/san-pham`, `/dao-tao`, `/nhuong-quyen`;
- `/motion-lab`, `/motion-lab/humanizer-h4`, `/motion-lab/humanizer-h4r`.

## Required cross-page migration delta

1. **P0 — production route boundary:** remove or production-gate all three motion-lab routes without
   deleting their historical H4 evidence; this needs explicit route-publication authority.
2. **P1 — service/booking truth:** replace the mock service catalogue/detail and booking
   auto-matching graph with a reviewed structural catalogue or truthful collapse; preserve M3S-B
   no-send state and add correct page heading semantics.
3. **P1 — institutional/place/process truth:** redesign about, space and process routes around
   verified identity and expectation boundaries, not stock-facility or operational claims.
4. **P1 — commercial-program truth:** collapse or source products, training and partnership routes;
   do not send these jobs through the health booking flow.
5. **P1 — whole-site visual grammar:** replace the remaining red/gold prestige hero, repetitive
   card grids and legacy type hierarchy through an approved multi-route art-direction delta while
   retaining default, `tet` and `an-tinh` compatibility.

## Earliest blocking frontier

The single earliest frontier is **P0 production exposure of `/motion-lab*` specimen/dev controls**.
The exact next delta is a separately approved production-routing change that keeps historical H4
source/evidence available to maintainers while excluding the three routes from the release build.

No automatic authority in `DEC-H6-CONSOLIDATED-01` permits silently deleting or materially
redirecting those routes. H7 is therefore ineligible in the current run.
