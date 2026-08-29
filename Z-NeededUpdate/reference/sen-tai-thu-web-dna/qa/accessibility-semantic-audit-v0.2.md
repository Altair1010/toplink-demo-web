# ACCESSIBILITY & SEMANTIC AUDIT v0.2

## Bằng chứng desktop trang chủ

- Có `header`, nhiều `nav`, một `main` và `footer role=contentinfo`.
- `nav` bị nhân đôi: bốn landmark navigation được quan sát, hai cặp dùng cùng cấu trúc.
- ID `menu-1-d11f34c` và `menu-2-d11f34c` xuất hiện hai lần.
- Trang chủ có ba H1 hiển thị: hero, phần giới thiệu dịch vụ và tên công ty trong footer.
- Các trang đại diện khác thường có hai H1 vì tên công ty ở footer cũng dùng H1.
- Nhiều trang không có meta description.
- Trang Tin tức: 9/12 ảnh không có alt.
- Trang Tuyển dụng: 9/12 ảnh không có alt.
- Trang Nhượng quyền: 2/7 ảnh không có alt.
- Trang chủ có ba ảnh icon `space/service/people` không có alt và không tải được trong snapshot do URL HTTP.
- Social link Facebook/Twitter/Youtube có tương phản đo được khoảng 2.29:1 trên nền vàng, dưới ngưỡng WCAG thông thường.
- Skip link được phát hiện nhưng phép đo màu trên trạng thái hiện tại cho tỷ lệ 1:1; cần kiểm tra trạng thái focus trước khi kết luận lỗi sử dụng.

## Lỗi dữ liệu chuyển đổi

Các cặp hiển thị → `tel:` không khớp được quan sát:

- 0392 596 966 → 0243 352 8989
- 0325 152 966 → 0243 223 9795
- 0336 529 899 → 0243 359 7555
- 0372 929 239 → 0243 366 1661
- 0338 853 588 → 0236 383 6888
- Ngoài ra cần đối soát toàn bộ branch directory với footer vì dữ liệu địa chỉ/số điện thoại thay đổi theo thời gian.

## Form

Form đặt lịch có `name`, `phoneNumber` bắt buộc và `branch` select. Chưa submit hoặc kích hoạt validation vì thao tác đó có thể gửi dữ liệu ra ngoài; audit hiện chỉ xác nhận cấu trúc DOM.

## Ưu tiên sửa

1. Đối soát toàn bộ số điện thoại hiển thị và href.
2. Đổi tên công ty footer từ H1 sang heading phù hợp hoặc text semantic.
3. Chỉ giữ một navigation tree hoạt động cho mỗi viewport; tránh ID trùng.
4. Bổ sung meta description theo archetype.
5. Chuẩn hóa alt text và đánh dấu ảnh trang trí bằng alt rỗng có chủ đích.
6. Sửa màu social links và kiểm tra focus-visible/keyboard.
7. Chuyển bảng giá ảnh thành nội dung HTML có thể đọc bằng assistive technology.

