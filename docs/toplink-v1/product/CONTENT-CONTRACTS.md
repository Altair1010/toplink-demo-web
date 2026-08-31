# Content Contracts

**Consumers:** P3 representative content requirements, P4 typed fixtures, P5 WordPress schema, P6
normalization and P7 publishing/SEO.  
**Domains:** exactly `Service`, `Product`, `Article`, `Media`, `SiteSettings`. No additional object is
defined without a current downstream consumer.

## Shared governance

### Owner families

| Owner       | Responsibility                                                               |
| ----------- | ---------------------------------------------------------------------------- |
| `BUSINESS`  | Organization, service, product, operational, legal and contact facts.        |
| `EDITORIAL` | User-facing explanation, article authorship, review and publication.         |
| `MEDIA`     | Provenance, authorization, identity consent, alt/caption and publishability. |
| `SYSTEM`    | Slugs, ordering, canonical URLs, relationships and safe omission behavior.   |

### Independent status axes

**Fact status** applies to every production fact:

- `APPROVED`: may publish when all other gates pass.
- `PENDING`: known slot, not supplied/verified; omit from production.
- `REJECTED`: invalid or deprecated; never publish.
- `REFERENCE_ONLY`: may inform research/editorial work; never represent as Toplink truth.

**Editorial lifecycle** applies only to publishable content records:

- `draft` → `in_review` → `approved` → `published`.

Fact status and editorial lifecycle are separate. A draft article can contain an `APPROVED` fact; a
polished article cannot publish a `PENDING` fact.

### Table notation

- `R`: required to publish the record.
- `O`: optional; rendered only when approved/publishable.
- “Publish status” describes the status gate, not a default value.

## Service

| Field                     | Owner            | Authoritative source                        | Publish status | Req | Pending behavior                                                                         |
| ------------------------- | ---------------- | ------------------------------------------- | -------------- | :-: | ---------------------------------------------------------------------------------------- |
| `title`                   | BUSINESS         | approved service record                     | APPROVED       |  R  | Keep record unpublished.                                                                 |
| `slug`                    | SYSTEM           | normalized approved title + uniqueness rule | APPROVED       |  R  | Keep record unpublished.                                                                 |
| `summary`                 | EDITORIAL        | approved service facts                      | APPROVED       |  R  | Keep record unpublished.                                                                 |
| `service_group`           | BUSINESS         | approved Toplink taxonomy                   | APPROVED       |  R  | Keep record unpublished; never infer from Sen/dossier alone.                             |
| `body`                    | EDITORIAL        | approved service facts/evidence             | APPROVED       |  R  | Keep record unpublished.                                                                 |
| `who_it_may_fit`          | BUSINESS         | approved bounded suitability statement      | APPROVED       |  R  | Keep record unpublished.                                                                 |
| `limitations_cautions`    | BUSINESS         | approved safety/legal/evidence record       | APPROVED       |  R  | Keep record unpublished.                                                                 |
| `professional_evaluation` | BUSINESS         | approved escalation guidance                | APPROVED       |  R  | Keep record unpublished when relevant; explicit “not applicable” requires approval.      |
| `experience_process`      | BUSINESS         | approved operational service record         | APPROVED       |  R  | Keep record unpublished.                                                                 |
| `faq`                     | EDITORIAL        | approved facts + real user questions        | APPROVED       |  O  | Omit FAQ.                                                                                |
| `media`                   | MEDIA            | authorized media records                    | APPROVED       |  O  | Omit media surface.                                                                      |
| `related_knowledge`       | SYSTEM           | editorially approved semantic relations     | APPROVED       |  O  | Omit relation surface.                                                                   |
| `display_order`           | SYSTEM           | approved editorial ordering                 | APPROVED       |  R  | Use stable system order only if explicitly defined; otherwise keep out of curated order. |
| `seo`                     | EDITORIAL/SYSTEM | approved title/summary + canonical route    | APPROVED       |  R  | Derive only allowed fields from approved content; otherwise hold publication.            |
| `evidence_state`          | BUSINESS         | evidence register/source review             | APPROVED       |  R  | Keep record unpublished.                                                                 |

There is no public pricing field and no hidden/null pricing slot.

## Product

| Field                      | Owner            | Authoritative source                       | Publish status | Req | Pending behavior                                  |
| -------------------------- | ---------------- | ------------------------------------------ | -------------- | :-: | ------------------------------------------------- |
| `title`                    | BUSINESS         | approved product record                    | APPROVED       |  R  | Keep record unpublished.                          |
| `slug`                     | SYSTEM           | normalized approved title + uniqueness     | APPROVED       |  R  | Keep record unpublished.                          |
| `summary`                  | EDITORIAL        | approved product facts                     | APPROVED       |  R  | Keep record unpublished.                          |
| `safe_positioning`         | BUSINESS         | approved product documentation/legal scope | APPROVED       |  R  | Keep record unpublished.                          |
| `supported_use_statements` | BUSINESS         | verified product documentation             | APPROVED       |  R  | Keep record unpublished; never infer uses.        |
| `limitations_cautions`     | BUSINESS         | verified documentation/safety review       | APPROVED       |  R  | Keep record unpublished.                          |
| `documentation_status`     | BUSINESS         | documentation verification record          | APPROVED       |  R  | Keep record unpublished.                          |
| `body`                     | EDITORIAL        | approved product facts                     | APPROVED       |  R  | Keep record unpublished.                          |
| `faq`                      | EDITORIAL        | approved facts + real questions            | APPROVED       |  O  | Omit FAQ.                                         |
| `media`                    | MEDIA            | authorized media records                   | APPROVED       |  O  | Omit media.                                       |
| `related_knowledge`        | SYSTEM           | approved semantic relations                | APPROVED       |  O  | Omit relations.                                   |
| `seo`                      | EDITORIAL/SYSTEM | approved title/summary + canonical         | APPROVED       |  R  | Derive from approved content or hold publication. |
| `evidence_state`           | BUSINESS         | evidence register/source review            | APPROVED       |  R  | Keep record unpublished.                          |

There is no price, cart, stock-commerce, purchase URL, checkout or upsell field.

## Article

`article_type` is one of `knowledge`, `news`, `operational_update`, `customer_story`. The type drives
archive/page job while all records share one domain contract.

| Field                      | Owner              | Authoritative source                    | Publish status | Req | Pending behavior                                                 |
| -------------------------- | ------------------ | --------------------------------------- | -------------- | :-: | ---------------------------------------------------------------- |
| `title`                    | EDITORIAL          | approved article manuscript             | APPROVED       |  R  | Keep record unpublished.                                         |
| `slug`                     | SYSTEM             | normalized approved title + uniqueness  | APPROVED       |  R  | Keep record unpublished.                                         |
| `summary`                  | EDITORIAL          | approved article body                   | APPROVED       |  R  | Keep record unpublished.                                         |
| `body`                     | EDITORIAL          | approved manuscript + source record     | APPROVED       |  R  | Keep record unpublished.                                         |
| `article_type`             | EDITORIAL          | editorial assignment                    | APPROVED       |  R  | Keep record unpublished.                                         |
| `author`                   | EDITORIAL          | verified WordPress author identity      | APPROVED       |  R  | Keep record unpublished; no fake byline.                         |
| `published_at`             | SYSTEM             | WordPress publication event             | APPROVED       |  R  | Not public before publication.                                   |
| `updated_at`               | SYSTEM             | WordPress revision event                | APPROVED       |  O  | Omit when no material update exists.                             |
| `featured_media`           | MEDIA              | authorized media record                 | APPROVED       |  O  | Omit featured media.                                             |
| `related_services`         | SYSTEM             | editorially approved semantic relations | APPROVED       |  O  | Omit relation surface.                                           |
| `related_articles`         | SYSTEM             | editorially approved semantic relations | APPROVED       |  O  | Omit relation surface.                                           |
| `evidence_reference_state` | EDITORIAL/BUSINESS | source review/evidence register         | APPROVED       |  R  | Keep record unpublished when claims require unresolved evidence. |
| `seo`                      | EDITORIAL/SYSTEM   | approved title/summary + canonical      | APPROVED       |  R  | Derive from approved content or hold publication.                |

For `customer_story`, consent, context and identity/media authorization in
`EDITORIAL-EVIDENCE-POLICY.md` are additional required publication gates.

## Editorial control metadata (not a production fact)

`Service`, `Product` and `Article` records each carry `editorial_lifecycle`, owned by `EDITORIAL` and
sourced from the WordPress workflow. Its values are exactly `draft`, `in_review`, `approved`,
`published`; only `published` records are eligible for public normalization. This control is required
in P5 but is not exposed as a production-facing fact and therefore does not receive a fact status.

## Media

| Field                   | Owner           | Authoritative source                               | Publish status | Req | Pending behavior                                                           |
| ----------------------- | --------------- | -------------------------------------------------- | -------------- | :-: | -------------------------------------------------------------------------- |
| `asset`                 | MEDIA           | controlled upload/asset record                     | APPROVED       |  R  | Media record is unusable.                                                  |
| `source_provenance`     | MEDIA           | creator/license/source record                      | APPROVED       |  R  | Media record is unusable.                                                  |
| `authorization`         | MEDIA           | license/consent/usage permission                   | APPROVED       |  R  | Do not publish asset.                                                      |
| `alt_text`              | MEDIA/EDITORIAL | actual content/role of asset                       | APPROVED       |  R  | Do not use informative asset; decorative role must be explicitly approved. |
| `caption`               | EDITORIAL       | approved factual context                           | APPROVED       |  O  | Omit caption.                                                              |
| `media_role`            | MEDIA           | page/content contract                              | APPROVED       |  R  | Do not publish asset.                                                      |
| `identity_class`        | MEDIA           | provenance review: actual Toplink or generic stock | APPROVED       |  R  | Do not publish asset.                                                      |
| `publishability_status` | MEDIA           | rights/identity/content review                     | APPROVED       |  R  | Do not publish asset.                                                      |

Generic stock may provide atmosphere only. It cannot be captioned or framed as Toplink premises,
staff, customer, procedure or outcome evidence.

## SiteSettings

| Field                  | Owner    | Authoritative source                    | Publish status | Req | Pending behavior                           |
| ---------------------- | -------- | --------------------------------------- | -------------- | :-: | ------------------------------------------ |
| `public_display_name`  | BUSINESS | D-001                                   | APPROVED       |  R  | Site cannot publish organization identity. |
| `address`              | BUSINESS | verified operational record             | APPROVED       |  O  | Omit address/maps/local schema.            |
| `opening_hours`        | BUSINESS | verified operational record             | APPROVED       |  O  | Omit hours.                                |
| `hotline`              | BUSINESS | verified channel record                 | APPROVED       |  O  | Omit phone action/fact.                    |
| `zalo_destination`     | BUSINESS | verified official channel record        | APPROVED       |  O  | Omit Zalo action/link.                     |
| `facebook_destination` | BUSINESS | verified official Page/Messenger record | APPROVED       |  O  | Omit Facebook action/link.                 |
| `social_links`         | BUSINESS | verified official channel records       | APPROVED       |  O  | Omit each pending link.                    |
| `legal_identifiers`    | BUSINESS | verified legal record                   | APPROVED       |  O  | Omit legal identifier.                     |

No placeholder number, address, destination, social identity or response-time promise is permitted.

## Universal pending and page-level behavior

`PENDING != PLACEHOLDER`:

- Required field pending → record/detail page remains unpublished.
- Optional field pending → omit the field/module and preserve the page job if it remains useful.
- Pending contact destination → no actionable link/control and no synthetic success state.
- Index with zero publishable records → hold the index rather than render fake content.
- Contact page with no useful approved operational fact/channel → hold it from production.
- Space page without actual authorized evidence → hold it or publish only bounded approved context that
  does not claim generic media is Toplink.
- Rejected/reference-only facts never flow to fixtures, REST output, metadata or structured data.

## Health-content field gates

- Supportive language is not a cure claim.
- No absolute outcome or guaranteed timeline.
- Product/device statements require approved documentation.
- A story/testimonial never establishes a universal outcome.
- `limitations_cautions` and `professional_evaluation` are required where the subject can create a
  safety decision; an approved “not applicable” decision must be explicit.
- Copy may not exceed confirmed legal/operational scope.

## Downstream mapping

| Consumer | Uses                                                                                 |
| -------- | ------------------------------------------------------------------------------------ |
| P3       | Required information hierarchy and representative content states, not visual values. |
| P4       | Exact domain/field/required/pending semantics for typed fixtures.                    |
| P5       | CPT/core-post/media/settings schema and editorial controls.                          |
| P6       | REST validation, normalization, omission and failure behavior.                       |
| P7       | Metadata, schema eligibility and verified contact actions.                           |
