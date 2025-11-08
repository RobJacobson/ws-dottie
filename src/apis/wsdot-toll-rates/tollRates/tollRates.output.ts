import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";
import { tollTripBaseSchema } from "../shared/tollTripBaseSchema";

/**
 * Schema for toll rate information for HOV toll lanes
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollRateSchema = tollTripBaseSchema
  .extend({
    CurrentToll: z
      .int()
      .describe(
        "Current toll amount computed and sent to tolling company, as cents. E.g., '125' for $1.25 toll on SR-99 trip, '325' for $3.25 toll on SR-99 trip, '0' for free trips on I-405, negative value when toll is not available. May not match sign display due to timing differences between computation and sign update. Used for toll calculation and fare display."
      ),
    CurrentMessage: z
      .string()
      .nullable()
      .describe(
        "Message displayed on toll sign in place of toll amount, as a display message. E.g., null when toll amount is displayed, empty string when no message is shown. Used when toll system displays text messages instead of toll amounts on signs."
      ),
    StateRoute: z
      .string()
      .nullable()
      .describe(
        "State route identifier where toll applies, as a route identifier. E.g., '099' for SR-99, '405' for I-405, '167' for SR-167, null when route is not specified. Used for route identification and toll route filtering."
      ),
    TimeUpdated: zDotnetDate().describe(
      "Timestamp when toll rate was last updated, as a UTC datetime. E.g., '2025-11-02T19:31:59.475Z' for update at 7:31 PM on November 2, 2025. Indicates data freshness and when toll rate calculation occurred."
    ),
  })
  .describe(
    "Represents current toll rate information for HOV toll lanes including trip details, current toll amount in cents, route association, and update timestamp. E.g., trip '099tp03268' on SR-99 with current toll $1.25 (125 cents) updated at 7:31 PM. Used for real-time toll rate monitoring, toll calculation, and fare display. Data updated frequently to reflect current tolling conditions."
  );

export type TollRate = z.infer<typeof tollRateSchema>;
