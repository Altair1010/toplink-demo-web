import styles from "./h4-prototype.module.css";

type HeroCoverProps = {
  onShare: () => void;
  onUnsure: () => void;
};

export function HeroCover({ onShare, onUnsure }: HeroCoverProps) {
  return (
    <section className={styles.hero} data-surface="hero" aria-labelledby="h4-hero-title">
      <div className={styles.warmThreshold} aria-hidden="true">
        <span>H4 / bản ghi mở đầu</span>
        <strong>Mở lời trước khi chọn</strong>
        <i />
      </div>

      <div className={styles.heroRecord}>
        <p className={styles.recordLabel}>Bản ghi mở đầu · mục đích có giới hạn</p>
        <h1 id="h4-hero-title">Anh/chị có thể bắt đầu từ điều đang khó chịu.</h1>
        <p className={styles.heroLead}>Không cần tự kết luận hay chọn đúng dịch vụ ngay từ đầu.</p>
        <div className={styles.heroBoundary}>
          <span aria-hidden="true">—</span>
          <p>
            Prototype này chỉ thử cách định hướng và làm rõ bước tiếp theo. Không có tư vấn, chẩn
            đoán hay yêu cầu đặt lịch nào được tạo.
          </p>
        </div>
        <div className={styles.actionRow} aria-label="Cách bắt đầu">
          <button className={styles.primaryAction} type="button" onClick={onShare}>
            Chia sẻ tình trạng
          </button>
          <button className={styles.secondaryAction} type="button" onClick={onUnsure}>
            Tôi chưa biết nên chọn gì
          </button>
        </div>
        <dl className={styles.coverFacts} aria-label="Giới hạn của bản ghi mở đầu">
          <div>
            <dt>Bắt đầu từ</dt>
            <dd>Lời đời thường</dd>
          </div>
          <div>
            <dt>Không tạo ra</dt>
            <dd>Kết luận tình trạng</dd>
          </div>
          <div>
            <dt>Hậu quả</dt>
            <dd>Chỉ mở bản rà soát mẫu</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
