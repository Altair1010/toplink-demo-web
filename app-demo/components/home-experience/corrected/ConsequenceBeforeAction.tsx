import type { OrientationState } from "./orientation-state.mjs";

interface ConsequenceBeforeActionProps {
  state: OrientationState;
  onEdit: () => void;
  onRemove: () => void;
  onStop: () => void;
  onRestart: () => void;
}

export default function ConsequenceBeforeAction({
  state,
  onEdit,
  onRemove,
  onStop,
  onRestart,
}: ConsequenceBeforeActionProps) {
  if (state.stage === "stopped") {
    return (
      <div className="hh-orientation__stopped">
        <h3 className="hh-orientation__stopped-title" data-orientation-focus tabIndex={-1}>
          Anh/chị đã dừng tại đây.
        </h3>
        <p>
          Câu vừa viết đã được xoá khỏi trang. Không có thông tin nào được gửi đi và không có dịch
          vụ nào được chọn.
        </p>
        <button type="button" className="hh-orientation__action" onClick={onRestart}>
          Bắt đầu lại khi phù hợp
        </button>
      </div>
    );
  }

  if (state.stage !== "review") return null;

  const isUncertain = state.optionId === "not-sure";

  return (
    <div className="hh-orientation__consequence" aria-labelledby="hh-orientation-consequence-title">
      <div>
        <p className="hh-orientation__consequence-label">Điều sẽ xảy ra ở bước này</p>
        <h3 id="hh-orientation-consequence-title" className="hh-orientation__consequence-title">
          Chưa có thông tin nào được gửi đi.
        </h3>
      </div>
      <div className="hh-orientation__consequence-detail">
        <p>
          Phần vừa xem chỉ được giữ trong trang này để anh/chị đọc lại. Không có chẩn đoán, dịch vụ
          tự chọn, người nhận hay xác nhận nào được tạo ra.
        </p>
        {isUncertain && (
          <p className="hh-orientation__uncertain" role="status">
            Việc chưa biết nên bắt đầu từ đâu là một kết quả hợp lệ; anh/chị không cần đổi nó thành
            một lựa chọn dịch vụ.
          </p>
        )}
        <div className="hh-orientation__consequence-actions">
          <button type="button" className="hh-orientation__action is-inverse" onClick={onEdit}>
            Chỉnh lại câu chữ
          </button>
          <button
            type="button"
            className="hh-orientation__quiet-action is-inverse"
            onClick={onRemove}
          >
            Xoá và chọn lại
          </button>
          <button
            type="button"
            className="hh-orientation__quiet-action is-inverse"
            onClick={onStop}
          >
            Dừng tại đây
          </button>
        </div>
      </div>
    </div>
  );
}
