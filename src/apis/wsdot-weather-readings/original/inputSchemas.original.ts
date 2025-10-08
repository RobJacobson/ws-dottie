import { z } from "zod";

/**
 * GetWeatherReadings input schema
 *
 * Input parameters for getting weather readings.
 */
export const getWeatherReadingsSchema = z
  .object({})
  .describe(
    "Provides current information from weather stations. Coverage Area: Statewide."
  );

export type GetWeatherReadingsInput = z.infer<typeof getWeatherReadingsSchema>;
