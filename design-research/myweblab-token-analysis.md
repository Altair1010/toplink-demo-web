# MyWebLab — Phân tích token & nguyên lý thiết kế

> Phân tích từ `myweblab-dembrandt-output.md`. Mục tiêu: **rút nguyên lý nhịp thiết kế**
> để áp cho Y Viện Toplink — KHÔNG bê nguyên giá trị màu/font/asset. Y Viện giữ bộ token
> Đông y riêng (`app-demo/app/globals.css`).

## 1. Colors — nguyên lý
| Nguyên lý MyWebLab | Áp cho Y Viện |
|--------------------|----------------|
| Nền trung tính rất tương phản (đen `#141414` / trắng / xám `#606060`) | Y Viện: kem giấy `#fffcf7`/`#f6f4df` + mực tàu `#1a1410` + xám `#636363` (đã có) |
| 1 màu thương hiệu mạnh (xanh điện `#2a26f7`) làm điểm tựa | Y Viện: đỏ dược liệu `#95131F` (đã có) — vai trò tương đương |
| 1 accent nóng dùng cực tiết chế (cam `#ff4e00`, chỉ ở state) | Y Viện: vàng kim `#D8AA4B` + accent đỏ `#c70002` (đã có) |
| Bảng màu **ít** (≈5) → sạch, sang | Giữ palette Y Viện gọn, không thêm màu mới |

**Học được:** kỷ luật màu — nền trung tính + 1 brand color + 1 accent. Y Viện đã đạt; không đổi.

## 2. Typography — nguyên lý
- MyWebLab: **serif hiển thị khổng lồ** (Instrument Serif, tới 280px) tương phản **sans body** (Plus Jakarta Sans). Editorial, "tỉ lệ kịch".
- Y Viện hiện: toàn sans IN HOA (Be Vietnam Pro display + Noto Sans body) — phù hợp người trung niên/cao tuổi, đã chốt theo nhatlieuyvien.vn.
- **Học được (áp dụng tiết chế):** đẩy mạnh **tương phản kích cỡ** giữa heading và body trong 2 section mới (số thứ tự/tiêu đề tầng rất lớn, mô tả nhỏ) để tạo cảm giác editorial cao cấp — KHÔNG đổi font.

## 3. Spacing — nguyên lý
- MyWebLab: **8px grid** chặt chẽ.
- Y Viện: Tailwind v4 mặc định cũng 4/8px grid → tương thích. Giữ rhythm thoáng (nhiều khoảng thở) cho 2 section mới.

## 4. Radius / Border / Shadow — nguyên lý
- MyWebLab: radius **4px** + **đường kẻ 1px** chia khối + **gần như không shadow** (flat).
- Y Viện: đã có `--radius-md: 4px`, viền vàng mảnh (`frame-gold`), `--shadow-soft` nông. → cùng triết lý "flat + line".
- **Học được:** trong 2 section mới, ưu tiên **đường kẻ mảnh + khoảng trắng** để phân tầng, shadow chỉ để báo "active/nổi", không đổ bóng nặng.

## 5. Layout rhythm — nguyên lý
- Nhiều breakpoint (560→1100px) → responsive kỹ từng nấc.
- Khối chia bằng grid + divider 1px, tiêu đề lớn neo trái/giữa.
- **Học được:** 2 section mới cần 3 trạng thái layout rõ: desktop (≥1024, có pin/sticky), tablet, mobile (≤768, stack tĩnh).

## 6. Motion tokens — nguyên lý (cốt lõi)
| MyWebLab | Diễn giải | Áp cho "Breath & Flow" |
|----------|-----------|------------------------|
| Easing chủ đạo `cubic-bezier(0.16, 1, 0.3, 1)` | expo-out: vào nhanh, hãm rất mượt ở cuối | **`--ease-ritual`** (đúng giá trị này — easing tự nhiên cho reveal trị liệu) |
| Chỉ transition `transform / opacity / color` | không animate layout → mượt, không thrash | Breath & Flow chỉ chạm transform/opacity |
| Chuyển động do **scroll position** điều khiển (duration đo ≈0) | scroll-driven, không autoplay | ScrollTrigger scrub theo nhịp cuộn |
| Motion theo ngữ cảnh (nav/hero/card/media riêng) | mỗi loại phần tử có "khẩu vị" chuyển động riêng | tách token: reveal · parallax · sticky-stack |

**Kết luận motion:** MyWebLab xác nhận triết lý "Breath & Flow" — **expo-out mềm + scroll-driven + chỉ transform/opacity**. Ta thêm chất Y Viện: **chậm hơn, có độ trễ stagger, biên độ nhỏ** (không giật, không bounce).

## 7. Mapping token → Breath & Flow (chốt)
```
--ease-ritual: cubic-bezier(0.16, 1, 0.3, 1)   ← học trực tiếp từ MyWebLab
--ease-soft:   cubic-bezier(0.22, 1, 0.36, 1)   ← giữ của Y Viện (đã dùng xuyên dự án)
--motion-fast/medium/slow: 180/420/760ms        ← nhịp thở chậm hơn web agency
--reveal-distance: 32px                          ← biên độ nhỏ (Y Viện điềm tĩnh)
--section-parallax-depth: 80px                   ← chiều sâu tầng, tiết chế
```
