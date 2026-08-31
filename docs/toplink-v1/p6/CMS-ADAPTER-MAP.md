# P6 CMS Adapter Map

| WordPress endpoint | Validator/reader | Toplink output | Public consumer |
| --- | --- | --- | --- |
| `/services` and `/services/{slug}` | `schemas.ts`, `services.ts` | `Service` | home, service index/detail |
| `/products` and `/products/{slug}` | `schemas.ts`, `products.ts` | `Product` | product index/detail |
| `/articles` and `/articles/{slug}` | `schemas.ts`, `articles.ts` | `Article` | home, knowledge/news index/detail |
| `/media` and `/media/{id}` | `schemas.ts`, `media.ts` | `Media` | centralized `MediaFigure` boundary and nested content media |
| `/site-settings` | `schemas.ts`, `site-settings.ts` | `SiteSettings` | shell/home/contact surfaces |

`wp-client.ts` is marked `server-only`, accepts only HTTP(S), limits local plain HTTP to loopback, applies a five-second timeout, requires JSON content type, and classifies 404 separately from unavailable/schema-invalid responses.

Collections use `page` and `per_page`, capped at 100 per request. The adapter follows `next_page` up to a defensive 1,000-page bound, so the original P5 100-record query no longer silently truncates indexes.

Relations are projected by WordPress as eligible route-safe slugs and validated again by the adapter:

- `Service.related_knowledge`: article slugs;
- `Product.related_knowledge`: article slugs;
- `Article.related_services`: service slugs;
- `Article.related_articles`: article slugs.

Numeric WordPress relation IDs never enter React.
