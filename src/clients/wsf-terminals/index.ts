// ============================================================================
// API FUNCTIONS & SCHEMAS
// ============================================================================

// Cache management
export {
  getCacheFlushDateTerminals,
  useCacheFlushDateTerminals,
  type WsfCacheFlushDate as GetCacheFlushDateFaresTerminalsResponse,
  type WsfCacheFlushDateParams as GetCacheFlushDateFaresTerminalsParams,
  wsfCacheFlushDateParamsSchema as getCacheFlushDateFaresTerminalsParamsSchema,
} from "../../shared/caching/cacheFlushDate";

// ============================================================================
// ZOD SCHEMAS (New Implementation)
// ============================================================================

// Centralized schema exports
export * from "@/schemas/wsf-terminals";

// Cache flush date
export * from "@/schemas/shared/cacheFlushDate.zod";

// ============================================================================
// API FUNCTIONS
// ============================================================================

export * from "./terminalBasics";
export * from "./terminalBulletins";
export * from "./terminalLocations";
export * from "./terminalSailingSpace";
export * from "./terminalTransports";
export * from "./terminalVerbose";
export * from "./terminalWaitTimes";
