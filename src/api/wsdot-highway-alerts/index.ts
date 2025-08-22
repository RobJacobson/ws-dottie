// WSDOT Highway Alerts API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
// API Help: https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getEventCategories";
export * from "./getHighwayAlertById";
export * from "./getHighwayAlerts";
export * from "./getHighwayAlertsByMapArea";
export * from "./getHighwayAlertsByRegionId";
export * from "./getMapAreas";
export * from "./searchHighwayAlerts";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Note: No cache.ts file exists for this API

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  EventCategories,
  GetEventCategoriesParams,
} from "./getEventCategories";
export type { GetHighwayAlertByIdParams } from "./getHighwayAlertById";
export type {
  GetHighwayAlertsParams,
  HighwayAlert,
  HighwayAlertRoadwayLocation,
} from "./getHighwayAlerts";
export type { GetHighwayAlertsByMapAreaParams } from "./getHighwayAlertsByMapArea";
export type { GetHighwayAlertsByRegionIdParams } from "./getHighwayAlertsByRegionId";
export type { GetMapAreasParams, MapArea } from "./getMapAreas";
export type { SearchHighwayAlertsParams } from "./searchHighwayAlerts";

// ============================================================================
// QUERY HOOKS
// ============================================================================

export { useEventCategories } from "./getEventCategories";
export { useHighwayAlertById } from "./getHighwayAlertById";
export { useHighwayAlerts } from "./getHighwayAlerts";
export { useHighwayAlertsByMapArea } from "./getHighwayAlertsByMapArea";
export { useHighwayAlertsByRegionId } from "./getHighwayAlertsByRegionId";
export { useMapAreas } from "./getMapAreas";
export { useSearchHighwayAlerts } from "./searchHighwayAlerts";
