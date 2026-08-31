# Y Viện Toplink V1 — Product Contract

**Status:** P2 canonical candidate — requires human approval before becoming V1 product authority.  
**Authority:** current user instruction → `DECISIONS.md` → approved facts/evidence → brand dossier → approved P1 corpus.  
**Boundary:** `REFERENCE GRAMMAR != TOPLINK DESIGN`.

## Product definition

The Y Viện Toplink V1 website is a Vietnamese public information and human-handoff product. It helps
people understand what Toplink is, recognize a relevant care need without self-diagnosis, assess
available services or informational products, learn bounded health/wellness knowledge, understand
limits and safety, and optionally contact a real person through a verified external channel.

Its business role is to make Toplink understandable and trustworthy before contact. It is not a
booking application, lead-capture system, diagnosis tool, online shop or pricing catalog.

## Primary audiences

The five authoritative segments come only from `sources/AUDIENCE-PROFILE.md` (D-046):

1. People in Hanoi aged approximately 28–55 with busy routines.
2. Middle-aged and older people.
3. People caring for parents.
4. Women proactively caring for their health.
5. People nationwide interested in dưỡng sinh knowledge.

No income, education, occupation beyond the supplied source, medical condition or new demographic is
assumed. Detailed needs and safe paths live in `product/AUDIENCE-JOURNEY-MAP.md`.

## Primary user outcomes

A visitor can:

- understand Y Viện Toplink's role, philosophy, scope and limits in plain language;
- recognize a care or learning need without being asked to diagnose themselves;
- compare approved service families and inspect one service's fit, process, cautions and evidence;
- understand an informational product's supported positioning, documentation state and limitations;
- learn evergreen dưỡng sinh knowledge without being forced toward contact;
- distinguish evergreen knowledge from current news, operations and real customer stories;
- assess the actual Toplink space only when authorized evidence exists;
- find verified organization facts and choose an optional external human-contact channel.

A knowledge-only visitor can complete a valid journey by learning, understanding and applying safe
bounded knowledge without conversion.

## Commercial outcome

```text
DISCOVER
  -> RECOGNIZE NEED
  -> UNDERSTAND
  -> TRUST
  -> EXPLORE SERVICE
  -> RESOLVE DOUBT
  -> CONTACT HUMAN (optional)
       -> Zalo
       -> Facebook/Messenger
       -> Phone
```

Contact transport is external only (D-020). There is no booking database, website lead form, stored
lead state, ecommerce flow, public price or “contact for price” message. A contact action exists only
when its exact destination is `APPROVED`; otherwise it is omitted or represented only as honest
non-interactive availability according to `product/CTA-CONVERSION-MAP.md`.

## V1 scope

### In scope

- approved service discovery and detail;
- informational product discovery and safe detail;
- evergreen knowledge and long-form education;
- news, operational/brand updates and real authorized customer stories;
- actual Toplink space information when real/authorized evidence exists;
- brand/about information;
- verified organization facts and external contact handoff;
- semantic URL, metadata, internal-link and eligible structured-data contracts;
- contracts for later typed fixtures and WordPress REST content.

### Out of scope

- public service/product pricing or “contact for price” copy;
- booking database, appointment engine or website lead form;
- cart, checkout, ecommerce, inventory, stock or purchase links;
- public accounts, newsletter, comments or extra chat widgets;
- franchise/partnership route, academy or unapproved multi-branch system;
- current English site or multilingual implementation;
- diagnosis, symptom checker, treatment recommendation or guaranteed outcome;
- full-site production copywriting in P2.

## Trust model

Trust is earned through plain explanation, facts with source/status, contextual limitations and
cautions, professional escalation where appropriate, consent and media authorization, real editorial
stories with preserved context, privacy-respecting optional handoff and honest omission of unapproved
facts.

Trust must not be manufactured through synthetic testimonials, fear selling, urgency, miracle
promises, invented authority, stock presented as Toplink evidence or vague health certainty.

## Content and evidence rules

- Every production-facing field has owner, authoritative source, fact status, requirement level and
  pending behavior in `product/CONTENT-CONTRACTS.md`.
- `PENDING` is absent/unpublishable, never a placeholder value.
- Health content follows: approved fact → user situation → plain explanation → bounded support →
  limitation/safety → optional human next step.
- Service discovery may organize approved needs but must not diagnose or prescribe.
- Product information is educational only and must not become a purchase funnel.
- Contact is near justified intent but subordinate to understanding and trust.

## Route and source boundary

The route candidate is defined in `art-direction/PAGE-ARCHETYPES.md` and its relationship graph in
`product/IA-CONTENT-MAP.md`. Route names, page jobs and taxonomy are not inherited from Sen or H7. P1
may inform progressive disclosure, reading order, discovery and contextual handoff only.

## Vietnamese V1 and future English readiness

V1 is Vietnamese (D-028). P2 adds no language switcher, duplicate English routes, translation plugin
or locale infrastructure. Field meaning and route jobs should remain mappable later if real English
editorial operations enter scope: future need → future evidence → future decision.

## Phase boundary

This contract does not choose a visual family, composition, palette, font, pattern, token, motion
system or browser comp. P3 may compare art directions only after this product truth is approved.
