import { z } from "@/shared/zod";

/**
 * WeatherStationData schema
 *
 * Provides current information from weather stations. Coverage Area: Statewide.
 */
export const weatherStationSchema = z
  .object({
    Latitude: z
      .number()
      .describe("Latitude of the weather station in decimal degrees."),
    Longitude: z
      .number()
      .describe("Longitude of the weather station in decimal degrees."),
    StationCode: z.number().int().describe("Numeric ID of the weather station."),
    StationName: z
      .string()
      .nullable()
      .describe("Display name of the weather station."),
  })
  .describe(
    "Weather station metadata including station identifier, name, and location coordinates for WSDOT Road Weather Information System stations."
  );

export type WeatherStation = z.infer<typeof weatherStationSchema>;

// Alias for backward compatibility
export type WeatherStationData = WeatherStation;
