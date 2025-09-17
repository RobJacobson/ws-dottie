import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack";

/**
 * TripRate schema
 *
 * A data contract that represents Trip rate information.
 */
export const tripRateSchema = z
  .object({
    /** Name for the toll trip */
    TripName: z.string().describe("Name for the toll trip"),
    /** The computed toll in cents, may not match what is displayed on the sign due to timing issues, a negative value will be used when toll is not available */
    Toll: z
      .number()
      .describe(
        "The computed toll in cents, may not match what is displayed on the sign due to timing issues, a negative value will be used when toll is not available"
      ),
    /** Message displayed on the sign */
    Message: z.string().describe("Message displayed on the sign"),
    /** The time message was updated for this toll trip */
    MessageUpdateTime: zWsdotDate().describe(
      "The time message was updated for this toll trip"
    ),
  })
  .describe("A data contract that represents Trip rate information.");

/** TripRate type */
export type TripRate = z.infer<typeof tripRateSchema>;
