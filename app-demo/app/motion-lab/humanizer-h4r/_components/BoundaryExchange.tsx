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
        <p className={styles.exchangeLabel}>Làm rõ giới hạn</p>
        <h2 id="h4r-boundary-question" tabIndex={-1}>
          <span className={styles.namedCopy}>
            Trước khi đi tiếp, Toplink có thể hỗ trợ gì và không làm gì?
          </span>
          <span className={styles.blindCopy}>
            Trước khi đi tiếp, hệ thống này có thể hỗ trợ gì và không làm gì?
          </span>
        </h2>
      </header>

      <div className={styles.boundaryResponse}>
        <div className={styles.canDo}>
          <p>Có thể</p>
          <h3>Giúp anh/chị xem lại lựa chọn và các hướng tiếp theo.</h3>
          <p className={styles.noInterpretation}>
            Câu đã chọn không được phân tích và không làm thay đổi kết quả dịch vụ.
          </p>
          <ul>
            <li>Giải thích phạm vi bằng lời dễ hiểu.</li>
            <li>Để anh/chị sửa, bỏ hoặc giữ nguyên sự chưa chắc chắn.</li>
            <li>Mở thêm thông tin nếu anh/chị chưa muốn đi tiếp.</li>
          </ul>
        </div>

        <aside className={styles.cannotDo} aria-label="Giới hạn của định hướng">
          <p>Không làm</p>
          <strong>Không chẩn đoán. Không tự chọn dịch vụ. Không gửi thông tin.</strong>
          <span>
            Đây là prototype định hướng cục bộ. Không có kết luận sức khỏe hay yêu cầu đặt lịch nào
            được tạo.
          </span>
        </aside>
      </div>

      <div className={styles.boundaryContinuation}>
        <details className={styles.learningBridge}>
          <summary>Tôi muốn hiểu thêm</summary>
          <p>
            Nhánh này chỉ thử vị trí của một giải thích đã được rà soát trong tương lai. H4R không
            đưa ra thuật ngữ, lời khuyên hay nội dung y khoa mới.
          </p>
        </details>
        <button
          type="button"
          className={styles.forwardAction}
          onClick={onContinue}
          disabled={!enabled}
        >
          Xem điều thực sự xảy ra nếu tiếp tục
        </button>
      </div>
    </section>
  );
}
