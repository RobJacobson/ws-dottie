/**
 * @fileoverview wsf-vessels API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

// Cache Flush Date
export type {
  CacheFlushDateInput as CacheFlushDateVesselsInput,
  CacheFlushDateOutput as CacheFlushDateVessels,
} from "@/apis/shared/cacheFlushDate";
export { fetchCacheFlushDateVessels } from "./cacheFlushDate/cacheFlushDateVessels";
export * from "./cacheFlushDate/shared/cacheFlushDate.input";
export * from "./cacheFlushDate/shared/cacheFlushDate.output";
export * from "./vesselAccommodations/shared/vesselAccommodations.input";
export * from "./vesselAccommodations/shared/vesselAccommodations.output";
// Vessel Accommodations
export { fetchVesselAccommodations } from "./vesselAccommodations/vesselAccommodations";
export { fetchVesselAccommodationsByVesselId } from "./vesselAccommodations/vesselAccommodationsByVesselId";
export * from "./vesselBasics/shared/vesselBasics.input";
export * from "./vesselBasics/shared/vesselBasics.output";
// Vessel Basics
export { fetchVesselBasics } from "./vesselBasics/vesselBasics";
export { fetchVesselBasicsByVesselId } from "./vesselBasics/vesselBasicsByVesselId";
export * from "./vesselHistories/shared/vesselHistories.input";
export * from "./vesselHistories/shared/vesselHistories.output";
// Vessel Histories
export { fetchVesselHistories } from "./vesselHistories/vesselHistories";
export { fetchVesselHistoriesByVesselNameAndDateRange } from "./vesselHistories/vesselHistoriesByVesselNameAndDateRange";
export * from "./vesselLocations/shared/vesselLocations.input";
export * from "./vesselLocations/shared/vesselLocations.output";
// Vessel Locations
export { fetchVesselLocations } from "./vesselLocations/vesselLocations";
export { fetchVesselLocationsByVesselId } from "./vesselLocations/vesselLocationsByVesselId";
export * from "./vesselStats/shared/vesselStats.input";
export * from "./vesselStats/shared/vesselStats.output";
// Vessel Stats
export { fetchVesselStats } from "./vesselStats/vesselStats";
export { fetchVesselStatsByVesselId } from "./vesselStats/vesselStatsByVesselId";
export * from "./vesselVerbose/shared/vesselVerbose.input";
export * from "./vesselVerbose/shared/vesselVerbose.output";
// Vessel Verbose
export { fetchVesselsVerbose } from "./vesselVerbose/vesselsVerbose";
export { fetchVesselsVerboseByVesselId } from "./vesselVerbose/vesselsVerboseById";
