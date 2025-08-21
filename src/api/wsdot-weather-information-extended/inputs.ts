import { z } from "zod";

/**
 * Input parameter schemas for WSDOT Weather Information Extended API
 *
 * This API provides extended weather information including surface and subsurface
 * measurements, precipitation data, and detailed environmental readings from
 * WSDOT weather stations across Washington State.
 */

// No input parameters currently needed for getWeatherInformationExtended
// This schema represents an empty parameter object for consistency
export const getWeatherInformationExtendedParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting extended weather information. The API returns additional weather readings including surface and subsurface measurements from WSDOT weather stations across Washington State."
  );

// Export the inferred types for use in API functions
export type GetWeatherInformationExtendedParams = z.infer<
  typeof getWeatherInformationExtendedParamsSchema
>;
