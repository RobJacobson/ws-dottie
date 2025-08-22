/**
 * WSF Vessels API - File-per-Endpoint Structure
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
export * from "./getMultipleVesselHistories";
// Vessel accommodations
export * from "./getVesselAccommodations";
export * from "./getVesselAccommodationsById";
// Basic vessel information
export * from "./getVesselBasics";
export * from "./getVesselBasicsById";
// Vessel history
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
// SHARED UTILITIES
// ============================================================================

export * from "./cache";

// ============================================================================
// TYPE EXPORTS FROM SOURCE FILES
// ============================================================================

export type { GetAllVesselHistoriesParams } from "./getAllVesselHistories";
export type { VesselsCacheFlushDate } from "./getCacheFlushDateVessels";
export type { GetMultipleVesselHistoriesParams } from "./getMultipleVesselHistories";
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
