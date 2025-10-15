/**
 * @fileoverview WSDOT Highway Alerts API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSDOT Highway Alerts API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
// Export individual resources for direct use
export {
  alertsResource,
  areasResource,
  eventCategoriesResource,
  wsdotHighwayAlertsApi,
} from "./endpoints";

// Export all input types
export type {
  GetAlertInput,
  GetAlertsByRegionIDInput,
  GetAlertsForMapAreaInput,
  GetAlertsInput,
  SearchAlertsInput,
} from "./alerts/alerts.input";
// Export all output types
export type {
  Alert,
  RoadwayLocation,
} from "./alerts/alerts.output";
