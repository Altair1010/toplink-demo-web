import { TrackedContactLink } from "@/components/content/TrackedContactLink";
import type { ContactPlacement } from "@/lib/analytics/events";
import { buildContactActions } from "@/lib/contact/actions";
import type { SiteSettings } from "@/types/domain";

export function ContactDirectory({
  settings,
  placement,
}: {
  readonly settings: SiteSettings;
  readonly placement: ContactPlacement;
}) {
  const channels = buildContactActions(settings);

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
        <li key={channel.action}>
          <TrackedContactLink action={channel} placement={placement}>
            <strong>{channel.label}</strong>
            <span>{channel.detail}</span>
          </TrackedContactLink>
        </li>
      ))}
    </ul>
  );
}
