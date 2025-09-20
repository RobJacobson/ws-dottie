import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack";
import { tollTripRateSchema } from "./tollTripRate.zod";

/**
 * TollTripRates schema
 *
 * Trip rates including versioned trip list (used by multiple endpoints).
 */
export const tollTripRatesSchema = z.object({
  /** Last updated time for this data (JS Date) */
  LastUpdated: zWsdotDate().describe(
    "Last updated time for this data (JS Date)"
  ),
  /** Array of trip rate objects */
  Trips: z
    .array(tollTripRateSchema)
    .nullable()
    .describe("Array of trip rate objects"),
  /** Version number for the trip rates data */
  Version: z.number().describe("Version number for the trip rates data"),
});

/** TollTripRates type */
export type TollTripRates = z.infer<typeof tollTripRatesSchema>;
