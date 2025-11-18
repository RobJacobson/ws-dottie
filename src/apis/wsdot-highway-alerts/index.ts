/**
 * @fileoverview wsdot-highway-alerts API - Exports hooks, fetch functions, and types
 *
 * This module provides exports for all hooks, fetch functions, and types in the wsdot-highway-alerts API.
 */

// Export hooks
export { useMapAreas } from "./alertAreas/mapAreas";
// Re-export everything from core (fetch functions and types)
export * from "./core";
export { useEventCategories } from "./eventCategories/eventCategories";
export { useAlertById } from "./highwayAlerts/alertById";
export { useAlerts } from "./highwayAlerts/alerts";
export { useAlertsByMapArea } from "./highwayAlerts/alertsByMapArea";
export { useAlertsByRegionId } from "./highwayAlerts/alertsByRegionId";
export { useSearchAlerts } from "./highwayAlerts/searchAlerts";
