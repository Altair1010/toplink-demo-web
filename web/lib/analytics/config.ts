export interface AnalyticsEnvironment {
  readonly TOPLINK_ANALYTICS_VENDOR_ALLOWED?: string;
  readonly TOPLINK_GA4_MEASUREMENT_ID?: string;
}

export interface AnalyticsVendorConfig {
  readonly ga4MeasurementId: string | undefined;
  readonly loadGa4: boolean;
}

const ga4MeasurementIdPattern = /^G-[A-Z0-9]{10}$/;

export function analyticsVendorConfig(environment: AnalyticsEnvironment): AnalyticsVendorConfig {
  const candidate = environment.TOPLINK_GA4_MEASUREMENT_ID?.trim().toUpperCase();
  const allowed = environment.TOPLINK_ANALYTICS_VENDOR_ALLOWED === "1";
  const ga4MeasurementId =
    allowed && candidate && ga4MeasurementIdPattern.test(candidate) ? candidate : undefined;
  return { ga4MeasurementId, loadGa4: Boolean(ga4MeasurementId) };
}
