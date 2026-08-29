# 31 — H6 Final Verification

## Verdict

**Static/runtime mechanics PASS; H6 release gate PARTIAL.** Known route truth, hierarchy and public
specimen debt prevents H7 eligibility.

## Static gate

- `npm run verify`: PASS;
- Next production export: PASS, 34 generated pages;
- TypeScript: PASS;
- Prettier: PASS;
- token checker: PASS, 35 color tokens and 0 orphan classes;
- `git diff --check`: PASS;
- corrected state tests: 14/14 PASS.

## Browser matrix

- route families: 16 representative public paths at 375 and 1280;
- homepage: 375, 768, 720 (200%-equivalent), 1280, 1440;
- HTTP failures: 0;
- page horizontal-scroll failures after service-table correction: 0;
- unexpected console errors: 0;
- mutating requests: 0;
- homepage evidence nodes: 0;
- corrected homepage targets below 44×44: 0.

## Skins and motion

- `yvien`, `tet`, `an-tinh`: retained and computed distinctly;
- reduced-motion media query: active in test;
- homepage fade and decorative leaf animation: `none` under reduced motion.

## Accessibility

- homepage skip link receives first keyboard focus;
- homepage heading order: `h1 → h2 → h2 → h2 → h2`;
- contact and knowledge boundaries: `h1 → h2`;
- booking local review is keyboard reachable and has no transport control;
- whole-site result: **FAIL / H6 BLOCKING DEBT** because eight legacy route families lack `h1` and
  unreviewed legacy pages have not received a full semantic/contrast audit.

## Responsive

**PASS for tested mechanics.** The service table retains its own horizontal scroller without
scrolling the page. Corrected homepage has no small target or reflow failure at all required widths.

## Trust/design hard-fail review

- newly added diagnosis/taxonomy/service prescription/evidence/booking success: 0;
- existing unverified service, health, place, process and commercial route claims remain: FAIL;
- public `/motion-lab*` specimen/dev controls remain: FAIL;
- legacy red/gold prestige hero, stock visual and repeated service card grid remain: FAIL;
- reference firewall: PASS;
- Caregiver/Sage/Guide behavior: PASS on corrected homepage; FAIL whole-site.

## Scores

- homepage rubric estimate: **74/100** (hard visual-materiality fail prevents release pass);
- booking rubric estimate: **55/100** (fail-closed transport passes; mock matching/facts hard fail);
- route-family coverage: **124/288 = 43%**;
- whole-site Humanizer rubric estimate: **58/100 with hard-fail override**;
- scorecard: **25/60**, branded-but-generic band, hard-fail override active.

These are source/browser audit estimates, not user-test measurements.

## Evidence set

- `screenshots/final/homepage-desktop-1440.png`;
- `screenshots/final/homepage-mobile-375.png`;
- `screenshots/final/homepage-200-equivalent-720.png`;
- `screenshots/final/booking-review-1280.png`;
- `screenshots/final/service-family-1280.png`;
- `screenshots/final/contact-boundary-1280.png`;
- `screenshots/final/knowledge-boundary-1280.png`.
