/**
 * @fileoverview WSF Schedule API Input Schemas for Active Seasons
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to active seasons operations.
 */

import { z } from "zod";

/**
 * Schema for ActiveScheduledSeasons input parameters
 *
 * This operation retrieves a summary of active seasons. */
export const activeScheduledSeasonsSchema = z
  .object({})
  .describe(
    "Retrieves summary of active schedule seasons, returning season IDs, names, PDF URLs, and date ranges. Use to identify which schedule seasons are currently active and their date ranges."
  );

export type ActiveScheduledSeasonsInput = z.infer<
  typeof activeScheduledSeasonsSchema
>;
