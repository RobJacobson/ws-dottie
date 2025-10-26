/**
 * @fileoverview WSDOT Highway Alerts API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Highway Alerts API, exporting
 * all input/output types and the main API definition.
 */

// Export shared types
export type { RoadwayLocation } from "@/apis/shared";

// Export all input types
export type {
  GetAlertInput,
  GetAlertsByRegionIDInput,
  GetAlertsForMapAreaInput,
  GetAlertsInput,
  SearchAlertsInput,
} from "./alerts/alerts.input";
// Export all output types
export type { Alert } from "./alerts/alerts.output";
// Export the main API definition
// Export individual resources for direct use
export {
  alertsGroup,
  areasGroup,
  eventCategoriesGroup,
  wsdotHighwayAlertsApi,
} from "./apiDefinition";
