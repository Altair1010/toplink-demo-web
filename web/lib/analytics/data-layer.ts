import type { ContactAnalyticsEvent } from "./events.ts";

type DataLayer = unknown[];

declare global {
  interface Window {
    dataLayer?: DataLayer;
  }
}

export function pushAnalyticsEvent(event: ContactAnalyticsEvent, target?: DataLayer): void {
  if (target) {
    target.push(event);
    return;
  }
  if (typeof window === "undefined") return;
  window.dataLayer ??= [];
  window.dataLayer.push(event);
}
