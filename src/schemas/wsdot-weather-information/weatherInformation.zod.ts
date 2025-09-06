import { z } from "zod";
import {
  zLatitude,
  zLongitude,
  zWsdotDate,
} from "@/shared/fetching/validation";

/**
 * WeatherInfo schema
 *
 * Current information from a weather station.
 */
export const weatherInfoSchema = z
  .object({
    /** Station ID */
    StationID: z.number().int().describe("Station ID"),
    /** Station name */
    StationName: z.string().describe("Station name"),
    /** Latitude */
    Latitude: zLatitude().describe("Latitude"),
    /** Longitude */
    Longitude: zLongitude().describe("Longitude"),
    /** Reading time */
    ReadingTime: zWsdotDate().describe("Reading time"),
    /** Temperature in Fahrenheit */
    TemperatureInFahrenheit: z
      .number()
      .nullable()
      .describe("Temperature in Fahrenheit"),
    /** Precipitation in inches */
    PrecipitationInInches: z
      .number()
      .nullable()
      .describe("Precipitation in inches"),
    /** Wind speed in MPH */
    WindSpeedInMPH: z.number().nullable().describe("Wind speed in MPH"),
    /** Wind gust speed in MPH */
    WindGustSpeedInMPH: z
      .number()
      .nullable()
      .describe("Wind gust speed in MPH"),
    /** Visibility */
    Visibility: z.number().int().nullable().describe("Visibility"),
    /** Sky coverage */
    SkyCoverage: z.string().describe("Sky coverage"),
    /** Barometric pressure */
    BarometricPressure: z.number().nullable().describe("Barometric pressure"),
    /** Relative humidity */
    RelativeHumidity: z.number().nullable().describe("Relative humidity"),
    /** Wind direction cardinal */
    WindDirectionCardinal: z.string().describe("Wind direction cardinal"),
    /** Wind direction */
    WindDirection: z.number().nullable().describe("Wind direction"),
  })
  .describe("Current information from a weather station.");

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

/** WeatherInfo type */
export type WeatherInfo = z.infer<typeof weatherInfoSchema>;

/** WeatherInformation type */
export type WeatherInformation = z.infer<typeof weatherInformationSchema>;
