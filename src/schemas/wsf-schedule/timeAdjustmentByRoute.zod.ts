import { z } from "zod";

import { timeAdjustmentSchema } from "./timeAdjustment.zod";

/**
 * Array of time adjustments by route.
 * This operation provides a listing of all additions and cancellations for a route that deviate on specific dates from the scheduled times found in the /sailings resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014).
 * A valid route may be determined using /routes. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const timeAdjustmentsByRouteSchema = z
  .array(timeAdjustmentSchema)
  .describe(
    "All additions and cancellations for a route that deviate on specific dates from the scheduled times found in the /sailings resultset."
  );
