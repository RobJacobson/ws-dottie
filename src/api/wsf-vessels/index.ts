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
  wsfCacheFlushDateSchema as vesselsCacheFlushDateSchema,
  wsfCacheFlushDateParamsSchema as getCacheFlushDateParamsSchema,
} from "../wsf/cacheFlushDate";
export {
  vesselAccommodationArraySchema,
  vesselAccommodationSchema,
  getVesselAccommodationsParamsSchema,
  getVesselAccommodationsByIdParamsSchema,
} from "./vesselAccommodations";
// Array schemas (from array endpoints)
export {
  vesselBasicArraySchema,
  vesselBasicSchema,
  vesselClassSchema,
  getVesselBasicsParamsSchema,
  getVesselBasicsByIdParamsSchema,
} from "./vesselBasics";
export {
  vesselHistoryArraySchema,
  vesselHistorySchema,
  getVesselHistoryParamsSchema,
  getVesselHistoryByVesselAndDateRangeParamsSchema,
  getAllVesselHistoriesParamsSchema,
} from "./vesselHistory";
export {
  vesselLocationArraySchema,
  vesselLocationSchema,
  getVesselLocationsParamsSchema,
  getVesselLocationsByVesselIdParamsSchema,
} from "./vesselLocations";
export {
  vesselStatsArraySchema,
  vesselStatsSchema,
  getVesselStatsParamsSchema,
  getVesselStatsByIdParamsSchema,
} from "./vesselStats";
export {
  vesselVerboseArraySchema,
  vesselVerboseSchema,
  getVesselVerboseParamsSchema,
  getVesselVerboseByIdParamsSchema,
} from "./vesselVerbose";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Note: Cache management is now handled automatically via useQueryWithAutoUpdate
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
  GetAllVesselHistoriesParams,
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
  VesselVerbose,
  GetVesselVerboseByIdParams,
} from "./vesselVerbose";
