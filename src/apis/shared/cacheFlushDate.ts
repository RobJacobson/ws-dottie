/**
 * @fileoverview Shared schemas for cache flush date endpoints
 *
 * This module provides reusable input and output schemas for cache flush date
 * endpoints across all WSF APIs (wsf-fares, wsf-schedule, wsf-terminals, wsf-vessels).
 */

import type { z as zod } from "zod";
import { z } from "@/shared/zod";
import { zDotnetDate } from "./zDotnetDateSchema";

/**
 * Shared input schema for cache flush date endpoints
 *
 * All cache flush date endpoints accept no parameters, so this is an empty object.
 */
export const cacheFlushDateInputSchema = z
  .object({})
  .describe("Input parameters for cache flush date endpoint.");

export type CacheFlushDateInput = zod.infer<typeof cacheFlushDateInputSchema>;

/**
 * Shared output schema for cache flush date endpoints
 *
 * Returns an optional UTC datetime indicating when static endpoint data was
 * last updated. Used for cache invalidation purposes.
 */
export const cacheFlushDateOutputSchema = zDotnetDate()
  .optional()
  .describe(
    "UTC datetime when static endpoint data was last updated, or undefined if no update has occurred."
  );

export type CacheFlushDateOutput = zod.infer<typeof cacheFlushDateOutputSchema>;
