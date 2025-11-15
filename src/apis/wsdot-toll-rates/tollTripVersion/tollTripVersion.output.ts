import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";

/**
 * Schema for toll trip version information
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollTripVersionSchema = z
  .object({
    TimeStamp: zDotnetDate().describe(
      "UTC datetime when version was created or last updated."
    ),
    Version: z
      .int()
      .describe(
        "Version number for toll trip rates data. Increments when trip rates data is updated."
      ),
  })
  .describe(
    "Version information for toll trip rates data including version number and timestamp."
  );

export type TollTripVersion = z.infer<typeof tollTripVersionSchema>;
