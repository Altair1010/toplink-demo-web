# Phase Card P5–P6 — WordPress + Headless Integration

## P5 CMS foundation

- local Docker WordPress/database;
- custom domain-model plugin;
- service/product CPTs;
- post categories for knowledge/news/customer story;
- REST schemas;
- author/editor workflow;
- seeded nonproduction content.

## P6 integration

- server-side REST client;
- schema validation/normalization;
- replace fixture data progressively;
- draft preview;
- signed webhook;
- scoped cache revalidation;
- failure/fallback behavior;
- media normalization.

## Test scenarios

1. Author creates draft → not public.
2. Editor previews draft → sees unpublished change.
3. Editor publishes → correct frontend route updates.
4. Editor changes slug → redirect/SEO behavior handled deliberately.
5. Editor unpublishes → route no longer exposes stale content.
6. Missing optional fields → component collapses cleanly.
7. CMS unavailable → controlled error/cached behavior.
8. No private WP credential appears in client bundle.
