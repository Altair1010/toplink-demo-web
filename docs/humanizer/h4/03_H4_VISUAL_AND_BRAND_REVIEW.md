# 03 — H4 Visual and Brand Review

- **Ngày review:** 2026-08-28
- **Đối tượng:** prototype thực tế tại `/motion-lab/humanizer-h4/`
- **Review mode:** độc lập `BRAND / UI → correction → re-review`
- **Kết quả:** `PASS`

## Evidence posture

- **REAL EVIDENCE:** chưa có ảnh nơi chốn, con người/vai trò công khai hoặc quy trình Toplink được duyệt.
- **REFERENCE EVIDENCE:** H2 semantic contracts, H3 Direction B và Gate A bounded hybrid.
- **RUNTIME EVIDENCE:** source route cô lập và sáu ảnh Playwright trong `screenshots/`.
- **PROPOSED DESIGN:** toàn bộ màu, typography behavior, composition và motion trong prototype.
- **MISSING EVIDENCE:** ED-03, ED-04 và ED-07 vẫn là slot; không được xem như proof đã populated.

## Pass 1 findings and corrections

| Finding ban đầu                                                              | Mức    | Correction cục bộ                                                                                                               | Re-review                                              |
| ---------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Rail của editable phrase chạy cạnh receipt, làm import C có vẻ kéo tới HP-07 | Medium | Tách receipt thành grid row full-width riêng; rail ink kết thúc cùng guided orientation/scope boundary; band đỏ HP-07 giữ riêng | `PASS` — C chỉ còn ở HP-02/HP-03                       |
| Screenshot proof bị skip-link đang focus đè lên                              | Medium | Chụp lại visual evidence ở trạng thái không focus; browser test riêng vẫn chứng minh skip-link và focus ring                    | `PASS` — ảnh cuối sạch, accessibility không bị làm yếu |
| Ba khung evidence có nguy cơ thành wireframe/archive motif                   | Low    | Giữ placeholder trung tính chỉ trong H4; ghi guardrail phải thay bằng documentary evidence khi có dữ liệu thật                  | `PASS WITH DEPENDENCY`                                 |
| Dải consequence ba cột có nguy cơ hành chính                                 | Low    | Duy trì một receipt duy nhất, heading/câu Việt ưu tiên trước metadata; stack một cột ở viewport hẹp                             | `PASS WITH WATCH`                                      |

## Brand/UI conclusions

- **Không generic wellness:** không stock spa, herb motif, glow, glass, serif-prestige, gold hoặc lời hứa luxury.
- **Không admin dashboard:** proof index dùng editorial scale, bất đối xứng và progressive disclosure; không table, filter, status dashboard hay archive cosplay.
- **A import được giới hạn:** crimson chỉ là warm threshold ở opening và band quyết định HP-07; paper/ink giữ ưu thế.
- **C import được giới hạn:** editable phrase và rail chỉ tồn tại trong HP-02/HP-03; không seam toàn site, không sinh lý học, không diagnostic motion.
- **B là spine:** cover record, accountable gaps, scope boundary, proof index và action receipt cùng dùng một grammar hồ sơ có giới hạn.

## Humanizer visual tests

| Test                                           | Kết quả                | Quan sát                                                                             |
| ---------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------ |
| A — Ấm và human, không quay về Đông-y luxury   | `PASS`                 | Warm threshold mạnh nhưng chỉ một sự kiện; sans-first và paper/ink chặn red-luxury.  |
| B — Accountability, không clinical/admin       | `PASS`                 | Slot nói thẳng thiếu bằng chứng; metadata nằm sau nội dung và disclosure.            |
| C — Editable phrase tự nhiên, không diagnostic | `PASS`                 | Cụm từ đời thường, có sửa/xóa; không taxonomy hoặc service match.                    |
| D — Receipt rõ hậu quả, không bureaucratic     | `PASS`                 | “Chưa gửi”, recovery và uncertainty nổi bật hơn metadata.                            |
| E — Thiết kế còn mạnh khi evidence rỗng        | `PASS WITH DEPENDENCY` | Composition đứng vững; Toplink specificity cuối cùng vẫn phụ thuộc ED-03/04/07 thật. |

## Screenshot evidence

- `screenshots/h4-hero-desktop-1440.png`
- `screenshots/h4-hero-mobile-375.png`
- `screenshots/h4-proof-index-desktop-1440.png`
- `screenshots/h4-proof-index-mobile-375.png`
- `screenshots/h4-guided-review-desktop-1280.png`
- `screenshots/h4-guided-failure-mobile-375.png`

Các ảnh surface được chụp ở trạng thái không focus để không lẫn skip-link vào composition. Skip-link và focus-visible được kiểm tra riêng bằng keyboard automation; ảnh không thay thế bằng chứng accessibility.

## H5 guardrails

- Không biến placeholder X-frame hoặc mã ED thành motif public/permanent.
- Không đưa annotation nội bộ vào production visitor layer.
- Không tăng tần suất crimson, ornament hoặc prestige treatment.
- Không mở rộng rail/editable phrase ra ngoài guided orientation.
- Không system-lock material/photography khi chưa có bằng chứng Toplink thật.
