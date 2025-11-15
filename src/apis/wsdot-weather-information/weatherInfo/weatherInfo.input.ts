import { z } from "@/shared/zod";

/**
 * GetWeatherInformation input schema
 *
 * Input parameters for getting current weather information. Provides current information from weather stations. Coverage Area: Statewide.
 */
export const weatherInformationInputSchema = z
  .object({})
  .describe(
    "Input parameters for listing current weather information from all stations."
  );

export type WeatherInformationInput = z.infer<
  typeof weatherInformationInputSchema
>;

/**
 * GetWeatherInformationByStationId input schema
 *
 * Input parameters for getting current weather information by station ID. Provides current information from weather stations. Coverage Area: Statewide.
 */
export const weatherInformationByStationIdInputSchema = z
  .object({
    StationID: z.int().describe("Numeric ID of the weather station."),
  })
  .describe(
    "Input parameters for getting current weather information by station ID."
  );

export type WeatherInformationByStationIdInput = z.infer<
  typeof weatherInformationByStationIdInputSchema
>;

/**
 * SearchWeatherInformation input schema
 *
 * Input parameters for searching weather information by station ID and time range.
 */
export const searchWeatherInformationInputSchema = z
  .object({
    StationID: z.int().describe("Numeric ID of the weather station."),
    SearchStartTime: z
      .string()
      .datetime()
      .describe(
        "UTC datetime when the search time range begins (ISO-8601 format)."
      ),
    SearchEndTime: z
      .string()
      .datetime()
      .describe(
        "UTC datetime when the search time range ends (ISO-8601 format)."
      ),
  })
  .describe(
    "Input parameters for searching historical weather information by station and time range."
  );

export type SearchWeatherInformationInput = z.infer<
  typeof searchWeatherInformationInputSchema
>;

/**
 * GetCurrentWeatherForStations input schema
 *
 * Input parameters for getting current weather information for multiple stations.
 */
export const currentWeatherForStationsInputSchema = z
  .object({
    StationList: z
      .string()
      .describe("Comma-separated list of weather station IDs."),
  })
  .describe(
    "Input parameters for getting current weather information for multiple stations."
  );

export type CurrentWeatherForStationsInput = z.infer<
  typeof currentWeatherForStationsInputSchema
>;
