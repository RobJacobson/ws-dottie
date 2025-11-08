import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";

/**
 * Schema for TravelRestriction - represents travel restrictions for mountain passes
 *
 * Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system. Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/).
 */
export const travelRestrictionSchema = z
  .object({
    RestrictionText: z
      .string()
      .nullable()
      .describe(
        "Text description of travel restriction for pass direction, as a restriction message. E.g., 'No restrictions' when pass is open, null when restriction text is unavailable. Provides details about vehicle restrictions, chain requirements, or closure information for specific travel direction."
      ),
    TravelDirection: z
      .string()
      .nullable()
      .describe(
        "Direction of travel for which restriction applies, as a direction code. E.g., 'Eastbound' for eastbound travel restriction, 'Westbound' for westbound travel restriction, null when direction is not specified. Indicates which direction of pass travel is restriction affects."
      ),
  })
  .describe(
    "Represents travel restriction information for mountain pass including restriction text and applicable travel direction. E.g., 'No restrictions' for Eastbound travel on White Pass. Used for direction-specific pass restriction tracking."
  );

export type TravelRestriction = z.infer<typeof travelRestrictionSchema>;

/**
 * Schema for PassCondition - represents conditions of a mountain pass
 *
 * Provides real-time data on pass conditions. The data is provided by the Mountain Pass Entry system. Coverage Area: 15 passes (see http://www.wsdot.wa.gov/traffic/passes/).
 */
export const passConditionSchema = z
  .object({
    MountainPassId: z
      .int()
      .describe(
        "Unique mountain pass identifier, as an integer ID. E.g., '12' for White Pass US 12. Used as primary key for pass condition lookups and pass identification."
      ),
    MountainPassName: z
      .string()
      .nullable()
      .describe(
        "Human-readable name for mountain pass, as a pass name. E.g., 'White Pass  US 12' for pass ID 12, null when pass name is unavailable. Provides pass identification for display and user interfaces."
      ),
    Latitude: z
      .number()
      .describe(
        "GPS latitude coordinate for mountain pass location, in decimal degrees. E.g., '46.638333' for White Pass."
      ),
    Longitude: z
      .number()
      .describe(
        "GPS longitude coordinate for mountain pass location, in decimal degrees. E.g., '-121.39' for White Pass."
      ),
    DateUpdated: zDotnetDate().describe(
      "Timestamp when pass condition data was last updated for public display, as a UTC datetime. E.g., '2025-11-02T15:57:09.547Z' for update on November 2, 2025 at 3:57 PM. Indicates data freshness and when condition information was last refreshed."
    ),
    TemperatureInFahrenheit: z
      .int()
      .nullable()
      .describe(
        "Current temperature reading at mountain pass, as degrees Fahrenheit. E.g., '34' for 34°F at White Pass, null when temperature reading is unavailable. Used for weather condition assessment and winter travel planning."
      ),
    ElevationInFeet: z
      .int()
      .nullable()
      .describe(
        "Elevation of mountain pass above sea level, as feet. E.g., '4500' for 4,500 feet elevation at White Pass. Used for understanding pass altitude and weather context."
      ),
    WeatherCondition: z
      .string()
      .nullable()
      .describe(
        "Current weather conditions at mountain pass, as a weather description. E.g., 'Overcast' for cloudy conditions at White Pass, null when weather condition is unavailable. Describes atmospheric conditions affecting pass travel."
      ),
    RoadCondition: z
      .string()
      .nullable()
      .describe(
        "Current roadway surface conditions at mountain pass, as a road condition description. E.g., 'Bare and wet with frost in places' for White Pass conditions, null when road condition is unavailable. Describes driving surface conditions for travel planning."
      ),
    TravelAdvisoryActive: z
      .boolean()
      .describe(
        "Indicator whether travel advisory is currently active for pass, as a boolean. E.g., true when advisory is active at White Pass, false when no advisory warnings. Used to determine if special travel conditions or warnings are in effect."
      ),
    RestrictionOne: travelRestrictionSchema
      .nullable()
      .describe(
        "Travel restriction information for primary direction of pass, as a travel restriction object. E.g., 'No restrictions' for Eastbound travel on White Pass, null when restriction information is unavailable. Provides primary direction restriction details."
      ),
    RestrictionTwo: travelRestrictionSchema
      .nullable()
      .describe(
        "Travel restriction information for secondary direction of pass, as a travel restriction object. E.g., 'No restrictions' for Westbound travel on White Pass, null when restriction information is unavailable. Provides secondary direction restriction details."
      ),
  })
  .describe(
    "Represents real-time mountain pass condition information including weather conditions, road surface conditions, temperature, elevation, travel restrictions by direction, and advisory status. E.g., White Pass US 12 (ID 12) at elevation 4,500 feet with temperature 34°F, overcast weather, bare and wet road conditions, no restrictions eastbound or westbound. Used for winter travel planning, pass condition monitoring, and route decision-making. Data updated periodically throughout the day, especially during winter months."
  );

export type PassCondition = z.infer<typeof passConditionSchema>;
