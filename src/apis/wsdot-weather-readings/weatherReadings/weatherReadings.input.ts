import { z } from "@/shared/zod";

/**
 * GetWeatherReadings input schema
 *
 * Input parameters for getting weather readings.
 */
export const weatherReadingsInputSchema = z
  .object({})
  .describe(
    "Input parameters for listing comprehensive weather readings from all stations."
  );

export type WeatherReadingsInput = z.infer<typeof weatherReadingsInputSchema>;
