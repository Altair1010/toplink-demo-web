# Information Architecture and Content Map

**Status:** P2 canonical candidate for human approval.  
**Boundary:** Toplink product truth owns taxonomy/routes; P1 supplies only approved information-UX lessons.

## Primary navigation hierarchy

1. **Dịch vụ** — understand approved support options.
2. **Sản phẩm** — inspect informational products without a purchase path.
3. **Kiến thức** — learn evergreen dưỡng sinh/health knowledge.
4. **Tin tức** — follow operations, news, brand updates and real customer stories.
5. **Không gian** — understand the actual Toplink environment when evidence exists.
6. **Giới thiệu** — understand the organization, philosophy, scope and limits.
7. **Liên hệ** — access verified facts and optional external human handoff.

`/` is the orientation root. `/lien-he` is operational, not a content category. `/nhuong-quyen` is
backlog-only and absent from public navigation. This hierarchy does not prescribe header treatment,
viewport order or visual composition.

## Page relationship graph

```text
HOME /
├─ BRAND /gioi-thieu
├─ SERVICES /dich-vu ──> /dich-vu/[slug]
│                         ├─ related approved knowledge
│                         └─ optional verified CONTACT
├─ PRODUCTS /san-pham ──> /san-pham/[slug]
│                         └─ related approved knowledge
├─ KNOWLEDGE /kien-thuc ─> /kien-thuc/[slug]
│                         ├─ related knowledge
│                         └─ relevant service only when justified
├─ EDITORIAL /tin-tuc ──> /tin-tuc/[slug]
│                         ├─ related editorial content
│                         └─ contextual support only when justified
├─ SPACE /khong-gian ────> verified organization context
└─ CONTACT /lien-he ─────> Zalo | Facebook/Messenger | Phone (approved only)
```

## Relationship jobs

| From             | To                         | User job                                           | Rule                                          |
| ---------------- | -------------------------- | -------------------------------------------------- | --------------------------------------------- |
| Home             | Brand/services/knowledge   | Choose a meaningful understanding path             | Route by intent, not diagnosis.               |
| Brand            | Services/knowledge/contact | Move from philosophy and limits to evidence/help   | Contact stays optional.                       |
| Service index    | Service detail             | Compare approved families and inspect one          | No price or symptom diagnosis.                |
| Service detail   | Knowledge                  | Understand context, limits or supporting knowledge | Editorially justified only.                   |
| Service detail   | Contact                    | Resolve a remaining high-intent question           | Destination must be approved.                 |
| Product index    | Product detail             | Inspect an informational record                    | No purchase funnel.                           |
| Product detail   | Knowledge                  | Read supporting/limiting context                   | No upsell or purchase link.                   |
| Knowledge index  | Knowledge detail           | Learn by evergreen topic                           | Knowledge is a complete destination.          |
| Knowledge detail | Related knowledge          | Continue learning                                  | Curated and bounded.                          |
| Knowledge detail | Service detail             | Understand related support                         | Optional; no diagnosis inference.             |
| News index       | News detail                | Read current operations/news/brand/story content   | Editorial type stays explicit.                |
| News detail      | Related content/contact    | Continue context or seek optional help             | Depends on article intent.                    |
| Space            | Brand/contact              | Verify experience or practical context             | Actual-facility claims need authorized media. |
| Eligible page    | Contact                    | Choose a verified external channel                 | Never blocks content; pending links omitted.  |

## Knowledge versus news

### Kiến thức

- Evergreen education independent of current operations.
- Explains a topic, safe practice, context, limits or professional escalation.
- A visitor may learn and leave without contact.
- Reviewed when facts/evidence change, not merely to look current.

### Tin tức

- Time-bound operations, news, brand updates and real authorized customer stories.
- Reports what happened, changed or was documented.
- Publish/update dates and article type are first-class.
- Customer stories follow `EDITORIAL-EVIDENCE-POLICY.md`.

Both may use the `Article` domain object and WordPress core posts, while retaining distinct editorial
intent, archives, URL namespaces and page jobs.

## Secondary discovery and pending rules

- Relations are curated/bounded; none exists solely for SEO volume.
- Knowledge → service is optional and requires a semantic reason.
- Service/product → knowledge explains context or limits, not promotion.
- Article → contact requires a legitimate support question.
- Empty relation sets collapse without fabricated recommendations.
- A route pattern may exist while an individual detail page remains unpublished.
- Indexes include approved items only; empty types do not emit fake fixtures.
- `/khong-gian` never represents stock as actual premises.
- `/lien-he` may exist architecturally, but pending destinations are not links.
