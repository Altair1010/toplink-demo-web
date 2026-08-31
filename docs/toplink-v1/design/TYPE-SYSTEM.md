# Direction C Type System

**Status:** LOCKED FOR P4. Font binaries are not vendored in P3B.

## Families and provenance

- **Display:** Alegreya, weights 500 and 600, SIL Open Font License 1.1; source: Google Fonts / upstream
  Huerta Tipográfica distribution. Role: gateway and chapter voice, never faux-calligraphy.
- **Body and utility:** IBM Plex Sans, weights 400, 500 and 600, SIL Open Font License 1.1; source:
  Google Fonts / IBM Plex upstream. Role: body, navigation, metadata, controls and evidence.
- **Fallbacks:** `Georgia, serif` for display; `system-ui, sans-serif` for body.

P4 must use an official/licensed source and preserve Vietnamese subsets. No proprietary or unverified
font binary may be committed.

## Scale and posture

| Role | Token | Size | Line height | Weight |
|---|---|---|---|---|
| Gateway display | `--type-display-hero` | `clamp(3rem, 7vw, 7.25rem)` | 0.96 | 500 |
| Page display | `--type-display-page` | `clamp(2.75rem, 6vw, 5.75rem)` | 0.98 | 500 |
| Chapter heading | `--type-heading-1` | `clamp(2rem, 4vw, 4.25rem)` | 1.02 | 500 |
| Chamber heading | `--type-heading-2` | `clamp(1.5rem, 2.4vw, 2.5rem)` | 1.12 | 500/600 |
| Lead | `--type-body-lg` | `clamp(1.0625rem, 0.95rem + 0.45vw, 1.25rem)` | 1.6 | 400 |
| Body | `--type-body` | `1rem` | 1.65 | 400 |
| Utility | `--type-utility` | `0.9375rem` | 1.45 | 500 |
| Note | `--type-note` | `0.875rem` | 1.5 | 400/500 |

## Rules

- Vietnamese headings remain sentence case. Uppercase is limited to short metadata labels of at most
  four words with `0.08em` tracking.
- Body copy never drops below 16px; critical cautions use body size or larger.
- Long-form text is capped at 44rem / roughly 65–75 characters per line.
- Emphasis uses weight before color. Avoid long italic passages and all-caps Vietnamese.
- Dates use day–month–year in readable text; tabular numerals are reserved for metadata lists.
- Ordered sequence numerals must communicate actual order; decorative numbering is forbidden.
- At 375px, no display line may force horizontal overflow or reduce body size.
