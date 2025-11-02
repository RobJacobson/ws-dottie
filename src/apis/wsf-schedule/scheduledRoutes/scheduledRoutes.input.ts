/**
 * @fileoverview WSF Schedule API Input Schemas for Scheduled Routes
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to scheduled routes operations.
 */

import { z } from "zod";

/**
 * Schema for SchedRoutes input parameters
 *
 * This operation provides a listing of routes that are active for a season. For example, "Anacortes / Sidney B.C." may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`. */
export const scheduledRoutesSchema = z
  .object({
    ScheduleID: z
      .number()
      .optional()
      .describe(
        "Unique identifier for schedule season, as an integer ID. E.g., '193' for Fall 2025 schedule. Use GetActiveSeasons to retrieve valid schedule IDs. Optional - if omitted, returns all scheduled routes across current and upcoming seasons. Used to filter scheduled routes by specific season."
      ),
  })
  .describe(
    "Retrieves listing of routes that are active for specified season or all current/upcoming seasons, returning scheduled route IDs, route information, contingency adjustments, and service disruptions. Routes must be scheduled to run during season to be included. Use GetActiveSeasons to find valid schedule IDs. Use for route discovery and season-based route filtering."
  );

export type ScheduledRoutesInput = z.infer<typeof scheduledRoutesSchema>;

/**
 * Schema for SchedRoutes input parameters
 *
 * This operation provides a listing of routes that are active for a season. For example, "Anacortes / Sidney B.C." may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`. */
export const scheduledRoutesByScheduleIdSchema = z
  .object({
    ScheduleID: z
      .number()
      .optional()
      .describe(
        "Unique identifier for schedule season, as an integer ID. E.g., '193' for Fall 2025 schedule. Use GetActiveSeasons to retrieve valid schedule IDs. Optional - if omitted, returns all scheduled routes across current and upcoming seasons. Used to filter scheduled routes by specific season."
      ),
  })
  .describe(
    "Retrieves listing of routes that are active for specified season or all current/upcoming seasons by schedule ID, returning scheduled route IDs, route information, contingency adjustments, and service disruptions. Routes must be scheduled to run during season to be included. Use GetActiveSeasons to find valid schedule IDs. Use for route discovery and season-based route filtering."
  );

export type ScheduledRoutesByScheduleIdInput = z.infer<
  typeof scheduledRoutesByScheduleIdSchema
>;
