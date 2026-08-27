# 02 — Site IA and Page Roles

**Status:** `PROPOSED — READY FOR HUMAN REVIEW`

**Evidence posture:** routes are Runtime Truth; the roles below are **ASSUMPTION / HYPOTHESIS**, not approval to rename, merge, delete, or implement. Sen Tài Thu and Triều Đông Y mappings are **REFERENCE EVIDENCE** only. Unavailable Toplink proof remains **MISSING**; only provenance/consent/review-confirmed Toplink facts may become **REAL EVIDENCE**.

## User-job priority

| Job | Evidence support | Business importance | Homepage relevance | Trust / urgency | Information needed before action | Best destination | H2 classification |
| --- | --- | --- | --- | --- | --- | --- | --- |
| J-01 — orient a body concern | Current need-led UI only; health basis is missing | High | High | High / situational | familiar sign, scope, uncertainty, safe next step | Homepage guided orientation → consultation or service detail | `PRIMARY HOMEPAGE JOB — PROPOSED` |
| J-02 — “I do not know which service” | Current explicit branch only | High | High | High / immediate | what can be shared, who receives it, non-selection path | Homepage and `/dat-lich` | `PRIMARY HOMEPAGE JOB — PROPOSED` |
| J-03 — understand a first visit | Current authored timeline/process only | Medium-high | Medium | High / pre-decision | verified sequence, preparation, change/stop/alternative path | Homepage preview → `/quy-trinh-tri-lieu` | `SECONDARY HOMEPAGE JOB — PROPOSED` |
| J-04 — verify place, people, and identity | Current UI surfaces plus missing proof | High | High | Critical / pre-disclosure | verified identity, place, people, contact, provenance | Homepage trust chapter → `/gioi-thieu`, `/khong-gian`, `/lien-he` | `PRIMARY HOMEPAGE JOB — UNVALIDATED` |
| J-05 — make a reliable contact/booking handoff | Current UI only; endpoint/owner missing | High | CTA presence, not a homepage chapter | Critical / immediate | channel, collected fields, recipient, response expectation, fallback | `/dat-lich` and `/lien-he`; persistent CTAs | `DEDICATED ROUTE JOB — PROPOSED` |
| J-06 — understand a term without false certainty | Reference grammar plus runtime jargon; source/review missing | Medium | Low; compact bridge only | High / contextual | plain definition, scope, limit, provenance, next step | service detail, FAQ, later knowledge surface | `SUPPORTING KNOWLEDGE JOB — UNVALIDATED` |

No job is locked. This classification deliberately avoids inventing demographic personas.

## Proposed site graph

```text
/  Homepage: orientation and trust gateway
├─ /dich-vu  Service pathways / index
│  └─ /dich-vu/[slug]  Service scope and decision detail
├─ /quy-trinh-tri-lieu  What a verified visit involves
├─ /khong-gian  Verified place evidence and arrival facts
├─ /gioi-thieu  Verified identity, people, and public role evidence
├─ /dat-lich  Booking / guided-consultation state flow
├─ /lien-he  Public contact, location, channel and access facts
└─ /tin-tuc  Supporting knowledge only after provenance review
   └─ /tin-tuc/[slug]  Article with source/review/updated metadata

Current embedded FAQ → homepage/service/contact support surface
Future dedicated FAQ/knowledge index → candidate only; no route mutation proposed in H2

Adjacent current routes (`/san-pham`, `/dao-tao`, `/nhuong-quyen`, `/motion-lab`) → outside the consumer-care core; retain runtime audit status, do not use as homepage proof.
```

## Page-role decisions

| Route / surface | Primary job and question | Evidence needed | Relationship to homepage | Primary CTA | Trust responsibility | H2 treatment |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | J-01/J-02/J-04: “Can I describe this safely, understand the offer, and know whether this place is real?” | identity/place/people, safe orientation copy, approved service register, operational handoff | gateway; sends detail-seeking users to the appropriate route | `Chia sẻ tình trạng` / `Tôi chưa biết chọn dịch vụ nào` | make scope and uncertainty visible before any implied recommendation | `REFRAME — PROPOSED` |
| `/dich-vu` | J-01/J-02: “Which care pathway can I explore without guessing?” | approved service names, scope, duration/price if public, cautions, owner/review date | receives interested visitor after orientation; should not be a raw catalogue first | `Xem phạm vi dịch vụ` | distinguish service information from suitability decision | `REFRAME — PROPOSED` |
| `/dich-vu/[slug]` | J-01/J-03/J-06: “What is this service, what happens, and when is it not the right next step?” | service register, process proof, suitability/caution review, source/reviewer | detail destination from homepage/index; returns uncertain users to guided consultation | `Trao đổi trước khi đặt lịch` | scope, limits, reviewed factual content, no diagnosis | `REFRAME — PROPOSED` |
| `/gioi-thieu` | J-04: “Who is responsible here and what may they publicly claim?” | legal/operating identity, consented people/roles, publishable credentials, founder/staff language | trust-depth destination; homepage shows only substantiated evidence preview | `Xem người và vai trò đã xác minh` | no stock portraits, invented tenure, values, or testimonials | `REFRAME — PROPOSED` |
| `/khong-gian` | J-04/J-03: “Where would I arrive and what is actually there?” | address/site confirmation and permissioned Toplink documentary photos | evidence-depth destination; homepage uses one truthful entry cue only | `Xem địa điểm` | never attribute other-brand/unknown imagery to Toplink | `REFRAME — PROPOSED` |
| `/quy-trinh-tri-lieu` | J-03: “What happens before, during, after, or if the direction changes?” | observed/approved workflow, roles, timing range, alternatives, aftercare/handoff | homepage gives a short preview, never fictional ritual | `Xem quy trình thực tế` | replace ambience claims with bounded process facts | `REFRAME — PROPOSED` |
| `/dat-lich` | J-02/J-05: “Can I request a time or ask for guidance, and what happens next?” | configured destination, data handling, human owner, response expectation, slot/service policy | destination of all booking/uncertainty CTAs | `Gửi yêu cầu` only after review; otherwise channel/fallback | state truth, error/retry, no simulated confirmation | `REFRAME — PROPOSED` |
| `/lien-he` | J-04/J-05: “Which verified channel/location can I use now?” | public phone/Zalo/email/map/hours, ownership, accessibility/arrival facts | alternative when user wants human contact before form | `Gọi`, `Nhắn Zalo`, or `Xem địa điểm` when verified | no demo data represented as contact fact | `REFRAME — PROPOSED` |
| FAQ surface now embedded in runtime | J-02/J-03/J-06: “What should I know before taking the next step?” | sourced/reviewed answers, owner/date, scope and uncertainty text | homepage carries only high-friction questions; detailed answers belong to service/contact | `Xem câu trả lời liên quan` | every health answer needs provenance and escalation boundary | `REFRAME — PROPOSED` |
| `/tin-tuc` and `/tin-tuc/[slug]` | J-06: “Can I learn more with sources and limits?” | editorial owner, sources, review status/updated date, article scope | optional continuation, never required before booking/contact | `Đọc giải thích liên quan` | must not become unreviewed medical authority | `DEMOTE CANDIDATE — PROPOSED` until review model exists |
| `/san-pham` | secondary commercial need not evidenced by H1 | product inventory, availability, claims/safety | no planned homepage role | none in H2 | product proof and claim boundary | `DEMOTE CANDIDATE — PROPOSED` |
| `/dao-tao`, `/nhuong-quyen` | business/recruitment or partner intent; not a care visitor job | separate operating/business evidence | no planned homepage role | route-specific only | avoid mixing commercial proof with care trust | `DEMOTE CANDIDATE — PROPOSED` |
| `/motion-lab` | internal/demo surface | none for visitor trust | none | none | must not leak as care path | `DEMOTE CANDIDATE — PROPOSED` |

`KEEP` is intentionally not used as an approval label: route existence is only Runtime Truth. “Merge candidate” remains a later Human Gate decision once actual service/knowledge operations are known.

## Reference relationship mapping

| Reference pattern | User problem solved | Toplink adaptation | Required Toplink evidence | Disposition |
| --- | --- | --- | --- | --- |
| Sen: brand/world before catalogue | avoids asking a visitor to compare services before they understand the place | homepage begins with purpose, safe orientation, and verified identity/place cue before service index | P0 identity and proof-of-place | `ADAPT — PROPOSED` |
| Sen: space/service/people form trust relationship | trust is not outsourced to price or slogans | show only verified evidence modules; deep-link to place, people, and service scope pages | P0 place, people, service register | `ADAPT — PROPOSED` |
| Sen: orientation before selection | uncertainty becomes a legitimate path | make “I do not know which service” a primary action and a dedicated booking state | P0 human recipient and service triage policy | `ACCEPT AS TASK PRINCIPLE — PROPOSED` |
| Sen: booking is continuation | conversion does not interrupt comprehension | expose booking/contact after the visitor knows scope; retain direct access for J-05 | P0 configured channel, owner/SLA, data handling | `ADAPT — PROPOSED` |
| Triều: familiar sign → term → scope → limit | people can understand a domain word without authority theatre | use a short bridge in service/FAQ; reserve detailed knowledge for reviewed surfaces | P0/P2 source and health-content review | `ADAPT — PROPOSED` |
| Triều: knowledge-library topology | supports long-form research | do not make this focused care site an encyclopedia; only a future scoped knowledge index is a candidate | P2 editorial/provenance operation | `REJECT FOR HOMEPAGE; DEFER FOR LATER` |
