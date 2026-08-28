# 05 — Content, State and Motion Contracts

- **Status:** `PROPOSED FOR GATE B`
- **Visitor language:** Vietnamese-first
- **Backend/provider selection:** none

## Content voice system

**Toplink voice = chuyên môn cụ thể + tiếng Việt đời thường + trách nhiệm điềm tĩnh + giới hạn rõ + hậu quả nhìn thấy được.**

### Reusable rules and examples

| Surface          | Candidate rule                                                                                                      | Vietnamese example                                                                                                           |
| ---------------- | ------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Heading          | Answer one visitor question; sentence case; no prestige abstraction.                                                | “Anh/chị có thể bắt đầu từ điều đang khó chịu.”                                                                              |
| Body             | Observation and scope before claim; short concrete sentences.                                                       | “Một buổi chỉ được mô tả theo quy trình Toplink đã xác nhận và cho phép công bố.”                                            |
| Health boundary  | Say what this helps with and what it cannot conclude.                                                               | “Thông tin này giúp chuẩn bị cho cuộc trao đổi, không phải kết luận về tình trạng.”                                          |
| Action           | Verb + object or visible consequence; distinguish request from confirmation.                                        | “Xem bản rà soát”; “Gửi yêu cầu đặt lịch” khi vận hành xác nhận đây là yêu cầu.                                              |
| Uncertainty      | Name the unknown, avoid reassurance theatre, give only real alternatives.                                           | “Toplink chưa thể xác nhận khung giờ này. Anh/chị có thể đổi giờ hoặc chọn kênh liên hệ đã được xác minh.”                   |
| Evidence caption | State permitted who/role/place/action; keep internal provenance out of public display unless useful.                | “Khu vực tiếp nhận tại [địa điểm đã xác minh], ghi nhận [thời điểm được phép công bố].”                                      |
| Service scope    | Familiar need → approved scope → limit → detail/no-choice path.                                                     | “Phạm vi có thể tìm hiểu: … Điều trang này chưa thể kết luận: …”                                                             |
| Error            | Say what failed, whether anything was sent, and how to recover.                                                     | “Yêu cầu chưa được gửi. Nội dung vẫn còn để anh/chị kiểm tra và thử lại.”                                                    |
| Retry            | Name the repeated action and protect against duplicates.                                                            | “Thử gửi lại yêu cầu”; not “Thử lại” when the consequence would be ambiguous.                                                |
| Booking review   | Repeat exact user input, recipient/channel, collected data and next consequence before send.                        | “Anh/chị đang gửi yêu cầu, chưa phải lịch đã được xác nhận.”                                                                 |
| Confirmation     | Confirm only proven transport and define the next human/system step.                                                | “Toplink đã nhận yêu cầu qua [kênh đã xác minh]. [Vai trò đã xác minh] sẽ thực hiện bước tiếp theo theo chính sách công bố.” |
| FAQ bridge       | Start from a practical question; answer briefly; state limit/source where relevant; offer a low-pressure next step. | “Tôi chưa biết chọn dịch vụ thì bắt đầu ở đâu?” → “Anh/chị có thể bắt đầu bằng điều muốn trao đổi và sửa lại trước khi gửi.” |

All bracketed facts above are content-model slots, not publishable claims. They must be omitted until evidence exists.

### Voice controls

- Use `anh/chị` consistently unless later user research approves another form of address.
- Explain Tier B/C Đông-y terms immediately; do not use terminology as authority theatre.
- Use active accountable subjects: “Toplink đã nhận…” only when the system proves receipt; name a role only when verified.
- Prefer “phạm vi”, “điều chưa thể kết luận”, “yêu cầu”, “rà soát”, “chỉnh lại”, “chưa gửi” and “bước tiếp theo” when those words describe the real state.
- Privacy/minimization copy appears before collection when a familiar phrase might become sensitive health information.

### Explicitly rejected language

- “tận tâm chuyên nghiệp” without specific evidence;
- “đẳng cấp” or gold/luxury language;
- “chữa lành” as a generic promise;
- “cân bằng toàn diện”;
- “hiệu quả vượt trội”, guaranteed outcomes or inflated certainty;
- pseudo-clinical jargon, unexplained `khí huyết/kinh lạc/huyệt` or diagnostic-looking labels;
- urgency theatre such as “đặt ngay”, countdown, scarcity or “chuyên gia đang chờ”.

## Guided orientation contract

```text
familiar phrase
  → editable/removable summary
  → always-visible scope boundary
  → next choice or no-choice route
```

- Current H4 phrases are prototype evidence, not locked visitor copy. Final phrase inventory needs ED-02 review and user/staff language evidence.
- The system never produces a body-state verdict, `Tắc/Hàn/Hư/Loạn`, diagnosis implication or automatic service match.
- A user may edit, remove, reset or choose `Điều khác`; the no-choice route is equal, not secondary recovery.
- The phrase is not transferred to another surface or sent until the user explicitly chooses and reviews that consequence.
- Ask only for the minimum necessary context. Warn against names, phone numbers or identifying/private health detail in a free-text orientation field unless an approved purpose and handling policy exist.
- DẪN rail/seam is local to Guided Intake + Scope Boundary and ends before Action Receipt.

## State + consequence contract

`CONFIRMED` below is a **FUTURE CONTRACT**. It is not available in current production merely because it is specified here.

| State               | Trigger                                                                | User sees                                                                                  | What actually happens                                          | Human/system owner                                                   | Recovery                                                                | Analytics/test requirement                                                               |
| ------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **IDLE**            | visitor opens an action entry                                          | request vs confirmation distinction; direct and no-choice paths                            | no data sent; no availability inferred                         | local UI                                                             | leave, choose orientation or verified direct path                       | assert zero transport; keyboard/label/focus test                                         |
| **ORIENTED**        | visitor chooses direct/no-choice orientation                           | scope, privacy cue, editable familiar-language entry                                       | local context only; no diagnosis/service match                 | local UI; content owner for wording                                  | edit, remove, reset, continue without service choice                    | test no forbidden outputs and no implicit transfer                                       |
| **INPUT**           | visitor elects to prepare a request                                    | labels, required/optional distinction, why each field is needed                            | local validation and minimum data collection only              | local UI; future data controller must be named before implementation | correct fields, cancel, preserve only safe data                         | validation, autocomplete, privacy, keyboard and minimization tests                       |
| **REVIEW**          | required input is valid and visitor asks to review                     | exact request, recipient/channel, data, request status, next step and edit path            | nothing sent yet                                               | local UI                                                             | edit, cancel, choose verified alternative                               | snapshot exact payload; assert no network; focus review heading                          |
| **SENDING**         | visitor explicitly submits reviewed request                            | accessible progress and duplicate-send protection                                          | real transport is in flight                                    | selected transport system, only after Migration Gate                 | wait, cancel only if real transport supports it; otherwise failure path | integration test request/result/idempotency; announce pending state                      |
| **ERROR / FAILURE** | validation or transport rejects/fails/times out                        | specific failure, explicit “chưa gửi” unless server proves otherwise, preserved safe input | no confirmation created; transport outcome recorded truthfully | field validator or transport system                                  | correct, retry, edit, verified alternate channel                        | simulate validation/network/server/timeout; focus/announcement; no false success         |
| **RETRY**           | visitor explicitly repeats a failed request                            | exact repeated action and current pending state                                            | retry with duplicate protection                                | transport system                                                     | return to failure/uncertain/confirmed according to real result          | idempotency/double-click/offline/reload test                                             |
| **UNCERTAIN**       | transport result, slot, service fit, owner or channel cannot be known  | what is unknown; no implied receipt; verified choices only                                 | system records uncertainty without upgrading it to success     | transport/availability system; human owner only if verified          | edit, retry where safe, verified alternate channel, cancel              | test ambiguous response/timeout/unknown availability; no success language                |
| **HUMAN HANDOFF**   | a real rule/channel assigns the request to a verified role             | role/channel and response expectation only if verified; current status                     | handoff event is recorded or surfaced from a real operation    | verified human role/team                                             | alternate verified route or return if unavailable                       | contract/integration test handoff; content evidence and privacy audit                    |
| **CONFIRMED**       | successful transport **and** defined receiving handoff are both proven | what was received, reference if available, next owner/step, edit/cancel policy             | durable receipt and handoff state exist                        | transport system + verified receiving operation                      | follow stated change/cancel/contact path                                | end-to-end transport/handoff test, duplicate protection, audit record, a11y announcement |

### State language invariants

- A request is not an appointment; “đã gửi” is not “đã đọc”; “đã nhận qua transport” is not “một người đang xử lý”.
- Pending, failure, uncertainty, handoff and confirmation are separate semantic states, not color variants of one toast.
- Every state names the owner only when ownership is real. An unknown owner remains `UNCERTAIN`.
- Recovery stays adjacent to the consequence. Safe user input is preserved across retry; unnecessary sensitive data is not retained.
- No H5 decision selects a booking backend, provider, SLA or data architecture.

## Motion verb system

### KHAI — open/reveal

- **Purpose:** mark entry into a major chapter or bounded threshold.
- **Allowed surfaces:** Cover Record; at most a major documentary chapter; never every record/card.
- **Default behavior:** one restrained opacity/transform or mask reveal with content available from the start; timing calibrated later from current repo tokens.
- **Reduced motion:** final open state immediately, no delayed content.
- **Forbidden:** per-line stagger, repeated scroll reveal, cinematic delay, decorative threshold proliferation.

### DẪN — guide/relate

- **Purpose:** explain a real relationship, sequence or progress.
- **Allowed surfaces:** phrase → boundary relationship; verified process sequence; progressive disclosure where order matters.
- **Default behavior:** local rule/progress/disclosure change; labels and DOM order carry the same meaning.
- **Reduced motion:** static rule, heading and sequence; identical information and focus order.
- **Forbidden:** site-wide seam, physiology/meridian metaphor, parallax without task value, hover-only guidance.

### TỤ — converge into review

- **Purpose:** preserve user context as it becomes an editable review/consequence record.
- **Allowed surfaces:** Guided Intake → Action Receipt review; verified selection summaries.
- **Default behavior:** short spatial/state continuity without changing wording or auto-matching a service.
- **Reduced motion:** immediate review rendering with focus and live-state continuity.
- **Forbidden:** recommendation theatre, morph into diagnosis, celebratory convergence, auto-send.

### AN — settle/stabilize

- **Purpose:** make a consequence stable and quiet after a state change.
- **Allowed surfaces:** review, failure, uncertainty, handoff and future confirmation; quiet continuation.
- **Default behavior:** brief non-celebratory settle; state text is primary.
- **Reduced motion:** immediate stable state.
- **Forbidden:** confetti, bounce/spring for seriousness, perpetual glow/pulse, fake checkmark success.

## Motion engineering constraints

- GSAP remains the only advanced motion engine. H5 proposes no engine change.
- CSS may own hover/focus/press and short simple state transitions; GSAP is reserved for meaningful multi-element choreography or narrative continuity.
- Motion values are read from CSS through the current theme path when implementation requires them; do not redeclare timing in TypeScript.
- Native scroll remains. No scroll hijack, Lenis, perpetual requestAnimationFrame loop or essential information hidden behind animation.

## Responsive contract

| Acceptance context | Required behavior                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 375                | One readable column; warm threshold shortened; phrases/controls full-width where useful; inline consequence; no clipped Vietnamese or horizontal proof/table. |
| 768                | Preserve narrative order; allow measured two-part grouping only when focus/reading order remains obvious.                                                     |
| 1280               | Unequal editorial columns allowed; proof context and chapter hierarchy remain stronger than metadata.                                                         |
| 1440               | Whitespace expands intentionally; text measure does not become excessively wide; threshold remains bounded.                                                   |
| 200% zoom          | Reflow without horizontal content scrolling; no obscured focus/sticky controls; type and metadata remain readable; DOM/visual order align.                    |

These widths are verification anchors, not final accidental breakpoints. Metadata collapses before meaning; mobile does not become equal-card metronome; evidence context precedes details; public content uses no horizontal tables.

## Accessibility contract

- Semantic headings and landmarks; no visual heading substitutes.
- Visible high-contrast focus, keyboard operation and deliberate focus continuity through state changes.
- Native labels/group semantics; instructions before input; errors specific and announced.
- Meaning is never color-only; contrast is tested on every semantic surface/state pair.
- Practical touch targets preserve the repo baseline of at least 44px.
- Vietnamese remains readable at supported sizes and zoom; no uppercase long headings or clipped accents.
- `prefers-reduced-motion` reaches the same final state immediately.
- Live regions are used only for meaningful asynchronous/state changes and avoid noisy repeated announcements.
- Any primitive that cannot meet these constraints fails Gate B regardless of visual coherence.
