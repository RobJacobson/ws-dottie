import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * Schema for toll trip version information
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollTripVersionSchema = z
  .object({
    /** Timestamp of the version. */
    TimeStamp: zDotnetDate().describe("Timestamp of the version."),
    /** Version number. */
    Version: z.int().describe("Version number."),
  })
  .describe("Schema for toll trip version information");

export type TollTripVersion = z.infer<typeof tollTripVersionSchema>;
