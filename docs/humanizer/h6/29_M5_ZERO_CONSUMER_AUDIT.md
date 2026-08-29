# 29 — M5 Zero-consumer Audit

## Policy

Deletion requires all three counts to equal zero:

1. production runtime consumer;
2. test consumer;
3. rollback dependency.

Textual imports inside a closed unreachable graph do not create a runtime consumer, but every
member of that graph must be removed in the same bounded cleanup. M2A0's
`StaticOrientationShell`—not the pre-M2A0 symptom/recommendation graph—is the rollback floor.

## M5A — old homepage cleanup

### Delete eligible

The following closed graph has no route/root import, no test import and no rollback dependency:

- `BodyMap.tsx`;
- `BodySignalInterface.tsx`;
- `BodyStatePanel.tsx`;
- `FourBodyStates.tsx`;
- `HomeExperience.tsx`;
- `HomeFinalCTA.tsx`;
- `RecommendationDrawer.tsx`;
- `RitualTimeline.tsx`;
- `SpaceAsTherapy.tsx`;
- `lib/recommendation.ts`.

Post-delete search returns zero references for the removed components and recommendation helpers.
The 14 corrected orientation/evidence state tests and the full 34-page production build pass.

### Retain

- `HomeHero.tsx`: two live consumers in `app/page.tsx` (import and render);
- `StaticOrientationShell.tsx`: named M2A0 rollback dependency;
- corrected M2A1/M2B components and state helpers: live homepage/test consumers;
- `styles/home-experience.css` and `data/content.ts`: audited separately at M5C selector/export
  granularity rather than deleted as files.

**M5A status: IMPLEMENTED / VERIFIED.**

## M5B — Noto retirement

Fresh count after M5A: **10 exact reference sites across 6 files**:

- load/variable sites in `app/layout.tsx`;
- live `font-serif-display` consumers in `HomeHero`, `HealingProcessMotion` and
  `YVienSpaceExperience`;
- font aliases/class in `styles/tokens.css` and `styles/typography.css`.

Count is greater than zero. Noto remains a runtime compatibility dependency and is not an official
brand-font claim.

**M5B status: DEFERRED / NOT ELIGIBLE.**

## M5C — token, skin and material cleanup

Exact zero-consumer material removed in the isolated M5C checkpoint:

- source-only `ReviewWall`, `BlogIndex`, `ImgFade`, `FloatingZalo`, `FaqAccordion` and
  `StatCounter`;
- demo exports `CONTACT`, `BRANCHES`, `TEAM`, `STATS` and `FAQS`;
- old body-state/drawer motion selectors, FAQ width helper and Zalo pulse/shadow selectors/tokens.

All three skins have live variable override graphs and remain retained:

- `:root[data-brand="yvien"]` (default);
- `:root[data-brand="tet"]`;
- `:root[data-brand="an-tinh"]`.

The related old body-state/drawer motion selectors, FAQ width helper and Zalo pulse/shadow
selectors/tokens are removed. Post-delete symbol search returns zero; the token checker reports 35
color tokens and zero orphan classes. The full production build and all 14 corrected-state tests
pass.

No other token, selector, skin or primitive has deletion authority without consumer and skin proof.

**M5C status: ELIGIBLE ZERO-CONSUMER MATERIAL IMPLEMENTED / VERIFIED; REMAINDER DEFERRED.**
