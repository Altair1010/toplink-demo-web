# Toplink Humanizer UI v2.1

Entry point nhẹ cho Humanizer design-governance trong workspace này. Package gốc giữ
doctrine, templates và validation chi tiết; file này chỉ điều phối authority, routing,
gate và migration.

## Authority và evidence lanes

| Vai trò                         | Path                                                                                                                                   | Được dùng cho                                                                                          | Không được dùng cho                                                          |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| Primary governance              | `Z-NeededUpdate/reference/toplink-humanizer-ui-master-v2.1/`                                                                           | evidence, doctrine, art direction, UX/state, trust, motion, verification, gates, migration             | không thay Runtime Truth khi chưa có migration                               |
| Structural evidence             | `Z-NeededUpdate/reference/sen-tai-thu-web-dna/`                                                                                        | narrative structure, brand-world organization, space/service/people/treatment/conversion relationships | clone design, palette, type, wording, visual identity, pixel/layout geometry |
| Linguistic / knowledge evidence | `Z-NeededUpdate/reference/trieu-dong-y-web-dna/`                                                                                       | taxonomy, Đông-y vocabulary, explanation grammar, provenance mindset                                   | medical claims, diagnosis/treatment certainty, academic/encyclopedic scope   |
| Runtime Truth                   | `app-demo/` actual source; especially `styles/tokens.css`, `styles/`, components, `data/content.ts`, `next.config.mjs`, `package.json` | what the website currently does                                                                        | approved target before it is migrated                                        |

`AGENTS.md` is the repo-level operational authority. `DESIGN.md` describes the current runtime
design system. This file and the master package govern future Humanizer work without claiming a
redesign has already occurred.

## First read and phase loading

At a Humanizer session start, read in this order:

1. `AGENTS.md`, this file, and current runtime source relevant to the task.
2. Master package: `00_START_HERE.md`, `GOVERNANCE/00_PRECEDENCE.md`,
   `GOVERNANCE/01_GOVERNANCE_BRIDGE.md`, `ROUTER.md`, `CONTENT_COVERAGE_MAP.md`.
3. The phase-required `FOUNDATION/` chapters named by `00_START_HERE.md` and the primary skill.
4. The relevant evidence lane(s), without mixing their scope.

The package's `SKILLS/` directory is canonical. Project-local copies in `.agents/skills/` and
`.claude/skills/` must retain the same required foundation-load sections.

## Canonical project phase map

For this Toplink execution, `FOUNDATION/18_TOPLINK_EXECUTION_BRIEF.md` is the phase-numbering
authority:

`H0 Evidence Harvest → H1 User Reality → H2 Grayscale Narrative → H3 Three Directions → H4 Prototype → H5 System Lock → Migration Gate → H6 Design/Code Loop → H7 Verify and Release`

The package `ROUTER.md` remains useful only as the skill/tool routing authority. Its older phase
numbers must not reinterpret the project phase map above.

## Current status

- **Humanizer phase:** `H0–H1 — PARTIAL: EXTERNAL EVIDENCE REQUIRED`; `H2 — APPROVED`; `H3R — GATE A-R APPROVED: VX-02`; `H4R-C — UI/UX/VISUAL CORRECTION PASS`; `H5R — GATE B-R APPROVED / LOCKED: DEC-H5R-GBR-01`; `Migration Gate-R — PASS`; `H6-F — PASS / H6 CLOSED`; `H7 — PASS / TECHNICALLY RELEASE READY / BLOCKED BY RELEASE INPUT`.
- **H7 release decision:** all technical/content release gates pass. Final release remains blocked by
  the missing approved exact Zalo URL and Facebook Page URL. H7 generated the local static release
  candidate from `8b10b3abcba559c9f4ad8702841d3f1c23d2f23d`; no deployment was performed.
- **H6-F product decision:** `DEC-H6F-PRODUCT-SCOPE-01` defines the website as an information,
  understanding and exploration surface. Booking is **RETIRED**. M4 is **DEPRECATED — REMOVED
  FROM TARGET PRODUCT**. The optional downstream handoff uses the human-approved channel types
  Zalo and Facebook Page; exact URLs remain `CONTACT_URL_DEFERRED` and no guessed link is rendered.
- **H6-F release surface:** public routes are `/`, `/gioi-thieu`, `/dich-vu`,
  `/quy-trinh-tri-lieu`, `/tin-tuc` and `/lien-he`. Unsupported content is retained outside the App
  Router, motion labs are maintainer-only, and `/dat-lich` plus all booking state/UI/config are
  absent from production.
- **H6-F trust state:** M3P remains **DEFERRED TO ADMIN**. Production evidence remains zero with
  true collapse. No provider, transport, confirmation, person, facility, process, price, duration,
  suitability, outcome or contact destination is inferred.
- **Why:** the H0/H1 artifacts now exist at `docs/humanizer/h0-h1/`, but the audit found no
  consent/provenance-confirmed Toplink people, place, craft, customer-language or operational
  evidence. Existing placeholder media/content and unverified operational claims are not real
  evidence.
- **Current artifacts:** H0/H1 remains at `docs/humanizer/h0-h1/`; H2 at `docs/humanizer/h2/`; H3
  direction and Gate A decision at `docs/humanizer/h3/`; H4 prototype evidence at
  `docs/humanizer/h4/`; H5 locked target contracts and Gate B decision at
  `docs/humanizer/h5/`; pre-H5.5 migration plan at `docs/humanizer/migration/`; foundation rebind,
  target reconciliation and migration rebase at `docs/humanizer/h5-5/`; reopened blind direction
  comparison and approved Gate A-R decision at `docs/humanizer/h3r/`; isolated H4R prototype
  evidence and bounded-revision Gate report at `docs/humanizer/h4r/`; approved M3S-B, M3S-1 and
  M2A0 execution and verification evidence at `docs/humanizer/h6/`.
- **Historical Gate A selection:** **B — Hồ Sơ Sống** is preserved as history but superseded in the
  reopened visual/brand subtree. Human Gate A-R approved **VX-02 — Nhịp Hỏi — Đáp Rõ** under
  `DEC-H3R-GAR-01` for the isolated H4R prototype only; it does not authorize production migration.
- **Target Design Truth:** unaffected `DEC-H5-GB-01` contracts remain retained inputs. Human Gate
  B-R approved and locked `DEC-H5R-GBR-01`: the corrected VX-02 visual thesis, public primitives,
  functional surface/token semantics, evidence-later contract and bounded knowledge bridge. The
  lock is design authority, not runtime write authority.
- **Evidence decision:** `DEC-H4RC-EVIDENCE-DEFER-01` records private-opening deferral to later admin
  population. Blind state remains `CATEGORY-SPECIFIC — EVIDENCE DEFERRED`; it is not promoted to
  `TOPLINK-DEPENDENT`. Missing real evidence collapses and cannot be fabricated. `DE-01 PLACE`,
  `DE-02 PERSON/ROLE`, `DE-03 PROCESS/SERVICE` and `DE-04 REVIEWED SERVICE FACT` remain deferred
  admin content/reality debt and block only claims requiring them.
- **Migration planning:** `docs/humanizer/migration-r/` supersedes the historical
  `docs/humanizer/migration/` set for implementation planning. Migration Gate-R recommends exact
  READY/CONDITIONAL/DEFERRED/BLOCKED batches. `DEC-MIGR-H6-M3SB-01` approved M3S-B only; its hidden
  placeholder transport and false-success terminal state are removed and verified fail-closed.
  `DEC-MIGR-H6-M3S1-01` then approved M3S-1 only; four unverified JSON-LD emitters are removed while
  visible content, metadata and breadcrumb navigation remain unchanged.
- **M2A0 migration:** `DEC-MIGR-H6-M2A0-01` approved M2A0 only. The production homepage now uses a
  static sans-first Opening Question → Clear Boundary → local no-send/uncertainty shell; the old
  Body Signal → Tắc/Hàn/Hư/Loạn → automatic service recommendation graph is unreachable from `/`
  and its proven zero-consumer source is removed by M5A.
- **M1C typography calibration:** `DEC-H6-CONSOLIDATED-01 / C1` resolves the required brand profile
  at its absolute source path and locks a sans-first behavior contract for named M2A1/M2B
  consumers. Be Vietnam Pro remains a digital workhorse/runtime candidate, not an official brand
  font. Runtime delta was `0`; Noto and global headings were unchanged at the M1C checkpoint.
- **M0R-JIT semantic bridge:** fresh consumer review retains existing primitives and corrected
  component-local roles. Runtime alias count remains `0`; no legacy crimson/gold value is promoted
  to Humanizer Target Truth and all three skin paths remain unchanged.
- **M2A1 guided orientation:** the homepage now accepts bounded ordinary-language choices, exact
  editable wording and equal uncertainty, then shows a clear no-diagnosis boundary and local
  no-send consequence. Ten pure state tests and the responsive/keyboard/network browser matrix pass;
  M2A0 remains the rollback floor.
- **M2B narrative completion:** the reachable homepage now continues through bounded service
  category meaning, a truthful process expectation boundary, production zero-evidence collapse and
  a local return-to-orientation continuation. `RitualTimeline`, `SpaceAsTherapy` and `HomeFinalCTA`
  are no longer reachable and their zero-consumer source is removed by M5A. No reviewed learning
  destination exists, so the external knowledge branch is deferred rather than fabricated.
- **M3S-2 inventory:** ten independent claim families are registered in
  `docs/humanizer/h6/26_M3S2_CLAIM_INVENTORY.md`. F10 metadata/SEO, F4 staff/stat and F5
  review/testimonial, F1 identity/contact, F9 article/knowledge and F3A homepage health claims are
  verified by bounded rewrite or true collapse. F2 and the remaining F3/F6/F7/F8 families require
  a route migration delta and remain deferred or blocked from automatic inference.
- **M3S-2 final state:** F10, F4, F5, F1, F9 and bounded F3A are implemented/verified. F2 and the
  remaining F3/F6/F7/F8 families are explicitly deferred because safe completion requires a
  material cross-page migration delta.
- **M5A cleanup:** the closed pre-M2A0 symptom/taxonomy/recommendation graph has zero runtime, test
  and rollback consumers and is removed. `HomeHero` remains live; `StaticOrientationShell` remains
  the M2A0 rollback floor. M5B was then ineligible with 10 Noto references; H6-F later removes the
  final public/runtime consumers and load path. M5C removes only proven
  zero-consumer evidence/contact/article components, demo exports and their exact legacy selectors;
  all live tokens, primitives and the `yvien`/`tet`/`an-tinh` skins remain.
- **H6-F closure:** booking, sticky conversion surfaces and booking-dependent geometry are removed;
  the homepage hero and public information routes use the locked sans-first Humanizer grammar; all
  public pages have one `h1`; motion labs and unsupported content do not appear in static output.
  Browser/static verification and final scores are recorded in `docs/humanizer/h6/38_H6F_FINAL_VERIFICATION.md`
  and `docs/humanizer/h6/39_H6_CLOSURE_REPORT.md`. Next is **H7 — VERIFY & RELEASE**; H7 must not
  begin automatically.

Decision states are:

- `LOCKED` — final target in declared scope.
- `APPROVED` — authorized for the next phase, but may still require a system/migration lock.
- `PROPOSED` — candidate only; cannot override defaults or authorize mutation.
- `DEPRECATED` — historical only; never revive implicitly.

Each decision record must state scope, evidence, reason, alternatives, affected surfaces, reversal
cost, approver/date and status. Do not create a decision merely to make a record appear complete.

## Two-truth precedence and constraints

**Runtime Truth** answers what is running now:

`actual source/runtime → tokens.css → DESIGN.md explanation`

**Target Design Truth** answers what an approved Humanizer redesign should become:

`LOCKED Humanizer decision → approved design grammar/contracts → PROPOSED candidate`

Target truth has no direct write authority. The overall precedence is:

1. Platform, safety and legal requirements.
2. Repo engineering, accessibility, security and safety invariants.
3. Explicit current user instruction or approved Human Gate.
4. `LOCKED` Humanizer decision in its declared scope.
5. Approved Humanizer grammar/contracts.
6. Legacy `DESIGN.md` art-direction defaults.
7. Proposed directions and agent suggestions.

| Classification                | Treatment                                                                                                                                                                                                                                                                                          |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Engineering invariants        | Keep: accessibility, reduced motion, single advanced motion engine where required, native scroll, static export, basePath source-of-truth, token hygiene, performance/runtime correctness, verification/build gates, security/privacy and no fabrication. Humanizer cannot silently override them. |
| System/accessibility defaults | Keep readable type, contrast, measure, keyboard/focus and touch targets unless evidence supports a change that does not degrade usability/accessibility.                                                                                                                                           |
| Legacy art-direction defaults | Palette, type family/behavior, hierarchy/density, layout/editorial grammar, radii, image/decorative language, motion semantics and component appearance may supersede only after the required Human Gate and approved migration.                                                                   |

Architecture changes (motion engine, rendering/deployment model, framework, data/backend) require a
separate explicit approval even when Humanizer proposes them.

## Skill and tool routing

`toplink-humanizer-orchestrator` is the primary router:

`orchestrator → human-evidence-harvest | humanizer-ux-state-review | humanizer-art-direction | humanizer-release-verifier`

- H0: `human-evidence-harvest`.
- H1/H2: `humanizer-ux-state-review` for user reality, tasks, states and grayscale narrative.
- H3: `humanizer-art-direction`; `frontend-design` is a challenger only and produces a
  `PROPOSED` candidate after an internal evidence brief.
- H4/H5/H6 prototype, system lock and design/code loop: orchestrator routes against approved gates
  and current runtime truth; mutation still requires the applicable approval/migration record.
- H7: `humanizer-release-verifier`; use Playwright CLI by default, Chrome DevTools for runtime/
  performance diagnosis, and Playwright MCP only when persistent exploratory browser state warrants it.

No external taste/design skill may overwrite an approved grammar, edit tokens, rewrite `DESIGN.md`,
or decide brand direction by itself.

### Permanent reference routing after H5.5

For a **structure or IA mutation**, first load only the relevant Sen structural route:

- `Z-NeededUpdate/reference/sen-tai-thu-web-dna/START_HERE.md`
- `Z-NeededUpdate/reference/sen-tai-thu-web-dna/UI_MINDSET.md`
- `Z-NeededUpdate/reference/sen-tai-thu-web-dna/inventory/site-foundation.json`
- `Z-NeededUpdate/reference/sen-tai-thu-web-dna/graphs/task-graph.repaired.json`

For a **YHCT, knowledge or content mutation**, first load only the relevant Triều knowledge route:

- `Z-NeededUpdate/reference/trieu-dong-y-web-dna/docs/web-dna/04_ui_ir/UI_MINDSET.md`
- `Z-NeededUpdate/reference/trieu-dong-y-web-dna/docs/web-dna/04_ui_ir/KEEP_EVOLVE_REMOVE.md`
- `Z-NeededUpdate/reference/trieu-dong-y-web-dna/docs/web-dna/03_inventory/page_archetypes.json`
- `Z-NeededUpdate/reference/trieu-dong-y-web-dna/docs/web-dna/05_graphs/site-graph.json`
- `Z-NeededUpdate/reference/trieu-dong-y-web-dna/data/content-index-lite.json`

For an **interaction mutation**, load the relevant H5/H5.5 contract plus only the Sen or Triều graph
whose lane is materially relevant. Do not load both complete corpora for every implementation task.
References challenge or support a Toplink job; they never supply Toplink facts or visual identity.

## Human Gates and migration

- **Gate A — Direction:** choose one of three genuinely different evidence-grounded directions;
  locks thesis, composition, photo/material character, typography behavior and motion intent.
- **Gate B — System:** locks semantic tokens, component/editorial grammar, content voice,
  interaction/state language and motion verbs.
- **Migration Gate — Mutation:** approves a specific current-runtime-to-target delta before any
  legacy token/component rewrite.
- **Gate C — Release:** requires repo verification, browser/task/state/a11y/visual review,
  Humanizer rubric and no unresolved P0/P1 defect.

Required migration flow:

`current runtime → identify delta → proposal → applicable Human Gate → approved decision → approved Migration Record → minimal implementation → verification → re-baseline Runtime Truth`

The Migration Record must map decision, current runtime, target, affected files/tokens, risk and
verification. If a delta conflicts with an invariant, stop and escalate; never weaken the invariant
to make a visual direction fit.

## Verification and anti-AI constraints

For any later implementation/release, preserve `npm run verify` and add the Humanizer checks:
specificity, evidence, plain-language comprehension, state completeness, visual regression,
component edge states, keyboard/focus, 375/768/1280/1440, 200% zoom and reduced motion.

Reject generic bento/card metronomes, decorative motion without narrative/state value, generic
wellness slogans without evidence, fake testimonials/metrics/live activity/staff, synthetic imagery
presented as real people, medical-certainty inflation, illegible heritage styling, and novelty that
harms orientation or task completion. Real human evidence must be captured, attributed and
consent-aware; it must never be fabricated.

## Publication of Humanizer artifacts

After each Humanizer phase:

- commit and push changes under `docs/humanizer/` together with directly related entrypoint or
  governance documentation to the current remote, after scope-appropriate verification;
- preserve clear distinctions between real evidence, reference evidence, assumption/hypothesis,
  and missing evidence in public artifacts;
- never publish secrets, customer data, private health information, private personal data, or
  consent-sensitive material not approved for publication;
- include application/source changes in the phase publication commit only when that phase has
  separate mutation approval.
