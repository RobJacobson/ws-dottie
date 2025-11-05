/**
 * @fileoverview WSDOT Highway Alerts API - Clean exports for types and API definition
 *
 * This module provides a clean interface for WSDOT Highway Alerts API, exporting
 * all input/output types, core functions, and React hooks.
 */

// Export shared types
export type { RoadwayLocation } from "@/apis/shared";
export type { AlertAreasInput } from "./alertAreas/alertAreas.input";
export type { Area } from "./alertAreas/alertAreas.output";
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
export type { EventCategoriesInput } from "./eventCategories/eventCategories.input";
// Export all input types
export type {
  HighwayAlertInput,
  HighwayAlertsByMapAreaInput,
  HighwayAlertsByRegionIDInput,
  HighwayAlertsInput,
  HighwayAlertsSearchInput,
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
