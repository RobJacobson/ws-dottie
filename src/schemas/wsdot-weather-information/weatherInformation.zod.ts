import { z } from "zod";
import { weatherInfoSchema } from "./weatherInfo.zod";

/**
 * WeatherInformation schema
 *
 * Returns current weather information from weather stations that are run by the Washington State Department of Transportation
 */
export const weatherInformationSchema = z
  .array(weatherInfoSchema)
  .describe(
    "Returns current weather information from weather stations that are run by the Washington State Department of Transportation"
  );

/** WeatherInformation type */
export type WeatherInformation = z.infer<typeof weatherInformationSchema>;
