# 03 — User Reality

**Phase:** H1
**Status:** `PARTIAL — jobs are hypotheses, not research-validated personas`

## Guardrails

- No demographic persona is asserted. The repository only states an intended audience skew toward middle-aged and older visitors; it contains no user interviews, analytics, conversion research, booking records, or accessibility studies for actual customers.
- The sources below show current product intent and runtime affordances, not proof that real users behave this way.
- A user job is `PROPOSED` when directly suggested by current flows/content; it is `UNVALIDATED` when the needed audience evidence is absent. No new job is `LOCKED` or `APPROVED` in H1.

| ID | Job / intent hypothesis | Practical need | Emotional/trust need | Current supporting source | Status | What would validate it |
| --- | --- | --- | --- | --- | --- | --- |
| J-01 | “Tôi đang khó chịu ở một vùng cơ thể và muốn biết có hướng chăm sóc nào để trao đổi.” | orient from a familiar concern to a suitable conversation | avoid diagnosis or pressure into a service | body-signal UI, `SYMPTOMS`, `SERVICES`, service pages | `PROPOSED` | 5–10 real enquiries plus staff review of safe wording |
| J-02 | “Tôi chưa biết chọn dịch vụ nào.” | a no-choice / ask-for-guidance route | uncertainty is acceptable | explicit booking “Tôi chưa biết chọn dịch vụ nào”; `letAdvise` flow | `PROPOSED` | real consultation choices and a confirmed response owner |
| J-03 | “Tôi muốn biết một buổi diễn ra thế nào trước khi quyết định.” | process, timing, preparation, next steps | control and predictability | `PROCESS_STEPS`, `RITUAL_MOMENTS`, process route | `PROPOSED` | verified process walk-through and visitor/staff language |
| J-04 | “Tôi muốn biết nơi này, người thực hiện và thông tin liên hệ có đáng tin không.” | identity, place, roles, contact, boundaries | proof before sharing a phone number or visiting | team, space, contact, FAQ, review surfaces | `UNVALIDATED` | verified identity/contact, consented people/place assets, customer question log |
| J-05 | “Tôi biết nhu cầu của mình và muốn để lại yêu cầu hoặc liên hệ nhanh.” | clear booking/call/Zalo route | know who receives it and what happens next | `/dat-lich`, contact CTAs, service-to-booking links | `PROPOSED` | configured receiving channel, owner/SLA confirmation, task test with real staff |
| J-06 | “Tôi muốn hiểu một thuật ngữ Đông y liên quan bằng lời dễ hiểu và biết giới hạn của nó.” | plain-language explanation plus safe next step | avoid false certainty or jargon | current terms: khí huyết, kinh lạc, Tắc/Hàn/Hư/Loạn; Triều grammar | `UNVALIDATED` | reviewed glossary/content sources and a comprehension check |

## Current user-context facts (not persona claims)

| Fact | Evidence | Status | Limitation |
| --- | --- | --- | --- |
| Current UI offers symptom/need-led discovery, service selection, direct contact, and a “not sure” branch. | `content.ts`, `BookingStepper.tsx`, page routes | `APPROVED` as Runtime Truth | does not prove demand or completion |
| Repo requires larger type, high contrast, generous content blocks, and restrained motion for a middle-aged/older intended audience. | `AGENTS.md` | `APPROVED` as engineering/accessibility context | not demographic research |
| Booking success is simulated when Google Form is unconfigured. | `lib/booking.ts`, `BookingStepper.tsx` | `APPROVED` as Runtime Truth | no conclusion about actual follow-up service |

## Evidence collection questions

1. What do people say first when they contact Toplink?
2. What information do they need before agreeing to a first visit?
3. What makes them hesitate or leave?
4. When they say they are “not sure,” what does staff do next?
5. Which terms do staff explain repeatedly, and how do they explain them without diagnosing?
6. Who receives a Zalo/call/form enquiry, when, and what can they honestly promise?

Responses must become attributed evidence, not anonymous “insights” inferred from UI copy.
