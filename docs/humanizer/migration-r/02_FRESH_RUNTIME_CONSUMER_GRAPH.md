# 02 — Fresh Runtime Consumer Graph

- **Inventory baseline:** `5afa11f27c8a5f54465cc6ed73bdad47c14c158b`
- **Method:** fresh source search plus direct inspection; runtime source only
- **Excluded from counts:** Humanizer docs, comments as decision evidence, `.next`, dependencies and
  both isolated H4/H4R prototypes
- **Runtime mutation:** none

Counts below are explicitly typed. A **site** is a meaningful source occurrence; a **file
footprint** is a unique runtime file containing a searched behavior. Neither is presented as a
number of users, routes or facts.

## Current runtime consumer graph

```text
RAW PALETTE / SURFACE / TYPE / MOTION PRIMITIVES
  |
  +--> globals + authored CSS + Tailwind utilities
  |      |
  |      +--> shared header/footer/actions/forms
  |      `--> all public route families
  |
  +--> Noto load + global h1/h2 + explicit display classes
  |      `--> 55 sites / 26 TSX files
  |
  +--> HOMEPAGE `/`
  |      |
  |      +--> HomeHero
  |      +--> SYMPTOMS -> Body Signal -> Tắc/Hàn/Hư/Loạn
  |      |                 `-> recommend() -> SERVICES
  |      +--> RitualTimeline -> RITUAL_MOMENTS
  |      +--> SpaceAsTherapy -> SPACE_QUALITIES
  |      `--> HomeFinalCTA -> CONTACT + BRANCHES
  |
  +--> MACHINE TRUST
  |      +--> root HealthAndBeautyBusiness JSON-LD
  |      +--> service JSON-LD
  |      +--> FAQ JSON-LD
  |      `--> breadcrumb JSON-LD
  |
  +--> BOOKING
  |      `--> local fields -> placeholder Google Form -> timer/onLoad success
  |
  `--> KNOWLEDGE / FAQ
         +--> `/tin-tuc` index/detail from mock POSTS
         `--> `/lien-he` FAQ from mock FAQS

TARGET ROLE
  -> CURRENT OWNER / CONSUMER
  -> ROUTE / USER TASK
  -> BOUNDED MIGRATION ACTION
  -> RISK
  -> INDEPENDENT ROLLBACK
```

## Consumer groups

| Group                         | Fresh runtime finding                                                                                               | Main routes / task                        | Migration consequence                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| A. semantic/color/surface     | 45 consuming TSX/CSS files in the direct palette/surface search, plus `tokens.css` and `skins.css` as global owners | all routes; read, orient, act             | no global value rewrite in M0R                                          |
| B. typography                 | 45 explicit display-family sites + 10 h1/h2 sites inheriting the global rule = **55 sites / 26 TSX files**          | every main route family                   | Noto remains loaded; M1 is independently reversible                     |
| C. homepage composition       | 1 route, 10 current homepage components, `recommendation.ts`, `content.ts`, and one dedicated stylesheet            | orient, explore, decide                   | current graph must be replaced, not relabeled                           |
| D. Body Signal/recommendation | `SYMPTOMS` in 2 files, `BODY_STATES` in 2 files, recommendation logic in 1 file; shared mock service data           | describe concern                          | no diagnostic state or automatic service match may survive M2A          |
| E. content/service            | 14 inspected shared content families; service/contact facts have broad route consumers                              | browse service, understand visit, contact | structural copy and business facts require separate eligibility         |
| F. structured trust           | **4 JSON-LD emitters** in 4 files; 10 metadata and 11 rendered claim groups are additional surfaces                 | assess trust / search discovery           | M3S is split into machine, false-success and rendered sanitation        |
| G. booking/state              | 10-file core boundary; no proven recipient/handoff; placeholder field IDs                                           | request appointment                       | M4 remains blocked; no-send/local states only                           |
| H. motion                     | 39-file direct motion search footprint; CSS tokens, Reveal and GSAP coexist under current engine rules              | orientation/state feedback                | preserve engine and reduced-motion; map semantics per migrated consumer |
| I. seasonal skins             | 1 layout owner, 1 final import, 2 dormant override blocks                                                           | all token-derived surfaces when enabled   | compatibility only; no corrected target meaning comes from skins        |
| J. knowledge/FAQ              | 9-file direct search footprint; `POSTS` in 4 files, `FAQS` in 2 files                                               | understand more                           | bounded continuation only; current content must be reviewed             |

## A. Color and surface owners

| Path                                  | Current responsibility                                         | Risk / Migration-R treatment                                           |
| ------------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `app-demo/styles/tokens.css`          | global raw palette, type, radius, shadow and motion primitives | M0R may add a visual-no-op bridge only; no deletion/value change       |
| `app-demo/styles/skins.css`           | dormant `tet` and `an-tinh` overrides                          | read-only through M0R–M3; semantic meaning cannot depend on skin color |
| `app-demo/app/globals.css`            | import order, body, skip link and site focus                   | a11y-critical; changed only by a batch that names the exact selector   |
| `app-demo/styles/typography.css`      | Noto global h1/h2 and display-class behavior                   | M1 owner; broad line-wrap blast radius                                 |
| `app-demo/styles/components.css`      | paper, gold frame, seal, CTA glow and book material            | compatibility only; cleanup after zero consumers                       |
| `app-demo/styles/home-experience.css` | body glow, state expansion, recommendation drawer              | retires only after M2 verification                                     |
| `app-demo/styles/interface.css`       | booking actions, fields, notices and state color               | M4 boundary; not a homepage visual shortcut                            |

No corrected `--h-*` target alias currently exists. Therefore every proposed M0R alias has **zero
current consumers** at baseline.

## B. Exact Noto consumer map

The fresh count reproduces the historical count without trusting it: **45 explicit
`font-display` / `font-serif-display` / `heading-font` sites plus 10 other h1/h2 sites = 55 sites in
26 TSX files.**

Audit exclusion: historical H4/H4R headings are not Noto consumers because their scoped module CSS
explicitly overrides h1/h2 to Be Vietnam Pro/sans.

```text
app-demo/app/dao-tao/page.tsx
app-demo/app/dich-vu/[slug]/page.tsx
app-demo/app/gioi-thieu/page.tsx
app-demo/app/khong-gian/page.tsx
app-demo/app/lien-he/page.tsx
app-demo/app/motion-lab/page.tsx
app-demo/app/nhuong-quyen/page.tsx
app-demo/app/not-found.tsx
app-demo/app/tin-tuc/[slug]/page.tsx
app-demo/components/BlogIndex.tsx
app-demo/components/BookingStepper.tsx
app-demo/components/BrandVisual.tsx
app-demo/components/HealingProcessMotion.tsx
app-demo/components/ProductCard.tsx
app-demo/components/ReviewWall.tsx
app-demo/components/SectionHeader.tsx
app-demo/components/ServiceFilterGrid.tsx
app-demo/components/SiteFooter.tsx
app-demo/components/SiteHeader.tsx
app-demo/components/YVienSpaceExperience.tsx
app-demo/components/home-experience/BodySignalInterface.tsx
app-demo/components/home-experience/FourBodyStates.tsx
app-demo/components/home-experience/HomeFinalCTA.tsx
app-demo/components/home-experience/HomeHero.tsx
app-demo/components/home-experience/RitualTimeline.tsx
app-demo/components/home-experience/SpaceAsTherapy.tsx
```

Load/ownership paths are `app-demo/app/layout.tsx`, `app-demo/styles/tokens.css` and
`app-demo/styles/typography.css`. Be Vietnam Pro is already loaded at 400/500/600. Noto retirement
is not part of M1.

## C/D. Homepage and body-state graph

```text
app-demo/app/page.tsx
  +--> HomeHero
  +--> HomeExperience [selectedKeys owner]
  |      +--> BodySignalInterface -> SYMPTOMS + BodyMap + BodyStatePanel
  |      |                              `-> dominantStates()
  |      +--> FourBodyStates -> BODY_STATES + dominantStates()
  |      `--> RecommendationDrawer -> recommend() -> SERVICES
  +--> RitualTimeline -> RITUAL_MOMENTS
  +--> SpaceAsTherapy -> SPACE_QUALITIES
  `--> HomeFinalCTA -> CONTACT + BRANCHES
```

Direct current paths are `app-demo/app/page.tsx`, all ten files under
`app-demo/components/home-experience/`, `app-demo/lib/recommendation.ts`,
`app-demo/data/content.ts`, and `app-demo/styles/home-experience.css`. The user-visible result is a
health-state verdict and ranked service path. M2A must not import either output.

## E/J. Shared content footprints

| Content family    | Current consumer sites / files | Eligibility note                                                 |
| ----------------- | -----------------------------: | ---------------------------------------------------------------- |
| `SERVICES`        |                         20 / 7 | mock names, duration, price, suitability and process need review |
| `PROCESS_STEPS`   |                          2 / 1 | unreviewed process                                               |
| `SPACES`          |                         12 / 6 | other-brand/placeholder media and unverified place claims        |
| `TEAM`            |                          2 / 1 | no approved person/role evidence                                 |
| `REVIEWS`         |                          4 / 1 | mock/placeholder testimonials                                    |
| `FAQS`            |                          4 / 2 | FAQ and FAQ JSON-LD share mock answers                           |
| `BRANCHES`        |                         12 / 5 | location/contact not verified for publication                    |
| `CONTACT`         |                        37 / 12 | channels and response claims are not evidence-approved           |
| `BODY_STATES`     |                          5 / 2 | diagnostic/inference risk                                        |
| `SYMPTOMS`        |                          4 / 2 | ordinary-language input may be adapted; outputs may not          |
| `RITUAL_MOMENTS`  |                          2 / 1 | process claim debt                                               |
| `SPACE_QUALITIES` |                          2 / 1 | place/virtue claim debt                                          |
| `NEEDS`           |                          6 / 3 | orientation vocabulary requires content review                   |
| `POSTS`           |                         12 / 4 | learning content is mock/unreviewed                              |

## F. Structured data emitters

| Emitter                         | Exact path                             | Current source                             | Gate-R treatment                                                       |
| ------------------------------- | -------------------------------------- | ------------------------------------------ | ---------------------------------------------------------------------- |
| root business / offer / address | `app-demo/app/layout.tsx`              | `CONTACT`, `BRANCHES`, `SERVICES`          | omit in M3S-1 until verified                                           |
| service schema                  | `app-demo/app/dich-vu/[slug]/page.tsx` | `SERVICES`                                 | omit schema; rendered facts handled separately                         |
| FAQ schema                      | `app-demo/app/lien-he/page.tsx`        | `FAQS`                                     | omit schema until reviewed                                             |
| breadcrumb schema               | `app-demo/components/Breadcrumbs.tsx`  | route labels, including mock service names | keep visible nav; omit machine schema where an unreviewed label enters |

## G. Booking graph

```text
app-demo/app/dat-lich/page.tsx
  -> app-demo/components/BookingStepper.tsx
     -> app-demo/lib/booking.ts [placeholder form/entry IDs]
     -> app-demo/components/booking/{Action,ChoiceField,TextArea,TextField}.tsx
     -> app-demo/components/notice/NoticeRegion.tsx
     -> app-demo/styles/interface.css
     -> app-demo/data/content.ts
```

The unconfigured path waits and reports success without sending. The configured path uses an opaque
iframe and time/onLoad as success without proof of receipt. This graph is a critical existing gap;
it does not become eligible through evidence deferral.

## H/I. Motion and skins

The existing engine split remains valid: CSS for local states, IntersectionObserver for Reveal and
GSAP for advanced scenes. `tokens.css` and `skins.css` own timing values; `lib/motion/theme.ts`
reads them. KHAI/DẪN/TỤ/AN are behavior contracts, not four required variables.

`layout.tsx` fixes `data-brand="yvien"`; `globals.css` imports `skins.css` last; `skins.css` defines
two dormant alternates. Migration-R keeps these for compatibility and does not infer corrected
color meaning from them.
