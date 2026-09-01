import type {
  ContactChannel,
  ContactDestinationClass,
  ContactEventName,
} from "../analytics/events.ts";
import type { ContentField, SiteSettings } from "../../types/domain/index.ts";

export type ContactActionName = "contact_zalo" | "contact_facebook" | "contact_phone";

export interface ContactAction {
  readonly action: ContactActionName;
  readonly channel: ContactChannel;
  readonly event: ContactEventName;
  readonly href: string;
  readonly label: string;
  readonly detail: string;
  readonly destinationClass: ContactDestinationClass;
}

export interface ContactFinding {
  readonly field: "hotline" | "zalo_destination" | "facebook_destination";
  readonly code: "invalid_approved_destination";
}

export interface ContactResolution {
  readonly actions: readonly ContactAction[];
  readonly findings: readonly ContactFinding[];
}

const zaloHosts = new Set(["zalo.me", "chat.zalo.me", "oa.zalo.me"]);
const facebookHosts = new Set([
  "facebook.com",
  "www.facebook.com",
  "m.facebook.com",
  "m.me",
  "messenger.com",
  "www.messenger.com",
]);

function approvedString(field: ContentField<string | null> | undefined): string | undefined {
  if (field?.status !== "APPROVED" || typeof field.value !== "string") return undefined;
  const value = field.value.trim();
  return value || undefined;
}

function verifiedHttpsDestination(
  value: string,
  allowedHosts: ReadonlySet<string>,
): string | undefined {
  let url: URL;
  try {
    url = new URL(value);
  } catch {
    return undefined;
  }
  if (
    url.protocol !== "https:" ||
    url.username ||
    url.password ||
    url.port ||
    url.hash ||
    !allowedHosts.has(url.hostname.toLowerCase()) ||
    url.pathname === "/"
  ) {
    return undefined;
  }
  return url.href;
}

function verifiedPhoneDestination(value: string): string | undefined {
  if (!/^\+?[0-9() .-]+$/.test(value)) return undefined;
  const normalized = value.replace(/[() .-]/g, "");
  if (!/^\+?[0-9]+$/.test(normalized)) return undefined;
  const digits = normalized.replace(/^\+/, "");
  if (digits.length < 7 || digits.length > 15) return undefined;
  return `tel:${normalized}`;
}

export function resolveContactActions(settings: SiteSettings): ContactResolution {
  const actions: ContactAction[] = [];
  const findings: ContactFinding[] = [];
  const phone = approvedString(settings.hotline);
  const phoneHref = phone ? verifiedPhoneDestination(phone) : undefined;
  if (phone && phoneHref) {
    actions.push({
      action: "contact_phone",
      channel: "phone",
      event: "contact_phone_click",
      href: phoneHref,
      label: "Điện thoại",
      detail: phone,
      destinationClass: "tel_uri",
    });
  } else if (phone) {
    findings.push({ field: "hotline", code: "invalid_approved_destination" });
  }

  const zalo = approvedString(settings.zalo_destination);
  const zaloHref = zalo ? verifiedHttpsDestination(zalo, zaloHosts) : undefined;
  if (zaloHref) {
    actions.push({
      action: "contact_zalo",
      channel: "zalo",
      event: "contact_zalo_click",
      href: zaloHref,
      label: "Zalo",
      detail: "Mở kênh chính thức",
      destinationClass: "https_url",
    });
  } else if (zalo) {
    findings.push({ field: "zalo_destination", code: "invalid_approved_destination" });
  }

  const facebook = approvedString(settings.facebook_destination);
  const facebookHref = facebook ? verifiedHttpsDestination(facebook, facebookHosts) : undefined;
  if (facebookHref) {
    actions.push({
      action: "contact_facebook",
      channel: "facebook",
      event: "contact_facebook_click",
      href: facebookHref,
      label: "Facebook/Messenger",
      detail: "Mở kênh chính thức",
      destinationClass: "https_url",
    });
  } else if (facebook) {
    findings.push({ field: "facebook_destination", code: "invalid_approved_destination" });
  }
  return { actions, findings };
}

export function buildContactActions(settings: SiteSettings): readonly ContactAction[] {
  return resolveContactActions(settings).actions;
}
