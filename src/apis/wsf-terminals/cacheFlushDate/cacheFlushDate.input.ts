/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "zod";

/**
 * Schema for CacheFlushDate input parameters
 *
 * Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.
 */
export const cacheFlushDateSchema = z
  .object({})
  .describe(
    "Retrieves cache flush timestamp indicating when terminal data was last updated. Use to determine when cached terminal information should be invalidated and refreshed. Poll this endpoint periodically to detect when terminal data changes."
  );

export type TerminalsCacheFlushDateInput = z.infer<typeof cacheFlushDateSchema>;
