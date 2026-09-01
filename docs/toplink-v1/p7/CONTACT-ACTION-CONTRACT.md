# P7 Contact Action Contract

## Source and eligibility

Only these normalized SiteSettings fields are consumers:

| Action             | Field                  | Event                    |
| ------------------ | ---------------------- | ------------------------ |
| `contact_zalo`     | `zalo_destination`     | `contact_zalo_click`     |
| `contact_facebook` | `facebook_destination` | `contact_facebook_click` |
| `contact_phone`    | `hotline`              | `contact_phone_click`    |

The field must exist, contain a non-empty string and have fact status `APPROVED`. `PENDING`, `REJECTED` and `REFERENCE_ONLY` produce no action.

## Destination validation

- Zalo: HTTPS, no credentials/port/fragment, non-root path and an explicit Zalo host (`zalo.me`, `chat.zalo.me`, `oa.zalo.me`).
- Facebook/Messenger: the same URL safety rules and an explicit Facebook/Messenger host allowlist.
- Phone: accepts only a verified value made of digits plus ordinary phone separators; removes separators for `tel:` while preserving an existing leading `+`. It neither adds nor changes a country code.
- Invalid approved-looking values produce no action and a typed `invalid_approved_destination` finding without logging the raw destination.

No empty href, `#`, `javascript:`, `data:` or guessed fallback exists.

## UI meaning

A click means only that the user initiated an outbound contact action. It is not a lead, booking, delivered message or sale. Tracking is synchronous first-party state and is never awaited before native navigation.
