# 03 — Homepage Narrative and Grayscale Wireframe

**Status:** `PROPOSED — READY FOR HUMAN REVIEW`

**Format:** low-fidelity information architecture only. Relative density, hierarchy, evidence slots, CTA placement, mobile order, and state notes are intentional; visual direction is not.

## Proposed narrative sequence

`ORIENT → RELATE → EXPLAIN SAFELY → VERIFY TRUST → EXPLORE PATHS → REDUCE VISIT UNCERTAINTY → DECIDE → CONTINUE`

This sequence gives J-01/J-02 an uncertainty-first path, requires J-04 proof before a trust assertion, sends J-03 to a verified process explanation, preserves J-05 as direct but consequence-aware action, and places J-06 knowledge at the point where it is useful rather than turning the homepage into an encyclopedia.

## Chapter contracts

| ID / narrative role | User question answered | Evidence required / available / status | Main information and interaction | Next step / mobile order | Risk if evidence stays missing |
| --- | --- | --- | --- | --- | --- |
| HP-01 — Orient | “What is this site for, and can I begin without choosing a treatment?” | P0 identity/contact purpose; runtime headline only. `MISSING` Toplink proof. | bounded promise, scope cue, two actions: `Chia sẻ tình trạng`; `Tôi chưa biết chọn dịch vụ nào`. | to HP-02 or booking; mobile 1 | generic hero or untrue brand/place claim |
| HP-02 — Relate | “Can I start from what I feel in everyday words?” | reviewed familiar-sign wording; current symptom labels only. `MISSING` review. | short, non-diagnostic concern choices and a plain-language “not a diagnosis” boundary. | to HP-03; mobile 2 | symptom selection reads as self-diagnosis |
| HP-03 — Explain safely | “What can this orientation tell me, and what can it not?” | approved scope/health review, explanation source, escalation rule. `MISSING — P0`. | guided orientation result: what the visitor can share; no state label or automatic service recommendation. | guided consult or HP-05; mobile 3 | unsupported `Tắc/Hàn/Hư/Loạn` conclusion and unsuitable service implication |
| HP-04 — Verify trust | “Who/place/process is behind this next step?” | verified identity, public contact, people/place evidence, consent. All `MISSING — P0`. | evidence ledger with slots for a real arrival/place cue and named permitted role; links to about/space/contact. | to HP-05; mobile 4 | fake humanity, stock/other-brand attribution, unsupported authority |
| HP-05 — Explore pathways | “What can I explore if I know my need?” | approved service register, scope/caution/price-duration if public. `MISSING — P0`. | pathway index by need/scope; every route retains “not sure” path. | service detail or HP-06; mobile 5 | catalogue falsely implies service availability/suitability |
| HP-06 — Reduce visit uncertainty | “What happens in a first visit, and can the plan change?” | observed/approved visit workflow, roles, timing, aftercare. `MISSING — P1`. | compact verified sequence preview; link to process page; show pause/change/other-channel rule if confirmed. | HP-07; mobile 6 | fictional ritual timeline becomes operational promise |
| HP-07 — Decide | “Which action is appropriate now, and what happens afterward?” | configured channel, human owner, data-handling, response/slot policy. `MISSING — P0`. | action chooser: guided consultation, booking, Zalo/call/location only if verified; each opens a consequence explanation. | booking/contact or HP-08; mobile 7 | simulated success, no owner, false immediacy |
| HP-08 — Continue | “Where can I check a term or a practical question before acting?” | reviewed FAQ/knowledge sources and owner/date. `MISSING — P2`. | short FAQ/knowledge links: familiar sign first, term only if needed, scope/limit/next step. | relevant route; mobile 8 | encyclopedia drift or unsourced health authority |

## Body Signal Interface — disposition review

| Disposition | J-01/J-02 fit | Trust / diagnosis risk | Cognitive load | Evidence/provenance gap | Conversion usefulness | Result |
| --- | --- | --- | --- | --- | --- | --- |
| A. Keep as homepage core | direct J-01 entry | High: current symptom → state → service reads as a conclusion | High for an uncertain first visitor | P0: no source, review, boundary, escalation, or service proof | potentially high, but unsafe/unverified | `REJECT — PROPOSED` |
| B. Keep, reduced/reframed as guided orientation | supports J-01 and preserves J-02 non-selection path | lower if it uses familiar signs, explicit limits, and no automatic recommendation | bounded, progressive | still needs P0 reviewed wording/policy before activation | useful as a route to human conversation | `RECOMMEND — PROPOSED` |
| C. Move to dedicated guided-consultation surface | strong containment of complex questions | lower public implication; requires active operational handoff | lower on homepage, higher later | P0 owner/channel/service triage required | useful only once the consultation route is real | `FUTURE OPTION — PROPOSED` |
| D. Deprecate current model | removes current risk | lowest | lowest | avoids, rather than resolves, job need | loses an orientation entry; J-01 still needs a safe path | `NOT RECOMMENDED YET — PROPOSED` |

**Recommended disposition: B — KEEP BUT REDUCE / REFRAME AS GUIDED ORIENTATION.** It preserves the real user question while removing the unsupported symptom-to-state-to-service inference; until P0 review exists, it remains an evidence slot rather than active public content.

## Desktop homepage wireframe

```text
┌─────────────────────────────────────────────────────────────────────────────────────┐
│ GLOBAL NAV: Home | Service paths | Process | Place | About | Contact | [Booking]    │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ HP-01 ORIENT — medium/high density                                                   │
│  H1: bounded purpose + scope statement                                               │
│  [VERIFIED TOPLINK ARRIVAL / IDENTITY EVIDENCE — P0]                                 │
│  [Chia sẻ tình trạng]  [Tôi chưa biết chọn dịch vụ nào]                              │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ HP-02 + HP-03 RELATE / SAFE ORIENTATION — dense interactive reading field           │
│  familiar concern choices → plain-language explanation → scope / uncertainty         │
│  [HEALTH-CONTENT REVIEW + ESCALATION POLICY — P0]                                    │
│  [Trao đổi trước]  [Xem các hướng chăm sóc]                                          │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ HP-04 VERIFY TRUST — evidence-led, uneven two-column composition                     │
│  [REAL PLACE / ENTRY EVIDENCE — P0]      [REAL PUBLIC ROLE / PERSON — P0]           │
│  fact/permission/source status               links: Place | People | Contact         │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ HP-05 EXPLORE PATHS — compact index, not a marketplace grid                          │
│  need / scope / limit → service detail         [not sure which service]              │
│  [APPROVED SERVICE REGISTER + CAUTION REVIEW — P0]                                   │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ HP-06 FIRST VISIT — process preview / pause                                          │
│  arrive → share → agree direction → care scope → next step                           │
│  [VERIFIED PROCESS / ROLE / TIMING — P1]  [Xem quy trình thực tế]                    │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ HP-07 DECIDE — action chooser with consequence disclosure                            │
│  [Guided consultation] [Booking request] [Zalo/call] [Location]                      │
│  recipient + data + response + recovery shown only from verified operations          │
│  [CONFIGURED HANDOFF / OWNER / POLICY — P0]                                          │
├─────────────────────────────────────────────────────────────────────────────────────┤
│ HP-08 CONTINUE — low-density FAQ / knowledge bridge                                  │
│  familiar question → short answer → limit → source/reviewer → next step              │
│  [REVIEWED FAQ / KNOWLEDGE REGISTER — P2]                                            │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

## Mobile homepage wireframe

```text
┌───────────────────────────────┐
│ Header + [Booking]             │
├───────────────────────────────┤
│ 1. ORIENT                      │
│ purpose / scope                │
│ [share] [not sure]             │
├───────────────────────────────┤
│ 2. RELATE                      │
│ familiar concern choices       │
├───────────────────────────────┤
│ 3. EXPLAIN SAFELY              │
│ plain-language + boundary      │
│ [talk first]                   │
├───────────────────────────────┤
│ 4. VERIFY TRUST                │
│ real place slot                │
│ real person/role slot          │
│ [place] [identity/contact]     │
├───────────────────────────────┤
│ 5. EXPLORE PATHS               │
│ one pathway at a time          │
│ [not sure]                     │
├───────────────────────────────┤
│ 6. FIRST VISIT                 │
│ short verified sequence        │
├───────────────────────────────┤
│ 7. DECIDE                      │
│ action → consequence preview   │
│ [booking] [Zalo/call]          │
├───────────────────────────────┤
│ 8. CONTINUE                    │
│ FAQ / term / contact links     │
└───────────────────────────────┘
```

Mobile preserves the narrative reading order; desktop may use unequal columns only where the evidence relationship remains clear. No desktop visual composition is a direction lock.
