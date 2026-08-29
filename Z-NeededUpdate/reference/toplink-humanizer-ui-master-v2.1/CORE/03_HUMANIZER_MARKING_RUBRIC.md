# Humanizer Marking Rubric — 100 points

> **Important:** baseline/projected values below are expert scenario estimates derived from current source inspection. They are not user-test measurements and must not be reported as empirical improvement percentages.

## Weighting

| Domain | Weight |
|---|---:|
| UI Design | 35 |
| UX Design | 35 |
| Humanity / Trust / Content | 20 |
| Engineering / Design Ops | 10 |

Health-information research supports giving substantial weight to navigability, aesthetics and comprehensibility because they materially affect perceived information quality/trust cues.  
**Nguồn:** [JMIR 2022 meta-analysis](https://www.jmir.org/2022/4/e36463/)  
**Nguồn:** [JMIR 2017 trust review](https://www.jmir.org/2017/6/e218/)

## A. UI Design — 35

| Criterion | Weight | Baseline | Full Humanizer scenario |
|---|---:|---:|---:|
| Art-direction distinctiveness | 8 | 4.5 | 7.0 |
| Visual hierarchy / editorial composition | 8 | 4.5 | 7.0 |
| Typography quality | 5 | 4.2 | 4.5 |
| Imagery / materiality | 8 | 1.5 | 7.0 |
| Motion / visual rhythm | 6 | 3.8 | 5.2 |
| **UI total** | **35** | **18.5 / 52.9%** | **30.7 / 87.7%** |

Current DESIGN.md already has a coherent crimson/gold/wood/ivory palette, Noto Serif + Be Vietnam Pro, large readable type and explicit motion/layout rules; therefore typography/system consistency is not treated as the primary deficiency.  
**Nguồn:** [Toplink DESIGN.md](https://github.com/Altair1010/toplink-demo-web/blob/main/DESIGN.md)

Current `SpaceAsTherapy` expresses a space concept through four equal text frames rather than physical-space evidence, which supports the low current imagery/materiality score.  
**Nguồn:** [Toplink SpaceAsTherapy.tsx](https://github.com/Altair1010/toplink-demo-web/blob/main/app-demo/components/home-experience/SpaceAsTherapy.tsx)

**Scenario delta:** UI rubric attainment moves from 52.9% to 87.7%, equivalent to about +66% relative growth in this rubric score. This is a modeled scenario, not a measured website improvement.

## B. UX Design — 35

| Criterion | Weight | Baseline | Full Humanizer scenario |
|---|---:|---:|---:|
| IA / narrative orientation | 7 | 4.5 | 6.0 |
| Service discovery / task fit | 7 | 5.0 | 6.2 |
| States / recovery / edge cases | 7 | 4.2 | 6.0 |
| Booking / conversion consequence | 6 | 4.0 | 5.2 |
| Mobile / accessibility / legibility | 8 | 6.8 | 7.2 |
| **UX total** | **35** | **24.5 / 70.0%** | **30.6 / 87.4%** |

The current booking flow already includes a first-class “I don't know which service to choose” path and explicit callback language, so Humanizer should preserve and deepen this UX rather than rebuild it blindly.  
**Nguồn:** [Toplink BookingStepper.tsx](https://github.com/Altair1010/toplink-demo-web/blob/main/app-demo/components/BookingStepper.tsx)

The current demo also simulates successful submission when the Google Form is not configured and uses a timeout fallback; that behavior is acceptable as demo scaffolding but must not become production trust behavior.  
**Nguồn:** [Toplink BookingStepper.tsx](https://github.com/Altair1010/toplink-demo-web/blob/main/app-demo/components/BookingStepper.tsx)

**Scenario delta:** UX rubric attainment moves from 70.0% to 87.4%, about +25% relative growth in this rubric score.

## C. Humanity / Trust / Content — 20

| Criterion | Weight | Baseline | Full Humanizer scenario |
|---|---:|---:|---:|
| Human evidence | 6 | 1.5 | 5.2 |
| Professional specificity + plain language | 5 | 3.2 | 4.2 |
| Trust / provenance / scope | 5 | 2.8 | 4.2 |
| Interaction voice | 4 | 2.7 | 3.5 |
| **Total** | **20** | **10.2 / 51.0%** | **17.1 / 85.5%** |

Health Literacy Online recommends realistic, relevant imagery and plain language; trust literature also repeatedly identifies authority/ownership, clear layout and ease of use as credibility signals.  
**Nguồn:** [Health Literacy Online — images](https://odphp.health.gov/healthliteracyonline/display/section-3-8/)  
**Nguồn:** [JMIR trust review](https://www.jmir.org/2017/6/e218/)

## D. Engineering / Design Ops — 10

| Baseline | Full Humanizer scenario |
|---:|---:|
| 7.8 / 78% | 9.2 / 92% |

The baseline is already strong because the repo has a clear runtime source of truth, single advanced motion engine, reduced-motion rule, static-export constraints and a documented verification command.  
**Nguồn:** [Toplink AGENTS.md](https://github.com/Altair1010/toplink-demo-web/blob/main/AGENTS.md)

## Master scenario

- **Current source-audit estimate:** ~61 / 100.
- **Package merely copied into repo:** ~61 / 100; no UI changes occur by installing knowledge.
- **Pilot (evidence + approved direction + hero/evidence/booking prototype):** ~74–80 / 100 scenario band.
- **Full high-quality execution:** ~87–88 / 100 scenario target.

Final success must be measured with Toplink-specific task success, booking completion, uncertainty-resolution, usability observation and trust feedback; literature cannot supply Toplink's actual uplift.  
**Nguồn:** [JMIR 2022 meta-analysis](https://www.jmir.org/2022/4/e36463/)
