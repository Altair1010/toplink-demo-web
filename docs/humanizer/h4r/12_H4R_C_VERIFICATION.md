# 12 — H4R-C Verification

## Automated and repository checks

| Check                                                              | Result     |
| ------------------------------------------------------------------ | ---------- |
| prototype mode tests                                               | PASS — 3/3 |
| state reducer tests                                                | PASS — 8/8 |
| `npm run verify`                                                   | PASS       |
| `git diff --check`                                                 | PASS       |
| unexpected state/submit network mutations                          | 0          |
| unexpected browser console errors in clean capture/runtime session | 0          |

## Browser matrix

| Check                                | Result                                                  |
| ------------------------------------ | ------------------------------------------------------- |
| 375 / 768 / 1280 / 1440              | PASS; no horizontal overflow or broken reading order    |
| 200%-equivalent reflow at 384 CSS px | PASS; document/prototype width 384, no offenders        |
| keyboard and visible focus           | PASS                                                    |
| edit and remove phrase               | PASS                                                    |
| uncertainty route                    | PASS                                                    |
| bounded learning route               | PASS                                                    |
| local-only consequence               | PASS                                                    |
| failure/retry specimen               | PASS; internal explicit test mode only                  |
| reduced motion                       | PASS; equivalent content remains immediately visible    |
| Vietnamese wrapping/diacritics       | PASS                                                    |
| evidence collapse                    | PASS; `collapsed-unavailable`, 0 images, 0 placeholders |
| blind identity leakage               | PASS; brand and internal controls absent                |

The consequence response precedes actions in DOM and visual order. In the measured 375px review state, its response area was approximately `469,060 px²` versus `59,429 px²` for actions, with a `64px` dominant state heading versus `18px` action text.

Boundary focus contrast measured `16.31:1`. Reduced-motion capture reported three visible exchanges and effectively immediate transition timing. Normal browser requests contained no mutating state/submit operation.

## Capture integrity

Ten required captures were regenerated from the final source in a clean Playwright session. The capture helper hides browser/dev chrome with injected CSS after the prototype is ready; it does not remove hydration-owned DOM. Final capture session reported zero console errors.

No evidence screenshots 11–12 were created because no approved specimen exists. Creating them would fabricate the test condition.

## Bounded limitations

- The reflow check is a 200%-equivalent CSS viewport check, not a claim of operating browser chrome zoom.
- No spoken screen-reader result is claimed.
- No user-test or production uplift is claimed.
- The populated evidence treatment remains untested by design.
