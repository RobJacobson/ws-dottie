import { z } from "zod";
import { roadwayLocationSchema } from "@/schemas/shared/roadwayLocation.zod";
import { zWsdotDate } from "@/shared/tanstack/validation";

/**
 * TravelTimeRoute schema
 *
 * Data structure that represents a travel time route.
 */
export const travelTimeRouteSchema = z
  .object({
    /** The average time in minutes that it takes to complete this route. */
    AverageTime: z
      .number()
      .int()
      .describe(
        "The average time in minutes that it takes to complete this route."
      ),
    /** The current estimated time in minutes that it takes to complete this route. */
    CurrentTime: z
      .number()
      .int()
      .describe(
        "The current estimated time in minutes that it takes to complete this route."
      ),
    /** A description for the route. */
    Description: z.string().nullable().describe("A description for the route."),
    /** Total distance of this route in miles. */
    Distance: z.number().describe("Total distance of this route in miles."),
    /** The location where this route ends. */
    EndPoint: roadwayLocationSchema
      .nullable()
      .describe("The location where this route ends."),
    /** A friendly name for the route. */
    Name: z.string().nullable().describe("A friendly name for the route."),
    /** The location where this route begins. */
    StartPoint: roadwayLocationSchema
      .nullable()
      .describe("The location where this route begins."),
    /** The last time that the data for this route was updated. */
    TimeUpdated: zWsdotDate().describe(
      "The last time that the data for this route was updated."
    ),
    /** Unique ID that is specific to a route. */
    TravelTimeID: z
      .number()
      .int()
      .describe("Unique ID that is specific to a route."),
  })
  .describe("Data structure that represents a travel time route.");

/** TravelTimeRoute type */
export type TravelTimeRoute = z.infer<typeof travelTimeRouteSchema>;

/**
 * Array of travel time routes.
 */
export const travelTimesSchema = z
  .array(travelTimeRouteSchema)
  .describe(
    "Coverage Area: Seattle, Tacoma, Snoqualmie Pass. Provides travel times for many popular travel routes around Washington State."
  );

export type TravelTimes = z.infer<typeof travelTimesSchema>;
