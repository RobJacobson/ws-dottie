import { z } from "zod";
import { weatherReadingSchema } from "./weatherReading.zod";

/**
 * WeatherReadings schema
 *
 * Array of weather readings from WSDOT weather stations.
 */
export const weatherReadingsSchema = z
  .array(weatherReadingSchema)
  .describe("Array of weather readings from WSDOT weather stations.");

/** WeatherReadings type */
export type WeatherReadings = z.infer<typeof weatherReadingsSchema>;
