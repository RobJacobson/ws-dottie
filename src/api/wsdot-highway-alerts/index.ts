// WSDOT Highway Alerts API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
// API Help: https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getHighwayAlertById";
export * from "./getHighwayAlerts";
export * from "./getHighwayAlertsByMapArea";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Note: No cache.ts file exists for this API

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type { GetHighwayAlertByIdParams } from "./getHighwayAlertById";
export type {
  GetHighwayAlertsParams,
  HighwayAlert,
  HighwayAlertRoadwayLocation,
} from "./getHighwayAlerts";
export type { GetHighwayAlertsByMapAreaParams } from "./getHighwayAlertsByMapArea";

// ============================================================================
// QUERY HOOKS
// ============================================================================

export { useHighwayAlertById } from "./getHighwayAlertById";
export { useHighwayAlerts } from "./getHighwayAlerts";
export { useHighwayAlertsByMapArea } from "./getHighwayAlertsByMapArea";
