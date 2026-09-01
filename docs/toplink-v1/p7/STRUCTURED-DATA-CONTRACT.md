# P7 Structured Data Contract

All builders are centralized in `web/lib/seo/structured-data.ts`. JSON serialization replaces `<` with its Unicode escape before insertion into `application/ld+json`.

## Eligible types

- `BreadcrumbList`: only supplied public canonical ancestry with real labels.
- `Service`: public non-test Service with canonical route match, name, SEO description and approved service group.
- `BlogPosting`: public non-test Article with canonical route match, headline, description, verified author and publication date; modified date/image are optional approved fields.
- `Organization`: only when approved name, address, legal identifiers and safely actionable phone all exist. Opening hours remain a future LocalBusiness fact and are not projected onto Organization.

Current real fact state is not eligible for Organization or LocalBusiness. No LocalBusiness builder is active.

## Always omitted

`Offer`, price, availability, aggregate rating, review, fake FAQ, fake publisher/logo, guaranteed outcome, medical procedure/outcome and invented NAP are prohibited. Product pages remain informational and do not emit ecommerce Product/Offer semantics.

Preview, test-owned and canonical-mismatched records emit no Service/Article/Breadcrumb JSON-LD.
