import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack/validation";
import { tripRateSchema } from "./tripRate.zod";

/**
 * TripRatesByDateItem schema
 *
 * Historical item schema (versioned snapshot) for trip rates by date.
 */
export const tripRatesByDateItemSchema = z.object({
  /** Last updated time for this snapshot (JS Date) */
  LastUpdated: zWsdotDate().describe(
    "Last updated time for this snapshot (JS Date)"
  ),
  /** Trip entries */
  Trips: z.array(tripRateSchema).nullable().describe("Trip entries"),
  /** Version number */
  Version: z.number().describe("Version number"),
});

/** TripRatesByDateItem type */
export type TripRatesByDateItem = z.infer<typeof tripRatesByDateItemSchema>;

/** TripRatesByDate type (alias for single item) */
export type TripRatesByDate = TripRatesByDateItem;
