import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack/validation";
import { travelRestrictionSchema } from "./travelRestriction.zod";

/**
 * PassCondition schema
 *
 * A data structure that represents the conditions of the mountain pass.
 */
export const passConditionSchema = z
  .object({
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
    /** The latitude of the mountain pass. */
    Latitude: z.number().describe("The latitude of the mountain pass."),
    /** The longitude of the mountain pass. */
    Longitude: z.number().describe("The longitude of the mountain pass."),
    /** Date and time to display to public, DisplayDate in the database */
    DateUpdated: zWsdotDate().describe(
      "Date and time to display to public, DisplayDate in the database"
    ),
    /** The temperature reading at the mountain pass in degrees fahrenheit. */
    TemperatureInFahrenheit: z
      .number()
      .int()
      .nullable()
      .describe(
        "The temperature reading at the mountain pass in degrees fahrenheit."
      ),
    /** The elevation of the mountain pass in feet. */
    ElevationInFeet: z
      .number()
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
    "A data structure that represents the conditions of the mountain pass."
  );

/** PassCondition type */
export type PassCondition = z.infer<typeof passConditionSchema>;
