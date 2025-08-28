// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

// Cache management
export {
  getCacheFlushDateVessels,
  useCacheFlushDateVessels,
} from "../wsf/cacheFlushDate";
// Vessel accommodations
export * from "./vesselAccommodations";
// Basic vessel information
export * from "./vesselBasics";
// Vessel history
export * from "./vesselHistory";
// Real-time vessel locations
export * from "./vesselLocations";
// Vessel statistics
export * from "./vesselStats";
// Verbose vessel information
export * from "./vesselVerbose";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export {
  wsfCacheFlushDateParamsSchema as getCacheFlushDateParamsSchema,
  wsfCacheFlushDateSchema as vesselsCacheFlushDateSchema,
} from "../wsf/cacheFlushDate";
export {
  getVesselAccommodationsByIdParamsSchema,
  getVesselAccommodationsParamsSchema,
  vesselAccommodationArraySchema,
  vesselAccommodationSchema,
} from "./vesselAccommodations";
// Array schemas (from array endpoints)
export {
  getVesselBasicsByIdParamsSchema,
  getVesselBasicsParamsSchema,
  vesselBasicArraySchema,
  vesselBasicSchema,
  vesselClassSchema,
} from "./vesselBasics";
export {
  getVesselHistoryByVesselAndDateRangeParamsSchema,
  getVesselHistoryParamsSchema,
  vesselHistoryArraySchema,
  vesselHistorySchema,
} from "./vesselHistory";
export {
  getVesselLocationsByVesselIdParamsSchema,
  getVesselLocationsParamsSchema,
  vesselLocationArraySchema,
  vesselLocationSchema,
} from "./vesselLocations";
export {
  getVesselStatsByIdParamsSchema,
  getVesselStatsParamsSchema,
  vesselStatsArraySchema,
  vesselStatsSchema,
} from "./vesselStats";
export {
  getVesselVerboseByIdParamsSchema,
  getVesselVerboseParamsSchema,
  vesselVerboseArraySchema,
  vesselVerboseSchema,
} from "./vesselVerbose";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Note: Cache management is handled automatically via TanStack Query hooks
// No manual cache provider needed

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type { WsfCacheFlushDate as VesselsCacheFlushDate } from "../wsf/cacheFlushDate";
// Export types directly from their source files to avoid re-export chains
export type {
  GetVesselAccommodationsByIdParams,
  VesselAccommodation,
} from "./vesselAccommodations";
export type {
  GetVesselBasicsByIdParams,
  VesselBasic,
  VesselClass,
} from "./vesselBasics";
export type {
  GetVesselHistoryByVesselAndDateRangeParams,
  VesselHistory,
} from "./vesselHistory";
export type {
  GetVesselLocationsByVesselIdParams,
  VesselLocation,
} from "./vesselLocations";
export type {
  GetVesselStatsByIdParams,
  VesselStats,
} from "./vesselStats";
export type {
  GetVesselVerboseByIdParams,
  VesselVerbose,
} from "./vesselVerbose";
