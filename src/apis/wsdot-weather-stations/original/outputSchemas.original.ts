import { z } from "zod";

/**
 * WeatherStationData schema
 *
 * Provides current information from weather stations. Coverage Area: Statewide.
 */
export const weatherStationDataSchema = z
  .object({
    /** Latitude of station. */
    Latitude: z.number().describe("Latitude of station."),
    /** Longitude of station. */
    Longitude: z.number().describe("Longitude of station."),
    /** Identifier of weather station. */
    StationCode: z.int().describe("Identifier of weather station."),
    /** Common name assigned to weather station. */
    StationName: z
      .string()
      .nullable()
      .describe("Common name assigned to weather station."),
  })
  .describe("Contains information about weather stations.");

export type WeatherStationData = z.infer<typeof weatherStationDataSchema>;

// Alias for consistency with other APIs
export const weatherStationSchema = weatherStationDataSchema;
export type WeatherStation = WeatherStationData;
