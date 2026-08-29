# 05 — DATABASE DESIGN

> File này mô tả database design ở mức logic.  
> SQL cụ thể nằm trong `06_SUPABASE_SQL_SCHEMA.md`.

---

## 1. Nguyên tắc thiết kế

1. Thiết kế sẵn cho nhiều chi nhánh.
2. Dữ liệu khách hàng và lịch trị liệu phải có phân quyền.
3. Public chỉ xem được nội dung đã publish.
4. Không gọi hồ sơ khách là “bệnh án”. Dùng “hồ sơ chăm sóc” hoặc “nhật ký trị liệu”.
5. Tách rõ: khách hàng, nhân sự, lịch hẹn, dịch vụ, gói, ghi chú, lead, nội dung.
6. Dùng trạng thái rõ ràng thay vì xóa dữ liệu.
7. Ghi nhận nguồn lead để đo hiệu quả marketing.

---

## 2. Nhóm bảng

### 2.1. Identity & permissions

```txt
profiles
roles
user_roles
```

### 2.2. Branch & staff

```txt
branches
staff_profiles
```

### 2.3. Customer & care

```txt
customers
customer_health_profiles
customer_notes
```

### 2.4. Services & packages

```txt
service_categories
services
service_packages
customer_packages
```

### 2.5. Booking & therapy

```txt
appointments
appointment_services
therapy_sessions
therapy_notes
therapy_checklists
therapy_checklist_items
```

### 2.6. Products & orders

```txt
product_categories
products
orders
order_items
```

### 2.7. Content

```txt
blog_categories
blog_posts
reviews
media_assets
```

### 2.8. Education

```txt
courses
lessons
enrollments
```

### 2.9. Leads & marketing

```txt
lead_sources
leads
campaigns
vouchers
```

### 2.10. Partnership & recruitment

```txt
franchise_inquiries
job_posts
job_applications
```

### 2.11. Notifications

```txt
notifications
```

---

## 3. Tables

## 3.1. profiles

Dữ liệu mở rộng của user từ Supabase Auth.

```txt
id uuid primary key references auth.users(id)
full_name text
phone text
avatar_url text
status text
created_at timestamptz
updated_at timestamptz
```

---

## 3.2. roles

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

---

## 3.3. user_roles

Một user có thể có nhiều role, có thể gắn với chi nhánh.

```txt
id uuid primary key
user_id uuid references profiles(id)
role_id uuid references roles(id)
branch_id uuid references branches(id)
created_at timestamptz
```

---

## 3.4. branches

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

---

## 3.5. staff_profiles

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

---

## 3.6. customers

Khách có thể có hoặc chưa có tài khoản auth.

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

---

## 3.7. customer_health_profiles

Không gọi là bệnh án. Đây là hồ sơ chăm sóc mềm.

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

---

## 3.8. customer_notes

```txt
id uuid primary key
customer_id uuid references customers(id)
author_id uuid references profiles(id)
note_type text
content text
created_at timestamptz
```

---

## 3.9. service_categories

```txt
id uuid primary key
name text
slug text unique
level text -- basic | advanced | intensive
description text
sort_order int
status text
```

---

## 3.10. services

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

---

## 3.11. service_packages

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
created_at timestamptz
updated_at timestamptz
```

---

## 3.12. customer_packages

```txt
id uuid primary key
customer_id uuid references customers(id)
package_id uuid references service_packages(id)
purchased_sessions int
remaining_sessions int
purchased_at timestamptz
expires_at timestamptz
status text
created_at timestamptz
updated_at timestamptz
```

---

## 3.13. appointments

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

Status:

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

## 3.14. appointment_services

```txt
id uuid primary key
appointment_id uuid references appointments(id)
service_id uuid references services(id)
quantity int
price numeric
```

---

## 3.15. therapy_sessions

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

---

## 3.16. therapy_notes

```txt
id uuid primary key
therapy_session_id uuid references therapy_sessions(id)
author_id uuid references profiles(id)
note_type text
content text
created_at timestamptz
```

---

## 3.17. therapy_checklists

```txt
id uuid primary key
service_id uuid references services(id)
name text
description text
status text
created_at timestamptz
updated_at timestamptz
```

---

## 3.18. therapy_checklist_items

```txt
id uuid primary key
checklist_id uuid references therapy_checklists(id)
title text
description text
sort_order int
is_required boolean
```

---

## 3.19. product_categories

```txt
id uuid primary key
name text
slug text unique
description text
sort_order int
status text
```

---

## 3.20. products

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

---

## 3.21. orders

```txt
id uuid primary key
customer_id uuid references customers(id)
status text
total_amount numeric
note text
created_at timestamptz
updated_at timestamptz
```

---

## 3.22. order_items

```txt
id uuid primary key
order_id uuid references orders(id)
product_id uuid references products(id)
quantity int
unit_price numeric
total_price numeric
```

---

## 3.23. blog_categories

```txt
id uuid primary key
name text
slug text unique
description text
status text
```

---

## 3.24. blog_posts

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

---

## 3.25. reviews

```txt
id uuid primary key
customer_id uuid references customers(id)
service_id uuid references services(id)
branch_id uuid references branches(id)
rating int
content text
image_url text
status text
created_at timestamptz
updated_at timestamptz
```

---

## 3.26. courses

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

---

## 3.27. lessons

```txt
id uuid primary key
course_id uuid references courses(id)
title text
slug text
description text
video_url text
content text
sort_order int
status text
created_at timestamptz
updated_at timestamptz
```

---

## 3.28. enrollments

```txt
id uuid primary key
course_id uuid references courses(id)
student_id uuid references profiles(id)
status text
progress numeric
enrolled_at timestamptz
completed_at timestamptz
```

---

## 3.29. lead_sources

```txt
id uuid primary key
name text
slug text unique
description text
```

---

## 3.30. leads

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

---

## 3.31. campaigns

```txt
id uuid primary key
name text
slug text unique
description text
start_date date
end_date date
status text
created_at timestamptz
updated_at timestamptz
```

---

## 3.32. vouchers

```txt
id uuid primary key
code text unique
name text
description text
discount_type text
discount_value numeric
start_date date
end_date date
usage_limit int
status text
created_at timestamptz
updated_at timestamptz
```

---

## 3.33. franchise_inquiries

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

---

## 3.34. job_posts

```txt
id uuid primary key
title text
slug text unique
department text
location text
employment_type text
description text
requirements text
benefits text
status text
created_at timestamptz
updated_at timestamptz
```

---

## 3.35. job_applications

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

## 3.36. notifications

```txt
id uuid primary key
user_id uuid references profiles(id)
title text
content text
type text
read_at timestamptz
created_at timestamptz
```

---

## 4. RLS logic summary

### Public

Có thể đọc:

```txt
branches published
service_categories active
services active
products active
blog_posts published
reviews approved
courses active
job_posts published
```

### Customer

Có thể đọc:

```txt
profile của mình
customer record gắn với mình
appointments của mình
packages của mình
therapy history của mình
notifications của mình
```

### Staff

Có thể đọc theo chi nhánh hoặc phân công:

```txt
appointments thuộc chi nhánh
customers thuộc chi nhánh
therapy_sessions được phân công
service data
```

### Super Admin

Toàn quyền.

---

## 5. Index gợi ý

```txt
profiles.phone
customers.phone
customers.profile_id
appointments.customer_id
appointments.branch_id
appointments.start_time
appointments.status
services.slug
blog_posts.slug
products.slug
leads.phone
leads.status
```
