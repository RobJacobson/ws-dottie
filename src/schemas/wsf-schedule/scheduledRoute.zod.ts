import { z } from "zod";
import { contingencyAdjustmentSchema } from "./contingencyAdjustment.zod";
import { scheduleResponseSchema } from "./scheduleResponse.zod";

/**
 * Schema for scheduled route response from WSF Schedule API.
 * This operation provides a listing of routes that are active for a season.
 * For example, "Anacortes / Sidney B.C." may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset.
 * Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value).
 * Seasons may be determined using /activeseasons. A valid API Access Code from the WSDOT Traveler API must be passed as part of the URL string.
 */
export const scheduledRouteSchema = z.object({
  /** Unique identifier for a season. */
  ScheduleID: z.number().int().describe("Unique identifier for a season."),
  /** Unique identifier for a scheduled route. */
  SchedRouteID: z
    .number()
    .int()
    .describe("Unique identifier for a scheduled route."),
  /** If true, see additions in the ContingencyAdj array for the periods of time this scheduled route is active. If false, this scheduled route operates the majority of the season (yet could still be replaced by contingencies specified in the ContingencyAdj array). */
  ContingencyOnly: z
    .boolean()
    .describe(
      "If true, see additions in the ContingencyAdj array for the periods of time this scheduled route is active. If false, this scheduled route operates the majority of the season (yet could still be replaced by contingencies specified in the ContingencyAdj array)."
    ),
  /** Unique identifier for the underlying route. */
  RouteID: z
    .number()
    .int()
    .describe("Unique identifier for the underlying route."),
  /** The underlying route's abbreviation. */
  RouteAbbrev: z
    .string()
    .nullable()
    .describe("The underlying route's abbreviation."),
  /** The full name of the scheduled route. */
  Description: z
    .string()
    .nullable()
    .describe("The full name of the scheduled route."),
  /** Notes for this scheduled route. */
  SeasonalRouteNotes: z
    .string()
    .nullable()
    .describe("Notes for this scheduled route."),
  /** Unique identifier that identifies the region associated with the underlying route. */
  RegionID: z
    .number()
    .int()
    .describe(
      "Unique identifier that identifies the region associated with the underlying route."
    ),
  /** Service disruption alerts that are currently affecting the scheduled route. */
  ServiceDisruptions: z
    .array(scheduleResponseSchema)
    .nullable()
    .describe(
      "Service disruption alerts that are currently affecting the scheduled route."
    ),
  /** Defines periods of service for contingency routes (scheduled routes marked as ContingencyOnly). For non-contingency routes (scheduled routes where ContingencyOnly is false) it might define date ranges where the scheduled route is not in service. */
  ContingencyAdj: z
    .array(contingencyAdjustmentSchema)
    .nullable()
    .describe(
      "Defines periods of service for contingency routes (scheduled routes marked as ContingencyOnly). For non-contingency routes (scheduled routes where ContingencyOnly is false) it might define date ranges where the scheduled route is not in service."
    ),
});

export type ScheduledRoute = z.infer<typeof scheduledRouteSchema>;

/**
 * Array of scheduled routes.
 */
export const scheduledRoutesSchema = z
  .array(scheduledRouteSchema)
  .describe("The routes that are active for a season.");

export type ScheduledRoutes = z.infer<typeof scheduledRoutesSchema>;
