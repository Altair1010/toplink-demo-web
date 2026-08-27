# 02 — H4 Prototype Spec

- **Route:** `/motion-lab/humanizer-h4/`
- **Source boundary:** `app-demo/app/motion-lab/humanizer-h4/**`
- **Rendering:** static-export compatible; route không có backend/network mutation
- **Typography:** sans-first bằng `Be Vietnam Pro` đã có trong runtime; không tải font mới
- **Styling:** CSS Module với semantic variables cục bộ; không sửa global token

## Composition thesis

Một signature thống nhất: **bounded record with accountable gaps**. Ngưỡng đỏ ấm chỉ mở surface 1 và đánh dấu decision trong surface 3. Phần còn lại là paper/ink, rule có mục đích, bất đối xứng có kiểm soát và khoảng trắng phân biệt fact, giới hạn, evidence slot và consequence. Không archive cosplay, data table, card metronome hoặc wellness image.

## Surface contracts

### H4-S1 — Cover record

- Visitor question: “Tôi có thể bắt đầu mà chưa chọn dịch vụ không?”
- Heading: “Anh/chị có thể bắt đầu từ điều đang khó chịu.”
- Boundary: “Không cần tự kết luận hay chọn đúng dịch vụ ngay từ đầu.”
- Actions: `Chia sẻ tình trạng`; `Tôi chưa biết nên chọn gì`.
- Consequence: cả hai action chỉ đi đến guided orientation trong cùng prototype; không gửi dữ liệu.
- Warm threshold: một field đỏ sâu mở đầu, sau đó chuyển ngay về cover record paper/ink.

### H4-S2 — Proof index

- Visitor question: “Tôi sẽ kiểm chứng nơi chốn, người/vai trò và quy trình bằng cách nào?”
- Ba slot: ED-03 place; ED-04 public role/person; ED-07 process/operating fact.
- Public message: evidence Toplink chưa có trong prototype, nên không có trust claim được populated.
- Development annotation có nhãn `Nhãn nội bộ`; không được nhìn như public credential.
- Progressive disclosure chỉ giải thích evidence nào cần có và điều gì không được thay thế.
- Không ảnh stock, ảnh thương hiệu khác, synthetic person, quote/name/credential/process bịa.

### H4-S3 — Guided orientation + action receipt

- Phrase choices: `Cổ vai gáy đang căng`; `Lưng eo khó chịu`; `Khó ngủ`; `Điều khác`.
- Người dùng có thể sửa phrase; summary luôn hiển thị `Anh/chị đang muốn trao đổi về: …`.
- Boundary luôn ở trước review: “Thông tin này giúp chuẩn bị cho cuộc trao đổi, không phải kết luận về tình trạng.”
- Không state taxonomy, không auto-match service, không health term authority.
- State path: `REQUEST → REVIEW → SENDING SPECIMEN → FAILURE → RETRY → UNCERTAINTY / HUMAN HANDOFF SPECIMEN`.
- Không `CONFIRMED` specimen vì H4 không cần nó để test thesis; route không có submit control hoặc network request.
- Failure phải nói “chưa gửi”; uncertainty phải nói owner/channel/SLA vẫn thiếu evidence.

## State model contract

| State         | Input/action       | Observable result                           | Forbidden                        |
| ------------- | ------------------ | ------------------------------------------- | -------------------------------- |
| `request`     | select/edit phrase | editable Vietnamese phrase + boundary       | diagnosis/service recommendation |
| `review`      | review phrase      | exact phrase, scope and edit path           | recipient/SLA claim              |
| `sending`     | enter specimen     | explicit “mẫu, không gửi dữ liệu”           | spinner implying real transport  |
| `failure`     | simulate failure   | clear not-sent message + retry              | success wording/data loss        |
| `uncertainty` | choose uncertainty | missing owner/channel/SLA + edit/reset path | fake human handoff               |

Unknown events preserve current state. Empty phrase cannot advance to review. Reset returns a fresh empty request state.

## Motion contract

- **KHAI:** one CSS opening transition on the warm hero threshold.
- **DẪN:** local phrase → boundary → review relationship; no site-wide seam.
- **TỤ:** phrase becomes an editable review summary.
- **AN:** review/failure/uncertainty settle without celebratory animation.
- `prefers-reduced-motion: reduce` removes animation/transition while exposing identical information immediately.

## Accessibility contract

- semantic `h1 → h2 → h3` order and native buttons/inputs/details;
- visible focus, practical target ≥44px, labels not color-only;
- DOM order equals reading/focus order;
- live state message uses `aria-live="polite"` and changes do not trap focus;
- no horizontal table/scroll; 375/768/1280/1440 and 200% zoom checks;
- all critical states available by keyboard and reduced motion.

## Verification plan

1. Node built-in tests for state transitions, beginning with a verified RED import failure.
2. `npm run verify` from `app-demo`.
3. Playwright CLI at 375/768/1280/1440 plus deterministic 200% equivalent using 640 CSS-pixel viewport for a 1280-pixel desktop canvas.
4. Six required screenshots: hero/proof/guided at desktop and mobile.
5. Keyboard traversal, visible focus, edit/remove phrase, no-choice route, review, failure/retry, uncertainty, reduced motion, overflow, console and unexpected network checks.
6. Three independent critique passes, correction, then full re-verification.
