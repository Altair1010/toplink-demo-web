# 09 — CLAUDE CLI USAGE

> File này hướng dẫn cách dùng bộ context pack với Claude CLI / Claude Code để đỡ tốn context.

---

## 1. Nguyên tắc dùng context

Không nạp toàn bộ file master nếu chỉ làm một phần nhỏ.

Cách dùng đúng:

```txt
Làm UI public → nạp 01, 02, 03, 07, 08
Làm dashboard → nạp 01, 04, 05, 07, 08
Làm database → nạp 05, 06, 07
Làm booking → nạp 01, 02, 03, 05, 06, 07, 08
Làm SEO/blog → nạp 03, 05, 07, 08
Làm học viện → nạp 01, 03, 05, 07, 08
```

---

## 2. Prompt khởi động toàn dự án

```txt
Bạn là senior full-stack architect và senior UI/UX designer.

Hãy đọc bộ markdown context pack trong thư mục này.

Mục tiêu:
Xây dựng website chính thức production-ready cho Y Viện Toplink bằng:
- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase Auth
- Supabase PostgreSQL
- Supabase Storage
- Vercel

Không làm demo rời rạc. Hãy xây dựng codebase có cấu trúc rõ, có khả năng mở rộng thành hệ thống vận hành thật.

Ưu tiên:
1. Đọc 00_MASTER_YVIEN_TOPLINK_WEBSITE_SPEC.md để hiểu tổng thể.
2. Đọc 07_FOLDER_STRUCTURE.md để tạo cấu trúc thư mục.
3. Đọc 08_IMPLEMENTATION_ROADMAP.md để làm theo phase.
4. Bắt đầu Phase 0.
5. Sau mỗi nhóm thay đổi, chạy lint/build và sửa lỗi.
```

---

## 3. Prompt Phase 0

```txt
Hãy triển khai Phase 0 theo file 08_IMPLEMENTATION_ROADMAP.md.

Yêu cầu:
- Tạo cấu trúc thư mục theo 07_FOLDER_STRUCTURE.md.
- Setup Next.js App Router, TypeScript, Tailwind, shadcn/ui.
- Tạo layout public cơ bản.
- Tạo SiteHeader, SiteFooter, MobileBottomBar.
- Tạo .env.example.
- Tạo README khởi đầu.
- Chạy lint/build và sửa lỗi.
```

---

## 4. Prompt Phase 1 — Public website

```txt
Hãy triển khai Phase 1: Public website P0.

Đọc kỹ:
- 01_PRODUCT_SCOPE.md
- 02_UI_UX_GUIDE.md
- 03_PUBLIC_ROUTES_AND_FEATURES.md
- 07_FOLDER_STRUCTURE.md
- 08_IMPLEMENTATION_ROADMAP.md

Routes cần làm:
- /
- /gioi-thieu
- /dich-vu
- /dich-vu/[slug]
- /quy-trinh-tri-lieu
- /khong-gian
- /dat-lich
- /lien-he

Yêu cầu:
- Mobile-first
- CTA gọi/Zalo/chỉ đường
- Form booking UI
- Nội dung an toàn, không claim chữa bệnh
- Dữ liệu có thể dùng mock trong data/ trước
- Chạy lint/build sau khi xong
```

---

## 5. Prompt Phase 2 — Database & booking

```txt
Hãy triển khai Phase 2: Database & booking backend.

Đọc kỹ:
- 05_DATABASE_DESIGN.md
- 06_SUPABASE_SQL_SCHEMA.md
- 07_FOLDER_STRUCTURE.md
- 08_IMPLEMENTATION_ROADMAP.md

Yêu cầu:
- Tạo migration Supabase từ SQL schema.
- Tạo Supabase server/client.
- Tạo booking validator bằng Zod.
- Tạo booking server action.
- Booking public không insert trực tiếp bừa bãi từ client.
- Validate tên, số điện thoại, nhu cầu, thời gian.
- Tạo lead hoặc appointment tùy kiến trúc an toàn.
- Thêm success/error/loading state cho booking form.
- Không expose service role key ra client.
- Chạy lint/build.
```

---

## 6. Prompt Phase 3 — Dashboard cơ bản

```txt
Hãy triển khai Phase 3: Dashboard cơ bản.

Đọc kỹ:
- 04_DASHBOARD_AND_ROLES.md
- 05_DATABASE_DESIGN.md
- 07_FOLDER_STRUCTURE.md
- 08_IMPLEMENTATION_ROADMAP.md

Routes:
- /dashboard
- /dashboard/appointments
- /dashboard/customers
- /dashboard/customers/[id]

Yêu cầu:
- DashboardShell
- DashboardSidebar
- Role guard cơ bản
- Appointment list
- Filter theo ngày/status
- Update appointment status
- Customer detail
- Customer notes
- Chạy lint/build.
```

---

## 7. Prompt fix lỗi

```txt
Hãy đọc lỗi terminal/build hiện tại và sửa triệt để.

Quy tắc:
- Không xóa tính năng để làm build pass.
- Không dùng any tràn lan.
- Nếu phải đổi kiến trúc, giải thích ngắn trước khi sửa.
- Sau khi sửa, chạy lại lint/build.
```

---

## 8. Prompt kiểm tra bảo mật

```txt
Hãy audit nhanh bảo mật codebase hiện tại.

Tập trung:
- Supabase service role key có bị expose không
- Server Actions có validate input không
- Route dashboard có role guard chưa
- RLS policy có lỗ hổng public write không
- Form public có chống spam cơ bản chưa
- Dữ liệu khách hàng có bị public read không

Trả về:
1. Lỗi nghiêm trọng
2. Lỗi trung bình
3. Lỗi nhỏ
4. Patch đề xuất
```

---

## 9. Prompt tối ưu UI

```txt
Hãy cải thiện UI theo 02_UI_UX_GUIDE.md.

Tập trung:
- Mobile-first
- Typography dễ đọc
- CTA rõ
- Màu đỏ trầm/vàng kim/be/nâu gỗ/trắng ngà
- Ít animation
- Nhiều khoảng thở
- Giao diện thân thiện với khách trung niên
- Không làm rối
```

---

## 10. Prompt tạo nội dung an toàn sức khỏe

```txt
Hãy viết nội dung website cho Y Viện Toplink theo hướng an toàn sức khỏe.

Nguyên tắc:
- Không dùng từ chữa khỏi, cam kết khỏi, điều trị dứt điểm.
- Dùng: hỗ trợ, chăm sóc, thư giãn, cải thiện cảm giác, cân bằng.
- Giọng văn: cao cấp, thân thiện, dễ hiểu, có chiều sâu.
- Phù hợp ngành Đông y dưỡng sinh và trị liệu.
```
