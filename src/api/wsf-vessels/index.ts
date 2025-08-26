/**
 * WSF Vessels API - Complete Export Module
 *
 * This module provides access to Washington State Ferries vessel data including
 * real-time locations, basic information, accommodations, statistics, and history.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

// Cache management
export * from "./getCacheFlushDateVessels";
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

export { vesselsCacheFlushDateSchema } from "./getCacheFlushDateVessels";
export {
  vesselAccommodationArraySchema,
  vesselAccommodationSchema,
} from "./vesselAccommodations";
// Array schemas (from array endpoints)
export {
  vesselBasicArraySchema,
  vesselBasicSchema,
  vesselClassSchema,
} from "./vesselBasics";
export {
  vesselHistoryArraySchema,
  vesselHistorySchema,
  getAllVesselHistoriesParamsSchema,
} from "./vesselHistory";
export {
  vesselLocationArraySchema,
  vesselLocationSchema,
} from "./vesselLocations";
export { vesselStatsArraySchema, vesselStatsSchema } from "./vesselStats";
export {
  vesselVerboseArraySchema,
  vesselVerboseSchema,
} from "./vesselVerbose";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Note: Cache management is now handled automatically via useQueryWithAutoUpdate
// No manual cache provider needed

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type { VesselsCacheFlushDate } from "./getCacheFlushDateVessels";
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
