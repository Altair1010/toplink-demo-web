# Source-of-Truth Contract

## Authority order

1. **Current explicit user instruction**
2. `DECISIONS.md`
3. Approved factual/evidence records supplied by the user
4. Uploaded brand dossier under `sources/brand/`
5. New Toplink `PRODUCT.md`, `DESIGN.md` and Art Direction Constitution created by this plan
6. Authorized Sen Tài Thu **UI/UX/motion reference**, never content truth
7. Hallmark/Impeccable methods and detectors
8. Existing H7 repo design/copy

## Fact classes

Every production-facing content fact must be one of:

- `APPROVED` — safe to ship.
- `PENDING` — known slot, fact not yet supplied; hide from production UI.
- `REJECTED` — explicitly invalid/deprecated.
- `REFERENCE_ONLY` — may inform design/research, must not be represented as Toplink truth.

`PENDING != placeholder`. A production build must never expose `TBD`, fake phone numbers, fake testimonials, fake prices or invented health outcomes.

## Brand dossier usage

The uploaded dossier is authoritative for current brand philosophy, experience intent, tone and health-claim safety unless overridden by a current user decision. Its visual palette/font/pattern guidance is **provisional**, because the user explicitly states that no final palette/font/pattern system exists yet.

The dossier describes the brand as “Y Viện Dưỡng Thân – Tỉnh Thức”, uses the slogan “Thân khỏe – Tâm an – Trí sáng”, emphasizes caregiver/sage/guide traits, and defines the Tĩnh → Thông → Dưỡng → Tỉnh experience narrative. Preserve these as design inputs, not as excuses for decorative literalism.

## Sen Tài Thu usage

User authorization exists, but the chosen project scope is intentionally narrower:

**Allowed:** layout structure, page morphology, navigation behavior, UI patterns, UX flow, responsive behavior, interaction and motion references.  
**Not copied:** text, editorial content, images/video, logos, icons, pricing, claims, service facts, customer data, metadata or brand identity.

The implementation must be a Toplink-native system, not a recolored Sen clone.

## Legacy H7

Legacy H7 design decisions are deprecated for the redesign. They may be consulted only for:

- working technical patterns;
- accessibility behavior;
- verified runtime constraints worth preserving;
- migration history.

No component survives solely because it already exists.
