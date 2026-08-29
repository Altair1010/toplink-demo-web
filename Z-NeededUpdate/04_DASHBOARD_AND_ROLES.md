# 04 — DASHBOARD AND ROLES

> File này mô tả vai trò người dùng, quyền chức năng và khu dashboard nội bộ.

---

## 1. Roles

```txt
super_admin
branch_manager
receptionist
therapist
consultant
marketing
customer
student
partner
```

---

## 2. Dashboard routes

```txt
/dashboard
/dashboard/appointments
/dashboard/customers
/dashboard/customers/[id]
/dashboard/services
/dashboard/packages
/dashboard/products
/dashboard/blog
/dashboard/courses
/dashboard/leads
/dashboard/recruitment
/dashboard/reports
/dashboard/settings
```

Customer account:

```txt
/account
/account/appointments
/account/packages
/account/profile
/account/reviews
```

---

## 3. Super Admin

### Chức năng

```txt
Toàn quyền hệ thống
Quản lý chi nhánh
Quản lý nhân sự
Quản lý phân quyền
Quản lý dịch vụ
Quản lý sản phẩm
Quản lý bài viết
Quản lý khóa học
Quản lý báo cáo
Quản lý cài đặt
```

---

## 4. Quản lý cơ sở

### Chức năng

```txt
Xem dashboard cơ sở
Quản lý lịch hẹn của cơ sở
Quản lý khách hàng của cơ sở
Theo dõi hiệu suất KTV
Theo dõi doanh thu
Xem phản hồi khách hàng
Quản lý nhân sự thuộc cơ sở
```

### Màn hình ưu tiên

```txt
Lịch hôm nay
Khách mới
Khách quay lại
Doanh thu hôm nay
KTV đang bận/rảnh
Lịch chờ xác nhận
Review mới
```

---

## 5. Lễ tân

### Chức năng

```txt
Xem lịch hẹn hôm nay
Tạo lịch hẹn mới
Xác nhận lịch
Đổi giờ hẹn
Hủy lịch
Check-in khách
Gán KTV
Ghi chú nhu cầu khách
Xác nhận thanh toán
Đặt lịch lần sau
```

### Flow

```txt
Khách đặt lịch từ website
→ Lễ tân thấy lịch pending
→ Gọi/Zalo xác nhận
→ Chuyển trạng thái confirmed
→ Khách đến
→ Check-in
→ Gán KTV
→ Hoàn tất dịch vụ
→ Đặt lịch lần sau nếu có
```

---

## 6. Kỹ thuật viên

### Chức năng

```txt
Xem danh sách khách được phân công
Xem dịch vụ cần thực hiện
Xem ghi chú tình trạng khách
Xem checklist quy trình
Tick hoàn thành từng bước
Ghi chú sau trị liệu
Đề xuất chăm sóc lần sau
Đánh dấu hoàn thành buổi trị liệu
```

### Màn hình ca trị liệu

```txt
Thông tin khách
Nhu cầu chính
Dịch vụ
Thời lượng
Lưu ý sức khỏe
Checklist quy trình
Ghi chú nội bộ
Nút hoàn thành
```

---

## 7. Tư vấn viên

### Chức năng

```txt
Xem lead mới
Gọi/Zalo tư vấn
Cập nhật trạng thái lead
Tạo lịch hẹn từ lead
Ghi chú nhu cầu khách
Đề xuất liệu trình
Theo dõi khách chưa đặt lịch
```

### Lead status

```txt
new
contacted
interested
booked
lost
follow_up
```

---

## 8. Marketing

### Chức năng

```txt
Quản lý bài viết SEO
Quản lý banner
Quản lý popup
Quản lý chiến dịch
Theo dõi nguồn lead
Theo dõi tỷ lệ chuyển đổi
Quản lý landing page
Quản lý review nổi bật
```

---

## 9. Khách hàng

### Chức năng

```txt
Xem lịch hẹn
Đổi lịch
Xem lịch sử trị liệu
Xem gói đã mua
Xem số buổi còn lại
Nhận nhắc lịch
Nhận ưu đãi
Đánh giá dịch vụ
Cập nhật thông tin cá nhân
```

Không bắt khách tạo tài khoản trước khi đặt lịch. Đặt lịch bằng số điện thoại trước, tài khoản có thể kích hoạt sau.

---

## 10. Học viên

### Chức năng

```txt
Xem khóa học đã đăng ký
Xem bài học
Theo dõi tiến độ
Làm checklist
Làm bài kiểm tra
Xem chứng nhận
```

---

## 11. Đối tác

### Chức năng

```txt
Xem thông tin hợp tác đã gửi
Theo dõi trạng thái tư vấn
Bổ sung thông tin nếu cần
```

Giai đoạn đầu có thể chưa cần dashboard riêng cho đối tác.

---

## 12. Dashboard tổng quan

### Metrics

```txt
Lịch hẹn hôm nay
Lịch chờ xác nhận
Khách mới
Khách quay lại
Doanh thu
Dịch vụ bán chạy
Tỷ lệ no-show
Tỷ lệ mua gói
Hiệu suất KTV
Nguồn lead
Review mới
```

---

## 13. Appointment statuses

```txt
pending
confirmed
checked_in
in_service
completed
cancelled
no_show
```

---

## 14. Lead statuses

```txt
new
contacted
interested
booked
lost
follow_up
```

---

## 15. UI components dashboard

```txt
DashboardShell
DashboardSidebar
DashboardHeader
RoleGuard
StatCard
AppointmentTable
AppointmentStatusBadge
CustomerProfileCard
CustomerTimeline
TherapyChecklist
LeadKanban
RevenueChart
StaffPerformanceTable
```

---

## 16. Quy tắc bảo mật chức năng

```txt
Super admin: toàn quyền
Branch manager: dữ liệu trong chi nhánh
Receptionist: lịch hẹn, khách hàng, check-in
Therapist: ca được phân công
Consultant: lead và lịch tư vấn
Marketing: content, campaign, lead overview
Customer: dữ liệu của chính mình
Student: khóa học của chính mình
Partner: thông tin hợp tác của chính mình
```
