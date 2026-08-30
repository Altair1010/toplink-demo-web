# Deployment Topology

## Development / preview stage

```text
GitHub private repo
      │
      ├── Vercel Hobby preview (non-commercial only under current terms)
      │
      └── local WordPress via Docker
```

Vercel Hobby is useful while designing/testing but must not be labeled the final commercial production runtime under current 2026-06 Terms.

## Intended production topology

```text
toplink.vn
   ↓
Next.js production runtime
   ↓
server-side REST fetch
   ↓
cms.toplink.vn
   ↓
WordPress + database + media
```

Visitors should not need to know the CMS exists. Staff access `cms.toplink.vn/wp-admin`.

## Commercial release hosting gate

Before launch choose one:

1. commercial Vercel plan; or
2. VPS/host capable of standard Next.js Node deployment and HTTPS.

The WordPress CMS also requires persistent public hosting before commercial launch.

## Future VPS portability

Document:

- Node version;
- build/start commands;
- required environment variables;
- cache/revalidation behavior;
- reverse proxy settings;
- media/CORS assumptions;
- health checks;
- backup restore procedure.

Avoid architecture that forces a rewrite when moving from Vercel to VPS.

## DNS

Provisional:

- `toplink.vn` / `www.toplink.vn` → frontend
- `cms.toplink.vn` → WordPress

Do not change DNS before staging is accepted and rollback is prepared.

## Backup

Production WordPress must have automated database + uploads backup with a tested restore path. “Backup configured” is not enough; perform at least one restore test before release.
