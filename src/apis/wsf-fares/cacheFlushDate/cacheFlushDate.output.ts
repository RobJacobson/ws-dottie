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
export const cacheFlushDateResponseSchema = zDotnetDate().describe(
  "Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service."
);

export type FaresCacheFlushDateResponse = z.infer<
  typeof cacheFlushDateResponseSchema
>;
