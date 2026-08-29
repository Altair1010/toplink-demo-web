# Graph + Human Gates Process

## Evidence

The supplied vibecode corpus argues that commercial UI engineering should connect business intent, user/task graph, state graph, references, design system, implementation, verification and feedback, with explicit human gates to prevent subjective prompt loops.  
**Nguồn nội bộ:** `Pasted markdown(3).md` → `Commercial UI/UX graph + human gates sections` · SHA-256 `409f7d41f8e6f44939b3395d351aeda9b1e8481b81a2deafa2c04f28c700553b`

WHO human-centred design guidance also frames the work as iterative, user-informed prototyping and learning.  
**Nguồn:** [WHO — Human-centred design](https://cdn.who.int/media/docs/default-source/digital-health-documents/scaling-innovations-in-public-health-systems_who-guidance-and-toolkit.pdf)

## Toplink graph

```text
G0 BRAND/BUSINESS INTENT
        ↓
G1 USER REALITY
        ↓
G2 HUMAN EVIDENCE INVENTORY
        ↓
G3 PAGE/TASK/NARRATIVE GRAPH
        ↓
G4 STRUCTURAL + LANGUAGE REFERENCES
        ↓
G5 WIREFRAME
        ↓
G6 ART DIRECTION CANDIDATES
        ↓
[HUMAN GATE A]
        ↓
G7 DESIGN / CONTENT / MOTION GRAMMAR
        ↓
G8 PROTOTYPE: HERO + 2 SECTIONS + BOOKING STATE
        ↓
[HUMAN GATE B]
        ↓
G9 IMPLEMENTATION
        ↓
G10 VISUAL / UX / A11Y / STATE VERIFICATION
        ↓
[HUMAN GATE C]
        ↓
RELEASE / OBSERVE
```

## Gate A — Direction
Lock:
- visual thesis;
- photography;
- typography behavior;
- composition;
- material language.

## Gate B — System
Lock:
- semantic tokens;
- section archetypes;
- motion verbs;
- interaction consequence;
- content voice.

## Gate C — Release
Require:
- critical task pass;
- mobile pass;
- accessibility checks;
- visual diff review;
- real content/evidence used;
- no unresolved high-severity regression.
