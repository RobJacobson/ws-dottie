/**
 * @fileoverview WSF Vessels API - Clean exports for types and API definition
 *
 * This module provides a clean interface for the WSF Vessels API, exporting
 * all input/output types, core functions, React hooks, and main API definition.
 */

// Export the main API definition
export { wsfVesselsApi } from "./apiDefinition";

// Export all input/output types
export type { VesselsCacheFlushDateInput } from "./cacheFlushDate/cacheFlushDate.input";
export type { VesselsCacheFlushDate } from "./cacheFlushDate/cacheFlushDate.output";
// Export all core functions
export {
  getVesselAccommodations,
  getVesselAccommodationsByVesselId,
  getVesselBasics,
  getVesselBasicsByVesselId,
  getVesselHistories,
  getVesselHistoriesByVesselNameAndDateRange,
  getVesselLocations,
  getVesselLocationsByVesselId,
  getVesselStats,
  getVesselStatsByVesselId,
  getVesselsVerbose,
  getVesselsVerboseByVesselId,
} from "./core";
// Export all React hooks
export {
  useGetVesselAccommodations,
  useGetVesselAccommodationsByVesselId,
  useGetVesselBasics,
  useGetVesselBasicsByVesselId,
  useGetVesselHistories,
  useGetVesselHistoriesByVesselNameAndDateRange,
  useGetVesselLocations,
  useGetVesselLocationsByVesselId,
  useGetVesselStats,
  useGetVesselStatsByVesselId,
  useGetVesselsVerbose,
  useGetVesselsVerboseByVesselId,
} from "./hooks";
export type {
  VesselAccommodationsByIdInput,
  VesselAccommodationsInput,
} from "./vesselAccommodations/vesselAccommodations.input";
export type { VesselAccommodations } from "./vesselAccommodations/vesselAccommodations.output";
export type {
  VesselBasicsByIdInput,
  VesselBasicsInput,
} from "./vesselBasics/vesselBasics.input";
export type { VesselBasic } from "./vesselBasics/vesselBasics.output";
export type { GetVesselHistoryInput } from "./vesselHistories/vesselHistories.input";
export type { VesselHistoryResponse } from "./vesselHistories/vesselHistories.output";
export type { VesselLocationsInput } from "./vesselLocations/vesselLocations.input";
export type { VesselLocations } from "./vesselLocations/vesselLocations.output";
export type { VesselStatsInput } from "./vesselStats/vesselStats.input";
export type { VesselStats } from "./vesselStats/vesselStats.output";
export type { VesselVerbose } from "./vesselVerbose/vesselVerbose.output";
