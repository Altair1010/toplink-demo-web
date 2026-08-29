# SEN TÀI THU — WEB DNA FOUNDATION v0.2

Ngày quan sát: 2026-08-21  
Phạm vi: `https://sentaithu.com.vn/` và các route công khai cùng domain  
Cơ sở quyền: người dùng xác nhận được cấp đầy đủ quyền bởi người quản lý website  
Mục tiêu: khảo cổ website, bóc UI/brand DNA và lập nền cho baseline parity 90+

## Trạng thái

G0 Governance: PASS.  
G1 Universe: ADVANCED — 20 route render trực tiếp, hơn 40 URL nội bộ phát hiện theo navigation/pagination.  
G2 Evidence: PARTIAL — DOM/rendered styles desktop, 84 asset references, semantic/a11y và motion configuration.  
G3 Web DNA: ADVANCED FOUNDATION — token, component grammar, UI mindset, route/asset/motion IR và defect register.  
G4–G7: CHƯA CHẠY — chưa dựng baseline, chưa visual diff đa viewport, chưa thể tuyên bố parity.

## Đọc theo thứ tự

1. `governance/decision-lock.json`
2. `inventory/site-foundation.json`
3. `ir/design-tokens.json`
4. `UI_MINDSET.md`
5. `qa/defects.md`
6. `qa/scorecard.json`
7. `inventory/route-census-v0.2.json`
8. `inventory/asset-manifest-v0.2.json`
9. `ir/interaction-motion-v0.2.json`
10. `qa/accessibility-semantic-audit-v0.2.md`

## Kết luận nhanh

Website dùng WordPress 7.1, Astra 4.8.10 và Elementor 4.2.3/Pro 3.31.0. Cấu trúc tập trung vào thương hiệu, dịch vụ theo chi nhánh, tin tức và chuyển đổi đặt lịch. Hệ nhận diện số nhất quán ở xanh rừng, trắng/kem, vàng kim; Playfair Display kết hợp Open Sans. Nợ kỹ thuật chính nằm ở breakpoint chồng lấn, DOM menu/footer bị lặp, asset HTTP trong trang HTTPS, nội dung/bảng giá phụ thuộc ảnh, metadata và khả năng truy cập chưa sâu.

## Giới hạn bằng chứng

- Chưa truy cập admin hoặc source repository.
- Chưa crawl sitemap/robots thành công qua kênh hiện tại.
- Chưa submit form, không tạo dữ liệu bên ngoài.
- Chưa có capture tablet/mobile và chưa chạy Motion Capture v5 đầy đủ.
- Các ảnh lazy-load được ghi là cần tái kiểm tra; không tự động coi là ảnh hỏng.
