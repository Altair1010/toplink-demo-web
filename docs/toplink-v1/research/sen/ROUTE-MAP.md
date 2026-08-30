# Sen Live Route Map

**Inspected:** 2026-08-31  
**Authority:** live `https://sentaithu.com.vn/`, not the planning route list  
**Boundary:** structure/UI/UX/responsive/motion reference only; all Sen content and brand assets are
`REFERENCE_ONLY`.

The homepage exposed 22 unique same-domain first-level destinations. Eight route candidates were
opened directly and returned HTTP 200. Seven morphologies were selected; repeated branch-price
routes and the franchise page did not add a P1-relevant mechanism.

| URL / family                                       | Page job                                                            | Morphology family                          | Interaction family                      | Unique / repeated                      | Reference quality                                                 | Capture priority | Result                                         |
| -------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------ | --------------------------------------- | -------------------------------------- | ----------------------------------------------------------------- | ---------------- | ---------------------------------------------- |
| `https://sentaithu.com.vn/`                        | Orient, introduce value, expose service families and contact intent | Layered landing narrative                  | Sticky header; service/gallery surfaces | Unique                                 | Medium; strong macro-composition, broken live chunks              | P0               | Representative: SEN-EV-037–044                 |
| `/gioi-thieu/`                                     | Establish history/identity and physical experience                  | Editorial brand story + long gallery       | Slow gallery transforms                 | Unique                                 | Medium; useful cadence, high media dependence                     | P0               | Representative: SEN-EV-017–024                 |
| `/he-thong/`                                       | Let users locate a branch                                           | Image + nested disclosure directory        | Native `details/summary` hierarchy      | Unique                                 | High for progressive disclosure; footer overload is weak          | P0               | Representative: SEN-EV-025–036                 |
| `/tin-tuc/`                                        | Discover current editorial content                                  | Main feed + recent rail + pagination       | Card/link hover; pagination             | Unique                                 | Medium; clear discovery model, promotion-heavy visual content     | P0               | Representative: SEN-EV-053–060                 |
| `/uu-dai-chuong-trinh-cham-soc-suc-khoe-chu-dong/` | Read one article and see a conversion surface                       | Article body + side contact module         | Mostly document scrolling               | Repeated article template              | Low–medium; broken media and sparse hierarchy reveal legacy state | P1               | Representative: SEN-EV-001–008                 |
| `/dat-lich/`                                       | Capture appointment intent                                          | Hero + short form + contact/location block | Form fields                             | Same family as `/lien-he/`             | Medium as layout reference; forbidden transport model for Toplink | P0               | Representative: SEN-EV-009–016                 |
| `/lien-he/`                                        | Capture contact intent                                              | Hero + form + contact block                | Form fields                             | Repeats `/dat-lich/`                   | Medium                                                            | P1               | Inspected, not duplicated; `/dat-lich/` chosen |
| `/bang-gia-sen-tai-thu-1992/`                      | Show branch service/menu material and capture intent                | Menu/gallery + side form                   | Gallery controls + form                 | Repeated across 12 branch destinations | Low for Toplink; price/content are forbidden                      | P1               | Representative morphology only: SEN-EV-045–052 |
| Other branch-price routes                          | Repeat branch-specific service/menu surface                         | Same as selected branch surface            | Same family                             | Repeated                               | Low incremental value                                             | P2               | Not captured under AMH coverage rule           |
| `/nhuong-quyen/`                                   | Solicit business partnership                                        | Sales landing + consultation               | CTA/contact                             | Unique but outside Toplink V1          | Low for current phase consumer                                    | Excluded         | Inspected HTTP 200; no capture                 |

## Observed live limitations

- Several font, image and Elementor JavaScript requests use HTTP on an HTTPS page and were blocked.
- The mobile menu remained `aria-expanded=false` after clicks at 375 and 768; no open-state evidence
  exists.
- The probed carousel had no active-slide/transform state delta after its control was clicked.
- Route screenshots therefore document the rendered state observed, not an idealized source site.
- No third retry was made because it would repeat the same failed mechanism without a delta.
