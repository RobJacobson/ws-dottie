/**
 * @fileoverview WSF Terminals API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Terminals API endpoints.
 */

import { z } from "@/shared/zod-openapi-init";

/**
 * Schema for CacheFlushDate input parameters
 */
export const cacheFlushDateTerminalsInputSchema = z
  .object({})
  .describe(
    "Retrieves cache flush timestamp indicating when any static endpoint data for the wsf-terminals API was last updated."
  );

export type CacheFlushDateTerminalsInput = z.infer<
  typeof cacheFlushDateTerminalsInputSchema
>;
