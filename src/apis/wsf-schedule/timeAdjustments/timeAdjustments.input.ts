/**
 * @fileoverview WSF Schedule API Input Schemas for Time Adjustments
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to time adjustment operations.
 */

import { z } from "zod";

/**
 * Schema for TimeAdj input parameters
 *
 * This operation provides a listing of all additions and cancellations that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). */
export const timeAdjSchema = z
  .object({})
  .describe(
    "This operation provides a listing of all additions and cancellations that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014)."
  );

export type TimeAdjInput = z.infer<typeof timeAdjSchema>;

/**
 * Schema for TimeAdjByRoute input parameters
 *
 * This operation provides a listing of all additions and cancellations for a route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid route may be determined using `/routes`. */
export const timeAdjByRouteSchema = z
  .object({
    /** Unique identifier for a route. */
    RouteID: z.number().describe("Unique identifier for a route."),
  })
  .describe(
    "This operation provides a listing of all additions and cancellations for a route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid route may be determined using `/routes`."
  );

export type TimeAdjByRouteInput = z.infer<typeof timeAdjByRouteSchema>;

/**
 * Schema for TimeAdjBySchedRoute input parameters
 *
 * This operation provides a listing of all additions and cancellations for a scheduled route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid scheduled route may be determined using `/schedroutes`. */
export const timeAdjBySchedRouteSchema = z
  .object({
    /** Unique identifier for a scheduled route. */
    SchedRouteID: z
      .number()
      .describe("Unique identifier for a scheduled route."),
  })
  .describe(
    "This operation provides a listing of all additions and cancellations for a scheduled route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid scheduled route may be determined using `/schedroutes`."
  );

export type TimeAdjBySchedRouteInput = z.infer<
  typeof timeAdjBySchedRouteSchema
>;
