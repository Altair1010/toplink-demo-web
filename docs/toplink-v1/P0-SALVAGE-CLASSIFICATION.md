# P0 Salvage Classification

**Baseline set:** all 65 files tracked at
`b98dfd063f6bc8f63e43a65bb8cfe617c750c111`.  
**Rule:** classification evaluates engineering quality separately from V1 design relevance.
`DELETE-CANDIDATE` is documentation only; P0 deletes nothing.

## Summary

| State            |  Count | Meaning in this baseline                                                                      |
| ---------------- | -----: | --------------------------------------------------------------------------------------------- |
| KEEP-ENGINEERING |     14 | implementation/infrastructure can likely survive with no design authority implied             |
| ADAPT            |     23 | sound concept or implementation requires V1 architecture/scope changes                        |
| REBUILD          |     23 | the capability remains useful, but H7 composition/content/design must not define V1           |
| DELETE-CANDIDATE |      5 | likely legacy/redundant after verified consumer and rollback checks in a later approved phase |
| **Total**        | **65** | every baseline tracked file classified                                                        |

## KEEP-ENGINEERING

| File                                                                         | Engineering assessment                        | V1 design relevance / reason                          |
| ---------------------------------------------------------------------------- | --------------------------------------------- | ----------------------------------------------------- |
| `.gitattributes`                                                             | repository text hygiene                       | neutral infrastructure                                |
| `.gitignore`                                                                 | protects generated/local state                | neutral infrastructure                                |
| `app-demo/.gitignore`                                                        | excludes Node/Next output                     | retain concept when app is restructured               |
| `app-demo/.nvmrc`                                                            | reproducible Node floor                       | target runtime must revalidate version later          |
| `app-demo/.prettierignore`                                                   | stable formatter exclusions                   | neutral tooling                                       |
| `app-demo/.prettierrc`                                                       | small deterministic format contract           | neutral tooling                                       |
| `app-demo/components/Glyph.tsx`                                              | typed, accessible SVG primitive               | icons themselves do not set V1 art direction          |
| `app-demo/components/home-experience/corrected/EvidenceAnswer.tsx`           | fail-closed rendering boundary                | visual shell can change; evidence gating is valuable  |
| `app-demo/components/home-experience/corrected/evidence-visibility.d.mts`    | typed evidence contract                       | aligns with approved/pending truth model              |
| `app-demo/components/home-experience/corrected/evidence-visibility.mjs`      | rejects incomplete/unapproved/revoked records | strong truth-safety primitive                         |
| `app-demo/components/home-experience/corrected/evidence-visibility.test.mjs` | proves fail-closed behavior                   | fixture success is not production evidence            |
| `app-demo/components/notice/NoticeRegion.tsx`                                | accessible live-region primitive              | currently unused; retain only with a real V1 consumer |
| `app-demo/postcss.config.mjs`                                                | minimal Tailwind/PostCSS bridge               | neutral infrastructure                                |
| `app-demo/tsconfig.json`                                                     | strict TypeScript and App Router paths        | adapt path location only if `web/` migration occurs   |

## ADAPT

| File                                                                        | Engineering assessment                               | V1 design relevance / reason                                                |
| --------------------------------------------------------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------- |
| `.github/workflows/deploy.yml`                                              | ordered quality gates are useful                     | GitHub Pages/static deploy is not target production topology                |
| `AGENTS.md`                                                                 | valuable runtime constraints and evidence rules      | H7 product/design authority was superseded; P0 adds an explicit V1 boundary |
| `README.md`                                                                 | accurate H7 runbook                                  | must become V1 project entrypoint over later phases                         |
| `app-demo/README.md`                                                        | useful application operations                        | static/H7 route contract will change                                        |
| `app-demo/app/globals.css`                                                  | disciplined import layering and a11y base            | layer set and current visual tokens must change after direction approval    |
| `app-demo/app/layout.tsx`                                                   | metadata, font loading, skip link and semantic shell | header/footer/font/metadata and static-host assumptions need V1 contracts   |
| `app-demo/app/robots.ts`                                                    | typed static metadata surface                        | canonical host and indexing policy will change                              |
| `app-demo/app/sitemap.ts`                                                   | typed sitemap surface                                | route graph and CMS content will change                                     |
| `app-demo/components/Img.tsx`                                               | centralized asset-path concept                       | GitHub Pages prefixing is not the headless production media strategy        |
| `app-demo/components/home-experience/corrected/ClearBoundary.tsx`           | explicit safety boundary                             | copy/composition depends on future product IA                               |
| `app-demo/components/home-experience/corrected/ConsequenceBeforeAction.tsx` | reversible local-state behavior and focus target     | current orientation journey is not V1 conversion authority                  |
| `app-demo/components/home-experience/corrected/GuidedOrientation.tsx`       | labeled controls and editable wording                | any future explorer requires P2/P3 approval and new morphology              |
| `app-demo/components/home-experience/corrected/OrientationCore.tsx`         | clean local state and focus restoration              | signature component is only a candidate, not approved V1 scope              |
| `app-demo/components/home-experience/corrected/orientation-state.d.mts`     | explicit state types                                 | domain names/contracts must follow approved product IA                      |
| `app-demo/components/home-experience/corrected/orientation-state.mjs`       | small deterministic state machine                    | reuse only if a V1 explorer is approved                                     |
| `app-demo/components/home-experience/corrected/orientation-state.test.mjs`  | useful behavioral tests                              | expected behavior must be rewritten with the future contract                |
| `app-demo/lib/asset.ts`                                                     | single asset-prefix source                           | replace/adapt for CMS media and production host portability                 |
| `app-demo/next.config.mjs`                                                  | concise strict/static config                         | headless target needs non-static CMS/cache/preview capabilities             |
| `app-demo/package-lock.json`                                                | reproducible dependency graph                        | update deliberately as architecture evolves                                 |
| `app-demo/package.json`                                                     | lean stack and ordered verification                  | scripts/dependencies must expand only when authorized                       |
| `app-demo/scripts/check-release-surface.mjs`                                | strong guard concept                                 | six-route H7 allowlist is deprecated and must be regenerated from V1 IA     |
| `app-demo/scripts/check-tokens.mjs`                                         | catches Tailwind v4 orphan tokens                    | token families and source paths will change                                 |
| `app-demo/styles/interface.css`                                             | focused fields/notices and reduced-motion handling   | selectors must follow actual V1 consumers/system                            |

## REBUILD

| File                                                                        | Engineering assessment                | V1 design relevance / reason                                              |
| --------------------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------------------- |
| `DESIGN.md`                                                                 | documents current implementation      | explicitly deprecated as V1 design authority                              |
| `app-demo/app/dich-vu/page.tsx`                                             | semantic server page                  | V1 services IA/copy/morphology are new work                               |
| `app-demo/app/gioi-thieu/page.tsx`                                          | semantic server page                  | brand story and evidence structure must be re-authored                    |
| `app-demo/app/lien-he/page.tsx`                                             | truthfully avoids fake destinations   | V1 includes verified Zalo/Facebook/phone handoff and new conversion model |
| `app-demo/app/not-found.tsx`                                                | functional 404                        | rebuild in the future V1 system                                           |
| `app-demo/app/opengraph-image.tsx`                                          | deterministic OG generation           | contains H7 palette/type/copy and a placeholder lettermark                |
| `app-demo/app/page.tsx`                                                     | clear section composition             | H7 homepage order/narrative has zero preservation obligation              |
| `app-demo/app/quy-trinh-tri-lieu/page.tsx`                                  | semantic server page                  | route/job may change under V1 IA                                          |
| `app-demo/app/tin-tuc/page.tsx`                                             | safe empty state                      | WordPress editorial surface and route model require rebuild               |
| `app-demo/components/SiteFooter.tsx`                                        | semantic and accessible links         | navigation/copy/conversion/visual system are H7-specific                  |
| `app-demo/components/SiteHeader.tsx`                                        | accessible mobile menu foundation     | navigation architecture and morphology are not V1 authority               |
| `app-demo/components/home-experience/HomeHero.tsx`                          | semantic H1/anchor                    | hero copy/layout are H7-specific                                          |
| `app-demo/components/home-experience/corrected/ContinueUnderstanding.tsx`   | clear safety copy                     | current journey and section order are deprecated                          |
| `app-demo/components/home-experience/corrected/HumanContactHandoff.tsx`     | avoids invented URLs                  | component must support three verified channels and analytics later        |
| `app-demo/components/home-experience/corrected/OpeningQuestion.tsx`         | semantic orientation intro            | orientation premise is not approved V1 IA                                 |
| `app-demo/components/home-experience/corrected/ServiceScope.tsx`            | safe hardcoded categories             | service domain/content requires verified V1 model                         |
| `app-demo/components/home-experience/corrected/VisitProcessExplanation.tsx` | safe question framing                 | operational facts and page morphology require new authority               |
| `app-demo/styles/home-humanizer.css`                                        | carefully authored responsive CSS     | 788-line H7 composition/visual language is deprecated                     |
| `app-demo/styles/information.css`                                           | coherent editorial styles             | H7 page morphology and type roles are deprecated                          |
| `app-demo/styles/motion.css`                                                | reduced-motion-aware CSS              | H7 motion language does not define V1 motion grammar                      |
| `app-demo/styles/skins.css`                                                 | technically effective token overrides | all H7 skins/palette roles are provisional or deprecated                  |
| `app-demo/styles/tokens.css`                                                | centralized token discipline          | current token values/names do not become V1 design truth                  |
| `app-demo/styles/typography.css`                                            | responsive type rules                 | H7 typography system is explicitly non-authoritative                      |

## DELETE-CANDIDATE

| File                                                                    | Engineering assessment                             | V1 design relevance / reason                                                |
| ----------------------------------------------------------------------- | -------------------------------------------------- | --------------------------------------------------------------------------- |
| `app-demo/app/icon.svg`                                                 | tiny placeholder lettermark                        | not a verified Toplink logo; retain until later asset replacement is proven |
| `app-demo/components/home-experience/corrected/NarrativeCompletion.tsx` | thin H7-only composition wrapper                   | likely disappears when homepage morphology is rebuilt                       |
| `app-demo/styles/components.css`                                        | legacy ornamental/component styles                 | future consumers/system must be verified before removal                     |
| `app-demo/styles/home-experience.css`                                   | legacy hero/background treatment                   | current source has no media consumer and V1 hero is new work                |
| `app-demo/styles/utilities.css`                                         | contains generic legacy effect utilities/keyframes | usage and replacement proof required before any deletion                    |

## Deletion lock

No entry above authorizes deletion, renaming, dependency removal or tree restructuring. A later phase
may delete a candidate only after consumer search, runtime/build evidence, rollback review and explicit
phase authority.
