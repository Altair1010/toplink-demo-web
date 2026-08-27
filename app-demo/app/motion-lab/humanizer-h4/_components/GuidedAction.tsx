"use client";

import { useEffect, useRef } from "react";
import type { Dispatch } from "react";

import type { PrototypeEvent, PrototypeState } from "./prototype-state.mjs";
import styles from "./h4-prototype.module.css";

const phraseOptions = ["Cổ vai gáy đang căng", "Lưng eo khó chịu", "Khó ngủ"];

type GuidedActionProps = {
  state: PrototypeState;
  dispatch: Dispatch<PrototypeEvent>;
  unsureEntry: boolean;
  onChoosePhrase: () => void;
};

export function GuidedAction({ state, dispatch, unsureEntry, onChoosePhrase }: GuidedActionProps) {
  const phraseInputRef = useRef<HTMLInputElement>(null);
  const receiptRef = useRef<HTMLDivElement>(null);
  const previousStageRef = useRef(state.stage);

  useEffect(() => {
    if (previousStageRef.current === state.stage) return;

    if (state.stage === "request" && state.phrase) {
      phraseInputRef.current?.focus();
    } else if (state.stage !== "request") {
      receiptRef.current?.focus();
    }

    previousStageRef.current = state.stage;
  }, [state.phrase, state.stage]);

  const setPhrase = (phrase: string) => {
    onChoosePhrase();
    dispatch({ type: "setPhrase", phrase });
  };

  const chooseOther = () => {
    setPhrase("");
    phraseInputRef.current?.focus();
  };

  const resetAndFocusInput = () => {
    onChoosePhrase();
    dispatch({ type: "reset" });
    window.requestAnimationFrame(() => phraseInputRef.current?.focus());
  };

  return (
    <section
      className={styles.guided}
      data-surface="guided-action"
      data-stage={state.stage}
      aria-labelledby="h4-guided-title"
    >
      <div className={styles.decisionThreshold} aria-hidden="true">
        <span>HP-02 / HP-03</span>
        <strong>Một câu nói được giữ nguyên đến lúc rà soát.</strong>
      </div>

      <div className={styles.guidedRecord}>
        <header className={styles.guidedHeader}>
          <p className={styles.recordLabel}>Định hướng chia sẻ · bản rà soát hành động</p>
          <h2 id="h4-guided-title" tabIndex={-1}>
            Nói bằng một cụm từ quen thuộc.
          </h2>
          <p>
            Chọn một câu gần với điều anh/chị muốn trao đổi, hoặc sửa lại bằng lời của mình. Không
            có lựa chọn nào tự động dẫn tới một dịch vụ.
          </p>
        </header>

        {unsureEntry && state.stage === "request" && !state.phrase && (
          <p className={styles.unsureNotice} role="status">
            Anh/chị chưa cần chọn dịch vụ. Có thể bắt đầu bằng một cụm từ bên dưới hoặc tự viết một
            câu ngắn.
          </p>
        )}

        <div className={styles.orientationLayout}>
          <div className={styles.phrasePanel}>
            <fieldset disabled={state.stage !== "request"}>
              <legend>Cụm từ bắt đầu</legend>
              <div className={styles.phraseChoices}>
                {phraseOptions.map((phrase) => (
                  <button
                    key={phrase}
                    type="button"
                    className={styles.phraseChoice}
                    aria-pressed={state.phrase === phrase}
                    onClick={() => setPhrase(phrase)}
                  >
                    {phrase}
                  </button>
                ))}
                <button
                  type="button"
                  className={styles.phraseChoice}
                  aria-pressed={Boolean(state.phrase) && !phraseOptions.includes(state.phrase)}
                  onClick={chooseOther}
                >
                  Điều khác
                </button>
              </div>
              <label className={styles.editablePhrase}>
                <span>Hoặc sửa bằng lời của anh/chị</span>
                <input
                  ref={phraseInputRef}
                  value={state.phrase}
                  onChange={(event) => setPhrase(event.target.value)}
                  placeholder="Ví dụ: Tôi muốn trao đổi về…"
                  maxLength={90}
                  name="h4-orientation-phrase"
                  autoComplete="off"
                />
              </label>
              <p className={styles.privacyNote}>
                Prototype không lưu hoặc gửi nội dung này. Không nhập tên, số điện thoại hoặc thông
                tin nhận diện cá nhân.
              </p>
            </fieldset>
          </div>

          <div className={styles.boundaryPanel}>
            <p className={styles.slotType}>Giới hạn luôn hiển thị</p>
            <h3>Đây là phần chuẩn bị cho cuộc trao đổi.</h3>
            <p>Thông tin này không phải kết luận về tình trạng.</p>
            <ul>
              <li>Không sinh nhãn trạng thái hoặc kết luận.</li>
              <li>Không tự động chọn hay xếp hạng dịch vụ.</li>
              <li>Không khẳng định có người đang tiếp nhận.</li>
            </ul>
          </div>
        </div>
      </div>

      <div
        ref={receiptRef}
        className={styles.receipt}
        data-receipt-stage={state.stage}
        aria-label="Trạng thái hành động mẫu"
        aria-atomic="true"
        aria-live="polite"
        tabIndex={-1}
      >
        <ReceiptContent state={state} dispatch={dispatch} onReset={resetAndFocusInput} />
      </div>
    </section>
  );
}

function ReceiptContent({
  state,
  dispatch,
  onReset,
}: {
  state: PrototypeState;
  dispatch: Dispatch<PrototypeEvent>;
  onReset: () => void;
}) {
  if (state.stage === "request") {
    return (
      <>
        <ReceiptHeading label="YÊU CẦU MẪU" title="Chuẩn bị một câu để rà soát" />
        <p className={styles.summaryLine}>
          Anh/chị đang muốn trao đổi về: <strong>{state.phrase || "Chưa có nội dung"}</strong>
        </p>
        <p>Chỉ khi chọn “Xem bản rà soát”, prototype mới chuyển sang bước review cục bộ.</p>
        <div className={styles.receiptActions}>
          <button
            type="button"
            className={styles.primaryAction}
            disabled={!state.phrase.trim()}
            onClick={() => dispatch({ type: "review" })}
          >
            Xem bản rà soát
          </button>
          {state.phrase && (
            <button type="button" className={styles.textAction} onClick={onReset}>
              Bỏ cụm từ này
            </button>
          )}
        </div>
      </>
    );
  }

  if (state.stage === "review") {
    return (
      <>
        <ReceiptHeading label="RÀ SOÁT" title="Rà soát trước mọi hành động gửi" />
        <p className={styles.summaryLine}>
          Anh/chị đang muốn trao đổi về: <strong>{state.phrase}</strong>
        </p>
        <div className={styles.consequenceList}>
          <p>
            <span>Người/kênh nhận</span>
            <strong>THIẾU BẰNG CHỨNG VẬN HÀNH</strong>
          </p>
          <p>
            <span>Thời gian phản hồi</span>
            <strong>Chưa được xác minh</strong>
          </p>
          <p>
            <span>Trạng thái hiện tại</span>
            <strong>Chưa gửi</strong>
          </p>
        </div>
        <div className={styles.receiptActions}>
          <button
            type="button"
            className={styles.primaryAction}
            onClick={() => dispatch({ type: "showSending" })}
          >
            Xem trạng thái đang gửi (mẫu)
          </button>
          <button
            type="button"
            className={styles.secondaryAction}
            onClick={() => dispatch({ type: "edit" })}
          >
            Chỉnh lại cụm từ
          </button>
        </div>
      </>
    );
  }

  if (state.stage === "sending") {
    return (
      <>
        <ReceiptHeading label="ĐANG GỬI · TRẠNG THÁI MẪU" title="Đang gửi — trạng thái mẫu" />
        <p className={styles.prototypeWarning}>
          Không có dữ liệu nào được gửi. Đây chỉ là mẫu thử để kiểm tra cách diễn đạt trạng thái.
        </p>
        <p>Prototype không chạy timer, không gọi backend và không tự chuyển sang thành công.</p>
        <div className={styles.receiptActions}>
          <button
            type="button"
            className={styles.primaryAction}
            onClick={() => dispatch({ type: "showFailure" })}
          >
            Mô phỏng lỗi gửi
          </button>
          <button
            type="button"
            className={styles.secondaryAction}
            onClick={() => dispatch({ type: "showUncertainty" })}
          >
            Xem trạng thái chưa rõ
          </button>
        </div>
      </>
    );
  }

  if (state.stage === "failure") {
    return (
      <>
        <ReceiptHeading label="LỖI GỬI / THỬ LẠI" title="Yêu cầu mẫu chưa được gửi" />
        <p className={styles.prototypeWarning}>
          Không có xác nhận nào được tạo. Cụm từ vẫn ở trong trình duyệt để anh/chị thử lại hoặc
          chỉnh sửa.
        </p>
        <div className={styles.receiptActions}>
          <button
            type="button"
            className={styles.primaryAction}
            onClick={() => dispatch({ type: "retry" })}
          >
            Thử lại trạng thái mẫu
          </button>
          <button
            type="button"
            className={styles.secondaryAction}
            onClick={() => dispatch({ type: "showUncertainty" })}
          >
            Chuyển sang nhánh chưa rõ
          </button>
          <button
            type="button"
            className={styles.textAction}
            onClick={() => dispatch({ type: "edit" })}
          >
            Chỉnh lại cụm từ
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <ReceiptHeading
        label="CHƯA RÕ / CHUYỂN TIẾP CHO NGƯỜI"
        title="Chưa thể hứa một người tiếp nhận"
      />
      <p className={styles.prototypeWarning}>
        Người phụ trách, kênh và thời gian phản hồi vẫn thiếu bằng chứng vận hành. Prototype không
        chuyển anh/chị tới một người thật.
      </p>
      <p>Có thể quay lại chỉnh câu chia sẻ hoặc đặt lại toàn bộ mẫu thử.</p>
      <div className={styles.receiptActions}>
        <button
          type="button"
          className={styles.primaryAction}
          onClick={() => dispatch({ type: "edit" })}
        >
          Chỉnh lại cụm từ
        </button>
        <button type="button" className={styles.secondaryAction} onClick={onReset}>
          Bắt đầu lại prototype
        </button>
      </div>
    </>
  );
}

function ReceiptHeading({ label, title }: { label: string; title: string }) {
  return (
    <header className={styles.receiptHeading}>
      <span>{label}</span>
      <h3>{title}</h3>
    </header>
  );
}
