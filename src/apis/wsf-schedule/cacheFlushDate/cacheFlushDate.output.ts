/**
 * @fileoverview WSF Schedule API Output Schemas for Cache Flush Date
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API cache flush date operations.
 */

import type { z } from "zod";

import { zDotnetDate } from "@/apis/shared";

/**
 * Schema for CacheFlushDate - represents cache flush date information
 *
 * Some of the retrieval operations in this service return data that changes infrequently. As a result, you may wish to cache it in your application. Use the `/cacheflushdate` operation to poll for changes. When the date returned from this operation is modified, drop your application cache and retrieve fresh data from the service.
 */
export const cacheFlushDateSchema = zDotnetDate()
  .optional()
  .describe(
    "Cache flush timestamp indicating when schedule data was last updated, as a UTC datetime. E.g., '2025-11-02T19:45:00.517Z' when schedule metadata was refreshed. Use to determine when cached schedule information should be invalidated and refreshed. Poll this endpoint periodically to detect when schedule data changes."
  );

export type SchedulesCacheFlushDate = z.infer<typeof cacheFlushDateSchema>;
