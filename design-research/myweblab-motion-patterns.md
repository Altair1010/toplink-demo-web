# MyWebLab — Audit motion thủ công (Playwright + DOM/CSS inspection)

> Quan sát trực tiếp `https://myweblab.it/` bằng Playwright (DOM, computed style, getBoundingClientRect).
> Mục tiêu: rút **nguyên lý chuyển động** của 2 section, KHÔNG sao chép mã/asset.
> Stack quan sát được: Next.js (CSS Modules), **Lenis** smooth-scroll, custom cursor (`hasCursor`),
> fonts Instrument Serif + Plus Jakarta Sans. Không thấy GSAP/Locomotive/Framer toàn cục → motion
> điều khiển bằng scroll-position + class toggling + transition CSS.

---

## A. Section "Come lavoriamo / Il Metodo" → `SvgStrokeProcess`

### Cấu trúc
```
section.SvgStrokeProcess-section (relative, cao ~3760px → journey dài)
├─ header (label + H2)
└─ canvas (relative)
   ├─ <svg viewBox="0 0 1000 2400">
   │    ├─ <path> nét zig-zag dọc:  M 240 80 → L 240 420 → C ... (cong sang phải/trái)
   │    └─ <circle> ×N  (node đánh dấu mỗi bước)
   └─ <ol.steps> (absolute)
        └─ <li.step .stepLeft | .stepRight>  ← xen kẽ trái/phải dọc theo nét
```

### Cơ chế scroll-trigger (cốt lõi)
1. **Vẽ nét theo scroll**: path dài `3012px`, khởi tạo `stroke-dasharray: 3012px; stroke-dashoffset: 3013px` (ẩn hoàn toàn). Khi cuộn qua section, `stroke-dashoffset` giảm dần 3013 → 0 → **nét tự "vẽ" từ trên xuống**, như mạch dẫn hành trình.
2. **Reveal từng bước theo tiến độ nét**: mỗi `<li.step>` khởi đầu `transform: translateY(-76px); opacity: 0`; khi nét vẽ chạm tới mốc (circle), bước đó trượt vào `translateY(0); opacity: 1`.
3. **Zig-zag trái/phải**: bước lẻ neo trái (`stepLeft`), bước chẵn neo phải (`stepRight`) → mắt đi theo nét cong qua lại, tạo nhịp "hành trình" thay vì hàng ngang phẳng.
4. Node tròn (circle) sáng lên khi nét đi qua → đánh dấu "đã tới bước này".

### Timing / easing / hướng
- Easing site chủ đạo: **`cubic-bezier(0.16, 1, 0.3, 1)`** (expo-out — vào nhanh, hãm mượt).
- Transform: chỉ `translateY` + `opacity` (GPU). Hướng: từ trên xuống (-76px → 0).
- Driver: **scroll position** (không autoplay) — section cao gấp nhiều lần viewport để có không gian cho nét vẽ.

### Desktop ↔ mobile
- Nhiều breakpoint (560→1100px). Mobile: nét SVG zig-zag dồn về 1 cột, các bước stack dọc, vẫn vẽ nét nhưng biên độ cong hẹp lại.

### → Nguyên lý tái sử dụng cho "Quy trình trị liệu"
- **Progress line "tự vẽ" theo scroll** dẫn dắt 4 bước (thay timeline phẳng).
- Bước **active** sáng/nổi khi line chạm tới; bước **chưa tới** mờ + lùi nhẹ.
- Desktop: line dọc trung tâm + bước xen kẽ; mobile: vertical stepper, line dọc bên trái.
- Chỉ transform/opacity + easing ritual `(0.16,1,0.3,1)`.

---

## B. Section "Il nostro DNA Digitale" → `ExpandingCards`

### Cấu trúc
```
section.ExpandingCards-section
└─ container
   ├─ header (label + H2)
   └─ grid (display:flex; flex-direction:row)
        └─ .card  ×4  (1 card mang .active)
```

### Cơ chế
1. **Expanding accordion**: các card nằm trong flex-row. Card `.active` **giãn flex-grow** chiếm phần lớn bề ngang; các card còn lại **co lại** thành cột hẹp.
2. Transition: **`flex 0.6s cubic-bezier(0.25, 1, 0.3, 1)`** + `border-color 0.4s` → đổi card mượt như "thở ra/hít vào".
3. Card active **lộ nội dung/ảnh đầy đủ**; card inactive thu gọn còn nhãn dọc → tạo lớp lang & chiều sâu.
4. Active đổi theo tương tác (hover/scroll), không nhồi animation liên tục.

### Timing / easing
- Easing `cubic-bezier(0.25, 1, 0.3, 1)` (họ expo-out, gần `--ease-ritual`).
- Chỉ chạm `flex` (kích thước) + `border-color`/`opacity` — không layout-thrash nhờ flex transition mượt.

### Desktop ↔ mobile
- Desktop: flex-row ngang. Mobile: chuyển stack dọc, card active cao hơn, inactive thu gọn.

### → Nguyên lý tái sử dụng cho "Không gian Y Viện" (đã chốt hướng **sticky-pin vertical stack**)
- Giữ ý "**một panel active nổi bật, các panel khác lùi/co lại**" của ExpandingCards.
- Nhưng render thành **vertical spatial journey** (theo yêu cầu mục 5): container **sticky/pin**, mỗi tầng lần lượt vào **center viewport** khi cuộn.
- Tầng active: scale 1 + shadow + ảnh reveal + viền sáng (border-color như MyWebLab).
- Tầng inactive: `translateY` lùi + scale nhỏ + mờ → chiều sâu xếp lớp.
- Mobile: bỏ pin → stack dọc reveal nhẹ (không lag).

---

## C. Tổng hợp nguyên lý → "Breath & Flow"
| Quan sát MyWebLab | Chắt lọc cho Y Viện |
|-------------------|---------------------|
| Easing `cubic-bezier(0.16,1,0.3,1)` / `(0.25,1,0.3,1)` | `--ease-ritual` (reveal) + `--ease-soft` (hover) |
| Scroll-position driven, section cao | ScrollTrigger scrub + pin (desktop), không autoplay |
| Chỉ transform/opacity/flex/color | Breath & Flow chỉ transform/opacity (tránh `flex` để mượt trên mobile yếu) |
| Active nổi · inactive lùi/mờ | Y Viện: tầng/bước active scale+shadow, phần còn lại mờ + lùi |
| Line "tự vẽ" dẫn dắt | ScrollProgress: đường/thanh chạy theo progress trong section |
| Biên độ vừa, ít animation | Y Viện chậm hơn (760ms), biên độ nhỏ (32px), nhiều khoảng thở |
