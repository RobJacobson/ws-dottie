import { z } from "@/shared/zod-openapi-init";

/**
 * CacheFlushDate input schema
 *
 * Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.
 */
export const cacheFlushDateInputSchema = z
  .object({})
  .strict()
  .describe(
    "Retrieves the cache flush timestamp indicating when vessel data was last updated, returning a UTC datetime. Use to determine when cached vessel information should be refreshed, enabling efficient cache invalidation for infrequently-changing vessel metadata."
  );

export type VesselsCacheFlushDateInput = z.infer<
  typeof cacheFlushDateInputSchema
>;
