import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";

export const travelRestrictionSchema = z
  .object({
    RestrictionText: z
      .string()
      .nullable()
      .describe(
        "Text description of travel restrictions for this direction, such as 'No restrictions', 'Closed for the season', or chain requirements."
      ),
    TravelDirection: z
      .string()
      .nullable()
      .describe(
        "Direction of travel for which this restriction applies, such as 'Eastbound', 'Westbound', 'Northbound', or 'Southbound'."
      ),
  })
  .describe(
    "Travel restriction information for a specific direction on a mountain pass, including restriction text and applicable travel direction."
  );

export type TravelRestriction = z.infer<typeof travelRestrictionSchema>;

export const passConditionSchema = z
  .object({
    MountainPassId: z.int().describe("Numeric ID of the mountain pass."),
    MountainPassName: z
      .string()
      .nullable()
      .describe("Display name of the mountain pass."),
    Latitude: z
      .number()
      .describe("Latitude of the mountain pass in decimal degrees."),
    Longitude: z
      .number()
      .describe("Longitude of the mountain pass in decimal degrees."),
    DateUpdated: zDotnetDate().describe(
      "UTC datetime when the pass condition data was last updated."
    ),
    TemperatureInFahrenheit: z
      .int()
      .nullable()
      .describe(
        "Current temperature at the mountain pass in degrees Fahrenheit."
      ),
    ElevationInFeet: z
      .int()
      .nullable()
      .describe("Elevation of the mountain pass above sea level in feet."),
    WeatherCondition: z
      .string()
      .nullable()
      .describe("Current weather conditions at the mountain pass."),
    RoadCondition: z
      .string()
      .nullable()
      .describe("Current roadway surface conditions at the mountain pass."),
    TravelAdvisoryActive: z
      .boolean()
      .describe(
        "True if a travel advisory is currently active for the pass; otherwise false."
      ),
    RestrictionOne: travelRestrictionSchema
      .nullable()
      .describe(
        "Travel restriction information for the primary direction of the pass."
      ),
    RestrictionTwo: travelRestrictionSchema
      .nullable()
      .describe(
        "Travel restriction information for the secondary direction of the pass."
      ),
  })
  .describe(
    "Real-time mountain pass condition information including weather, road surface conditions, temperature, elevation, travel restrictions by direction, and advisory status."
  );

export type PassCondition = z.infer<typeof passConditionSchema>;
