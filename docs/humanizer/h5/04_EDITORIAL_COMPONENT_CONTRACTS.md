# 04 — Editorial Component Contracts

- **Status:** `PROPOSED FOR GATE B`
- **Nature:** conceptual/component contracts; no production component implementation
- **Shared rule:** a primitive exists because of a job, evidence, state, narrative role or consequence — never merely to make a page look designed.

## Shared evidence grammar

```text
IF permitted REAL EVIDENCE exists
  → render the matching evidence-bearing primitive with minimum useful public context.
IF evidence is missing, private or unapproved
  → omit it, restructure the chapter, or use truthful generic scope text.
NEVER
  → expose ED codes, X-frames, stock replacements, fake names/metrics/reviews, or internal review status to visitors.
```

Reference evidence informs grammar; Runtime Evidence describes the demo; Proposed Design remains visibly proposed in internal artifacts. Neither may masquerade as Real Evidence.

## 1. Cover Record

| Contract field              | Definition                                                                                                                                                                            |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                 | Open the Toplink narrative with a bounded purpose and a calm path into the site.                                                                                                      |
| **User job**                | “Tôi có thể bắt đầu mà chưa biết chọn dịch vụ không?”                                                                                                                                 |
| **Required content**        | One plain Vietnamese purpose; one scope/limit cue; primary start; first-class no-choice path; verified arrival/identity fact only if available.                                       |
| **Evidence requirement**    | ED-01 and ED-03 for public identity/arrival proof; without them, use a truthful generic purpose and omit the evidence claim.                                                          |
| **Allowed states**          | default, keyboard focus, route transition; optional evidence-present variant. No availability or success state.                                                                       |
| **Responsive behavior**     | Warm threshold and paper record may split on wide screens; on mobile the threshold becomes a short band before the reading field. Purpose and actions remain before supporting facts. |
| **Motion**                  | KHAI once for entry; no staggered fact rows. Reduced motion renders final layout immediately.                                                                                         |
| **Accessibility**           | One `h1`; actions are native controls/links with visible focus and ≥44px practical target; no text over busy imagery; zoom reflows naturally.                                         |
| **Forbidden use**           | Full-screen mood billboard, luxury claim, forced service choice, unverified place/person image, decorative threshold elsewhere.                                                       |
| **Genericity failure mode** | “Welcome to a premium wellness journey” plus two generic CTAs and a stock spa photograph.                                                                                             |

## 2. Guided Intake

| Contract field              | Definition                                                                                                                                                                                           |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                 | Let a visitor begin in familiar language and preserve their wording into review without inferring a condition or service.                                                                            |
| **User job**                | “Tôi muốn nói điều đang khó chịu bằng lời của mình.”                                                                                                                                                 |
| **Required content**        | Small reviewed phrase set; editable/removable summary; `Điều khác`; no-choice route; minimization/privacy warning; adjacent Scope Boundary. Current H4 phrases remain examples pending ED-02 review. |
| **Evidence requirement**    | ED-02 for wording/safety; ED-05/06 only if later choices connect to real scope or handoff. User input is not evidence about suitability.                                                             |
| **Allowed states**          | empty, selected, edited, removed, oriented, validation error, review-ready, reset. No diagnostic/result/matched-service state.                                                                       |
| **Responsive behavior**     | Full-width touch rows on narrow screens; editable text stays visible; phrase → boundary → review order remains linear; no body map or horizontal chip rail.                                          |
| **Motion**                  | DẪN connects phrase to boundary; TỤ carries exact wording into editable review. The rail/seam ends at HP-03. Reduced motion uses static grouping and immediate state change.                         |
| **Accessibility**           | Fieldset/legend or equivalent group label; `aria-pressed`/native selection semantics; labeled input; keyboard edit/remove; state update announced without focus trap.                                |
| **Forbidden use**           | Body-state verdict, `Tắc/Hàn/Hư/Loạn`, automatic match/rank, specialist labels without immediate explanation, required private health narrative, site-wide seam.                                     |
| **Genericity failure mode** | A novelty symptom quiz that outputs an authoritative-looking “personalized treatment”.                                                                                                               |

## 3. Scope Boundary

| Contract field              | Definition                                                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Purpose**                 | Separate what the interface can help prepare from what it cannot conclude or promise.                                                            |
| **User job**                | “Phần này có ý nghĩa gì, và giới hạn ở đâu?”                                                                                                     |
| **Required content**        | Plain heading; specific allowed scope; specific non-claim; alternative/escalation route only when reviewed and verified.                         |
| **Evidence requirement**    | ED-02 health-content review; ED-05 service boundary; ED-06 operational alternative when named.                                                   |
| **Allowed states**          | persistent default; context-specific warning; uncertainty; reviewed update. It cannot be dismissible when needed to interpret the intake/action. |
| **Responsive behavior**     | Immediately follows the content it qualifies; may sit adjacent on wide screens but follows it in DOM/mobile. No tooltip-only boundary.           |
| **Motion**                  | Normally motionless. DẪN may expose the relationship without delaying or hiding the boundary.                                                    |
| **Accessibility**           | Semantic heading/text; high contrast; no color-only warning; domain terms explained in-place; readable at 200% zoom.                             |
| **Forbidden use**           | Legalistic wall of text, vague “results may vary”, alarmist medical language, boundary hidden after interaction.                                 |
| **Genericity failure mode** | A generic disclaimer pasted into every section without saying what Toplink does or does not do.                                                  |

## 4. Proof Index

| Contract field              | Definition                                                                                                                                                                                    |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                 | Let visitors verify relevant person/place/process evidence before deeper exploration.                                                                                                         |
| **User job**                | “Tôi có thể tin điều này dựa trên bằng chứng nào?”                                                                                                                                            |
| **Required content**        | Evidence-led heading; real documentary asset/fact; concise public context; optional progressive detail; path to relevant place/person/process information.                                    |
| **Evidence requirement**    | ED-01/03/04/07/08 as applicable, with provenance, consent and publication scope. Internal provenance remains in content operations unless useful publicly.                                    |
| **Allowed states**          | evidence-present; evidence partially available with honest omission; unavailable means the unit is omitted/restructured. Internal preview may show missing dependency but production may not. |
| **Responsive behavior**     | Context precedes detail; documentary sequence remains understandable; no public horizontal table, forced carousel or metadata-first stack.                                                    |
| **Motion**                  | KHAI only for a major documentary chapter if useful; progressive disclosure may use restrained CSS. Evidence/source/limit text stays still.                                                   |
| **Accessibility**           | Meaningful alt/caption division; details/summary keyboard support; headings describe evidence, not status color; image crop preserves relevant context.                                       |
| **Forbidden use**           | H4 X-frame, ED code, archive stamp, status dashboard, virtue cards, fake proof, anonymous hands, stock/synthetic people, ornamental metadata.                                                 |
| **Genericity failure mode** | Three equal “trust cards” saying quality, experience and dedication without a person, place, process or source.                                                                               |

When real photography arrives, this primitive must become more human and contextual, not more bureaucratic.

## 5. Service Scope Register

| Contract field              | Definition                                                                                                                                          |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                 | Help visitors explore verified scopes without implying fit, rank or diagnosis.                                                                      |
| **User job**                | “Dịch vụ này thuộc phạm vi nào; có điều gì chưa thể kết luận?”                                                                                      |
| **Required content**        | Approved name; plain scope; limit/caution; link to detail; first-class `Tôi chưa biết nên chọn gì`; price/duration only if current and approved.    |
| **Evidence requirement**    | ED-05 service register, ED-02 safety review and ED-06 for any contact/action consequence.                                                           |
| **Allowed states**          | browse, expanded detail, no match, uncertain, unavailable/omitted, return to guided intake. Selection is exploration, not suitability confirmation. |
| **Responsive behavior**     | Editorial rows become a single readable list; primary meaning precedes secondary facts; no horizontally scrolling table or marketplace card grid.   |
| **Motion**                  | DẪN for meaningful disclosure/progress only; no hover-dependent content or animated ranking.                                                        |
| **Accessibility**           | Descriptive links, semantic list/headings, keyboard disclosure, focus visible, cautions not color-only, touch target baseline preserved.            |
| **Forbidden use**           | “Basic/premium/advanced” without evidence, auto-recommendation, scarcity, unsourced outcomes, eight identical cards, price-first pressure.          |
| **Genericity failure mode** | A catalogue of interchangeable packages with icon, benefit list and “Đặt ngay”.                                                                     |

## 6. Visit / Process Record

| Contract field              | Definition                                                                                                                                   |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                 | Reduce uncertainty by showing what a visit/process actually involves and where it can change, pause or hand off.                             |
| **User job**                | “Một buổi diễn ra thế nào; tôi có thể dừng hoặc đổi hướng không?”                                                                            |
| **Required content**        | Verified sequence; responsible role; realistic timing range if approved; change/stop/alternative; aftercare/next step when factual.          |
| **Evidence requirement**    | ED-07 observed/approved process and ED-08 documentary craft/context; ED-04 for named roles.                                                  |
| **Allowed states**          | summary, expanded step, changed/paused alternative, information unavailable/omitted. Not a live tracker unless a real system exists.         |
| **Responsive behavior**     | Linear DOM sequence; context before close-up; optional details inline; no forced horizontal ribbon on public mobile.                         |
| **Motion**                  | DẪN may explain actual sequence. KHAI can open the chapter once. Reduced motion preserves numbered/labeled order with no progress animation. |
| **Accessibility**           | Ordered list where sequence matters; clear headings; controls keyboard operable; motion never carries the only relationship.                 |
| **Forbidden use**           | Invented ritual, guaranteed timing/outcome, fake live progress, cinematic scroll hijack, ambiguous medical imagery.                          |
| **Genericity failure mode** | “Thả lỏng → chữa lành → tái tạo” as a soothing timeline unsupported by operations.                                                           |

## 7. Action Receipt

| Contract field              | Definition                                                                                                                                                                 |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**                 | Make request, recipient, data, current state, next consequence and recovery visible before and after an action.                                                            |
| **User job**                | “Tôi đang gửi gì, cho ai, trạng thái nào và nếu lỗi thì làm gì?”                                                                                                           |
| **Required content**        | Exact editable summary; request-vs-confirmation distinction; verified recipient/channel; necessary data only; current state; recovery; human handoff only when real.       |
| **Evidence requirement**    | ED-01/05/06. `CONFIRMED` requires actual transport success plus defined receiving handoff; provider choice is outside H5.                                                  |
| **Allowed states**          | IDLE, ORIENTED, INPUT, REVIEW, SENDING, ERROR/FAILURE, RETRY, UNCERTAIN, HUMAN HANDOFF, CONFIRMED future contract.                                                         |
| **Responsive behavior**     | Inline after the action context; consequence before controls; metadata stacks below meaning; never a bottom sheet that hides form/focus.                                   |
| **Motion**                  | TỤ into REVIEW; AN for stable result/failure/uncertainty; no celebration. State announcements and focus continuity do not depend on animation.                             |
| **Accessibility**           | Labeled fields, review/edit path, specific errors, live status where appropriate, deliberate focus, duplicate-send protection, ≥44px controls, safe data preservation.     |
| **Forbidden use**           | False success, fake owner/SLA, automatic send from phrase selection, countdown, “chuyên gia đang chờ”, concealed data/recipient, backend/provider selection in this phase. |
| **Genericity failure mode** | A generic success toast that says “Gửi thành công” without transport, receiver or next step.                                                                               |

The complete state/consequence table is in artifact 05.

## 8. Quiet Continuation

| Contract field              | Definition                                                                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Purpose**                 | Let visitors continue learning or ask a practical question without conversion pressure.                                                                |
| **User job**                | “Tôi muốn kiểm tra thêm một câu hỏi trước khi quyết định.”                                                                                             |
| **Required content**        | Small set of reviewed FAQ/knowledge/contact links; familiar-language question; short answer/preview; limit; source/reviewer context only where useful. |
| **Evidence requirement**    | ED-09 provenance register; ED-02 for health content; ED-01/06 for contact consequences.                                                                |
| **Allowed states**          | default, expanded answer, source pending/omitted, return, verified contact handoff. No endless content feed.                                           |
| **Responsive behavior**     | Low-density single list; no card carousel; primary question before metadata; no sticky conversion pressure.                                            |
| **Motion**                  | AN as a quiet close; restrained disclosure only. No auto-advance, marquee or ambient motion.                                                           |
| **Accessibility**           | Semantic links/details; clear focus; answer remains readable without animation; heading structure continues correctly.                                 |
| **Forbidden use**           | Unsourced health encyclopedia, filler FAQ, diagnosis substitute, fake reassurance, repeated final CTA, ornamental citations.                           |
| **Genericity failure mode** | Six generic accordion questions written to fill space and repeat sales claims.                                                                         |

## Primitive-to-narrative map

| H2 role                        | Target primitive       |
| ------------------------------ | ---------------------- |
| HP-01 ORIENT                   | Cover Record           |
| HP-02 RELATE                   | Guided Intake          |
| HP-03 EXPLAIN SAFELY           | Scope Boundary         |
| HP-04 VERIFY TRUST             | Proof Index            |
| HP-05 EXPLORE PATHS            | Service Scope Register |
| HP-06 REDUCE VISIT UNCERTAINTY | Visit / Process Record |
| HP-07 DECIDE                   | Action Receipt         |
| HP-08 CONTINUE                 | Quiet Continuation     |

Visual chapters may combine adjacent primitives, but their user job, evidence boundary, DOM order and state ownership must remain recoverable.
