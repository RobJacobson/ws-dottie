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
    "Retrieves cache flush timestamp indicating when fares data was last updated. Use to determine when cached fare information should be invalidated and refreshed. Poll this endpoint periodically to detect when fare data changes."
  );

export type FaresCacheFlushDateInput = z.infer<typeof cacheFlushDateSchema>;
