import { z } from "@/shared/zod";

/**
 * Input schema for GetTollTripRates endpoint (void input - only AccessCode)
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tollTripRatesInputSchema = z
  .object({})
  .describe(
    "Input parameters for retrieving current toll rates for all trips."
  );

export type TollTripRatesInput = z.infer<typeof tollTripRatesInputSchema>;

/**
 * Input schema for GetTripRatesByDate endpoint
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tripRatesByDateInputSchema = z
  .object({
    FromDate: z
      .string()
      .describe("Start date for historical query in YYYY-MM-DD format."),
    ToDate: z
      .string()
      .describe("End date for historical query in YYYY-MM-DD format."),
  })
  .describe(
    "Input parameters for retrieving historical toll rates within a date range."
  );

export type TripRatesByDateInput = z.infer<typeof tripRatesByDateInputSchema>;

/**
 * Input schema for GetTripRatesByVersion endpoint
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const tripRatesByVersionInputSchema = z
  .object({
    Version: z
      .number()
      .int()
      .describe("Version number for toll trip rates data."),
  })
  .describe(
    "Input parameters for retrieving toll rates for a specific version number."
  );

export type TripRatesByVersionInput = z.infer<
  typeof tripRatesByVersionInputSchema
>;
