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
  CacheFlushDateInput,
  GetVesselHistoryInput,
  VesselAccommodationsByIdInput,
  VesselAccommodationsInput,
  VesselBasicsByIdInput,
  VesselBasicsInput,
  VesselLocationsInput,
  VesselStatsInput,
} from "./original/inputSchemas.original";

// Export all output types
export type {
  CacheFlushDate,
  VesselAccommodations,
  VesselAccommodationsList,
  VesselBasic,
  VesselBasicDetailsList,
  VesselHistoryResponse,
  VesselLocations,
  VesselStats,
} from "./original/outputSchemas.original";
