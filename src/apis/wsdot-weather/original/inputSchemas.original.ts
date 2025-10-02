import { z } from "zod";

import { zWsdotDate } from "@/apis/shared";

/**
 * GetCurrentWeatherInformation input schema
 *
 * Input parameters for getting current weather information.
 */
export const getCurrentWeatherInformationSchema = z.object({});

export type GetCurrentWeatherInformationInput = z.infer<
  typeof getCurrentWeatherInformationSchema
>;

/**
 * GetCurrentWeatherInformationByStationID input schema
 *
 * Input parameters for getting current weather information by station ID.
 */
export const getCurrentWeatherInformationByStationIDSchema = z
  .object({
    /** Station ID. */
    StationID: z.number().int().describe("Station ID."),
  })
  .describe(
    "Input parameters for getting current weather information by station ID."
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
    StationID: z.number().int().describe("Station ID."),
    /** Search start time. */
    SearchStartTime: zWsdotDate().describe("Search start time."),
    /** Search end time. */
    SearchEndTime: zWsdotDate().describe("Search end time."),
  })
  .describe(
    "Input parameters for searching weather information by station ID and time range."
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
    "Input parameters for getting current weather information for multiple stations."
  );

export type GetCurrentWeatherForStationsInput = z.infer<
  typeof getCurrentWeatherForStationsSchema
>;

/**
 * GetWeatherInformationExtended input schema
 *
 * Input parameters for getting extended weather information.
 */
export const getWeatherInformationExtendedSchema = z.object({});

export type GetWeatherInformationExtendedInput = z.infer<
  typeof getWeatherInformationExtendedSchema
>;

/**
 * GetCurrentStations input schema
 *
 * Input parameters for getting current weather stations.
 */
export const getCurrentStationsSchema = z.object({});

export type GetCurrentStationsInput = z.infer<
  typeof getCurrentStationsSchema
>;
