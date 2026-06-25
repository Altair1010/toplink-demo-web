# 00 · Audit website Y Viện Toplink (hiện trạng)

> Audit phục vụ đợt nâng cấp theo master prompt. Token tham chiếu trong `tokens/`.

## Stack hiện tại
- **Framework**: Next.js (App Router) — `output: "export"` (static), host GitHub Pages, `basePath: /toplink-demo-web`.
- **CSS**: Tailwind v4 (`@import "tailwindcss"` + `@theme` tokens trong `app/globals.css`). Không dùng config JS.
- **Font**: Be Vietnam Pro (display, IN HOA) + Noto Sans (body) qua `next/font/google`.
- **Icon**: lucide-react. **Ảnh**: `next/image` với `images.unoptimized: true` (render `<img>` thuần).
- **Motion**: tự viết, không thư viện — IntersectionObserver + CSS transition.

## Cấu trúc file chính
- `app/layout.tsx` — root, mount `SiteHeader`, `SiteFooter`, `MobileBottomBar`.
- `app/page.tsx` — homepage.
- `data/content.ts` — toàn bộ mock data (SERVICES, PROCESS_STEPS, SPACES, REVIEWS, FAQS, PRODUCTS, TEAM…).
- `components/` — Reveal, ConvergeOnScroll (ConvergeItem/HerbLeaf/LeafField), Marquee, BookCard, ServiceCard,
  NeedSelector, FaqAccordion, MobileBottomBar, SectionHeader, BrandVisual, Img…
- `app/globals.css` — design tokens + motion kit (reveal, converge, book-open, marquee, lift/zoom, ken-burns).

## Section homepage hiện có
Hero → Marquee → NeedSelector → "Vì sao chọn Toplink" → STATS → Featured services (BookCard) →
Không gian 4 tầng → Công nghệ & thiết bị → Quy trình (4/8 bước) → Reviews → FAQ → CTA.

## Vấn đề UI/UX
- Thiếu section **"Về Y Viện"** dạng kể chuyện (ConvergeItem đã có nhưng chưa dùng ở homepage).
- Mật độ section khá dày; thiếu nhịp "thở" giữa các khối.
- Card dịch vụ/sản phẩm chưa có **filter/category** trên homepage.

## Vấn đề content
- **Nhiều chữ**: nhiều đoạn body dài (Công nghệ, About ẩn trong data).
- **Quy trình**: data 8 bước, homepage cắt 4 đầu nhưng tiêu đề ghi "8 bước" → không khớp master prompt
  (yêu cầu đúng 4 bước: Tiếp nhận / Tư vấn / Trị liệu / Theo dõi).
- **Reviews giả**: tên cụ thể (Chị Lan Hương, Anh Minh Đức…) + 5 sao → cảm giác giả.
- **FAQ**: 4 câu hiện tại khác 4 câu bắt buộc (thoát vị / sau sinh / lớn tuổi / tần suất).
- **CTA cuối**: chưa dùng câu bắt buộc "Bạn đã chăm sóc mọi người cả ngày rồi…".

## Vấn đề hình ảnh
- Hero và phần lớn ảnh là **không gian/nội thất/tĩnh vật**; thiếu **người thật** (KTV trị liệu, khách
  trải nghiệm, tư vấn). Chỉ có 4 ảnh đội ngũ (`/images/team/`).

## Vấn đề motion
- Motion kit tốt nhưng **ConvergeItem chưa dùng**; quy trình chưa có active-on-scroll.
- Đã respect `prefers-reduced-motion` (giữ).

## Vấn đề conversion / CTA / Zalo
- **Không có floating Zalo trên desktop** — chỉ `MobileBottomBar` (mobile) với ô Zalo bị "chìm"
  (cùng màu 3 nút còn lại).
- CTA chính của Hero là "Đặt lịch", chưa ưu tiên **Inbox Zalo**.

---

## Token rút từ dembrandt (tóm tắt — chi tiết ở `tokens/`)
| Site | Primary | Phụ | Radius nổi bật | Shadow | Ghi chú motion |
|---|---|---|---|---|---|
| Dropbox brand | `#055463` teal | `#0061FE` xanh | — | `0 16px 32px rgba(0,0,0,.1)` | scroll → khối hội tụ về giữa |
| MyWebLab | `#2A26F7` | `#141414` | pill `100px`, `40px` | `0 10px 40px rgba(0,0,0,.03)` rất nhẹ | type cực lớn (Instrument Serif 280px), nhịp scroll kể chuyện |
| Autodesk | `#000` | `#FF0` | — | — | grid card "Popular products" + hover |
| Toplink (hiện tại) | `#95131F` | gold `#D8AA4B` | sharp 2–4px | — | reveal/converge/book-open có sẵn |

**Kết luận token**: 3 site tham chiếu đều dùng **shadow rất mềm, nông** + nền trắng/sạch + type lớn,
ít chữ. Toplink giữ palette đỏ dược liệu riêng (KHÔNG mượn màu), chỉ học **độ mềm của shadow, khoảng
thở, và nhịp scroll kể chuyện**.
