# M5 Baseline Reconstruction Report

**Status:** FUNCTIONAL BASELINE PASS; PIXEL-PARITY NOT CLAIMED

The baseline renderer addresses all 634 normalized content records under `/baseline/<source-path>`. Each rendered record includes source taxonomy, captured title/body projection, source image when available, and a provenance panel with capture method, status, URL and hash.

Verified:

- Homepage baseline and deep dynamic baseline route return HTML 200.
- Every content record has a unique baseline path and provenance SHA-256.
- Original full captured text remains in `data/content-index.json`; the UI uses a bounded render projection to keep production builds stable.
- Source Tahoma typography, paper field and vermilion/green identity are represented in the baseline namespace.

Not claimed:

- 1:1 screenshot parity at three viewports.
- Offline asset mirror.
- Runtime source motion parity.

These are explicit fidelity enhancements, not hidden release failures.

