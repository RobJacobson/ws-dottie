/**
 * WSDOT Highway Alerts API - Complete Export Module
 *
 * This module provides access to Washington State Department of Transportation
 * highway alert data including traffic incidents, road closures, and construction alerts.
 *
 * Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
 * API Help: https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help
 */

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
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export {
  eventCategoriesArraySchema,
  getEventCategoriesParamsSchema,
} from "./getEventCategories";
export {
  getHighwayAlertByIdParamsSchema,
  highwayAlertSchema,
} from "./getHighwayAlertById";
export {
  getHighwayAlertsParamsSchema,
  highwayAlertArraySchema,
} from "./getHighwayAlerts";
export { getHighwayAlertsByMapAreaParamsSchema } from "./getHighwayAlertsByMapArea";
export { getHighwayAlertsByRegionIdParamsSchema } from "./getHighwayAlertsByRegionId";
export {
  getMapAreasParamsSchema,
  mapAreaSchema,
  mapAreasArraySchema,
} from "./getMapAreas";
export { searchHighwayAlertsParamsSchema } from "./searchHighwayAlerts";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  EventCategories,
  GetEventCategoriesParams,
} from "./getEventCategories";
export type {
  GetHighwayAlertByIdParams,
  HighwayAlert,
  HighwayAlertRoadwayLocation,
} from "./getHighwayAlertById";
export type { GetHighwayAlertsParams } from "./getHighwayAlerts";
export type { GetHighwayAlertsByMapAreaParams } from "./getHighwayAlertsByMapArea";
export type { GetHighwayAlertsByRegionIdParams } from "./getHighwayAlertsByRegionId";
export type { GetMapAreasParams, MapArea } from "./getMapAreas";
export type { SearchHighwayAlertsParams } from "./searchHighwayAlerts";
