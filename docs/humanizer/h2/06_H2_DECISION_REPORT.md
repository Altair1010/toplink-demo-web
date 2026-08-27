# 06 — H2 Decision Report

**H2 result:** `PASS — PROVISIONAL / READY FOR HUMAN REVIEW`

This pass means the authorized architecture exists with explicit dependencies and no source mutation. It does **not** close H0/H1 gaps or authorize implementation.

## Approved Runtime Fact

| ID | Fact | H2 consequence |
| --- | --- | --- |
| RF-01 | Repository is a static demo with mock static content. | UI claims are not Toplink business facts. |
| RF-02 | Current homepage is hero → Body Signal → ritual → space → final CTA. | H2 begins from questions, not inherited section order. |
| RF-03 | Service/detail, about, space, process, booking, contact, and news/FAQ-adjacent routes exist. | H2 assigns roles without renaming/deleting. |
| RF-04 | Booking can show success while no request is transmitted. | future confirmation requires transport and handoff truth. |
| RF-05 | Place/team/review/contact/service proof is unverified; some space assets are another brand. | all real-world proof remains a dependency slot. |

## Proposed H2 Decision

| ID | Decision | Reason / alternatives | Status |
| --- | --- | --- | --- |
| H2-01 | Homepage sequence: `ORIENT → RELATE → EXPLAIN SAFELY → VERIFY TRUST → EXPLORE PATHS → REDUCE VISIT UNCERTAINTY → DECIDE → CONTINUE`. | maps all H1 jobs without an encyclopedia | `PROPOSED` |
| H2-02 | J-01/J-02/J-04 primary homepage; J-03 secondary homepage; J-05 dedicated route; J-06 supporting knowledge. | current task hypotheses, not persona/demand proof | `PROPOSED` |
| H2-03 | Body Signal disposition B: reduced/reframed guided orientation. | preserves question; removes unsupported symptom→state→service conclusion; A rejected, C deferred, D not preferred | `PROPOSED` |
| H2-04 | Place, people, scope, process, contact, booking proof go to dedicated pages; homepage uses only verified preview. | adapts Sen’s relationship grammar, not its visual execution | `PROPOSED` |
| H2-05 | Booking uses true confirmation plus error/retry/uncertainty/handoff states. | simulated success cannot satisfy J-05 | `PROPOSED` |
| H2-06 | Homepage/service/FAQ use compact plain-language bridges; long knowledge waits for reviewed surfaces. | uses Triều grammar without importing its scope/claims | `PROPOSED` |

## Unvalidated Assumption

| ID | Assumption | Needed validation |
| --- | --- | --- |
| UA-01 | J-01/J-02 are highest-value homepage entries. | attributed enquiry/staff language and task research |
| UA-02 | guided orientation is better than direct catalogue for uncertainty. | comprehension/task testing after ED-02/05/06 |
| UA-03 | process preview reduces hesitation. | verified workflow plus visitor/staff language |
| UA-04 | place/people proof belongs before deeper service exploration. | evidence collection and human/task review |
| UA-05 | FAQ is continuation, not a homepage library. | editorial operation and user-question evidence |

## Missing Evidence

P0: ED-01 identity/channels; ED-02 health-content review; ED-03 place; ED-04 people/roles; ED-05 service register; ED-06 booking operation.

P1: ED-07 process account; ED-08 documentary craft evidence.

P2: ED-09 FAQ/knowledge provenance.

## Deprecated Idea

| Idea | Status | Reason |
| --- | --- | --- |
| Treat mock services/contact/people/reviews/space/process as verified proof | `DEPRECATED` | H0/H1 rejects their evidence basis |
| Keep Body Signal as authoritative state/service recommender | `DEPRECATED` as implied target | missing source/review/limit/escalation; diagnosis risk |
| Solve genericity with visual novelty or generic premium sections | `DEPRECATED` | H2 corrects information/evidence relationships; visual direction is H3 |
| Turn homepage into a Triều-style knowledge library | `DEPRECATED` | reference contributes grammar, not product scope |

## Exit criteria audit

| Criterion | Result | Artifact |
| --- | --- | --- |
| H1 jobs have destinations | `PASS` | 02 |
| Explicit homepage narrative | `PASS` | 03 |
| Job/question/evidence section contracts | `PASS` | 04 |
| Missing proof is a dependency, not fiction | `PASS` | 01, 04 |
| Body Signal disposition | `PASS` | 03 |
| Desktop/mobile grayscale | `PASS` | 03 |
| CTA consequences and booking edge states | `PASS` | 05 |
| Reference lanes constrained; no visual decision locked | `PASS` | 01–04 |
| No app code/tokens changed | `PASS` | final scope inspection found only H2 documentation and `HUMANIZER.md` |

## Next gate

**HUMAN REVIEW OF NARRATIVE ARCHITECTURE → then H3 — THREE ART DIRECTIONS.**

H0/H1 remain `PARTIAL — EXTERNAL EVIDENCE REQUIRED`. A later Human Gate must approve direction and a separate mutation approval must authorize any runtime delta.
