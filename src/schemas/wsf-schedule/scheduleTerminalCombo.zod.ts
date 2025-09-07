import { z } from "zod";
import { zWsdotDate } from "@/shared/tanstack/validation";

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
  /** Indicates which category of travelers are supported by this departure. 1 for Passenger, 2 for Vehicle and 3 for Both. */
  LoadingRule: z
    .number()
    .int()
    .describe(
      "Indicates which category of travelers are supported by this departure. 1 for Passenger, 2 for Vehicle and 3 for Both."
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
    .describe(
      "An array of RouteID integers representing the routes serviced by this departure. Will be either equal to or a subset of AllRoutes."
    ),
  /** An array of index integers indicating the elements in the Annotations array that apply to this departure. */
  AnnotationIndexes: z
    .array(z.number().int())
    .describe(
      "An array of index integers indicating the elements in the Annotations array that apply to this departure."
    ),
});

export type ScheduleTime = z.infer<typeof scheduleTimeSchema>;

/**
 * Array of schedule times.
 */
export const scheduleTimesArraySchema = z
  .array(scheduleTimeSchema)
  .describe("Scheduled departure details, including departure times.");

export type ScheduleTimesArray = z.infer<typeof scheduleTimesArraySchema>;

/**
 * Schema for terminal combo response from WSF Schedule API.
 * A grouping of departure and arrival terminal pairs.
 */
export const scheduleTerminalComboSchema = z.object({
  /** Unique identifier for the departing terminal. */
  DepartingTerminalID: z
    .number()
    .int()
    .describe("Unique identifier for the departing terminal."),
  /** The name of the departing terminal. */
  DepartingTerminalName: z
    .string()
    .describe("The name of the departing terminal."),
  /** Unique identifier for the arriving terminal. */
  ArrivingTerminalID: z
    .number()
    .int()
    .describe("Unique identifier for the arriving terminal."),
  /** The name of the arriving terminal. */
  ArrivingTerminalName: z
    .string()
    .describe("The name of the arriving terminal."),
  /** Informational text that might be associated with the underlying sailing. */
  SailingNotes: z
    .string()
    .describe(
      "Informational text that might be associated with the underlying sailing."
    ),
  /** An array of annotation strings assigned to one or more items in the Times array. */
  Annotations: z
    .array(z.string())
    .describe(
      "An array of annotation strings assigned to one or more items in the Times array."
    ),
  /** Scheduled departure details, including departure times. */
  Times: z
    .array(scheduleTimeSchema)
    .describe("Scheduled departure details, including departure times."),
  /** An array of annotation strings assigned to one or more items in the Times array formatted for IVR. */
  AnnotationsIVR: z
    .array(z.string())
    .describe(
      "An array of annotation strings assigned to one or more items in the Times array formatted for IVR."
    ),
});

export type ScheduleTerminalCombo = z.infer<typeof scheduleTerminalComboSchema>;

/**
 * Array of terminal combos.
 */
export const scheduleTerminalCombosArraySchema = z
  .array(scheduleTerminalComboSchema)
  .describe("A grouping of departure and arrival terminal pairs.");

export type ScheduleTerminalCombosArray = z.infer<
  typeof scheduleTerminalCombosArraySchema
>;
