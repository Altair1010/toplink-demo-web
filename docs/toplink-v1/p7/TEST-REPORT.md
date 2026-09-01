# P7 Test Report

**Runtime:** Node 24.16.0. Node 20 parity remains P8.

## Implemented gates

- TDD RED/GREEN was observed for contact validation, analytics payload, origin/metadata, sitemap/robots, structured data, UI vendor boundary and test-owned canonical eligibility.
- Focused P7 suite: 24 deterministic tests after the canonical eligibility and Organization correction.
- Local browser contact states: pending PASS, approved PASS, invalid-approved-looking PASS; exact prior SiteSettings state restored.
- Approved Zalo browser click emitted exactly one `contact_zalo_click` with `service_detail` placement and no raw destination/PII/health data.
- Local browser metadata matrix covered home, indexes, held space/contact and four CMS detail routes. Test-owned canonical/JSON-LD remained absent.
- Private P6 preview remained `noindex,nofollow`, with zero contact analytics surface and zero JSON-LD.
- Browser request capture found zero GA/GTM/Meta/TikTok requests in all three contact states.
- P5 static/runtime regression: 5 static tests and 32 runtime assertions passed during the confirmation run.
- P6 WordPress runtime: 11 assertions passed; the complete Node suite reported 39 passing tests.
- Signed webhook HTTP verifier: six security cases passed against a live local Next server.
- P6 CMS browser matrix: 12 routes x four widths passed with no new retained screenshot archive.
- `app-demo` preservation verifier passed: build, TypeScript, format, 35 tokens and six-route release surface.
- Next production build, TypeScript, Prettier, content boundary, deletion/app-demo/env/vendor-script/schema scans and `git diff --check` passed.

## Confirmation status

One same-agent five-axis review found two fail-closed gaps: canonical-looking test-owned records could receive detail metadata, and Organization eligibility did not require legal identifiers. One correction batch added RED tests, centralized both guards, and one confirmation batch passed. No Critical or remaining Required review finding is open.

The first pre-confirmation P6 command exposed two harness conditions rather than application failures: local Playwright CLI files were inside Prettier scope, and the optional HTTP verifier requires a running Next server. The ignored local-tool boundary and explicit live-server lifecycle were then confirmed. These transient stops are not represented as application passes.
