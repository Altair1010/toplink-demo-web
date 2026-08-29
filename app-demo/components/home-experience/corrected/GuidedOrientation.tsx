import type { OrientationOptionId, OrientationState } from "./orientation-state.mjs";
import { MAX_ORIENTATION_LENGTH, ORIENTATION_OPTIONS } from "./orientation-state.mjs";

interface GuidedOrientationProps {
  state: OrientationState;
  onSelect: (optionId: OrientationOptionId) => void;
  onWrite: (summary: string) => void;
  onReview: () => void;
  onRemove: () => void;
}

export default function GuidedOrientation({
  state,
  onSelect,
  onWrite,
  onReview,
  onRemove,
}: GuidedOrientationProps) {
  if (state.stage === "review") {
    return (
      <div className="hh-orientation__review" aria-labelledby="hh-orientation-review-title">
        <p className="hh-orientation__review-label">Câu anh/chị muốn giữ lại</p>
        <h3
          id="hh-orientation-review-title"
          className="hh-orientation__review-summary"
          data-orientation-focus
          tabIndex={-1}
        >
          “{state.summary}”
        </h3>
      </div>
    );
  }

  if (state.stage === "stopped") return null;

  const isEditing = state.stage === "editing";

  return (
    <div className={`hh-orientation__guide${isEditing ? " is-editing" : ""}`}>
      <fieldset className="hh-orientation__choices">
        <legend className="hh-orientation__choices-legend">Chọn một cách bắt đầu</legend>
        <p className="hh-orientation__choices-hint">Không có lựa chọn nào là câu trả lời y khoa.</p>
        <div className="hh-orientation__choice-list">
          {ORIENTATION_OPTIONS.map((option, index) => (
            <button
              key={option.id}
              type="button"
              className="hh-orientation__choice"
              data-orientation-focus={state.stage === "idle" && index === 0 ? "" : undefined}
              aria-pressed={state.optionId === option.id}
              onClick={() => onSelect(option.id)}
            >
              <span className="hh-orientation__choice-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </fieldset>

      {isEditing && (
        <div className="hh-orientation__editor">
          <label htmlFor="hh-orientation-summary" className="hh-orientation__editor-label">
            Sửa lại bằng đúng lời anh/chị muốn nói
          </label>
          <textarea
            id="hh-orientation-summary"
            className="hh-orientation__textarea"
            value={state.summary}
            onChange={(event) => onWrite(event.target.value)}
            aria-describedby="hh-orientation-count hh-orientation-error"
            aria-invalid={Boolean(state.error)}
            data-orientation-focus
            rows={5}
          />
          <div className="hh-orientation__editor-meta">
            <span id="hh-orientation-count">
              {state.summary.length}/{MAX_ORIENTATION_LENGTH} ký tự
            </span>
            {state.error && (
              <span id="hh-orientation-error" className="hh-orientation__error" role="alert">
                {state.error}
              </span>
            )}
          </div>
          <div className="hh-orientation__editor-actions">
            <button type="button" className="hh-orientation__action" onClick={onReview}>
              Xem lại câu này
            </button>
            <button type="button" className="hh-orientation__quiet-action" onClick={onRemove}>
              Bỏ lựa chọn
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
