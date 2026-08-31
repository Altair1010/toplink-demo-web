# CTA and Conversion Map

## Action taxonomy

| Class        | Job                                       | Examples                         | Conversion meaning                        |
| ------------ | ----------------------------------------- | -------------------------------- | ----------------------------------------- |
| `NAVIGATION` | Move to a known route/section             | Home, Dịch vụ, back to index     | None by itself.                           |
| `DISCOVERY`  | Inspect a related record/domain           | View service, related article    | Understanding/exploration.                |
| `LEARN`      | Continue or complete education            | Read guide, next knowledge topic | Valid journey completion without contact. |
| `CONTACT`    | Leave the site for verified human handoff | Zalo, Facebook/Messenger, phone  | Optional high-intent conversion.          |

Not every link/button is a CTA. Analytics and copy should preserve the action's actual job.

## Canonical contact actions

| Action             | User intent                         | Eligible page jobs                                                       | Required context                                      | Required verified fact                         | Pending behavior              |
| ------------------ | ----------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------- | ---------------------------------------------- | ----------------------------- |
| `contact_zalo`     | Start a human conversation in Zalo  | service detail, relevant article, space, contact, bounded global utility | User has enough context to know why contact may help  | `SiteSettings.zalo_destination = APPROVED`     | Omit actionable control/link. |
| `contact_facebook` | Start a Page/Messenger conversation | same eligible jobs as Zalo                                               | Same non-coercive context                             | `SiteSettings.facebook_destination = APPROVED` | Omit actionable control/link. |
| `contact_phone`    | Call a verified hotline             | service detail, space, contact, bounded global utility                   | Operational/high-intent question; no response promise | `SiteSettings.hotline = APPROVED`              | Omit actionable control/link. |

Each placement carries its page-job context for later analytics, e.g. `header`, `service_detail`,
`article`, `footer`, `contact_page`, `mobile_contact_surface`. P2 defines identifiers only; analytics
implementation remains later scope.

## Placement rules

- Place contact near a resolved, high-intent question: after service fit/limits/process, after relevant
  article context, or with verified practical information.
- Contact must remain subordinate to educational/trust content and cannot obscure limitations.
- Knowledge-only completion remains valid without seeing/using contact.
- An article gets contact only when its intent creates a legitimate support question.
- Product detail has no purchase CTA; a global/contact-page path may remain available but must not act
  as a product funnel.
- No action may imply appointment confirmation, data submission or response-time certainty.

## Prohibited conversion patterns

- urgency, countdown, fake scarcity or fear framing;
- forced modal, repeated sticky sales prompt or content gate;
- diagnosis quiz or symptom-to-treatment routing;
- website lead/booking form or stored lead state;
- public pricing or “contact for price”;
- fake/guessed destination, `#` destination or synthetic success state.

## Safe pending state

Pending destination means no outbound action. The page may state an approved channel name only when
that fact itself is approved, but it cannot resemble an active link. If all contact destinations are
pending, learning/discovery routes continue to work and `/lien-he` publishes only if other verified
organization facts make its page job useful.
