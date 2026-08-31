import { approvedValue, type SiteSettings } from "@/types/domain";

export function ContactDirectory({ settings }: { settings: SiteSettings }) {
  const hotline = approvedValue(settings.hotline);
  const zalo = approvedValue(settings.zalo_destination);
  const facebook = approvedValue(settings.facebook_destination);
  const channels = [
    hotline ? { label: "Điện thoại", href: `tel:${hotline}`, detail: hotline } : null,
    zalo ? { label: "Zalo", href: zalo, detail: "Mở kênh chính thức" } : null,
    facebook ? { label: "Facebook/Messenger", href: facebook, detail: "Mở kênh chính thức" } : null,
  ].filter((item): item is NonNullable<typeof item> => Boolean(item));

  if (channels.length === 0) {
    return (
      <div className="pending-directory" role="status">
        <p>Các kênh Zalo, Facebook/Messenger và điện thoại đang chờ điểm đến được xác minh.</p>
        <p>Không có nút hoặc đường dẫn giả được hiển thị.</p>
      </div>
    );
  }

  return (
    <ul className="contact-directory">
      {channels.map((channel) => (
        <li key={channel.label}>
          <a href={channel.href}>
            <strong>{channel.label}</strong>
            <span>{channel.detail}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
