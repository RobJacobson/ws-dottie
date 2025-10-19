/**
 * @fileoverview Input schemas for WSF Fares API CacheFlushDate endpoint
 *
 * These schemas define the input parameters for WSF Fares API CacheFlushDate endpoint.
 * Note: AccessCode is handled separately and is not included in these schemas.
 */

import { z } from "zod";

/**
 * Input schema for CacheFlushDate endpoint
 *
 * Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.
 */
export const cacheFlushDateSchema = z
  .object({})
  .describe(
    "Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service."
  );

export type FaresCacheFlushDateInput = z.infer<typeof cacheFlushDateSchema>;
