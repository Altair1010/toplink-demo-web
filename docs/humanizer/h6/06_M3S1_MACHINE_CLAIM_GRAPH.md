# H6.2 — Đồ thị machine claim M3S-1

## Truy vết emitter trước mutation

| Emitter        | Source data                                                         | Machine claim                                                                        | Verification status                               | Action                      |
| -------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------- | --------------------------- |
| Root business  | `CONTACT`, `BRANCHES`, `SERVICES` và literal trong `app/layout.tsx` | business type, phone/email, address, hours, price range, social links, offer catalog | chưa được phê duyệt làm Toplink public truth      | bỏ toàn bộ emitter          |
| Service detail | service record từ `SERVICES`                                        | service/provider/offer, description, price                                           | factual population chưa được review/approve       | bỏ toàn bộ emitter          |
| FAQ            | `FAQS`                                                              | question/accepted answer                                                             | FAQ chưa được review/approve làm machine truth    | bỏ toàn bộ emitter          |
| Breadcrumb     | route items do caller truyền vào                                    | `BreadcrumbList`, label và canonical-like item URL                                   | machine publication chưa có authority trong M3S-1 | bỏ emitter, giữ visible nav |

## Before

```text
UNVERIFIED CONTENT
       |
       v
    JSON-LD
       |
       v
SEARCH / MACHINE CONSUMER
```

## After

```text
UNVERIFIED CONTENT
       |
       +--------> visible layer unchanged
       |
       `--- X ---> machine publication omitted
```

## Runtime result

```text
ROOT BUSINESS JSON-LD ---- X
SERVICE JSON-LD ---------- X
FAQ JSON-LD -------------- X
BREADCRUMB JSON-LD ------- X

VISIBLE BREADCRUMB
  nav[aria-label="Breadcrumb"]
       |
       +--> intermediate links
       `--> aria-current="page"
```

Không có `Organization`, `LocalBusiness`, `MedicalBusiness`, FAQ hay placeholder schema thay thế.
Repository-wide source scan sau mutation trả về `0` emitter tương đương trong `app-demo/app`,
`components`, `lib` và `data`. Build-output HTML/text scan cũng trả về `0`.

## M3S-2 follow-up

Các visible facts và metadata vẫn là Runtime Truth hiện hành nhưng chưa được M3S-1 xác nhận đúng.
Chúng thuộc M3S-2 và không bị sửa trong batch này.
