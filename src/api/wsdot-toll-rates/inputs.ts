import { z } from "zod";

/**
 * Input parameter schemas for WSDOT Toll Rates API
 *
 * This API provides toll rate information including current pricing, trip details,
 * geometry data, and system messages for WSDOT toll facilities across Washington State.
 */

// No input parameters currently needed for getTollRates
// This schema represents an empty parameter object for consistency
export const getTollRatesParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all current toll rates. The API returns current toll rates for all WSDOT toll facilities, including pricing information and facility details."
  );

// No input parameters currently needed for getTollTripInfo
// This schema represents an empty parameter object for consistency
export const getTollTripInfoParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting toll trip information. The API returns detailed trip information including geometry data for toll facilities and routes."
  );

// No input parameters currently needed for getTollTripRates
// This schema represents an empty parameter object for consistency
export const getTollTripRatesParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting toll trip rates. The API returns current toll trip rates along with system messages and last updated timestamps."
  );

// Export the inferred types for use in API functions
export type GetTollRatesParams = z.infer<typeof getTollRatesParamsSchema>;
export type GetTollTripInfoParams = z.infer<typeof getTollTripInfoParamsSchema>;
export type GetTollTripRatesParams = z.infer<
  typeof getTollTripRatesParamsSchema
>;
