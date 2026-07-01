# BẢNG KIỂM TRA TYPOGRAPHY — TẤT CẢ SECTION & SUBTAB

> Mục đích: đối chiếu trên web rồi chỉnh từng chút. Cột **Size** ghi cả class Tailwind và px quy đổi (mobile → desktop nếu có `sm:`/`lg:`).
> Nguồn: `app-demo/` (Next.js). Font nạp qua `next/font`: **Noto Serif** (heading) + **Be Vietnam Pro** (body).

---

## 0 · LEGEND (bảng quy đổi dùng chung)

### Font
| Tên trong code | Font thật | Dùng cho |
|---|---|---|
| `font-display` / `font-serif` / `.font-serif-display` | **Noto Serif** (serif) | Toàn bộ heading h1–h6, eyebrow, số lớn, quote |
| mặc định (body) | **Be Vietnam Pro** (sans) | Đoạn văn, nút, nhãn, form |
| Weight nạp | 400 · 500 · 600 · 700 | (class `font-black`=900 vẫn áp dù font tối đa 700) |

Mặc định heading (globals.css): weight **600**, `line-height 1.22`, `letter-spacing -0.005em`, KHÔNG uppercase.
Body toàn site: **18px** (`1.125rem`), `line-height 1.7`.

### Quy đổi cỡ chữ (Tailwind → px)
| Class | px | Class | px |
|---|---|---|---|
| `text-xs` | 12 | `text-3xl` | 30 |
| `text-sm` | 14 | `text-4xl` | 36 |
| `text-base` | 16 | `text-5xl` | 48 |
| `text-lg` | 18 | `text-6xl` | 60 |
| `text-xl` | 20 | `var(--text-hero)` | clamp 36 → 44 |
| `text-2xl` | 24 | `var(--text-statement)` | clamp 28 → 32 |

### Chiều rộng container (max-width)
| Class | px | Class | px |
|---|---|---|---|
| `max-w-7xl` | 1280 | `max-w-2xl` | 672 |
| `max-w-6xl` | 1152 | `max-w-xl` | 576 |
| `max-w-5xl` | 1024 | `container-narrow` | 760 |
| `max-w-4xl` | 896 | `max-w-3xl` | 768 |

### Khoảng đệm dọc section (padding-block)
| Class | px | Ghi chú |
|---|---|---|
| `section-pad` | clamp 64 → 112 | section thường |
| `section-pad-lg` | clamp 88 → 176 | trụ cột (không gian / quy trình) |
| `py-14` / `py-16` / `py-12` / `py-20` | 56 / 64 / 48 / 80 | dùng lẻ theo trang |

### Màu chữ hay gặp
`crimson-600 #95131f` (đỏ chính) · `gold-200/300/400` (vàng) · `ink #1a1410` (mực) · `ink-soft #4a4a4a` (xám body) · `cream/85` (kem trên nền tối).

---

## GLOBAL · Header / Footer / Thanh dưới (mọi trang)

### Header (`SiteHeader.tsx`) — sticky top, cao `h-16`=64px (mobile) / `lg:h-20`=80px, nền ivory, rộng `max-w-7xl`=1280
| Thành phần | Font | Size | Kích thước | Nội dung |
|---|---|---|---|---|
| Logo chấm "Y" | Noto Serif | `text-xl`→`lg:text-2xl` 20→24 | ô tròn 44→48px, nền crimson-600 | Y |
| Tên brand | Noto Serif, 700 | `text-xl`→`lg:text-2xl` 20→24 | auto | Y Viện Toplink |
| Nav nhóm (desktop) | Noto Serif | (NavDropdown) | gap 20px | Giới thiệu · Dịch vụ · Hợp tác · Tin tức & Liên hệ |
| Nút "Đặt lịch" | Be Vietnam Pro, 700, UPPERCASE | `text-sm` 14 | px 16–20, py 10 | ĐẶT LỊCH |
| Menu mobile — nhãn nhóm | Be Vietnam Pro, 600 | `text-base` 16 | py 12 | Giới thiệu / Dịch vụ / Hợp tác / Tin tức & Liên hệ |
| Menu mobile — mục con | Be Vietnam Pro | `text-base` 16 | py 10 | Về Y Viện, Không gian, Liệu trình… |

### Footer (`SiteFooter.tsx`) — nền wood-700, `mt-20`, rộng `max-w-6xl`=1152, `py-14`=56
| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| Chấm "Y" + tên | Noto Serif, 900 | `text-xl` 20 | Y Viện Toplink |
| Đoạn giới thiệu | Be Vietnam Pro | `text-base` 16 | "Y Viện Dưỡng Thân · Tỉnh Thức. Đông y dưỡng sinh…" |
| Tiêu đề cột (×4) | Noto Serif, 700 | `text-xl` 20 | Khám phá · Hệ thống cơ sở · Liên hệ |
| Link/mục liệt kê | Be Vietnam Pro | `text-base` 16 | Dịch vụ, Quy trình, hotline, Zalo, email… |
| Nút "Đặt lịch trải nghiệm" | Be Vietnam Pro, 600 | `text-base` 16 | Đặt lịch trải nghiệm |
| Dòng bản quyền | Be Vietnam Pro | `text-sm` 14 | © … Y Viện Toplink · Bản demo giao diện… |

### Thanh CTA dưới đáy — mobile (`MobileBottomBar.tsx`) — fixed bottom, nền ivory
| Ô | Font | Size | Nội dung |
|---|---|---|---|
| Gọi ngay / Zalo / Chỉ đường | Be Vietnam Pro, 500 | `text-xs` 12 | Gọi ngay · Zalo · Chỉ đường |
| Đặt lịch (CTA chính, ô giữa rộng 1.6fr, nền crimson) | Be Vietnam Pro, 700 | `text-xs` 12 | Đặt lịch |

---

## SUBTAB 1 · TRANG CHỦ (`/` — `app/page.tsx`)

### 1. HERO — nền crimson-800, grid 5/7, `min-h-[88svh]`, rộng `max-w-7xl`=1280, `py-16`→`sm:py-24`
| Thành phần | Font | Size | Kích thước | Nội dung |
|---|---|---|---|---|
| Badge viền | Be Vietnam Pro, 600, UPPERCASE | `text-base` 16 | viền gold, px16 py6 | Y Viện Dưỡng Thân · Tỉnh Thức |
| **H1** | Noto Serif, 600 | `var(--text-hero)` 36→44 | line-height 1.02 | Dưỡng thân bằng Đông y, tìm lại sự **nhẹ nhõm** |
| Đoạn mô tả | Be Vietnam Pro | `text-lg`→`sm:text-xl` 18→20 | max-w-xl 576 | "Trị liệu dưỡng sinh, thảo dược và không gian tĩnh tại…" |
| Nút "Đặt lịch ngay" | Be Vietnam Pro, 700 | `text-lg` 18 | px32 py16, nền gold | Đặt lịch ngay |
| Nút "Tư vấn qua Zalo" | Be Vietnam Pro, 600 | `text-base` 16 | viền gold, px28 py16 | Tư vấn qua Zalo |
| Link "Khám phá không gian" | Be Vietnam Pro, 600 | `text-base` 16 | — | Khám phá không gian → |
| Ảnh hero | — | — | `h-[min(72vh,760px)]`, bo `rounded-3xl` + frame-gold | (ảnh) |
| Con dấu "Y" | Noto Serif | `text-2xl` 24 | vòng 56px | Y |
| Caption ảnh (dòng 1) | Be Vietnam Pro | `text-2xl` 24 | — | Được chăm sóc bởi người thật |
| Caption ảnh (dòng 2) | Be Vietnam Pro, UPPERCASE | `text-sm` 14 | — | Kỹ thuật viên · Chuyên viên |

### 2. MARQUEE khẩu hiệu — nền crimson-700, `py-4`
| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| Chữ chạy | Noto Serif | `text-xl`→`sm:text-2xl` 20→24 | Dưỡng thân từ gốc · Phục hồi từ tâm · Đông y dưỡng sinh · Khí huyết điều hòa · Thân · Tâm · Trí · Lắng nghe cơ thể |

### 3. VỀ Y VIỆN — rộng `max-w-6xl`=1152, `pt-20`; khối converge `max-w-4xl`=896
| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| Eyebrow (SectionHeader) | Noto Serif, 700, UPPERCASE | `text-base`→`sm:text-lg` 16→18 | Về Y Viện |
| Tiêu đề H2 | Noto Serif, 600 | `text-2xl`→`sm:text-3xl` 24→30 | Chăm sóc bắt đầu từ **lắng nghe** |
| Lead mỗi khối (×3) | Noto Serif, 600 | `text-3xl`→`sm:text-4xl` 30→36 | "Không chỉ là một buổi massage." / "Không chỉ là kỹ thuật." / "Không chỉ là không gian đẹp." |
| Body mỗi khối | Be Vietnam Pro | `text-xl` 20 | "Là quá trình lắng nghe cơ thể." … |

### 4. NEED SELECTOR (`NeedSelector.tsx`) — card cream, `max-w-6xl`, `p-8`→`sm:p-12`
| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| H2 | Noto Serif, 600 | `text-3xl` 30 | Hôm nay cơ thể chị/anh đang **cần gì**? |
| Nút chip nhu cầu (×8) | Be Vietnam Pro, 500 | `text-base` 16 | Thư giãn · Ngủ ngon hơn · Cổ vai gáy · Lưng eo · Giảm căng thẳng · Phục hồi năng lượng · Dưỡng sinh định kỳ · Tư vấn liệu trình |
| Dòng gợi ý | Be Vietnam Pro | `text-base` 16 | "Gợi ý cho nhu cầu …:" |
| Tên dịch vụ gợi ý (H4) | Noto Serif, 600 | `text-lg` 18 | (tên dịch vụ khớp nhu cầu) |
| Meta gợi ý | Be Vietnam Pro | `text-sm` 14 | "{thời lượng} · từ {giá}" |
| Nút "Đặt lịch với nhu cầu này" | Be Vietnam Pro, 600 | `text-base` 16 | Đặt lịch với nhu cầu này → |

### 5. VÌ SAO CHỌN — `max-w-6xl`, `py-12`; lưới 4 ô
| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Vì sao chọn Y Viện |
| H2 | Noto Serif, 600 | 24→30 | Lắng nghe cơ thể, chăm sóc **từ gốc** |
| Tiêu đề ô (H3 ×4) | Noto Serif, 600 | `text-2xl` 24 | Đông y dưỡng sinh · Cá nhân hóa · Công nghệ cao · An toàn, minh bạch |
| Mô tả ô | Be Vietnam Pro | `text-base` 16 | "Thảo dược và liệu pháp truyền thống…" … |

### 6. SỐ LIỆU / NIỀM TIN — nền crimson-800, `py-12`, lưới 4 ô
| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| Số lớn (StatCounter) | Noto Serif, 700 | `text-4xl`→`sm:text-5xl` 36→48 | 100% · 8+ · 4 tầng · 10+ |
| Nhãn | Be Vietnam Pro | `text-base` 16 | KTV được đào tạo bài bản · Liệu trình dưỡng sinh & trị liệu · Không gian Tĩnh·Thông·Dưỡng·Tỉnh · Năm đồng hành… |

### 7. KHÔNG GIAN 4 TẦNG (`YVienSpaceExperience.tsx`) — `section-pad-lg`, `max-w-6xl`, hành trình ngang pin
| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Không gian Y Viện |
| H2 | Noto Serif, 600 | 24→30 | Bốn tầng · **một hành trình** |
| Desc | Be Vietnam Pro | `text-lg` 18 | "Cuộn để đi qua từng tầng…" |
| Số thứ tự tầng | Noto Serif | `text-6xl` 60 | 01 / 02 / 03 / 04 |
| "/ 0N" | Be Vietnam Pro, 600, UPPERCASE | `text-base` 16 | / 04 |
| Tên tầng (H3) | Noto Serif, 600 | `text-2xl`→`sm:text-3xl` 24→30 | Tầng 1 · Đón tiếp & dược liệu … Tầng 4 · Trà thiền & tỉnh thức |
| Mô tả tầng | Be Vietnam Pro | `text-lg` 18 | (mô tả từng tầng) |

### 8. QUY TRÌNH TRỊ LIỆU (home) (`HealingProcessMotion.tsx`) — nền cream, `section-pad-lg`, `max-w-6xl`
| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Quy trình trị liệu |
| H2 | Noto Serif, 600 | 24→30 | Bốn bước chăm sóc **bài bản** |
| Desc | Be Vietnam Pro | `text-lg` 18 | "Một hành trình rõ ràng…" |
| Số bước | Noto Serif | `text-5xl` 48 | 01 · 02 · 03 · 04 |
| Tiêu đề bước (H3 ×4) | Noto Serif, 600 | `text-2xl` 24 | Tiếp nhận · Tư vấn · Trị liệu · Theo dõi |
| Mô tả bước | Be Vietnam Pro | `text-base` 16 | (mô tả từng bước) |
| Link "Xem chi tiết quy trình" | Be Vietnam Pro, 600 | `text-base` 16 | Xem chi tiết quy trình → |

### 9. CÔNG NGHỆ & THIẾT BỊ — nền wood-700, `py-16`, `max-w-6xl`
| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| Eyebrow (dark) | Noto Serif, 700, UPPERCASE | 16→18 | Công nghệ & thiết bị |
| H2 (dark) | Noto Serif, 600 | 24→30 | Đông y kết hợp **công nghệ** hiện đại |
| Tên thiết bị (H3 ×4) | Noto Serif, 600 | `text-2xl` 24 | Nhiệt trị liệu thảo dược · Xông hơi & ngâm bồn · Trị liệu cơ sâu thủ công · Liệu pháp nóng·lạnh |
| Nhãn Tác động/Lợi ích/Phù hợp | Be Vietnam Pro, 600 | `text-base` 16 | Tác động: · Lợi ích: · Phù hợp: |
| Nội dung dl | Be Vietnam Pro | `text-base` 16 | (mô tả tương ứng) |

### 10. SẢN PHẨM & DỊCH VỤ (`ServiceFilterGrid.tsx`) — `max-w-6xl`, `py-16`
| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Sản phẩm & Dịch vụ |
| H2 | Noto Serif, 600 | 24→30 | Liệu trình theo **nhu cầu** của anh/chị |
| Desc | Be Vietnam Pro | `text-lg` 18 | "Chọn nhóm phù hợp…" |
| Nhãn "Liệu trình được chọn nhiều" | Noto Serif, 700, UPPERCASE | `text-base` 16 | Liệu trình được chọn nhiều |
| Nút filter (Tất cả / 3 nhóm) | Be Vietnam Pro, 500 | `text-base` 16 | Tất cả · Dịch vụ cơ bản · nâng cao · chuyên sâu |
| **BookCard** — nhãn cấp độ | Be Vietnam Pro, 600 | `text-sm` 14 | Cơ bản / Nâng cao / Chuyên sâu |
| BookCard — thời lượng | Be Vietnam Pro | `text-sm` 14 | 60 phút … |
| BookCard — tên dịch vụ (H3) | Noto Serif, 600 | `text-2xl` 24 | Gội đầu dưỡng sinh … |
| BookCard — mô tả ngắn | Be Vietnam Pro | `text-base` 16 | (short) |
| BookCard — giá + "Xem chi tiết" | Be Vietnam Pro, 600 | `text-base` 16 | Từ {giá} · Xem chi tiết → |

### 11. CẢM NHẬN KHÁCH HÀNG (`ReviewWall.tsx`) — nền cream, `section-pad`, `max-w-7xl`
| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Cảm nhận khách hàng |
| H2 | Noto Serif, 600 | 24→30 | Những chia sẻ **thật** |
| Desc | Be Vietnam Pro | `text-lg` 18 | "Ảnh, video và trích cảm nhận…" |
| Badge "Video/Ảnh chia sẻ" | Be Vietnam Pro, 600 | `text-xs` 12 | Video chia sẻ · Ảnh chia sẻ |
| Caption video | Be Vietnam Pro | `text-lg` 18 | "Không gian yên, kỹ thuật viên làm cẩn thận." |
| Caption ảnh | Be Vietnam Pro | `text-base` 16 | "Sau buổi trị liệu, vùng cổ vai gáy nhẹ hơn…" |
| Quote lớn (nền crimson) | Noto Serif, 600 | `var(--text-statement)` 28→32 | "Tôi thích phần tư vấn trước khi làm liệu trình." |
| Nhãn dưới quote | Be Vietnam Pro, UPPERCASE | `text-sm` 14 | Cảm nhận khách hàng |
| Dòng tin cậy | Be Vietnam Pro | `text-base` 16 | Đã được khách hàng đồng ý chia sẻ. |

### 12. FAQ (`FaqAccordion.tsx`) — `section-pad`, `container-narrow`=760
| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Câu hỏi thường gặp |
| H2 | Noto Serif, 600 | 24→30 | Có thể anh/chị đang **thắc mắc** |
| Câu hỏi (nút) | Be Vietnam Pro, 500 | `text-lg` 18 | 4 câu: thoát vị · sau sinh · người lớn tuổi · bao lâu dưỡng sinh |
| Câu trả lời | Be Vietnam Pro | `text-base` 16 | (nội dung trả lời) |

### 13. CTA CUỐI TRANG — nền crimson (cta-glow), `max-w-6xl`, `py-16`
| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| H2 (SplitReveal) | Noto Serif, 600 | `text-3xl` 30 | Bạn đã chăm sóc mọi người cả ngày rồi, hãy dành 90 phút để **yêu thương chính mình** nhé. |
| Nút "Đặt lịch ngay" | Be Vietnam Pro, 700 | `text-lg` 18 | Đặt lịch ngay |
| Nút "Tư vấn qua Zalo" | Be Vietnam Pro, 600 | `text-base` 16 | Tư vấn qua Zalo |
| Link "Xem liệu trình phù hợp" | Be Vietnam Pro, 600 | `text-base` 16 | Xem liệu trình phù hợp → |

---

## SUBTAB 2 · GIỚI THIỆU (`/gioi-thieu`)
Rộng `max-w-5xl`=1024, `py-14`=56.

| Section | Thành phần | Font | Size | Nội dung |
|---|---|---|---|---|
| Header | Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Giới thiệu |
| Header | H2 (title) | Noto Serif, 600 | 24→30 | Y Viện Dưỡng Thân · Tỉnh Thức |
| Header | Desc | Be Vietnam Pro | `text-lg` 18 | "Y Viện Toplink kết hợp Đông y dưỡng sinh…" |
| Sứ mệnh/Tầm nhìn | H3 (×2) | Noto Serif, **900** (`font-black`) | `text-2xl` 24 | Sứ mệnh · Tầm nhìn |
| Sứ mệnh/Tầm nhìn | Body | Be Vietnam Pro | `text-lg` 18 | (nội dung) |
| Triết lý (nền crimson-800) | H2 (SplitReveal) | Noto Serif, 600 | `text-3xl` 30 | Triết lý **dưỡng sinh** |
| Triết lý | Body | Be Vietnam Pro | `text-lg` 18 | "Chúng tôi tin rằng cơ thể có khả năng tự cân bằng…" |
| Giá trị cốt lõi | H2 | Noto Serif, 900 | `text-3xl` 30 | Giá trị cốt lõi |
| Giá trị cốt lõi | H3 (×3) | Noto Serif, 900 | `text-xl` 20 | Tận tâm · Tự nhiên · Chuyên môn |
| Giá trị cốt lõi | Mô tả | Be Vietnam Pro | `text-base` 16 | (mô tả) |
| Đội ngũ | H2 | Noto Serif, 900 | `text-3xl` 30 | Đội ngũ chuyên viên |
| Đội ngũ | Đoạn dẫn | Be Vietnam Pro | `text-lg` 18 | "Lương y và kỹ thuật viên được đào tạo bài bản…" |
| Đội ngũ | Tên (H3 ×4) | Noto Serif, 700 | `text-xl` 20 | Lương y Trần Minh Khang · Nguyễn Thị Thu Hà · Phạm Quốc Bảo · Lê Thảo Nguyên |
| Đội ngũ | Chức danh | Be Vietnam Pro, 600, UPPERCASE | `text-sm` 14 | Cố vấn chuyên môn Đông y … |
| Đội ngũ | Chuyên môn / Kinh nghiệm | Be Vietnam Pro | `text-base` 16 | (nội dung) |
| CTA | Nút | Be Vietnam Pro, 600, UPPERCASE | `text-lg` 18 | Đặt lịch trải nghiệm |

---

## SUBTAB 3 · KHÔNG GIAN Y VIỆN (`/khong-gian`)
Rộng `max-w-6xl`=1152, `py-14`=56. Bố cục xen kẽ ảnh/chữ, `space-y-20`.

| Section | Thành phần | Font | Size | Nội dung |
|---|---|---|---|---|
| Header (center) | Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Không gian Y Viện |
| Header | H2 | Noto Serif, 600 | 24→30 | Tĩnh · Thông · Dưỡng · Tỉnh |
| Header | Desc | Be Vietnam Pro | `text-lg` 18 | "Bốn tầng được thiết kế như một hành trình…" |
| Mỗi tầng (×4) | Tên tầng (H2) | Noto Serif, **900** | `text-3xl` 30 | Tầng 1 · Đón tiếp & dược liệu … Tầng 4 · Trà thiền & tỉnh thức |
| Mỗi tầng | Mô tả | Be Vietnam Pro | `text-lg` 18 | (mô tả từng tầng) |
| Mỗi tầng | Nút | Be Vietnam Pro, 600, UPPERCASE | `text-base` 16 | Đặt lịch trải nghiệm |

---

## SUBTAB 4 · DỊCH VỤ (`/dich-vu`)
Rộng `max-w-6xl`=1152, `py-14`=56. Nhóm theo cấp độ (3 nhóm).

| Section | Thành phần | Font | Size | Nội dung |
|---|---|---|---|---|
| Header | Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Dịch vụ |
| Header | H2 | Noto Serif, 600 | 24→30 | Các liệu trình tại Y Viện Toplink |
| Header | Desc | Be Vietnam Pro | `text-lg` 18 | "Từ chăm sóc nhẹ nhàng mỗi ngày đến liệu trình chuyên sâu…" |
| Mỗi nhóm (×3) | Tên nhóm (H2) | Noto Serif, **900** | `text-3xl` 30 | Dịch vụ cơ bản · Dịch vụ nâng cao · Dịch vụ chuyên sâu |
| Mỗi nhóm | Mô tả nhóm | Be Vietnam Pro | `text-base` 16 | "Thư giãn, chăm sóc nhẹ nhàng mỗi ngày" … |
| Card (BookCard) | — | (xem mục 10 trang chủ) | — | 8 dịch vụ |

---

## SUBTAB 5 · CHI TIẾT DỊCH VỤ (`/dich-vu/[slug]`)
Rộng `max-w-6xl`=1152, `py-10`=40. Grid 2/1 (main + sidebar sticky).

| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| Link quay lại | Be Vietnam Pro, 500 | `text-base` 16 | ← Tất cả dịch vụ |
| Badge cấp độ | Be Vietnam Pro, 600 | `text-sm` 14 | Cơ bản/Nâng cao/Chuyên sâu |
| **H1** tên dịch vụ | Noto Serif, 600 | `text-3xl`→`sm:text-4xl` 30→36 | (tên dịch vụ) |
| Đoạn short | Be Vietnam Pro | `text-lg` 18 | (short) |
| Tiêu đề block (H2 ×4) | Noto Serif, **900** | `text-2xl` 24 | Ai nên dùng · Cần thận trọng · Quy trình buổi trị liệu · Cảm giác sau buổi trị liệu |
| Danh sách li | Be Vietnam Pro | `text-base` 16 | (suitableFor / cautions / steps) |
| Quote cảm giác | Noto Serif, italic | `text-2xl` 24 | "{feeling}" |
| Lưu ý y khoa | Be Vietnam Pro | `text-base` 16 | "Lưu ý: Liệu trình hỗ trợ thư giãn…" |
| Sidebar — tên (H3) | Noto Serif, 900 | `text-xl` 20 | (tên dịch vụ) |
| Sidebar — Thời lượng/Giá | Be Vietnam Pro | `text-base` 16 | Thời lượng · Giá từ |
| Sidebar — nút "Đặt lịch dịch vụ này" | Be Vietnam Pro, 600 | `text-base` 16 | Đặt lịch dịch vụ này |
| Sidebar — nút "Nhắn Zalo tư vấn" | Be Vietnam Pro, 600 | `text-base` 16 | Nhắn Zalo tư vấn |

---

## SUBTAB 6 · QUY TRÌNH TRỊ LIỆU (`/quy-trinh-tri-lieu`)
Rộng `max-w-4xl`=896, `py-14`=56. Danh sách dọc (`<ol>`), node số tròn.

| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Quy trình trị liệu |
| H2 | Noto Serif, 600 | 24→30 | Một hành trình chăm sóc bài bản |
| Desc | Be Vietnam Pro | `text-lg` 18 | "Y Viện làm việc có quy trình, minh bạch…" |
| Số bước (vòng tròn 56px) | Noto Serif | `text-2xl` 24 | 01 · 02 · 03 · 04 |
| Tiêu đề bước (H3 ×4) | Noto Serif, **900** | `text-xl` 20 | Tiếp nhận · Tư vấn · Trị liệu · Theo dõi |
| Mô tả bước | Be Vietnam Pro | `text-lg` 18 | (mô tả) |
| Nút cuối | Be Vietnam Pro, 600 | `text-base` 16 | Bắt đầu hành trình của chị/anh |

---

## SUBTAB 7 · SẢN PHẨM (`/san-pham`)
Rộng `max-w-6xl`=1152, `py-14`=56. Lưới 4 cột.

| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Sản phẩm |
| H2 | Noto Serif, 600 | 24→30 | Hỗ trợ chăm sóc tại nhà |
| Desc | Be Vietnam Pro | `text-lg` 18 | "Thảo dược, máy sức khỏe và sản phẩm hỗ trợ…" |
| Nhãn nhóm (mỗi card) | Be Vietnam Pro, 600, UPPERCASE | `text-sm` 14 | Thảo dược · Hỗ trợ tại nhà · Máy sức khỏe |
| Tên sản phẩm (H3 ×4) | Noto Serif, **900** | `text-xl` 20 | Trà dưỡng sinh · Túi chườm · Gói ngâm chân · Máy massage cổ vai gáy |
| Mô tả | Be Vietnam Pro | `text-base` 16 | (desc ngắn) |
| Giá "từ …" | Be Vietnam Pro, 600 | `text-base` 16 | từ 120.000đ … |
| Nút "Tư vấn liệu trình" | Be Vietnam Pro, 600 | `text-base` 16 | Tư vấn liệu trình |

---

## SUBTAB 8 · ĐÀO TẠO (`/dao-tao`)
Rộng `max-w-6xl`=1152, `py-14`=56.

| Section | Thành phần | Font | Size | Nội dung |
|---|---|---|---|---|
| Header | Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Học viện Toplink |
| Header | H2 | Noto Serif, 600 | 24→30 | Đào tạo kỹ thuật viên **dưỡng sinh** |
| Header | Desc | Be Vietnam Pro | `text-lg` 18 | (TRAINING.intro) |
| Quyền lợi | H2 | Noto Serif, **900** | `text-3xl` 30 | Quyền lợi học viên |
| Quyền lợi | Danh sách li (×4) | Be Vietnam Pro | `text-lg` 18 | Lộ trình từ cơ bản… · Giảng dạy bởi lương y… · Cấp chứng nhận… · Thực hành trên thiết bị… |
| Lộ trình | H2 | Noto Serif, 900 | `text-3xl` 30 | Lộ trình đào tạo |
| Lộ trình | Số 01–04 | Noto Serif | `text-4xl` 36 | 01 · 02 · 03 · 04 |
| Lộ trình | Tiêu đề bước (H3 ×4) | Noto Serif, 600 | `text-xl` 20 | Nền tảng dưỡng sinh · Kỹ năng trị liệu · Chăm sóc khách hàng · Thực hành & chứng nhận |
| Lộ trình | Mô tả | Be Vietnam Pro | `text-base` 16 | (desc) |
| CTA (nền crimson-800) | H2 | Noto Serif, 600 | `text-3xl` 30 | Quan tâm khóa **đào tạo**? |
| CTA | Body | Be Vietnam Pro | `text-lg` 18 | "Để lại thông tin hoặc nhắn Zalo…" |
| CTA | Nút "Đăng ký tư vấn" / "Nhắn Zalo" | Be Vietnam Pro, 600 | `text-base` 16 | Đăng ký tư vấn → · Nhắn Zalo |

---

## SUBTAB 9 · NHƯỢNG QUYỀN (`/nhuong-quyen`)
Rộng `max-w-6xl`=1152, `py-14`=56.

| Section | Thành phần | Font | Size | Nội dung |
|---|---|---|---|---|
| Header | Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Nhượng quyền & Hợp tác |
| Header | H2 | Noto Serif, 600 | 24→30 | Cùng phát triển mô hình **Y Viện** |
| Header | Desc | Be Vietnam Pro | `text-lg` 18 | (FRANCHISE.intro) |
| Hỗ trợ | H2 | Noto Serif, **900** | `text-3xl` 30 | Hỗ trợ dành cho đối tác |
| Hỗ trợ | Tiêu đề (H3 ×4) | Noto Serif, 600 | `text-xl` 20 | Set-up & vận hành · Đào tạo đội ngũ · Sản phẩm & dược liệu · Marketing & thương hiệu |
| Hỗ trợ | Mô tả | Be Vietnam Pro | `text-base` 16 | (desc) |
| CTA (nền wood-700) | H2 | Noto Serif, 600 | `text-3xl` 30 | Trở thành **đối tác** Y Viện Toplink |
| CTA | Body | Be Vietnam Pro | `text-lg` 18 | "Liên hệ để nhận hồ sơ hợp tác…" |
| CTA | Nút "Đăng ký hợp tác" / "Gọi …" | Be Vietnam Pro, 600 | `text-base` 16 | Đăng ký hợp tác → · Gọi 0968 824 386 |

---

## SUBTAB 10 · TIN TỨC (`/tin-tuc`) — `BlogIndex.tsx`
Rộng `max-w-6xl`=1152, `py-14`=56.

| Section | Thành phần | Font | Size | Nội dung |
|---|---|---|---|---|
| Header | Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Tin tức & kiến thức |
| Header | H2 | Noto Serif, 600 | 24→30 | Kiến thức sức khỏe & dưỡng sinh |
| Header | Desc | Be Vietnam Pro | `text-lg` 18 | "Những bài viết giúp chị/anh chăm sóc cơ thể…" |
| Filter | Nút danh mục | Be Vietnam Pro, 700, UPPERCASE | `text-sm` 14 | Tất cả · Kiến thức sức khỏe · Đông y dưỡng sinh · Quy trình trị liệu |
| Bài nổi bật | Badge cat + "Bài nổi bật" | Be Vietnam Pro, 700, UPPERCASE | `text-xs`/`text-sm` 12/14 | (danh mục) · Bài nổi bật |
| Bài nổi bật | Tiêu đề (H2) | Noto Serif, 600 | `text-2xl`→`sm:text-3xl` 24→30 | (title bài đầu) |
| Bài nổi bật | Excerpt | Be Vietnam Pro | `text-lg` 18 | (excerpt) |
| Bài nổi bật | Meta ngày/đọc | Be Vietnam Pro | `text-sm` 14 | 28/05/2026 · 5 phút đọc |
| Bài nổi bật | "Đọc bài viết" | Be Vietnam Pro, 700, UPPERCASE | `text-base` 16 | Đọc bài viết → |
| Card thường | Nhãn cat | Be Vietnam Pro, 700, UPPERCASE | `text-xs` 12 | (danh mục) |
| Card thường | Tiêu đề (H3) | Noto Serif, 700 | `text-xl` 20 | (title) |
| Card thường | Excerpt | Be Vietnam Pro | `text-base` 16 | (excerpt) |
| Card thường | Meta | Be Vietnam Pro | `text-sm` 14 | ngày · phút đọc |

---

## SUBTAB 11 · CHI TIẾT BÀI VIẾT (`/tin-tuc/[slug]`)
Rộng `max-w-3xl`=768, `py-10`=40.

| Thành phần | Font | Size | Nội dung |
|---|---|---|---|
| Link quay lại | Be Vietnam Pro, 500 | `text-base` 16 | ← Tất cả bài viết |
| Nhãn danh mục | Be Vietnam Pro, 700, UPPERCASE | `text-sm` 14 | (cat) |
| **H1** tiêu đề | Noto Serif, 600 | `text-3xl`→`sm:text-4xl` 30→36 | (title) |
| Meta ngày/đọc/tác giả | Be Vietnam Pro | `text-base` 16 | 28/05/2026 · 5 phút đọc · Đội ngũ Y Viện Toplink |
| Excerpt (viền vàng) | Be Vietnam Pro | `text-xl` 20 | (excerpt) |
| Đoạn thân bài | Be Vietnam Pro | `text-lg` 18 (lh 1.85) | (các đoạn body) |
| Lưu ý cuối | Be Vietnam Pro | `text-base` 16 | "Lưu ý: Nội dung mang tính chia sẻ kiến thức…" |
| Bài liên quan | H2 | Noto Serif, **900** | `text-2xl` 24 | Bài viết liên quan |
| Bài liên quan | Nhãn cat | Be Vietnam Pro, 700, UPPERCASE | `text-xs` 12 | (cat) |
| Bài liên quan | Tiêu đề (H3) | Noto Serif, 600 | `text-lg` 18 | (title) |
| Bài liên quan | "Đọc tiếp" | Be Vietnam Pro, 600 | `text-sm` 14 | Đọc tiếp → |

---

## SUBTAB 12 · ĐẶT LỊCH (`/dat-lich`) — `BookingStepper.tsx`
Rộng `max-w-4xl`=896 (nội dung stepper `max-w-2xl`=672), `py-14`=56.

| Section | Thành phần | Font | Size | Nội dung |
|---|---|---|---|---|
| Header (center) | Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Đặt lịch trải nghiệm |
| Header | H2 | Noto Serif, 600 | 24→30 | Chỉ 3 bước để được chăm sóc |
| Header | Desc | Be Vietnam Pro | `text-lg` 18 | "Y Viện sẽ gọi lại xác nhận…" |
| Stepper | Nhãn bước | Be Vietnam Pro | `text-sm` 14 | Chọn nhu cầu · Chọn dịch vụ · Thông tin liên hệ |
| Bước 1 | H2 | Noto Serif, 700 | `text-3xl` 30 | Cơ thể chị/anh đang cần gì? |
| Bước 1 | Phụ đề | Be Vietnam Pro | `text-base` 16 | "Chọn nhu cầu chính để Y Viện gợi ý đúng hướng." |
| Bước 1 | Nút nhu cầu (×8) | Be Vietnam Pro, 500 | `text-base` 16 | (8 nhu cầu) |
| Bước 2 | H2 | Noto Serif, 700 | `text-3xl` 30 | Chọn dịch vụ phù hợp |
| Bước 2 | Phụ đề | Be Vietnam Pro | `text-base` 16 | "Hoặc để Y Viện tư vấn liệu trình…" |
| Bước 2 | Ô "Tôi chưa biết chọn…" | Be Vietnam Pro, 600 | `text-base`/`text-sm` 16/14 | Tôi chưa biết chọn dịch vụ nào |
| Bước 2 | Item dịch vụ | Be Vietnam Pro, 500 | `text-base`/`text-sm` 16/14 | (tên · thời lượng · giá) |
| Bước 3 | H2 | Noto Serif, 700 | `text-3xl` 30 | Thông tin liên hệ |
| Bước 3 | Phụ đề | Be Vietnam Pro | `text-base` 16 | "Y Viện sẽ gọi lại xác nhận lịch hẹn…" |
| Bước 3 | Nhãn field | Be Vietnam Pro, 500 | `text-base` 16 | Họ tên · Số điện thoại · Ngày/giờ · Cơ sở · Ghi chú |
| Bước 3 | Input (`.input`) | Be Vietnam Pro | 17px (`1.0625rem`) | (placeholder) |
| Nav | Nút Quay lại / Tiếp tục / Gửi | Be Vietnam Pro, 600 | `text-base` 16 | Quay lại · Tiếp tục → · Gửi yêu cầu đặt lịch |
| Màn thành công | H2 | Noto Serif, **900** | `text-3xl` 30 | Cảm ơn chị/anh 🌿 |
| Màn thành công | Body | Be Vietnam Pro | `text-lg` 18 | "Y Viện Toplink đã ghi nhận yêu cầu…" |

---

## SUBTAB 13 · LIÊN HỆ (`/lien-he`)
Rộng `max-w-6xl`=1152, `py-14`=56. Grid 2 cột.

| Section | Thành phần | Font | Size | Nội dung |
|---|---|---|---|---|
| Header | Eyebrow | Noto Serif, 700, UPPERCASE | 16→18 | Liên hệ |
| Header | H2 | Noto Serif, 600 | 24→30 | Cơ sở Y Viện Toplink |
| Header | Desc | Be Vietnam Pro | `text-lg` 18 | "Chị/anh có thể gọi hotline, nhắn Zalo…" |
| Cột trái | Tên cơ sở (H3) | Noto Serif, **900** | `text-2xl` 24 | Y Viện Toplink · Cơ sở Trung tâm |
| Cột trái | Địa chỉ/ĐT/Giờ | Be Vietnam Pro | `text-base` 16 | 123 Đường Sức Khỏe… · 0968 824 386 · 08:00 đến 21:00 |
| Cột trái | Nút "Gọi ngay" / "Chỉ đường" | Be Vietnam Pro, 600 | `text-base` 16 | Gọi ngay · Chỉ đường |
| Cột trái | Bản đồ (iframe) | — | — | cao `h-72`=288px |
| Cột phải (crimson-800) | H2 | Noto Serif, 600 | `text-3xl` 30 | Cần tư vấn **nhanh**? |
| Cột phải | Body | Be Vietnam Pro | `text-lg` 18 | "Nhắn Zalo, đội ngũ Y Viện sẽ phản hồi…" |
| Cột phải | Nút "Nhắn Zalo tư vấn" / "Gọi …" | Be Vietnam Pro, 600 | `text-base` 16 | Nhắn Zalo tư vấn · Gọi 0968 824 386 |

---

## GHI CHÚ CHỈNH SỬA

- **Đổi cỡ heading toàn site**: sửa `--text-hero` / `--text-statement` trong `app/globals.css` (dòng 83–84) và mặc định h1–h6 (dòng 176–190).
- **Eyebrow + Title của mọi SectionHeader** chỉnh tại `components/SectionHeader.tsx` (dòng 23 & 27) — áp dụng đồng loạt mọi trang.
- **Không đồng nhất cần lưu ý**: một số H2/H3 dùng `font-black` (900) — Sứ mệnh, Giá trị cốt lõi, Đội ngũ, Dịch vụ (tên nhóm), Sản phẩm, tên cơ sở… trong khi SectionHeader dùng 600. Nếu muốn thống nhất weight heading, đây là các điểm cần sửa.
- **Body mặc định 18px** (globals.css dòng 172) — `text-base` (16px) trong card là cố ý nhỏ hơn body.
