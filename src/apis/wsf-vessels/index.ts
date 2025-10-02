/**
 * @fileoverview WSF Vessels API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSF Vessels API, exporting
 * all input/output types and the main API definition.
 */

// Export the main API definition
export { wsfVesselsApi } from "./endpoints";

// Export all input types
export type {
  GetVesselHistoryInput,
  VesselAccommodationsByIdInput,
  VesselAccommodationsInput,
  VesselBasicsByIdInput,
  VesselBasicsInput,
  VesselLocationsInput,
  VesselStatsInput,
  VesselsCacheFlushDateInput,
} from "./original/inputSchemas.original";

// Export all output types
export type {
  VesselAccommodations,
  VesselAccommodationsList,
  VesselBasic,
  VesselBasicDetailsList,
  VesselHistoryResponse,
  VesselLocations,
  VesselStats,
  VesselsCacheFlushDate,
} from "./original/outputSchemas.original";
