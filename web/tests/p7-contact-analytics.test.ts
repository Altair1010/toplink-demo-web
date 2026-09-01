import assert from "node:assert/strict";
import test from "node:test";

import { buildContactActions, resolveContactActions } from "../lib/contact/actions.ts";
import {
  contactEventNames,
  contactPlacements,
  createContactEvent,
} from "../lib/analytics/events.ts";
import { pushAnalyticsEvent } from "../lib/analytics/data-layer.ts";
import { analyticsVendorConfig } from "../lib/analytics/config.ts";
import type { ContentField, SiteSettings } from "../types/domain/index.ts";

function field<T>(value: T, status: ContentField<T>["status"] = "APPROVED"): ContentField<T> {
  return { value, owner: "BUSINESS", source: "__P7_INTEGRATION_TEST__", status };
}

function settings(overrides: Partial<SiteSettings> = {}): SiteSettings {
  return {
    public_display_name: field("Y Viện Toplink"),
    ...overrides,
  };
}

test("approved and valid contact facts become canonical actions", () => {
  const actions = buildContactActions(
    settings({
      zalo_destination: field("https://zalo.me/verified-channel"),
      facebook_destination: field("https://m.me/verified-page"),
      hotline: field("(024) 1234-5678"),
    }),
  );

  assert.deepEqual(
    actions.map(({ action, channel, event, href, destinationClass }) => ({
      action,
      channel,
      event,
      href,
      destinationClass,
    })),
    [
      {
        action: "contact_phone",
        channel: "phone",
        event: "contact_phone_click",
        href: "tel:02412345678",
        destinationClass: "tel_uri",
      },
      {
        action: "contact_zalo",
        channel: "zalo",
        event: "contact_zalo_click",
        href: "https://zalo.me/verified-channel",
        destinationClass: "https_url",
      },
      {
        action: "contact_facebook",
        channel: "facebook",
        event: "contact_facebook_click",
        href: "https://m.me/verified-page",
        destinationClass: "https_url",
      },
    ],
  );
});

test("pending, rejected and reference-only contact facts produce zero actions", () => {
  for (const status of ["PENDING", "REJECTED", "REFERENCE_ONLY"] as const) {
    assert.deepEqual(
      buildContactActions(
        settings({
          zalo_destination: field("https://zalo.me/not-public", status),
          facebook_destination: field("https://m.me/not-public", status),
          hotline: field("02412345678", status),
        }),
      ),
      [],
    );
  }
});

test("approved-looking unsafe or unknown destinations fail closed", () => {
  const actions = buildContactActions(
    settings({
      zalo_destination: field("javascript:alert(1)"),
      facebook_destination: field("https://facebook.com.evil.example/page"),
      hotline: field("call-us-now"),
    }),
  );
  assert.deepEqual(actions, []);
  assert.deepEqual(
    resolveContactActions(
      settings({
        zalo_destination: field("javascript:alert(1)"),
        facebook_destination: field("https://facebook.com.evil.example/page"),
        hotline: field("call-us-now"),
      }),
    ).findings,
    [
      { field: "hotline", code: "invalid_approved_destination" },
      { field: "zalo_destination", code: "invalid_approved_destination" },
      { field: "facebook_destination", code: "invalid_approved_destination" },
    ],
  );
});

test("contact analytics taxonomy is closed and payload contains exactly non-sensitive fields", () => {
  assert.deepEqual(contactEventNames, [
    "contact_zalo_click",
    "contact_facebook_click",
    "contact_phone_click",
  ]);
  assert.deepEqual(contactPlacements, [
    "header",
    "service_detail",
    "article",
    "footer",
    "contact_page",
    "mobile_contact_surface",
  ]);

  const payload = createContactEvent({
    event: "contact_zalo_click",
    channel: "zalo",
    placement: "service_detail",
    destinationClass: "https_url",
  });
  assert.deepEqual(payload, {
    event: "contact_zalo_click",
    channel: "zalo",
    placement: "service_detail",
    destination_class: "https_url",
  });
  assert.deepEqual(Object.keys(payload).sort(), [
    "channel",
    "destination_class",
    "event",
    "placement",
  ]);
  assert.equal(JSON.stringify(payload).includes("zalo.me"), false);
  assert.equal(JSON.stringify(payload).includes("024"), false);
});

test("first-party data layer push is synchronous and preserves the exact payload", () => {
  const dataLayer: unknown[] = [];
  const payload = createContactEvent({
    event: "contact_phone_click",
    channel: "phone",
    placement: "contact_page",
    destinationClass: "tel_uri",
  });
  pushAnalyticsEvent(payload, dataLayer);
  assert.deepEqual(dataLayer, [payload]);
});

test("third-party analytics stays disabled without explicit allow and valid GA4 configuration", () => {
  assert.deepEqual(analyticsVendorConfig({}), { ga4MeasurementId: undefined, loadGa4: false });
  assert.deepEqual(
    analyticsVendorConfig({
      TOPLINK_ANALYTICS_VENDOR_ALLOWED: "1",
      TOPLINK_GA4_MEASUREMENT_ID: "not-an-id",
    }),
    { ga4MeasurementId: undefined, loadGa4: false },
  );
  assert.deepEqual(
    analyticsVendorConfig({
      TOPLINK_ANALYTICS_VENDOR_ALLOWED: "1",
      TOPLINK_GA4_MEASUREMENT_ID: "G-ABC123DEF4",
    }),
    { ga4MeasurementId: "G-ABC123DEF4", loadGa4: true },
  );
});
