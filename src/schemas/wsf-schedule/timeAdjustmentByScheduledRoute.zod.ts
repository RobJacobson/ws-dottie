import { z } from "zod";
import { timeAdjustmentSchema } from "./timeAdjustment.zod";

/**
 * Schema for time adjustment by scheduled route response from WSF Schedule API.
 * This operation provides a listing of all additions and cancellations for a scheduled route that deviate on specific dates from the scheduled times found in the /sailings resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014).
 * A valid scheduled route may be determined using /schedroutes. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const timeAdjustmentByScheduledRouteSchema = timeAdjustmentSchema;

export type TimeAdjustmentByScheduledRoute = z.infer<
  typeof timeAdjustmentByScheduledRouteSchema
>;

/**
 * TimeAdjustmentsByScheduledRoutes schema
 *
 * Array of time adjustments by scheduled route.
 */
export const timeAdjustmentsByScheduledRoutesSchema = z
  .array(timeAdjustmentByScheduledRouteSchema)
  .describe(
    "All additions and cancellations for a scheduled route that deviate on specific dates from the scheduled times found in the /sailings resultset."
  );

/** TimeAdjustmentsByScheduledRoutes type */
export type TimeAdjustmentsByScheduledRoutes = z.infer<
  typeof timeAdjustmentsByScheduledRoutesSchema
>;
