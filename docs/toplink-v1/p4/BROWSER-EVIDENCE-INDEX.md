# P4 Browser Evidence Index

**Capture:** local Next production build on 2026-08-31 (Asia/Saigon)  
**Boundary:** implementation evidence; all visible records marked fixture-only where applicable.

| Evidence                                                           | SHA-256                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| [contact 1280](evidence/contact__1280__full.png)                   | `75e028ff2aa88439d7b30d0ebdbe5a9cdf73f1ecfaac731a02af2674942e8d14` |
| [contact 375](evidence/contact__375__full.png)                     | `7ba8a3d5217d7ea1acb6806a7db64d75d9740bc5f5f0eff2ecc7b148ea2769d3` |
| [home 1440](evidence/home__1440__full.png)                         | `6602ffce0cd4a37a4f85f09f29ca7cc986350020ee11ba9907ff51b8832a4767` |
| [home 375](evidence/home__375__full.png)                           | `10b1e20b9e3fe8513011efabc20114e30822f7404aed25b9669743f3376b96eb` |
| [knowledge detail 1280](evidence/knowledge-detail__1280__full.png) | `d159d976573862d132b0527abf1698457ac9b25c9380f88c63a357e46e4aafdc` |
| [knowledge detail 375](evidence/knowledge-detail__375__full.png)   | `6bbfe046a4324e5123e5184580b4e282ed8d4928ea080cf6f51db1c757e7dc4a` |
| [knowledge index 1280](evidence/knowledge-index__1280__full.png)   | `39ff6363fc15da407a14aa1858e34df8d98d89e10082080fdae40d77767c1401` |
| [mobile navigation open](evidence/navigation__375__open.png)       | `e2eb99725626b6b34561f520d9c0daaac555604279fe9716e1ecdd65292759ec` |
| [product detail 375](evidence/product-detail__375__full.png)       | `b80d7c395e96a9b57b3b2311c9b35afb2641d325f27b4aea20c4557689baa9d0` |
| [product index 1280](evidence/product-index__1280__full.png)       | `68d4e8fddb07c440551a5f250bc7c0059557d9d8af884d19e317ffcda02e5563` |
| [service detail 1280](evidence/service-detail__1280__full.png)     | `dc151462d19d83dc75b0104b54bfae57ed83a20c7c7e7f35c591f92c7bb8ea6a` |
| [service detail 375](evidence/service-detail__375__full.png)       | `987c7fe79371c1d5fe99b21ea00a17d62378b9e07edd1165082e96d42ee9b3a2` |
| [service index 1280](evidence/service-index__1280__full.png)       | `a590d978db09b855574fea81163c881355a1cefa83795f4fcb53d96916d76bf2` |
| [space 1280](evidence/space__1280__full.png)                       | `07038090f722f313f26b7dd27be867cadacc72fe9f7cc12bda0f83a41fc49c49` |

## Full matrix result

- 12 representative public surfaces × 375/768/1280/1440 = 48 checks; HTTP 200 throughout.
- Exactly one H1, zero horizontal overflow, zero console/page errors, zero heading skips and zero
  measured text contrast failures after correction.
- Reduced-motion reported `animation-name: none` for every surface.
- Mobile navigation opened natively; every visible header/menu target measured at least 44px.
- First keyboard Tab focused the skip link with a 3px visible outline.
- Home, service detail, knowledge detail and contact passed 640 CSS-pixel reflow as the bounded
  equivalent of a 1280px viewport at 200% zoom.
