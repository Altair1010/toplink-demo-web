# UI Mindset — Triều Đông Y Web DNA

## 1. Brand thesis

The interface should feel like a living medical archive: grounded, editorial, calm and precise. Its authority comes from orientation, provenance and disciplined language—not visual claims of certainty.

## 2. Dual-journey thesis

Every major entry surface must answer one question first: is the visitor here to **understand** or to **seek support**? Knowledge and care are peers in the platform, but only one is primary within a given context.

## 3. Attention hierarchy

1. Immediate orientation: page type, title and scope.
2. Primary task: read, explore, look up or understand a care pathway.
3. Trust evidence: author/reviewer, source date, editorial status and disclaimer.
4. Continuation: related entity, taxonomy or next step.
5. Contact intent: visible but never interrupts reading.

## 4. Narrative sequence

- Homepage: shared promise → two doors → trusted collections → care methods → editorial proof.
- Knowledge detail: breadcrumb → definition → quick facts → full explanation → related graph → provenance.
- Care detail: need → scope → method → process → suitability boundaries → contact intent.

## 5. Information architecture

Use familiar Vietnamese vocabulary. Public labels are `Tàng thư`, `Huyệt đạo`, `Kinh mạch`, `Dược liệu`, `Bài thuốc`, `Lý luận`, `Bệnh học`, `Phương pháp` and `Liên hệ`. Internal archetype names never leak into public UI.

## 6. Spatial grammar

- Reading container: 680–760px; application container: up to 1180px.
- Section rhythm: 64/80/96/120px.
- Dense reference lists use rules and alignment; narrative cards use paper layers and restrained radius.
- White space expresses confidence; decorative density must not compete with medical content.

## 7. Typography grammar

- Editorial/display: Georgia-compatible serif for cultural continuity and long-form authority.
- Interface/body: system sans for scanning and Vietnamese diacritics.
- Source baseline records Tahoma as the dominant body family; evolved UI deliberately separates editorial and functional voices.

## 8. Color semantics

- Forest: orientation, primary action, confirmed structure.
- Paper: reading field and continuity with the source identity.
- Vermilion: seal, emphasis and exceptional attention—not every CTA.
- Gold: provenance, gate status and secondary ritual detail.
- Health warnings use explicit text and icons; color alone never carries meaning.

## 9. Component grammar

Components are named by responsibility: `KnowledgeCard`, `EntityFacts`, `CarePath`, `EvidenceNote`, `SourceTrace`, `LookupPanel`. A card may not mix unrelated actions just to fill space.

## 10. Interaction grammar

- Links continue thought; buttons change state or begin a deliberate action.
- Search filters immediately and reports result count.
- Lookup discloses that it is educational, not diagnostic.
- Contact controls reveal channels; the prototype never submits medical information automatically.

## 11. Motion philosophy

Motion is quiet confirmation. Default transition is 200ms ease; press feedback may use 120ms; larger context changes may use 250ms. No perpetual decorative motion. Reduced-motion removes smooth scroll and nonessential transform.

## 12. Responsive philosophy

Preserve reading order before preserving composition. Dual columns stack knowledge first. Touch targets are at least 44px. Horizontal archives become vertical index rows, not miniature desktop grids.

## 13. Trust and editorial safety

Every health content record supports source provenance and review status. Traditional use, proposed mechanism and clinical evidence are separate concepts. No lookup result is phrased as diagnosis or personal treatment instruction.

## 14. Observed / inferred / proposed

- **Observed:** 634 routes, 21 archetypes, source typography/color fingerprints, rendered content, links, assets and computed transitions.
- **Inferred:** reusable component families, attention hierarchy and graph relations.
- **Proposed:** dual-entry homepage, normalized trust layer, evolved tokens and knowledge explorer.

## 15. Governing rule

The evolved layer may change visual form only when it improves orientation, trust or task completion. Novelty without a decision edge is drift.

