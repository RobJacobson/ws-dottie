/**
 * @fileoverview WSF Schedule API Input Schemas for Time Adjustments
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to time adjustment operations.
 */

import { z } from "@/shared/zod";

/**
 * Schema for TimeAdj input parameters
 *
 * This operation provides a listing of all additions and cancellations that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). */
export const timeAdjustmentsInputSchema = z
  .object({})
  .describe(
    "Retrieves all time adjustments including additions and cancellations that deviate from scheduled times on specific dates, returning adjustment details with route, sailing, vessel, terminal, and timing information. Includes tidal adjustments and event-based modifications. Use for identifying schedule deviations and special date modifications."
  );

export type TimeAdjustmentsInput = z.infer<typeof timeAdjustmentsInputSchema>;

/**
 * Schema for TimeAdjByRoute input parameters
 *
 * This operation provides a listing of all additions and cancellations for a route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid route may be determined using `/routes`. */
export const timeAdjustmentsByRouteInputSchema = z
  .object({
    RouteID: z
      .number()
      .describe(
        "Unique identifier for route, as an integer ID. E.g., '8' for Port Townsend/Coupeville route. Use GetRoutes to retrieve valid routes. Used to filter time adjustments by specific route."
      ),
  })
  .describe(
    "Retrieves time adjustments for specified route including additions and cancellations that deviate from scheduled times on specific dates, returning adjustment details with sailing, vessel, terminal, and timing information. Includes tidal adjustments and event-based modifications. Use GetRoutes to find valid routes. Use for route-specific schedule deviation identification."
  );

export type TimeAdjustmentsByRouteInput = z.infer<
  typeof timeAdjustmentsByRouteInputSchema
>;

/**
 * Schema for TimeAdjBySchedRoute input parameters
 *
 * This operation provides a listing of all additions and cancellations for a scheduled route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid scheduled route may be determined using `/schedroutes`. */
export const timeAdjustmentsBySchedRouteInputSchema = z
  .object({
    SchedRouteID: z
      .number()
      .describe(
        "Unique identifier for scheduled route, as an integer ID. E.g., '2383' for Port Townsend/Coupeville route in Fall 2025. Use GetScheduledRoutes to retrieve valid scheduled route IDs. Used to filter time adjustments by specific scheduled route."
      ),
  })
  .describe(
    "Retrieves time adjustments for specified scheduled route including additions and cancellations that deviate from scheduled times on specific dates, returning adjustment details with sailing, vessel, terminal, and timing information. Includes tidal adjustments and event-based modifications. Use GetScheduledRoutes to find valid scheduled route IDs. Use for scheduled route-specific schedule deviation identification."
  );

export type TimeAdjustmentsBySchedRouteInput = z.infer<
  typeof timeAdjustmentsBySchedRouteInputSchema
>;
