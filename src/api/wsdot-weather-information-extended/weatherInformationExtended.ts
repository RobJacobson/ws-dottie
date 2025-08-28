import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";
import { createUseQueryWsdot, tanstackQueryOptions } from "@/shared/tanstack";

// ============================================================================
// API Function
//
// getWeatherInformationExtended
// ============================================================================

const ENDPOINT = "/traffic/api/api/Scanweb";

export const getWeatherInformationExtended = async (
  params: GetWeatherInformationExtendedParams = {}
): Promise<WeatherReadings> => {
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

export const getWeatherInformationExtendedParamsSchema = z.object({});

export type GetWeatherInformationExtendedParams = z.infer<
  typeof getWeatherInformationExtendedParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// weatherReadingSchema
// WeatherReading
// ============================================================================

export const surfaceMeasurementSchema = z.object({
  SensorId: z.number(),

  SurfaceTemperature: zNullableNumber(),

  RoadFreezingTemperature: zNullableNumber(),

  RoadSurfaceCondition: zNullableNumber(),
});

export const subSurfaceMeasurementSchema = z.object({
  SensorId: z.number(),

  SubSurfaceTemperature: zNullableNumber(),
});

export const weatherReadingSchema = z.object({
  StationId: z.string(),

  StationName: z.string(),

  Latitude: zLatitude(),

  Longitude: zLongitude(),

  Elevation: z.number(),

  ReadingTime: zWsdotDate().nullable(),

  AirTemperature: zNullableNumber(),

  RelativeHumidty: zNullableNumber(),

  AverageWindSpeed: zNullableNumber(),

  AverageWindDirection: zNullableNumber(),

  WindGust: zNullableNumber(),

  Visibility: zNullableNumber(),

  PrecipitationIntensity: zNullableNumber(),

  PrecipitationType: zNullableNumber(),

  PrecipitationPast1Hour: zNullableNumber(),

  PrecipitationPast3Hours: zNullableNumber(),

  PrecipitationPast6Hours: zNullableNumber(),

  PrecipitationPast12Hours: zNullableNumber(),

  PrecipitationPast24Hours: zNullableNumber(),

  PrecipitationAccumulation: zNullableNumber(),

  BarometricPressure: zNullableNumber(),

  SnowDepth: zNullableNumber(),

  SurfaceMeasurements: z.array(surfaceMeasurementSchema).nullable(),

  SubSurfaceMeasurements: z.array(subSurfaceMeasurementSchema).nullable(),
});

export const weatherReadingArraySchema = z.array(weatherReadingSchema);

export type SurfaceMeasurement = z.infer<typeof surfaceMeasurementSchema>;

export type SubSurfaceMeasurement = z.infer<typeof subSurfaceMeasurementSchema>;

export type WeatherReading = z.infer<typeof weatherReadingSchema>;

/**
 * WeatherReadings type - represents an array of weather reading objects
 */
export type WeatherReadings = z.infer<typeof weatherReadingArraySchema>;

// ============================================================================
// TanStack Query Hook
//
// useWeatherInformationExtended
// ============================================================================

export const useWeatherInformationExtended = createUseQueryWsdot({
  queryFn: getWeatherInformationExtended,
  queryKeyPrefix: [
    "wsdot",
    "weather-information-extended",
    "getWeatherInformationExtended",
  ],
  defaultOptions: tanstackQueryOptions.ONE_HOUR_POLLING,
});
