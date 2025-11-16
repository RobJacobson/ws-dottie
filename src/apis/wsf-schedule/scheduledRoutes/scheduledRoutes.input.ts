/**
 * @fileoverview WSF Schedule API Input Schemas for Scheduled Routes
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to scheduled routes operations.
 */

import { z } from "@/shared/zod";

/**
 * Schema for SchedRoutes input parameters
 *
 * This operation provides a listing of routes that are active for a season. For example, "Anacortes / Sidney B.C." may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`. */
export const scheduledRoutesInputSchema = z
  .object({
    ScheduleID: z
      .number()
      .optional()
      .describe(
        "Numeric ID of the schedule season. Optional; if omitted, returns all scheduled routes across current and upcoming seasons."
      ),
  })
  .describe("Input parameters for retrieving scheduled routes.");

export type ScheduledRoutesInput = z.infer<typeof scheduledRoutesInputSchema>;

/**
 * Schema for SchedRoutes input parameters
 *
 * This operation provides a listing of routes that are active for a season. For example, "Anacortes / Sidney B.C." may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`. */
export const scheduledRoutesByIdInputSchema = z
  .object({
    ScheduleID: z
      .number()
      .optional()
      .describe(
        "Numeric ID of the schedule season. Optional; if omitted, returns all scheduled routes across current and upcoming seasons."
      ),
  })
  .describe("Input parameters for retrieving scheduled routes by schedule ID.");

export type ScheduledRoutesByIdInput = z.infer<
  typeof scheduledRoutesByIdInputSchema
>;
