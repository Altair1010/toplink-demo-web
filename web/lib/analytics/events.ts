export const contactEventNames = [
  "contact_zalo_click",
  "contact_facebook_click",
  "contact_phone_click",
] as const;

export const contactPlacements = [
  "header",
  "service_detail",
  "article",
  "footer",
  "contact_page",
  "mobile_contact_surface",
] as const;

export type ContactEventName = (typeof contactEventNames)[number];
export type ContactPlacement = (typeof contactPlacements)[number];
export type ContactChannel = "zalo" | "facebook" | "phone";
export type ContactDestinationClass = "https_url" | "tel_uri";

export interface ContactEventInput {
  readonly event: ContactEventName;
  readonly channel: ContactChannel;
  readonly placement: ContactPlacement;
  readonly destinationClass: ContactDestinationClass;
}

export interface ContactAnalyticsEvent {
  readonly event: ContactEventName;
  readonly channel: ContactChannel;
  readonly placement: ContactPlacement;
  readonly destination_class: ContactDestinationClass;
}

export function createContactEvent(input: ContactEventInput): ContactAnalyticsEvent {
  return {
    event: input.event,
    channel: input.channel,
    placement: input.placement,
    destination_class: input.destinationClass,
  };
}
