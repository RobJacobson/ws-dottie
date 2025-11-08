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
export * from "./cacheFlushDate/cacheFlushDate.endpoints";

// Vessel Accommodations schemas
export * from "./vesselAccommodations/vesselAccommodations.input";
export * from "./vesselAccommodations/vesselAccommodations.output";

// Vessel Basics schemas
export * from "./vesselBasics/vesselBasics.input";
export * from "./vesselBasics/vesselBasics.output";

// Vessel Histories schemas
export * from "./vesselHistories/vesselHistories.input";
export * from "./vesselHistories/vesselHistories.output";

// Vessel Locations schemas
export * from "./vesselLocations/vesselLocations.input";
export * from "./vesselLocations/vesselLocations.output";

// Vessel Stats schemas
export * from "./vesselStats/vesselStats.input";
export * from "./vesselStats/vesselStats.output";

// Vessel Verbose schemas
export * from "./vesselVerbose/vesselVerbose.input";
export * from "./vesselVerbose/vesselVerbose.output";
