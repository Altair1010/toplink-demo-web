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

- **Humanizer phase:** `H0–H1 — PARTIAL: EXTERNAL EVIDENCE REQUIRED`; `H2 — APPROVED`; `H3R — GATE A-R APPROVED: VX-02`; `H4R — PARTIAL: VX-02 VISUAL REVISION REQUIRED`; `H4 — BEHAVIORAL EVIDENCE KEPT, HISTORICAL VISUAL RESULT SUPERSEDED`; `H5 — UNAFFECTED CONTRACTS KEPT, AFFECTED GATE-B SUBTREE REOPENED`; `Migration — FROZEN`; `H5.5 — PARTIAL: REOPEN REQUIRED / COMPLETED`; `H6 — INACTIVE`.
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
  evidence and bounded-revision Gate report at `docs/humanizer/h4r/`.
- **Historical Gate A selection:** **B — Hồ Sơ Sống** is preserved as history but superseded in the
  reopened visual/brand subtree. Human Gate A-R approved **VX-02 — Nhịp Hỏi — Đáp Rõ** under
  `DEC-H3R-GAR-01` for the isolated H4R prototype only; it does not authorize production migration.
- **Target Design Truth:** unaffected `DEC-H5-GB-01` behavioral contracts remain historical locked
  inputs. Its thesis/material/composition, public primitive expression and affected token map are
  reopened by H5.5. All H5.5 replacement names and knowledge contracts are **PROPOSED**, not target
  authority. Runtime Truth and H0/H1 evidence gaps do not change.
- **Next gates:** **bounded H4R visual correction + human review → only after H4R PASS, H5R affected
  subtree relock → partially rebuild Migration Gate → HUMAN MIGRATION APPROVAL.** H5R and H6 are
  inactive. No migration batch is ready or authorized.

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
