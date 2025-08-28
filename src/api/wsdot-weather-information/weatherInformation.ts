import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  zLatitude,
  zLongitude,
  zNullableNumber,
  zNullableString,
  zWsdotDate,
} from "@/shared/fetching/validation/schemas";
import { createUseQueryWsdot, tanstackQueryOptions } from "@/shared/tanstack";

// ============================================================================
// API Functions
//
// getWeatherInformation (array)
// getWeatherInformationByStationId (single item)
// ============================================================================

const ALL_WEATHER_ENDPOINT =
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationAsJson";
const STATION_BY_ID_ENDPOINT =
  "/Traffic/api/WeatherInformation/WeatherInformationREST.svc/GetCurrentWeatherInformationByStationIDAsJson?StationID={stationId}";

export const getWeatherInformation = async (
  params: GetWeatherInformationParams = {}
): Promise<WeatherInfos> => {
  return zodFetch(
    ALL_WEATHER_ENDPOINT,
    {
      input: getWeatherInformationParamsSchema,
      output: weatherInfoArraySchema,
    },
    params
  );
};

export const getWeatherInformationByStationId = async (
  params: GetWeatherInformationByStationIdParams
) => {
  return zodFetch(
    STATION_BY_ID_ENDPOINT,
    {
      input: getWeatherInformationByStationIdParamsSchema,
      output: weatherInfoSchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getWeatherInformationParamsSchema
// GetWeatherInformationParams
// ============================================================================

export const getWeatherInformationParamsSchema = z.object({});

export type GetWeatherInformationParams = z.infer<
  typeof getWeatherInformationParamsSchema
>;

export const getWeatherInformationByStationIdParamsSchema = z
  .object({
    stationId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the specific weather station to retrieve. This ID corresponds to specific monitoring stations like 1909 (S 144th St on SB I-5), 1928 (EB I-90 Echo Lake), 1966 (NE 130th Street on I-5), or 1983 (Satus Pass on US 97). The ID is assigned by the WSDOT system and can be obtained from the getWeatherInformation endpoint response."
      ),
  })
  .describe(
    "Parameters for retrieving weather information for a specific weather station by its unique identifier"
  );

export type GetWeatherInformationByStationIdParams = z.infer<
  typeof getWeatherInformationByStationIdParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// weatherInfoSchema
// WeatherInfo
// ============================================================================

export const weatherInfoSchema = z.object({
  BarometricPressure: zNullableNumber(),

  Latitude: zLatitude(),

  Longitude: zLongitude(),

  PrecipitationInInches: zNullableNumber(),

  ReadingTime: zWsdotDate(),

  RelativeHumidity: zNullableNumber(),

  SkyCoverage: zNullableString(),

  StationID: z.number().int().positive(),

  StationName: z.string(),

  TemperatureInFahrenheit: zNullableNumber(),

  Visibility: zNullableNumber(),

  WindDirection: zNullableNumber(),

  WindDirectionCardinal: zNullableString(),

  WindGustSpeedInMPH: zNullableNumber(),

  WindSpeedInMPH: zNullableNumber(),
});

export type WeatherInfo = z.infer<typeof weatherInfoSchema>;

export const weatherInfoArraySchema = z.array(weatherInfoSchema);

/**
 * WeatherInfos type - represents an array of weather info objects
 */
export type WeatherInfos = z.infer<typeof weatherInfoArraySchema>;

// ============================================================================
// TanStack Query Hook
//
// useWeatherInformation
// ============================================================================

export const useWeatherInformation = createUseQueryWsdot({
  queryFn: getWeatherInformation,
  queryKeyPrefix: ["wsdot", "weather-information", "getWeatherInformation"],
  defaultOptions: tanstackQueryOptions.ONE_MIN_POLLING,
});

export const useWeatherInformationByStationId = createUseQueryWsdot({
  queryFn: getWeatherInformationByStationId,
  queryKeyPrefix: [
    "wsdot",
    "weather-information",
    "getWeatherInformationByStationId",
  ],
  defaultOptions: tanstackQueryOptions.ONE_MIN_POLLING,
});
