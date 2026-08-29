# 08 — IMPLEMENTATION ROADMAP

> File này chia giai đoạn triển khai để Claude CLI không cố làm toàn bộ cùng lúc.

---

## Phase 0 — Setup codebase

### Mục tiêu

Tạo nền móng codebase production-ready.

### Việc cần làm

```txt
Create Next.js App Router project
Install Tailwind CSS
Install shadcn/ui
Setup TypeScript strict
Setup ESLint
Setup Prettier nếu cần
Setup Supabase client/server
Setup .env.example
Setup folder structure
Setup basic layout
Setup site header/footer/mobile bottom bar
```

### Output

```txt
App chạy được
Layout public hoạt động
Mobile bottom bar hoạt động
Build không lỗi
```

---

## Phase 1 — Public website P0

### Mục tiêu

Ra được website chính thức để giới thiệu và nhận lịch.

### Routes

```txt
/
 /gioi-thieu
 /dich-vu
 /dich-vu/[slug]
 /quy-trinh-tri-lieu
 /khong-gian
 /dat-lich
 /lien-he
```

### Components

```txt
HeroSection
NeedSelector
ServiceCard
ProcessTimeline
SpaceGallery
BookingForm
ContactForm
CTASection
MobileBottomBar
```

### Acceptance criteria

```txt
Responsive mobile tốt
Có CTA gọi/Zalo/chỉ đường
Form booking submit được
Nội dung không dùng claim chữa bệnh
Build không lỗi
```

---

## Phase 2 — Database & booking backend

### Mục tiêu

Kết nối Supabase, lưu booking/lead thật.

### Việc cần làm

```txt
Run initial Supabase SQL schema
Create Supabase server client
Create booking validator bằng Zod
Create booking server action
Validate phone/name/need_type
Create lead hoặc appointment từ booking
Add success/error states
Add simple dashboard appointment list
```

### Acceptance criteria

```txt
Submit booking từ website
Dữ liệu lưu vào Supabase
Dashboard thấy lịch mới
Form có loading/error/success
Không expose service role key ra client
```

---

## Phase 3 — Dashboard cơ bản

### Mục tiêu

Lễ tân và quản lý xử lý lịch hẹn.

### Routes

```txt
/dashboard
/dashboard/appointments
/dashboard/customers
/dashboard/customers/[id]
```

### Features

```txt
Login
Role guard cơ bản
List appointments
Filter appointments by status/date
Update appointment status
Create customer
View customer detail
Add customer note
```

### Acceptance criteria

```txt
Chỉ user được phân quyền vào dashboard
Lễ tân xử lý lịch được
Quản lý xem tổng quan được
```

---

## Phase 4 — Services, packages, customer care

### Mục tiêu

Quản lý dịch vụ và gói liệu trình.

### Routes

```txt
/dashboard/services
/dashboard/packages
/account/appointments
/account/packages
```

### Features

```txt
CRUD services
CRUD service packages
Assign package to customer
Track remaining sessions
Customer can view appointments/packages
```

---

## Phase 5 — Content & SEO

### Mục tiêu

Tạo hệ thống nội dung SEO.

### Routes

```txt
/tin-tuc
/tin-tuc/[slug]
/dashboard/blog
```

### Features

```txt
Blog category
Blog post
Published/draft status
SEO metadata
Related posts
CTA trong bài viết
```

### Chủ đề SEO giai đoạn đầu

```txt
Cổ vai gáy
Mất ngủ
Stress
Xông hơi
Ngâm chân
Gội đầu dưỡng sinh
Massage trị liệu
Dưỡng sinh Đông y
Khí huyết
Thần kinh tự chủ
Liệu pháp nóng lạnh
```

---

## Phase 6 — Products

### Mục tiêu

Catalog sản phẩm + tư vấn.

### Routes

```txt
/san-pham
/san-pham/[slug]
/dashboard/products
```

### Features

```txt
Product categories
Product listing
Product detail
CTA Zalo tư vấn
Admin quản lý sản phẩm
```

Chưa cần thanh toán online ở phase này.

---

## Phase 7 — Recruitment

### Mục tiêu

Tuyển nhân sự.

### Routes

```txt
/tuyen-dung
/dashboard/recruitment
```

### Features

```txt
Job posts
Application form
CV URL upload nếu cần
Application status
```

---

## Phase 8 — Academy

### Mục tiêu

Học viện đào tạo.

### Routes

```txt
/hoc-vien
/hoc-vien/[slug]
/dashboard/courses
```

### Features

```txt
Course list
Course detail
Lessons
Enrollments
Student progress
Video lessons
Checklist
```

---

## Phase 9 — Partnership / franchise

### Mục tiêu

Thu lead hợp tác và nhượng quyền.

### Routes

```txt
/hop-tac
/nhuong-quyen
/dashboard/leads
```

### Features

```txt
Partnership landing page
Franchise form
Lead pipeline
Lead status
Assigned consultant
```

---

## Phase 10 — Multi-branch & reports

### Mục tiêu

Chuẩn bị mở chuỗi.

### Routes

```txt
/chi-nhanh
/chi-nhanh/[slug]
/dashboard/reports
```

### Features

```txt
Store locator
Branch detail
Filter by branch
Reports by branch
Staff performance
Lead source reports
Appointment conversion
Revenue overview
```

---

## Prompt làm việc theo phase cho Claude CLI

```txt
Hãy chỉ làm Phase [số phase] theo file 08_IMPLEMENTATION_ROADMAP.md.

Không làm lan sang phase sau trừ khi cần tạo placeholder rất nhỏ.

Sau khi code:
1. Chạy lint.
2. Chạy build.
3. Sửa lỗi.
4. Báo cáo file đã tạo/sửa.
5. Báo cáo phần còn thiếu.
```
