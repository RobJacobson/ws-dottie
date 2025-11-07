/**
 * @fileoverview Output schemas for WSF Fares API CacheFlushDate endpoint
 *
 * These schemas define the response structures for WSF Fares API CacheFlushDate endpoint.
 */

import type { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * Cache flush date response schema for GetCacheFlushDate endpoint
 */
export const cacheFlushDateFaresSchema = zDotnetDate()
  .optional()
  .describe(
    "Cache flush timestamp indicating when any static endpoint data for the wsf-fares API was last updated, as a UTC datetime. E.g., '2025-11-02T19:45:00.517Z' when static wsf-fares data was last refreshed."
  );

export type CacheFlushDateFares = z.infer<typeof cacheFlushDateFaresSchema>;
