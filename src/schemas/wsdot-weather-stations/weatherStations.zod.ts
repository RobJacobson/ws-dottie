import { z } from "zod";

/**
 * WeatherStation schema
 *
 * Contains information about weather stations.
 */
export const weatherStationSchema = z
  .object({
    /** Identifier of weather station */
    StationCode: z.number().int().describe("Identifier of weather station"),
    /** Common name assigned to weather station */
    StationName: z.string().describe("Common name assigned to weather station"),
    /** Latitude of station */
    Latitude: z.number().describe("Latitude of station"),
    /** Longitude of station */
    Longitude: z.number().describe("Longitude of station"),
  })
  .describe("Contains information about weather stations.");

/**
 * WeatherStations schema
 *
 * Return current list of weather stations maintained by WSDOT
 */
export const weatherStationsSchema = z
  .array(weatherStationSchema)
  .describe("Return current list of weather stations maintained by WSDOT");

/** WeatherStation type */
export type WeatherStation = z.infer<typeof weatherStationSchema>;

/** WeatherStations type */
export type WeatherStations = z.infer<typeof weatherStationsSchema>;
