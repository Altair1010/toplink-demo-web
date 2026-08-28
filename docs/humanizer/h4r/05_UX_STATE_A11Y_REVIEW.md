# 05 — UX, State and Accessibility Review

## UX and trust result

No hard fail remains. The prototype does not diagnose, interpret a phrase into a condition, match a service, fabricate evidence, submit data or claim confirmation. A selected phrase is explicitly not analyzed and does not alter a service result.

The first independent UX review found that downstream specimen controls could be invoked before their prerequisites. The correction added reducer guards, disabled downstream controls until eligible, exact tab-local retention wording, phrase-specific remove labels and an explicitly internal failure control. Two new regression tests first failed against the old reducer and pass against the corrected graph.

## Consequence hierarchy

Source and visual order are:

```text
CONSEQUENCE RESPONSE
        ↓
CURRENT STATE AND WHAT IS NOT SENT
        ↓
EDIT / UNCERTAIN / RECOVER
        ↓
CONTINUE LOCALLY
```

At 1280 px, the automated browser measurement observed a consequence response area of approximately `535,955 px²` versus `85,771 px²` for the action rail. The response heading measured `64 px` and the action text `18 px`; the response precedes actions in DOM order.

## Browser-observed matrix

| Check                                                           | Result    |
| --------------------------------------------------------------- | --------- |
| 375 / 768 / 1280 / 1440, no horizontal overflow                 | PASS      |
| 200%-equivalent reflow at 384 CSS px, descendant bounds checked | PASS      |
| Keyboard path and visible focus                                 | PASS      |
| Focus moves to the next semantic heading                        | PASS      |
| Edit and phrase-specific remove                                 | PASS      |
| Uncertainty path                                                | PASS      |
| Local-only consequence                                          | PASS      |
| Failure → retry specimen                                        | PASS      |
| Invalid state transitions blocked                               | PASS      |
| Reduced-motion information parity                               | PASS      |
| Vietnamese diacritics and long labels                           | PASS      |
| Knowledge disclosure                                            | PASS      |
| Evidence collapse                                               | PASS      |
| Mutating network requests                                       | `0`       |
| Console errors in verification run                              | `0`       |
| Failed requests / responses                                     | `0 / 0`   |
| Focus-indicator contrast on dark boundary                       | `16.02:1` |

The test does not claim browser-chrome zoom automation or real screen-reader spoken-output validation. A 768 px viewport at 200% was represented by the equivalent 384 CSS px reflow and every descendant bound was checked after removing overflow clipping. DOM semantics, keyboard behavior and visual focus were checked; Narrator Speech Recap evidence was not part of H4R.

## Residual UX limits

- Populated real-evidence integration is untested.
- The no-evidence visual tone remains cooler and more administrative than the target ideal.
- The failure state is an internal specimen, not a real transport failure; H4R creates no network operation.
- The internal failure trigger remains visible in normal prototype mode, although it is labelled and removed from blind mode; a later harness should separate it completely.
- Production consent, recipient, retention, deletion, security and transport remain out of scope and blocked.
