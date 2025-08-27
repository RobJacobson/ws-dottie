/**
 * Weather Information Extended API
 *
 * Comprehensive weather data from WSDOT's advanced weather monitoring system including
 * surface and subsurface temperature measurements, road conditions, and detailed precipitation
 * tracking. This API provides extended weather information beyond basic atmospheric conditions,
 * including road surface temperatures, freezing temperatures, and subsurface conditions critical
 * for winter driving safety and road maintenance operations.
 *
 * This API includes detailed surface and subsurface sensor data from weather stations across
 * Washington State highways, providing real-time information about road conditions, temperature
 * gradients, and precipitation accumulation patterns. Data is particularly valuable for winter
 * weather monitoring and road safety applications.
 *
 * API Functions:
 * - getWeatherInformationExtended: Returns comprehensive weather data from all extended weather stations
 *
 * Input/Output Overview:
 * - getWeatherInformationExtended: Input: none, Output: WeatherReading[]
 *
 * Base Type: WeatherReading
 *
 * interface WeatherReading {
 *   StationId: string;
 *   StationName: string;
 *   Latitude: number;
 *   Longitude: number;
 *   Elevation: number;
 *   ReadingTime: Date | null;
 *   AirTemperature: number | null;
 *   RelativeHumidty: number | null;
 *   AverageWindSpeed: number | null;
 *   AverageWindDirection: number | null;
 *   WindGust: number | null;
 *   Visibility: number | null;
 *   PrecipitationIntensity: number | null;
 *   PrecipitationType: number | null;
 *   PrecipitationPast1Hour: number | null;
 *   PrecipitationPast3Hours: number | null;
 *   PrecipitationPast6Hours: number | null;
 *   PrecipitationPast12Hours: number | null;
 *   PrecipitationPast24Hours: number | null;
 *   PrecipitationAccumulation: number | null;
 *   BarometricPressure: number | null;
 *   SnowDepth: number | null;
 *   SurfaceMeasurements: SurfaceMeasurement[] | null;
 *   SubSurfaceMeasurements: SubSurfaceMeasurement[] | null;
 * }
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/traffic/api/api/Scanweb?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "StationId": "TALPE",
 *     "StationName": "090ws05226 - Alpental",
 *     "Latitude": 47.427,
 *     "Longitude": -121.418,
 *     "Elevation": 876,
 *     "ReadingTime": "2025-08-26T06:28:33",
 *     "AirTemperature": 17.6,
 *     "RelativeHumidty": 69,
 *     "AverageWindSpeed": 0,
 *     "AverageWindDirection": 90,
 *     "WindGust": 8,
 *     "Visibility": 2000,
 *     "PrecipitationIntensity": 0,
 *     "PrecipitationType": 0,
 *     "PrecipitationPast1Hour": null,
 *     "PrecipitationPast3Hours": null,
 *     "PrecipitationPast6Hours": null,
 *     "PrecipitationPast12Hours": null,
 *     "PrecipitationPast24Hours": null,
 *     "PrecipitationAccumulation": null,
 *     "BarometricPressure": null,
 *     "SnowDepth": null,
 *     "SurfaceMeasurements": [
 *       {
 *         "SensorId": 0,
 *         "SurfaceTemperature": 23.4,
 *         "RoadFreezingTemperature": null,
 *         "RoadSurfaceCondition": 103
 *       }
 *     ],
 *     "SubSurfaceMeasurements": [
 *       {
 *         "SensorId": 0,
 *         "SubSurfaceTemperature": 27.5
 *       }
 *     ]
 *   }
 * ]
 * ```
 */

import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";

// ============================================================================
// API Function
//
// getWeatherInformationExtended
// ============================================================================

const ENDPOINT = "/traffic/api/api/Scanweb";

/**
 * Retrieves comprehensive weather information from WSDOT's extended weather monitoring system.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<WeatherReading[]> - Array of comprehensive weather data including surface and subsurface measurements
 *
 * @example
 * const weatherData = await getWeatherInformationExtended();
 * console.log(weatherData.length);  // 120
 * console.log(weatherData[0].StationName);  // "090ws05226 - Alpental"
 * console.log(weatherData[0].AirTemperature);  // 17.6
 * console.log(weatherData[0].SurfaceMeasurements?.[0]?.SurfaceTemperature);  // 23.4
 *
 * @throws {Error} When API is unavailable or returns invalid response
 */
export const getWeatherInformationExtended = async (
  params: GetWeatherInformationExtendedParams = {}
): Promise<WeatherReading[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getWeatherInformationExtendedParamsSchema,
      output: weatherReadingArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getWeatherInformationExtendedParamsSchema
// GetWeatherInformationExtendedParams
// ============================================================================

/**
 * Parameters for retrieving extended weather information (no parameters required)
 */
export const getWeatherInformationExtendedParamsSchema = z
  .object({})
  .describe("");

export type GetWeatherInformationExtendedParams = z.infer<
  typeof getWeatherInformationExtendedParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// weatherReadingSchema
// WeatherReading
// ============================================================================

/**
 * Surface measurement schema - includes road surface temperature, freezing temperature, and road condition data
 */
export const surfaceMeasurementSchema = z
  .object({
    SensorId: z.number().describe(""),

    SurfaceTemperature: zNullableNumber().describe(""),

    RoadFreezingTemperature: zNullableNumber().describe(""),

    RoadSurfaceCondition: zNullableNumber().describe(""),
  })
  
  .describe("");

/**
 * Subsurface measurement schema - includes subsurface temperature data
 */
export const subSurfaceMeasurementSchema = z
  .object({
    SensorId: z.number().describe(""),

    SubSurfaceTemperature: zNullableNumber().describe(""),
  })
  
  .describe("");

/**
 * Comprehensive weather reading schema - includes atmospheric conditions, precipitation data, and surface/subsurface measurements
 */
export const weatherReadingSchema = z
  .object({
    StationId: z.string().describe(""),

    StationName: z.string().describe(""),

    Latitude: zLatitude().describe(""),

    Longitude: zLongitude().describe(""),

    Elevation: z.number().describe(""),

    ReadingTime: zWsdotDate().nullable().describe(""),

    AirTemperature: zNullableNumber().describe(""),

    RelativeHumidty: zNullableNumber().describe(""),

    AverageWindSpeed: zNullableNumber().describe(""),

    AverageWindDirection: zNullableNumber().describe(""),

    WindGust: zNullableNumber().describe(""),

    Visibility: zNullableNumber().describe(""),

    PrecipitationIntensity: zNullableNumber().describe(""),

    PrecipitationType: zNullableNumber().describe(""),

    PrecipitationPast1Hour: zNullableNumber().describe(""),

    PrecipitationPast3Hours: zNullableNumber().describe(""),

    PrecipitationPast6Hours: zNullableNumber().describe(""),

    PrecipitationPast12Hours: zNullableNumber().describe(""),

    PrecipitationPast24Hours: zNullableNumber().describe(""),

    PrecipitationAccumulation: zNullableNumber().describe(""),

    BarometricPressure: zNullableNumber().describe(""),

    SnowDepth: zNullableNumber().describe(""),

    SurfaceMeasurements: z
      .array(surfaceMeasurementSchema)
      .nullable()
      .describe(""),

    SubSurfaceMeasurements: z
      .array(subSurfaceMeasurementSchema)
      .nullable()
      .describe(""),
  })
  
  .describe("");

/**
 * Array of comprehensive weather reading objects - wrapper around weatherReadingSchema
 */
export const weatherReadingArraySchema = z
  .array(weatherReadingSchema)
  .describe("");

/**
 * SurfaceMeasurement type - represents road surface sensor data including temperature and condition information
 */
export type SurfaceMeasurement = z.infer<typeof surfaceMeasurementSchema>;

/**
 * SubSurfaceMeasurement type - represents subsurface temperature sensor data
 */
export type SubSurfaceMeasurement = z.infer<typeof subSurfaceMeasurementSchema>;

/**
 * WeatherReading type - represents comprehensive weather data including atmospheric conditions and surface/subsurface measurements
 */
export type WeatherReading = z.infer<typeof weatherReadingSchema>;

// ============================================================================
// TanStack Query Hook
//
// useWeatherInformationExtended
// ============================================================================

/**
 * TanStack Query hook for extended weather information with automatic updates (array).
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<WeatherReading[], Error> - Query result with array of comprehensive weather data
 *
 * @example
 * const { data: weatherData, isLoading } = useWeatherInformationExtended();
 * if (weatherData) {
 *   console.log(weatherData.length);  // 120
 *   console.log(weatherData[0].StationName);  // "090ws05226 - Alpental"
 *   console.log(weatherData[0].AirTemperature);  // 17.6
 * }
 */
export const useWeatherInformationExtended = (
  params: GetWeatherInformationExtendedParams,
  options?: TanStackOptions<WeatherReading[]>
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "weather-information-extended",
      "getWeatherInformationExtended",
      JSON.stringify(params),
    ],
    queryFn: () => getWeatherInformationExtended(params),
    ...tanstackQueryOptions.HOURLY_UPDATES,
    ...options,
  });
};
