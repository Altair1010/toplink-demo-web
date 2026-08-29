# 20 — M2A1 Visual and UX Verification

## Browser matrix

| Check                                        | Result                                             |
| -------------------------------------------- | -------------------------------------------------- |
| 375 / 768 / 1280 / 1440                      | PASS; horizontal overflow `0`                      |
| 200%-equivalent at 720 CSS px                | PASS; horizontal overflow `0`                      |
| Computed opening font                        | Be Vietnam Pro; `40px / 43.2px` at 375             |
| Minimum measured initial target              | `60px`; action CSS floor `44px`                    |
| Keyboard select / textarea / review / remove | PASS                                               |
| Focus after REVIEW / STOPPED                 | PASS                                               |
| Reduced motion                               | PASS; transition `0.01ms`, all information visible |
| Mutating requests through state flow         | `0`                                                |
| Unexpected console errors / warnings         | `0 / 0`                                            |
| Tắc/Hàn/Hư/Loạn in corrected DOM             | `0`                                                |

The first state review found the focused review heading could be obscured by the sticky mobile
header. The bounded correction adds a `7rem` scroll margin to REVIEW/STOPPED focus targets. Re-run
measured the focused heading top at `444px` against header bottom `65px`.

## Interaction paths verified

- keyboard activation sets `aria-pressed=true`;
- textarea Tab order reaches `Xem lại câu này` then `Bỏ lựa chọn`;
- 241 Vietnamese characters remain untruncated and produce the 240-character recovery message;
- custom wording survives REVIEW unchanged;
- “Tôi chưa biết” remains a valid review result without service choice;
- edit returns to the same wording;
- remove returns to IDLE;
- stop removes the wording from the DOM and focuses the stopping-state heading.

## Composition review

```text
ARRIVAL       large offset question + contextual answer
ORIENTATION   ruled choice index + writing field
BOUNDARY      unboxed asymmetric text relation
REVIEW        quiet reading field
CONSEQUENCE   single grounded dark field with controls downstream
```

The jobs remain visually unequal on mobile and desktop. The corrected surface contains no three-card
grid, repeated Q/A shell, dashboard chrome, archive/paper metaphor, red/gold prestige field,
wellness gradient or decorative motion.

## Sen structural review

**PASS.** Orientation precedes service and conversion, uncertainty is reduced before any action,
and the consequence stays downstream. Sen supplied only relationship order. No Sen palette, type,
copy, image, motif or geometry entered the implementation.

## Screenshots

Stored under `docs/humanizer/h6/screenshots/m2a1/`:

- initial homepage: 375, 768, 1280, 1440 and 200%-equivalent;
- uncertain REVIEW: 375 and 1280.

These captures cover the static arrival and the deepest reachable production state without adding
redundant captures for edit/remove paths whose correctness is asserted directly.
