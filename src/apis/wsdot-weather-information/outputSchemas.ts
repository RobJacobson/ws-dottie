import { z } from "zod";

import { zWsdotDate } from "@/apis/shared";

/**
 * WeatherInfo schema
 *
 * Current information from a weather station.
 */
export const weatherInfoSchema = z
  .object({
    BarometricPressure: z.number().nullable().describe("Barometric pressure."),
    Latitude: z.number().describe("Latitude."),
    Longitude: z.number().describe("Longitude."),
    PrecipitationInInches: z
      .number()
      .nullable()
      .describe("Precipitation in inches."),
    ReadingTime: zWsdotDate().describe("Reading time."),
    RelativeHumidity: z.number().nullable().describe("Relative humidity."),
    SkyCoverage: z.string().nullable().describe("Sky coverage."),
    StationID: z.number().int().describe("Station ID."),
    StationName: z.string().nullable().describe("Station name."),
    TemperatureInFahrenheit: z
      .number()
      .nullable()
      .describe("Temperature in Fahrenheit."),
    Visibility: z.number().int().nullable().describe("Visibility."),
    WindDirection: z.number().nullable().describe("Wind direction."),
    WindDirectionCardinal: z
      .string()
      .nullable()
      .describe("Wind direction cardinal."),
    WindGustSpeedInMPH: z
      .number()
      .nullable()
      .describe("Wind gust speed in MPH."),
    WindSpeedInMPH: z.number().nullable().describe("Wind speed in MPH."),
  })
  .describe("Current information from a weather station.");

export type WeatherInfo = z.infer<typeof weatherInfoSchema>;

/**
 * WeatherInformation schema
 *
 * Returns current weather information from weather stations that are run by the Washington State Department of Transportation.
 */
export const weatherInformationSchema = z
  .array(weatherInfoSchema)
  .describe(
    "Returns current weather information from weather stations that are run by the Washington State Department of Transportation."
  );

export type WeatherInformation = z.infer<typeof weatherInformationSchema>;
