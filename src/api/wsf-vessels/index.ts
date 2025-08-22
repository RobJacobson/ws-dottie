/**
 * WSF Vessels API - File-per-Endpoint Structure
 *
 * This module provides access to Washington State Ferries vessel data including
 * real-time locations, basic information, accommodations, statistics, and history.
 */

// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

// Vessel accommodations
export * from "./getVesselAccommodations";
export * from "./getVesselAccommodationsById";
// Basic vessel information
export * from "./getVesselBasics";
export * from "./getVesselBasicsById";
// Real-time vessel locations
export * from "./getVesselLocations";
export * from "./getVesselLocationsByVesselId";
// Vessel statistics
export * from "./getVesselStats";
export * from "./getVesselStatsById";

// Vessel history
export * from "./getVesselHistoryByVesselAndDateRange";
export * from "./getMultipleVesselHistories";
export * from "./getAllVesselHistories";

// Verbose vessel information
export * from "./getVesselVerbose";
export * from "./getVesselVerboseById";

// Cache management
export * from "./getCacheFlushDateVessels";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

export * from "./cache";

// ============================================================================
// TYPE RE-EXPORTS FOR CONVENIENCE
// ============================================================================

export type { VesselAccommodation } from "./getVesselAccommodations";
export type { GetVesselAccommodationsByIdParams } from "./getVesselAccommodationsById";
export type {
  VesselBasic,
  VesselClass,
} from "./getVesselBasics";
export type { GetVesselBasicsByIdParams } from "./getVesselBasicsById";
export type { VesselLocation } from "./getVesselLocations";
export type { GetVesselLocationsByVesselIdParams } from "./getVesselLocationsByVesselId";
export type { VesselStats } from "./getVesselStats";
export type { GetVesselStatsByIdParams } from "./getVesselStatsById";
export type { VesselHistory } from "./getVesselHistoryByVesselAndDateRange";
export type { GetVesselHistoryByVesselAndDateRangeParams } from "./getVesselHistoryByVesselAndDateRange";
export type { GetMultipleVesselHistoriesParams } from "./getMultipleVesselHistories";
export type { GetAllVesselHistoriesParams } from "./getAllVesselHistories";
export type { VesselVerbose } from "./getVesselVerbose";
export type { GetVesselVerboseByIdParams } from "./getVesselVerboseById";
export type { VesselsCacheFlushDate } from "./getCacheFlushDateVessels";
