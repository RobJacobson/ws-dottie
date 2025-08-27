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

export const surfaceMeasurementSchema = z
  .object({
    SensorId: z.number().describe(""),

    SurfaceTemperature: zNullableNumber().describe(""),

    RoadFreezingTemperature: zNullableNumber().describe(""),

    RoadSurfaceCondition: zNullableNumber().describe(""),
  })
  
  .describe("");

export const subSurfaceMeasurementSchema = z
  .object({
    SensorId: z.number().describe(""),

    SubSurfaceTemperature: zNullableNumber().describe(""),
  })
  
  .describe("");

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

export const weatherReadingArraySchema = z
  .array(weatherReadingSchema)
  .describe("");

export type SurfaceMeasurement = z.infer<typeof surfaceMeasurementSchema>;

export type SubSurfaceMeasurement = z.infer<typeof subSurfaceMeasurementSchema>;

export type WeatherReading = z.infer<typeof weatherReadingSchema>;

// ============================================================================
// TanStack Query Hook
//
// useWeatherInformationExtended
// ============================================================================

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
