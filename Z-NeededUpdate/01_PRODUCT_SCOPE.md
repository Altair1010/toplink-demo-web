# 01 — PRODUCT SCOPE

> File này dùng để Claude CLI hiểu phạm vi sản phẩm của website Y Viện Toplink.  
> Không đi sâu database hoặc code. Tập trung vào sản phẩm, tính năng và mục tiêu kinh doanh.

---

## 1. Định vị sản phẩm

Website Y Viện Toplink là một nền tảng số phục vụ 4 mục tiêu:

1. **Thương hiệu**: xây dựng hình ảnh cao cấp, uy tín, có chiều sâu.
2. **Chuyển đổi**: tăng đặt lịch, tư vấn, bán gói liệu trình, bán sản phẩm.
3. **Vận hành**: hỗ trợ lễ tân, kỹ thuật viên, quản lý, marketing.
4. **Mở rộng**: chuẩn bị cho học viện, hợp tác, nhượng quyền và nhiều chi nhánh.

Định vị:

```txt
Y Viện Toplink
Y Viện Dưỡng Thân – Tỉnh Thức
Đông y dưỡng sinh + lý liệu trị liệu + công nghệ cao + chăm sóc cá nhân hóa
```

---

## 2. Nhóm người dùng

### 2.1. Khách hàng mới

Nhu cầu:

```txt
Tìm hiểu dịch vụ
Xem không gian
Xem giá/gói
Đặt lịch nhanh
Nhắn Zalo/gọi tư vấn
Tìm đường đến cơ sở
```

### 2.2. Khách hàng cũ

Nhu cầu:

```txt
Xem lịch hẹn
Đặt lại lịch
Xem gói đã mua
Xem số buổi còn lại
Xem lịch sử trị liệu
Nhận ưu đãi
Đánh giá dịch vụ
```

### 2.3. Lễ tân

Nhu cầu:

```txt
Xem lịch hẹn hôm nay
Tạo lịch hẹn
Xác nhận lịch
Đổi lịch
Check-in khách
Gán kỹ thuật viên
Ghi chú nhu cầu
Xác nhận thanh toán
Đặt lịch lần sau
```

### 2.4. Kỹ thuật viên

Nhu cầu:

```txt
Xem khách được phân công
Xem dịch vụ cần thực hiện
Xem ghi chú tình trạng khách
Checklist quy trình
Ghi chú sau trị liệu
Đề xuất chăm sóc lần sau
Đánh dấu hoàn thành buổi trị liệu
```

### 2.5. Quản lý

Nhu cầu:

```txt
Theo dõi doanh thu
Theo dõi lịch hẹn
Theo dõi nhân sự
Theo dõi hiệu suất KTV
Quản lý dịch vụ
Quản lý sản phẩm
Quản lý bài viết
Quản lý khóa học
Quản lý lead
```

### 2.6. Marketing

Nhu cầu:

```txt
Quản lý bài viết SEO
Quản lý banner
Quản lý popup
Theo dõi nguồn lead
Theo dõi tỷ lệ chuyển đổi
Quản lý chiến dịch
```

### 2.7. Học viên

Nhu cầu:

```txt
Xem khóa học
Đăng ký học
Xem bài học
Theo dõi tiến độ
Làm bài kiểm tra
Nhận chứng nhận
```

### 2.8. Đối tác

Nhu cầu:

```txt
Tìm hiểu mô hình hợp tác
Tìm hiểu nhượng quyền
Đăng ký tư vấn
Để lại thông tin liên hệ
```

---

## 3. Phạm vi chức năng

### 3.1. Public website

```txt
Trang chủ
Giới thiệu
Dịch vụ
Quy trình trị liệu
Không gian Y Viện
Đặt lịch
Sản phẩm
Học viện đào tạo
Hợp tác / nhượng quyền
Tin tức
Tuyển dụng
Liên hệ
Chi nhánh
```

### 3.2. Booking

```txt
Booking 3 bước
Chọn nhu cầu
Chọn dịch vụ hoặc để Toplink tư vấn
Chọn thời gian mong muốn
Nhập thông tin
Gửi yêu cầu
Nhân sự xác nhận lại
```

### 3.3. Dashboard

```txt
Dashboard tổng quan
Quản lý lịch hẹn
Quản lý khách hàng
Quản lý dịch vụ
Quản lý sản phẩm
Quản lý bài viết
Quản lý khóa học
Quản lý lead
Quản lý tuyển dụng
Báo cáo
```

### 3.4. Customer account

```txt
Hồ sơ cá nhân
Lịch hẹn
Lịch sử trị liệu
Gói liệu trình
Ưu đãi
Review
```

### 3.5. Học viện

```txt
Danh sách khóa học
Chi tiết khóa học
Đăng ký học
Bài học
Video
Checklist
Tiến độ học
Chứng nhận
```

### 3.6. Hợp tác / nhượng quyền

```txt
Mô hình hợp tác
Lợi ích khi hợp tác
Toplink hỗ trợ gì
Quy trình hợp tác
Form đăng ký
Lead đối tác
```

---

## 4. Ưu tiên triển khai

### P0 — MVP production

```txt
Trang chủ
Giới thiệu
Dịch vụ
Chi tiết dịch vụ
Quy trình trị liệu
Không gian Y Viện
Đặt lịch
Liên hệ
CTA gọi/Zalo/chỉ đường
Responsive mobile
Dashboard xử lý lịch hẹn cơ bản
```

### P1 — Vận hành cơ bản

```txt
Hồ sơ khách hàng
Lịch sử trị liệu
Gói liệu trình
Dashboard lễ tân
Dashboard KTV
Blog kiến thức sức khỏe
Review khách hàng
Trang sản phẩm
Trang tuyển dụng
```

### P2 — Hệ sinh thái

```txt
Học viện đào tạo
Video bài học
Checklist KTV
Trang hợp tác/nhượng quyền
Quản lý lead đối tác
Popup ưu đãi
Báo cáo marketing
Store locator nhiều cơ sở
```

### P3 — Chuỗi

```txt
Dashboard nhiều chi nhánh
Quản lý hiệu suất từng cơ sở
Quản lý học viên nâng cao
Quản lý đối tác
Quản lý chương trình nhượng quyền
Tự động hóa chăm sóc khách hàng
```

---

## 5. Feature lấy cảm hứng từ website đối tác

Chỉ học cấu trúc tính năng, không clone giao diện y nguyên.

```txt
Đặt lịch trị liệu
Dịch vụ cơ bản / nâng cao / chuyên sâu
Sản phẩm CSSK
Học viện đào tạo
Nhượng quyền / hợp tác
Tin tức / sự kiện / khuyến mãi
Tuyển dụng
Hệ thống trung tâm
Reports Dashboard
Hotline / CTA
```

Cách nâng cấp cho Toplink:

```txt
Booking 3 bước thân thiện hơn
Dịch vụ gợi ý theo nhu cầu khách
Catalog sản phẩm + tư vấn Zalo
LMS mini cho KTV và chủ cơ sở
Landing page hợp tác thu lead
Blog SEO có hệ thống
Trang tuyển dụng chuyên nghiệp
Store locator chuẩn bị mở chuỗi
Dashboard vận hành thực tế
Sticky CTA mobile-first
```
