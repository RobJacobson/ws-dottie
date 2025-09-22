import { z } from "zod";

import { zWsdotDate } from "@/apis/shared";

/**
 * GetCurrentWeatherInformation input schema
 *
 * Input parameters for getting current weather information.
 */
export const getCurrentWeatherInformationInputSchema = z.object({});

export type GetCurrentWeatherInformationInput = z.infer<
  typeof getCurrentWeatherInformationInputSchema
>;

/**
 * GetCurrentWeatherInformationByStationID input schema
 *
 * Input parameters for getting current weather information by station ID.
 */
export const getCurrentWeatherInformationByStationIDInputSchema = z
  .object({
    StationID: z.number().int().describe("Station ID."),
  })
  .describe(
    "Input parameters for getting current weather information by station ID."
  );

export type GetCurrentWeatherInformationByStationIDInput = z.infer<
  typeof getCurrentWeatherInformationByStationIDInputSchema
>;

/**
 * SearchWeatherInformation input schema
 *
 * Input parameters for searching weather information by station ID and time range.
 */
export const searchWeatherInformationInputSchema = z
  .object({
    StationID: z.number().int().describe("Station ID."),
    SearchStartTime: zWsdotDate().describe("Search start time."),
    SearchEndTime: zWsdotDate().describe("Search end time."),
  })
  .describe(
    "Input parameters for searching weather information by station ID and time range."
  );

export type SearchWeatherInformationInput = z.infer<
  typeof searchWeatherInformationInputSchema
>;

/**
 * GetCurrentWeatherForStations input schema
 *
 * Input parameters for getting current weather information for multiple stations.
 */
export const getCurrentWeatherForStationsInputSchema = z
  .object({
    StationList: z.string().describe("Station list."),
  })
  .describe(
    "Input parameters for getting current weather information for multiple stations."
  );

export type GetCurrentWeatherForStationsInput = z.infer<
  typeof getCurrentWeatherForStationsInputSchema
>;

/**
 * GetWeatherInformationExtended input schema
 *
 * Input parameters for getting extended weather information.
 */
export const getWeatherInformationExtendedInputSchema = z.object({});

export type GetWeatherInformationExtendedInput = z.infer<
  typeof getWeatherInformationExtendedInputSchema
>;

/**
 * GetCurrentStations input schema
 *
 * Input parameters for getting current weather stations.
 */
export const getCurrentStationsInputSchema = z.object({});

export type GetCurrentStationsInput = z.infer<
  typeof getCurrentStationsInputSchema
>;
