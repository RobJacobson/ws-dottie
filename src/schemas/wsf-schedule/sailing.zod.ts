import { z } from "zod";
import { activeDateRangeSchema } from "./activeDateRange.zod";
import { journeySchema } from "./journey.zod";

/**
 * Schema for sailing response from WSF Schedule API.
 * This operation provides sailings for a particular scheduled route.
 * Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall).
 * Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule.
 * Scheduled routes may be determined using /schedroutes. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const sailingSchema = z.object({
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
  /** Unique identifier for a sailing. */
  SailingID: z.number().int().describe("Unique identifier for a sailing."),
  /** A title that describes the sailing (eg. Leave Port Townsend). */
  SailingDescription: z
    .string()
    .describe("A title that describes the sailing (eg. Leave Port Townsend)."),
  /** Informational text that might be associated with the sailing. */
  SailingNotes: z
    .string()
    .nullable()
    .describe("Informational text that might be associated with the sailing."),
  /** A suggested number of columns to use when rendering departures to a desktop webpage. */
  DisplayColNum: z
    .number()
    .int()
    .describe(
      "A suggested number of columns to use when rendering departures to a desktop webpage."
    ),
  /** Indicates the direction of travel. 1 for Westbound, 2 for Eastbound. */
  SailingDir: z
    .number()
    .int()
    .describe(
      "Indicates the direction of travel. 1 for Westbound, 2 for Eastbound."
    ),
  /** A days of operation grouping for the sailing (eg. "Daily"). */
  DayOpDescription: z
    .string()
    .describe('A days of operation grouping for the sailing (eg. "Daily").'),
  /** A flag that indicates whether or not the sailing should apply for holidays. */
  DayOpUseForHoliday: z
    .boolean()
    .describe(
      "A flag that indicates whether or not the sailing should apply for holidays."
    ),
  /** A collection of date ranges detailing when this sailing is active. */
  ActiveDateRanges: z
    .array(activeDateRangeSchema)
    .describe(
      "A collection of date ranges detailing when this sailing is active."
    ),
  /** A single vessel that stops at one or more terminals making a full trip in the direction described by the sailing. */
  Journs: z
    .array(journeySchema)
    .describe(
      "A single vessel that stops at one or more terminals making a full trip in the direction described by the sailing."
    ),
});

export type Sailing = z.infer<typeof sailingSchema>;

/**
 * Array of sailings.
 */
export const sailingsSchema = z
  .array(sailingSchema)
  .describe("The sailings for a particular scheduled route.");

export type Sailings = z.infer<typeof sailingsSchema>;
