# SEO and Content Architecture

**Scope:** P2 URL/topic/metadata/schema contract only. No keyword-volume research, analytics
implementation or production schema emission occurs in P2.

## URL architecture

| Content job                            | Pattern                           |
| -------------------------------------- | --------------------------------- |
| Orientation                            | `/`                               |
| Brand                                  | `/gioi-thieu`                     |
| Service discovery/detail               | `/dich-vu`, `/dich-vu/[slug]`     |
| Product discovery/detail               | `/san-pham`, `/san-pham/[slug]`   |
| Evergreen knowledge discovery/detail   | `/kien-thuc`, `/kien-thuc/[slug]` |
| News/operations/story discovery/detail | `/tin-tuc`, `/tin-tuc/[slug]`     |
| Actual space                           | `/khong-gian`                     |
| Verified contact/organization facts    | `/lien-he`                        |

Slugs are stable, lowercase, Vietnamese semantic slugs without query-dependent identity. A content
type does not publish a thin URL merely because its route pattern exists. `/nhuong-quyen` remains
backlog and absent from sitemap/navigation.

## Topic relationships

```text
Knowledge topic
  -> related knowledge (curated, bounded)
  -> relevant service only when an approved semantic relation exists

Service/Product
  -> supporting or limiting knowledge

News/Story
  -> related editorial context
  -> other domain only when the reported subject requires it
```

An article must fulfill its own page job. It is not a thin sales doorway. Service relations are not
added solely for ranking or conversion.

## Metadata field requirements

| Field                    | Owner/source                                           | Requirement                      | Pending behavior                                          |
| ------------------------ | ------------------------------------------------------ | -------------------------------- | --------------------------------------------------------- |
| `title`                  | EDITORIAL from approved page/record title              | Required for every public URL    | Hold publication.                                         |
| `description`            | EDITORIAL from approved summary/body                   | Required                         | Hold publication; never generic filler.                   |
| `canonical`              | SYSTEM from canonical route + approved public origin   | Required                         | No production publish until origin/route resolves safely. |
| `open_graph`             | SYSTEM/EDITORIAL from approved title, description, URL | Required baseline                | Use approved text only.                                   |
| `open_graph_image`       | MEDIA authorized publishable record                    | Optional                         | Omit image-specific metadata.                             |
| `author`                 | EDITORIAL verified identity                            | Required on Article detail       | Hold article publication.                                 |
| `published_at`           | SYSTEM WordPress event                                 | Required on Article detail       | Article is not public.                                    |
| `updated_at`             | SYSTEM WordPress revision event                        | Required when materially updated | Omit when no material update.                             |
| `image_alt_width_height` | MEDIA asset record                                     | Required when image is used      | Do not publish informative image without them.            |

Metadata is a production-facing field set and follows the same `APPROVED`/`PENDING` behavior as body
content. No Sen/H7 metadata becomes Toplink truth.

## Structured-data eligibility

| Candidate                 | Eligible only when                                                    | Never infer                             |
| ------------------------- | --------------------------------------------------------------------- | --------------------------------------- |
| `Organization`            | approved identity/legal/contact facts exist                           | legal name, social identity or contact. |
| `LocalBusiness`           | approved name/address/phone/hours and applicable business facts exist | location, hours, category or branch.    |
| `Service`                 | published Service record has required approved facts                  | outcomes, offers or price.              |
| `Article` / `BlogPosting` | published Article has verified author/dates/content                   | authorship, dates or claims.            |
| `BreadcrumbList`          | canonical route ancestry is public and accurate                       | hidden/backlog routes.                  |

No `Offer` or pricing schema is permitted. Eligibility is not emission: P7/P8 must validate actual
facts before production output.

## Internal linking rules

- Link by user job and semantic relevance, not quota.
- Keep related sets curated and bounded.
- Knowledge → service is optional, justified and non-diagnostic.
- Service/product → knowledge should explain context, limits or safe use.
- News/story → contact/domain link depends on editorial intent.
- Link labels describe the destination; no vague or manipulative copy.
- No orphan public detail page; every published detail is reachable from its archive or a meaningful
  approved relation.
- Pending/unpublished targets are absent, not dead links.

## Indexing and empty-state policy

- Only canonical, useful, approved public pages enter sitemap/indexing.
- Empty archives, pending detail records, duplicate previews and internal CMS routes are not indexed.
- Preview/staging indexing policy is a later environment gate.
- Canonical public domain is provisional (`toplink.vn`, D-024); domain change must not alter the route
  or content model.

## Knowledge/news distinction for search

- `kien-thuc`: evergreen informational intent, topic continuity and evidence maintenance.
- `tin-tuc`: time-bound current/operational/story intent with publication context.
- Shared Article infrastructure does not justify duplicate pages or cross-posted identical content.
