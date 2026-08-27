# 01 — Human Evidence Inventory

**Phase:** H0–H1
**Status:** `PARTIAL — EXTERNAL EVIDENCE REQUIRED`
**Observed:** 2026-08-27
**Scope:** local workspace only; no network lookup and no assertion that a local asset belongs to Toplink without provenance.

## Reading rule

`Toplink real evidence` means a fact, person, place, process, material, or customer language whose relationship to Toplink and publication permission can be verified. A file merely stored in this workspace is not enough. The register includes disqualified/unknown material so future work cannot promote a placeholder into proof.

Score = Specificity + Reality + Usefulness + Identifiability + Provenance/Consent, each 0–2. The score describes present audit usefulness; it never authorizes a claim or automatic use.

| ID | Category | Source / description | Class | Specificity | Potential page usage | Trust relevance | S/R/U/I/P | Total | Missing metadata / consent |
| --- | --- | --- | --- | --- | --- | --- | --- | ---: | --- |
| HE-001 | E1 People | `app-demo/public/images/team/member-1.jpg` | `REFERENCE / UNKNOWN` | 0 | none until identity is verified | high: person/title claims | 0/1/0/1/0 | 2 | person, role, photographer/owner, licence, consent, published-name approval: `UNKNOWN` |
| HE-002 | E1 People | `app-demo/public/images/team/member-2.jpg` | `REFERENCE / UNKNOWN` | 0 | none until identity is verified | high | 0/1/0/1/0 | 2 | same unknowns as HE-001 |
| HE-003 | E1 People | `app-demo/public/images/team/member-3.jpg` | `REFERENCE / UNKNOWN` | 0 | none until identity is verified | high | 0/1/0/1/0 | 2 | same unknowns as HE-001 |
| HE-004 | E1 People | `app-demo/public/images/team/member-4.jpg` | `REFERENCE / UNKNOWN` | 0 | none until identity is verified | high | 0/1/0/1/0 | 2 | same unknowns as HE-001 |
| HE-005 | E1 People | `HERO_IMAGE` and `ABOUT_BLOCKS` in `app-demo/data/content.ts` use Unsplash URLs; source comments call them placeholders | `REFERENCE` | 0 | none as Toplink people | high | 0/0/0/2/0 | 2 | asset licence and model consent for Toplink representation are not supplied; code explicitly requests replacement |
| HE-006 | E2 Hands / craft | `app-demo/public/images/services/goi-dau.jpg`, `services/tri-lieu.jpg`; inspected treatment image is generic and has no Toplink linkage | `REFERENCE / UNKNOWN` | 0 | illustrative only, not process proof | high: can falsely imply actual practice | 0/1/1/1/0 | 3 | practitioner, location, procedure, photographer/owner, consent, date: `UNKNOWN` |
| HE-007 | E2 Hands / craft | no Toplink hand-at-work, preparation, cleaning/reset, herb handling, or tool-use sequence found | `MISSING` | — | needed for service/process proof | high | 0/0/0/0/0 | 0 | capture a consented documentary sequence; see P1 gaps |
| HE-008 | E3 Place | `spaces/tang-1-reception.jpg`, `tang-1-tinh.jpg`, `tang-2-treatment.jpg`, `tang-3-duong.jpg` visibly contain “Nhật Liệu Y Viện” and/or “Royal Palace” in inspected imagery | `REFERENCE — NOT TOPLINK` | 0 | none; must not present as Toplink | critical | 0/1/0/2/0 | 3 | origin/permission unknown; visible competing brand makes Toplink attribution false |
| HE-009 | E3 Place | `spaces/tang-1-corridor.jpg`, `tang-1-tinh.jpg`, `tang-2-thong.jpg`, `tang-2-vip.jpg`, `tang-3-duong.jpg`, `tang-4-tinh.jpg` | `UNKNOWN / NOT ACCEPTED` | 0 | none until each asset is identified | critical | 0/1/0/1/0 | 2 | address, capture date, owner, location, licence, and relationship to Toplink: `UNKNOWN` |
| HE-010 | E3 Place | `app-demo/public/images/home/spa-ambience.jpg`; inspected image is generic spa ambience and not identifiable as Toplink | `REFERENCE / UNKNOWN` | 0 | decorative fallback only; not proof of place | high | 0/1/0/1/0 | 2 | source, location, ownership and consent: `UNKNOWN` |
| HE-011 | E4 Material | `products/tra-duong-sinh.jpg`, `tui-chuom-thao-duoc.jpg`, `goi-ngam-chan.jpg`, `may-massage-co.jpg` | `REFERENCE / UNKNOWN` | 0 | no product/material proof | medium | 0/1/0/1/0 | 2 | actual SKU, supplier, packshot ownership, sale status, safety boundary: `UNKNOWN` |
| HE-012 | E4 Material | `blog/blog-1.jpg` … `blog-6.jpg`, `partner/partner-1.jpg`, `partner/partner-2.jpg`, `training/training-1.jpg`, `training/training-2.jpg` | `REFERENCE / UNKNOWN` | 0 | none without source record | medium | 0/1/0/1/0 | 2 | person/place/material relationship and permission: `UNKNOWN` |
| HE-013 | E5 Micro-stories | `RITUAL_MOMENTS` in `app-demo/data/content.ts` (“Một ngày ở Y Viện”) | `ASSUMPTION / RUNTIME COPY` | 1 — Toplink named but no witness/source | audit claimed visit narrative only | high | 1/0/1/2/1 | 5 | author, staff confirmation, observed visit, capture date: `UNKNOWN` |
| HE-014 | E5 Customer language | `REVIEWS` and `ReviewWall.tsx`; code labels image/video as placeholder and asks for real feedback replacement | `REFERENCE / PLACEHOLDER` | 0 | none as testimonial/social proof | critical | 0/0/1/2/1 | 4 | customer identity/consent, original message/video, edit approval, date: `MISSING` |
| HE-015 | E5 Founder/staff language | no founder story, named staff interview, or documented common customer questions found outside mock copy | `MISSING` | — | source for voice/trust | high | 0/0/0/0/0 | 0 | collect founder/manager conversation, 5 staff mini-interviews, 10 exact customer questions |
| HE-016 | E6 Process | `PROCESS_STEPS` in `app-demo/data/content.ts`: Tiếp nhận → Tư vấn → Trị liệu → Theo dõi | `ASSUMPTION / RUNTIME COPY` | 1 | process explainer after operational validation | high | 1/0/2/2/1 | 6 | actual owner, duration, handoffs, exclusions, aftercare/follow-up evidence: `UNKNOWN` |
| HE-017 | E6 Service catalogue | `SERVICES`, `TECHNOLOGIES`, `BODY_STATES`, `SYMPTOMS`, `FAQS`, `PRODUCTS` in `app-demo/data/content.ts`; file header states “MOCK DATA · … demo” | `ASSUMPTION / RUNTIME COPY` | 2 as current runtime wording only | audit current claims and user routes | critical | 2/0/2/2/1 | 7 | service owner, scope, price/date, suitability/cautions, clinical/legal review and factual sources: `UNKNOWN` |
| HE-018 | E6 Booking behaviour | `app-demo/lib/booking.ts` uses `__GOOGLE_FORM_ID__` and placeholder field IDs; `BookingStepper.tsx` deliberately reports success when unconfigured | `TOPLINK RUNTIME EVIDENCE` | 2 | booking-gap and consequence audit | critical | 2/2/2/2/2 | 10 | runtime fact is verified locally; receiving person, response window, data handling, and fallback owner: `UNKNOWN` |
| HE-019 | E6 Contact/identity behaviour | `CONTACT`/`BRANCHES` in `content.ts`; footer labels the site a UI demo. Address is “123 Đường Sức Khỏe, Quận 1, TP. Hồ Chí Minh”, while repo context describes Hà Nội | `TOPLINK RUNTIME EVIDENCE / ASSUMPTION` | 2 as displayed runtime only | contact/identity gap audit | critical | 2/2/2/2/2 | 10 | actual legal name, address, hours, phone/Zalo ownership, response policy: `UNKNOWN`; displayed values are not published facts |
| HE-020 | E6 Current site capture | root captures: `full-home.jpeg`, `home-desktop.jpeg`, `hero-desktop.jpeg`, `mob-hero.jpeg`, `mobile-home.jpeg`, `dat-lich.jpeg`, `lien-he.jpeg`, `nav-hover.png`, `s2.jpeg`–`s5.jpeg` | `TOPLINK RUNTIME EVIDENCE` | 2 as UI captures only | specificity audit | medium | 2/2/2/2/1 | 9 | capture command/build/URL/version not recorded; not business evidence |
| HE-021 | E6 Logo/brand mark | `app-demo/app/icon.svg` and text mark in `SiteHeader.tsx` | `TOPLINK RUNTIME EVIDENCE` | 2 as current UI mark | current presentation only | medium | 2/2/1/2/1 | 8 | trademark ownership, approved mark files and usage guidance: `UNKNOWN` |

## What counts as Toplink real evidence today

None of the inspected people/place/material/process assets can be classified as verified Toplink real-world evidence. HE-018 through HE-021 are strong evidence of what the **demo runtime does**; they do not validate the business claims that the UI displays.

## Evidence-lane boundaries

- **Sen Tài Thu** is structural evidence only; never a source for Toplink photos, services, people, or claims.
- **Triều Đông Y** is linguistic/knowledge evidence only; never a source for Toplink medical claims or staff/process evidence.
- `design-research/` and `tasks/` are archival context and were not elevated to business evidence.

## Collection protocol

For every later real item, record: source file/original link, date/location, subject and role, owner/photographer, publication permission, scope of consent, factual claim it supports, and required clinical/operational review. Keep the original separately from web crops/edits.
