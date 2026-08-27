# 02 — Evidence Gap Graph

**Phase:** H0–H1
**Status:** `PARTIAL — EXTERNAL EVIDENCE REQUIRED`

## Claim → evidence → gap map

| Current surface | Claim or implied promise | Current evidence | Quality | Gap / risk | Priority |
| --- | --- | --- | ---: | --- | --- |
| Homepage hero | Toplink is a distinct care place | generic spa image; runtime copy | 2/10 | no verified Toplink place, people, or actual arrival cue | P1 |
| Body-signal interface | symptom → Tắc/Hàn/Hư/Loạn → care direction → suggested service is appropriate | mock `BODY_STATES`/`SYMPTOMS` data | 7/10 as runtime only | no source, reviewer, explanation bridge, scope boundary, or safety escalation | P0 |
| Ritual timeline | a visit follows a calm, human sequence | authored `RITUAL_MOMENTS`; no documentary record | 5/10 | no verified visit observation, staff quote, photo, or timing | P1 |
| Space chapter | four space qualities are a Toplink physical experience | generic, unknown, or visibly other-brand imagery | 2–3/10 | proof-of-place is invalid; some images must never be attributed to Toplink | P0 |
| Final CTA | a person receives the request and responds | visible CTA and mock contact source | 10/10 as runtime fact | receiving owner, response window, and actual form configuration unknown | P0 |
| `/gioi-thieu` | mission, philosophy, trained team, tenure and customer proof | mock claims; unverified portraits; placeholder reviews | 2–7/10 | unsupported human authority and social-proof risk | P0 |
| `/dich-vu` and detail | named services, price, duration, suitability, cautions and feeling are accurate | static mock catalogue | 7/10 as runtime only | no operational owner, source date, scope boundary, or review | P0 |
| `/quy-trinh-tri-lieu` | four steps are consistently practised | authored process copy | 6/10 | actual handoffs, wait/recovery, aftercare and responsible roles unknown | P1 |
| `/khong-gian` | Toplink has four named floors and associated services | static descriptions plus non-Toplink/unknown imagery | 2–6/10 | no actual address/floor plan/space photo ownership | P0 |
| `/dat-lich` | booking reaches Toplink and a callback occurs | input UI and demo success state | 10/10 as runtime fact | unconfigured Google Form; no data-handling/recipient/response proof | P0 |
| `/lien-he` | address, phone, hours, Zalo, map and response window are genuine | mock `CONTACT`/`BRANCHES`; footer says UI demo | 10/10 as runtime fact | business identity/contact channels unverified; city/context conflict | P0 |
| Review wall | customer feedback is shared with consent | placeholders plus a consent statement | 4/10 | must not be presented as a real review or consent | P0 |

## Flow graph

```text
Displayed service / symptom / trust promise
        ↓
Mock code or generic / misattributed media
        ↓
No owner, source, consent, review date, or operational confirmation
        ↓
Cannot use as Toplink real evidence
        ↓
P0 collection + provenance check
        ↓
Only then: evidence-backed H2 narrative work
```

## Prioritized human-evidence gaps

### P0 — required before H2

1. **Identity + contact + booking handoff:** confirm legal/operating name, public address, public phone/Zalo/email, hours, who receives enquiries, realistic response expectation, data handling, and intended no-submission fallback.
2. **Service scope and health-content review:** for every public service/symptom, provide owner, approved name, actual duration/price if public, what it offers, exclusions, when another form of care is appropriate, and review status. This includes Tắc/Hàn/Hư/Loạn, “khí huyết”, “bắt mạch”, “đào thải”, and symptom-to-service suggestions.
3. **Permissioned people evidence:** identify public-facing staff/founder, their allowed public role/credentials, portrait and usage consent. Do not reuse the current team cards as a real staff record.
4. **Permissioned place evidence:** confirm actual site(s) and provide 6–10 documentary photos (entrance, reception, two treatment contexts, quiet corner, wide environmental view) with ownership and usage permission. Quarantine visible other-brand imagery.

### P1 — required before a homepage prototype

1. 8–12 consented hands/craft photos: preparation, consultation without sensitive client data, hands-at-work, reset/cleaning, material/tool handling, and aftercare.
2. Owner-approved visit/process account: responsible role, expected duration, what changes when a visitor is unsure/unsuitable, and human handoff.
3. Ten common questions and ten exact staff phrases, with source/date and anonymisation/permission status.
4. One founder/manager and three-to-five staff mini-interviews: factual operating language, not slogans.

### P2 — required before full-site expansion

1. Product/herb/tool inventory with availability, ownership/shoot permission, and claim boundaries.
2. Training, franchise, partner, and credential assertions with public-use proof.
3. Reviewed source register for long educational articles and FAQs.

### P3 — useful, not a precondition

1. Permissioned customer video/image testimonials with original source, edit approval, and date.
2. Documentary video of place/process after participant permissions are recorded.
3. Additional material macro photography and seasonal environmental detail.

## Acceptance check

An item can move from `MISSING`/`UNKNOWN` to `TOPLINK REAL EVIDENCE` only when its Toplink relationship, factual scope, owner/permission, and applicable review are recorded. A beautiful asset without these fields remains a reference or unknown asset.
