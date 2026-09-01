# P7 Analytics Event Contract

## Closed taxonomy

Events:

- `contact_zalo_click`
- `contact_facebook_click`
- `contact_phone_click`

Placements:

- `header`
- `service_detail`
- `article`
- `footer`
- `contact_page`
- `mobile_contact_surface`

Payload shape:

```json
{
  "event": "contact_zalo_click",
  "channel": "zalo",
  "placement": "service_detail",
  "destination_class": "https_url"
}
```

No URL, phone number, CMS provenance, content body, user input, PII or health data may enter the payload.

## Vendor boundary

`pushAnalyticsEvent` writes to a first-party `window.dataLayer`. Contact UI has no `gtag`, `fbq` or `ttq` dependency. GA4 is only a central configuration contract:

- `TOPLINK_ANALYTICS_VENDOR_ALLOWED=1`
- `TOPLINK_GA4_MEASUREMENT_ID=G-XXXXXXXXXX`

Both are required before config reports GA4 load eligibility. P7 intentionally contains no GA/GTM/Meta/TikTok network loader. Consent/legal activation remains a later explicit decision.
