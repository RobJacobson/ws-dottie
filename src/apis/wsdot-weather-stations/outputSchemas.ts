import { z } from "zod";

/**
 * WeatherStationData schema
 *
 * Contains information about weather stations.
 */
export const weatherStationDataSchema = z
  .object({
    Latitude: z.number().describe("Latitude of station."),
    Longitude: z.number().describe("Longitude of station."),
    StationCode: z.number().int().describe("Identifier of weather station."),
    StationName: z
      .string()
      .nullable()
      .describe("Common name assigned to weather station."),
  })
  .describe("Contains information about weather stations.");

export type WeatherStationData = z.infer<typeof weatherStationDataSchema>;

/**
 * WeatherStations schema
 *
 * Return current list of weather stations maintained by WSDOT.
 */
export const weatherStationsSchema = z
  .array(weatherStationDataSchema)
  .describe("Return current list of weather stations maintained by WSDOT.");

export type WeatherStations = z.infer<typeof weatherStationsSchema>;
