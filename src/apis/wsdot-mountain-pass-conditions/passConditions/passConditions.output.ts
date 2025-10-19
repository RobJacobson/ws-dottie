import { z } from "zod";
import { zDotnetDate } from "@/apis/shared";

/**
 * Schema for TravelRestriction - represents travel restrictions for mountain passes
 *
 * Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system. Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/).
 */
export const travelRestrictionSchema = z
  .object({
    /** The text of this restriction. */
    RestrictionText: z
      .string()
      .nullable()
      .describe("The text of this restriction."),
    /** The direction of this restriction. */
    TravelDirection: z
      .string()
      .nullable()
      .describe("The direction of this restriction."),
  })
  .describe(
    "Schema for TravelRestriction - represents travel restrictions for mountain passes"
  );

export type TravelRestriction = z.infer<typeof travelRestrictionSchema>;

/**
 * Schema for PassCondition - represents the conditions of a mountain pass
 *
 * Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system. Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/).
 */
export const passConditionSchema = z
  .object({
    /** A unique identifier for a mountain pass. */
    MountainPassId: z
      .int()
      .describe("A unique identifier for a mountain pass."),
    /** A friendly name for a mountain pass. */
    MountainPassName: z
      .string()
      .nullable()
      .describe("A friendly name for a mountain pass."),
    /** The latitude of the mountain pass. */
    Latitude: z.number().describe("The latitude of the mountain pass."),
    /** The longitude of the mountain pass. */
    Longitude: z.number().describe("The longitude of the mountain pass."),
    /** Date and time to display to public, DisplayDate in the database. */
    DateUpdated: zDotnetDate().describe(
      "Date and time to display to public, DisplayDate in the database."
    ),
    /**
     * The temperature reading at the mountain pass in degrees fahrenheit.
     */
    TemperatureInFahrenheit: z
      .int()
      .nullable()
      .describe(
        "The temperature reading at the mountain pass in degrees fahrenheit."
      ),
    /** The elevation of the mountain pass in feet. */
    ElevationInFeet: z
      .int()
      .describe("The elevation of the mountain pass in feet."),
    /** The weather conditions at the pass. */
    WeatherCondition: z
      .string()
      .nullable()
      .describe("The weather conditions at the pass."),
    /** The roadway conditions at the pass. */
    RoadCondition: z
      .string()
      .nullable()
      .describe("The roadway conditions at the pass."),
    /** Indicates if a travel advisory is active. */
    TravelAdvisoryActive: z
      .boolean()
      .describe("Indicates if a travel advisory is active."),
    /** The travel restriction in the primary direction. */
    RestrictionOne: travelRestrictionSchema
      .nullable()
      .describe("The travel restriction in the primary direction."),
    /** The travel restriction in the secondary direction. */
    RestrictionTwo: travelRestrictionSchema
      .nullable()
      .describe("The travel restriction in the secondary direction."),
  })
  .describe(
    "Schema for PassCondition - represents the conditions of a mountain pass"
  );

export type PassCondition = z.infer<typeof passConditionSchema>;
