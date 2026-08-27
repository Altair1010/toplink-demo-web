"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";

type NoticeStatus = "success" | "error";
type NoticePayload = { status: NoticeStatus; message: string; detail?: string };
type ActiveNotice = NoticePayload & { id: string };
type NoticeApi = { show: (notice: NoticePayload) => void; dismiss: () => void };
const NoticeContext = createContext<NoticeApi | null>(null);
const TIMEOUT_MS = 7000;

export function NoticeProvider({ children }: { children: ReactNode }) {
  const [notice, setNotice] = useState<ActiveNotice | null>(null);
  const sequence = useRef(0);
  const dismiss = useCallback(() => setNotice(null), []);
  const show = useCallback((next: NoticePayload) => {
    sequence.current += 1;
    setNotice({ ...next, id: `notice-${sequence.current}` });
  }, []);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(dismiss, TIMEOUT_MS);
    return () => window.clearTimeout(timer);
  }, [dismiss, notice]);
  return (
    <NoticeContext.Provider value={{ show, dismiss }}>
      {children}
      <NoticeRegion notice={notice} onDismiss={dismiss} />
    </NoticeContext.Provider>
  );
}

export function useNotice() {
  const notice = useContext(NoticeContext);
  if (!notice) throw new Error("useNotice must be used within NoticeProvider");
  return notice;
}

function NoticeRegion({
  notice,
  onDismiss,
}: {
  notice: ActiveNotice | null;
  onDismiss: () => void;
}) {
  const titleId = useId();
  const detailId = useId();
  if (!notice) return null;
  const isError = notice.status === "error";
  return (
    <section
      className="toplink-notice-region"
      aria-live={isError ? "assertive" : "polite"}
      aria-atomic="true"
      aria-labelledby={titleId}
      aria-describedby={notice.detail ? detailId : undefined}
      role={isError ? "alert" : "status"}
    >
      <div className="toplink-notice" data-status={notice.status}>
        <div>
          <p id={titleId} className="font-semibold">
            {notice.message}
          </p>
          {notice.detail ? (
            <p id={detailId} className="mt-1 text-base">
              {notice.detail}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          className="toplink-notice-dismiss"
          onClick={onDismiss}
          aria-label="Đóng thông báo"
        >
          ×
        </button>
      </div>
    </section>
  );
}
