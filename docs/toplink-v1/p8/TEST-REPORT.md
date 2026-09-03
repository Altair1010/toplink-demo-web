# P8 Test Report

PASS: Node 20.20.2 clean install/tests/typecheck/format/content/build; Node 24.16.0 39/39 P6 and 24/24 P7 tests; P5 static 5/5 and runtime 32/32; P6 WordPress 11/11; signed webhook HTTP cases; P6 12×4 browser; P7 pending/approved/invalid browser states with exact restore; P8 12 engine/profile runs with axe/keyboard/headers/link crawl; Lighthouse 15 samples; dependency/secret/script/preservation scans; Impeccable detector.

CMS outage proof returned cached 200 and controlled nonempty 500 for uncached content with no fixture fallback. `app-demo/` is unchanged, no tracked file was deleted, and no deploy/merge occurred.

During final confirmation, the first standalone `verify-p6.ps1 -Http` invocation reached its HTTP sub-gate without a server listening on the harness-required port 3000 and correctly failed with `ECONNREFUSED`. After starting the already-built production server at that documented precondition, the affected HTTP gate passed all six valid/replay/missing/stale/tampered/unsupported cases; no test or threshold was weakened.
