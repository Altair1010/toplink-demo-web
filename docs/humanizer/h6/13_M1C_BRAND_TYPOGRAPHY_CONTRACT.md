# 13 — M1C Brand Typography Contract

## Decision

- **Decision:** `DEC-H6-CONSOLIDATED-01 / C1 — M1C`
- **Baseline:** `7a52cedc19507a8a277105ef69cad23ce8352a28`
- **Brand source:**
  `F:\Codex\IMC Plan - Toplink Y Viện\docs Toplink\Ho-so-thuong-hieu-Y-Vien-Toplink-Cai-tien-2026.md`
- **Brand source version:** `Bản cải tiến 2026`
- **Official brand font:** `UNVERIFIED / NOT CLAIMED`
- **Digital workhorse:** Be Vietnam Pro, already loaded by runtime

The brand profile authorizes personality, audience, reading expectation and communication safety.
It explicitly leaves the official font, logo and digital color values awaiting identity-source
verification. M1C therefore calibrates behavior, not a permanent brand typeface.

## Brand translation

```text
CAREGIVER                         SAGE                         GUIDE
readable / warm / direct          calm hierarchy              question before action
no performative styling           no prestige theatre          consequence before CTA
                \                 |                 /
                 \                |                /
                  v               v               v
              SANS-FIRST VIETNAMESE READING SYSTEM
```

- **Caregiver:** generous leading, familiar sentence case, readable measure and no ornamental
  interruption.
- **Sage:** hierarchy comes from scale, weight, measure and spacing rather than serif prestige,
  all-caps or jargon.
- **Guide:** questions, limits and next consequences remain visibly related; actions never dominate
  the explanation they qualify.

Reject fashion typography, novelty with a Chinese-looking character, heritage-serif shortcuts,
over-tight leading, all-caps Vietnamese headings and oversized hero type without a user-task job.

## Type role graph

| Brand intent     | User job                                | Type role                      | Behavior                                                                                                                | Named runtime consumer                       |
| ---------------- | --------------------------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Guide            | find a safe starting point              | Opening / orientation question | sans 600; `clamp(2.5rem, 5.4vw, 5.4rem)`; leading `1.08`; tracking no tighter than `-0.035em`; `10–14ch`; sentence case | M2A1 `OpeningQuestion`                       |
| Sage             | recognize a new chapter                 | Primary section heading        | sans 600; `clamp(2.1rem, 4.4vw, 4.5rem)`; leading `1.12`; tracking `-0.025em`; `12–18ch`                                | M2B `ServiceScope`, `ContinueUnderstanding`  |
| Sage             | understand one bounded idea             | Explanatory heading            | sans 600; `clamp(1.5rem, 2.6vw, 2.5rem)`; leading `1.2`; tracking `-0.015em`; `18–28ch`                                 | M2B `VisitProcessExplanation`                |
| Caregiver        | read ordinary explanation               | Body                           | sans 400; `1.125rem` minimum on corrected surfaces; leading `1.65–1.75`; `45–65ch`                                      | all M2A1/M2B explanation copy                |
| Caregiver + Sage | notice one important sentence           | Body strong                    | sans 600; body size or one bounded step above; leading at least `1.55`; no color-only emphasis                          | summaries and consequence lead               |
| Sage             | understand a limit without alarm        | Boundary / caution             | sans 500–600; `1.125–1.35rem`; leading `1.6`; `32–52ch`; no uppercase                                                   | M2A1 `ClearBoundary`; M2B expectation limits |
| Sage             | scan supporting context                 | Utility / metadata             | sans 500; `0.875–1rem`; leading `1.45`; tracking at most `0.02em`; sentence case except very short labels               | selected-count and review metadata           |
| Guide            | take an explicit reversible step        | Action                         | sans 600; `1–1.125rem`; leading `1.3`; no all-caps; label states the consequence                                        | edit/remove/review/stop controls             |
| Caregiver        | understand why evidence is relevant     | Evidence caption               | sans 400–500; `0.9375–1rem`; leading `1.55`; `32–55ch`                                                                  | M2B `EvidenceAnswer` approved fixtures only  |
| Sage + Guide     | continue learning without a promise gap | Long-form learning             | sans 400; `1.125rem`; leading `1.75`; `55–70ch`; subheads 600                                                           | M2B reviewed learning continuation           |

## Responsive and Vietnamese rules

- Mobile reduces scale, not hierarchy; the smallest corrected body copy remains `18px`.
- At 200%, content reflows to one readable column with no clipped controls or horizontal scroll.
- Vietnamese diacritics require line boxes that do not collide; display leading below `1.05` is
  prohibited and the preferred opening minimum is `1.08`.
- Sentence case is the default. Uppercase is limited to very short navigation/eyebrow labels where
  reading remains clear.
- Be Vietnam Pro weights already loaded (`400/500/600`) are sufficient. M1C installs no font and
  adds no weight.

## Authority calibration

Warmth comes from familiar wording, readable spacing and respectful consequence copy. Authority
comes from a stable hierarchy and explicit limits. Neither role may be simulated with prestige
serif, extreme tracking, cramped leading or visual urgency.
