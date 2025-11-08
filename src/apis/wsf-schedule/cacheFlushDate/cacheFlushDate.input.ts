/**
 * @fileoverview WSF Schedule API Input Schemas for Cache Flush Date
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to cache flush date operations.
 */

import { z } from "@/shared/zod-openapi-init";

/**
 * Schema for CacheFlushDate input parameters
 */
export const cacheFlushDateScheduleInputSchema = z
  .object({})
  .describe(
    "Retrieves cache flush timestamp indicating when schedule data was last updated. Use to determine when cached schedule information should be invalidated and refreshed."
  );

export type CacheFlushDateScheduleInput = z.infer<
  typeof cacheFlushDateScheduleInputSchema
>;
