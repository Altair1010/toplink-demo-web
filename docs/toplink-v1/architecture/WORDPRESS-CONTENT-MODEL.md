# WordPress Content Model — V1 P2 Draft

**Status:** specification aligned to `product/CONTENT-CONTRACTS.md`; no plugin/CMS implementation in P2.

## Contract boundary

WordPress is the editorial/data authority after P5, not frontend layout authority. The custom plugin
must expose content that normalizes to exactly five frontend domains: `Service`, `Product`, `Article`,
`Media`, `SiteSettings`. Field ownership, source, fact status, requirement and pending behavior are
canonical in `product/CONTENT-CONTRACTS.md` and must not diverge here.

## Custom plugin

P5 will create `wordpress/plugins/toplink-content-model/`.

The plugin owns content types, taxonomies, meta schemas and any custom REST/settings endpoint. A WordPress theme must not own these models.

## Custom post types

### `service` → `Service`

Public REST-enabled after publication. Register only fields required by the P2 contract:

- title
- slug
- summary
- approved body
- media relations
- service group/category
- who_it_may_fit (bounded/supportive language)
- limitations/cautions
- professional-evaluation guidance
- experience/process
- FAQ
- display order
- related knowledge
- SEO metadata inputs
- evidence state and editorial lifecycle

There is no public pricing field or null/hidden pricing slot.

### `product` → `Product`

Public REST-enabled, informational only:

- title/slug/summary
- safe positioning
- supported use statements
- caution/limitations
- documentation verification status
- authorized media relations
- approved body
- FAQ
- related knowledge, SEO metadata inputs, evidence state and editorial lifecycle

No cart, price, inventory-commerce, purchase URL, checkout, upsell or purchase CTA field.

## Core posts

Use WordPress core posts normalized to `Article`:

- `kien-thuc` → `article_type = knowledge`;
- `tin-tuc` news → `article_type = news`;
- operational updates → `article_type = operational_update`;
- `cau-chuyen-khach-hang` → `article_type = customer_story`.

Start with categories/tags rather than extra CPTs. Customer stories remain core-post editorial
artifacts and must pass `product/EDITORIAL-EVIDENCE-POLICY.md`. Split later only if real editorial
operations prove a distinct model need.

## Pages

Use pages for stable organization surfaces such as `gioi-thieu`, `lien-he` and `khong-gian` when their
approved content exists. Next route templates own presentation. A WordPress page does not define
frontend section order or visual layout.

## Media

WordPress attachments normalize to `Media`. P5 must register/validate provenance, authorization,
alt text, caption, media role, identity class and publishability status. A missing approval keeps the
asset out of public REST normalization. Stock cannot impersonate actual Toplink evidence.

## Site settings

A small plugin settings surface/API may hold only approved `SiteSettings` organization facts:

- public brand display name;
- address;
- opening hours;
- hotline;
- Zalo destination;
- Facebook/Messenger destination;
- social links;
- legal identifiers when supplied.

Until approved, omit or return `null` according to the REST contract; frontend normalization must
collapse rather than fabricate. Each contact destination is gated separately.

## REST support

Custom post types/taxonomies intended for headless consumption use `show_in_rest => true`. P5 must
register meta with explicit types, single/multiple semantics, REST exposure and authorization callbacks.
P6 validates and normalizes REST data before React consumption; raw WordPress shapes do not become
component interfaces.

The default transport remains native REST API (D-036). Do not add WPGraphQL without later evidence.

## Editorial roles

- **Author:** create/edit own `draft` records, cannot publish.
- **Editor:** move records through `in_review`/`approved` and publish after fact/media gates pass.
- **Administrator:** system/config only.

Do not give ordinary authors plugin/theme administration rights. WordPress lifecycle state does not
replace field-level fact status.

## Dependency boundary

P5 starts with core/custom registered meta in `toplink-content-model`. Do not add ACF paid, Elementor,
Divi, WPGraphQL, translation, ecommerce or general page-builder plugins in this draft.

## Future English readiness

V1 is Vietnamese. Do not install a translation plugin, language switcher, duplicate English content or
premature locale infrastructure. Keep field semantics portable; evaluate localization only after a real
English editorial need and evidence exist.

## P5 implementation acceptance input

P5 must demonstrate that an Author/Editor can create, review and publish all five normalized domains;
required fields prevent incomplete publication; pending optional fields disappear safely; REST output
contains no rejected/reference-only facts; and service/product/article contracts match P4 fixtures.
