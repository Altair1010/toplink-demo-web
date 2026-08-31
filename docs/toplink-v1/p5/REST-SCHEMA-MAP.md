# P5 REST Schema Map

## Base URL and behavior

Local default: `http://127.0.0.1:8085/wp-json/toplink/v1`.

All routes are GET/HEAD only. Collections return `{ "items": [...], "count": n }`. An unknown or ineligible detail returns HTTP `404`. Optional non-approved facts are absent, not `null` placeholders. Required missing/unapproved facts make the whole record ineligible. Private lifecycle, consent switches, credentials and `_toplink_*` governance never appear.

| Endpoint | Domain | Result |
| --- | --- | --- |
| `GET /schema` | all five | Versioned field contract and omission rule. |
| `GET /services` | Service | Eligible published collection. |
| `GET /services/{slug}` | Service | One eligible record or 404. |
| `GET /products` | Product | Eligible published collection. |
| `GET /products/{slug}` | Product | One eligible record or 404. |
| `GET /articles?type={type}` | Article | Eligible core Posts; optional canonical type filter. |
| `GET /articles/{slug}` | Article | One eligible core Post or 404. |
| `GET /media` | Media | Eligible attachments only. |
| `GET /media/{id}` | Media | One authorized attachment or 404. |
| `GET /site-settings` | SiteSettings | Independently approved settings; 404 if required identity is not approved. |

Every emitted field has the stable shape `{ value, owner, source, status: "APPROVED" }`.

## Service

| WP source | REST / future domain field | Type | Optional behavior |
| --- | --- | --- | --- |
| `post_title` | `title` | string | Required; record held. |
| `post_name` | `slug` | string | Required, SYSTEM-derived. |
| `post_excerpt` | `summary` | string | Required; record held. |
| `service_group` taxonomy | `service_group` | string slug | Required; record held. |
| `post_content` | `body` | string[] | Required; record held. |
| meta | `who_it_may_fit` | string[] | Required; record held. |
| meta | `limitations_cautions` | string[] | Required; record held. |
| meta | `professional_evaluation` | string | Required; record held. |
| meta | `experience_process` | string[] | Required; record held. |
| meta | `faq` | `[string,string][]` | Omitted unless approved/nonempty. |
| attachment ID meta | `media` | Media[] | Only eligible Media; otherwise omitted/filtered. |
| ID meta | `related_knowledge` | string[]/IDs for P6 normalization | Omitted unless approved/nonempty. |
| `menu_order` | `display_order` | integer | Required, SYSTEM-derived; zero is valid. |
| structured meta | `seo` | object | Required; record held. |
| meta | `evidence_state` | string | Required; record held. |

## Product

| WP source | REST / future domain field | Type | Optional behavior |
| --- | --- | --- | --- |
| `post_title` / `post_name` / `post_excerpt` | `title` / `slug` / `summary` | string | Required. |
| meta | `safe_positioning` | string | Required. |
| meta | `supported_use_statements` | string[] | Required. |
| meta | `limitations_cautions` | string[] | Required. |
| meta | `documentation_status` | string | Required. |
| `post_content` | `body` | string[] | Required. |
| meta | `faq` | `[string,string][]` | Omit unless approved/nonempty. |
| attachment ID meta | `media` | Media[] | Only eligible Media. |
| ID meta | `related_knowledge` | string[]/IDs for P6 normalization | Omit unless approved/nonempty. |
| structured meta | `seo` | object | Required. |
| meta | `evidence_state` | string | Required. |

## Article

| WP source | REST / future domain field | Type | Optional behavior |
| --- | --- | --- | --- |
| `post_title` / `post_name` / `post_excerpt` / `post_content` | `title` / `slug` / `summary` / `body` | string / string[] | Required. |
| canonical category | `article_type` | `knowledge \| news \| operational_update \| customer_story` | Required. |
| `post_author` | `author` | string | Required, SYSTEM-derived display name. |
| `post_date` | `published_at` | ISO datetime | Required after publication. |
| `post_modified` | `updated_at` | ISO datetime | Optional; omitted if absent. |
| featured attachment | `featured_media` | Media | Omitted unless Article fact and attachment gates pass. |
| ID meta | `related_services` / `related_articles` | string[]/IDs for P6 normalization | Omit unless approved/nonempty. |
| meta | `evidence_reference_state` | string | Required. |
| structured meta | `seo` | object | Required. |

## Media and SiteSettings

| WP source | REST / future domain field | Type | Optional behavior |
| --- | --- | --- | --- |
| attachment URL + metadata | `Media.asset` | `{src,width,height}` | Required. |
| attachment meta | `source_provenance`, `authorization`, `alt_text`, `media_role`, `identity_class`, `publishability_status` | string/enums | All required. |
| attachment excerpt | `caption` | string | Omit unless approved/nonempty. |
| plugin options | `SiteSettings.public_display_name` | string | Required; settings endpoint 404 otherwise. |
| plugin options | `address`, `opening_hours`, `hotline`, `zalo_destination`, `facebook_destination` | string | Independently omitted unless approved/nonempty. |
| plugin options | `social_links`, `legal_identifiers` | string[] | Independently omitted unless approved/nonempty. |

Generic stock is eligible only for `atmosphere`; it cannot project as evidence. P6 must treat ID relation values as transport data and normalize them to the existing TypeScript contract without exposing raw WordPress shapes to React.
