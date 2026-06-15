# TODO — Hoàn thiện webdemo Y Viện Toplink theo FORM

Nguồn kế hoạch: `C:\Users\MCBAu\.claude\plans\read-f-codex-yvien-hotlink-polished-blanket.md`

## Phase 1 — Dữ liệu & nội dung
- [x] 1. Mở rộng `data/content.ts`: TEAM[], STATS[], body POSTS, CONTACT (email/social), TRAINING & FRANCHISE
- [x] 2. Rà soát copy theo J (không còn từ cấm)

## Phase 2 — Trang & section mới
- [x] 3. Section "Số liệu/Niềm tin" trên home
- [x] 4. Trang Đào tạo `/dao-tao`
- [x] 5. Trang Nhượng quyền `/nhuong-quyen`
- [x] 6. Chi tiết bài viết `/tin-tuc/[slug]` + generateStaticParams
- [x] 7. Khối đội ngũ (gioi-thieu)

## Phase 3 — Điều hướng, chuyển đổi, liên hệ
- [x] 8. Header/Footer/MobileBar: nav trang mới, footer đầy đủ khối
- [x] 9. Google Maps nhúng ở lien-he
- [x] 10. Form đặt lịch: xác nhận + chuyển Zalo

## Phase 4 — Hình ảnh & SEO
- [x] 11. BrandVisual thay placeholder + favicon (app/icon.svg) + OG (opengraph-image)
- [x] 12. SEO metadata từng trang + OpenGraph + JSON-LD LocalBusiness

## Phase 5 — Build, Preview, Push
- [x] 13. `npm run build` pass (26 route, static export). Lưu ý: `next lint` lỗi thời ở Next 16 (có sẵn)
- [x] 14. Preview (dev + 7 screenshot) — CHỜ NGƯỜI DÙNG DUYỆT
- [ ] 15. Push GitHub (sau khi duyệt) — gỡ ảnh screenshot ở root trước khi commit
