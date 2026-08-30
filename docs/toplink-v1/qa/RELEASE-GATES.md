# Release Gates

A release candidate must pass every applicable gate.

## 1. Truth & content

- [ ] No fake phone/Zalo/Facebook URLs.
- [ ] No `TBD`, lorem ipsum, demo/mock labels or placeholder claims in public output.
- [ ] No public prices or “contact for price”.
- [ ] Health claims follow the approved brand safety rules.
- [ ] Real testimonials have documented consent/context.
- [ ] Stock imagery does not impersonate Toplink people/premises/evidence.
- [ ] `Không gian` uses actual/authorized Toplink space assets if public.

## 2. Design/art direction

- [ ] New DESIGN.md is authoritative and matches runtime tokens.
- [ ] No repeated generic card-grid page scaffold without content reason.
- [ ] No generic AI-gradient/glass/pill/eyebrow decoration creep.
- [ ] Ornament density follows the constitution.
- [ ] Page archetypes vary structurally while staying coherent.
- [ ] Logo-removed blind identity review still reads as a specific brand world.

## 3. Interaction/motion

- [ ] Every major motion has a semantic purpose.
- [ ] No scroll hijacking.
- [ ] Reduced-motion reaches final readable state with no active decorative sequence.
- [ ] Mobile motion is simplified where continuous effects hurt usability/performance.

## 4. Accessibility

Target: WCAG 2.2 AA.

- [ ] Semantic heading hierarchy.
- [ ] Visible focus.
- [ ] Keyboard navigation.
- [ ] Touch targets.
- [ ] Contrast.
- [ ] 200% zoom/reflow.
- [ ] Alt text and meaningful media semantics.
- [ ] No essential information only on hover/motion.

## 5. Responsive/browser

- [ ] 375, 768, 1280, 1440 screenshots checked.
- [ ] Mobile Safari/Chrome representative checks.
- [ ] Current Chrome/Edge/Safari desktop checks where available.
- [ ] No horizontal overflow.

## 6. Engineering

- [ ] build pass.
- [ ] TypeScript pass.
- [ ] formatting/lint pass.
- [ ] design token checks pass.
- [ ] route/link checks pass.
- [ ] no dead public route from H7 assumptions.
- [ ] dependency audit shows no duplicate motion/UI stack.

## 7. Headless/CMS

- [ ] WordPress REST contract tests.
- [ ] draft remains private.
- [ ] publish/update/unpublish revalidation works.
- [ ] CMS secrets remain server-only.
- [ ] missing optional content collapses.
- [ ] Author cannot publish; Editor can.

## 8. SEO/analytics

- [ ] canonical/sitemap/robots.
- [ ] social metadata.
- [ ] schema validates and uses verified facts only.
- [ ] GA4/dataLayer outbound events verified.
- [ ] Search Console ownership ready/verified when domain is live.

## 9. Performance

- [ ] representative Core Web Vitals target “Good”.
- [ ] images appropriately sized/compressed.
- [ ] no unnecessary client-side rendering.
- [ ] third-party scripts are justified and deferred.
- [ ] motion does not create obvious long-task/jank regression.

## 10. Operations

- [ ] production host permits commercial use.
- [ ] WordPress HTTPS/admin hardening.
- [ ] backup configured and restore tested.
- [ ] rollback artifact/commit known.
- [ ] DNS cutover plan approved.

## Bounded review

After the first full inspection:

1. group issues by root cause;
2. fix in one batch;
3. run one confirmation pass;
4. continue only for remaining P0/P1 blockers.
