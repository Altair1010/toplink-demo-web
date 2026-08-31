# P6 Private Preview Flow

1. An authenticated WordPress editor with `edit_post` receives a Next preview link.
2. WordPress signs `{post_type,id,slug,article_type?,exp}` with HMAC SHA-256 and a maximum five-minute expiration.
3. `/api/cms/preview` verifies shape, signature and expiry, stores the intent in a short-lived HttpOnly, SameSite=Lax cookie, then redirects to the canonical frontend path.
4. The detail server component matches the cookie to the requested type/slug and calls the private WordPress projection with the intent in a header.
5. WordPress independently verifies HMAC, expiry, type, ID, slug, article type and required field gates.
6. The private fetch is `no-store`; public REST and public cache remain draft-blind.
7. `/api/cms/preview/exit` expires the cookie and redirects to the configured web origin.

The preview secret is never placed in a `NEXT_PUBLIC` variable. The short-lived intent is removed from the canonical URL after entry. Local production-style HTTP uses an explicit loopback `TOPLINK_WEB_BASE_URL`; HTTPS makes the cookie Secure.
