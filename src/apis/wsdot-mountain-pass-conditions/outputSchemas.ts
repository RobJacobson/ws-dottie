import { z } from "zod";
import { zWsdotDate } from "@/apis/shared";

/**
 * Schema for TravelRestriction - represents travel restrictions for mountain passes
 */
export const TravelRestrictionSchema = z.object({
  RestrictionText: z
    .string()
    .nullable()
    .describe("The text of this restriction."),
  TravelDirection: z
    .string()
    .nullable()
    .describe("The direction of this restriction."),
});

export type TravelRestriction = z.infer<typeof TravelRestrictionSchema>;

/**
 * Schema for PassCondition - represents the conditions of a mountain pass
 */
export const PassConditionSchema = z.object({
  MountainPassId: z
    .number()
    .int()
    .describe("A unique identifier for a mountain pass."),
  MountainPassName: z
    .string()
    .nullable()
    .describe("A friendly name for a mountain pass."),
  Latitude: z.number().describe("The latitude of the mountain pass."),
  Longitude: z.number().describe("The longitude of the mountain pass."),
  DateUpdated: zWsdotDate().describe(
    "Date and time to display to public, DisplayDate in the database."
  ),
  TemperatureInFahrenheit: z
    .number()
    .int()
    .nullable()
    .describe(
      "The temperature reading at the mountain pass in degrees fahrenheit."
    ),
  ElevationInFeet: z
    .number()
    .int()
    .describe("The elevation of the mountain pass in feet."),
  WeatherCondition: z
    .string()
    .nullable()
    .describe("The weather conditions at the pass."),
  RoadCondition: z
    .string()
    .nullable()
    .describe("The roadway conditions at the pass."),
  TravelAdvisoryActive: z
    .boolean()
    .describe("Indicates if a travel advisory is active."),
  RestrictionOne: TravelRestrictionSchema.nullable().describe(
    "The travel restriction in the primary direction."
  ),
  RestrictionTwo: TravelRestrictionSchema.nullable().describe(
    "The travel restriction in the secondary direction."
  ),
});

export type PassCondition = z.infer<typeof PassConditionSchema>;

/**
 * Schema for array of PassCondition - represents all mountain pass conditions
 */
export const MountainPassConditionsSchema = z
  .array(PassConditionSchema)
  .describe(
    "Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/). Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system."
  );

export type MountainPassConditions = z.infer<
  typeof MountainPassConditionsSchema
>;
