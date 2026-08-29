# M7 Quality Assurance Report

**Date:** 2026-08-13  
**Result:** PASS WITH PREVIEW-SURFACE LIMITATION

| Gate | Result | Evidence |
|---|---|---|
| Route/content accounting | PASS | 634/634 captured; 634 unique normalized records |
| Graph integrity | PASS | 634 Site Graph nodes; >39k observed edges |
| Task graph | PASS | Dependencies resolve; cycle detection PASS |
| Production build | PASS | Vinext Worker artifact and hosting manifest validated |
| Automated tests | PASS | 5/5 tests |
| Product routes | PASS | `/`, knowledge, lookup, care, package, baseline and deep baseline return HTML 200 |
| Reduced motion | PASS | Global `prefers-reduced-motion` contract |
| Keyboard semantics | PASS by code review | Native links, buttons, inputs, labels, tab roles and focus styles |
| Lint | PASS with warnings | No errors; warnings are unoptimized remote images and supplied-tool unused catches |
| Agent visual preview | PARTIAL | Preview service was healthy; browser navigation timed out twice. Prior G1 visual preview was successful, but final visual viewport is not claimed as inspected. |

## Known limitations

- No multi-viewport screenshot diff or automated WCAG scanner was available in the final preview surface.
- Remote images use source URLs and native `<img>` to preserve evidence references; production image proxy/optimization is a later performance enhancement.
- Field Core Web Vitals require a successful production URL and real traffic.

