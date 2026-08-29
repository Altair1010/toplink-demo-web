# 26 — M3S-2 Claim Inventory

## Inventory basis

- **Audit baseline:** `a4d7c79925400e5fcffc8bfa107a3aa64b23a239`
- **Production routes:** 13 public route families plus static detail variants discovered by build
- **Source precedence:** verified Toplink source → approved brand profile → H5R contract → Triều
  language/knowledge reference → legacy mock
- **Result:** 10 claim families; no family receives blanket mutation authority

`app-demo/data/content.ts` declares itself static demo data without a database. The brand profile
explicitly leaves legal identity, address/contact, staff, service duration/price, device facts and
real evidence unverified. Those fields cannot become Toplink facts through repetition in components.

## Claim records

| ID  | Family              | Path / visible field                                             | Source             | Verified?                 | User job                 | Safe replacement / collapse                                | Task continuity                             | Action                                |
| --- | ------------------- | ---------------------------------------------------------------- | ------------------ | ------------------------- | ------------------------ | ---------------------------------------------------------- | ------------------------------------------- | ------------------------------------- |
| C01 | F1 identity/contact | `data/content.ts` `BRANCHES`, `CONTACT`                          | legacy mock        | NO                        | find/identify site       | truthful unavailable boundary                              | contact task becomes unavailable but honest | SAFE COLLAPSE candidate               |
| C02 | F1                  | `SiteFooter.tsx` address/phone/Zalo/email/Facebook/hours         | C01                | NO                        | global contact           | omit channels; link to contact status                      | global nav retained                         | SAFE COLLAPSE candidate               |
| C03 | F1                  | `MobileBottomBar.tsx`, `FloatingZalo.tsx` external channels/maps | C01                | NO                        | quick contact            | remove unavailable controls                                | booking local review remains                | SAFE COLLAPSE candidate               |
| C04 | F1                  | `lien-he/page.tsx` facility, map, response promise               | C01                | NO                        | contact/visit            | single truthful boundary                                   | route still answers availability            | SAFE COLLAPSE candidate               |
| C05 | F1/F6               | `HomeHero.tsx` facility image alt/context                        | stock/legacy       | NO                        | arrival/trust            | generic decorative/context label or later real evidence    | opening retained                            | DEFER to F6/coverage                  |
| C06 | F2 service          | `data/content.ts` `SERVICES` names/levels/short copy             | legacy mock        | NO                        | browse services          | reviewed catalogue required                                | removal breaks catalogue                    | DEFER                                 |
| C07 | F2                  | `SERVICES.duration`, `priceFrom`                                 | legacy mock        | NO                        | compare cost/time        | true collapse                                              | comparison unavailable                      | DEFER with exact route delta          |
| C08 | F2/F3               | `suitableFor`, `cautions`, `steps`, `feeling`, `needs`           | legacy mock        | NO                        | assess fit/safety        | reviewed per-service source required                       | omission needs new detail composition       | BLOCK automatic mutation              |
| C09 | F2                  | `ServiceFilterGrid.tsx`, `BookCard.tsx`, `/dich-vu` cards/table  | C06-C08            | NO                        | discover/compare         | structural category index only                             | material route redesign required            | DEFER                                 |
| C10 | F2/F3               | `/dich-vu/[slug]` fit/process/outcome/price/contact              | C06-C08/C01        | NO                        | decide service           | fact-specific branches collapse                            | page would need approved delta              | DEFER                                 |
| C11 | F2/F8               | `BookingStepper.tsx` NEEDS/service ranking/duration/price        | legacy mock        | NO                        | local review             | copy-only scope cannot safely remove behavior              | M3S-B state must remain fail-closed         | DEFER                                 |
| C12 | F2                  | `PRODUCTS`, `ProductCard.tsx`, `/san-pham`                       | legacy mock        | NO                        | product browse           | zero-catalog boundary                                      | material product-route delta                | DEFER                                 |
| C13 | F3 health           | service short/feeling/benefit/mechanism strings                  | legacy mock        | NO                        | understand effect        | reviewed claim source or collapse                          | tied to C09/C10                             | BLOCK automatic mutation              |
| C14 | F3                  | `FAQS`, `FaqAccordion.tsx`, `/lien-he`                           | legacy mock        | NO                        | safety questions         | collapse FAQ                                               | contact route can remain                    | SAFE with F1 collapse                 |
| C15 | F3/F9               | `POSTS.excerpt/body` health/YHCT claims                          | legacy mock        | NO                        | learn                    | zero-content boundary                                      | index/detail can answer review state        | SAFE COLLAPSE candidate               |
| C16 | F3                  | `HomeHero.tsx` high-end care/recovery/balance copy               | legacy mock        | NO                        | understand brand         | approved brand behavior only                               | opening requires bounded rewrite            | SAFE rewrite candidate                |
| C17 | F3                  | `/gioi-thieu` self-balance/safety/professional claims            | legacy mock        | PARTIAL brand intent only | understand brand         | keep only approved brand behavior                          | broader page delta required                 | DEFER except F4/F5                    |
| C18 | F4 staff            | `data/content.ts` `TEAM` names/roles/experience/images           | legacy mock        | NO                        | know who provides care   | true collapse                                              | brand page retained                         | SAFE COLLAPSE candidate               |
| C19 | F4                  | `/gioi-thieu` team cards/training claim                          | C18                | NO                        | trust staff              | remove entire team section                                 | adjacent brand tasks continue               | SAFE COLLAPSE candidate               |
| C20 | F4                  | `STATS`, `StatCounter`, “trusted” counter section                | legacy mock        | NO                        | trust scale              | true collapse                                              | brand narrative continues                   | SAFE COLLAPSE candidate               |
| C21 | F5 review           | `REVIEWS`, `ReviewWall`, consent sentence, `/gioi-thieu`         | stock/placeholder  | NO                        | social proof             | true collapse                                              | trust section absent, no fake shell         | SAFE COLLAPSE candidate               |
| C22 | F6 process          | `PROCESS_STEPS`, `HealingProcessMotion`, `/quy-trinh-tri-lieu`   | legacy mock        | NO                        | know visit               | expectation boundary from M2B pattern                      | material dedicated-route delta              | DEFER                                 |
| C23 | F6 place            | `SPACES`, `YVienSpaceExperience`, `/khong-gian` floor claims     | stock/legacy       | NO                        | assess place             | truthful no-evidence boundary                              | material dedicated-route delta              | DEFER                                 |
| C24 | F6                  | `BrandVisual`/stock imagery presented as Toplink places          | placeholder assets | NO                        | visual trust             | generic placeholder removal/collapse                       | multi-route visual delta                    | DEFER                                 |
| C25 | F7 training         | `TRAINING`, `/dao-tao` benefits/curriculum/certification/contact | legacy mock        | NO                        | evaluate course          | zero-program boundary                                      | route-specific redesign required            | DEFER                                 |
| C26 | F7 partnership      | `FRANCHISE`, `/nhuong-quyen` support/cost/roadmap/contact        | legacy mock        | NO                        | evaluate partnership     | zero-program boundary                                      | route-specific redesign required            | DEFER                                 |
| C27 | F8 booking          | `/dat-lich`, `BookingStepper` residual service facts             | legacy mock        | NO                        | organize booking intent  | keep M3S-B no-send; sanitize only with behavior-safe delta | local review still works                    | DEFER                                 |
| C28 | F9 article          | `/tin-tuc` index titles/authors/excerpts/images                  | legacy mock        | NO                        | find learning            | reviewed-content empty state                               | route task truthfully answered              | SAFE COLLAPSE candidate               |
| C29 | F9                  | `/tin-tuc/[slug]` body/author/date/read time/related             | legacy mock        | NO                        | read learning            | unavailable-review boundary per retained static path       | no health claim published                   | SAFE COLLAPSE candidate               |
| C30 | F10 metadata        | root + 13 route/detail metadata descriptions                     | legacy/mock data   | NO/PARTIAL                | search/share orientation | approved brand/boundary copy                               | visible route body unchanged                | KEEP VERIFIED rewrite / TRUE COLLAPSE |

## Family classification

| Family                                      | Status after fresh inventory                                        |
| ------------------------------------------- | ------------------------------------------------------------------- |
| F1 identity / branch / contact              | SAFE COLLAPSE candidate; exact shared-owner sub-batch required      |
| F2 service / duration / suitability / price | DEFER; material catalogue/detail delta required                     |
| F3 health benefit / mechanism / caution     | BLOCK automatic inference; partial safe collapse travels with F1/F9 |
| F4 staff / role / credential                | SAFE COLLAPSE candidate                                             |
| F5 review / testimonial                     | SAFE COLLAPSE candidate                                             |
| F6 place / process                          | DEFER; material dedicated-route delta required                      |
| F7 franchise / training / partnership       | DEFER; no approved operational program facts                        |
| F8 booking residual labels                  | DEFER; M3S-B behavior remains authoritative                         |
| F9 article / knowledge                      | SAFE COLLAPSE candidate                                             |
| F10 metadata visible/SEO                    | SAFE REWRITE / COLLAPSE candidate                                   |

No deferred family becomes safe merely because another family is removed. F2/F3/F6/F7/F8 are the
current candidates for a later coverage-blocking delta.
