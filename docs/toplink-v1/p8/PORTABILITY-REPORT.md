# Portability Report

- Host: Windows, Node `24.16.0`, npm `11.13.0`: tests/typecheck/format/content/build PASS.
- Clean container: Node `20.20.2`, npm `10.8.2`, image digest `sha256:2cf067cfed83d5ea958367df9f966191a942351a2df77d6f0193e162b5febfc0`.
- Node 20 used a read-only source mount, temporary install/build tree and Docker host networking so the unchanged loopback-only CMS contract remained valid.
- Node 20 result: `npm ci`, 39 tests, typecheck, format, content boundary and production build PASS.
- The original `node --experimental-strip-types` runner failed on Node 20; exact `tsx@4.23.13` now supplies the dev-only portable runner.
