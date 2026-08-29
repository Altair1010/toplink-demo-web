# G1 Route Census Report

**Nguồn:** https://trieudongy.vn/  
**Ngày census:** 13/08/2026  
**Trạng thái:** READY FOR GATE G1 REVIEW

## Kết quả

- Tổng route nội bộ hợp lệ đã phát hiện: **634**
- Trang đã mở và đọc DOM: **71**
- Captured: **70**
- Discovered, chờ direct check ở M2: **563**
- Failed trong census: **1**
- P0: **6** · P1: **21** · P2: **607**

## Archetype inventory

| Archetype | Routes | Captured |
|---|---:|---:|
| entity-huyet | 166 | 1 |
| article | 100 | 0 |
| entity-vi-thuoc | 55 | 0 |
| acupuncture-article | 47 | 1 |
| archive-pagination | 46 | 41 |
| theory-detail | 41 | 0 |
| condition-detail | 29 | 0 |
| entity-kinh-mach | 29 | 0 |
| trigger-point-detail | 23 | 0 |
| entity-bai-thuoc | 22 | 0 |
| expert-detail | 19 | 0 |
| archive | 17 | 17 |
| service-or-clinical-article | 14 | 0 |
| content-detail | 14 | 0 |
| service-detail | 3 | 1 |
| legal | 2 | 2 |
| foundation-page | 2 | 2 |
| contact | 2 | 2 |
| homepage | 1 | 1 |
| stories | 1 | 1 |
| interactive-tool | 1 | 1 |

## Phạm vi đề xuất cho G1

- **Include:** toàn bộ 634 route vào content/metadata migration scope.
- **Tier A deep capture:** homepage, tra cứu bộ huyệt, contact/form, knowledge hub/archive chính, article/entity detail, service detail.
- **Tier B:** 2–3 exemplar đa dạng cho mỗi archetype.
- **Tier C:** các trang lặp theo template; migrate toàn bộ content nhưng QA theo template + sampling.
- **Exclude:** external origin, fragment-only URL, tracking query, feeds và binary assets khỏi route graph; asset sẽ vào Asset Graph riêng.

## Hạn chế đã ghi nhận

1. Browser/network hiện tại chặn truy cập trực tiếp robots.txt và XML/JSON endpoints.
2. Census dùng rendered navigation, pagination và internal-link graph.
3. Route ở trạng thái `discovered` sẽ được direct-check ở M2; chưa claim HTTP/render success.
4. Full sitemap reconciliation vẫn là verification task khi capture harness có đường truy cập phù hợp.

## Gate recommendation

**APPROVE G1 WITH RECORDED LIMITATION.** Phạm vi đủ rõ để triển khai capture harness pilot mà không cần đoán taxonomy.

