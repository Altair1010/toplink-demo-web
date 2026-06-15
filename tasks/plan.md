# Kế hoạch: Hoàn thiện webdemo Y Viện Toplink theo FORM

## Context
Dùng FORM `Z-NeededUpdate/FORM-Hoan-Thien-Website-Y-Vien-Toplink.pages` (form trống — dùng làm
checklist A–J, lấy giá trị "Hiện: ..." làm mặc định) để chỉnh sửa & cải thiện webdemo `app-demo/`,
preview cho duyệt, rồi push lên GitHub (auto-deploy Pages). Không có ảnh thật / không cào dữ liệu
đối thủ → dùng visual on-brand (SVG), thay ảnh thật sau.

## Đã thực hiện (theo phần FORM)
- A/B Thương hiệu & tokens: favicon, giữ bộ nhận diện đã áp.
- C Liên hệ: thêm email/Facebook/Zalo vào CONTACT, nhúng Google Maps từng cơ sở.
- D Cấu trúc: Header/Footer thêm Đào tạo & Nhượng quyền; footer đủ khối.
- E Trang/section: dải Số liệu/Niềm tin (home); trang Đào tạo, Nhượng quyền; chi tiết bài viết.
- F Dữ liệu: TEAM (đội ngũ), STATS, body POSTS, TRAINING, FRANCHISE.
- G Hình ảnh: component BrandVisual thay mọi placeholder; OG image tự sinh.
- H Chuyển đổi: form đặt lịch xác nhận + chuyển Zalo.
- I SEO: metadata + OpenGraph từng trang, JSON-LD HealthAndBeautyBusiness.
- J Giọng văn: rà soát, không còn từ cấm.

## File chính
content.ts · layout.tsx · page.tsx · SiteHeader/SiteFooter/MobileBottomBar · BookingStepper ·
BrandVisual (mới) · app/dao-tao · app/nhuong-quyen · app/tin-tuc/[slug] · app/icon.svg · app/opengraph-image.tsx

## Verify
- `npm run build`: pass, 26 route static export (gồm [slug], OG, favicon).
- Preview localhost:3000/toplink-demo-web — 7 screenshot, 0 lỗi console.
- Push `main` → GitHub Actions deploy Pages.
