# DEFECT REGISTER — FOUNDATION

Các mục dưới đây là phát hiện sơ bộ; cần tái kiểm tra đa viewport trước khi xếp P0/P1 chính thức.

| ID | Mức | Chiều | Phát hiện | Ảnh hưởng |
|---|---|---|---|---|
| STT-001 | P1 | Security/asset | Một số background/image URL dùng `http://` trong trang HTTPS | mixed-content, asset có thể không tải |
| STT-002 | P0 | Conversion | Ít nhất 6 link `tel:` không trùng số hiển thị | có thể gọi sai chi nhánh, mất lead và giảm niềm tin |
| STT-003 | P1 | Responsive | Astra và Elementor dùng hai hệ breakpoint chồng lấn | drift ở tablet/intermediate widths |
| STT-004 | P2 | CSS quality | Có media query generated dạng `min-width:-1`/`max-width:-1` | CSS rác, khó bảo trì |
| STT-005 | P1 | Accessibility | Nhiều ảnh nội dung có alt trống hoặc alt là filename | screen reader và SEO yếu |
| STT-006 | P1 | Content | Bảng giá chủ yếu là chuỗi ảnh | khó tìm kiếm, cập nhật, đọc trên mobile và truy cập hỗ trợ |
| STT-007 | P2 | DOM | Navigation xuất hiện lặp nhiều lần trong DOM | tăng nhiễu semantic và chi phí render |
| STT-008 | P2 | Performance | Astra + Elementor/Pro + nhiều addon/widget + chat/floating CTA | JS/CSS payload và xung đột cao |
| STT-009 | P1 | Semantics | Trang chủ có nhiều H1 | hierarchy tài liệu và SEO không tối ưu |
| STT-010 | P2 | Information architecture | Dịch vụ được tổ chức chủ yếu theo bảng giá chi nhánh | khó so sánh dịch vụ xuyên hệ thống |
| STT-011 | CHECK | Assets | Một số ảnh lazy-load chưa hoàn tất ngay lúc snapshot | cần recapture ổn định trước khi kết luận hỏng |
| STT-012 | P1 | SEO | Các route đại diện không có meta description | snippet tìm kiếm không được kiểm soát |
| STT-013 | P1 | Accessibility | Social link có tương phản khoảng 2.29:1 trên nền vàng | không đạt ngưỡng tương phản phổ biến |
| STT-014 | P1 | DOM | Hai ID menu xuất hiện lặp lại | HTML không hợp lệ, selector/ARIA có thể trỏ sai |
| STT-015 | P1 | Semantics | Footer dùng H1 cho tên công ty trên nhiều trang | mọi trang bị phá heading hierarchy |
