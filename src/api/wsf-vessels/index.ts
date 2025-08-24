/**
 * WSF Vessels API - Complete Export Module
 *
 * This module provides access to Washington State Ferries vessel data including
 * real-time locations, basic information, accommodations, statistics, and history.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

export * from "./getAllVesselHistories";
// Cache management
export * from "./getCacheFlushDateVessels";
// Vessel accommodations
export * from "./getVesselAccommodations";
export * from "./getVesselAccommodationsById";
// Basic vessel information
export * from "./getVesselBasics";
export * from "./getVesselBasicsById";
export * from "./getVesselHistoryByVesselAndDateRange";
// Real-time vessel locations
export * from "./getVesselLocations";
export * from "./getVesselLocationsByVesselId";
// Vessel statistics
export * from "./getVesselStats";
export * from "./getVesselStatsById";
// Verbose vessel information
export * from "./getVesselVerbose";
export * from "./getVesselVerboseById";

// ============================================================================
// SCHEMA RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export { getAllVesselHistoriesParamsSchema } from "./getAllVesselHistories";
export { vesselsCacheFlushDateSchema } from "./getCacheFlushDateVessels";
export { vesselAccommodationArraySchema } from "./getVesselAccommodations";
export { vesselAccommodationSchema } from "./getVesselAccommodationsById";
// Array schemas (from array endpoints)
export { vesselBasicArraySchema } from "./getVesselBasics";
// Core vessel schemas (from single-item endpoints for consistency)
export {
  vesselBasicSchema,
  vesselClassSchema,
} from "./getVesselBasicsById";
export {
  vesselHistoryArraySchema,
  vesselHistorySchema,
} from "./getVesselHistoryByVesselAndDateRange";
export { vesselLocationArraySchema } from "./getVesselLocations";
export { vesselLocationSchema } from "./getVesselLocationsByVesselId";
export { vesselStatsArraySchema } from "./getVesselStats";
export { vesselStatsSchema } from "./getVesselStatsById";
export {
  vesselVerboseArraySchema,
  vesselVerboseSchema,
} from "./getVesselVerbose";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Note: Cache management is now handled automatically via useQueryWithAutoUpdate
// No manual cache provider needed

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type { GetAllVesselHistoriesParams } from "./getAllVesselHistories";
export type { VesselsCacheFlushDate } from "./getCacheFlushDateVessels";
// Export types directly from their source files to avoid re-export chains
export type {
  GetVesselAccommodationsByIdParams,
  VesselAccommodation,
} from "./getVesselAccommodationsById";
export type {
  GetVesselBasicsByIdParams,
  VesselBasic,
  VesselClass,
} from "./getVesselBasicsById";
export type {
  GetVesselHistoryByVesselAndDateRangeParams,
  VesselHistory,
} from "./getVesselHistoryByVesselAndDateRange";
export type {
  GetVesselLocationsByVesselIdParams,
  VesselLocation,
} from "./getVesselLocationsByVesselId";
export type {
  GetVesselStatsByIdParams,
  VesselStats,
} from "./getVesselStatsById";
export type { VesselVerbose } from "./getVesselVerbose";
export type { GetVesselVerboseByIdParams } from "./getVesselVerboseById";
