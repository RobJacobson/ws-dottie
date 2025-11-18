/**
 * @fileoverview wsf-terminals API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

// Re-export types from shared cache flush date
export {
  CacheFlushDateInput as CacheFlushDateTerminalsInput,
  CacheFlushDateOutput as CacheFlushDateTerminals,
} from "@/apis/shared/cacheFlushDate";

// Export fetch functions from individual endpoint files
export { fetchCacheFlushDateTerminals } from "./cacheFlushDate/cacheFlushDateTerminals";
// Export types from shared input/output files
export * from "./cacheFlushDate/shared/cacheFlushDate.input";
export * from "./cacheFlushDate/shared/cacheFlushDate.output";
export * from "./terminalBasics/shared/terminalBasics.input";
export * from "./terminalBasics/shared/terminalBasics.output";
export { fetchTerminalBasics } from "./terminalBasics/terminalBasics";
export { fetchTerminalBasicsByTerminalId } from "./terminalBasics/terminalBasicsByTerminalId";
export * from "./terminalBulletins/shared/terminalBulletins.input";
export * from "./terminalBulletins/shared/terminalBulletins.output";
export { fetchTerminalBulletins } from "./terminalBulletins/terminalBulletins";
export { fetchTerminalBulletinsByTerminalId } from "./terminalBulletins/terminalBulletinsByTerminalId";
export * from "./terminalLocations/shared/terminalLocations.input";
export * from "./terminalLocations/shared/terminalLocations.output";
export { fetchTerminalLocations } from "./terminalLocations/terminalLocations";
export { fetchTerminalLocationsByTerminalId } from "./terminalLocations/terminalLocationsByTerminalId";
export * from "./terminalSailingSpace/shared/terminalSailingSpace.input";
export * from "./terminalSailingSpace/shared/terminalSailingSpace.output";
export { fetchTerminalSailingSpace } from "./terminalSailingSpace/terminalSailingSpace";
export { fetchTerminalSailingSpaceByTerminalId } from "./terminalSailingSpace/terminalSailingSpaceByTerminalId";
export * from "./terminalTransports/shared/terminalTransports.input";
export * from "./terminalTransports/shared/terminalTransports.output";
export { fetchTerminalTransports } from "./terminalTransports/terminalTransports";
export { fetchTerminalTransportsByTerminalId } from "./terminalTransports/terminalTransportsByTerminalId";
export * from "./terminalVerbose/shared/terminalVerbose.input";
export * from "./terminalVerbose/shared/terminalVerbose.output";
export { fetchTerminalVerbose } from "./terminalVerbose/terminalVerbose";
export { fetchTerminalVerboseByTerminalId } from "./terminalVerbose/terminalVerboseByTerminalId";
export * from "./terminalWaitTimes/shared/terminalWaitTimes.input";
export * from "./terminalWaitTimes/shared/terminalWaitTimes.output";
export { fetchTerminalWaitTimes } from "./terminalWaitTimes/terminalWaitTimes";
export { fetchTerminalWaitTimesByTerminalId } from "./terminalWaitTimes/terminalWaitTimesByTerminalId";
