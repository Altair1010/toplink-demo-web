# 14 — M1C Runtime Type Map

## Classification

| Runtime surface              | Current behavior                                   | M1C classification                          | Consumer decision                                  |
| ---------------------------- | -------------------------------------------------- | ------------------------------------------- | -------------------------------------------------- |
| `layout.tsx` Be Vietnam Pro  | loaded as `--font-be-vietnam`, weights 400/500/600 | existing primitive                          | retain; digital workhorse, not official brand font |
| `layout.tsx` Noto Serif      | loaded as `--font-noto-serif`, weights 600/700     | retained compatibility                      | do not remove or expand in M1C                     |
| `--font-sans`                | Be Vietnam Pro → Segoe UI → system sans            | existing primitive                          | corrected M2A1/M2B subtree must use it             |
| global `h1/h2/.heading-font` | Noto display contract                              | retained legacy                             | no global rewrite; route debt remains visible      |
| `.hh-home-shell`             | local `var(--font-sans)` boundary                  | component local                             | reuse font family behavior in M2A1                 |
| M2A0 opening question        | sans 600, `43.2px` at 375, leading `0.99`          | component local / bounded replacement delta | M2A1 raises leading to `1.08` or more              |
| M2A0 boundary                | local sans hierarchy                               | component local                             | preserve sentence case and readable body behavior  |
| M2A0 consequence             | local sans hierarchy                               | component local                             | preserve consequence-before-action relation        |
| M2A1 controls/state          | not yet present                                    | documentation contract                      | implement inside M2A1 owners only                  |
| M2B narrative/evidence       | not yet present                                    | documentation contract                      | implement inside M2B owners only                   |

## Runtime delta

**M1C runtime source delta: `0`.**

No reusable class or custom property is added to `typography.css` because every currently justified
corrected consumer is owned by the bounded `home-humanizer.css` subtree, while M2A1/M2B have not yet
landed. Adding dormant role classes now would duplicate the existing local contract without an
active consumer. C3 and C4 must implement the role table directly and may extract a reusable API
only when two live consumers demonstrate identical behavior.

## Consumer graph

```text
Be Vietnam Pro next/font load
          |
          v
      --font-sans
          |
          +--> M2A0 local shell (current rollback floor)
          |
          +--> M2A1 corrected orientation (C3 named consumer)
          |
          `--> M2B corrected narrative (C4 named consumer)

Noto Serif load
          |
          `--> retained legacy routes / headings
               (not target authority; M5B requires fresh zero-consumer proof)
```

## Rollback

M1C changes documentation only. Rollback is the C1 documentation commit. No runtime rollback,
font reload, token reversal or route change is required.
