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
    "Input parameters for retrieving all time adjustments across all routes."
  );

export type TimeAdjustmentsInput = z.infer<typeof timeAdjustmentsInputSchema>;

/**
 * Schema for TimeAdjByRoute input parameters
 *
 * This operation provides a listing of all additions and cancellations for a route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid route may be determined using `/routes`. */
export const timeAdjustmentsByRouteInputSchema = z
  .object({
    RouteID: z.number().describe("Numeric ID of the route."),
  })
  .describe(
    "Input parameters for retrieving time adjustments for a specific route."
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
    SchedRouteID: z.number().describe("Numeric ID of the scheduled route."),
  })
  .describe(
    "Input parameters for retrieving time adjustments for a specific scheduled route."
  );

export type TimeAdjustmentsBySchedRouteInput = z.infer<
  typeof timeAdjustmentsBySchedRouteInputSchema
>;
