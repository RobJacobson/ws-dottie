/**
 * @fileoverview Output schemas for WSF Fares API CacheFlushDate endpoint
 *
 * These schemas define the response structures for WSF Fares API CacheFlushDate endpoint.
 */

import type { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * Cache flush date response schema for GetCacheFlushDate endpoint
 *
 * Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.
 */
export const cacheFlushDateSchema = zDotnetDate().describe(
  "Cache flush timestamp indicating when fares data was last updated, as a UTC datetime. E.g., '2025-10-31T22:19:34.600Z' when fare metadata was refreshed. Use to determine when cached fare information should be invalidated and refreshed. Poll this endpoint periodically to detect when fare data changes."
);

export type FaresCacheFlushDate = z.infer<typeof cacheFlushDateSchema>;
