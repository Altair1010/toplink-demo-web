import type { H4RState } from "./prototype-state.mjs";
import styles from "./h4r-prototype.module.css";

type ConsequenceExchangeProps = {
  state: H4RState;
  onEdit: () => void;
  onContinueLocal: () => void;
  onUncertain: () => void;
  onFailure: () => void;
  onRetry: () => void;
};

const STATE_COPY: Record<H4RState["stage"], { title: string; body: string }> = {
  idle: {
    title: "Chưa có câu nào để xem lại.",
    body: "Quay lại phần bắt đầu để chọn hoặc giữ nguyên sự chưa chắc chắn.",
  },
  oriented: {
    title: "Câu của anh/chị mới chỉ nằm trong trang này.",
    body: "Chưa có dữ liệu nào được gửi đi và chưa có dịch vụ nào được chọn.",
  },
  review: {
    title: "Thông tin này mới đang ở bước xem lại.",
    body: "Chưa có dữ liệu nào được gửi đi. Anh/chị có thể chỉnh lại hoặc vẫn để mọi thứ chưa chắc chắn.",
  },
  "local-only": {
    title: "Đã tiếp tục xem trong prototype — chỉ hiển thị tạm trong tab này.",
    body: "Tải lại hoặc đóng trang sẽ xóa lựa chọn. Không có yêu cầu, người nhận hay xác nhận đặt lịch nào được tạo.",
  },
  failure: {
    title: "Trạng thái lỗi minh họa trong prototype.",
    body: "Không có network request bị lỗi. Đây chỉ là mẫu để kiểm tra cách giải thích và khôi phục.",
  },
  retry: {
    title: "Trạng thái thử lại minh họa — không gửi dữ liệu.",
    body: "Nội dung vẫn được giữ để anh/chị xem lại; không có thao tác mạng nào đang chạy.",
  },
  uncertain: {
    title: "Anh/chị vẫn có thể chưa chắc.",
    body: "Các câu đã chọn vẫn ở đây để sửa hoặc bỏ. Không có áp lực phải chuyển sang đặt lịch.",
  },
};

export function ConsequenceExchange({
  state,
  onEdit,
  onContinueLocal,
  onUncertain,
  onFailure,
  onRetry,
}: ConsequenceExchangeProps) {
  const copy = STATE_COPY[state.stage];
  const reviewActionsEnabled = state.stage === "review";

  return (
    <section
      id="h4r-consequence"
      className={styles.consequence}
      aria-labelledby="h4r-consequence-question"
      data-exchange="consequence"
      data-stage={state.stage}
    >
      <header className={styles.consequenceQuestion}>
        <p className={styles.exchangeLabel}>Trước hành động</p>
        <h2 id="h4r-consequence-question" tabIndex={-1}>
          Nếu tiếp tục, điều gì thực sự xảy ra?
        </h2>
      </header>

      <div
        className={styles.stateResponse}
        role="status"
        aria-live="polite"
        tabIndex={-1}
        data-consequence-response="true"
      >
        <p className={styles.stateKicker}>Trạng thái hiện tại</p>
        <h3>{copy.title}</h3>
        <p>{copy.body}</p>

        {state.phrases.length > 0 && (
          <div className={styles.reviewedPhrases}>
            <span>Thông tin đang có</span>
            <ul>
              {state.phrases.map((phrase) => (
                <li key={phrase}>{phrase}</li>
              ))}
            </ul>
          </div>
        )}

        <dl className={styles.consequenceFacts}>
          <div>
            <dt>Thông tin được gửi</dt>
            <dd>Không</dd>
          </div>
          <div>
            <dt>Dịch vụ được chọn</dt>
            <dd>Không</dd>
          </div>
          <div>
            <dt>Có thể sửa</dt>
            <dd>Có</dd>
          </div>
        </dl>
      </div>

      <div
        className={styles.consequenceActions}
        aria-label="Các lựa chọn sau khi xem trạng thái"
        data-consequence-actions="true"
      >
        <button type="button" className={styles.quietAction} onClick={onEdit}>
          Chỉnh lại
        </button>
        {state.stage === "failure" ? (
          <button type="button" className={styles.forwardAction} onClick={onRetry}>
            Thử lại mẫu trạng thái
          </button>
        ) : (
          <button
            type="button"
            className={styles.forwardAction}
            onClick={onContinueLocal}
            disabled={!reviewActionsEnabled}
          >
            Tiếp tục xem
          </button>
        )}
        <button
          type="button"
          className={styles.quietAction}
          onClick={onUncertain}
          disabled={!reviewActionsEnabled}
        >
          Tôi vẫn chưa chắc
        </button>
        <button
          type="button"
          className={styles.specimenAction}
          onClick={onFailure}
          disabled={!reviewActionsEnabled}
          data-internal-specimen="true"
        >
          Nội bộ: xem mẫu lỗi / thử lại
        </button>
      </div>
    </section>
  );
}
