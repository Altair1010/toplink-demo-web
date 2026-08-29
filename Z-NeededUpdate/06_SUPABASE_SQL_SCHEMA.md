# 06 — SUPABASE SQL SCHEMA

> File này là bản SQL khởi tạo schema Supabase/PostgreSQL.  
> Nên dùng làm migration ban đầu, sau đó chia nhỏ nếu cần.

---

## 1. Extensions

```sql
create extension if not exists "pgcrypto";
```

---

## 2. Helper function: updated_at

```sql
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;
```

---

## 3. Profiles & roles

```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  avatar_url text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text
);

insert into public.roles (name, description)
values
  ('super_admin', 'Toàn quyền hệ thống'),
  ('branch_manager', 'Quản lý cơ sở'),
  ('receptionist', 'Lễ tân'),
  ('therapist', 'Kỹ thuật viên'),
  ('consultant', 'Tư vấn viên'),
  ('marketing', 'Marketing'),
  ('customer', 'Khách hàng'),
  ('student', 'Học viên'),
  ('partner', 'Đối tác')
on conflict (name) do nothing;
```

---

## 4. Branches

```sql
create table if not exists public.branches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  address text,
  city text,
  district text,
  phone text,
  zalo_url text,
  map_url text,
  opening_hours text,
  description text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger branches_set_updated_at
before update on public.branches
for each row execute function public.set_updated_at();
```

---

## 5. User roles & staff

```sql
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  role_id uuid not null references public.roles(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  created_at timestamptz not null default now(),
  unique (user_id, role_id, branch_id)
);

create table if not exists public.staff_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  branch_id uuid references public.branches(id) on delete set null,
  title text,
  bio text,
  specialties text[] default '{}',
  employment_status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger staff_profiles_set_updated_at
before update on public.staff_profiles
for each row execute function public.set_updated_at();
```

---

## 6. Customers

```sql
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  phone text not null,
  email text,
  gender text,
  birth_date date,
  source text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists customers_phone_idx on public.customers(phone);
create index if not exists customers_profile_id_idx on public.customers(profile_id);

create trigger customers_set_updated_at
before update on public.customers
for each row execute function public.set_updated_at();

create table if not exists public.customer_health_profiles (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  main_concern text,
  body_areas text[] default '{}',
  sleep_quality text,
  stress_level text,
  energy_level text,
  contraindications text,
  lifestyle_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(customer_id)
);

create trigger customer_health_profiles_set_updated_at
before update on public.customer_health_profiles
for each row execute function public.set_updated_at();

create table if not exists public.customer_notes (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  note_type text not null default 'general',
  content text not null,
  created_at timestamptz not null default now()
);
```

---

## 7. Services & packages

```sql
create table if not exists public.service_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  level text not null check (level in ('basic', 'advanced', 'intensive')),
  description text,
  sort_order int not null default 0,
  status text not null default 'active'
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.service_categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  short_description text,
  description text,
  duration_minutes int,
  price numeric(12,2),
  suitable_for text[] default '{}',
  cautions text[] default '{}',
  process_steps jsonb not null default '[]'::jsonb,
  faq jsonb not null default '[]'::jsonb,
  image_url text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists services_slug_idx on public.services(slug);
create index if not exists services_category_id_idx on public.services(category_id);

create trigger services_set_updated_at
before update on public.services
for each row execute function public.set_updated_at();

create table if not exists public.service_packages (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references public.services(id) on delete cascade,
  name text not null,
  slug text not null unique,
  sessions_count int not null default 1,
  price numeric(12,2),
  valid_days int,
  description text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger service_packages_set_updated_at
before update on public.service_packages
for each row execute function public.set_updated_at();

create table if not exists public.customer_packages (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  package_id uuid not null references public.service_packages(id) on delete restrict,
  purchased_sessions int not null,
  remaining_sessions int not null,
  purchased_at timestamptz not null default now(),
  expires_at timestamptz,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger customer_packages_set_updated_at
before update on public.customer_packages
for each row execute function public.set_updated_at();
```

---

## 8. Appointments & therapy

```sql
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete set null,
  branch_id uuid references public.branches(id) on delete set null,
  assigned_staff_id uuid references public.staff_profiles(id) on delete set null,
  start_time timestamptz,
  end_time timestamptz,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'checked_in', 'in_service', 'completed', 'cancelled', 'no_show')),
  need_type text,
  note text,
  source text not null default 'website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists appointments_customer_id_idx on public.appointments(customer_id);
create index if not exists appointments_branch_id_idx on public.appointments(branch_id);
create index if not exists appointments_start_time_idx on public.appointments(start_time);
create index if not exists appointments_status_idx on public.appointments(status);

create trigger appointments_set_updated_at
before update on public.appointments
for each row execute function public.set_updated_at();

create table if not exists public.appointment_services (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid not null references public.appointments(id) on delete cascade,
  service_id uuid not null references public.services(id) on delete restrict,
  quantity int not null default 1,
  price numeric(12,2)
);

create table if not exists public.therapy_sessions (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid references public.appointments(id) on delete set null,
  customer_id uuid references public.customers(id) on delete set null,
  therapist_id uuid references public.staff_profiles(id) on delete set null,
  started_at timestamptz,
  ended_at timestamptz,
  status text not null default 'pending',
  summary text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger therapy_sessions_set_updated_at
before update on public.therapy_sessions
for each row execute function public.set_updated_at();

create table if not exists public.therapy_notes (
  id uuid primary key default gen_random_uuid(),
  therapy_session_id uuid not null references public.therapy_sessions(id) on delete cascade,
  author_id uuid references public.profiles(id) on delete set null,
  note_type text not null default 'general',
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.therapy_checklists (
  id uuid primary key default gen_random_uuid(),
  service_id uuid references public.services(id) on delete cascade,
  name text not null,
  description text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger therapy_checklists_set_updated_at
before update on public.therapy_checklists
for each row execute function public.set_updated_at();

create table if not exists public.therapy_checklist_items (
  id uuid primary key default gen_random_uuid(),
  checklist_id uuid not null references public.therapy_checklists(id) on delete cascade,
  title text not null,
  description text,
  sort_order int not null default 0,
  is_required boolean not null default true
);
```

---

## 9. Products & orders

```sql
create table if not exists public.product_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  sort_order int not null default 0,
  status text not null default 'active'
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.product_categories(id) on delete set null,
  name text not null,
  slug text not null unique,
  short_description text,
  description text,
  price numeric(12,2),
  image_url text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_slug_idx on public.products(slug);

create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete set null,
  status text not null default 'pending',
  total_amount numeric(12,2) not null default 0,
  note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger orders_set_updated_at
before update on public.orders
for each row execute function public.set_updated_at();

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  quantity int not null default 1,
  unit_price numeric(12,2),
  total_price numeric(12,2)
);
```

---

## 10. Content

```sql
create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  status text not null default 'active'
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.blog_categories(id) on delete set null,
  author_id uuid references public.profiles(id) on delete set null,
  title text not null,
  slug text not null unique,
  excerpt text,
  content text,
  cover_image_url text,
  status text not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists blog_posts_slug_idx on public.blog_posts(slug);
create index if not exists blog_posts_status_idx on public.blog_posts(status);

create trigger blog_posts_set_updated_at
before update on public.blog_posts
for each row execute function public.set_updated_at();

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete set null,
  service_id uuid references public.services(id) on delete set null,
  branch_id uuid references public.branches(id) on delete set null,
  rating int check (rating >= 1 and rating <= 5),
  content text,
  image_url text,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger reviews_set_updated_at
before update on public.reviews
for each row execute function public.set_updated_at();

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  uploaded_by uuid references public.profiles(id) on delete set null,
  bucket text not null,
  path text not null,
  public_url text,
  alt_text text,
  created_at timestamptz not null default now()
);
```

---

## 11. Education

```sql
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  description text,
  level text,
  price numeric(12,2),
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger courses_set_updated_at
before update on public.courses
for each row execute function public.set_updated_at();

create table if not exists public.lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  title text not null,
  slug text not null,
  description text,
  video_url text,
  content text,
  sort_order int not null default 0,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(course_id, slug)
);

create trigger lessons_set_updated_at
before update on public.lessons
for each row execute function public.set_updated_at();

create table if not exists public.enrollments (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'active',
  progress numeric(5,2) not null default 0,
  enrolled_at timestamptz not null default now(),
  completed_at timestamptz,
  unique(course_id, student_id)
);
```

---

## 12. Leads & marketing

```sql
create table if not exists public.lead_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  need_type text,
  message text,
  source text not null default 'website',
  status text not null default 'new'
    check (status in ('new', 'contacted', 'interested', 'booked', 'lost', 'follow_up')),
  assigned_to uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_phone_idx on public.leads(phone);
create index if not exists leads_status_idx on public.leads(status);

create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

create table if not exists public.campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  start_date date,
  end_date date,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger campaigns_set_updated_at
before update on public.campaigns
for each row execute function public.set_updated_at();

create table if not exists public.vouchers (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  name text not null,
  description text,
  discount_type text,
  discount_value numeric(12,2),
  start_date date,
  end_date date,
  usage_limit int,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger vouchers_set_updated_at
before update on public.vouchers
for each row execute function public.set_updated_at();
```

---

## 13. Partnership & recruitment

```sql
create table if not exists public.franchise_inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text,
  city text,
  business_background text,
  investment_range text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger franchise_inquiries_set_updated_at
before update on public.franchise_inquiries
for each row execute function public.set_updated_at();

create table if not exists public.job_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  department text,
  location text,
  employment_type text,
  description text,
  requirements text,
  benefits text,
  status text not null default 'draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger job_posts_set_updated_at
before update on public.job_posts
for each row execute function public.set_updated_at();

create table if not exists public.job_applications (
  id uuid primary key default gen_random_uuid(),
  job_post_id uuid references public.job_posts(id) on delete set null,
  full_name text not null,
  phone text not null,
  email text,
  position text,
  experience text,
  cv_url text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger job_applications_set_updated_at
before update on public.job_applications
for each row execute function public.set_updated_at();
```

---

## 14. Notifications

```sql
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  content text,
  type text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);
```

---

## 15. RLS enable

```sql
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.branches enable row level security;
alter table public.staff_profiles enable row level security;
alter table public.customers enable row level security;
alter table public.customer_health_profiles enable row level security;
alter table public.customer_notes enable row level security;
alter table public.service_categories enable row level security;
alter table public.services enable row level security;
alter table public.service_packages enable row level security;
alter table public.customer_packages enable row level security;
alter table public.appointments enable row level security;
alter table public.appointment_services enable row level security;
alter table public.therapy_sessions enable row level security;
alter table public.therapy_notes enable row level security;
alter table public.therapy_checklists enable row level security;
alter table public.therapy_checklist_items enable row level security;
alter table public.product_categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_posts enable row level security;
alter table public.reviews enable row level security;
alter table public.media_assets enable row level security;
alter table public.courses enable row level security;
alter table public.lessons enable row level security;
alter table public.enrollments enable row level security;
alter table public.lead_sources enable row level security;
alter table public.leads enable row level security;
alter table public.campaigns enable row level security;
alter table public.vouchers enable row level security;
alter table public.franchise_inquiries enable row level security;
alter table public.job_posts enable row level security;
alter table public.job_applications enable row level security;
alter table public.notifications enable row level security;
```

---

## 16. Helper: check role

```sql
create or replace function public.has_role(role_name text)
returns boolean as $$
  select exists (
    select 1
    from public.user_roles ur
    join public.roles r on r.id = ur.role_id
    where ur.user_id = auth.uid()
      and r.name = role_name
  );
$$ language sql security definer;
```

---

## 17. Basic RLS policies

> Đây là policy khởi đầu. Khi vào production cần audit lại theo logic thực tế.

### Public read active website content

```sql
create policy "Public can read active branches"
on public.branches for select
using (status = 'active');

create policy "Public can read active service categories"
on public.service_categories for select
using (status = 'active');

create policy "Public can read active services"
on public.services for select
using (status = 'active');

create policy "Public can read active service packages"
on public.service_packages for select
using (status = 'active');

create policy "Public can read active product categories"
on public.product_categories for select
using (status = 'active');

create policy "Public can read active products"
on public.products for select
using (status = 'active');

create policy "Public can read published blog categories"
on public.blog_categories for select
using (status = 'active');

create policy "Public can read published blog posts"
on public.blog_posts for select
using (status = 'published');

create policy "Public can read approved reviews"
on public.reviews for select
using (status = 'approved');

create policy "Public can read active courses"
on public.courses for select
using (status = 'active');

create policy "Public can read published job posts"
on public.job_posts for select
using (status = 'published');
```

### Authenticated user reads own profile

```sql
create policy "Users can read own profile"
on public.profiles for select
to authenticated
using (id = auth.uid());

create policy "Users can update own profile"
on public.profiles for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());
```

### Super admin full access examples

```sql
create policy "Super admin can manage profiles"
on public.profiles for all
to authenticated
using (public.has_role('super_admin'))
with check (public.has_role('super_admin'));

create policy "Super admin can manage customers"
on public.customers for all
to authenticated
using (public.has_role('super_admin'))
with check (public.has_role('super_admin'));

create policy "Super admin can manage appointments"
on public.appointments for all
to authenticated
using (public.has_role('super_admin'))
with check (public.has_role('super_admin'));

create policy "Super admin can manage services"
on public.services for all
to authenticated
using (public.has_role('super_admin'))
with check (public.has_role('super_admin'));
```

### Public insert lead / booking-related forms

```sql
create policy "Public can create leads"
on public.leads for insert
with check (true);

create policy "Public can create franchise inquiries"
on public.franchise_inquiries for insert
with check (true);

create policy "Public can create job applications"
on public.job_applications for insert
with check (true);
```

> Lưu ý: Với lịch hẹn public, có thể không cho insert trực tiếp vào `appointments`.  
> Cách an toàn hơn: public gửi vào `leads` hoặc gọi Server Action dùng service role để tạo customer + appointment sau khi validate.

---

## 18. Seed data gợi ý

```sql
insert into public.branches (name, slug, address, city, district, phone, status)
values
  ('Y Viện Toplink Trung Văn', 'trung-van', 'Biệt thự 4/2 Trung Văn, Nam Từ Liêm, Hà Nội', 'Hà Nội', 'Nam Từ Liêm', '', 'active')
on conflict (slug) do nothing;

insert into public.service_categories (name, slug, level, description, sort_order, status)
values
  ('Dịch vụ cơ bản', 'co-ban', 'basic', 'Các dịch vụ dễ tiếp cận cho khách mới.', 1, 'active'),
  ('Dịch vụ nâng cao', 'nang-cao', 'advanced', 'Các liệu trình có tính trị liệu chuyên sâu hơn.', 2, 'active'),
  ('Dịch vụ chuyên sâu', 'chuyen-sau', 'intensive', 'Liệu trình cá nhân hóa, kết hợp Đông y và công nghệ cao.', 3, 'active')
on conflict (slug) do nothing;
```
