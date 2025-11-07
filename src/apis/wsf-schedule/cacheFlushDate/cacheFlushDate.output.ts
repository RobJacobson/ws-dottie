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
 */
export const cacheFlushDateScheduleSchema = zDotnetDate()
  .optional()
  .describe(
    "Cache flush timestamp indicating when any static endpoint data for the wsf-schedule API was last updated, as a UTC datetime. E.g., '2025-11-02T19:45:00.517Z' when schedule metadata was refreshed."
  );

export type CacheFlushDateSchedules = z.infer<
  typeof cacheFlushDateScheduleSchema
>;
