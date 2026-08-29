# 07 — FOLDER STRUCTURE

> File này mô tả cấu trúc thư mục đề xuất cho codebase Next.js App Router.

---

## 1. Root structure

```txt
y-vien-toplink/
├── app/
├── components/
├── features/
├── lib/
├── actions/
├── types/
├── data/
├── supabase/
├── public/
├── middleware.ts
├── next.config.ts
├── tailwind.config.ts
├── package.json
├── .env.example
└── README.md
```

---

## 2. `app/`

```txt
app/
├── (public)/
│   ├── page.tsx
│   ├── gioi-thieu/
│   │   └── page.tsx
│   ├── dich-vu/
│   │   ├── page.tsx
│   │   ├── co-ban/
│   │   │   └── page.tsx
│   │   ├── nang-cao/
│   │   │   └── page.tsx
│   │   ├── chuyen-sau/
│   │   │   └── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── quy-trinh-tri-lieu/
│   │   └── page.tsx
│   ├── khong-gian/
│   │   └── page.tsx
│   ├── dat-lich/
│   │   └── page.tsx
│   ├── san-pham/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── hoc-vien/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── hop-tac/
│   │   └── page.tsx
│   ├── nhuong-quyen/
│   │   └── page.tsx
│   ├── tin-tuc/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── tuyen-dung/
│   │   └── page.tsx
│   ├── lien-he/
│   │   └── page.tsx
│   └── chi-nhanh/
│       ├── page.tsx
│       └── [slug]/
│           └── page.tsx
├── (auth)/
│   ├── dang-nhap/
│   │   └── page.tsx
│   └── dang-ky/
│       └── page.tsx
├── dashboard/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── appointments/
│   ├── customers/
│   ├── services/
│   ├── packages/
│   ├── products/
│   ├── blog/
│   ├── courses/
│   ├── leads/
│   ├── recruitment/
│   ├── reports/
│   └── settings/
├── account/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── appointments/
│   ├── packages/
│   ├── profile/
│   └── reviews/
├── api/
│   ├── webhooks/
│   └── health/
├── globals.css
└── layout.tsx
```

---

## 3. `components/`

```txt
components/
├── ui/
│   └── shadcn components
├── layout/
│   ├── site-header.tsx
│   ├── site-footer.tsx
│   ├── mobile-bottom-bar.tsx
│   └── dashboard-shell.tsx
├── sections/
│   ├── hero-section.tsx
│   ├── need-selector-section.tsx
│   ├── services-section.tsx
│   ├── process-section.tsx
│   ├── space-section.tsx
│   ├── reviews-section.tsx
│   └── cta-section.tsx
├── cards/
│   ├── service-card.tsx
│   ├── product-card.tsx
│   ├── blog-card.tsx
│   ├── branch-card.tsx
│   ├── review-card.tsx
│   └── stat-card.tsx
├── forms/
│   ├── booking-form.tsx
│   ├── contact-form.tsx
│   ├── lead-form.tsx
│   ├── franchise-form.tsx
│   └── job-application-form.tsx
├── dashboard/
│   ├── appointment-table.tsx
│   ├── customer-table.tsx
│   ├── lead-kanban.tsx
│   ├── therapy-checklist.tsx
│   └── dashboard-sidebar.tsx
└── shared/
    ├── section-header.tsx
    ├── cta-button.tsx
    ├── status-badge.tsx
    └── empty-state.tsx
```

---

## 4. `features/`

Dùng để gom logic theo domain.

```txt
features/
├── booking/
│   ├── components/
│   ├── actions.ts
│   ├── queries.ts
│   ├── validators.ts
│   └── types.ts
├── services/
├── customers/
├── dashboard/
├── products/
├── blog/
├── academy/
├── recruitment/
├── partnership/
├── reviews/
└── branches/
```

Mỗi feature có thể có:

```txt
components/
actions.ts
queries.ts
validators.ts
types.ts
constants.ts
```

---

## 5. `lib/`

```txt
lib/
├── supabase/
│   ├── client.ts
│   ├── server.ts
│   ├── middleware.ts
│   └── admin.ts
├── validators/
│   ├── booking.ts
│   ├── contact.ts
│   ├── lead.ts
│   └── auth.ts
├── constants/
│   ├── routes.ts
│   ├── roles.ts
│   ├── service-levels.ts
│   └── appointment-status.ts
├── utils/
│   ├── cn.ts
│   ├── format-date.ts
│   ├── format-money.ts
│   └── slugify.ts
└── seo/
    ├── metadata.ts
    └── structured-data.ts
```

---

## 6. `actions/`

Server Actions dùng cho form và dashboard.

```txt
actions/
├── booking-actions.ts
├── lead-actions.ts
├── appointment-actions.ts
├── customer-actions.ts
├── service-actions.ts
├── product-actions.ts
├── blog-actions.ts
├── course-actions.ts
├── recruitment-actions.ts
└── partnership-actions.ts
```

---

## 7. `types/`

```txt
types/
├── database.types.ts
├── role.ts
├── appointment.ts
├── customer.ts
├── service.ts
├── product.ts
├── blog.ts
├── course.ts
└── common.ts
```

`database.types.ts` nên generate từ Supabase CLI nếu có.

---

## 8. `data/`

Dữ liệu tĩnh ban đầu, fallback trước khi có admin đầy đủ.

```txt
data/
├── site.ts
├── navigation.ts
├── services.ts
├── process.ts
├── space.ts
├── faq.ts
├── testimonials.ts
└── seed.ts
```

---

## 9. `supabase/`

```txt
supabase/
├── migrations/
│   └── 0001_initial_schema.sql
├── seed.sql
├── policies.sql
└── README.md
```

---

## 10. `public/`

```txt
public/
├── images/
│   ├── logo/
│   ├── hero/
│   ├── services/
│   ├── space/
│   ├── products/
│   └── team/
└── icons/
```

---

## 11. Naming convention

```txt
File component: kebab-case.tsx
React component: PascalCase
Server action: verbNounAction
Query function: getNoun, listNouns
Type: PascalCase
Constants: UPPER_SNAKE_CASE hoặc camelCase object
```

Ví dụ:

```txt
service-card.tsx → ServiceCard
booking-form.tsx → BookingForm
createBookingAction()
getServices()
AppointmentStatus
```

---

## 12. Environment variables

`.env.example`:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_HOTLINE=
NEXT_PUBLIC_ZALO_URL=
NEXT_PUBLIC_GOOGLE_MAP_URL=

RESEND_API_KEY=
ADMIN_EMAIL=
```

---

## 13. README cần có

```txt
Giới thiệu project
Tech stack
Cách cài đặt
Cách chạy local
Cách cấu hình Supabase
Cách chạy migration
Cách seed data
Cách deploy Vercel
Quy tắc viết code
Quy tắc nội dung sức khỏe
Roadmap
```
