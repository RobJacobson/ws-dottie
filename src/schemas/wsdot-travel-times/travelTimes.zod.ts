import { z } from "zod";
import { zWsdotDate } from "@/shared/fetching/validation";
import { roadwayLocationSchema } from "@/schemas/shared/roadwayLocation.zod";

/**
 * TravelTimeRoute schema
 *
 * Data structure that represents a travel time route.
 */
export const travelTimeRouteSchema = z
  .object({
    /** Unique ID that is specific to a route. */
    TravelTimeID: z
      .number()
      .int()
      .describe("Unique ID that is specific to a route."),
    /** A friendly name for the route. */
    Name: z.string().describe("A friendly name for the route."),
    /** A description for the route. */
    Description: z.string().describe("A description for the route."),
    /** The last time that the data for this route was updated. */
    TimeUpdated: zWsdotDate().describe(
      "The last time that the data for this route was updated."
    ),
    /** The location where this route begins. */
    StartPoint: roadwayLocationSchema.describe(
      "The location where this route begins."
    ),
    /** The location where this route ends. */
    EndPoint: roadwayLocationSchema.describe(
      "The location where this route ends."
    ),
    /** Total distance of this route in miles. */
    Distance: z.number().describe("Total distance of this route in miles."),
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
  })
  .describe("Data structure that represents a travel time route.");

/**
 * TravelTimes schema
 *
 * Coverage Area: Seattle, Tacoma, Snoqualmie Pass. Provides travel times for many popular travel routes around Washington State.
 */
export const travelTimesSchema = z
  .array(travelTimeRouteSchema)
  .describe(
    "Coverage Area: Seattle, Tacoma, Snoqualmie Pass. Provides travel times for many popular travel routes around Washington State."
  );

/** TravelTimeRoute type */
export type TravelTimeRoute = z.infer<typeof travelTimeRouteSchema>;

/** TravelTimes type */
export type TravelTimes = z.infer<typeof travelTimesSchema>;
