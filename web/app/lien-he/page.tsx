import { ContactDirectory } from "@/components/content/ContactDirectory";
import { Gateway } from "@/components/structural/Gateway";
import { getSiteSettings } from "@/lib/content";
import { buildContactActions } from "@/lib/contact/actions";
import { createStaticPageMetadata } from "@/lib/seo/metadata";
import { currentPublicSiteEnvironment } from "@/lib/seo/origin";
import { approvedValue } from "@/types/domain";

export async function generateMetadata() {
  const settings = await getSiteSettings();
  return createStaticPageMetadata(
    "/lien-he",
    currentPublicSiteEnvironment(),
    buildContactActions(settings).length > 0,
  );
}

export default async function ContactPage() {
  const settings = await getSiteSettings();
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
        <ContactDirectory settings={settings} placement="contact_page" />

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
