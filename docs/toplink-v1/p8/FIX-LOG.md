# P8 Fix Log

- Portable runner: replaced Node-native TS stripping with exact dev-only `tsx` after real Node 20 RED.
- Security: added four portable response headers.
- Accessibility: expanded breadcrumb hit area; corrected WebKit preference and optional favicon handling in the harness without hiding application HTTP failures.
- Performance: replaced layout-affecting gateway inset animation with composited transform/opacity; disabled eager shell prefetch; configured approved web faces as optional so the existing authority-defined fallback stack handles constrained connections. Final 15-sample budget passed.
- No feature, production fact, deployment or architecture subsystem was added.
