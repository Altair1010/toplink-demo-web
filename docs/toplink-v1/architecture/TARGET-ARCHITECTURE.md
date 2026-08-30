# Target Technical Architecture

## Repository layout — proposed, no monorepo framework

```text
/
├── web/                         # Next.js production frontend
├── wordpress/
│   └── plugins/
│       └── toplink-content-model/
├── infra/
│   └── wordpress-dev/          # local Docker setup
├── docs/
│   └── toplink-v1/
├── scripts/
├── .github/workflows/
└── AGENTS.md
```

Do not introduce Turborepo/Nx/workspace orchestration unless concrete multi-package pain appears.

## Frontend

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS v4 retained only as a useful primitive layer
- authored CSS/tokens for visual identity
- GSAP optional after approved motion spec
- server rendering/caching suited to CMS content

## CMS

- WordPress self-hosted architecture
- native REST API
- custom plugin for domain model
- core editor for staff
- core media library
- no page builder

## Data flow

```text
WordPress public REST
      ↓
server-side wp-client
      ↓
response validation
      ↓
normalizers
      ↓
Toplink domain types
      ↓
server/client React components as appropriate
```

## Cache/revalidation

Use scoped cache tags/paths. WordPress publish/update triggers a signed webhook into a server route that validates HMAC and revalidates only affected content families/routes.

Do not make the entire site dynamic because WordPress exists.

## Portability

Avoid Vercel-only business logic. Deployment-specific adapters may exist, but app behavior must remain runnable via standard Node/self-hosted Next when the user moves to VPS.
