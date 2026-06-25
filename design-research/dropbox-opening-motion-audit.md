# Dropbox Brand — Opening & Scroll-Converge Motion Audit

> Nguồn: `https://brand.dropbox.com/` · Token đo bằng dembrandt v0.20.0 →
> `design-research/tokens/dropbox-brand/tokens.json` (+ `tokens.md`).
> Mục đích: **chỉ học cơ chế motion / nhịp layout / nguyên lý**. KHÔNG copy
> màu/typography/text/asset. Mọi giá trị màu–spacing–shadow dưới đây là token
> dembrandt đo được; phần motion là nguyên lý quan sát để chuyển hóa.

---

## 1. Token đo được (dembrandt)
| Nhóm | Giá trị |
|---|---|
| Color · primary | `#055463` (teal) — **KHÔNG copy** |
| Color · secondary | `#0061FE` (blue) — **KHÔNG copy** |
| Color · surface / on-surface | `#FFFFFF` / `#4E0119` |
| Typography heading | DB Sharp Grotesk Variable, 29–41px, weight 500–700 — **KHÔNG copy** |
| Typography body | Atlas Grotesk, 14px, 1.43 |
| Spacing | thang 8px (xs 8 · sm 12 · md 18 · lg 22 · xl 23) |
| Breakpoints | 249 · 399 · 480 · 648 · 767 · 991 px |
| Shadow | `rgba(0,0,0,0.1) 0 16px 32px 0` (mềm & nông) |

## 2. Motion pattern (nguyên lý opening / scroll-converge)
- **Cơ chế chủ đạo**: các khối nội dung/hình **xuất phát lệch tâm** (trượt từ
  trái/phải/dưới), **mờ + thu nhỏ nhẹ**, rồi **hội tụ về giữa** + **rõ + về kích
  thước thật** theo **scroll progress** (scrub), không phải trigger-point bật/tắt.
- **Sticky / pin**: khối opening được giữ (pin) ở giữa viewport trong một quãng
  cuộn để motion có không gian diễn ra; nội dung tiến hóa theo tiến độ cuộn.
- **Stagger**: các khối không tới cùng lúc — lệch nhịp nhẹ tạo cảm giác "kể chuyện".
- **Scale/opacity là chính**, **rotation gần như không** (giữ trang nghiêm, không lòe).
- **Parallax phụ rất nhẹ** trên ảnh để tạo chiều sâu, biên độ nhỏ.

## 3. Scroll behavior & timing
- Scrub mềm (motion bám theo tay cuộn, có quán tính/độ trễ nhẹ) → cảm giác cao cấp.
- Easing kiểu *ease-out* (vào nhanh, dừng chậm) cho cảm giác "đặt nhẹ vào chỗ".
- Quãng pin đủ dài (cỡ 1.5–2.5× chiều cao màn hình) để khối hội tụ trọn vẹn.

## 4. Layout rhythm & spacing
- Thang spacing 8px, nhiều **khoảng thở**, mỗi khối **một ý / ít chữ**.
- Lưới canh giữa, max-width vừa phải; visual và text cân đối hai bên.

## 5. Responsive behavior
- Màn nhỏ: **bỏ pin/scrub**, chuyển sang **reveal tĩnh** khi khối vào viewport
  (tránh giật/chóng mặt và tiết kiệm CPU trên mobile).

## 6. Điểm ĐƯỢC học
- Cơ chế **slide → converge-to-center** điều khiển bằng **scroll progress (scrub)**.
- **Sticky/pin** tạo "sân khấu" cho opening.
- **Stagger** nhịp khối; **scale + opacity** là trục chính; **parallax nhẹ**.
- **Shadow mềm & nông**, **khoảng thở rộng**, **ít chữ**.
- **Mobile fallback** = reveal tĩnh.

## 7. Điểm KHÔNG copy
- Màu teal `#055463`, blue `#0061FE`, surface trắng/`#4E0119`.
- Font DB Sharp Grotesk / Atlas Grotesk.
- Mọi **text, hình ảnh, layout cụ thể, asset** của Dropbox.

## 8. Chuyển hóa sang Y Viện Toplink
- Giữ **palette Toplink**: đỏ dược liệu `#95131F` + vàng kim `#D8AA4B`, nền kem/ngọc.
- Áp cơ chế vào **2 section**: *Về Y Viện* (sticky converge — text + ảnh người thật
  trượt từ nhiều hướng, hội tụ giữa) và *Không gian Y Viện* (4 tầng scroll-driven cards).
- Motion **chậm hơn, mềm hơn** (chất trị liệu), tôn trọng `prefers-reduced-motion`,
  có fallback no-JS. Chi tiết hệ thống: `toplink-motion-system.md`.
