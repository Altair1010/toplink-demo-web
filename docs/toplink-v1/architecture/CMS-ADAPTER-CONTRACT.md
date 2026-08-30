# CMS Adapter Contract

## Principle

React components never consume raw WordPress response shapes directly.

```text
REST payload → parse/validate → normalize → domain object → component
```

## Suggested boundaries

```text
web/lib/cms/
├── wp-client.ts
├── schemas.ts
├── normalizers.ts
├── services.ts
├── products.ts
├── posts.ts
├── site-settings.ts
└── errors.ts

web/types/domain/
├── service.ts
├── product.ts
├── article.ts
├── media.ts
└── site.ts
```

## Rules

- Public page reads should not require admin credentials.
- Private preview reads/authentication stay server-only.
- WordPress Application Passwords, if used for server-to-server administrative/preview access, are secrets and must never reach client bundles.
- Parse unknown/nullable CMS fields defensively.
- `PENDING` data maps to omitted UI, not invented fallback text.
- Rich WordPress HTML renders only through one controlled/sanitized boundary.
- External URLs are validated before being exposed as CTA targets.
- Media dimensions/alt text are normalized centrally.

## Revalidation contract

A WordPress content event should emit a signed payload resembling:

```json
{
  "event": "post.updated",
  "type": "service",
  "id": 123,
  "slug": "...",
  "timestamp": "..."
}
```

The Next route:

1. verifies signature + timestamp;
2. maps event to cache tags/paths;
3. revalidates only the necessary content;
4. logs a minimal success/failure record without secret content.

## Preview

Draft preview must be separate from public cache and require a signed, short-lived preview intent. Never make drafts globally readable through public REST merely to simplify preview.
