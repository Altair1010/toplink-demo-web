# 04 — User Jobs Graph

**Phase:** H1
**Status:** `PARTIAL — all new jobs remain PROPOSED or UNVALIDATED`

## J-01 — body concern needs orientation (`PROPOSED`)

```text
JOB: “Tôi đang khó chịu ở một vùng cơ thể và muốn biết có hướng chăm sóc nào để trao đổi.”
  ↓ FIRST QUESTION: “Nơi này có nói đến tình trạng của tôi không?”
  ↓ SECOND QUESTION: “Họ đang mô tả điều gì bằng ngôn ngữ dễ hiểu?”
  ↓ TRUST QUESTION: “Đây là gợi ý chăm sóc hay là chẩn đoán? Khi nào cần kênh khác?”
  ↓ DECISION QUESTION: “Tôi nên trao đổi trước hay chọn một dịch vụ?”
  ↓ ACTION: “Chia sẻ tình trạng” / “Tôi chưa biết nên chọn gì”
```

Gap: runtime jumps from symptom labels to Đông-y state/service suggestions without recorded source, plain-language bridge, or scope boundary.

## J-02 — service uncertainty needs a safe route (`PROPOSED`)

```text
JOB: “Tôi chưa biết chọn dịch vụ nào.”
  ↓ FIRST QUESTION: “Tôi có phải tự chọn đúng ngay không?”
  ↓ SECOND QUESTION: “Tôi chỉ cần chia sẻ những gì?”
  ↓ TRUST QUESTION: “Ai sẽ đọc thông tin của tôi và họ sẽ làm gì tiếp?”
  ↓ DECISION QUESTION: “Tôi gửi yêu cầu hay nhắn Zalo trước?”
  ↓ ACTION: “Để Toplink tư vấn” / “Nhắn Zalo”
```

Strength: first-class booking state. Gap: callback/recipient is not verified and form submission is not configured.

## J-03 — visit uncertainty needs process proof (`PROPOSED`)

```text
JOB: “Tôi muốn biết một buổi sẽ diễn ra thế nào.”
  ↓ FIRST QUESTION: “Từ lúc đến nơi, tôi sẽ gặp ai và làm gì?”
  ↓ SECOND QUESTION: “Phần nào được hỏi trước, phần nào được thực hiện?”
  ↓ TRUST QUESTION: “Có thể dừng, đổi hướng hoặc nhận tư vấn khác khi không phù hợp không?”
  ↓ DECISION QUESTION: “Tôi có đủ thông tin để sắp xếp một buổi đầu không?”
  ↓ ACTION: “Xem quy trình thực tế” / “Trao đổi trước khi đặt lịch”
```

Gap: timeline/process is authored copy; no observed, staff-approved process or documentary evidence is available.

## J-04 — trust needs human and place proof (`UNVALIDATED`)

```text
JOB: “Tôi muốn biết nơi này có đáng tin không.”
  ↓ FIRST QUESTION: “Đây là nơi nào, ở đâu, và thông tin liên hệ có thật không?”
  ↓ SECOND QUESTION: “Ai thực hiện/cố vấn và họ được phép công bố điều gì?”
  ↓ TRUST QUESTION: “Hình, lời chứng thực, dịch vụ và giới hạn có nguồn/đồng ý không?”
  ↓ DECISION QUESTION: “Tôi có yên tâm để lại thông tin hoặc đến trao đổi không?”
  ↓ ACTION: “Xem cơ sở / đội ngũ đã xác minh” / “Liên hệ qua kênh thật”
```

Gap: contact/team/space/review surfaces are demo/mock, unknown, or visibly another brand; they cannot answer the trust question.

## J-05 — known intention needs a reliable handoff (`PROPOSED`)

```text
JOB: “Tôi biết mình muốn gì và muốn đặt lịch/liên hệ nhanh.”
  ↓ FIRST QUESTION: “Kênh nào phù hợp nhất để liên hệ?”
  ↓ SECOND QUESTION: “Tôi cần để lại những thông tin nào?”
  ↓ TRUST QUESTION: “Yêu cầu có thực sự đến được người tiếp nhận không?”
  ↓ DECISION QUESTION: “Khi nào và qua ai tôi nhận được phản hồi?”
  ↓ ACTION: “Gọi” / “Nhắn Zalo” / “Gửi yêu cầu đặt lịch”
```

Gap: only the UI flow is evidenced. The endpoint and human follow-up promise are unverified; the demo can signal success without sending a request.

## J-06 — domain terms need comprehension, not authority theatre (`UNVALIDATED`)

```text
JOB: “Tôi muốn hiểu một khái niệm Đông y bằng ngôn ngữ dễ hiểu.”
  ↓ FIRST QUESTION: “Từ này đang nói về điều gì trong trải nghiệm hằng ngày?”
  ↓ SECOND QUESTION: “Toplink dùng nó như một cách giải thích hay một khẳng định y khoa?”
  ↓ TRUST QUESTION: “Giới hạn, nguồn, và khi nào nên tìm tư vấn y khoa là gì?”
  ↓ DECISION QUESTION: “Thông tin này có giúp tôi chọn một cuộc trao đổi phù hợp không?”
  ↓ ACTION: “Đọc giải thích ngắn” / “Trao đổi với người tiếp nhận”
```

Gap: runtime supplies specialist framing but no approved explanation/provenance model. Triều Đông Y contributes language safety grammar only; it supplies no Toplink claim.
