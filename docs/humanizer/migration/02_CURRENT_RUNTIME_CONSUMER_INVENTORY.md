# 02 — Current Runtime Consumer Inventory

- **Inventory basis:** fresh code search and source inspection at baseline `a234e142…`
- **Count method:** runtime source files and meaningful element sites; comments, Humanizer docs and
  the isolated H4 prototype are excluded from consumer counts.
- **Runtime mutation:** none

## Inventory summary

Nine required consumer groups were inspected. Counts are file-level impact indicators, not claims
that every match must migrate in the first batch.

| Group                         |                                                               Meaningful runtime footprint | Current consequence                                                                |
| ----------------------------- | -----------------------------------------------------------------------------------------: | ---------------------------------------------------------------------------------- |
| A. Color / surface            |                                      49 files reference current palette/surface primitives | A global palette rewrite would have site-wide blast radius.                        |
| B. Typography                 |                                               55 Noto Serif consumer sites in 26 TSX files | Noto cannot be removed with the first type batch.                                  |
| C. Gold/jade/wood/material    | 20 files carry explicit material/decorative motifs; palette names also appear more broadly | Premium/material grammar spans shared and route-specific UI.                       |
| D. Homepage structure         |        1 route, 10 section/state files, 2 shared data/logic files and 1 dedicated CSS file | Current homepage is a coupled inference narrative, not eight independent sections. |
| E. Body signal/recommendation |                                                   11 files in the direct code-search graph | Selection produces body states and ranked services.                                |
| F. Motion                     |                                45 files reference motion tokens, utilities, Reveal or GSAP | Semantic verbs must be mapped per consumer; global timing replacement is unsafe.   |
| G. Booking/success            |                                                       10 exact core files/styles/providers | Current success is not transport/handoff proof.                                    |
| H. Seasonal skin              |                             1 layout owner + `globals.css` import + 2 skin override blocks | `tet` and `an-tinh` are defined but not target-approved policy.                    |
| I. Content/service/process    |                                         23 files consume shared business/content constants | Demo content cannot be promoted to approved business truth by migration.           |

## Consumer graph

```text
CURRENT RAW TOKENS / LEGACY RULES
  ├─ palette + surface + radii + shadows
  │    → shared CSS + route/component classes
  │    → all public routes
  │    → orient / browse / contact / book
  │    → semantic alias bridge, then bounded consumers
  │    → HIGH if changed globally
  ├─ Noto display aliases + global h1/h2 rule
  │    → 55 sites / 26 files
  │    → all main route families
  │    → read / compare / book
  │    → scoped Be Vietnam Pro roles first; retirement only at zero consumers
  │    → MEDIUM–HIGH visual/line-wrap risk
  ├─ Body Signal → Tắc/Hàn/Hư/Loạn → recommendation
  │    → homepage `/`
  │    → describe concern / choose path
  │    → Guided Intake → Scope Boundary → editable review
  │    → HIGH health/privacy/state risk
  ├─ ritual / space / generic proof content
  │    → `/`, `/khong-gian`, `/gioi-thieu`, `/quy-trinh-tri-lieu`
  │    → trust / understand visit
  │    → omit until evidence; later Proof/Process contracts
  │    → HIGH evidence risk
  └─ booking optimistic success
       → `/dat-lich`
       → request an appointment
       → future full Action Receipt contract
       → CRITICAL transport/privacy/false-confirmation risk
```

## A. Color and surface consumers

Current public primitives are palette-named: ivory/cream/sand/mist, crimson ramp, gold ramp, wood,
jade and ink. They feed both Tailwind utilities and authored CSS.

High-leverage owners:

| Owner                                 | Consumers/routes                                       | Target replacement                                          | Risk                                            |
| ------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------- | ----------------------------------------------- |
| `app-demo/styles/tokens.css`          | every route through compiled variables/utilities       | private primitives plus 18 bounded Humanizer aliases        | High if existing primitives are renamed/deleted |
| `app-demo/styles/skins.css`           | every token-derived consumer when `data-brand` changes | read-only during initial bridge; policy deferred            | High contrast/meaning drift                     |
| `app-demo/app/globals.css`            | body, skip link, focus and all imported layers         | use semantic focus/surface aliases only after M0            | High a11y blast radius                          |
| `app-demo/styles/components.css`      | frame, seal, paper, CTA and image grading              | record/rule grammar per component; decoration retires later | Medium–High                                     |
| `app-demo/styles/interface.css`       | booking fields/notices/actions                         | future semantic action/state aliases                        | High because booking is critical                |
| `app-demo/styles/home-experience.css` | current homepage scrim, state glow/expand/drawer       | bounded HP-01/02/03/07 styles                               | High because current state model changes        |

The 49-file footprint proves that M0 must add aliases without changing existing values or consumer
classes.

## B. Typography and Noto Serif consumers

### Load and global rules

- `app-demo/app/layout.tsx` loads `Noto_Serif` weights 600/700 and adds
  `--font-noto-serif` to `<html>`.
- `app-demo/styles/tokens.css` maps `--font-display` and `--font-serif` to Noto.
- `app-demo/styles/typography.css` applies `--font-display` to all `h1`, `h2` and
  `.heading-font`, and `--font-serif` to `.font-serif-display`.

### Exact count

- 45 explicit `font-display` / `font-serif-display` / `heading-font` sites.
- 10 additional production `h1/h2` sites inherit the global serif rule without an explicit family.
- **Total: 55 consumer sites across 26 TSX files.**

The 26 files are:

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
app-demo/components/home-experience/BodySignalInterface.tsx
app-demo/components/home-experience/FourBodyStates.tsx
app-demo/components/home-experience/HomeFinalCTA.tsx
app-demo/components/home-experience/HomeHero.tsx
app-demo/components/home-experience/RitualTimeline.tsx
app-demo/components/home-experience/SpaceAsTherapy.tsx
app-demo/components/ProductCard.tsx
app-demo/components/ReviewWall.tsx
app-demo/components/SectionHeader.tsx
app-demo/components/ServiceFilterGrid.tsx
app-demo/components/SiteFooter.tsx
app-demo/components/SiteHeader.tsx
app-demo/components/YVienSpaceExperience.tsx
```

Target condition: new Humanizer surfaces use scoped Be Vietnam Pro roles. Global h1/h2 and old
route consumers remain compatible until individually migrated; font loading may retire only after
the explicit count is zero and build/performance/visual checks pass.

## C. Gold, jade, wood and material consumers

Twenty files carry direct motifs such as `frame-gold`, `frame-herb`, `seal`, `cta-glow`,
`AmbientLeaves`, herb leaves, image grading or paper framing. Important relationships:

- gold owns rules, borders, secondary actions, dark-surface text, seal and frame decoration;
- jade owns booking-completed step markers, motion connector and space tone;
- wood owns CTA/button/footer text/surfaces;
- leaves, seal, herb frame, book-cover and image grading encode legacy Eastern-premium material.

Target: these raw primitives stay for compatibility, but no new Humanizer primitive may depend on
gold-premium, jade-rest, wood/lacquer/herb or archive motifs. Retirement is M5, never M0–M2.

## D/E. Homepage structure and body/recommendation graph

### Current route graph

```text
app-demo/app/page.tsx  `/`
  ├─ HomeHero
  ├─ HomeExperience (client state owner)
  │    ├─ BodySignalInterface
  │    │    ├─ SYMPTOMS
  │    │    ├─ BodyMap
  │    │    └─ BodyStatePanel → dominantStates()
  │    ├─ FourBodyStates → BODY_STATES + dominantStates()
  │    └─ RecommendationDrawer → recommend() → SERVICES
  ├─ RitualTimeline → RITUAL_MOMENTS + Reveal
  ├─ SpaceAsTherapy → SPACE_QUALITIES
  └─ HomeFinalCTA → CONTACT + BRANCHES
```

State/data owners:

- `app-demo/lib/recommendation.ts` converts symptoms to dominant states and ranked services.
- `app-demo/data/content.ts` stores body states, symptoms, service slugs, ritual and space claims.
- `app-demo/styles/home-experience.css` animates body glow, state expansion and drawer slide-up.

This is a direct health-suggestion graph: a familiar symptom selection becomes `Tắc/Hàn/Hư/Loạn`
and then a service recommendation. The safe migration cannot reuse its state output while merely
changing labels.

## F. Motion consumers

The 45-file footprint includes:

- CSS timing/easing primitives in `tokens.css` and authored literals in `utilities.css`;
- CSS state motion in `home-experience.css` and `interface.css`;
- IntersectionObserver `Reveal`;
- GSAP/ScrollTrigger/Flip/DrawSVG/SplitText consumers;
- `lib/motion/theme.ts`, which reads CSS tempo, and `lib/motion/config.ts`, which also contains
  engine/scene constants and some fixed durations/distances.

Target: keep GSAP/native-scroll/theme-reader invariants. KHAI/DẪN/TỤ/AN map to specific surfaces;
they do not require four new timing variables. Existing motion cleanup is M5 unless a migrated
consumer needs a bounded correction.

## G. Booking and success consumers

Exact core graph:

```text
app-demo/app/dat-lich/page.tsx
  → app-demo/components/BookingStepper.tsx
      → app-demo/lib/booking.ts
      → app-demo/components/booking/Action.tsx
      → app-demo/components/booking/TextField.tsx
      → app-demo/components/booking/TextArea.tsx
      → app-demo/components/booking/ChoiceField.tsx
      → app-demo/components/notice/NoticeRegion.tsx
      → app-demo/styles/interface.css
      → app-demo/data/content.ts
```

Current facts:

1. `FORM_ID` and every Google Form field are placeholders.
2. `isBookingConfigured()` therefore returns false.
3. The unconfigured path waits 600ms, sets `submitted=true` and announces “Đã nhận yêu cầu”. No
   network request occurs.
4. If configured, the hidden form posts to a CORS-opaque iframe, but a 1.2-second timer still calls
   the same success path without proving receipt or a human handoff.
5. Collected fields are name, phone, desired date/time, branch, need, service and note. The free
   note explicitly asks for current body condition.
6. No durable receipt, idempotency key, retry/error/uncertain state, recipient contract, owner, SLA,
   retention policy or privacy notice is implemented.

This is a current P0 trust defect. The Migration Gate documents it but does not authorize transport.

## H. Seasonal skin consumers

- `app-demo/app/layout.tsx` fixes `data-brand="yvien"`.
- `app-demo/app/globals.css` imports `skins.css` last.
- `app-demo/styles/skins.css` defines dormant `tet` and `an-tinh` overrides for crimson, gold,
  paper surfaces and motion tempo.
- No production control switches skins at runtime.

Gate B deferred the skin policy. M0 aliases may resolve through current primitives so compatibility
continues, but `skins.css` is read-only until a later explicit decision.

## I. Content, service and process consumers

Twenty-three files consume `SERVICES`, `PROCESS_STEPS`, `SPACES`, `TEAM`, `REVIEWS`, `FAQS`,
`BRANCHES`, `CONTACT` or homepage content. `data/content.ts` declares itself `MOCK DATA`; it contains
unverified prices, addresses, people, experience, processes, health statements and testimonials.

Therefore:

- Runtime Evidence proves these values render; it does not make them Real Evidence.
- M2 may use only reviewed generic boundary/orientation copy.
- M3 may not populate Proof Index, Service Scope Register or Visit/Process Record until the matching
  evidence is approved.
- Layout metadata/JSON-LD also consumes mock contact/branch/service facts and belongs to a later
  evidence correction, not silent Humanizer population.

## Inventory conclusion

The source supports additive aliasing and scoped Humanizer components. It does not support global
token replacement, Noto removal, evidence population, service recommendation reuse or booking
confirmation. These findings control the batch eligibility in artifacts 03–05.
