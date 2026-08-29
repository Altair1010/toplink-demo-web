---
name: humanizer-release-verifier
description: Final Humanizer release gate. Use after implementation to run repository verification, task/state browser checks, accessibility, runtime/performance inspection, visual review and the Humanizer marking rubric.
---

# Humanizer Release Verifier

## Required evidence
1. repo `npm run verify` result;
2. Playwright CLI critical paths + states;
3. viewport 375/768/1280/1440;
4. keyboard + 200% zoom + reduced motion;
5. pinned Web Interface Guidelines review;
6. Chrome DevTools runtime/performance check when visual assets/motion changed;
7. Humanizer rubric score with evidence;
8. unresolved P0/P1 list.

## Tool priority
- Playwright CLI + installed skills for routine browser work.
- Chrome DevTools MCP for performance/network/console/runtime diagnostics.
- Playwright MCP only if persistent/exploratory browser state is materially useful.

## Release language
Never say “verified”, “production-ready” or “pass” unless corresponding commands/checks actually ran. Automated accessibility checks do not replace manual keyboard/focus review.

## Required knowledge load
- `FOUNDATION/12_TRUST_HEALTH_SAFETY.md`
- `FOUNDATION/15_VERIFICATION_PROTOCOL.md`
- `FOUNDATION/16_HUMANIZER_SCORECARD.md`
- `CORE/03_HUMANIZER_MARKING_RUBRIC.md`
