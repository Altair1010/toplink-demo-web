# Locked Decisions — Y Viện Toplink V1

Status vocabulary: **LOCKED**, **APPROVED**, **PROPOSED**, **BACKLOG**, **DEPRECATED**.

| ID | Status | Decision |
|---|---|---|
| D-001 | LOCKED | Public website brand name: **Y Viện Toplink**. This current user decision overrides the uploaded dossier's recommendation to lead with “Nhất Liệu Y Viện Toplink”. Legal/footer naming may be revisited when legal facts are supplied. |
| D-002 | LOCKED | This is a **full redesign + headless production rebuild**, not an incremental Humanizer pass. |
| D-003 | LOCKED | Current H7 visual system, sections, copy and page narrative have **zero preservation obligation**. |
| D-004 | LOCKED | Preserve only engineering that proves useful: Next.js/React/TypeScript foundations, accessibility discipline, token/check concepts, asset hygiene and verified utilities/components. |
| D-005 | LOCKED | Architecture: **Next.js frontend + headless WordPress CMS via REST API**. |
| D-006 | LOCKED | Continue using `Altair1010/toplink-demo-web`; production repository is intended to become **private**. |
| D-007 | LOCKED | GitHub is the shared source of truth between ChatGPT Web and Codex. |
| D-008 | LOCKED | Main actors: **ChatGPT Web + Codex** only. Do not add Claude/OpenCode/orchestration agents unless later requested. |
| D-009 | LOCKED | User is the merge/release authority for `main` and production. Agents may branch, implement, test and open PRs. |
| D-010 | LOCKED | Sen Tài Thu reference scope: **visual structure, UI, UX and motion only**. Do not copy its text, images, videos, icons, prices, claims or brand assets into Toplink. |
| D-011 | LOCKED | Sen Tài Thu is **not** product/commercial benchmark authority; it is a UI/UX/motion reference corpus. |
| D-012 | LOCKED | Nhất Liệu/Y Viện dossier is the provisional source for brand philosophy/voice/health-safety and an extraction seed for visual identity. Final font/pattern/palette are not yet locked. |
| D-013 | LOCKED | Visual intensity: **medium → strong Đông y cung đình / Tân Trung Hoa**, but digitally contemporary and controlled. |
| D-014 | LOCKED | Hallmark + Impeccable are combined through a Toplink router, not run as two equal overlapping authorities. |
| D-015 | LOCKED | Hallmark: structural/morphological diversity, anti-template memory and composition grammar. |
| D-016 | LOCKED | Impeccable: product/design context, design-system contracts, detector/browser/live/audit/critique runtime. |
| D-017 | LOCKED | Site scope V1: **dịch vụ, sản phẩm, kiến thức, blog/tin tức, không gian** plus contact/booking handoff surfaces required for operation. |
| D-018 | BACKLOG | Nhượng quyền. No public route or navigation item in V1. |
| D-019 | LOCKED | **No public service/product pricing.** Also do not write “liên hệ để biết giá”; price is simply absent. |
| D-020 | LOCKED | Booking/lead transport V1 is external only: **Zalo + Facebook Page/Messenger + phone**. No booking form, no website lead database. |
| D-021 | LOCKED | Exact Zalo/Page/hotline URLs/numbers will be supplied later. Never guess them. |
| D-022 | LOCKED | Products are informational only. No cart, checkout, upsell or product-specific purchase funnel in V1. |
| D-023 | LOCKED | WordPress does not yet exist. Development CMS should start zero-cost locally; public CMS hosting comes later. |
| D-024 | LOCKED | Provisional public domain: `toplink.vn`; CMS target: `cms.toplink.vn`. Domain may change later without changing domain model. |
| D-025 | LOCKED | Temporary frontend preview/staging: Vercel Free/Hobby. Because current Vercel Hobby terms prohibit commercial use, it is **not production commercial hosting**. |
| D-026 | LOCKED | Initial WordPress budget: zero-cost development/staging; commercial production requires persistent hosted WordPress before release. |
| D-027 | LOCKED | Blog editorial workflow: **Author → Draft → Editor → Publish**. |
| D-028 | LOCKED | V1 language: Vietnamese. Architecture must not block a future English site. |
| D-029 | LOCKED | Product truth/evidence will be supplied incrementally by the user. Missing facts must not block architecture, but unverified facts must not ship. |
| D-030 | LOCKED | Temporary imagery may use stock. Stock may never impersonate actual Toplink people, premises, testimonials or clinical evidence. |
| D-031 | LOCKED | The production “Không gian” surface requires real/authorized Toplink space imagery before representing it as the actual facility. |
| D-032 | LOCKED | Testimonials/reviews are real editorial artifacts (including real video when available), published through blog/content — never synthetic testimonial cards. |
| D-033 | LOCKED | Analytics V1: Search Console + GA4-compatible event layer. Keep extension points for GTM/Meta/TikTok later. |
| D-034 | LOCKED | Track outbound contact conversions: Zalo, Facebook/Messenger and phone clicks with placement context. |
| D-035 | LOCKED | SEO and local SEO are V1 concerns, not post-launch add-ons. |
| D-036 | LOCKED | WordPress transport default: native REST API, not WPGraphQL, unless later evidence justifies GraphQL. |
| D-037 | LOCKED | WordPress domain model belongs in a custom Toplink plugin, not in a theme and not in a paid page builder. |
| D-038 | LOCKED | No Elementor/Divi/general page builder. WordPress is content management, not frontend layout authority. |
| D-039 | LOCKED | No public user accounts, newsletter, comments, internal booking DB, shop checkout or extra chat widgets in V1. |
| D-040 | LOCKED | No WebGL/Three.js/smooth-scroll hijacking in V1. |
| D-041 | APPROVED | GSAP may be added only after motion direction is approved and only where semantic motion needs it. Current repo does not have GSAP installed. |
| D-042 | LOCKED | WCAG 2.2 AA is the accessibility target; reduced-motion behavior is a release gate. |
| D-043 | LOCKED | Core Web Vitals should be “Good” on representative production pages before release. |
| D-044 | LOCKED | Pin Hallmark and Impeccable upstream revisions; upgrades are manual/reviewed, never automatic. |
| D-045 | LOCKED | Verification is bounded: build → batched inspect → batch fix → at most one confirmation round, then stop unless a release blocker remains. |
| D-046 | LOCKED | User audience is the five-segment audience in `sources/AUDIENCE-PROFILE.md`. |
| D-047 | LOCKED | The final quality bar is **commercial-grade, brand-specific, agency-quality healthcare/wellness frontend**, not “better than the current site”. |
