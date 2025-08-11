import { z } from "zod";

export const weatherStationDataSchema = z
  .object({
    Latitude: z.number(),
    Longitude: z.number(),
    StationCode: z.number(),
    StationName: z.string(),
  })
  .catchall(z.unknown());

export const weatherStationDataArraySchema = z.array(weatherStationDataSchema);

export type WeatherStationData = z.infer<typeof weatherStationDataSchema>;
