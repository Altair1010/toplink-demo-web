# Toplink Execution Brief — Research to First Prototype

## Current repo facts

The current repository describes Toplink as a static demo with content in `app-demo/data/content.ts`, an audience skewing middle-aged/older, CSS tokens as source-of-truth, GSAP as the advanced motion engine, native scroll, mandatory reduced-motion and an existing `npm run verify` gate.  
**Nguồn:** [Toplink repo — AGENTS.md](https://github.com/Altair1010/toplink-demo-web/blob/main/AGENTS.md)

The current DESIGN.md already locks a crimson/gold/wood/ivory system, Noto Serif + Be Vietnam Pro, large type, restrained motion and a warm Eastern-traditional positioning.  
**Nguồn:** [Toplink repo — DESIGN.md](https://github.com/Altair1010/toplink-demo-web/blob/main/DESIGN.md)

## Problem diagnosis

The repo has **implementation governance before final brand evidence**. Therefore agents are already constrained by a detailed solution space while the human/physical brand evidence is still incomplete.

This is a project inference based on the repo structure and the supplied research, not a statement from an external source.

## Phase H0 — Evidence harvest

Collect:
- 30–50 real photos;
- 5 staff mini-interviews;
- 10 common customer questions;
- 10 phrases staff actually say;
- 5 material/space motifs;
- actual booking/contact flow;
- real service names and boundaries.

## Phase H1 — User reality

Document 3–5 high-value visitor intents:
- “Tôi đang mỏi/khó chịu, có gì phù hợp?”
- “Nơi này có đáng tin không?”
- “Một buổi sẽ diễn ra thế nào?”
- “Ai thực hiện?”
- “Tôi chưa biết chọn dịch vụ.”

These are working hypotheses and must be validated against real customer/staff conversations.

## Phase H2 — Grayscale narrative

Build homepage only:
- arrival;
- body concern orientation;
- method;
- place;
- people;
- service pathway;
- visit sequence;
- trust;
- booking.

## Phase H3 — Three directions

Do not choose solely from palette differences. Each candidate must change:
- composition;
- typography behavior;
- photography;
- material model;
- motion model.

## Phase H4 — Prototype

Only:
1. hero;
2. one evidence-heavy middle section;
3. booking/uncertain state.

If these three surfaces cannot carry the Humanizer thesis, do not propagate to the whole site.

## Phase H5 — System lock

Translate approved direction into semantic tokens and reusable editorial primitives.

The Design Tokens Community Group 2025.10 format is a stable community-group specification for exchanging design decisions across tools; it can inform future interoperability, though adopting the format is optional.  
**Nguồn:** [DTCG — Design Tokens Format Module 2025.10](https://www.w3.org/community/reports/design-tokens/CG-FINAL-format-20251028/)

## Phase H6 — Design/code loop

Figma MCP can provide structured context such as components, variables/layout data, and Figma explicitly recommends components, semantic naming, variables, Auto Layout and Code Connect to reduce agent guessing.  
**Nguồn:** [Figma — Structure your file for better code](https://developers.figma.com/docs/figma-mcp-server/structure-figma-file/)

Figma also describes its MCP as a bridge rather than one-click perfect code; final implementation still depends on agent context and codebase conventions.  
**Nguồn:** [Figma — MCP vs agent](https://developers.figma.com/docs/figma-mcp-server/mcp-vs-agent/)

Optional workflow:
`current live UI → capture to Figma → annotate/recompose → approved frame → code implementation`  
Figma documents live UI → editable Figma capture as a supported code-to-canvas workflow.  
**Nguồn:** [Figma — Code to canvas](https://developers.figma.com/docs/figma-mcp-server/code-to-canvas/)

## Phase H7 — Verify and release

Use existing repo verification plus state, visual, accessibility and Humanizer score gates.
