import { z } from "zod";

import { zWsdotDate } from "@/apis/shared";

/**
 * ScanwebSurfaceMeasurements schema
 *
 * Provides current information from weather stations. Coverage Area: Statewide.
 */
const scanwebSurfaceMeasurementsSchema = z
  .object({
    /** Sensor ID. */
    SensorId: z.int().describe("Sensor ID."),
    /** Surface temperature. */
    SurfaceTemperature: z.number().nullable().describe("Surface temperature."),
    /** Road freezing temperature. */
    RoadFreezingTemperature: z
      .number()
      .nullable()
      .describe("Road freezing temperature."),
    /** Road surface condition. */
    RoadSurfaceCondition: z
      .union([
        z.literal(101),
        z.literal(102),
        z.literal(103),
        z.literal(104),
        z.literal(105),
      ])
      .nullable()
      .describe("Road surface condition."),
  })
  .describe("Measurements recorded by surface sensors.");

export type ScanwebSurfaceMeasurements = z.infer<
  typeof scanwebSurfaceMeasurementsSchema
>;

/**
 * ScanwebSubSurfaceMeasurements schema
 *
 * Provides current information from weather stations. Coverage Area: Statewide.
 */
const scanwebSubSurfaceMeasurementsSchema = z
  .object({
    /** Sensor ID. */
    SensorId: z.int().describe("Sensor ID."),
    /** Sub-surface temperature. */
    SubSurfaceTemperature: z
      .number()
      .nullable()
      .describe("Sub-surface temperature."),
  })
  .describe("Measurements recorded by sub-surface sensors.");

export type ScanwebSubSurfaceMeasurements = z.infer<
  typeof scanwebSubSurfaceMeasurementsSchema
>;

/**
 * WeatherReading schema
 *
 * Provides current information from weather stations. Coverage Area: Statewide.
 */
export const weatherReadingSchema = z
  .object({
    /** NWS assigned name for station. */
    StationId: z.string().describe("NWS assigned name for station."),
    /** WSDOT assigned name. */
    StationName: z.string().describe("WSDOT assigned name."),
    /** Latitude of station. */
    Latitude: z.number().describe("Latitude of station."),
    /** Longitude of station. */
    Longitude: z.number().describe("Longitude of station."),
    /** Elevation from sea level in meters. */
    Elevation: z.int().describe("Elevation from sea level in meters."),
    /** Date and Time reading was taken. */
    ReadingTime: zWsdotDate()
      .nullable()
      .describe("Date and Time reading was taken."),
    /** Air temperature at the site in Celcius. */
    AirTemperature: z
      .number()
      .nullable()
      .describe("Air temperature at the site in Celcius."),
    /**
     * Percent of moisture in the air. A relative humidity of 0% shows that the air contains no moisture and 100% shows that the air is completely saturated and cannot absorb more moisture.
     */
    RelativeHumidty: z
      .int()
      .nullable()
      .describe(
        "Percent of moisture in the air. A relative humidity of 0% shows that the air contains no moisture and 100% shows that the air is completely saturated and cannot absorb more moisture."
      ),
    /**
     * Average speed of the wind during an evaluation cycle in Kilometers per hour.
     */
    AverageWindSpeed: z
      .int()
      .nullable()
      .describe(
        "Average speed of the wind during an evaluation cycle in Kilometers per hour."
      ),
    /**
     * Average wind direction during an evaluation cycle in degrees.
     */
    AverageWindDirection: z
      .int()
      .nullable()
      .describe(
        "Average wind direction during an evaluation cycle in degrees."
      ),
    /**
     * Maximum wind speed measured during an evaluation cycle. The time period over which wind gust speed is monitored can vary based on the type and manufacturer of the RWIS site.
     */
    WindGust: z
      .int()
      .nullable()
      .describe(
        "Maximum wind speed measured during an evaluation cycle. The time period over which wind gust speed is monitored can vary based on the type and manufacturer of the RWIS site."
      ),
    /**
     * Average distance that you can see, both day and night, computed every three minutes in meters.
     */
    Visibility: z
      .int()
      .nullable()
      .describe(
        "Average distance that you can see, both day and night, computed every three minutes in meters."
      ),
    /**
     * Intensity of the precipitation as derived from the precipitation rate.
     */
    PrecipitationIntensity: z
      .int()
      .nullable()
      .describe(
        "Intensity of the precipitation as derived from the precipitation rate."
      ),
    /**
     * Type of precipitation detected by a precipitation sensor, if one is available. Certain types of precipitation sensors can only detect the presence or absence of precipitation and will display Yes or No (1 or 0 respectively).
     */
    PrecipitationType: z
      .int()
      .nullable()
      .describe(
        "Type of precipitation detected by a precipitation sensor, if one is available. Certain types of precipitation sensors can only detect the presence or absence of precipitation and will display Yes or No (1 or 0 respectively)."
      ),
    /**
     * Rainfall amount or snowfall liquid equivalent for the previous 1 hour period. Measured in millimeters.
     */
    PrecipitationPast1Hour: z
      .number()
      .nullable()
      .describe(
        "Rainfall amount or snowfall liquid equivalent for the previous 1 hour period. Measured in millimeters."
      ),
    /**
     * Rainfall amount or snowfall liquid equivalent for the previous 3 hour period. Measured in millimeters.
     */
    PrecipitationPast3Hours: z
      .number()
      .nullable()
      .describe(
        "Rainfall amount or snowfall liquid equivalent for the previous 3 hour period. Measured in millimeters."
      ),
    /**
     * Rainfall amount or snowfall liquid equivalent for the previous 6 hour period. Measured in millimeters.
     */
    PrecipitationPast6Hours: z
      .number()
      .nullable()
      .describe(
        "Rainfall amount or snowfall liquid equivalent for the previous 6 hour period. Measured in millimeters."
      ),
    /**
     * Rainfall amount or snowfall liquid equivalent for the previous 12 hour period. Measured in millimeters.
     */
    PrecipitationPast12Hours: z
      .number()
      .nullable()
      .describe(
        "Rainfall amount or snowfall liquid equivalent for the previous 12 hour period. Measured in millimeters."
      ),
    /**
     * Rainfall amount or snowfall liquid equivalent for the previous 24 hour period. Measured in millimeters.
     */
    PrecipitationPast24Hours: z
      .number()
      .nullable()
      .describe(
        "Rainfall amount or snowfall liquid equivalent for the previous 24 hour period. Measured in millimeters."
      ),
    /**
     * Rainfall amount or snowfall liquid equivalent for the period from midnight GMT to the current time. At midnight GMT the total accumulation is reset to zero. Measured in millimeters.
     */
    PrecipitationAccumulation: z
      .number()
      .nullable()
      .describe(
        "Rainfall amount or snowfall liquid equivalent for the period from midnight GMT to the current time. At midnight GMT the total accumulation is reset to zero. Measured in millimeters."
      ),
    /**
     * The force per unit area exerted by the atmosphere in millibars. This reading is not adjusted for site elevation.
     */
    BarometricPressure: z
      .int()
      .nullable()
      .describe(
        "The force per unit area exerted by the atmosphere in millibars. This reading is not adjusted for site elevation."
      ),
    /**
     * The depth of snow on representative areas other than the highway pavement, avoiding drifts and plowed areas in centimeters.
     */
    SnowDepth: z
      .int()
      .nullable()
      .describe(
        "The depth of snow on representative areas other than the highway pavement, avoiding drifts and plowed areas in centimeters."
      ),
    /** Surface measurements. */
    SurfaceMeasurements: z
      .array(scanwebSurfaceMeasurementsSchema)
      .nullable()
      .describe("Surface measurements."),
    /** Sub-surface measurements. */
    SubSurfaceMeasurements: z
      .array(scanwebSubSurfaceMeasurementsSchema)
      .nullable()
      .describe("Sub-surface measurements."),
  })
  .describe("Information from a weather station.");

export type WeatherReading = z.infer<typeof weatherReadingSchema>;
