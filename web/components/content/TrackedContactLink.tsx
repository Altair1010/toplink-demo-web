"use client";

import type { ReactNode } from "react";

import { pushAnalyticsEvent } from "@/lib/analytics/data-layer";
import { createContactEvent, type ContactPlacement } from "@/lib/analytics/events";
import type { ContactAction } from "@/lib/contact/actions";

export function TrackedContactLink({
  action,
  placement,
  children,
}: {
  readonly action: ContactAction;
  readonly placement: ContactPlacement;
  readonly children: ReactNode;
}) {
  return (
    <a
      href={action.href}
      data-contact-action={action.action}
      data-contact-placement={placement}
      onClick={() => {
        pushAnalyticsEvent(
          createContactEvent({
            event: action.event,
            channel: action.channel,
            placement,
            destinationClass: action.destinationClass,
          }),
        );
      }}
    >
      {children}
    </a>
  );
}
