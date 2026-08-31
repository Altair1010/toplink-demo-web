# P4 Implementation Summary

## Resulting frontend

`web/` is an independent production-oriented Next.js frontend. It does not inherit the H7 GitHub
Pages base path, static-route allowlist, visual skins or route graph. The existing `app-demo/` remains
unchanged and continues only as legacy engineering history.

## Stack

- Next.js `16.3.3`, React/ReactDOM `19.2.7`, TypeScript `5.9.3` strict, npm.
- Authored CSS owns Direction C; Tailwind was not added because the current implementation has no
  utility-layer consumer that would justify it.
- Alegreya 500/600 and IBM Plex Sans 400/500/600 load through `next/font/google` with Vietnamese
  subsets; no font binary is committed.
- CSS/native motion only; no GSAP or other motion package.
- Playwright `1.63.0-alpha-2026-08-05` is the single browser automation dependency and backs a
  persistent P8-reusable matrix script.
- Local verification ran on Node `v24.16.0`; the declared project floor is Node 20, but Node-20 CI
  parity was not claimed in P4.

## Architecture

- Exactly five domains: `Service`, `Product`, `Article`, `Media`, `SiteSettings`.
- Fact fields retain owner/source/status; editorial lifecycle remains a separate axis.
- `lib/content/` is the only page-facing access boundary. P6 can replace its fixture implementation
  without changing route components.
- Two service fixtures, one product fixture, three article fixtures and one settings record exercise
  long/short, relation, evidence, media-absent and contact-pending states.
- Fixture facts are `REFERENCE_ONLY`, visibly labeled and documented as non-production.
- `MediaFigure` requires approved asset, alt, role, authorization and publishability; otherwise it
  collapses. Contact actions similarly require approved destinations.

## Direction C implementation

- Semantic roles and conditional asset slots live centrally in `styles/tokens.css`.
- Gateways, courts, chambers, thresholds, reading halls and releases have distinct structure and
  responsive jobs; they are not aliases for a universal section wrapper.
- Home implements the staged four-state procession; service detail implements purpose/process/limits
  before contact; knowledge detail implements a reading hall and evidence spine with no required
  contact.
- One gateway release animation is CSS-only. Reduced-motion renders the stable final state.
- The missing logo, ornament, real material/place evidence and consented photography remain slots,
  not substitutes.

## Preserved engineering

Only neutral ideas were reimplemented: skip link, visible focus, native mobile disclosure, semantic
landmarks, reduced-motion final state, strict TypeScript and ordered verification. No H7 design file,
copy block, route morphology or asset was copied into `web/`.
