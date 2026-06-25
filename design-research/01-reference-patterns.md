# 01 · Reference patterns → chuyển hóa cho Y Viện Toplink

> Chỉ rút **nguyên lý thiết kế / cơ chế motion / cấu trúc component**. KHÔNG copy màu, typography,
> layout, text hay asset của các site tham chiếu. Token gốc lưu ở `tokens/`.

---

## A. Dropbox Brand — scroll-driven blocks hội tụ về giữa
**Nguồn**: brand.dropbox.com · **Áp dụng**: section "Về Y Viện" + "Không gian Y Viện".

Nguyên lý:
- Các khối nội dung/hình **trượt từ hai bên hoặc từ dưới**, **phóng to dần** và **gom về giữa** theo
  tiến độ cuộn của chính khối đó trong viewport.
- Motion để **dẫn chuyện**, không trang trí. Nền sạch, thoáng. Mỗi khối **một ý, ít chữ**.

Chuyển hóa:
- Tái dùng `components/ConvergeOnScroll.tsx` (`ConvergeItem` — đã hiện thực đúng cơ chế: tự tính
  `progress` theo `getBoundingClientRect`, dịch + scale + fade, respect reduced-motion).
- "Về Y Viện" = 3 khối 1-ý (massage → lắng nghe cơ thể; kỹ thuật → bàn tay đào tạo; không gian → tạm
  dừng & thở), xen **ảnh người thật** (Unsplash). Nền ivory/cream.
- KHÔNG mượn teal `#055463`/xanh `#0061FE`; giữ đỏ dược liệu + vàng kim.

## B. MyWebLab — "Il Metodo / Come lavoriamo" → Quy trình trị liệu 4 bước
**Nguồn**: myweblab.it · **Áp dụng**: section "Quy trình trị liệu".

Nguyên lý:
- Quy trình **ít chữ**, mỗi bước có **số thứ tự rõ**, bước **active nổi bật hơn** khi scroll/hover.
- Cảm giác **có phương pháp, có hệ thống**. Không đoạn văn dài.

Chuyển hóa — 4 bước bắt buộc (component mới `ProcessStepper`, IntersectionObserver theo pattern `Reveal`):
1. **01 · Tiếp nhận** — Lắng nghe tình trạng cơ thể, thói quen sinh hoạt và nhu cầu chăm sóc.
2. **02 · Tư vấn** — KTV/bác sĩ định hướng liệu trình theo thể trạng và vùng cần chăm sóc.
3. **03 · Trị liệu** — Dưỡng sinh, bấm huyệt, đả thông, ngâm/xông trong không gian thư giãn.
4. **04 · Theo dõi** — Ghi nhận cảm nhận sau buổi và tư vấn nhịp chăm sóc tiếp theo.
- Desktop: hàng ngang có đường nối + số lớn; bước active sáng/nhấc nhẹ. Mobile: **vertical stepper**.
- KHÔNG mượn `#2A26F7` hay Instrument Serif 280px; giữ Be Vietnam Pro IN HOA.

## C. MyWebLab — "Il nostro DNA Digitale" → 4 tầng Không gian Y Viện
**Nguồn**: myweblab.it · **Áp dụng**: section "Không gian Y Viện" (chiều sâu hơn).

Nguyên lý:
- Mỗi tầng là **một module/card lớn**: visual + số tầng + tên + mô tả ngắn (2–3 câu / ≤70 chữ).
- Khi scroll/hover, tầng active **chuyển động nhẹ**. Cảm giác **đi qua từng tầng**.

Chuyển hóa:
- Giữ `SPACES` (Tầng 1 Tĩnh / 2 Thông / 3 Dưỡng / 4 Tỉnh), bọc `Reveal` + `lift`, ảnh từng tầng,
  mỗi tầng 1 câu mô tả. Có thể xen 1 ảnh người (KTV thao tác) làm điểm tin cậy.

## D. Autodesk — "Popular Products" → Sản phẩm & Dịch vụ
**Nguồn**: autodesk.com · **Áp dụng**: section "Sản phẩm & Dịch vụ".

Nguyên lý:
- **Card grid rõ ràng**, có **phân nhóm/filter/category**, **hover tinh tế**, **CTA rõ** từng card,
  không nhồi chữ.

Chuyển hóa (component mới `ServiceFilterGrid`):
- Filter theo `LEVELS` (Cơ bản / Nâng cao / Chuyên sâu) + "Tất cả"; card tái dùng `lift` + `BookCard`
  (book-open của Toplink — chính là chuyển hóa "mở sản phẩm" của Autodesk).
- CTA mỗi card: "Xem chi tiết" (→ trang dịch vụ) và/hoặc "Tư vấn liệu trình" (→ Zalo).
- KHÔNG mượn đen/vàng `#000`/`#FF0`.

---

## Nguyên tắc xuyên suốt khi chuyển hóa
- Giữ **palette đỏ dược liệu `#95131F` + vàng kim `#D8AA4B`** của Toplink. Không nhập màu ngoài.
- Học từ tham chiếu: **shadow mềm & nông**, **khoảng thở rộng**, **ít chữ**, **nhịp scroll kể chuyện**.
- Mọi motion chỉ animate transform/opacity và respect `prefers-reduced-motion`.
