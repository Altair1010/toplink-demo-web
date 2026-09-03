# P8 Execution Plan

## Objective

Qualify the exact P7 candidate through evidence, one grouped root-cause correction batch when required,
one full confirmation, and an honest final classification. P8 adds no product feature and performs no P9
operation.

## Route

1. Verify the exact P7 base and freeze the candidate/toolchain baseline.
2. Populate the release-gate matrix only from newly collected evidence.
3. Run portability, supply-chain, security, CMS/headless, content-truth, route/link, accessibility,
   browser, performance, design-detector, SEO/analytics and backup-readiness qualification.
4. Group all P0/P1 findings by root cause and perform one bounded correction batch using RED/GREEN proof
   for behavioral changes.
5. Run one complete confirmation, review the diff across correctness/readability/architecture/security/
   performance, and classify the result using the P8 taxonomy.
6. Preserve decision-relevant evidence, update `WORKSTATE.md`, commit and push
   `release/v1-hardening`; stop before P9.

## Fixed boundaries

- No merge, deployment, DNS, production indexing, public WordPress, production analytics or P9 work.
- No invented contact, NAP, media, product/service facts, testimonials, prices or health outcomes.
- No existing tracked file deletion and no `app-demo/` mutation.
- Missing real contact remains `BLOCKED_INPUT` even when fail-closed behavior is technically correct.
