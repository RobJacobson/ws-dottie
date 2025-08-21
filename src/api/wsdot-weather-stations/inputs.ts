import { z } from "zod";

/**
 * Input parameter schemas for WSDOT Weather Stations API
 *
 * This API provides information about weather stations maintained by WSDOT,
 * including station locations, codes, and names across Washington State.
 */

// No input parameters currently needed for getWeatherStations
// This schema represents an empty parameter object for consistency
export const getWeatherStationsParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting weather stations information. The API returns information about all weather stations maintained by WSDOT across Washington State."
  );

// Export the inferred types for use in API functions
export type GetWeatherStationsParams = z.infer<
  typeof getWeatherStationsParamsSchema
>;
