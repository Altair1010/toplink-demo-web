# Current Repository Baseline — historical/engineering source

**Repository:** `Altair1010/toplink-demo-web`  
**Baseline main SHA inspected:** `b98dfd063f6bc8f63e43a65bb8cfe617c750c111`  
**Date inspected:** 2026-08-30

## Current facts

- Static public demo.
- Next.js App Router, React, TypeScript, Tailwind CSS v4.
- `package.json` at the inspected baseline uses Next `^16.2.9`, React/ReactDOM `^19.2.7`, Tailwind v4, TypeScript 5 and `@playwright/cli` for browser QA.
- Current deployment is GitHub Pages using static export.
- No database/backend.
- No booking form/transport.
- Public route set is currently six routes: `/`, `/gioi-thieu`, `/dich-vu`, `/quy-trinh-tri-lieu`, `/tin-tuc`, `/lien-he`.
- Current repo has no GSAP dependency; recent maintenance explicitly removed abandoned GSAP/form utility dependencies.
- Existing verification concept includes build, typecheck, formatting, token check and release-surface assertion.

## H7 design authority status

**DEPRECATED for V1 redesign.**

Do not preserve by default:

- heading/copy system;
- visual palette treatment;
- page/section composition;
- information-first “quiet contact” conversion model;
- current route allowlist;
- current restrained motion direction;
- existing component morphology.

## Salvage candidates

Evaluate, do not assume:

- accessibility implementation patterns;
- reduced-motion handling;
- typed Next.js/React infrastructure;
- asset-path discipline;
- token checker pattern;
- route/release assertion pattern;
- useful semantic HTML/components;
- CI verification ordering.

Each component/file receives one label during Phase 0:

`KEEP-ENGINEERING | ADAPT | REBUILD | DELETE-CANDIDATE`

No code is deleted merely because the redesign rejects its visual output; deletion happens only after dependency/use verification.
