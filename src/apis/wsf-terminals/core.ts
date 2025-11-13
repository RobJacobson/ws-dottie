/**
 * @fileoverview wsf-terminals API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

export {
  CacheFlushDateOutput as CacheFlushDateTerminals,
  CacheFlushDateInput as CacheFlushDateTerminalsInput,
} from "@/apis/shared/cacheFlushDate";
export { fetchCacheFlushDateTerminals } from "./cacheFlushDate/cacheFlushDate.fetch";
export * from "./terminalBasics/terminalBasics.fetch";
export * from "./terminalBasics/terminalBasics.input";
export * from "./terminalBasics/terminalBasics.output";
export * from "./terminalBulletins/terminalBulletins.fetch";
export * from "./terminalBulletins/terminalBulletins.input";
export * from "./terminalBulletins/terminalBulletins.output";
export * from "./terminalLocations/terminalLocations.fetch";
export * from "./terminalLocations/terminalLocations.input";
export * from "./terminalLocations/terminalLocations.output";
export * from "./terminalSailingSpace/terminalSailingSpace.fetch";
export * from "./terminalSailingSpace/terminalSailingSpace.input";
export * from "./terminalSailingSpace/terminalSailingSpace.output";
export * from "./terminalTransports/terminalTransports.fetch";
export * from "./terminalTransports/terminalTransports.input";
export * from "./terminalTransports/terminalTransports.output";
export * from "./terminalVerbose/terminalVerbose.fetch";
export * from "./terminalVerbose/terminalVerbose.input";
export * from "./terminalVerbose/terminalVerbose.output";
export * from "./terminalWaitTimes/terminalWaitTimes.fetch";
export * from "./terminalWaitTimes/terminalWaitTimes.input";
export * from "./terminalWaitTimes/terminalWaitTimes.output";
