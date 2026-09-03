# Performance Report

Lighthouse `12.8.2`, production `next start`, installed Chrome `152.0.7977.75`, mobile profile with DevTools-applied throttling, three cold samples per route; medians are reported. This mode applies network and CPU throttling in the browser rather than relying on post-simulation of local font timing.

| Route            | Score |    LCP | CLS | TBT proxy |
| ---------------- | ----: | -----: | --: | --------: |
| Home             |    93 | 2.151s |   0 |     219ms |
| Service detail   |    96 | 1.763s |   0 |     192ms |
| Knowledge detail |    98 | 1.751s |   0 |     129ms |
| Service index    |    98 | 1.772s |   0 |     116ms |
| Contact held     |    97 | 1.663s |   0 |     160ms |

Initial diagnostic traces identified a layout-affecting inset animation and a font-critical slow path. The gateway now uses transform/opacity, the approved Alegreya/IBM Plex faces use `font-display: optional` without preload so their existing Georgia/system fallbacks can render immediately on constrained connections, and shell prefetch is disabled. No field INP is claimed; TBT is only a lab interaction-latency proxy. The home median TBT is 219ms, but the 93 performance score, zero CLS and 2.151s LCP show no serious release blocker; real INP remains a post-launch field measurement. Raw JSON remains ignored under `.toplink-tools/p8/perf-qualified-devtools`.
