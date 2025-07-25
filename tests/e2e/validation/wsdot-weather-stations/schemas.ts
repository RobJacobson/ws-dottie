import { z } from "zod";

// WSDOT Weather Stations schemas
export const weatherStationDataSchema = z.object({
  Latitude: z.number(),
  Longitude: z.number(),
  StationCode: z.number(),
  StationName: z.string(),
});

export const weatherStationsArraySchema = z.array(weatherStationDataSchema);

// Export all schemas
export const schemas = {
  weatherStationData: weatherStationDataSchema,
  weatherStationsArray: weatherStationsArraySchema,
} as const; 