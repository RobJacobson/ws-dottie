import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack";

/**
 * Schema for schedule time response from WSF Schedule API.
 * Scheduled departure details, including departure times.
 */
export const scheduleTimeSchema = z.object({
  /** The date and time of the departure. */
  DepartingTime: zWsdotDate().describe("The date and time of the departure."),
  /** The date and time of the arrival. */
  ArrivingTime: zWsdotDate()
    .nullable()
    .describe("The date and time of the arrival."),
  /** Indicates which category of travelers are supported by this departure. */
  LoadingRule: z
    .union([z.literal(1), z.literal(2), z.literal(3)])
    .describe(
      "Indicates which category of travelers are supported by this departure (1 = Passenger, 2 = Vehicle, 3 = Both)."
    ),
  /** Unique identifier for the vessel that's planned to service this departure. */
  VesselID: z
    .number()
    .int()
    .describe(
      "Unique identifier for the vessel that's planned to service this departure."
    ),
  /** The name of the vessel that's planned to service this departure. */
  VesselName: z
    .string()
    .nullable()
    .describe(
      "The name of the vessel that's planned to service this departure."
    ),
  /** A flag that indicates whether or not the vessel that's planned to service this departure is ADA accessible. */
  VesselHandicapAccessible: z
    .boolean()
    .describe(
      "A flag that indicates whether or not the vessel that's planned to service this departure is ADA accessible."
    ),
  /** A number that represents a single vessel that services all of the stops in the journey. */
  VesselPositionNum: z
    .number()
    .int()
    .describe(
      "A number that represents a single vessel that services all of the stops in the journey."
    ),
  /** An array of RouteID integers representing the routes serviced by this departure. Will be either equal to or a subset of AllRoutes. */
  Routes: z
    .array(z.number().int())
    .nullable()
    .describe(
      "An array of RouteID integers representing the routes serviced by this departure. Will be either equal to or a subset of AllRoutes."
    ),
  /** An array of index integers indicating the elements in the Annotations array that apply to this departure. */
  AnnotationIndexes: z
    .array(z.number().int())
    .nullable()
    .describe(
      "An array of index integers indicating the elements in the Annotations array that apply to this departure."
    ),
});

export type ScheduleTime = z.infer<typeof scheduleTimeSchema>;

/**
 * Array of schedule times.
 */
export const scheduleTimesSchema = z
  .array(scheduleTimeSchema)
  .describe("Scheduled departure details, including departure times.");

export type ScheduleTimes = z.infer<typeof scheduleTimesSchema>;
