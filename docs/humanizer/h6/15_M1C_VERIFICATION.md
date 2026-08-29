# 15 — M1C Verification

## Result

**PASS — CONTRACT RESOLVED / RUNTIME NO-OP / VERIFIED**

## Source and authority checks

| Check                                                                    | Result              |
| ------------------------------------------------------------------------ | ------------------- |
| Required absolute brand profile resolved                                 | PASS                |
| Version read from front matter                                           | `Bản cải tiến 2026` |
| Caregiver / Sage / Guide behavior present                                | PASS                |
| Official font marked as requiring verification                           | PASS                |
| Official brand font claimed by M1C                                       | NO                  |
| Logo, digital hex, legal, contact, staff, device or service facts locked | NO                  |

## Runtime inspection

- `app-demo/styles/typography.css`, `styles/tokens.css` and `app/layout.tsx` were read before the
  decision.
- Be Vietnam Pro is already loaded with Vietnamese support at weights `400/500/600` and computes on
  the M2A0 opening question.
- Noto Serif remains loaded and consumed by legacy global typography. M1C does not retire it.
- The corrected M2A0 subtree contains no `font-display`, `font-serif-display`, `heading-font` or
  `--font-serif` consumer.
- M1C adds `0` runtime classes and `0` custom properties.

## Browser matrix

| Check                     | Result                                                 |
| ------------------------- | ------------------------------------------------------ |
| 375                       | PASS; computed Be Vietnam Pro; horizontal overflow `0` |
| 768                       | PASS; computed Be Vietnam Pro; horizontal overflow `0` |
| 1280                      | PASS; computed Be Vietnam Pro; horizontal overflow `0` |
| 1440                      | PASS; computed Be Vietnam Pro; horizontal overflow `0` |
| 200%-equivalent           | PASS; horizontal overflow `0`                          |
| Vietnamese wrapping       | PASS; no clipped diacritics observed                   |
| Heading order             | retained from verified M2A0; no C1 DOM change          |
| Console errors / warnings | `0 / 0` excluding development informational logs       |

At 375 CSS px the current M2A0 opening computes to `43.2px / 42.768px` (`line-height: 0.99`). The
text remains visible, but this is tighter than the calibrated contract. It is recorded as the first
M2A1 consumer delta; M1C does not mutate `home-humanizer.css` outside its authorized source scope.

## Static verification

Pre-mutation baseline `npm run verify` passed: production build, TypeScript, Prettier and token
checker all completed successfully. Because C1 is documentation-only, the final C1 check must
confirm formatting/diff integrity and that runtime files remain byte-unchanged.

## Adversarial review

- **Brand authority:** PASS; a runtime candidate is not promoted to an official brand asset.
- **Accessibility:** PASS with one bounded C3 leading correction recorded; no new regression.
- **Scope:** PASS; no global heading rewrite, font install, Noto removal or inner-page mutation.
- **Anti-prestige:** PASS; the target contract is sans-first and rejects heritage theatre.

## Gate consequence

M1C passes and permits C2 M0R-JIT. It does not itself authorize a palette change, global
typography rewrite, Noto retirement or M2A/M2B factual population.
