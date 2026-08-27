# 04 — Section Contracts and Evidence Dependencies

**Status:** `PROPOSED — READY FOR HUMAN REVIEW`

**Rule:** a section exists only to answer a named user question. A missing proof is an **EVIDENCE SLOT / DEPENDENCY**, never fabricated copy, people, place, process, contact, or outcome.

## Evidence dependency register

| ID | Current class | Supports | Minimum acceptance | Priority |
| --- | --- | --- | --- | --- |
| ED-01 Public identity and channels | `MISSING` | HP-01, HP-04, HP-07 | public operating identity, permitted address/channels/hours, owner, date, publication approval | P0 |
| ED-02 Safe orientation / health-content review | `MISSING` | HP-02, HP-03, service/FAQ | owner/reviewer, source, plain-language scope, non-diagnosis and escalation rule, reviewed date | P0 |
| ED-03 Real place evidence | `MISSING` | HP-01/04, `/khong-gian` | Toplink relationship, location/date, owner/photographer, permission; exclude other-brand material | P0 |
| ED-04 Real people/public roles | `MISSING` | HP-04, `/gioi-thieu` | named public role, allowed credentials/claims, portrait/interview permission, source/date | P0 |
| ED-05 Service register | `MISSING` | HP-05, service index/detail | approved name, scope, availability, public price/duration if applicable, caution/limit, owner/review date | P0 |
| ED-06 Booking/contact operation | `MISSING` | HP-07, booking/contact | configured channel, receiver, data handling, response expectation, slot/service uncertainty, retry/handoff policy | P0 |
| ED-07 Verified visit/process account | `MISSING` | HP-06, process page | steps, responsible role, timing range, change/stop/alternative and aftercare rules | P1 |
| ED-08 Documentary craft material | `MISSING` | later proof/prototype | consented preparation/hands/reset/material evidence with factual context | P1 |
| ED-09 FAQ/knowledge provenance register | `MISSING` | HP-08, FAQ/articles | question source, answer owner/reviewer, source type, scope, updated date | P2 |

## Homepage section contracts

| Section ID | Purpose | User job / question | Content type | Evidence class / current status | Primary / secondary CTA | State requirements | Mobile order | Trust boundary | Genericity risk | Dependencies |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| HP-01 | establish bounded purpose and a non-forcing entry | J-01/J-02: “Can I begin without choosing?” | purpose, identity/arrival slot, action fork | **REAL EVIDENCE** ED-01/03; currently `MISSING` except Runtime Truth of UI | `Chia sẻ tình trạng` / `Tôi chưa biết chọn dịch vụ nào` | initial, focus, route transition; no availability claim | 1 | purpose is not suitability or location proof | generic hero | ED-01, ED-03, ED-06 |
| HP-02 | make a concern legible in familiar words | J-01: “Does this acknowledge what I feel?” | limited sign choices and microcopy | **REAL EVIDENCE** ED-02; labels now `ASSUMPTION / RUNTIME COPY` | `Tiếp tục chia sẻ` / `Tôi chưa biết chọn dịch vụ nào` | unselected, selected, clear/change, keyboard focus | 2 | no diagnosis, severity conclusion, automatic service | novelty/pseudo-clinical body map | ED-02, ED-06 |
| HP-03 | explain orientation scope and limit | J-01/J-06: “What does this mean in plain language?” | bridge, limit, next-step choice | **REAL EVIDENCE** ED-02; Triều grammar is **REFERENCE EVIDENCE** only | `Trao đổi trước` / `Xem hướng chăm sóc` | oriented, unsure, unsupported/urgent concern, exit/return | 3 | terms need immediate explanation; no state verdict | jargon as authority | ED-02, ED-05, ED-06 |
| HP-04 | demonstrate trust rather than slogans | J-04: “Who/place is this?” | evidence ledger: place/person/identity slots and links | **REAL EVIDENCE** ED-01/03/04; all now `MISSING` | `Xem địa điểm` / `Xem người và vai trò` | evidence-present or unavailable; never a falsely filled proof module | 4 | no stock portrait, other-brand image, invented title/testimonial/metric | generic about/value cards | ED-01, ED-03, ED-04 |
| HP-05 | offer informed exploration | J-01/J-02: “What can I explore?” | need/scope pathway index and no-choice route | **REAL EVIDENCE** ED-05; catalogue now `ASSUMPTION / RUNTIME COPY` | `Xem phạm vi dịch vụ` / `Tôi chưa biết chọn dịch vụ nào` | browse, selection/no-match/uncertain, return to orientation | 5 | list is not suitability verdict; scope/cautions reviewed | raw marketplace grid | ED-02, ED-05, ED-06 |
| HP-06 | reduce first-visit uncertainty | J-03: “What happens, and can it change?” | verified process preview | **REAL EVIDENCE** ED-07; current timeline `ASSUMPTION / RUNTIME COPY` | `Xem quy trình thực tế` / `Trao đổi trước` | expanded detail, pause/change/alternative disclosure | 6 | no fictional timing/ritual/practitioner action/outcome | generic soothing timeline | ED-07, ED-08, ED-06 |
| HP-07 | translate intention into accountable action | J-02/J-05: “What happens when I act?” | action chooser + consequence | **REAL EVIDENCE** ED-01/06; current success is Runtime Truth only | `Đặt lịch`/`Gửi yêu cầu` when configured / verified direct channel | idle, oriented, input, review, sending, confirmed, error, retry, handoff | 7 | confirmation requires real transport and handoff | generic final CTA/fake immediacy | ED-01, ED-05, ED-06 |
| HP-08 | offer low-pressure knowledge continuation | J-03/J-06: “Can I check one question?” | FAQ/knowledge link and provenance | **REAL EVIDENCE** ED-09; Triều taxonomy is **REFERENCE EVIDENCE** only | `Xem câu trả lời` / `Trao đổi trước` | default, expand, source-pending, return | 8 | no diagnosis, encyclopedia, or substitute for needed care | filler FAQ | ED-02, ED-09, ED-06 |

## Genericity reduction map

| Current C/D surface | Why | H2 structural remedy | Evidence needed | Later art-direction dependency |
| --- | --- | --- | --- | --- |
| Homepage hero | broad promise + generic/non-provenance image | bounded task entry + identity/arrival slot | ED-01, ED-03 | real photography/crop/material only after proof |
| Ritual timeline | authored ambience, not process evidence | verified “what to expect” preview with change/uncertainty | ED-07, ED-08 | later pacing/editorial form only |
| Space | unknown/other-brand imagery | proof-of-place chapter and depth route; empty slot if missing | ED-03 | image sequencing after permission |
| About/value | virtue claims lack agency | accountable identity/role/work evidence | ED-01, ED-04, ED-08 | portrait/quote form after consent |
| Team | stock-like portrait/credentials | public-role ledger or omission | ED-04 | portrait treatment later |
| Review | placeholder social proof | no review module until original, consented source exists | consented review record | testimonial form only then |
| Contact | demo data/city conflict | verified access/channel page | ED-01, ED-06 | none for architecture |
| Booking success | simulated success possible | explicit transport, failure, retry, handoff states | ED-06 | feedback appearance later |
| Final CTA | no recipient/consequence | action chooser with disclosed consequence | ED-01, ED-06 | CTA prominence belongs later |

## Knowledge placement rule

| Destination | Belongs there | Does not belong there |
| --- | --- | --- |
| Homepage | familiar sign, short plain-language bridge, scope/limit, next step | taxonomy dump, certainty, long articles |
| Service page | need → approved scope → method/process → suitability boundary → contact | unsupported mechanisms/results/diagnosis |
| FAQ | high-friction practical questions with source/review metadata | invented reassurance or private data |
| Dedicated knowledge | only reviewed, dated, sourced content where editorial operation exists | cloned Triều knowledge-library scope |
| Nowhere | — | private health data, personal diagnosis, unapproved claims, unverified stories/other-brand proof |
