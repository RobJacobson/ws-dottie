import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";
import { travelRestrictionSchema } from "./travelRestriction.zod";

/**
 * PassCondition schema
 *
 * A data structure that represents the conditions of the mountain pass.
 */
export const passConditionSchema = z
  .object({
    /** Date and time to display to public, DisplayDate in the database */
    DateUpdated: zWsdotDate().describe(
      "Date and time to display to public, DisplayDate in the database"
    ),
    /** The elevation of the mountain pass in feet. */
    ElevationInFeet: z
      .number()
      .int()
      .describe("The elevation of the mountain pass in feet."),
    /** The latitude of the mountain pass. */
    Latitude: z.number().describe("The latitude of the mountain pass."),
    /** The longitude of the mountain pass. */
    Longitude: z.number().describe("The longitude of the mountain pass."),
    /** A unique identifier for a mountain pass. */
    MountainPassId: z
      .number()
      .int()
      .describe("A unique identifier for a mountain pass."),
    /** A friendly name for a mountain pass. */
    MountainPassName: z
      .string()
      .nullable()
      .describe("A friendly name for a mountain pass."),
    /** The travel restriction in the primary direction. */
    RestrictionOne: travelRestrictionSchema
      .nullable()
      .describe("The travel restriction in the primary direction."),
    /** The travel restriction in the secondary direction. */
    RestrictionTwo: travelRestrictionSchema
      .nullable()
      .describe("The travel restriction in the secondary direction."),
    /** The roadway conditions at the pass. */
    RoadCondition: z
      .string()
      .nullable()
      .describe("The roadway conditions at the pass."),
    /** The temperature reading at the mountain pass in degrees fahrenheit. */
    TemperatureInFahrenheit: z
      .number()
      .int()
      .nullable()
      .describe(
        "The temperature reading at the mountain pass in degrees fahrenheit."
      ),
    /** Indicates if a travel advisory is active. */
    TravelAdvisoryActive: z
      .boolean()
      .describe("Indicates if a travel advisory is active."),
    /** The weather conditions at the pass. */
    WeatherCondition: z
      .string()
      .nullable()
      .describe("The weather conditions at the pass."),
  })
  .describe(
    "A data structure that represents the conditions of the mountain pass."
  );

/** PassCondition type */
export type PassCondition = z.infer<typeof passConditionSchema>;

/**
 * Array of mountain pass conditions.
 */
export const mountainPassConditionsSchema = z
  .array(passConditionSchema)
  .describe(
    "Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/). Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system."
  );

export type MountainPassConditions = z.infer<
  typeof mountainPassConditionsSchema
>;
