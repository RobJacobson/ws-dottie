import { z } from "@/shared/zod";

/**
 * WeatherStations input schema
 *
 * Input parameters for getting current weather stations.
 */
export const weatherStationsInputSchema = z
  .object({})
  .describe(
    "Input parameters for listing weather station metadata from all stations."
  );

export type WeatherStationsInput = z.infer<typeof weatherStationsInputSchema>;
