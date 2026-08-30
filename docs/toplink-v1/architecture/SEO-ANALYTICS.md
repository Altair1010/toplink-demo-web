# SEO, Local SEO & Analytics Plan

## SEO foundation

- semantic headings and clean URLs;
- canonical URLs;
- XML sitemap;
- robots policy;
- OpenGraph/social metadata;
- article/service breadcrumbs;
- internal links between knowledge and services where contextually justified;
- image alt/size discipline;
- author/date semantics for editorial content;
- no thin placeholder pages.

## Structured data

Generate schema only from verified facts. Candidate types:

- Organization / LocalBusiness (once legal/location facts are approved)
- Service
- Article / BlogPosting
- BreadcrumbList

Do not emit offer/price schema because V1 does not publish prices.

## Local SEO

When facts are supplied:

- consistent name/address/phone;
- opening hours;
- location page/contact page;
- map/directions link;
- local business profiles handled outside the website as a separate operational task.

## Analytics architecture

Create a small event abstraction/dataLayer so UI components never directly depend on a future marketing pixel.

Minimum events:

```text
contact_zalo_click
contact_facebook_click
contact_phone_click
service_view
article_view   # only if additional client analytics is truly needed
```

Contact events include placement:

`header | service_detail | article | footer | contact_page | mobile_contact_surface`

## Tools

- Google Search Console: V1
- GA4-compatible measurement: V1
- GTM: preferred integration point if/when IDs/consent policy are ready
- Meta Pixel: architecture-ready, disabled until explicitly configured
- TikTok Pixel: architecture-ready, disabled until explicitly configured

Do not load dormant third-party scripts just because future marketing may use them.
