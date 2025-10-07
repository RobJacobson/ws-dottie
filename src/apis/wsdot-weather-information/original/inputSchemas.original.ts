import { z } from "zod";

import { zWsdotDate } from "@/apis/shared";

/**
 * GetCurrentWeatherInformation input schema
 *
 * Input parameters for getting current weather information. Provides current information from weather stations. Coverage Area: Statewide.
 */
export const getCurrentWeatherInformationSchema = z
  .object({})
  .describe(
    "Input parameters for getting current weather information. Provides current information from weather stations. Coverage Area: Statewide."
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
    /** Station ID. */
    StationID: z.int().describe("Station ID."),
  })
  .describe(
    "Input parameters for getting current weather information by station ID. Provides current information from weather stations. Coverage Area: Statewide."
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
    /** Station ID. */
    StationID: z.int().describe("Station ID."),
    /** Search start time as a JavaScript Date object. */
    SearchStartTime: z.date().describe("Search start time as Date object."),
    /** Search end time as a JavaScript Date object. */
    SearchEndTime: z.date().describe("Search end time as Date object."),
  })
  .describe(
    "Provides current information from weather stations. Coverage Area: Statewide."
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
    /** Station list. */
    StationList: z.string().describe("Station list."),
  })
  .describe(
    "Provides current information from weather stations. Coverage Area: Statewide."
  );

export type GetCurrentWeatherForStationsInput = z.infer<
  typeof getCurrentWeatherForStationsSchema
>;
