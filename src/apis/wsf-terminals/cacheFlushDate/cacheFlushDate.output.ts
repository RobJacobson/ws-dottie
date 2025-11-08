/**
 * @fileoverview WSF Terminals API Output Schemas
 *
 * This module provides Zod schemas for validating output data from the WSF
 * Terminals API endpoints.
 */

import type { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * CacheFlushDate schema
 */
export const cacheFlushDateTerminalsSchema = zDotnetDate()
  .optional()
  .describe(
    "Cache flush timestamp indicating when any static endpoint data for the wsf-terminals API was last updated, as a UTC datetime. E.g., '2025-11-02T19:45:00.517Z' when terminals metadata was refreshed."
  );

export type CacheFlushDateTerminals = z.infer<
  typeof cacheFlushDateTerminalsSchema
>;
