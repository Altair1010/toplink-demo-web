# UI MINDSET — SEN TÀI THU

## Tư tưởng quan sát được

Website đặt **uy tín truyền thống** trước tính công nghệ. Màu xanh rừng tạo cảm giác y học, an toàn và điềm tĩnh; serif Playfair Display tạo chiều sâu di sản, còn Open Sans giữ phần vận hành dễ đọc. Trang chủ mở bằng một tuyên ngôn phục hồi, sau đó dẫn người xem qua bằng chứng về không gian, dịch vụ và con người rồi mới mở rộng danh mục.

Hệ thống không bán từng thủ thuật như một marketplace. Nó bán một thế giới trải nghiệm: văn hóa Hà Nội, Y học cổ truyền Việt Nam, nghỉ dưỡng và phục hồi. CTA đặt lịch là hành động trung tâm, lặp lại ở trang chủ, liên hệ và bảng giá.

## Component grammar

- Header trong suốt/chìm trên hero, logo trắng và menu ngang.
- Hero toàn màn hình, nội dung lệch trái, khoảng thở lớn.
- Editorial split: tiêu đề serif + đoạn diễn giải sans-serif.
- Ba trụ cột: Không gian / Dịch vụ / Con người.
- Service narrative: danh sách liệu pháp + khối diễn giải + CTA.
- Slider ảnh cho dịch vụ/không gian.
- Price page phụ thuộc chuỗi ảnh dọc, sau đó là booking form.
- Footer rất lớn, chia theo vùng chi nhánh và liên hệ.

## Brand DNA quan sát được

1. **Heritage:** hơn 30 năm, gắn với trị liệu cổ truyền Việt Nam.
2. **Clinical trust:** nguồn gốc liên hệ Bệnh viện Châm cứu Trung ương.
3. **Premium calm:** xanh sâu, vàng kim, serif, ảnh không gian.
4. **Warm femininity:** ngôn ngữ dịu, thảo mộc, chăm sóc, phục hồi.
5. **Network scale:** hệ thống nhiều chi nhánh được dùng như bằng chứng xã hội.

## Keep / Evolve / Remove

### Keep

- Cặp font Playfair Display + Open Sans.
- Xanh rừng và kem làm nền nhận diện.
- Hero ít chữ, CTA rõ.
- Cấu trúc kể chuyện Không gian–Dịch vụ–Con người.
- Nhấn mạnh di sản và mạng lưới chi nhánh.

### Evolve

- Chuẩn hóa token thành một nguồn duy nhất thay vì CSS theo từng widget.
- Hợp nhất breakpoint Astra và Elementor.
- Chuyển bảng giá từ ảnh sang dữ liệu HTML có schema, tìm kiếm và khả năng cập nhật.
- Rút gọn footer theo ngữ cảnh; tạo branch finder thay cho danh sách dài.
- Chuẩn hóa CTA, form validation, trạng thái loading/success/error.
- Làm rõ hierarchy giữa “dịch vụ”, “gói”, “chi nhánh” và “bảng giá”.

### Remove / Repair

- Asset `http://` trên trang HTTPS.
- DOM menu/header lặp không cần thiết nếu không phục vụ responsive có kiểm soát.
- Link điện thoại có text và `tel:` không khớp.
- Breakpoint âm hoặc vô hiệu do CSS generated (`min-width:-1`, `max-width:-1`).
- Alt text kiểu filename hoặc để trống trên ảnh nội dung quan trọng.
- Phụ thuộc plugin chồng lấn cho các chức năng nhỏ.

