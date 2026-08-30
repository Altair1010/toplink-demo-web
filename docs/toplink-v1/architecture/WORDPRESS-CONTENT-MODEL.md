# WordPress Content Model — V1

## Custom plugin

Create `wordpress/plugins/toplink-content-model/`.

The plugin owns content types, taxonomies, meta schemas and any custom REST/settings endpoint. A WordPress theme must not own these models.

## Custom post types

### `service`

Public REST-enabled. Suggested fields/contracts:

- title
- slug
- excerpt/summary
- approved rich content
- featured image / gallery relation
- service group/category
- who_it_may_fit (bounded/supportive language)
- caution / when to seek professional evaluation
- process/experience sections
- FAQ
- display order
- SEO override fields only if necessary
- evidence/content status

**No price field in V1 public contract.**

### `product`

Public REST-enabled, informational only:

- title
- safe positioning
- supported use statements
- caution/limitations
- documentation verification status
- featured media/gallery
- long description
- FAQ
- SEO

No cart, price or purchase CTA.

## Core posts

Use WordPress posts for:

- `kien-thuc` evergreen education;
- `tin-tuc` operational/news posts;
- `cau-chuyen-khach-hang` real customer/testimonial stories.

Start with categories/tags rather than extra CPTs. Split later only if editorial operations prove the need.

## Pages

Use pages for stable organization surfaces such as giới thiệu, liên hệ and possibly không gian, while frontend presentation remains owned by Next templates.

## Site settings

A small plugin settings surface/API may later hold approved organization-level facts:

- public brand display name;
- address;
- opening hours;
- hotline;
- Zalo destination;
- Facebook/Messenger destination;
- social links;
- legal identifiers when supplied.

Until approved, return `null`; frontend must collapse rather than fabricate.

## REST support

Custom post types/taxonomies intended for headless consumption must be registered with `show_in_rest => true`.

## Editorial roles

- **Author:** create/edit own drafts, cannot publish.
- **Editor:** review/edit/publish.
- **Administrator:** system/config only.

Do not give ordinary authors plugin/theme administration rights.

## Future English readiness

Do not install a translation plugin in V1 solely for future possibility. Keep frontend UI strings centralized and domain types locale-aware. When English enters scope, evaluate Polylang/WPML/custom relation based on editorial needs then.
