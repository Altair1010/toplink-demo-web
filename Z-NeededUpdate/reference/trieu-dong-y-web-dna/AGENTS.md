# Codex Operating Contract

## Sources of truth

1. `docs/web-dna/01_governance/MASTER_PLAN.md`
2. `docs/web-dna/01_governance/DECISIONS.md`
3. `docs/web-dna/04_ui_ir/UI_MINDSET.md`
4. `docs/web-dna/04_ui_ir/design-tokens.json`
5. `data/content-index.json`

## Invariants

- Baseline evidence and evolved proposals are separate layers.
- Never invent health claims, professional credentials, contact details or treatment outcomes.
- Preserve `source_url`, capture timestamp and provenance hash on migrated content.
- A UI drift requires a decision or hypothesis ID.
- Lookup output is educational and never diagnostic.
- Nonessential animation must respect `prefers-reduced-motion`.
- Do not ingest code from X-SLAYER/Website-Cloner without a recognized license.

## Change loop

Inspect evidence → declare affected graph nodes → implement smallest coherent change → build → render → verify routes/interactions/accessibility → update verification register.

## Scope rules

- Shared foundation may be changed only with an explicit cross-route acceptance check.
- Content generation edits normalized records, never raw evidence batches.
- Never rewrite captured source evidence to match implementation.

