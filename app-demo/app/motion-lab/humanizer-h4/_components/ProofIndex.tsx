import styles from "./h4-prototype.module.css";

const proofSlots = [
  {
    id: "ED-03",
    type: "Nơi chốn",
    title: "Bằng chứng địa điểm Toplink",
    annotation: "[ED-03 — REAL TOPLINK PLACE EVIDENCE REQUIRED]",
    need: "Ảnh toàn cảnh đủ ngữ cảnh, xác nhận đúng địa điểm và quyền công bố.",
    forbidden: "Không dùng ảnh thương hiệu khác, ảnh stock hoặc ảnh không rõ provenance.",
  },
  {
    id: "ED-04",
    type: "Người / vai trò công khai",
    title: "Người thật và việc được phép công bố",
    annotation: "[ED-04 — PUBLIC ROLE / PERSON EVIDENCE REQUIRED]",
    need: "Chân dung trong bối cảnh làm việc, vai trò công khai và consent tương ứng.",
    forbidden: "Không bịa tên, chức danh, kinh nghiệm, credential hoặc lời dẫn.",
  },
  {
    id: "ED-07",
    type: "Quy trình / sự kiện vận hành",
    title: "Một việc thực sự diễn ra như thế nào",
    annotation: "[ED-07 — VERIFIED PROCESS RECORD REQUIRED]",
    need: "Một bước được quan sát hoặc phê duyệt, vai trò liên quan và giới hạn thay đổi.",
    forbidden: "Không biến ritual copy hoặc timeline demo thành lời hứa vận hành.",
  },
];

export function ProofIndex() {
  return (
    <section className={styles.proof} data-surface="proof" aria-labelledby="h4-proof-title">
      <header className={styles.proofHeader}>
        <p className={styles.recordLabel}>Chỉ mục bằng chứng · mở theo nhu cầu</p>
        <h2 id="h4-proof-title">Bằng chứng chưa có thì khoảng trống phải nói thật.</h2>
        <p>
          H4 thử cấu trúc cho bằng chứng tương lai, không thử làm khoảng trống trông như đã được xác
          minh. Vì vậy ba vị trí dưới đây vẫn là slot prototype.
        </p>
      </header>

      <div className={styles.proofLedger}>
        {proofSlots.map((slot, index) => {
          const evidenceSlot = (
            <div
              key={`${slot.id}-slot`}
              className={styles.evidenceSlot}
              aria-label={`${slot.type}: chưa có bằng chứng`}
            >
              <span>{slot.type}</span>
              <strong>Chưa có bằng chứng được xác minh</strong>
              <i aria-hidden="true" />
            </div>
          );
          const proofCopy = (
            <div className={styles.proofCopy}>
              <p className={styles.slotType}>{slot.id}</p>
              <h3>{slot.title}</h3>
              <p className={styles.missingNotice}>
                <strong>THIẾU BẰNG CHỨNG.</strong> Không có sự kiện, ảnh hoặc danh tính Toplink nào
                được trình bày như bằng chứng trong prototype này.
              </p>
              <p className={styles.devAnnotation}>
                <span>Nhãn nội bộ</span>
                <code>{slot.annotation}</code>
              </p>
              <details className={styles.proofDetails}>
                <summary>Slot này cần gì trước khi được điền?</summary>
                <div>
                  <p>
                    <strong>Cần:</strong> {slot.need}
                  </p>
                  <p>
                    <strong>Không thay bằng:</strong> {slot.forbidden}
                  </p>
                </div>
              </details>
            </div>
          );

          return (
            <article
              key={slot.id}
              className={index === 0 ? styles.proofRecordPrimary : styles.proofRecord}
            >
              {index === 2 ? (
                <>
                  {proofCopy}
                  {evidenceSlot}
                </>
              ) : (
                <>
                  {evidenceSlot}
                  {proofCopy}
                </>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
