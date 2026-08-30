# Hallmark + Impeccable Router

## Core rule

Do **not** run both systems as independent design authorities on the same task. Toplink owns the final design system.

```text
User locked decision
      ↓
Product/evidence truth
      ↓
Toplink brand + audience
      ↓
Toplink Art Direction Constitution
      ↓
Impeccable context/runtime  ↔  Hallmark structure/memory
      ↓
Implementation
      ↓
Browser evidence
      ↓
Bounded critique/fix
```

## Responsibility split

### Impeccable owns

- durable product/design context mechanics;
- direction-selection workflow;
- `DESIGN.md` discipline;
- craft-floor checks;
- deterministic detector evidence;
- browser/live iteration where useful;
- audit/critique orchestration;
- implementation/design-system conformance.

### Hallmark owns

- page macrostructure alternatives;
- section morphology;
- anti-template pressure;
- structural variation between pages;
- repetition memory;
- design-DNA vocabulary.

### Toplink layer owns

- brand meaning;
- audience suitability;
- final typography/color/ornament;
- heading/text/CTA grammar;
- motion semantics;
- imagery policy;
- health-safety content rules;
- conversion behavior;
- what is approved or rejected.

## Task routing

| Task | Route |
|---|---|
| New brand-wide visual direction | Impeccable direction workflow + Hallmark structure candidates → human gate |
| New page within locked design system | Hallmark morphology candidates → Toplink constraints → Impeccable craft/verify |
| Small component refinement | Inherit DESIGN.md; no concept tournament; Impeccable polish/audit only as needed |
| Repeated page silhouette | Hallmark structural-memory check |
| Technical accessibility/responsive issue | Impeccable audit/browser evidence first |
| AI-slop suspicion | Impeccable detector + Hallmark taste review; human verification |
| Motion | Toplink motion grammar first; reference choreography second; implementation third |

## Tool-state policy

Tool-specific `.impeccable/`/Hallmark working state is ephemeral unless explicitly promoted into canonical docs.

Canonical Toplink design state should live as:

```text
docs/toplink-v1/design/
├── DESIGN.md
├── ART-DIRECTION-CONSTITUTION.md
├── STRUCTURE-MEMORY.json
├── TOKENS.md
├── MOTION.md
└── DECISIONS.md
```

## Evidence hierarchy for detector findings

1. regex/source heuristic;
2. parsed CSS/AST;
3. DOM/computed style;
4. browser geometry;
5. screenshot/perceptual judgment.

A lower-level heuristic must not block release when stronger evidence clearly contradicts it.

## Verification budget

`BUILD → BATCH INSPECT → BATCH FIX → ONE CONFIRMATION → STOP`

Only release blockers justify an additional loop.
