# Decision Log

| ID | Decision | Rationale | Status |
|---|---|---|---|
| D-001 | Build a baseline-faithful clone before UI transformation. | Creates a measurable reference and prevents aesthetic drift. | Approved |
| D-002 | Package both knowledge-library and treatment-brand modes. | Matches the user's product intent and the source topology. | Approved |
| D-003 | Use graph-based route discovery plus iterative verification loops. | Captures topology and exposes gaps without claiming unsupported completeness. | Approved |
| D-004 | Admit all 634 discovered routes into migration scope, subject to G1 approval. | Avoids losing the long-tail knowledge graph while allowing tiered capture. | Proposed at G1 |
| D-005 | Retry the timed-out `duoc/bai-thuoc/` route in M2. | A protocol timeout is not evidence that the route is invalid. | Open |
| D-006 | Treat blocked robots/sitemap endpoints as a recorded limitation. | Current access surface could not verify those endpoints. | Open verification task |
| D-007 | Keep X-SLAYER concept-only. | No recognized repository license was found at source lock time. | Approved |
| D-008 | G1 scope includes all 634 routes. | User explicitly approved G1 and requested execution of all remaining milestones. | Approved |
| D-009 | G2–G4 use the recommended evidence-led UI direction. | User delegated remaining milestone decisions; unknown brand/legal values remain configuration. | Approved for prototype |
| D-010 | G5 classifies this release as a private prototype. | Medical/legal review and real service variables are not supplied, so public clinical launch is not implied. | Approved safety boundary |
