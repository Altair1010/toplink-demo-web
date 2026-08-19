> ARCHIVE — ghi chép lịch sử, KHÔNG phải trạng thái hiện tại. Có thể mô tả phương án đã bị loại bỏ (Lenis, Three.js, marquee, hero cũ). Nguồn sự thật: `app-demo/styles/tokens.css` + `DESIGN.md` + `AGENTS.md`.

# Kế hoạch — Đại cách tân "Nghi thức chẩn thân"

Nguồn plan đầy đủ: `C:\Users\MCBAu\.claude\plans\swirling-scribbling-cookie.md`

Mục tiêu: homepage từ "index page syndrome" → trải nghiệm body-first (chẩn thân → Tắc/Hàn/Hư/Loạn → gợi ý liệu trình → đặt lịch). Cleanup: bỏ Lenis+Three, CSS split, fonts 9→5, serif chỉ H1/H2, gold contrast, IA phẳng, SEO schema.

## Quyết định chốt
- Bỏ hẳn `lenis` + `three` — native scroll, lá CSS.
- Bảng giá = `/dich-vu#bang-gia`.
- Đủ 8 phase, commit theo phase.

## Phases

| Phase | Nội dung | Size | Verify |
|---|---|---|---|
| P0 | Baseline: commit NavDropdown, build, Lighthouse gốc | S | build xanh |
| P1 | Tách globals.css → styles/{tokens,typography,components,utilities}.css; fonts 5 weight; serif chỉ h1/h2; type scale mới | M | build + 5 font files + h3 sans |
| P2 | Xóa SmoothScrollProvider/WindLeafField, AmbientLeaves CSS, uninstall lenis/three, dynamic import | M | grep lenis\|three = 0 |
| P3 | data/content.ts: BODY_STATES/BODY_REGIONS/SYMPTOMS/RITUAL_MOMENTS + lib/recommendation.ts | S | tsc pass |
| P4 | Di cư: WhyChoose+Stats+ReviewWall→/gioi-thieu; Process→/quy-trinh-tri-lieu; Space→/khong-gian; FAQ→/lien-he; Grid+#bang-gia→/dich-vu | M | build + QA 5 trang |
| P5 | components/home-experience/ (8 file) + app/page.tsx mới; xóa Marquee/NeedSelector; motion = 3 CSS | L | grep gsap route / = 0; drawer đúng |
| P6 | SiteHeader phẳng 6 mục; route phụ → footer | S | không dropdown |
| P7 | sitemap.ts + robots.ts + JSON-LD enrich + Service/FAQPage/Breadcrumb schema | M | out/sitemap.xml đúng basePath |
| P8 | Gold audit (150 occ), images CLS, Prettier, Lighthouse | M | LCP<2.5 CLS<0.1 |
