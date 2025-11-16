/**
 * @fileoverview WSF Schedule API Input Schemas for Active Seasons
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to active seasons operations.
 */

import { z } from "@/shared/zod";

/**
 * Schema for ActiveScheduledSeasons input parameters
 *
 * This operation retrieves a summary of active seasons. */
export const activeSeasonsInputSchema = z
  .object({})
  .describe(
    "Input parameters for active seasons endpoint. No parameters required."
  );

export type ActiveSeasonsInput = z.infer<typeof activeSeasonsInputSchema>;
