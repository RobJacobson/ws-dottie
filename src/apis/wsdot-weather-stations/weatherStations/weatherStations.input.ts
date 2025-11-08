import { z } from "@/shared/zod";

/**
 * WeatherStations input schema
 *
 * Input parameters for getting current weather stations.
 */
export const weatherStationsInputSchema = z
  .object({})
  .describe(
    "Retrieves metadata for all weather stations statewide, returning station identifiers, names, and location coordinates. Use for weather station discovery and location-based station queries."
  );

export type WeatherStationsInput = z.infer<typeof weatherStationsInputSchema>;
