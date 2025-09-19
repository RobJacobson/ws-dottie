import { z } from "zod";

import { zWsdotDate } from "@/shared/tanstack";

/**
 * WeatherInfo schema
 *
 * Current information from a weather station.
 */
export const weatherInfoSchema = z
  .object({
    /** Barometric pressure */
    BarometricPressure: z.number().nullable().describe("Barometric pressure"),
    /** Latitude */
    Latitude: z.number().describe("Latitude"),
    /** Longitude */
    Longitude: z.number().describe("Longitude"),
    /** Precipitation in inches */
    PrecipitationInInches: z
      .number()
      .nullable()
      .describe("Precipitation in inches"),
    /** Reading time */
    ReadingTime: zWsdotDate().describe("Reading time"),
    /** Relative humidity */
    RelativeHumidity: z.number().nullable().describe("Relative humidity"),
    /** Sky coverage */
    SkyCoverage: z.string().nullable().describe("Sky coverage"),
    /** Station ID */
    StationID: z.number().int().describe("Station ID"),
    /** Station name */
    StationName: z.string().nullable().describe("Station name"),
    /** Temperature in Fahrenheit */
    TemperatureInFahrenheit: z
      .number()
      .nullable()
      .describe("Temperature in Fahrenheit"),
    /** Visibility */
    Visibility: z.number().int().nullable().describe("Visibility"),
    /** Wind direction */
    WindDirection: z.number().nullable().describe("Wind direction"),
    /** Wind direction cardinal */
    WindDirectionCardinal: z
      .string()
      .nullable()
      .describe("Wind direction cardinal"),
    /** Wind gust speed in MPH */
    WindGustSpeedInMPH: z
      .number()
      .nullable()
      .describe("Wind gust speed in MPH"),
    /** Wind speed in MPH */
    WindSpeedInMPH: z.number().nullable().describe("Wind speed in MPH"),
  })
  .describe("Current information from a weather station.");

/** WeatherInfo type */
export type WeatherInfo = z.infer<typeof weatherInfoSchema>;

/**
 * Array of weather information.
 */
export const weatherInformationSchema = z
  .array(weatherInfoSchema)
  .describe(
    "Returns current weather information from weather stations that are run by the Washington State Department of Transportation"
  );

export type WeatherInformation = z.infer<typeof weatherInformationSchema>;
