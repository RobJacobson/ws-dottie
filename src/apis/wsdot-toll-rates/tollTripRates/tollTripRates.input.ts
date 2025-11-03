import { z } from "@/shared/zod-openapi-init";

/**
 * Input schema for GetTollTripRates endpoint (void input - only AccessCode)
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const getTollTripRatesSchema = z
  .object({})
  .describe(
    "Retrieves current toll trip rates for all trips, returning trip names, toll amounts, rate messages, update timestamps, and version information. Use for real-time toll rate monitoring across all trips."
  );

export type GetTollTripRatesInput = z.infer<typeof getTollTripRatesSchema>;

/**
 * Input schema for GetTripRatesByDate endpoint
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const getTripRatesByDateSchema = z
  .object({
    FromDate: z
      .string()
      .describe(
        "Start date for historical trip rates query, as a date string. E.g., '2025-11-01' for November 1, 2025. Used to define beginning of date range for historical toll rate queries."
      ),
    ToDate: z
      .string()
      .describe(
        "End date for historical trip rates query, as a date string. E.g., '2025-11-02' for November 2, 2025. Used to define end of date range for historical toll rate queries."
      ),
  })
  .describe(
    "Retrieves historical toll trip rates within specified date range, returning trip rates, toll amounts, and timestamps for the time period. Use for historical toll rate analysis and trend tracking."
  );

export type GetTripRatesByDateInput = z.infer<typeof getTripRatesByDateSchema>;

/**
 * Input schema for GetTripRatesByVersion endpoint
 *
 * Provides current toll rates for high occupancy lanes. Coverage Area: Statewide.
 */
export const getTripRatesByVersionSchema = z
  .object({
    Version: z
      .number()
      .describe(
        "Version number for toll trip rates query, as an integer. E.g., '371529' for version 371529. Used to retrieve specific version of toll trip rates data."
      ),
  })
  .describe(
    "Retrieves toll trip rates for specific version number, returning trip rates, toll amounts, and timestamps for that version. Use for version-specific toll rate lookups and data versioning."
  );

export type GetTripRatesByVersionInput = z.infer<
  typeof getTripRatesByVersionSchema
>;
