# TODO — Đại cách tân "Nghi thức chẩn thân"

Nguồn plan: `C:\Users\MCBAu\.claude\plans\swirling-scribbling-cookie.md`

## P0 — Baseline
- [x] Commit NavDropdown + tasks cũ (8f00cf4)
- [x] npm run build xanh, ghi baseline first-load JS

## P1 — CSS + Typography
- [x] Tách globals.css → styles/tokens.css (@theme ×2), typography.css, components.css, utilities.css
- [x] Fonts: Be Vietnam Pro 400/500/600 + Noto Serif 600/700 (9→5)
- [x] Serif chỉ h1/h2/.font-display/.statement; h3+ sans 600; hạ font-black→700
- [x] Type scale mới + --text-hero clamp(3rem,6vw,4.75rem) + measure 62/54/36ch

## P2 — Bỏ Lenis/Three
- [x] Gỡ SmoothScrollProvider khỏi gioi-thieu/khong-gian/motion-lab
- [x] AmbientLeaves CSS-only thay WindLeafField ambient
- [x] Dọn .lenis rules + lib/motion tham chiếu
- [x] npm uninstall lenis three @types/three (sau grep 0)
- [x] Dynamic import GSAP sections inner pages

## P3 — Data model
- [x] BODY_STATES 4 + BODY_REGIONS 6 + SYMPTOMS 8 + RITUAL_MOMENTS 7 + SPACE_QUALITIES 4
- [x] lib/recommendation.ts recommend(selected, max=3)

## P4 — Di cư inner pages
- [x] /gioi-thieu: WhyChoose + Stats + ReviewWall
- [x] /quy-trinh-tri-lieu: HealingProcessMotion (dynamic)
- [x] /khong-gian: YVienSpaceExperience (dynamic)
- [x] /lien-he: FaqAccordion
- [x] /dich-vu: ServiceFilterGrid full + section #bang-gia
- [x] Checkpoint: build + QA 5 trang

## P5 — Homepage mới (L)
- [x] BodyMap.tsx SVG 6 region glow CSS
- [x] BodySignalInterface + BodyStatePanel (chips aria-pressed)
- [x] FourBodyStates Tắc/Hàn/Hư/Loạn expand
- [x] RitualTimeline 7 khoảnh khắc
- [x] SpaceAsTherapy 4 frame
- [x] RecommendationDrawer slide-up (không đè MobileBottomBar)
- [x] HomeFinalCTA
- [x] app/page.tsx viết lại; xóa Marquee/NeedSelector + CSS marquee
- [x] QA: reduced-motion, keyboard, 375px, grep gsap = 0

## P6 — Header phẳng
- [x] 6 mục + Đặt lịch; footer nhận route phụ

## P7 — SEO
- [x] Xóa keywords; sitemap.ts + robots.ts (basePath)
- [x] JSON-LD: geo/image/priceRange/sameAs/areaServed/hasOfferCatalog
- [x] Service schema /dich-vu/[slug]; FAQPage /lien-he; Breadcrumbs
- [x] Homepage metadata thương mại "trị liệu Đông y Hà Nội"

## P8 — Polish
- [x] Gold audit: text-gold cấm <24px (SiteFooter 16, BookingStepper 9, lien-he 8)
- [x] Images width/height (CLS)
- [x] Prettier pass
- [x] Lighthouse: LCP<2.5s CLS<0.1 so baseline
