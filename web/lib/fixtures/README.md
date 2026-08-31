# P4 fixture boundary

Mọi record trong thư mục này chỉ là dữ liệu kiểm tra thiết kế/kỹ thuật cho P4. Chúng không phải sự
thật vận hành, dịch vụ, sản phẩm hay nội dung đã được Y Viện Toplink phê duyệt.

- Các fact scaffold dùng trạng thái `REFERENCE_ONLY`.
- Không có giá, số điện thoại, địa chỉ, link Zalo/Facebook, nhân sự, cơ sở hay kết quả sức khỏe giả.
- UI luôn hiển thị nhãn fixture trên record scaffold.
- P6 phải thay implementation trong `lib/content/`; component không được import fixture trực tiếp.
- Dữ liệu này không được publish như production content.
