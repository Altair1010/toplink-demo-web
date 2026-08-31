# V1 Page Archetypes — P2 Canonical Candidate

**Status:** complete candidate for human approval before P3.  
**Rule:** each route earns its place through a distinct page job, content model or navigation need.
These contracts describe information and outcomes, not visual composition.

## Route graph summary

|   # | Route pattern       | Distinct reason                                           |
| --: | ------------------- | --------------------------------------------------------- |
|   1 | `/`                 | Cross-domain orientation and need recognition.            |
|   2 | `/gioi-thieu`       | Organization philosophy, scope, boundaries and trust.     |
|   3 | `/dich-vu`          | Compare approved service families.                        |
|   4 | `/dich-vu/[slug]`   | Explain one approved service and its limits.              |
|   5 | `/san-pham`         | Discover informational product records.                   |
|   6 | `/san-pham/[slug]`  | Explain one product safely without commerce.              |
|   7 | `/kien-thuc`        | Discover evergreen educational topics.                    |
|   8 | `/kien-thuc/[slug]` | Complete one long-form learning job.                      |
|   9 | `/tin-tuc`          | Discover time-bound operations/news/brand/story content.  |
|  10 | `/tin-tuc/[slug]`   | Read one typed editorial record in context.               |
|  11 | `/khong-gian`       | Understand actual Toplink space from authorized evidence. |
|  12 | `/lien-he`          | Find verified organization facts and optional contact.    |

## Route contracts

### `/`

- **Page job:** orient visitors to Toplink, recognize a need/learning intent, establish boundaries and
  route to the right information domain.
- **Primary audience:** all five segments. **Secondary:** none; this is cross-audience.
- **Entry intent:** brand query, broad discovery, uncertain need or return navigation.
- **Required content:** approved name; product definition; trust/safety boundary; entry paths to every
  publishable in-scope domain.
- **Optional content:** descriptor, selected editorial content, verified space evidence, approved contacts.
- **Trust requirement:** no diagnosis prompt, fake proof, price, urgency or unsupported claim.
- **Conversion role:** discovery first; optional handoff after understanding/trust.
- **Internal links:** all publishable top-level routes.
- **Content owner:** `BUSINESS` facts; `EDITORIAL` summaries; `SYSTEM` assembly.
- **Empty/pending behavior:** omit unavailable domains/facts; never synthesize cards/destinations.

### `/gioi-thieu`

- **Page job:** explain role, philosophy, experience intent, scope and limits.
- **Primary audience:** trust/fit evaluators. **Secondary:** all five segments.
- **Entry intent:** understand who Toplink is and what it is/is not.
- **Required content:** public name, role, philosophy/voice, boundaries and health/trust posture.
- **Optional content:** approved history/legal identity and real people/place evidence.
- **Trust requirement:** separate approved facts from dossier direction; no authority theater.
- **Conversion role:** quiet optional contact after understanding.
- **Internal links:** services, knowledge, space and contact when relevant.
- **Content owner:** `BUSINESS`, `EDITORIAL`, `MEDIA` by field.
- **Empty/pending behavior:** omit unsupported history/team/legal/media claims.

### `/dich-vu`

- **Page job:** compare approved service families without self-diagnosis.
- **Primary audience:** Hanoi adults, older visitors, caregivers, proactive women. **Secondary:** knowledge readers.
- **Entry intent:** learn available support and choose a record to inspect.
- **Required content:** approved title, summary, group, bounded fit and service-safety context.
- **Optional content:** related knowledge and verified organization context.
- **Trust requirement:** no symptom-to-treatment mapping, price or guaranteed suitability.
- **Conversion role:** discovery to detail; contact optional/contextual.
- **Internal links:** approved service details, related knowledge, justified contact.
- **Content owner:** `BUSINESS` facts; `EDITORIAL` publication; `SYSTEM` ordering.
- **Empty/pending behavior:** exclude unpublished services; hold an empty index instead of inventing taxonomy.

### `/dich-vu/[slug]`

- **Page job:** explain one service's purpose, fit, process, limitations, cautions and evidence.
- **Primary audience:** evaluator for self/family. **Secondary:** related knowledge readers.
- **Entry intent:** understand one service and choose a safe next step.
- **Required content:** all required `Service` fields in `CONTENT-CONTRACTS.md`.
- **Optional content:** FAQ, authorized media, related knowledge, approved contacts.
- **Trust requirement:** evidence, limits/cautions and professional escalation; no price/outcome promise.
- **Conversion role:** resolve doubt, then optional external contact.
- **Internal links:** service index, related knowledge, justified services/contact.
- **Content owner:** `BUSINESS`, `EDITORIAL`, `MEDIA`, `SYSTEM` by field.
- **Empty/pending behavior:** do not publish without required approved fields; optional modules collapse.

### `/san-pham`

- **Page job:** provide an informational catalog of approved product records.
- **Primary audience:** product-information seekers. **Secondary:** caregivers/knowledge readers.
- **Entry intent:** discover products with approved information.
- **Required content:** title, summary/safe positioning and documentation state.
- **Optional content:** category/topic discovery and related knowledge.
- **Trust requirement:** informational only; no price, stock, purchase or upsell.
- **Conversion role:** discovery to detail only.
- **Internal links:** approved product details and related knowledge.
- **Content owner:** `BUSINESS`, `EDITORIAL`, `SYSTEM` by field.
- **Empty/pending behavior:** hold empty catalog; never invent products.

### `/san-pham/[slug]`

- **Page job:** explain safe positioning, supported uses, documentation and limits without commerce.
- **Primary audience:** product researcher. **Secondary:** caregiver/knowledge reader.
- **Entry intent:** verify what is known, supported and limited.
- **Required content:** all required `Product` fields in `CONTENT-CONTRACTS.md`.
- **Optional content:** authorized media, FAQ and related knowledge.
- **Trust requirement:** evidence/documentation state and limitations; no universal claim.
- **Conversion role:** education only; no product purchase CTA.
- **Internal links:** product index and semantically related knowledge.
- **Content owner:** `BUSINESS`, `EDITORIAL`, `MEDIA`, `SYSTEM` by field.
- **Empty/pending behavior:** do not publish without required approved facts.

### `/kien-thuc`

- **Page job:** discover evergreen dưỡng sinh/health education by meaningful topic.
- **Primary audience:** national knowledge audience. **Secondary:** all research-oriented segments.
- **Entry intent:** learn, browse a topic or continue reading.
- **Required content:** published knowledge title, summary, topic/type and date context.
- **Optional content:** curated topics and justified service entry points.
- **Trust requirement:** useful without contact; evidence/experience/inference remain distinct.
- **Conversion role:** learning completion or continued discovery.
- **Internal links:** knowledge details; optional relevant services.
- **Content owner:** `EDITORIAL`; `SYSTEM` for archive semantics.
- **Empty/pending behavior:** hold thin/empty archive until useful approved content exists.

### `/kien-thuc/[slug]`

- **Page job:** deliver one evergreen explanation with evidence bounds, limits and safe context.
- **Primary audience:** national knowledge reader. **Secondary:** service/product researchers/caregivers.
- **Entry intent:** answer a learning question without facility intent.
- **Required content:** required `Article` fields for type `knowledge`.
- **Optional content:** related knowledge/references, justified service relation, optional contact.
- **Trust requirement:** no diagnosis/prescription; caution/escalation where relevant.
- **Conversion role:** learn → understand → safe application can be DONE.
- **Internal links:** knowledge index, bounded related knowledge, justified service.
- **Content owner:** `EDITORIAL`; `BUSINESS` facts; `MEDIA` assets.
- **Empty/pending behavior:** do not publish without approved body/evidence requirements.

### `/tin-tuc`

- **Page job:** discover time-bound operations, news, brand updates and authorized stories.
- **Primary audience:** current-activity visitors. **Secondary:** all relevant segments.
- **Entry intent:** see what is current/documented, not learn an evergreen topic.
- **Required content:** published typed records with title, summary, type and dates.
- **Optional content:** filters only when volume proves need.
- **Trust requirement:** type/date/source context; stories meet evidence policy.
- **Conversion role:** editorial discovery; support only when justified.
- **Internal links:** news details and contextual domain links.
- **Content owner:** `EDITORIAL`; `SYSTEM` archive semantics.
- **Empty/pending behavior:** hold route until useful approved editorial content exists.

### `/tin-tuc/[slug]`

- **Page job:** present one news/update/story with preserved context.
- **Primary audience:** reader of that record. **Secondary:** relevant brand/service researchers.
- **Entry intent:** understand what happened, changed or was documented.
- **Required content:** required `Article` fields for its declared non-knowledge type.
- **Optional content:** related editorial/contextual links and approved contact.
- **Trust requirement:** date/type/source integrity; consent and no universal story claims.
- **Conversion role:** follows editorial intent; never automatic sales.
- **Internal links:** news index, related editorial, justified domain links.
- **Content owner:** `EDITORIAL`; `BUSINESS` operational facts; `MEDIA` identity assets.
- **Empty/pending behavior:** unpublished until facts/permissions pass; optional links collapse.

### `/khong-gian`

- **Page job:** explain actual Toplink space and experience context using authorized evidence.
- **Primary audience:** trust/privacy/experience evaluators. **Secondary:** service researchers.
- **Entry intent:** understand the place before optional contact/visit.
- **Required content:** approved organization context and enough authorized actual-Toplink media.
- **Optional content:** approved accessibility/arrival/privacy and related links.
- **Trust requirement:** stock never impersonates premises, people or outcomes.
- **Conversion role:** reduce uncertainty; optional practical contact.
- **Internal links:** about, services and contact.
- **Content owner:** `BUSINESS`, `MEDIA`, `EDITORIAL` by field.
- **Empty/pending behavior:** hold route or use only approved non-visual context; never fake premises.

### `/lien-he`

- **Page job:** provide verified facts and optional external human handoff.
- **Primary audience:** high-intent/operational visitors. **Secondary:** any visitor needing facts.
- **Entry intent:** contact Toplink or confirm practical information.
- **Required content:** approved name and at least one useful approved fact; each action separately needs
  an approved destination.
- **Optional content:** address, hours, hotline, Zalo, Facebook/Messenger, directions, legal facts.
- **Trust requirement:** no guessed link/number, fake response promise, form or stored lead.
- **Conversion role:** external-only Zalo, Facebook/Messenger or phone.
- **Internal links:** relevant brand/service context and return navigation.
- **Content owner:** `BUSINESS` facts; `SYSTEM` safe rendering/analytics IDs.
- **Empty/pending behavior:** omit pending actions; if no useful approved fact exists, do not publish.

## Backlog and critical exit test

- `/nhuong-quyen`: BACKLOG (D-018), no public route/navigation.
- Staff/team, multi-branch, academy and English routes are absent until separately approved.

Example: `/dich-vu/[slug]` serves a service evaluator; its job, required `Service` content, ownership,
status and safe next links are fully specified above without selecting any color, font, component,
animation or visual layout.
