import { z } from "@/shared/zod-openapi-init";

/**
 * GetWeatherReadings input schema
 *
 * Input parameters for getting weather readings.
 */
export const weatherReadingsInputSchema = z
  .object({})
  .describe(
    "Retrieves comprehensive weather readings from all stations including air temperature, humidity, wind conditions, visibility, precipitation, barometric pressure, and surface/subsurface measurements. Use for complete weather station data access and comprehensive weather analysis."
  );

export type WeatherReadingsInput = z.infer<typeof weatherReadingsInputSchema>;
