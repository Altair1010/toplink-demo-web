# H6.2 — Phê duyệt và phạm vi M3S-1

## Quyết định

- ID: `DEC-MIGR-H6-M3S1-01`
- Phê duyệt của con người: **M3S-1 ONLY — MACHINE-READABLE TRUST SANITATION**.
- Baseline bắt buộc: `663b0318109009ce7c2281e7cd6affb453582e9a`.
- Baseline đã khớp, nhánh `main`, worktree sạch trước mutation.

## Mục tiêu

M3S-1 chỉ loại bỏ bốn emitter JSON-LD đang công bố dữ liệu chưa có thẩm quyền xác minh đầy đủ:

1. business/address/offer ở root layout;
2. service/provider/offer ở service detail;
3. FAQ ở trang liên hệ;
4. `BreadcrumbList` trong component breadcrumb.

Không tạo schema thay thế. Lớp hiển thị, metadata, nội dung và điều hướng phải giữ nguyên.

## Phạm vi mutation production

- `app-demo/app/layout.tsx`
- `app-demo/app/dich-vu/[slug]/page.tsx`
- `app-demo/app/lien-he/page.tsx`
- `app-demo/components/Breadcrumbs.tsx`

`app-demo/data/content.ts` chỉ được đọc để truy nguồn dữ liệu. Không file production nào khác được phép đổi.

## Ngoài phạm vi

- M0R, M1, M2A0, M2A1, M2B, M3S-2, M3P, M4 và M5;
- visible claims, metadata, title/description, FAQ hiển thị, service copy, contact facts;
- homepage, booking, token, skin, `DESIGN.md`, dependency;
- schema thay thế hoặc SEO redesign.

## Invariant

```text
UNVERIFIED MACHINE CLAIM
          |
          v
        OMIT
          |
          v
VISIBLE USER EXPERIENCE UNCHANGED
```

M3S-B đã `IMPLEMENTED / VERIFIED` và bất biến trong batch này. M4 vẫn `BLOCKED`.
