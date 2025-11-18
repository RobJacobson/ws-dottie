import { zIsoDateString } from "@/apis/shared";
import { z } from "@/shared/zod";

/**
 * WeatherReading schema
 *
 * Provides current information from weather stations. Coverage Area: Statewide.
 */
export const weatherReadingSchema = z
  .object({
    StationId: z
      .string()
      .describe("National Weather Service assigned station identifier code."),
    StationName: z.string().describe("Display name of the weather station."),
    Latitude: z
      .number()
      .describe("Latitude of the weather station in decimal degrees."),
    Longitude: z
      .number()
      .describe("Longitude of the weather station in decimal degrees."),
    Elevation: z
      .int()
      .describe("Elevation of the weather station above sea level in meters."),
    ReadingTime: zIsoDateString()
      .nullable()
      .describe(
        "UTC datetime when the comprehensive weather reading was taken (ISO-8601 format)."
      ),
    AirTemperature: z
      .number()
      .nullable()
      .describe("Current air temperature in degrees Celsius."),
    RelativeHumidty: z
      .int()
      .nullable()
      .describe("Relative humidity as a percentage (0-100)."),
    AverageWindSpeed: z
      .int()
      .nullable()
      .describe(
        "Average wind speed during evaluation cycle in kilometers per hour."
      ),
    AverageWindDirection: z
      .int()
      .nullable()
      .describe(
        "Average wind direction in degrees clockwise from north (0-359)."
      ),
    WindGust: z
      .int()
      .nullable()
      .describe(
        "Maximum wind gust speed during evaluation cycle in kilometers per hour."
      ),
    Visibility: z
      .int()
      .nullable()
      .describe(
        "Average visibility distance in meters (computed every 3 minutes)."
      ),
    PrecipitationIntensity: z
      .int()
      .nullable()
      .describe(
        "Precipitation intensity derived from precipitation rate (intensity units)."
      ),
    PrecipitationType: z
      .int()
      .nullable()
      .describe(
        "Code indicating precipitation type: 0 = none, 1 = rain, 2 = snow."
      ),
    PrecipitationPast1Hour: z
      .number()
      .nullable()
      .describe(
        "Precipitation amount (liquid equivalent) for previous 1 hour in millimeters."
      ),
    PrecipitationPast3Hours: z
      .number()
      .nullable()
      .describe(
        "Precipitation amount (liquid equivalent) for previous 3 hours in millimeters."
      ),
    PrecipitationPast6Hours: z
      .number()
      .nullable()
      .describe(
        "Precipitation amount (liquid equivalent) for previous 6 hours in millimeters."
      ),
    PrecipitationPast12Hours: z
      .number()
      .nullable()
      .describe(
        "Precipitation amount (liquid equivalent) for previous 12 hours in millimeters."
      ),
    PrecipitationPast24Hours: z
      .number()
      .nullable()
      .describe(
        "Precipitation amount (liquid equivalent) for previous 24 hours in millimeters."
      ),
    PrecipitationAccumulation: z
      .number()
      .nullable()
      .describe(
        "Precipitation amount (liquid equivalent) from midnight GMT to current time in millimeters."
      ),
    BarometricPressure: z
      .int()
      .nullable()
      .describe(
        "Atmospheric pressure in millibars (not adjusted for elevation)."
      ),
    SnowDepth: z
      .int()
      .nullable()
      .describe(
        "Snow depth on representative areas excluding highway pavement in centimeters."
      ),
    SurfaceMeasurements: z
      .array(
        z.object({
          SensorId: z.int().describe("Numeric ID of the surface sensor."),
          SurfaceTemperature: z
            .number()
            .nullable()
            .describe(
              "Current pavement surface temperature in degrees Celsius."
            ),
          RoadFreezingTemperature: z
            .number()
            .nullable()
            .describe(
              "Freezing point of moisture on pavement based on chemical treatment in degrees Celsius."
            ),
          RoadSurfaceCondition: z
            .number()
            .nullable()
            .describe(
              "Code indicating road surface condition: 101 = Dry, 102 = Wet, 103 = Moist, 104 = Ice, 105 = Snow."
            ),
        })
      )
      .nullable()
      .describe(
        "Array of surface sensor measurements including pavement temperature, freezing temperature, and condition codes."
      ),
    SubSurfaceMeasurements: z
      .array(
        z.object({
          SensorId: z.int().describe("Numeric ID of the subsurface sensor."),
          SubSurfaceTemperature: z
            .number()
            .nullable()
            .describe(
              "Temperature from sensor embedded 12-18 inches below road pavement in degrees Celsius."
            ),
        })
      )
      .nullable()
      .describe(
        "Array of subsurface sensor measurements including ground temperature from sensors embedded below pavement."
      ),
  })
  .describe(
    "Comprehensive weather reading from a WSDOT weather station, including atmospheric conditions, precipitation across multiple time periods, and surface/subsurface sensor measurements."
  );

export type WeatherReading = z.infer<typeof weatherReadingSchema>;
