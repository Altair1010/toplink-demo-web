import type { Metadata } from "next";

import { ContactDirectory } from "@/components/content/ContactDirectory";
import { Gateway } from "@/components/structural/Gateway";
import { getSiteSettings } from "@/lib/content";
import { approvedValue } from "@/types/domain";

export const metadata: Metadata = { title: "Liên hệ" };

export default function ContactPage() {
  const settings = getSiteSettings();
  const address = approvedValue(settings.address);
  const hours = approvedValue(settings.opening_hours);

  return (
    <main id="main">
      <Gateway
        variant="utility"
        eyebrow="Utility hall"
        title="Liên hệ qua điểm đến đã xác minh"
        lead="Trang này không có form và không lưu dữ liệu. Chỉ kênh chính thức được phê duyệt mới trở thành hành động."
      />
      <section className="utility-hall" aria-labelledby="contact-directory-title">
        <p className="chapter-mark">Verified channel directory</p>
        <h2 id="contact-directory-title">Kênh liên hệ</h2>
        <ContactDirectory settings={settings} />

        {address || hours ? (
          <dl className="definition-ledger">
            {address ? (
              <div>
                <dt>Địa chỉ</dt>
                <dd>{address}</dd>
              </div>
            ) : null}
            {hours ? (
              <div>
                <dt>Giờ mở cửa</dt>
                <dd>{hours}</dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        <aside className="evidence-note">
          <strong>Quyền riêng tư</strong>
          <p>
            Website không nhận form, không hứa thời gian phản hồi và không tạo trạng thái gửi giả.
          </p>
        </aside>
      </section>
    </main>
  );
}
