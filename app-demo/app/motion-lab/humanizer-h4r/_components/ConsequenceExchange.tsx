import type { H4RState } from "./prototype-state.mjs";
import styles from "./h4r-prototype.module.css";

type ConsequenceExchangeProps = {
  state: H4RState;
  onEdit: () => void;
  onContinueLocal: () => void;
  onUncertain: () => void;
  onFailure: () => void;
  onRetry: () => void;
  showSpecimenControls: boolean;
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
  showSpecimenControls,
}: ConsequenceExchangeProps) {
  const copy = STATE_COPY[state.stage];

  return (
    <section
      id="h4r-consequence"
      className={styles.consequence}
      aria-labelledby="h4r-consequence-question"
      data-exchange="consequence"
      data-stage={state.stage}
    >
      <header className={styles.consequenceQuestion}>
        <p className={styles.promptCue}>Trước khi anh/chị tiếp tục</p>
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
        <h3>{copy.title}</h3>
        <p>{copy.body}</p>

        {state.phrases.length > 0 && (
          <div className={styles.reviewedPhrases}>
            <span>Anh/chị đang xem lại</span>
            <ul>
              {state.phrases.map((phrase) => (
                <li key={phrase}>{phrase}</li>
              ))}
            </ul>
          </div>
        )}

        <p className={styles.stateClarification}>
          Chưa gửi dữ liệu, chưa chọn dịch vụ; anh/chị vẫn có thể sửa.
        </p>
      </div>

      <div
        className={styles.consequenceActions}
        aria-label="Các lựa chọn sau khi xem trạng thái"
        data-consequence-actions="true"
      >
        <button type="button" className={styles.quietAction} onClick={onEdit}>
          Quay lại chỉnh câu
        </button>
        {state.stage === "failure" ? (
          <button type="button" className={styles.forwardAction} onClick={onRetry}>
            Thử lại trạng thái minh họa
          </button>
        ) : state.stage === "review" ? (
          <button type="button" className={styles.forwardAction} onClick={onContinueLocal}>
            Tiếp tục xem trong trang này
          </button>
        ) : null}
        {state.stage === "review" && (
          <button type="button" className={styles.quietAction} onClick={onUncertain}>
            Tôi muốn dừng và vẫn chưa chắc
          </button>
        )}
        {showSpecimenControls && state.stage === "review" && (
          <button
            type="button"
            className={styles.specimenAction}
            onClick={onFailure}
            data-internal-specimen="true"
          >
            Nội bộ: xem mẫu lỗi / thử lại
          </button>
        )}
      </div>
    </section>
  );
}
