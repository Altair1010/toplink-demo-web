import styles from "./h4r-prototype.module.css";

type BoundaryExchangeProps = {
  enabled: boolean;
  onContinue: () => void;
};

export function BoundaryExchange({ enabled, onContinue }: BoundaryExchangeProps) {
  return (
    <section
      id="h4r-boundary"
      className={styles.boundary}
      aria-labelledby="h4r-boundary-question"
      data-exchange="boundary"
    >
      <header className={styles.boundaryQuestion}>
        <p className={styles.promptCue}>Điều cần nói rõ trước</p>
        <h2 id="h4r-boundary-question" tabIndex={-1}>
          <span className={styles.namedCopy}>Ở bước này, Toplink có thể hỗ trợ đến đâu?</span>
          <span className={styles.blindCopy}>Ở bước này, nơi này có thể hỗ trợ đến đâu?</span>
        </h2>
      </header>

      <div className={styles.boundaryResponse}>
        <div className={styles.canDo}>
          <p className={styles.acknowledgement}>
            Tôi chỉ giữ lại đúng câu anh/chị đã chọn để cùng xem bước tiếp theo.
          </p>
          <h3>Giúp anh/chị xem lại lựa chọn và các hướng tiếp theo.</h3>
          <p className={styles.noInterpretation}>
            Câu đó không được phân tích thành tình trạng sức khỏe và không dùng để chọn dịch vụ.
          </p>
          <p className={styles.boundarySupport}>
            Nếu chưa muốn đi tiếp, anh/chị có thể sửa, bỏ câu, giữ sự chưa chắc chắn hoặc mở thêm
            phần giải thích.
          </p>
        </div>

        <aside className={styles.cannotDo} aria-label="Giới hạn của định hướng">
          <p>Điều này không có nghĩa là</p>
          <strong>đã có chẩn đoán, đã chọn dịch vụ hay đã gửi thông tin.</strong>
          <span>Anh/chị vẫn có thể sửa, bỏ câu đã chọn hoặc để mọi thứ chưa chắc chắn.</span>
        </aside>
      </div>

      <div className={styles.boundaryContinuation}>
        <details className={styles.learningBridge}>
          <summary>Tôi muốn hiểu thêm trước</summary>
          <p>
            Đây chỉ là chỗ dành cho một giải thích đã được rà soát trong tương lai. Prototype không
            đưa ra thuật ngữ, lời khuyên hay nội dung y khoa mới.
          </p>
        </details>
        <button
          type="button"
          className={styles.forwardAction}
          onClick={onContinue}
          disabled={!enabled}
        >
          Xem trước điều xảy ra nếu tiếp tục
        </button>
      </div>
    </section>
  );
}
