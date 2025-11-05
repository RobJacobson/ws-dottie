/**
 * @fileoverview WSDOT Highway Alerts API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Highway Alerts API, exporting
 * all input/output types, core functions, React hooks, and main API definition.
 */

// Export shared types
export type { RoadwayLocation } from "@/apis/shared";
export type { GetMapAreasInput } from "./alertAreas/alertAreas.input";
export type { Area } from "./alertAreas/alertAreas.output";
// Export the main API definition
// Export individual resources for direct use
export {
  alertAreasGroup,
  eventCategoriesGroup,
  highwayAlertsGroup,
  wsdotHighwayAlertsApi,
} from "./apiDefinition";
// Export all core functions
export {
  getAlertById,
  getAlerts,
  getAlertsByMapArea,
  getAlertsByRegionId,
  getEventCategories,
  getMapAreas,
  searchAlerts,
} from "./core";
export type { GetEventCategoriesInput } from "./eventCategories/eventCategories.input";
// Export all input types
export type {
  GetAlertInput,
  GetAlertsByRegionIDInput,
  GetAlertsForMapAreaInput,
  GetAlertsInput,
  SearchAlertsInput,
} from "./highwayAlerts/highwayAlerts.input";
// Export all output types
export type { Alert } from "./highwayAlerts/highwayAlerts.output";

// Export all React hooks
export {
  useGetAlertById,
  useGetAlerts,
  useGetAlertsByMapArea,
  useGetAlertsByRegionId,
  useSearchAlerts,
} from "./hooks";
