# Toplink Humanizer UI — Master Package v2.1

## What v2.1 fixes

v2.0 over-compressed the research/design doctrine from v1.0 while adding operational machinery.
v2.1 fixes that architecture: **v1 knowledge is preserved in full, and v2 operations sit on top of it.**

> Foundation is not a summary. It is the design/research knowledge base.
> Skills are routing layers that load the minimum relevant foundation context for each phase.

## Package architecture

```text
FOUNDATION/        complete v1 research + design doctrine, preserved verbatim
CORE/              compact high-level operating models / rubric
GOVERNANCE/        precedence, bridge, decisions, human gates, migration
KNOWLEDGE/         short evidence indexes for routing, not replacements
SKILLS/            5 phase-specific Humanizer native skills
ADAPTERS/          repo/browser/validator/Figma routing
ARTIFACTS/         working templates
PROMPTS/           installation + Codex context-load prompts
CONTENT_COVERAGE_MAP.md
package.lock.json
```

## First-read sequence for an agent

1. `GOVERNANCE/00_PRECEDENCE.md`
2. `GOVERNANCE/01_GOVERNANCE_BRIDGE.md`
3. `ROUTER.md`
4. `CONTENT_COVERAGE_MAP.md`
5. Current repo `AGENTS.md`, `DESIGN.md`, actual source
6. Load only the relevant `FOUNDATION/` chapters for the current phase.

## Mandatory foundation routing

### H0 — Evidence
Read:
- `FOUNDATION/01_RESEARCH_SYNTHESIS.md`
- `FOUNDATION/02_EVIDENCE_MATRIX.md`
- `FOUNDATION/03_HUMANIZER_MODEL.md`
- `FOUNDATION/06_HUMAN_EVIDENCE_SYSTEM.md`
- `FOUNDATION/12_TRUST_HEALTH_SAFETY.md`

### H1/H2 — Structure, language, narrative
Read:
- `FOUNDATION/04_STRUCTURAL_GRAMMAR.md`
- `FOUNDATION/05_LINGUISTIC_KNOWLEDGE_GRAMMAR.md`
- `FOUNDATION/07_EDITORIAL_COMPOSITION.md`
- `FOUNDATION/08_CONTENT_VOICE.md`
- `FOUNDATION/11_INTERACTION_HUMANITY.md`

### H3 — Art direction
Read:
- `FOUNDATION/03_HUMANIZER_MODEL.md`
- `FOUNDATION/07_EDITORIAL_COMPOSITION.md`
- `FOUNDATION/09_VISUAL_MATERIAL_PHOTOGRAPHY.md`
- `FOUNDATION/10_MOTION_SEMANTICS.md`
- `FOUNDATION/13_ANTI_AI_PATTERN_LIBRARY.md`

### H4/H5 — Implementation / migration
Read:
- approved direction/decision records;
- `FOUNDATION/14_GRAPH_GATES_PROCESS.md`
- `FOUNDATION/15_VERIFICATION_PROTOCOL.md`
- `GOVERNANCE/05_MIGRATION_PROTOCOL.md`
- repo runtime truth.

### H6 — Release
Read:
- `FOUNDATION/12_TRUST_HEALTH_SAFETY.md`
- `FOUNDATION/15_VERIFICATION_PROTOCOL.md`
- `FOUNDATION/16_HUMANIZER_SCORECARD.md`
- `CORE/03_HUMANIZER_MARKING_RUBRIC.md`

## Canonical Humanizer thesis

`Humanizer = Specificity × Evidence × Legibility × Trust × Narrative × Interaction Consequence`

This is a project model, not a validated scientific scale.

## Hard governance rule

Engineering/accessibility invariants remain hard constraints.
Approved Humanizer design decisions may supersede legacy art-direction defaults through an approved migration record.
No agent may silently mutate runtime truth because a target direction differs from current code.
