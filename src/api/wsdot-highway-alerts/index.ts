// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./eventCategories";
export * from "./highwayAlerts";
export * from "./mapAreas";
export * from "./searchHighwayAlerts";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export {
  eventCategoriesArraySchema,
  getEventCategoriesParamsSchema,
} from "./eventCategories";
export {
  getHighwayAlertByIdParamsSchema,
  getHighwayAlertsParamsSchema,
  getHighwayAlertsByMapAreaParamsSchema,
  getHighwayAlertsByRegionIdParamsSchema,
  highwayAlertArraySchema,
  highwayAlertSchema,
} from "./highwayAlerts";
export {
  getMapAreasParamsSchema,
  mapAreaSchema,
  mapAreasArraySchema,
} from "./mapAreas";
export { searchHighwayAlertsParamsSchema } from "./searchHighwayAlerts";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type {
  EventCategories,
  GetEventCategoriesParams,
} from "./eventCategories";
export type {
  GetHighwayAlertByIdParams,
  GetHighwayAlertsParams,
  GetHighwayAlertsByMapAreaParams,
  GetHighwayAlertsByRegionIdParams,
  HighwayAlert,
  HighwayAlertRoadwayLocation,
} from "./highwayAlerts";
export type { GetMapAreasParams, MapArea } from "./mapAreas";
export type { SearchHighwayAlertsParams } from "./searchHighwayAlerts";
