/**
 * @fileoverview wsf-vessels API - Zod Schema Exports
 *
 * This module provides exports for all Zod schemas used in the wsf-vessels API.
 * Import these schemas when you need runtime validation in development or testing.
 *
 * @example
 * ```typescript
 * import { vesselLocationSchema, vesselLocationsInputSchema } from 'ws-dottie/wsf-vessels/schemas';
 *
 * // Validate input
 * const validatedInput = vesselLocationsInputSchema.parse(params);
 *
 * // Validate output
 * const validatedOutput = vesselLocationSchema.parse(data);
 * ```
 */

// Cache Flush Date schemas
export * from "./cacheFlushDate/shared/cacheFlushDate.input";
export * from "./cacheFlushDate/shared/cacheFlushDate.output";

// Vessel Accommodations schemas
export * from "./vesselAccommodations/shared/vesselAccommodations.input";
export * from "./vesselAccommodations/shared/vesselAccommodations.output";

// Vessel Basics schemas
export * from "./vesselBasics/shared/vesselBasics.input";
export * from "./vesselBasics/shared/vesselBasics.output";

// Vessel Histories schemas
export * from "./vesselHistories/shared/vesselHistories.input";
export * from "./vesselHistories/shared/vesselHistories.output";

// Vessel Locations schemas
export * from "./vesselLocations/shared/vesselLocations.input";
export * from "./vesselLocations/shared/vesselLocations.output";

// Vessel Stats schemas
export * from "./vesselStats/shared/vesselStats.input";
export * from "./vesselStats/shared/vesselStats.output";

// Vessel Verbose schemas
export * from "./vesselVerbose/shared/vesselVerbose.input";
export * from "./vesselVerbose/shared/vesselVerbose.output";
