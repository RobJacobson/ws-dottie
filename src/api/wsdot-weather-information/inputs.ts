import { z } from "zod";

/**
 * Input parameter schemas for WSDOT Weather Information API
 *
 * This API provides weather information including temperature, humidity, wind,
 * precipitation, and visibility data from weather stations across Washington State.
 */

// No input parameters currently needed for getWeatherInformation
// This schema represents an empty parameter object for consistency
export const getWeatherInformationParamsSchema = z
  .object({})
  .describe(
    "No parameters required for getting all weather information. The API returns current weather data for all monitored weather stations across Washington State."
  );

// Parameter schema for getWeatherInformationByStationId
export const getWeatherInformationByStationIdParamsSchema = z
  .object({
    stationId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific weather station to retrieve. This ID is assigned by the WSDOT system and can be obtained from the getWeatherInformation endpoint or other weather station listings."
      ),
  })
  .describe(
    "Parameters for retrieving weather information for a specific weather station by its unique identifier"
  );

// Parameter schema for getWeatherInformationForStations
export const getWeatherInformationForStationsParamsSchema = z
  .object({
    stationIds: z
      .string()
      .min(1, "Station IDs cannot be empty")
      .describe(
        "Comma-separated list of weather station IDs to retrieve weather information for. Multiple station IDs should be separated by commas without spaces (e.g., '1909,1910,1928')."
      ),
  })
  .describe(
    "Parameters for retrieving weather information for multiple weather stations specified by their IDs"
  );

// Export the inferred types for use in API functions
export type GetWeatherInformationParams = z.infer<
  typeof getWeatherInformationParamsSchema
>;
export type GetWeatherInformationByStationIdParams = z.infer<
  typeof getWeatherInformationByStationIdParamsSchema
>;
export type GetWeatherInformationForStationsParams = z.infer<
  typeof getWeatherInformationForStationsParamsSchema
>;
