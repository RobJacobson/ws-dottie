import { z } from "zod";
import { timeAdjustmentSchema } from "./timeAdjustment.zod";

/**
 * Schema for time adjustment by route response from WSF Schedule API.
 * This operation provides a listing of all additions and cancellations for a route that deviate on specific dates from the scheduled times found in the /sailings resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014).
 * A valid route may be determined using /routes. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const timeAdjustmentByRouteSchema = timeAdjustmentSchema;

export type TimeAdjustmentByRoute = z.infer<typeof timeAdjustmentByRouteSchema>;

/**
 * Array of time adjustments by route.
 */
export const timeAdjustmentsByRouteArraySchema = z
  .array(timeAdjustmentByRouteSchema)
  .describe(
    "All additions and cancellations for a route that deviate on specific dates from the scheduled times found in the /sailings resultset."
  );

export type TimeAdjustmentsByRouteArray = z.infer<
  typeof timeAdjustmentsByRouteArraySchema
>;
