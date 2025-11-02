import { z } from "zod";

/**
 * GetCurrentWeatherInformation input schema
 *
 * Input parameters for getting current weather information. Provides current information from weather stations. Coverage Area: Statewide.
 */
export const getCurrentWeatherInformationSchema = z
  .object({})
  .describe(
    "Retrieves current weather information from all weather stations statewide, returning temperature, humidity, wind conditions, visibility, barometric pressure, and precipitation data. Use for weather monitoring and road condition assessment."
  );

export type GetCurrentWeatherInformationInput = z.infer<
  typeof getCurrentWeatherInformationSchema
>;

/**
 * GetCurrentWeatherInformationByStationID input schema
 *
 * Input parameters for getting current weather information by station ID. Provides current information from weather stations. Coverage Area: Statewide.
 */
export const getCurrentWeatherInformationByStationIDSchema = z
  .object({
    StationID: z
      .int()
      .describe(
        "Unique weather station identifier, as an integer ID. E.g., '1909' for S 144th St station on I-5, '1910' for NE 195th station on I-405, '1928' for Echo Lake station on I-90. Used to retrieve specific station weather data."
      ),
  })
  .describe(
    "Retrieves current weather information for specific station by ID, returning temperature, humidity, wind conditions, visibility, barometric pressure, and precipitation data. Use for individual station weather monitoring."
  );

export type GetCurrentWeatherInformationByStationIDInput = z.infer<
  typeof getCurrentWeatherInformationByStationIDSchema
>;

/**
 * SearchWeatherInformation input schema
 *
 * Input parameters for searching weather information by station ID and time range.
 */
export const searchWeatherInformationSchema = z
  .object({
    StationID: z
      .int()
      .describe(
        "Unique weather station identifier, as an integer ID. E.g., '1909' for S 144th St station, '1928' for Echo Lake station. Used to filter weather data by specific station."
      ),
    SearchStartTime: z
      .string()
      .datetime()
      .describe(
        "Start time for weather data search range, as an ISO datetime string. E.g., '2025-11-02T00:00:00Z' for November 2, 2025 midnight UTC. Used to define beginning of time range for historical weather queries."
      ),
    SearchEndTime: z
      .string()
      .datetime()
      .describe(
        "End time for weather data search range, as an ISO datetime string. E.g., '2025-11-02T23:59:59Z' for November 2, 2025 end of day UTC. Used to define end of time range for historical weather queries."
      ),
  })
  .describe(
    "Searches historical weather information for specific station within time range, returning temperature, humidity, wind conditions, visibility, and other weather measurements. Use for historical weather analysis and time-series queries."
  );

export type SearchWeatherInformationInput = z.infer<
  typeof searchWeatherInformationSchema
>;

/**
 * GetCurrentWeatherForStations input schema
 *
 * Input parameters for getting current weather information for multiple stations.
 */
export const getCurrentWeatherForStationsSchema = z
  .object({
    StationList: z
      .string()
      .describe(
        "Comma-separated list of weather station IDs, as a station list string. E.g., '1909,1910,1928' for multiple stations. Used to retrieve weather data for multiple specific stations in single query."
      ),
  })
  .describe(
    "Retrieves current weather information for multiple specified stations, returning temperature, humidity, wind conditions, visibility, and other weather measurements for each station. Use for batch weather queries across multiple stations."
  );

export type GetCurrentWeatherForStationsInput = z.infer<
  typeof getCurrentWeatherForStationsSchema
>;
