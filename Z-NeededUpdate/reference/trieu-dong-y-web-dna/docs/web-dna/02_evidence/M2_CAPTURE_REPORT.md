# M2 Raw Capture Report

**Status:** COMPLETE WITH RECORDED LIMITATIONS  
**Snapshot date:** 2026-08-13

## Verified coverage

- 634 expected routes; 634 unique rendered-DOM captures; 0 failed.
- 20 immutable JSONL evidence batches.
- 21/21 page archetypes have a deep computed-style and interaction exemplar.
- 39,038 internal route edges recovered from rendered links.
- 1,939 unique remote asset references and 643 unique rendered image references.
- 2,167 interactive elements sampled across archetype exemplars.
- The former timeout at `/duoc/bai-thuoc/` was recovered successfully.

## Evidence layers

1. `raw/tier0/`: per-route rendered content, headings, metadata, links, asset references, counts and lightweight style fingerprint.
2. `derived/archetype-deep-capture.json`: box/style/interaction evidence for one exemplar from every archetype.
3. `capture-summary.json`: machine-readable accounting and limitations.

## Recorded limitations

- The current access surface blocked robots, XML sitemap and REST endpoint reconciliation.
- Browser viewport resizing was unavailable; route-level mobile screenshot parity is not claimed.
- Asset nodes are remote-resolved references, not an offline binary mirror.
- Runtime mutation of the public origin was prohibited, so the supplied motion engine was not injected. It remains packaged and smoke-tested; M3 uses observed computed transitions.

These limitations reduce forensic depth, not route/content coverage. They remain explicit verification tasks for any later pixel-parity engagement.

