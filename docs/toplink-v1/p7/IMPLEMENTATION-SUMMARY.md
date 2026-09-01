# P7 Implementation Summary

P7 adds three bounded capabilities to the CMS-backed V1 frontend:

1. `APPROVED` SiteSettings contact facts pass through centralized destination validation before an actionable link exists.
2. Contact clicks emit a typed first-party `dataLayer` event through a small client link; UI components do not call vendor APIs.
3. Next.js metadata, canonical, sitemap, robots, breadcrumbs and JSON-LD are generated from approved domain/system facts and fail closed when origin, route or evidence is ineligible.

No booking, lead transport, price, ecommerce, analytics SDK, consent claim, pixel, OG-image service or new CMS domain was added. `app-demo/` remains outside the implementation surface.

## Runtime boundaries

- Contact: `web/lib/contact/actions.ts`.
- Analytics: `web/lib/analytics/` and `TrackedContactLink.tsx`.
- SEO: `web/lib/seo/`, `app/sitemap.ts`, `app/robots.ts` and route metadata functions.
- Structured data: one builder/serializer module plus `JsonLd.tsx`.
- Browser state verifier: local test-only CMS mutation with exact option snapshot/restore.

The home terminal handoff uses the canonical `footer` placement because it is the existing bounded global end-of-page contact surface. Service detail and contact page use `service_detail` and `contact_page`. No unsupported header, article or mobile contact surface was added merely to satisfy placement coverage.
