# Verification Protocol

## Existing substrate

Toplink repo currently has `npm run verify` for build → typecheck → format check → token check, plus manual viewport/reduced-motion/keyboard/zoom/console review.  
**Nguồn:** [Toplink AGENTS.md](https://github.com/Altair1010/toplink-demo-web/blob/main/AGENTS.md)

## Humanizer verification adds

### V1 — Specificity
Can this section belong unchanged to another wellness brand?

### V2 — Evidence
Does every major trust claim have person/place/process evidence?

### V3 — Content comprehension
Can a non-specialist explain the main meaning after one read?

Plain-language health guidance emphasizes familiar wording and clear, concise content.  
**Nguồn:** [Health Literacy Online](https://odphp.health.gov/healthliteracyonline/full/)  
**Nguồn:** [NHS content standard](https://service-manual.nhs.uk/content/standard-for-creating-health-content)

### V4 — State completeness
Loading/empty/error/uncertain/success/recovery.

### V5 — Visual regression
Playwright supports screenshot baselines and subsequent visual comparison via `toHaveScreenshot()`.  
**Nguồn:** [Playwright — Visual comparisons](https://playwright.dev/docs/next/test-snapshots)

### V6 — Component edge states
Storybook stories can capture isolated UI states and support interaction, visual and accessibility testing workflows.  
**Nguồn:** [Storybook — Why Storybook](https://storybook.js.org/docs/get-started/why-storybook)  
**Nguồn:** [Storybook — UI testing](https://storybook.js.org/docs/8/writing-tests)

### V7 — Accessibility
Playwright documents integration with axe and explicitly notes automated testing does not find all accessibility issues, so manual/inclusive testing remains necessary.  
**Nguồn:** [Playwright — Accessibility testing](https://playwright.dev/docs/accessibility-testing)

### V8 — Motion safety
Reduced-motion and no essential information hidden behind animation.  
**Nguồn:** [W3C — Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)

## Minimum viewport matrix
- 375
- 768
- 1280
- 1440
- 200% zoom
- keyboard only
- reduced motion
