# MASTER SPEC — WEBSITE Y VIỆN TOPLINK

> Bản đặc tả tổng hợp để dùng với Claude CLI / Claude Code khi xây dựng website chính thức cho Y Viện Toplink.  
> Bao gồm: định hướng sản phẩm, UI/UX, tính năng, route, dashboard, database schema, Supabase SQL, folder structure và roadmap triển khai.

---

## 0. Mục tiêu tổng thể

Website Y Viện Toplink không nên chỉ là website giới thiệu. Nên phát triển thành một **nền tảng vận hành số** cho toàn bộ mô hình Y Viện.

Mục tiêu:

1. Xây dựng thương hiệu Y Viện Toplink cao cấp, uy tín, có chiều sâu.
2. Tăng chuyển đổi đặt lịch, tư vấn, bán gói liệu trình và sản phẩm.
3. Hỗ trợ vận hành nội bộ: lễ tân, kỹ thuật viên, quản lý, marketing.
4. Chuẩn bị nền móng mở rộng: học viện đào tạo, hợp tác, nhượng quyền, nhiều chi nhánh.
5. Tạo hệ thống nội dung SEO cho chăm sóc sức khỏe, dưỡng sinh Đông y, trị liệu và phục hồi.

Định vị:

```txt
Y Viện Toplink
Y Viện Dưỡng Thân – Tỉnh Thức
Đông y dưỡng sinh + lý liệu trị liệu + công nghệ cao + chăm sóc cá nhân hóa
```

Tinh thần website:

```txt
Sang trọng
Thân thiện
Dễ hiểu
Dễ đặt lịch
Có chiều sâu chuyên môn
Phù hợp khách trung niên và khách quan tâm sức khỏe chủ động
```

---

## 1. Tech stack đề xuất

### 1.1. Frontend

```txt
Next.js App Router
TypeScript
Tailwind CSS
shadcn/ui
Framer Motion
React Hook Form
Zod
Lucide Icons
```

### 1.2. Backend / Platform

```txt
Supabase Auth
Supabase PostgreSQL
Supabase Storage
Supabase Row Level Security
Next.js Server Actions
Next.js Route Handlers
```

### 1.3. Deploy

```txt
GitHub
Vercel
Custom Domain
HTTPS
Environment Variables
Preview Deployments
```

---

## 2. Kiến trúc sản phẩm

Website gồm 4 lớp chính:

```txt
Public Website
→ Booking / Lead Capture
→ Customer Account
→ Internal Dashboard
```

Mở rộng về sau:

```txt
Shop sản phẩm
Học viện đào tạo
Hợp tác / nhượng quyền
Multi-branch operations
Marketing analytics
```

---

## 3. Public website

### 3.1. Các trang chính

```txt
/
 /gioi-thieu
 /dich-vu
 /dich-vu/co-ban
 /dich-vu/nang-cao
 /dich-vu/chuyen-sau
 /dich-vu/[slug]
 /quy-trinh-tri-lieu
 /khong-gian
 /dat-lich
 /san-pham
 /san-pham/[slug]
 /hoc-vien
 /hoc-vien/[slug]
 /hop-tac
 /nhuong-quyen
 /tin-tuc
 /tin-tuc/[slug]
 /tuyen-dung
 /lien-he
 /chi-nhanh
 /chi-nhanh/[slug]
```

---

## 4. Trang chủ

Trang chủ là hành trình chuyển đổi từ vấn đề của khách hàng sang giải pháp của Toplink.

### 4.1. Block đề xuất

1. Hero section.
2. Module “Hôm nay cơ thể bạn đang cần gì?”.
3. Vấn đề khách thường gặp.
4. Giải pháp của Toplink.
5. Dịch vụ nổi bật.
6. Quy trình trị liệu.
7. Không gian Y Viện.
8. Đội ngũ chuyên môn.
9. Cảm nhận khách hàng.
10. Sản phẩm hỗ trợ.
11. FAQ.
12. CTA đặt lịch cuối trang.

### 4.2. Module chọn nhu cầu

```txt
Hôm nay cơ thể bạn đang cần gì?

[Thư giãn]
[Ngủ ngon hơn]
[Cổ vai gáy]
[Lưng eo]
[Giảm căng thẳng]
[Phục hồi năng lượng]
[Dưỡng sinh định kỳ]
[Tư vấn liệu trình]
```

Khi khách chọn nhu cầu, website gợi ý dịch vụ phù hợp và dẫn tới booking.

---

## 5. Dịch vụ

### 5.1. Phân tầng dịch vụ

```txt
Dịch vụ cơ bản
- Gội đầu dưỡng sinh
- Ngâm chân thảo dược
- Xông hơi thư giãn
- Massage thư giãn

Dịch vụ nâng cao
- Trị liệu cổ vai gáy
- Trị liệu lưng eo
- Dưỡng sinh khí huyết
- Phục hồi năng lượng

Dịch vụ chuyên sâu
- Liệu trình Thân – Tâm – Trí
- Liệu trình nóng – lạnh
- Liệu trình công nghệ cao kết hợp Đông y
- Liệu trình cá nhân hóa theo tình trạng cơ thể
```

### 5.2. Trang chi tiết dịch vụ

Mỗi trang dịch vụ cần có:

```txt
Tên dịch vụ
Mô tả ngắn
Vấn đề phù hợp
Ai nên dùng
Ai cần thận trọng
Thời lượng
Quy trình
Cảm giác sau buổi trị liệu
Giá / gói
Ảnh thật
FAQ
CTA đặt lịch
CTA Zalo
```

### 5.3. Ngôn ngữ an toàn sức khỏe

Nên dùng:

```txt
Hỗ trợ thư giãn
Hỗ trợ lưu thông khí huyết
Hỗ trợ cải thiện cảm giác căng mỏi
Góp phần cân bằng thân – tâm – trí
Không thay thế tư vấn y khoa chuyên môn
```

Không dùng:

```txt
Chữa khỏi
Cam kết khỏi
Điều trị dứt điểm
Thay thế bác sĩ
Khỏi bệnh hoàn toàn
```

---

## 6. Quy trình trị liệu

Trang này cần tăng niềm tin, cho thấy Toplink làm việc có quy trình.

Các bước:

1. Tiếp nhận tình trạng khách.
2. Lắng nghe nhu cầu cơ thể.
3. Tư vấn liệu trình phù hợp.
4. Làm ấm cơ thể bằng xông/ngâm.
5. Thực hiện trị liệu chính.
6. Thư giãn phục hồi.
7. Dặn dò sau trị liệu.
8. Hẹn lịch chăm sóc tiếp theo.

Cách trình bày:

```txt
Timeline dọc trên mobile
Timeline ngang trên desktop
Icon minh họa từng bước
Ảnh thật ở mỗi giai đoạn
CTA đặt lịch cuối quy trình
```

---

## 7. Đặt lịch

### 7.1. Booking 3 bước

```txt
Bước 1: Chọn nhu cầu
Bước 2: Chọn dịch vụ hoặc để Toplink tư vấn
Bước 3: Nhập thông tin và thời gian mong muốn
```

### 7.2. Form tối giản

```txt
Họ tên
Số điện thoại
Nhu cầu chính
Ngày/giờ mong muốn
Cơ sở muốn đến
Ghi chú thêm nếu có
```

### 7.3. Nút đặc biệt

```txt
Tôi chưa biết chọn dịch vụ nào
```

Sau khi chọn:

```txt
Chị/anh mô tả tình trạng cơ thể hiện tại. Toplink sẽ gọi lại để tư vấn liệu trình phù hợp.
```

---

## 8. Không gian Y Viện

Cấu trúc theo tầng:

```txt
Tầng 1 – Tĩnh
Tiếp khách, lễ tân, check-in, tủ dược liệu

Tầng 2 – Thông
Gội dưỡng sinh, trị liệu, ngâm chân

Tầng 3 – Dưỡng
Xông, ngâm bồn, thư giãn phục hồi

Tầng 4 – Tỉnh
Trà, thiền, cộng đồng, chia sẻ sức khỏe
```

Cách thể hiện:

```txt
Ảnh thật từng tầng
Video ngắn không gian
Mô tả cảm xúc từng khu vực
Nút đặt lịch sau mỗi tầng
Gallery cao cấp
Before/After thi công nếu muốn kể hành trình
```

---

## 9. Sản phẩm

Trang sản phẩm nên là catalog + tư vấn, chưa cần ecommerce phức tạp ở giai đoạn đầu.

Nhóm sản phẩm:

```txt
Máy sức khỏe
Thảo dược
Gói liệu trình
Sản phẩm hỗ trợ chăm sóc tại nhà
```

Trang chi tiết sản phẩm có:

```txt
Ảnh sản phẩm
Mô tả
Công dụng hỗ trợ
Đối tượng phù hợp
Lưu ý sử dụng
Nút tư vấn qua Zalo
Nút đặt mua / giữ sản phẩm
```

---

## 10. Học viện đào tạo

Mục tiêu: chuẩn hóa đào tạo KTV, tư vấn viên và chủ cơ sở.

Các mục chính:

```txt
Giới thiệu học viện
Khóa KTV trị liệu
Khóa tư vấn CSSK
Khóa chủ cơ sở
Lịch khai giảng
Đăng ký học
Chứng nhận
Thư viện bài học
```

Tính năng nâng cấp:

```txt
Hồ sơ học viên
Video bài học
Checklist thực hành
Bài kiểm tra
Theo dõi tiến độ học
Cấp chứng nhận sau khóa
```

---

## 11. Hợp tác / nhượng quyền

Mục tiêu: lấy lead đối tác, không cần công khai quá nhiều tài chính ở giai đoạn đầu.

Các block:

```txt
Hero hợp tác
Vì sao chọn Toplink
Mô hình hợp tác
Toplink hỗ trợ gì
Ai phù hợp
Quy trình hợp tác
Form đăng ký tư vấn
```

Mô hình:

```txt
Mô hình trung tâm Y Viện
Mô hình điểm trải nghiệm sức khỏe
Mô hình đào tạo KTV
Mô hình phân phối sản phẩm
Mô hình hợp tác chuyên gia
```

---

## 12. Tin tức / kiến thức sức khỏe

Chuyên mục:

```txt
Kiến thức sức khỏe
Đông y dưỡng sinh
Quy trình trị liệu
Sự kiện
Khuyến mãi
Báo chí
Tuyển dụng
Câu chuyện khách hàng
```

Chủ đề SEO:

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
Chăm sóc sức khỏe định kỳ
```

---

## 13. Tuyển dụng

Vị trí:

```txt
Kỹ thuật viên trị liệu
KTV gội đầu dưỡng sinh
Lễ tân
Tư vấn viên
Quản lý cơ sở
Marketing
```

Mỗi tin tuyển dụng:

```txt
Mô tả công việc
Yêu cầu
Quyền lợi
Lộ trình đào tạo
Môi trường làm việc
Thu nhập
Form ứng tuyển
```

---

## 14. Chi nhánh / cơ sở

Thiết kế sẵn tư duy mở chuỗi.

Mỗi cơ sở có:

```txt
Tên cơ sở
Địa chỉ
Hotline
Giờ mở cửa
Ảnh không gian
Dịch vụ có tại cơ sở
Google Map
Nút chỉ đường
Nút đặt lịch tại cơ sở
```

---

## 15. Dashboard nội bộ

### 15.1. Vai trò

```txt
Super Admin
Quản lý cơ sở
Lễ tân
Kỹ thuật viên
Tư vấn viên
Marketing
Khách hàng
Học viên
Đối tác
```

### 15.2. Dashboard tổng quan

```txt
Lịch hẹn hôm nay
Khách mới
Khách quay lại
Doanh thu
Dịch vụ bán chạy
Tỷ lệ khách không đến
Tỷ lệ mua gói
Hiệu suất KTV
Nguồn lead
```

### 15.3. Dashboard lễ tân

```txt
Xem lịch hẹn hôm nay
Tạo lịch hẹn mới
Xác nhận lịch
Đổi giờ hẹn
Check-in khách
Gán KTV
Ghi chú nhu cầu khách
Xác nhận thanh toán
Đặt lịch lần sau
```

### 15.4. Dashboard KTV

```txt
Xem khách được phân công
Xem dịch vụ cần thực hiện
Xem ghi chú tình trạng khách
Checklist quy trình
Ghi chú sau trị liệu
Đề xuất chăm sóc lần sau
Đánh dấu hoàn thành buổi trị liệu
```

### 15.5. Dashboard quản lý

```txt
Theo dõi doanh thu
Theo dõi lịch hẹn
Theo dõi nhân sự
Theo dõi hiệu suất KTV
Xem phản hồi khách hàng
Quản lý dịch vụ
Quản lý sản phẩm
Quản lý khuyến mãi
Quản lý bài viết
Quản lý khóa học
```

### 15.6. Dashboard marketing

```txt
Theo dõi nguồn lead
Theo dõi chiến dịch
Quản lý bài viết SEO
Quản lý banner website
Quản lý popup khuyến mãi
Quản lý form đăng ký
Theo dõi tỷ lệ chuyển đổi
```

---

## 16. Tài khoản khách hàng

Tính năng:

```txt
Xem lịch hẹn
Đổi lịch hẹn
Xem lịch sử trị liệu
Xem gói đã mua
Xem số buổi còn lại
Nhận nhắc lịch
Nhận ưu đãi riêng
Đánh giá dịch vụ
Cập nhật thông tin cá nhân
```

Không nên bắt khách tạo tài khoản ngay từ đầu. Luồng tốt hơn:

```txt
Đặt lịch bằng số điện thoại
→ Nhân viên xác nhận
→ Sau đó khách có thể đăng nhập để xem lịch sử nếu cần
```

---

## 17. Database overview

Các nhóm bảng chính:

```txt
Identity & permissions
- profiles
- roles
- user_roles

Branch & staff
- branches
- staff_profiles

Customer & care
- customers
- customer_health_profiles
- customer_notes

Services & packages
- service_categories
- services
- service_packages
- customer_packages

Booking & therapy
- appointments
- appointment_services
- therapy_sessions
- therapy_notes
- therapy_checklists
- therapy_checklist_items

Products & orders
- product_categories
- products
- orders
- order_items

Content
- blog_categories
- blog_posts
- reviews
- media_assets

Education
- courses
- lessons
- enrollments

Leads & marketing
- leads
- lead_sources
- campaigns
- vouchers

Partnership & recruitment
- franchise_inquiries
- job_posts
- job_applications

Notifications
- notifications
```

---

## 18. Database table design

### 18.1. profiles

```txt
id uuid primary key references auth.users(id)
full_name text
phone text
avatar_url text
status text
created_at timestamptz
updated_at timestamptz
```

### 18.2. roles

```txt
id uuid primary key
name text unique
description text
```

Role names:

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

### 18.3. user_roles

```txt
id uuid primary key
user_id uuid references profiles(id)
role_id uuid references roles(id)
branch_id uuid references branches(id)
created_at timestamptz
```

### 18.4. branches

```txt
id uuid primary key
name text
slug text unique
address text
city text
district text
phone text
zalo_url text
map_url text
opening_hours text
description text
status text
created_at timestamptz
updated_at timestamptz
```

### 18.5. staff_profiles

```txt
id uuid primary key
user_id uuid references profiles(id)
branch_id uuid references branches(id)
title text
bio text
specialties text[]
employment_status text
created_at timestamptz
updated_at timestamptz
```

### 18.6. customers

```txt
id uuid primary key
profile_id uuid references profiles(id)
full_name text
phone text
email text
gender text
birth_date date
source text
status text
created_at timestamptz
updated_at timestamptz
```

### 18.7. customer_health_profiles

```txt
id uuid primary key
customer_id uuid references customers(id)
main_concern text
body_areas text[]
sleep_quality text
stress_level text
energy_level text
contraindications text
lifestyle_notes text
created_at timestamptz
updated_at timestamptz
```

### 18.8. service_categories

```txt
id uuid primary key
name text
slug text unique
level text -- basic | advanced | intensive
description text
sort_order int
status text
```

### 18.9. services

```txt
id uuid primary key
category_id uuid references service_categories(id)
name text
slug text unique
short_description text
description text
duration_minutes int
price numeric
suitable_for text[]
cautions text[]
process_steps jsonb
faq jsonb
image_url text
status text
created_at timestamptz
updated_at timestamptz
```

### 18.10. service_packages

```txt
id uuid primary key
service_id uuid references services(id)
name text
slug text unique
sessions_count int
price numeric
valid_days int
description text
status text
```

### 18.11. appointments

```txt
id uuid primary key
customer_id uuid references customers(id)
branch_id uuid references branches(id)
assigned_staff_id uuid references staff_profiles(id)
start_time timestamptz
end_time timestamptz
status text
need_type text
note text
source text
created_at timestamptz
updated_at timestamptz
```

Status gợi ý:

```txt
pending
confirmed
checked_in
in_service
completed
cancelled
no_show
```

### 18.12. appointment_services

```txt
id uuid primary key
appointment_id uuid references appointments(id)
service_id uuid references services(id)
quantity int
price numeric
```

### 18.13. therapy_sessions

```txt
id uuid primary key
appointment_id uuid references appointments(id)
customer_id uuid references customers(id)
therapist_id uuid references staff_profiles(id)
started_at timestamptz
ended_at timestamptz
status text
summary text
created_at timestamptz
updated_at timestamptz
```

### 18.14. therapy_notes

```txt
id uuid primary key
therapy_session_id uuid references therapy_sessions(id)
author_id uuid references profiles(id)
note_type text
content text
created_at timestamptz
```

### 18.15. products

```txt
id uuid primary key
category_id uuid references product_categories(id)
name text
slug text unique
short_description text
description text
price numeric
image_url text
status text
created_at timestamptz
updated_at timestamptz
```

### 18.16. blog_posts

```txt
id uuid primary key
category_id uuid references blog_categories(id)
author_id uuid references profiles(id)
title text
slug text unique
excerpt text
content text
cover_image_url text
status text
published_at timestamptz
created_at timestamptz
updated_at timestamptz
```

### 18.17. leads

```txt
id uuid primary key
full_name text
phone text
email text
need_type text
message text
source text
status text
assigned_to uuid references profiles(id)
created_at timestamptz
updated_at timestamptz
```

### 18.18. courses

```txt
id uuid primary key
title text
slug text unique
description text
level text
price numeric
status text
created_at timestamptz
updated_at timestamptz
```

### 18.19. franchise_inquiries

```txt
id uuid primary key
full_name text
phone text
email text
city text
business_background text
investment_range text
message text
status text
created_at timestamptz
updated_at timestamptz
```

### 18.20. job_applications

```txt
id uuid primary key
job_post_id uuid references job_posts(id)
full_name text
phone text
email text
position text
experience text
cv_url text
message text
status text
created_at timestamptz
updated_at timestamptz
```

---

## 19. Supabase SQL schema

> File SQL chi tiết nằm trong `06_SUPABASE_SQL_SCHEMA.md`.  
> Trong master file này chỉ giữ bản tóm tắt.

Nguyên tắc:

1. Tất cả bảng dùng `uuid primary key default gen_random_uuid()`.
2. Dùng `created_at`, `updated_at`.
3. Bật Row Level Security cho bảng chứa dữ liệu vận hành.
4. Public chỉ đọc được dữ liệu public như dịch vụ, sản phẩm, bài viết đã published.
5. Customer chỉ đọc được dữ liệu của chính mình.
6. Staff chỉ đọc dữ liệu liên quan đến chi nhánh hoặc vai trò được phân quyền.
7. Super admin có toàn quyền.

---

## 20. Folder structure Next.js

```txt
y-vien-toplink/
├── app/
│   ├── (public)/
│   ├── (auth)/
│   ├── dashboard/
│   ├── account/
│   ├── api/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/
│   ├── layout/
│   ├── sections/
│   ├── cards/
│   ├── forms/
│   ├── dashboard/
│   └── shared/
├── features/
│   ├── booking/
│   ├── services/
│   ├── customers/
│   ├── dashboard/
│   ├── products/
│   ├── blog/
│   ├── academy/
│   ├── recruitment/
│   └── partnership/
├── lib/
│   ├── supabase/
│   ├── validators/
│   ├── constants/
│   ├── utils/
│   └── seo/
├── actions/
├── types/
├── data/
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── policies.sql
├── public/
│   ├── images/
│   └── icons/
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
├── package.json
├── .env.example
└── README.md
```

---

## 21. Priority roadmap

### P0 — Ra mắt chính thức

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
Admin xử lý lịch hẹn
```

### P1 — Vận hành khách hàng

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

### P2 — Mở rộng hệ sinh thái

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

### P3 — Mở chuỗi

```txt
Dashboard nhiều chi nhánh
Quản lý hiệu suất từng cơ sở
Quản lý học viên nâng cao
Quản lý đối tác
Quản lý chương trình nhượng quyền
Tự động hóa chăm sóc khách hàng
```

---

## 22. Prompt khởi động cho Claude CLI

```txt
Bạn là senior full-stack architect và senior UI/UX designer.

Hãy đọc toàn bộ bộ tài liệu markdown trong thư mục context-pack này.

Mục tiêu:
Xây dựng website chính thức production-ready cho Y Viện Toplink bằng Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui, Supabase Auth, Supabase PostgreSQL và Vercel.

Không làm demo rời rạc. Hãy xây dựng codebase có cấu trúc rõ, có khả năng mở rộng thành hệ thống vận hành thật.

Quy trình làm việc:
1. Đọc file 00_MASTER_YVIEN_TOPLINK_WEBSITE_SPEC.md để hiểu tổng thể.
2. Đọc file 01_PRODUCT_SCOPE.md để hiểu phạm vi sản phẩm.
3. Đọc file 02_UI_UX_GUIDE.md để nắm phong cách giao diện.
4. Đọc file 03_PUBLIC_ROUTES_AND_FEATURES.md để dựng public website.
5. Đọc file 04_DASHBOARD_AND_ROLES.md để dựng khu dashboard.
6. Đọc file 05_DATABASE_DESIGN.md và 06_SUPABASE_SQL_SCHEMA.md trước khi code phần dữ liệu.
7. Đọc file 07_FOLDER_STRUCTURE.md để tạo cấu trúc thư mục.
8. Đọc file 08_IMPLEMENTATION_ROADMAP.md để làm theo giai đoạn.
9. Sau mỗi nhóm thay đổi, chạy lint/build và sửa lỗi.

Ưu tiên build giai đoạn P0 trước:
- Trang chủ
- Giới thiệu
- Dịch vụ
- Chi tiết dịch vụ
- Quy trình trị liệu
- Không gian Y Viện
- Đặt lịch
- Liên hệ
- CTA gọi/Zalo/chỉ đường
- Dashboard xử lý lịch hẹn cơ bản
```

---

## 23. Ghi chú vận hành

1. Không dùng ngôn ngữ cam kết chữa bệnh.
2. Ưu tiên mobile vì khách Việt thường đặt lịch bằng điện thoại.
3. Form phải ngắn.
4. Luôn có CTA Zalo và gọi ngay.
5. Nội dung nên dùng ảnh thật của Y Viện khi có.
6. Không clone giao diện đối tác y nguyên. Chỉ học cấu trúc tính năng, còn UI và ngôn ngữ phải riêng cho Toplink.
7. Database cần thiết kế sẵn cho nhiều chi nhánh dù giai đoạn đầu chỉ có một cơ sở.
8. Dashboard nên làm từ đơn giản đến phức tạp, tránh cố làm tất cả cùng lúc.
