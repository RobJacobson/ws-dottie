/**
 * @fileoverview Shared API schemas and utilities
 *
 * This module exports shared schemas and utilities used across multiple
 * WSDOT API endpoints.
 */

export { createCacheFlushDateEndpointGroup } from "@/shared/factories/createCacheFlushDateEndpoint";
export {
  type CacheFlushDateInput,
  type CacheFlushDateOutput,
  cacheFlushDateInputSchema,
  cacheFlushDateOutputSchema,
} from "./cacheFlushDate";
export {
  type RoadwayLocation,
  roadwayLocationSchema,
} from "./roadwayLocationSchema";
export { zDotnetDate } from "./zDotnetDateSchema";
export { zIsoDateString } from "./zIsoDateStringSchema";
