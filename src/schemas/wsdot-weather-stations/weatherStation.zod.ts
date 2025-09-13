import { z } from "zod";

/**
 * WeatherStation schema
 *
 * Contains information about weather stations.
 */
export const weatherStationSchema = z
  .object({
    /** Latitude of station */
    Latitude: z.number().describe("Latitude of station"),
    /** Longitude of station */
    Longitude: z.number().describe("Longitude of station"),
    /** Identifier of weather station */
    StationCode: z.number().int().describe("Identifier of weather station"),
    /** Common name assigned to weather station */
    StationName: z
      .string()
      .nullable()
      .describe("Common name assigned to weather station"),
  })
  .describe("Contains information about weather stations.");

/** WeatherStation type */
export type WeatherStation = z.infer<typeof weatherStationSchema>;
