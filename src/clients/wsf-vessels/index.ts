// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

// Cache management
export {
  getCacheFlushDateVessels,
  useCacheFlushDateVessels,
} from "../../shared/caching/cacheFlushDate";

// ============================================================================
// NEW ZOD SCHEMAS (PRD Implementation)
// ============================================================================

// Centralized schema exports
export * from "@/schemas/wsf-vessels";

// ============================================================================
// API FUNCTIONS
// ============================================================================

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
// SCHEMAS
// ============================================================================

export {
  wsfCacheFlushDateParamsSchema as getCacheFlushDateParamsSchema,
  wsfCacheFlushDateSchema as vesselsCacheFlushDateSchema,
} from "../../shared/caching/cacheFlushDate";

// ============================================================================
// SHARED UTILITIES
// ============================================================================

// Note: Cache management is handled automatically via TanStack Query hooks
// No manual cache provider needed

// ============================================================================
// TYPES
// ============================================================================

export type { WsfCacheFlushDate as VesselsCacheFlushDate } from "../../shared/caching/cacheFlushDate";
