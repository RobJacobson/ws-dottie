import { z } from "zod";

/**
 * Input schema for GetTollTripRates endpoint (void input - only AccessCode)
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const getTollTripRatesSchema = z
  .object({})
  .describe(
    "Provides current toll rates for high occupancy lanes. Coverage Area: Statewide."
  );

export type GetTollTripRatesInput = z.infer<typeof getTollTripRatesSchema>;

/**
 * Input schema for GetTripRatesByDate endpoint
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const getTripRatesByDateSchema = z
  .object({
    /** Start date for the trip rates query. */
    FromDate: z.string().describe("Start date for the trip rates query."),
    /** End date for the trip rates query. */
    ToDate: z.string().describe("End date for the trip rates query."),
  })
  .describe(
    "Provides current toll rates for high occupancy lanes. Coverage Area: Statewide."
  );

export type GetTripRatesByDateInput = z.infer<typeof getTripRatesByDateSchema>;

/**
 * Input schema for GetTripRatesByVersion endpoint
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const getTripRatesByVersionSchema = z
  .object({
    /** Version number for the trip rates query. */
    Version: z.number().describe("Version number for the trip rates query."),
  })
  .describe(
    "Provides current toll rates for high occupancy lanes. Coverage Area: Statewide."
  );

export type GetTripRatesByVersionInput = z.infer<
  typeof getTripRatesByVersionSchema
>;
