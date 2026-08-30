# Master Implementation Plan

## Target architecture

```text
AUTHORIZED VISUAL REFERENCE                  BRAND SOURCE
Sen Tài Thu UI/UX/motion                    Toplink brand dossier
          │                                         │
          └──────────────┬──────────────────────────┘
                         ▼
                 PRODUCT / EVIDENCE TRUTH
                         │
                         ▼
               TOPLINK ART-DIRECTION LAYER
                   │                 │
               Hallmark         Impeccable
            morphology/memory    context/QA/runtime
                   └────────┬────────┘
                            ▼
                     DESIGN.md + tokens
                            ▼
                    Next.js frontend
                            │
                       CMS adapter
                            │
                    WordPress REST API
                            │
               custom Toplink WP plugin
                            │
                  WordPress editorial UI
                            │
              Author → Editor → Publish

Visitor conversion:
Website → Zalo / Facebook-Messenger / Phone → human booking
```

---

## Phase 0 — Preserve, rebase and establish governance

**Goal:** create a safe V1 work surface without inheriting H7 design authority.

### Work

- Read actual `main`; verify baseline SHA.
- Create a pre-redesign archival tag/snapshot after user approval.
- Capture screenshots of the current deployed demo for historical comparison only.
- Change repo visibility to private at the user-approved point; document any GitHub Pages consequence.
- Create V1 branch and install this plan under `docs/toplink-v1/`.
- Replace/prepare `AGENTS.md` contract on the V1 branch so it no longer says H7 is the target product.
- Create live `WORKSTATE.md`, decision ledger and source register.
- Inventory every component/file as `KEEP-ENGINEERING`, `ADAPT`, `REBUILD`, `DELETE-CANDIDATE`.
- No visual redesign yet.

### Gate P0

Pass when repository state, archive, actor roles and rollback are unambiguous.

---

## Phase 1 — Authorized reference extraction

**Goal:** extract design evidence without importing foreign brand/content.

### Track A — Sen Tài Thu

Capture representative routes/states at 375, 768, 1280 and 1440 widths. Record:

- page morphology and major section order;
- header/nav/mobile-nav behavior;
- grid/container rhythm;
- card vs non-card grouping;
- typography roles as proportions, not font copying;
- CTA placement and contact affordances;
- tabs/accordions/carousels/galleries;
- scroll/sticky behavior;
- motion trigger, timing, easing, choreography and state transitions;
- footer/content discovery behavior.

Output is a **reference genome** with `ADOPT / ADAPT / REJECT` judgments. No Sen text/media ships.

### Track B — Toplink/Nhất Liệu brand extraction

Use the uploaded brand dossier plus any later brand assets to derive:

- identity primitives;
- color families and contrast roles;
- typographic character requirements;
- ornament vocabulary;
- material/texture vocabulary;
- density limits;
- photography direction;
- Tĩnh/Thông/Dưỡng/Tỉnh semantics;
- motion metaphors;
- interface behaviors appropriate for the five audiences.

Do not lock final font/palette/pattern until browser comps are evaluated.

### Gate P1 — Human direction gate

User approves the extracted reference map and what may influence Toplink.

---

## Phase 2 — Product IA, content architecture and commercial UX

**Goal:** determine what the website must do before deciding what it looks like.

### Deliverables

- `PRODUCT.md`
- final V1 sitemap
- route/page archetypes
- service/product/article information architecture
- contact conversion map
- content status/evidence model
- SEO topic/URL structure
- WordPress content model draft
- English-readiness decision notes

### Conversion model

```text
DISCOVER
  ↓
RECOGNIZE NEED
  ↓
UNDERSTAND
  ↓
TRUST
  ↓
EXPLORE SERVICE
  ↓
RESOLVE DOUBT
  ↓
CONTACT HUMAN
  ├─ Zalo
  ├─ Facebook/Messenger
  └─ Phone
```

No public price and no “contact for price” copy.

### Gate P2

Route graph, page jobs and content contracts approved before composition work.

---

## Phase 3 — Art-direction synthesis

**Goal:** create a new visual world, not re-skin H7.

### Method

- Impeccable supplies product/design context, direction mechanics and craft floor.
- Hallmark supplies structural alternatives and repetition checks.
- Brand/Sen references constrain candidate space.
- Generate 3 materially different Toplink directions, each with desktop + mobile browser comp of the same representative surface.
- Compare by brand fit, audience fit, uniqueness, readability, commercial usefulness, extensibility and motion potential.
- User selects one direction.

### Deliverables after selection

- new production `DESIGN.md`;
- Art Direction Constitution;
- design tokens;
- typography system;
- color/material/ornament system;
- image system;
- motion grammar;
- component morphology rules;
- structural-memory file;
- anti-pattern rules.

### Gate P3 — Human direction gate

No broad implementation before the selected direction is approved.

---

## Phase 4 — Frontend reconstruction using typed fixtures

**Goal:** prove the entire experience before CMS integration.

### Engineering

- Rename/restructure `app-demo` into production-oriented `web/` when the migration PR is ready.
- Keep Next.js 16/React 19/TypeScript where they remain useful.
- Keep Tailwind v4 only where it accelerates implementation without owning art direction; use tokens/scoped CSS for authored visual behavior.
- Install no general UI theme library by default.
- Add GSAP only if the approved motion spec needs it; one motion engine only.
- Build from typed local fixtures that match the future CMS domain model.
- No WordPress integration in this phase.

### Representative surfaces first

1. Homepage
2. Service index + service detail
3. Knowledge/article detail
4. Product detail
5. Space
6. Contact handoff

Then complete remaining routes.

### Gate P4

Browser-reviewed frontend passes brand, responsive, a11y and structural review with fixture data.

---

## Phase 5 — WordPress foundation

**Goal:** create a zero-cost development CMS without contaminating frontend design.

### Local development

- WordPress + database via Docker Compose (canonical automated path).
- No paid page builder.
- Create custom plugin `toplink-content-model` in `wordpress/plugins/`.
- Register `service` and `product` custom post types with `show_in_rest => true`.
- Use core posts/categories/tags for knowledge/news/customer stories unless evidence later justifies another CPT.
- Use core/custom registered meta rather than a paid field dependency by default.
- Define Author and Editor capabilities/workflow.
- Create fixture/import seed data clearly marked nonproduction.

### Gate P5

An editor can create/update/publish all V1 content types locally and REST schemas are stable.

---

## Phase 6 — Headless integration

**Goal:** replace fixtures with WordPress without changing component contracts.

### Data boundary

```text
WordPress response
      ↓
wp-client
      ↓
validation / normalization
      ↓
Toplink domain model
      ↓
React components
```

### Requirements

- public reads server-side where possible;
- no WP secret delivered to browser;
- signed webhook from WordPress triggers scoped cache revalidation;
- draft preview is authenticated and separate from public cache;
- missing `PENDING` content collapses safely;
- media has alt text and predictable sizing;
- a WP outage degrades with controlled error behavior rather than blank pages.

### Gate P6

Publish/update/delete in WordPress propagates correctly to Next preview/staging and fixtures are no longer public source of truth.

---

## Phase 7 — Commercial web capabilities

**Goal:** make the site operational for communication and acquisition without building a booking backend.

### Add

- verified Zalo, Facebook/Messenger and phone outbound actions;
- contact-click analytics with placement labels;
- Search Console setup plan;
- GA4/dataLayer abstraction;
- extension points for GTM, Meta Pixel and TikTok Pixel without enabling them prematurely;
- metadata, canonical URLs, sitemap, robots;
- Organization/LocalBusiness/Service/Article structured data only where verified facts support it;
- internal linking between articles and relevant services;
- social preview assets;
- local SEO foundation;
- no prices and no “contact for price” text.

### Gate P7

A visitor can understand, trust, explore and contact a human with all destinations verified.

---

## Phase 8 — Hardening and release qualification

**Goal:** prove the system, not merely inspect it.

### Gates

- build/typecheck/format;
- token/design-system conformance;
- route/link/placeholder guards;
- WordPress contract tests;
- Playwright representative flows;
- accessibility audit;
- responsive screenshots;
- Impeccable detector with manual verification;
- Hallmark structural repetition audit;
- screenshot/perceptual critique;
- reduced-motion checks;
- Core Web Vitals performance budget;
- SEO/schema checks;
- health-claim/content review;
- security/secrets/backup checklist;
- verified outbound contact destinations.

Use bounded QA: one batched fix pass + one confirmation pass unless a blocking defect remains.

---

## Phase 9 — Staging → commercial production

### Staging

Vercel Hobby may be used for preview/staging only under current terms. Local or temporary WordPress may support development.

### Production gate

Commercial launch requires:

- a commercial-allowed Next.js host (paid Vercel or VPS/other approved platform);
- persistent hosted WordPress with HTTPS, backups and admin hardening;
- DNS/domain ownership;
- real verified contact channels;
- approved operational facts;
- real/authorized facility imagery for the `Không gian` surface;
- rollback procedure.

### Future VPS migration

Keep the app portable: standard Next.js Node runtime, environment contracts, no Vercel-only business logic, and documented cache/revalidation behavior. This makes a later VPS move a deployment migration, not an application rewrite.
