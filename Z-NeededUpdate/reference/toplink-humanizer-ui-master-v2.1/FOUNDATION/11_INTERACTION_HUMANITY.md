# Interaction Humanity

## Principle

A humanized interface makes **consequence visible**.

## Every action contract asks

1. Ai nhận hành động này?
2. Hệ thống/người đó làm gì tiếp?
3. Khoảng chờ được diễn đạt ra sao?
4. Người dùng có thể sửa/undo không?
5. Nếu lỗi, recovery là gì?
6. Khi nào chuyển sang người thật?

Patient-centered communication is associated with trust in recent telehealth research.  
**Nguồn:** [JMIR 2025](https://www.jmir.org/2025/1/e63295)

## Booking state model

`IDLE → EXPLAINED → INPUT → REVIEW → SENT → HUMAN_FOLLOWUP`

Error branches:
- missing data;
- invalid contact;
- slot unavailable;
- network failure;
- service uncertainty.

## Copy examples

### Slot unavailable
“Khung giờ này đã kín. Anh/chị có thể chọn giờ khác hoặc để lại số điện thoại để Toplink kiểm tra lịch gần nhất.”

### Not sure
“Tôi chưa biết nên chọn dịch vụ nào” must be a first-class path, not a footer link.

### Submitted
“Toplink đã nhận thông tin. Nhân sự tiếp nhận sẽ đọc phần anh/chị chia sẻ trước khi liên hệ.”

## No fake immediacy
Không dùng “chuyên gia đang chờ”, countdown hoặc urgency nếu không có vận hành thật.
