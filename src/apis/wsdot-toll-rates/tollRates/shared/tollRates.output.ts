import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";
import { tollTripBaseSchema } from "../../shared/tollTripBaseSchema";

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
        "Current toll amount in cents. May be negative when toll is unavailable. May not match sign display due to timing differences."
      ),
    CurrentMessage: z
      .string()
      .nullable()
      .describe(
        "Message displayed on toll sign instead of toll amount. Null when toll amount is displayed, empty string when no message is shown."
      ),
    StateRoute: z
      .string()
      .nullable()
      .describe(
        "State route identifier where toll applies (e.g., '099' for SR-99, '405' for I-405)."
      ),
    TimeUpdated: zDotnetDate().describe(
      "UTC datetime when toll rate was last updated."
    ),
  })
  .describe(
    "Current toll rate information for a single HOV toll lane trip, including pricing and location data."
  );

export type TollRate = z.infer<typeof tollRateSchema>;
