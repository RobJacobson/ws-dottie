import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack/validation";

/**
 * Cache flush date schema for WSF APIs
 *
 * Some of the retrieval operations in this service return data that changes infrequently.
 * As a result, you may wish to cache it in your application. Use the `/cacheflushdate`
 * operation to poll for changes. When the date returned from this operation is modified,
 * drop your application cache and retrieve fresh data from the service.
 */

/**
 * Schema for WSF Schedule and Terminals APIs cache flush date response.
 * Uses the "CacheFlushDate" field name.
 */
export const wsfScheduleCacheFlushDateSchema = z.object({
  /** If present, notes the date that certain service data was last changed (see description). */
  CacheFlushDate: zWsdotDate()
    .nullable()
    .describe(
      "If present, notes the date that certain service data was last changed (see description)."
    ),
});

/**
 * Schema for WSF Fares API cache flush date response.
 * Returns a direct nullable .NET timestamp string.
 */
export const wsfFaresCacheFlushDateSchema = zWsdotDate()
  .nullable()
  .describe(
    "If present, notes the date that certain service data was last changed."
  );

/**
 * Standardized schema for all WSF API cache flush date responses.
 * All WSF APIs (fares, schedule, terminals, vessels) return raw .NET timestamp strings.
 */
export const wsfStandardCacheFlushDateSchema = zWsdotDate()
  .nullable()
  .describe(
    "If present, notes the date that certain service data was last changed."
  );

/**
 * Union schema that can handle both WSF API cache flush date formats.
 * Use this when you need to validate responses from any WSF API.
 */
export const wsfCacheFlushDateSchema = z.union([
  wsfScheduleCacheFlushDateSchema,
  wsfFaresCacheFlushDateSchema,
]);

// Type exports
export type WsfScheduleCacheFlushDate = z.infer<
  typeof wsfScheduleCacheFlushDateSchema
>;
export type WsfFaresCacheFlushDate = z.infer<
  typeof wsfFaresCacheFlushDateSchema
>;
export type WsfStandardCacheFlushDate = z.infer<
  typeof wsfStandardCacheFlushDateSchema
>;
export type WsfCacheFlushDate = z.infer<typeof wsfCacheFlushDateSchema>;
