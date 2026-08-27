# 01 — H2 Entry and Constraints

**Phase:** H2 — Page Narrative + Grayscale UX Architecture

**Status:** `PROPOSED — READY FOR HUMAN REVIEW`

**Date:** 2026-08-27

**Scope:** information architecture, page roles, homepage narrative, low-fidelity wireframes, section/state contracts, and evidence dependencies only.

## Context load report

| Item | Result |
| --- | --- |
| Current Humanizer position | H0/H1 remain `PARTIAL — EXTERNAL EVIDENCE REQUIRED`; the user explicitly authorized this provisional H2 work. |
| Runtime Truth | The static demo has need-led discovery, service/detail routes, contact/booking UI, and a booking flow that may display success while its destination is unconfigured. |
| Target Design Truth | This phase introduces only `PROPOSED` IA, narrative, and state contracts. No art direction, visual system, token, typography, palette, component, or migration decision is approved or locked. |
| Primary routing used | `toplink-humanizer-orchestrator → humanizer-ux-state-review`. The package router's old art-direction interpretation of H2 is superseded for this task by the explicit Humanizer H2 scope. |
| Reference lanes | Sen Tài Thu: structural relationships only. Triều Đông Y: terminology, explanation, provenance discipline only. |
| Permitted mutation | Humanizer documentation and this entrypoint only. |
| Forbidden mutation | Application/source, JSX/CSS/components, tokens, typography/palette, images, booking implementation, `DESIGN.md`, dependencies, and production content. |

## Evidence classification rule

Every artifact preserves exactly these classes:

- **REAL EVIDENCE** — verified Toplink fact with ownership/provenance, consent where needed, and applicable review.
- **REFERENCE EVIDENCE** — grammar learned from Sen Tài Thu or Triều Đông Y; never proof about Toplink.
- **ASSUMPTION / HYPOTHESIS** — current-runtime implication or H2 candidate; not a business fact.
- **MISSING** — unavailable evidence. A future section uses an **EVIDENCE SLOT / DEPENDENCY**, never invented copy, person, place, claim, or operational promise.

H0/H1 establishes strong Runtime Truth about the demo, but establishes no verified Toplink people, place, craft, service process, contact channel, booking owner, review, or health-content review.

## H2 operating constraints

1. A proposed page may reserve evidence space, but it must not imply the slot is populated. Example: `[REAL TOPLINK PLACE / ENTRY EVIDENCE REQUIRED — P0]`.
2. Familiar signs may open an orientation path; they may not diagnose, assign `Tắc/Hàn/Hư/Loạn`, promise a result, or automatically select a service.
3. A direct action may be architected, but no completion copy may promise receipt, response time, or staff ownership until operational evidence exists.
4. Sen Tài Thu contributes the relationship `world → orientation → service → people/place trust → booking continuation`; no visual identity, wording, geometry, palette, typography, or imagery transfers.
5. Triều Đông Y contributes `familiar sign → term if needed → plain-language explanation → care scope → limit/uncertainty → next step`; it does not validate a Toplink medical claim or create an encyclopedia requirement.
6. Grayscale architecture records hierarchy, density, slots, CTAs, reading order, and state notes. It intentionally says nothing about visual direction.

## H2 acceptance boundary

This phase can pass as a **provisional architecture** if every proposed route/section/action has an explicit job, question, evidence status, dependency, and uncertainty/recovery path. It does **not** close any H0/H1 evidence gap or authorize implementation.

## Required next gate

**Human review of narrative architecture.** The reviewer must decide whether the proposed job priority, Body Signal disposition, page-role changes, evidence-slot policy, and booking consequence model are the desired target architecture. Only after that review should H3 — Three Art Directions begin.
