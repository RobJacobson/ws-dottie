import { z } from "zod";
import { zWsdotDate } from "@/shared/fetching/validation";
import { activeDateRangeSchema } from "./activeDateRange.zod";
import { annotationSchema } from "./annotation.zod";

/**
 * Schema for time adjustment response from WSF Schedule API.
 * This operation provides a listing of all additions and cancellations that deviate on specific dates from the scheduled times found in the /sailings resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014).
 * A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const timeAdjustmentSchema = z.object({
  /** Unique identifier for a season. */
  ScheduleID: z.number().int().describe("Unique identifier for a season."),
  /** Unique identifier for a scheduled route. */
  SchedRouteID: z
    .number()
    .int()
    .describe("Unique identifier for a scheduled route."),
  /** Unique identifier for the underlying route. */
  RouteID: z
    .number()
    .int()
    .describe("Unique identifier for the underlying route."),
  /** The full name of the route. */
  RouteDescription: z.string().describe("The full name of the route."),
  /** A preferred sort order (sort-ascending with respect to other routes). */
  RouteSortSeq: z
    .number()
    .int()
    .describe(
      "A preferred sort order (sort-ascending with respect to other routes)."
    ),
  /** Unique identifier for a sailing. */
  SailingID: z.number().int().describe("Unique identifier for a sailing."),
  /** A title that describes the sailing (eg. Leave Port Townsend). */
  SailingDescription: z
    .string()
    .describe("A title that describes the sailing (eg. Leave Port Townsend)."),
  /** A collection of date ranges detailing when this sailing is active. */
  ActiveSailingDateRange: z
    .array(activeDateRangeSchema)
    .describe(
      "A collection of date ranges detailing when this sailing is active."
    ),
  /** Indicates the direction of travel. 1 for Westbound, 2 for Eastbound. */
  SailingDir: z
    .number()
    .int()
    .describe(
      "Indicates the direction of travel. 1 for Westbound, 2 for Eastbound."
    ),
  /** Unique identifier for a journey. */
  JourneyID: z.number().int().describe("Unique identifier for a journey."),
  /** Unique identifier for the vessel that's planned to service this journey. */
  VesselID: z
    .number()
    .int()
    .describe(
      "Unique identifier for the vessel that's planned to service this journey."
    ),
  /** The name of the vessel that's planned to service this journey. */
  VesselName: z
    .string()
    .describe("The name of the vessel that's planned to service this journey."),
  /** A flag that indicates whether or not the vessel that's planned to service this journey is ADA accessible. */
  VesselHandicapAccessible: z
    .boolean()
    .describe(
      "A flag that indicates whether or not the vessel that's planned to service this journey is ADA accessible."
    ),
  /** A number that represents a single vessel that services all of the stops in the journey. */
  VesselPositionNum: z
    .number()
    .int()
    .describe(
      "A number that represents a single vessel that services all of the stops in the journey."
    ),
  /** Unique identifier for a terminal time. */
  JourneyTerminalID: z
    .number()
    .int()
    .describe("Unique identifier for a terminal time."),
  /** Unique identifier for a terminal. */
  TerminalID: z.number().int().describe("Unique identifier for a terminal."),
  /** The full name of the terminal. */
  TerminalDescription: z.string().describe("The full name of the terminal."),
  /** A brief / shortened name for the terminal. */
  TerminalBriefDescription: z
    .string()
    .describe("A brief / shortened name for the terminal."),
  /** The departure / arrival time that is either being added or cancelled. */
  TimeToAdj: zWsdotDate().describe(
    "The departure / arrival time that is either being added or cancelled."
  ),
  /** The starting trip date when the adjustment should be applied. */
  AdjDateFrom: zWsdotDate().describe(
    "The starting trip date when the adjustment should be applied."
  ),
  /** The ending trip date when the adjustment should be applied. If same as AdjDateFrom then the adjustment should only be applied to a single date. */
  AdjDateThru: zWsdotDate().describe(
    "The ending trip date when the adjustment should be applied. If same as AdjDateFrom then the adjustment should only be applied to a single date."
  ),
  /** Indicates whether or not the adjustment is a result of tidal conditions. */
  TidalAdj: z
    .boolean()
    .describe(
      "Indicates whether or not the adjustment is a result of tidal conditions."
    ),
  /** Unique identifier for an event. */
  EventID: z
    .number()
    .int()
    .nullable()
    .describe("Unique identifier for an event."),
  /** Explaination (if necessary) of this adjustment. */
  EventDescription: z
    .string()
    .nullable()
    .describe("Explaination (if necessary) of this adjustment."),
  /** Indicates whether this stop represents a departure or an arrival. 1 for Departure, 2 for Arrival. */
  DepArrIndicator: z
    .number()
    .int()
    .describe(
      "Indicates whether this stop represents a departure or an arrival. 1 for Departure, 2 for Arrival."
    ),
  /** Indicates whether this adjustment represents a cancellation or addition in service. 1 for Addition, 2 for Cancellation. */
  AdjType: z
    .number()
    .int()
    .describe(
      "Indicates whether this adjustment represents a cancellation or addition in service. 1 for Addition, 2 for Cancellation."
    ),
  /** Informational attributes associated with the departure / arrival time. */
  Annotations: z
    .array(annotationSchema)
    .describe(
      "Informational attributes associated with the departure / arrival time."
    ),
});

export type TimeAdjustment = z.infer<typeof timeAdjustmentSchema>;

/**
 * Array of time adjustments.
 */
export const timeAdjustmentsArraySchema = z
  .array(timeAdjustmentSchema)
  .describe(
    "All additions and cancellations that deviate on specific dates from the scheduled times found in the /sailings resultset."
  );

export type TimeAdjustmentsArray = z.infer<typeof timeAdjustmentsArraySchema>;
