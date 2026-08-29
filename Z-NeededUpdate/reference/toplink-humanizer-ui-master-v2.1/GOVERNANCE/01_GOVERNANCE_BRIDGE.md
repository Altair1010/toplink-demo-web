# Governance Bridge

## Purpose

Allow Humanizer to supersede **legacy design choices** without weakening engineering/accessibility invariants.

## Never superseded by ordinary Humanizer direction

- reduced-motion requirement;
- semantic/accessible interaction expectations;
- static-export constraints unless separately approved as an architecture change;
- basePath single-source behavior;
- no React state in high-frequency scroll loops;
- CSS/Tailwind namespace safety;
- verification gates;
- security/privacy constraints;
- “do not fabricate” rules.

These are current repo engineering constraints.  
**Nguồn:** [Toplink AGENTS.md](https://github.com/Altair1010/toplink-demo-web/blob/main/AGENTS.md)

## Supersedable after Gate A/B + Migration approval

- palette roles and proportions;
- typography families/roles;
- type treatment (while preserving legibility constraints);
- radii/shape language;
- layout/composition grammar;
- editorial section archetypes;
- imagery/crop behavior;
- decorative motif policy;
- visual hierarchy;
- semantic motion grammar;
- homepage visual/narrative decisions;
- legacy component appearance.

Current DESIGN.md already encodes many of these as detailed decisions; v2 treats them as **legacy defaults**, not eternal engineering law.  
**Nguồn:** [Toplink DESIGN.md](https://github.com/Altair1010/toplink-demo-web/blob/main/DESIGN.md)

## Separate architecture gate required

Humanizer may propose but not silently change:
- motion engine;
- rendering architecture;
- deployment model;
- framework;
- data/backend architecture.

## Rule

**Design Gate approval grants target authority, not direct write authority. Migration approval grants mutation authority.**
