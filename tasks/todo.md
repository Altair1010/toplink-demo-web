# TODO — Đại cách tân "Nghi thức chẩn thân"

Nguồn plan: `C:\Users\MCBAu\.claude\plans\swirling-scribbling-cookie.md`

## P0 — Baseline
- [x] Commit NavDropdown + tasks cũ (8f00cf4)
- [ ] npm run build xanh, ghi baseline first-load JS

## P1 — CSS + Typography
- [ ] Tách globals.css → styles/tokens.css (@theme ×2), typography.css, components.css, utilities.css
- [ ] Fonts: Be Vietnam Pro 400/500/600 + Noto Serif 600/700 (9→5)
- [ ] Serif chỉ h1/h2/.font-display/.statement; h3+ sans 600; hạ font-black→700
- [ ] Type scale mới + --text-hero clamp(3rem,6vw,4.75rem) + measure 62/54/36ch

## P2 — Bỏ Lenis/Three
- [ ] Gỡ SmoothScrollProvider khỏi gioi-thieu/khong-gian/motion-lab
- [ ] AmbientLeaves CSS-only thay WindLeafField ambient
- [ ] Dọn .lenis rules + lib/motion tham chiếu
- [ ] npm uninstall lenis three @types/three (sau grep 0)
- [ ] Dynamic import GSAP sections inner pages

## P3 — Data model
- [ ] BODY_STATES 4 + BODY_REGIONS 6 + SYMPTOMS 8 + RITUAL_MOMENTS 7 + SPACE_QUALITIES 4
- [ ] lib/recommendation.ts recommend(selected, max=3)

## P4 — Di cư inner pages
- [ ] /gioi-thieu: WhyChoose + Stats + ReviewWall
- [ ] /quy-trinh-tri-lieu: HealingProcessMotion (dynamic)
- [ ] /khong-gian: YVienSpaceExperience (dynamic)
- [ ] /lien-he: FaqAccordion
- [ ] /dich-vu: ServiceFilterGrid full + section #bang-gia
- [ ] Checkpoint: build + QA 5 trang

## P5 — Homepage mới (L)
- [ ] BodyMap.tsx SVG 6 region glow CSS
- [ ] BodySignalInterface + BodyStatePanel (chips aria-pressed)
- [ ] FourBodyStates Tắc/Hàn/Hư/Loạn expand
- [ ] RitualTimeline 7 khoảnh khắc
- [ ] SpaceAsTherapy 4 frame
- [ ] RecommendationDrawer slide-up (không đè MobileBottomBar)
- [ ] HomeFinalCTA
- [ ] app/page.tsx viết lại; xóa Marquee/NeedSelector + CSS marquee
- [ ] QA: reduced-motion, keyboard, 375px, grep gsap = 0

## P6 — Header phẳng
- [ ] 6 mục + Đặt lịch; footer nhận route phụ

## P7 — SEO
- [ ] Xóa keywords; sitemap.ts + robots.ts (basePath)
- [ ] JSON-LD: geo/image/priceRange/sameAs/areaServed/hasOfferCatalog
- [ ] Service schema /dich-vu/[slug]; FAQPage /lien-he; Breadcrumbs
- [ ] Homepage metadata thương mại "trị liệu Đông y Hà Nội"

## P8 — Polish
- [ ] Gold audit: text-gold cấm <24px (SiteFooter 16, BookingStepper 9, lien-he 8)
- [ ] Images width/height (CLS)
- [ ] Prettier pass
- [ ] Lighthouse: LCP<2.5s CLS<0.1 so baseline
