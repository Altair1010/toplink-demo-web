# 04 — H4 UX, State and Accessibility Review

- **Ngày kiểm tra:** 2026-08-28
- **Kết quả sau correction:** `PASS`
- **Browser route:** `http://localhost:3000/toplink-demo-web/motion-lab/humanizer-h4/`
- **Server context:** Next dev server chạy trong terminal do Orca quản lý trên port `3000`; browser automation truy cập loopback của cùng môi trường.

## Browser-tool recovery and reverse graph

Theo yêu cầu, `dmn-any-website` chỉ được dùng phần observation/capability ladder cần thiết để đọc runtime DOM/accessibility tree; không init package, crawl, clone hay xuất package artifact. Nó xác nhận route và semantic tree hoạt động. Screenshot/state automation tiếp tục dùng Playwright CLI.

```text
Playwright không ổn định ban đầu
├─ EPERM tại daemon directory trong AppData
│  └─ sandbox không cho daemon ghi
│     └─ chạy project-local CLI theo quyền đã được duyệt → PASS
├─ locator expression bị tách thành nhiều argument
│  └─ PowerShell quoting → CLI parser
│     └─ chuyển sang snapshot ref, sau đó run-code file → PASS
└─ nhầm lẫn server localhost:3000
   └─ server không được chạy ngoài ngữ cảnh Orca
      └─ giữ npm dev trong terminal Orca; browser chỉ truy cập loopback → PASS
```

Không cài dependency, không đổi browser package và không sửa production runtime để giải quyết tooling.

## State and consequence verification

| Path                             | Kết quả thực tế                                                                      |
| -------------------------------- | ------------------------------------------------------------------------------------ |
| Hero “Chia sẻ tình trạng”        | đi tới guided heading; không gửi dữ liệu                                             |
| Hero “Tôi chưa biết nên chọn gì” | hiện no-choice notice; state vẫn `request`; input rỗng; focus tới guided heading     |
| Chọn/sửa phrase                  | exact phrase được giữ tới review; không auto-match service                           |
| Remove phrase                    | input trở về rỗng; không thể review khi rỗng                                         |
| `request → review`               | receipt focus, nhãn “Trạng thái hành động mẫu”, trạng thái nói “Chưa gửi”            |
| `review → sending`               | receipt focus; nói rõ đây là trạng thái mẫu và không có transport                    |
| `sending → failure`              | receipt focus; nói chưa gửi, giữ phrase, có retry/edit/uncertainty                   |
| `failure → retry`                | trở lại `sending`; phrase không mất; receipt focus                                   |
| `sending/failure → uncertainty`  | receipt focus; nói rõ chưa có owner/channel/thời gian và không chuyển tới người thật |
| `uncertainty → edit`             | focus về input `h4-orientation-phrase`                                               |
| Remove phrase / reset prototype  | phrase rỗng và focus trở về input `h4-orientation-phrase`                            |

Reducer không có `confirmed`; unknown event giữ nguyên state; route không có form submit, server action, fetch/XHR hoặc booking transport.

## Health and trust review

- Phrase là ngôn ngữ đời thường; không đưa `Tắc/Hàn/Hư/Loạn` vào UI, kể cả dưới dạng output phủ định.
- Scope boundary luôn nói đây là chuẩn bị cho trao đổi, không phải kết luận.
- Không service recommendation, diagnosis visualization, credential, staff, room, quote hoặc process fact giả.
- Evidence slots lặp rõ “Chưa có bằng chứng được xác minh” và “THIẾU BẰNG CHỨNG”.
- Receipt dùng “Thời gian phản hồi” thay cho SLA và nói `Chưa được xác minh`.
- Không có success visual hoặc lời xác nhận gửi thật.

## Accessibility and responsive results

| Kiểm tra                 | Phương pháp                                                    | Kết quả                                                                            |
| ------------------------ | -------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| 375 / 768 / 1280 / 1440  | Playwright viewport loop                                       | `PASS`; 3 surfaces ở mỗi viewport; `scrollWidth == clientWidth`                    |
| 200% zoom equivalent     | viewport 640 CSS px, tương đương canvas desktop 1280 px ở 200% | `PASS`; không overflow, đủ 3 surfaces                                              |
| Keyboard start           | Tab từ document                                                | skip-link focus 2px; action đầu focus 3px                                          |
| State focus continuity   | kiểm tra `document.activeElement` sau từng transition          | `PASS` cho review/sending/failure/retry/uncertainty; edit trả focus về input       |
| Touch target             | computed layout + CSS review                                   | buttons/input/summary tối thiểu 44px trong critical path                           |
| Reduced motion           | `page.emulateMedia({ reducedMotion: "reduce" })`               | `PASS`; animation `none`, duration `0s`, hero hiện ngay, guided scroll dùng `auto` |
| DOM/visual order         | source + browser reading order                                 | `PASS`; ED-07 không còn đảo bằng CSS `order`                                       |
| Console                  | listener trên toàn browser journey                             | `0` error                                                                          |
| Unexpected state network | request listener                                               | `0` POST/fetch/XHR                                                                 |

## Independent reviews and correction loop

### Pass 1 — Brand/UI

Initial result `PARTIAL`: rail C chạy tới cạnh HP-07 và screenshot bị focus artifact. Receipt đã được tách thành row riêng, ảnh đã chụp lại. Re-review: `PASS`.

### Pass 2 — UX/Trust/Health

Initial result `PASS WITH CORRECTIONS`: taxonomy phủ định, “SLA” và focus continuity cần chỉnh. Tất cả đã sửa và browser reverify. Re-review: `PASS`.

### Pass 3 — Engineering/Accessibility

Initial result `PARTIAL`: focus state và reduced-motion smooth-scroll là blocking. Đã thêm focus management, `aria-atomic`, reduced-motion branch, DOM-order correction, input name và local semantic color variables. Browser reverify: `PASS`.

## Residual non-blocking risks

- Annotation ED tiếng Anh chỉ là nhãn nội bộ prototype; H5 không được đưa nó vào visitor layer.
- Ba-slot proof composition cần real documentary material để chứng minh Toplink specificity, nhưng không được lấp bằng stock/synthetic evidence.
- 200% test là deterministic CSS-viewport equivalent, không phải thao tác browser chrome zoom bằng tay; H5/Gate C vẫn cần manual acceptance trên browser target.
