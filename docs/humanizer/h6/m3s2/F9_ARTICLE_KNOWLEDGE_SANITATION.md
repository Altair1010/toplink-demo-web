# M3S-2 F9 — Article And Knowledge Sanitation

## Decision

- **Authority:** `DEC-H6-CONSOLIDATED-01 / C5.F9`
- **Baseline:** `cf8ee4b47a4db9f480ba7239cec9e0f2390d427f`
- **Reviewed Toplink article set:** zero
- **Mutation:** true collapse of unreviewed health/YHCT bodies, authors, dates and recommendations

## Exact diff

- `/tin-tuc` becomes a truthful reviewed-content boundary with no category filters, featured card or
  article promises;
- all six existing `/tin-tuc/[slug]` static URLs remain generated for link continuity but render the
  same generic review boundary;
- detail rendering uses demo `POSTS` only to retain the known slug set and reject unknown paths;
- no title, category, excerpt, body, author, date, read-time, image or related-content field reaches
  the production DOM.

`POSTS` and `BlogIndex` remain source-only pending the M5 zero-consumer audit. Triều remains a
language/knowledge reference and does not become a Toplink fact source. The M2B knowledge bridge
stays deferred because no reviewed destination exists.

## Verification

- build generates the index and all six static detail paths;
- source and browser DOM expose zero demo article body, author or health recommendation;
- both index and detail boundaries have valid `h1` then `h2` order and truthful local continuation;
- browser inspection records zero unexpected console errors and zero mutating requests.

## Rollback

Revert only the F9 commit. Restoring article bodies requires a reviewed Toplink source and
publication state; the demo corpus is not a safe rollback target.
