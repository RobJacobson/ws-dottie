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
    /** Unique identifier for a season. */
    ScheduleID: z
      .number()
      .optional()
      .describe("Unique identifier for a season."),
  })
  .describe(
    "This operation provides a listing of routes that are active for a season. For example, \"Anacortes / Sidney B.C.\" may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`."
  );

export type ScheduledRoutesInput = z.infer<typeof scheduledRoutesSchema>;

/**
 * Schema for SchedRoutes input parameters
 *
 * This operation provides a listing of routes that are active for a season. For example, "Anacortes / Sidney B.C." may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`. */
export const scheduledRoutesByScheduleIdSchema = z
  .object({
    /** Unique identifier for a season. */
    ScheduleID: z
      .number()
      .optional()
      .describe("Unique identifier for a season."),
  })
  .describe(
    "This operation provides a listing of routes that are active for a season. For example, \"Anacortes / Sidney B.C.\" may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`."
  );

export type ScheduledRoutesByScheduleIdInput = z.infer<
  typeof scheduledRoutesByScheduleIdSchema
>;
