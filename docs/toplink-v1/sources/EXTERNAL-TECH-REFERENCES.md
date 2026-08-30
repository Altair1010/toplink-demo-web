# External Technical References — verification set

These are reference links for implementation-time verification. Prefer official documentation and re-check before production because platform behavior/terms can change.

## WordPress

- REST API Handbook: https://developer.wordpress.org/rest-api/
- REST authentication: https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/
- Custom post types in REST (`show_in_rest`): https://developer.wordpress.org/rest-api/extending-the-rest-api/adding-rest-api-support-for-custom-content-types/
- `register_post_type`: https://developer.wordpress.org/reference/functions/register_post_type/
- Application Passwords security/admin reference: https://developer.wordpress.org/advanced-administration/security/application-passwords/

Implementation implications:

- WordPress REST can feed an entirely separate frontend application.
- Custom post types intended for headless use should expose REST deliberately.
- Application Passwords are suitable for remote application authentication where needed; do not expose them to the browser.

## Next.js 16

- Caching/revalidation guide: https://nextjs.org/docs/app/guides/caching-without-cache-components
- Cache Components/revalidation: https://nextjs.org/docs/app/getting-started/revalidating
- Next.js 16 upgrade notes: https://nextjs.org/docs/app/guides/upgrading/version-16
- Self-hosting: https://nextjs.org/docs/app/guides/self-hosting

Implementation implications:

- Prefer scoped on-demand revalidation for CMS publish events.
- Keep cache behavior explicit enough to work both on managed hosting and a future VPS.
- Do not hard-code a Vercel-only content model.

## Vercel

- Current Terms: https://vercel.com/legal/terms

At package creation time (2026-08-30), the Terms state that Hobby is for personal/non-commercial use. Treat Hobby as preview/staging for this commercial project unless terms/plan change.
