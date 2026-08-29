# 34 — H6-F Booking Consumer and Retirement Graph

## Gate F1 verdict

**PASS — consumer graph complete before deletion.**

- direct runtime consumers: **16**;
- indirect/layout/data/IA consumers: **6**;
- historical documentation consumers: retained as provenance and excluded from runtime count.

## Reverse graph

```text
                                      BOOKING
                                         |
             +---------------------------+---------------------------+
             |                           |                           |
             v                           v                           v
       NAVIGATION / IA             ROUTE / STATE                ROUTE CTAs
       SiteHeader CTA              /dat-lich                    /dich-vu
       MobileBottomBar             BookingStepper               /dich-vu/[slug]
       sitemap route               local 3-step state           /gioi-thieu
             |                     ?need= preload                /khong-gian
             |                           |                       /quy-trinh-tri-lieu
             |                           v                       /dao-tao
             |                    booking/Action                 /nhuong-quyen
             |                    booking field helpers
             |                           |
             |                           v
             |                    legacy booking.ts
             |                    Google Form config
             |
             +---------------------------+---------------------------+
                                         |
                                         v
                               LAYOUT CONSEQUENCES
                               layout MobileBottomBar render
                               main pb-20 compensation
                               service 2/3 + sticky 1/3 grid
                               CalendarPlus booking-only glyph export
                               NEEDS booking-only data export
                               README/runtime description drift
```

## Direct consumers

| # | Source | Symbol/copy | Runtime role | Parent | Downstream effect | Action | Reflow consequence |
| -: | --- | --- | --- | --- | --- | --- | --- |
| 1 | `app/dat-lich/page.tsx` | `/dat-lich` | booking route | static App Router | renders booking review | REMOVE | route absent from export |
| 2 | `components/BookingStepper.tsx` | `BookingStepper` | booking state owner | `/dat-lich` | choice, review, stop state | REMOVE | no replacement |
| 3 | `lib/booking.ts` | `GFORM`, `isBookingConfigured` | retired transport config | booking history | hidden Google Form contract | REMOVE | no replacement |
| 4 | `components/booking/Action.tsx` | `Action` | booking-only control | `BookingStepper` | step navigation | REMOVE | no replacement |
| 5 | `components/booking/ChoiceField.tsx` | `ChoiceField` | booking-only field | no live consumer | field primitive | REMOVE | no replacement |
| 6 | `components/booking/TextArea.tsx` | `TextArea` | booking-only field | no live consumer | field primitive | REMOVE | no replacement |
| 7 | `components/booking/TextField.tsx` | `TextField` | booking-only field | no live consumer | field primitive | REMOVE | no replacement |
| 8 | `components/SiteHeader.tsx` | “Đặt lịch” | global booking CTA | root layout | links to `/dat-lich` | REPLACE | rebalance as information nav |
| 9 | `components/MobileBottomBar.tsx` | “Xem lại nhu cầu” | fixed mobile conversion | root layout | links to `/dat-lich` | REMOVE | remove bottom compensation |
| 10 | `app/dich-vu/page.tsx` | table booking CTA | service conversion | service table | links to `/dat-lich` | REMOVE | replace table with reading overview |
| 11 | `app/dich-vu/[slug]/page.tsx` | sticky booking aside | detail conversion | detail grid | `?need=` booking preload | REMOVE | detail route depublished |
| 12 | `app/gioi-thieu/page.tsx` | booking CTA | about conversion | page ending | links to `/dat-lich` | REMOVE | finish on philosophy boundary |
| 13 | `app/khong-gian/page.tsx` | booking CTA | place conversion | every place row | links to `/dat-lich` | REMOVE | route depublished |
| 14 | `app/quy-trinh-tri-lieu/page.tsx` | booking CTA | process conversion | page ending | links to `/dat-lich` | REMOVE | finish on expectation boundary |
| 15 | `app/dao-tao/page.tsx` | booking/consult CTA | program conversion | page ending | links to `/dat-lich` | REMOVE | route depublished |
| 16 | `app/nhuong-quyen/page.tsx` | partnership CTA | commercial conversion | page ending | links to `/dat-lich` | REMOVE | route depublished |

## Indirect consumers

| # | Source | Dependency | Action | Post-removal consequence |
| -: | --- | --- | --- | --- |
| 1 | `app/layout.tsx` | `MobileBottomBar` import/render | REMOVE | reading surface ends at footer |
| 2 | `app/layout.tsx` | `pb-20` mobile compensation | REMOVE | no artificial bottom band |
| 3 | `app/sitemap.ts` | route and booking priority | REMOVE | allowlist-only sitemap |
| 4 | service detail layout | `2/3 + sticky 1/3` geometry | REFLOW | detail route gated; no blank aside |
| 5 | `components/Glyph.tsx` | `CalendarPlus` export | REMOVE after zero-consumer proof | no stale booking icon API |
| 6 | `data/content.ts` | `NEEDS` booking-only export | REMOVE after zero-consumer proof | corrected orientation remains independent |

## URL audit

Workspace search found no approved exact `zalo.me`, `facebook.com`, `fb.com` or `m.me` destination.
References to channel names are either historical design notes, mock content or unverified future
instructions. Result: `ZALO_URL = DEFERRED`; `FACEBOOK_PAGE_URL = DEFERRED`.

## Rollback

Rollback is bounded to the H6-F commits. Historical source remains recoverable from Git history;
H4/H4R evidence is preserved separately outside the production route graph.
