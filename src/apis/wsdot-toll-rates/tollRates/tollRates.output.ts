import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";
import { tollTripBaseSchema } from "../shared/tollTripBaseSchema";

/**
 * Schema for toll rate information for HOV toll lanes
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollRateSchema = tollTripBaseSchema
  .extend({
    /**
     * The computed toll in cents which is sent to the tolling company, may not match what is displayed on the sign due to timing issues, a negative value will be used when toll is not available.
     */
    CurrentToll: z
      .int()
      .describe(
        "The computed toll in cents which is sent to the tolling company, may not match what is displayed on the sign due to timing issues, a negative value will be used when toll is not available."
      ),
    /** Message displayed on the sign in place of a toll. */
    CurrentMessage: z
      .string()
      .nullable()
      .describe("Message displayed on the sign in place of a toll."),
    /** Route the toll applies to. */
    StateRoute: z.string().nullable().describe("Route the toll applies to."),
    /** Last time updated for this toll trip. */
    TimeUpdated: zDotnetDate().describe(
      "Last time updated for this toll trip."
    ),
  })
  .describe("Schema for toll rate information for HOV toll lanes");

export type TollRate = z.infer<typeof tollRateSchema>;
