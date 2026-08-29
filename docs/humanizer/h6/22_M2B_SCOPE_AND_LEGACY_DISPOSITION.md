# 22 — M2B Scope and Legacy Disposition

## Decision

- **Authority:** `DEC-H6-CONSOLIDATED-01 / C4 — M2B`
- **Baseline:** `c0caceb51437dcb78215106186d98a9f0594eab8`
- **Predecessor:** M2A1 PASS
- **Production evidence count:** `0`
- **Reviewed Toplink learning destination:** `0`

## Exact mutation

Modified:

- `app-demo/app/page.tsx`;
- `app-demo/styles/home-humanizer.css`.

Created:

- `NarrativeCompletion.tsx`;
- `ServiceScope.tsx`;
- `VisitProcessExplanation.tsx`;
- `ContinueUnderstanding.tsx`;
- `EvidenceAnswer.tsx`;
- `evidence-visibility.mjs`;
- `evidence-visibility.d.mts`;
- `evidence-visibility.test.mjs`.

`app-demo/data/content.ts` was read and remains unmodified. Its service duration/price/suitability,
mock process, post authors and article claims are not imported into M2B.

## Legacy disposition

| Legacy section   | Disposition                    | Replacement / reason                                                                            |
| ---------------- | ------------------------------ | ----------------------------------------------------------------------------------------------- |
| `HomeHero`       | RETAIN TEMPORARILY             | remains current opening context; truth sanitation belongs to M3S-2                              |
| `RitualTimeline` | REMOVE FROM REACHABLE HOMEPAGE | replaced by truthful process expectation boundary; mock sequence not repeated                   |
| `SpaceAsTherapy` | REMOVE FROM REACHABLE HOMEPAGE | unverified place qualities and four-card shell have no safe M2B job                             |
| `HomeFinalCTA`   | REMOVE FROM REACHABLE HOMEPAGE | removes mock branch/contact and conversion pressure; replaced by local orientation continuation |

Source files are retained. M5 owns deletion after exact zero-consumer and rollback-dependency proof.

## Service scope boundary

M2B explains only the approved brand-level meaning of four structural categories: Lý liệu / thao
tác chăm sóc, dược liệu, dưỡng liệu and thiết bị hỗ trợ. It explicitly states that the index is not
a complete menu and does not publish duration, price, outcome or individual suitability.

## Visit/process boundary

No literal operational sequence is published. The component states that a verified operating source
is absent, rejects the existing mock four-step sequence, and gives only the questions a real process
must answer: receiving owner/data need, performer/scope/stop condition and actual aftercare.

## Rollback

Revert the C4 commit to restore the M2A1 homepage graph. Do not restore the three removed legacy jobs
as a safety fallback if their claims remain unreviewed; M2A1 plus a collapsed narrative is the safer
release recovery.
