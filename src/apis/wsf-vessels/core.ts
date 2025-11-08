/**
 * @fileoverview wsf-vessels API - Core fetch functions and types only
 *
 * This module provides exports for fetch functions and types only (no React hooks).
 * Use this for backend/server-side code to avoid React Query dependencies.
 */

export * from "./cacheFlushDate/cacheFlushDate.endpoints";
export * from "./cacheFlushDate/cacheFlushDate.fetch";
export * from "./vesselAccommodations/vesselAccommodations.fetch";
export * from "./vesselAccommodations/vesselAccommodations.input";
export * from "./vesselAccommodations/vesselAccommodations.output";
export * from "./vesselBasics/vesselBasics.fetch";
export * from "./vesselBasics/vesselBasics.input";
export * from "./vesselBasics/vesselBasics.output";
export * from "./vesselHistories/vesselHistories.fetch";
export * from "./vesselHistories/vesselHistories.input";
export * from "./vesselHistories/vesselHistories.output";
export * from "./vesselLocations/vesselLocations.fetch";
export * from "./vesselLocations/vesselLocations.input";
export * from "./vesselLocations/vesselLocations.output";
export * from "./vesselStats/vesselStats.fetch";
export * from "./vesselStats/vesselStats.input";
export * from "./vesselStats/vesselStats.output";
export * from "./vesselVerbose/vesselVerbose.fetch";
export * from "./vesselVerbose/vesselVerbose.input";
export * from "./vesselVerbose/vesselVerbose.output";
