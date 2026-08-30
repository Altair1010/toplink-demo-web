# P0 Architecture and Repository Inventory

**Baseline:** `b98dfd063f6bc8f63e43a65bb8cfe617c750c111`  
**Scope:** read-only inspection of the legacy H7 application.

## Application architecture

- Next.js App Router, locked install `16.3.3`; React and ReactDOM `19.2.7`; TypeScript `5.9.3` in
  strict/no-emit mode.
- The app lives under `app-demo/`; the repository root has no package manifest.
- `next.config.mjs` enables React strict mode, static export, `trailingSlash`, unoptimized images and
  GitHub Pages `basePath=/toplink-demo-web`.
- Six public pages are hardcoded App Router routes: `/`, `/gioi-thieu`, `/dich-vu`,
  `/quy-trinh-tri-lieu`, `/tin-tuc`, `/lien-he`.
- Static metadata surfaces: `robots.ts`, `sitemap.ts`, `opengraph-image.tsx`, `icon.svg`, 404.
- `layout.tsx`, all route pages and most sections are server components. The three client boundaries
  are `SiteHeader.tsx`, `OrientationCore.tsx`, and `NoticeRegion.tsx`/`NoticeProvider`.
- There are no route handlers, server actions, API clients, database, CMS adapter or runtime backend.

## Route and page structure

| Route                 | Legacy structure                                                                                                              |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `/`                   | header → hero → local orientation state → service scope → process questions → continuation → external-contact status → footer |
| `/gioi-thieu`         | brand introduction → editorial pair → evidence boundary                                                                       |
| `/dich-vu`            | hardcoded introduction → reused service-scope list                                                                            |
| `/quy-trinh-tri-lieu` | hardcoded introduction → reused process-question definition list                                                              |
| `/tin-tuc`            | empty approved-content state → return link                                                                                    |
| `/lien-he`            | pending Zalo/Facebook status → return link                                                                                    |

The current route allowlist and morphology are H7 runtime facts, not V1 IA authority.

## Styling and typography

- Tailwind CSS `4.3.0` via `@tailwindcss/postcss 4.3.0` plus ten authored CSS layers imported by
  `app/globals.css`.
- `tokens.css` defines 35 color tokens plus typography, radius, shadow and motion variables through
  Tailwind v4 `@theme`.
- `skins.css` provides `yvien`, `tet` and `an-tinh` overrides through `data-brand`.
- `next/font/google` loads Be Vietnam Pro 400/500/600 with Vietnamese subsets. All display/serif
  aliases currently resolve to the same sans workhorse.
- Responsive behavior is CSS/Tailwind breakpoint based. The largest authored stylesheet is
  `home-humanizer.css` (788 measured lines).
- Motion uses authored CSS keyframes/transitions. No motion library is installed. Reduced-motion
  media queries disable or settle animations; native smooth scroll becomes automatic under reduce.
- The current colors, font roles, section grammar, skins and motion direction are design-irrelevant
  for V1 unless independently re-approved in P3.

## Components and utilities

| Family            | Baseline implementation                                                               |
| ----------------- | ------------------------------------------------------------------------------------- |
| layout/navigation | `SiteHeader`, `SiteFooter`, root layout, skip link                                    |
| media/icons       | typed `Glyph` SVG wrapper, `Img` wrapper, `asset()` base-path helper                  |
| orientation       | local state machine, editable textarea, review/remove/stop/restart, focus restoration |
| content sections  | hero, service scope, process questions, continuation, contact handoff                 |
| evidence          | fail-closed approved-record filter with production records empty                      |
| notifications     | context provider and accessible live region; no current app consumer found            |

No accordion, tab, carousel/slider, CMS card system, product data module or article data module exists.

## Accessibility baseline

Positive engineering signals:

- skip link to `#main` and global visible `:focus-visible` treatment;
- semantic `header`, `nav`, `main`, `section`, lists, fieldset/legend and definition list usage;
- mobile menu exposes label, `aria-expanded` and `aria-controls`;
- orientation uses labels, `aria-pressed`, error/status semantics and deliberate post-transition focus;
- live notice region differentiates polite status and assertive errors;
- reduced-motion rules are present across global and component CSS;
- release checker asserts exactly one H1 on each current public route.

Open verification limits: P0 captured semantic snapshots and console state but did not claim real
screen-reader speech, all-route tab-only behavior, contrast certification, 200% zoom or multi-browser
parity. Those remain later release-gate work.

## Assets

- The baseline commit has one visual asset: `app-demo/app/icon.svg` (355 bytes).
- No raster images, logo files, video files, local font files or `public/` media tree are tracked at
  the execution baseline.
- `Img.tsx` and `asset.ts` exist but no current TSX/CSS asset consumer was found.
- Files visible only on the separate archive checkout are not part of `origin/main` and were not
  imported into P0.

## Content and data

- Public copy, navigation, service scope, process questions, contact channel names, metadata and
  structured route lists are hardcoded in TSX/TS files.
- Production evidence is an empty array and fail-closes; the associated tests use fixtures only.
- Zalo/Facebook destinations are pending and no fake links exist. Phone is absent from H7.
- There is no centralized service/product/article/contact dataset and no schema or CMS dependency.
- Metadata exists, but no JSON-LD structured data or analytics integration was found.

## Tooling, CI and dependencies

- Package manager: npm with lockfile v3; Node contract `.nvmrc=20` and `engines.node >=20`.
- Installed direct packages: Next 16.3.3, React 19.2.7, ReactDOM 19.2.7, Playwright CLI 0.1.18,
  Tailwind/PostCSS 4.3.0, TypeScript 5.9.3, Prettier 3.9.4 and React/Node type packages.
- No component library, animation library, analytics SDK or CMS dependency is installed.
- Scripts: dev, build, start, typecheck, `format:check`, token checker, release-surface checker and the
  ordered `verify` aggregate.
- Tests: Node's built-in test runner covers 10 orientation and 4 evidence cases. There is no
  aggregated test script or general component/e2e test suite.
- CI/CD: one GitHub Actions Pages workflow triggered by `main`; it runs npm ci/build/typecheck/
  format/token/release checks, then deploys the static `out/` artifact.
- No separate ESLint script/config, formatter-write script, pull-request CI workflow, Vercel config,
  CMS infrastructure or production observability exists.

## P0 conclusion

The repo is a compact, healthy static demo with useful typed/accessibility/verification patterns, but
its route graph, visual system, hardcoded content and Pages deployment are not the V1 target. The
target `app-demo → web` restructure is documented only; no file was moved in P0.
