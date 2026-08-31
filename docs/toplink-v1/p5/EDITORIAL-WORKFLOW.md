# P5 Editorial Workflow

## Lifecycle

```text
draft -> in_review -> approved -> published
```

This private lifecycle is separate from FACT STATUS. The practical native flow is:

1. Author creates/edits an own draft and records source/status where known.
2. Author submits the WordPress record for review; Author cannot publish Article, Service or Product.
3. Editor reviews required values, sources, statuses, evidence and any story/media gates.
4. Editor saves lifecycle `approved` while the WordPress record remains draft/pending.
5. Editor publishes. A successful transition writes lifecycle `published`; a failed transition remains pending and shows field-specific notices.

Approval and publication are intentionally two explicit saves so publication validation reads a persisted approval state.
Author forms expose only `draft`/`in_review` lifecycle choices and cannot persist canonical `APPROVED` fact status; server-side checks enforce the same rule against crafted requests.

## Roles

| Role | Allowed | Denied |
| --- | --- | --- |
| Author | Create/edit own Article, Service and Product drafts; submit for review. | All three publish caps; settings; plugin/theme administration. |
| Editor | Review; persist approval; publish valid records; manage Toplink SiteSettings. | Plugin/theme administration. |
| Administrator | System/configuration and all Toplink capabilities. | Routine editorial use is not required. |

## Native admin surfaces

- Core editor for title, summary, body, author, featured image and display order.
- Native taxonomies for `service_group` and Article categories.
- One server-rendered Toplink meta box for model fields, fixed OWNER, SOURCE, FACT STATUS, lifecycle and story gates.
- One Settings page for independently governed SiteSettings.
- Attachment meta box for provenance, authorization, alt, role, identity and publishability.

Every meta-box write uses nonce verification, `edit_post` capability, sanitization and escaped output. Settings use the WordPress Settings API plus `manage_toplink_settings`.
