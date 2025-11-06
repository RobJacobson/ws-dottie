/**
 * @fileoverview WSF Schedule API Input Schemas for Cache Flush Date
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to cache flush date operations.
 */

import { z } from "@/shared/zod-openapi-init";

/**
 * Schema for CacheFlushDate input parameters
 *
 * Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.
 */
export const cacheFlushDateInputSchema = z
  .object({})
  .describe(
    "Retrieves cache flush timestamp indicating when schedule data was last updated. Use to determine when cached schedule information should be invalidated and refreshed. Poll this endpoint periodically to detect when schedule data changes."
  );

export type CacheFlushDateInput = z.infer<typeof cacheFlushDateInputSchema>;
