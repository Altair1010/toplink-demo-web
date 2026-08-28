import type { H4RState } from "./prototype-state.mjs";
import styles from "./h4r-prototype.module.css";

const PHRASES = [
  "Tôi đang có một vùng khó chịu",
  "Tôi chưa biết nên chọn dịch vụ nào",
  "Tôi muốn hiểu thêm trước",
];

type ArrivalExchangeProps = {
  state: H4RState;
  onToggle: (phrase: string) => void;
  onRemove: (phrase: string) => void;
  onContinue: () => void;
};

export function ArrivalExchange({ state, onToggle, onRemove, onContinue }: ArrivalExchangeProps) {
  return (
    <section
      id="h4r-arrival"
      className={styles.arrival}
      aria-labelledby="h4r-arrival-question"
      data-exchange="arrival"
    >
      <div className={styles.arrivalQuestion}>
        <p className={styles.exchangeLabel}>Bắt đầu</p>
        <h1 id="h4r-arrival-question" tabIndex={-1}>
          Anh/chị đang muốn bắt đầu từ điều gì?
        </h1>
        <p className={styles.supportingCopy} data-blind-removable="true">
          Không cần tự kết luận tình trạng hay biết trước tên dịch vụ.
        </p>
      </div>

      <div className={styles.arrivalResponse} aria-label="Các cách bắt đầu">
        <p className={styles.responseLead}>
          Chọn một hoặc nhiều câu gần với điều anh/chị muốn nói.
        </p>
        <div className={styles.phraseChoices}>
          {PHRASES.map((phrase, index) => {
            const selected = state.phrases.includes(phrase);
            return (
              <button
                key={phrase}
                type="button"
                className={styles.phraseChoice}
                aria-pressed={selected}
                onClick={() => onToggle(phrase)}
              >
                <span aria-hidden="true">0{index + 1}</span>
                {phrase}
              </button>
            );
          })}
        </div>

        <div className={styles.editableSummary} aria-live="polite">
          <p>Điều anh/chị đã chọn</p>
          {state.phrases.length ? (
            <ul>
              {state.phrases.map((phrase) => (
                <li key={phrase}>
                  <span>{phrase}</span>
                  <button
                    type="button"
                    aria-label={`Bỏ câu: ${phrase}`}
                    onClick={() => onRemove(phrase)}
                  >
                    Bỏ câu này
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.emptySummary}>Chưa chọn câu nào. Anh/chị vẫn có thể dừng ở đây.</p>
          )}
        </div>

        <button
          type="button"
          className={styles.forwardAction}
          onClick={onContinue}
          disabled={!state.phrases.length}
        >
          <span className={styles.namedCopy}>Xem Toplink có thể làm gì lúc này</span>
          <span className={styles.blindCopy}>Xem hệ thống này có thể hỗ trợ gì lúc này</span>
        </button>
      </div>
    </section>
  );
}
