# 04 — H7 Responsive, Accessibility and Browser Audit

## Matrix

All six public routes passed at 375, 768, 1280 and 1440 CSS pixels plus the validated 720-pixel
200%-equivalent reflow. Thirty route/viewport checks reported zero heading, hierarchy, overflow,
booking, form or landmark failure.

## Accessibility

- one meaningful `h1` per public page;
- logical heading sequence;
- skip link reaches `#main`;
- all visible interactive elements are keyboard reachable with visible focus;
- mobile menu exposes `aria-expanded` and a labeled navigation region;
- no focus trap;
- orientation edit/remove/uncertain/stop states remain reachable;
- visible text contrast passes automated WCAG ratio checks under `yvien`, `tet` and `an-tinh`;
- smallest incidental text links meet the 24px WCAG target baseline; primary controls remain at the
  established 44px target;
- reduced motion matches and reports 0 running animations.

Mobile Lighthouse on the current GitHub Pages surface scored 100 for Accessibility, Best
Practices, SEO and Agentic Browsing, with 52 passed and 0 failed audits. Automation supplements,
but does not replace, the keyboard and visual review above.

## Runtime

- unexpected console errors in fresh Next/runtime and live GitHub Pages sessions: 0;
- page errors: 0;
- unexpected mutating requests: 0;
- failed application GET/static-resource requests: 0.

A fresh nested-route navigation exposed Next.js 16's smooth-scroll declaration warning. H7 added
`data-scroll-behavior="smooth"` to the root document and the targeted navigation retest completed
without the warning.

Chrome emitted five speculative `HEAD` requests with `net::ERR_ABORTED` on the live homepage; they
returned no 4xx response, produced no console error and did not affect navigation. A minimal local
file server also lacked the route-data rewrite used by GitHub Pages and produced RSC-prefetch 404s;
the live configured host was checked independently and had zero console error.

## Performance sanity

An unthrottled DevTools trace on the live homepage observed LCP 159ms and CLS 0.00. No P0/P1 asset,
layout-shift, blocking-JS or image-sizing defect was found. This is a release sanity sample, not a
performance benchmark or field-user result.
