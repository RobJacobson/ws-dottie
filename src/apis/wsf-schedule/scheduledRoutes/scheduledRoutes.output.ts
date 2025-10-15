/**
 * @fileoverview WSF Schedule API Output Schemas for Scheduled Routes
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API scheduled routes operations.
 */

import { z } from "zod";

import { zDotnetDate } from "../shared/zDotnetDateSchema";

/**
 * Schema for ContingencyAdj - represents contingency adjustment information
 */
export const contingencyAdjSchema = z.object({
  /**
   * The precise date and time that the contingency adjustment starts.
   */
  DateFrom: zDotnetDate().describe(
    "The precise date and time that the contingency adjustment starts."
  ),
  /**
   * The precise date and time that the contingency adjustment ends.
   */
  DateThru: zDotnetDate().describe(
    "The precise date and time that the contingency adjustment ends."
  ),
  /** Unique identifier for an event. */
  EventID: z.number().nullable().describe("Unique identifier for an event."),
  /** Describes what prompted this contingency adjustment. */
  EventDescription: z
    .string()
    .nullable()
    .describe("Describes what prompted this contingency adjustment."),
  /**
   * Indicates whether this adjustment represents a cancellation or addition in service. 1 for Addition, 2 for Cancellation.
   */
  AdjType: z
    .union([z.literal(1), z.literal(2)])
    .describe(
      "Indicates whether this adjustment represents a cancellation or addition in service. 1 for Addition, 2 for Cancellation."
    ),
  /**
   * If this is a non-contingency route that's being cancelled (scheduled route where ContingencyOnly is false and the AdjType is 2) then this value reflects the unique identifier of the contingency scheduled route that's replacing it.
   */
  ReplacedBySchedRouteID: z
    .number()
    .nullable()
    .describe(
      "If this is a non-contingency route that's being cancelled (scheduled route where ContingencyOnly is false and the AdjType is 2) then this value reflects the unique identifier of the contingency scheduled route that's replacing it."
    ),
});

export type ContingencyAdj = z.infer<typeof contingencyAdjSchema>;

/**
 * Contingency Adjs List Schema - represents an list of contingency adjustments
 */
export const contingencyAdjsListSchema = z
  .array(contingencyAdjSchema)
  .describe(
    "This operation provides a listing of routes that are active for a season. For example, \"Anacortes / Sidney B.C.\" may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`."
  );

export type ContingencyAdjList = z.infer<typeof contingencyAdjsListSchema>;

/**
 * Schema for SchedRoute - represents scheduled route information
 */
export const schedRouteSchema = z.object({
  /** Unique identifier for a season. */
  ScheduleID: z.number().describe("Unique identifier for a season."),
  /** Unique identifier for a scheduled route. */
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
  /**
   * If true, see additions in the ContingencyAdj list for the periods of time this scheduled route is active. If false, this scheduled route operates the majority of the season (yet could still be replaced by contingencies specified in the ContingencyAdj list).
   */
  ContingencyOnly: z
    .boolean()
    .describe(
      "If true, see additions in the ContingencyAdj list for the periods of time this scheduled route is active. If false, this scheduled route operates the majority of the season (yet could still be replaced by contingencies specified in the ContingencyAdj list)."
    ),
  /** Unique identifier for the underlying route. */
  RouteID: z.number().describe("Unique identifier for the underlying route."),
  /** The underlying route's abbreviation. */
  RouteAbbrev: z.string().describe("The underlying route's abbreviation."),
  /** The full name of the scheduled route. */
  Description: z.string().describe("The full name of the scheduled route."),
  /** Notes for this scheduled route. */
  SeasonalRouteNotes: z
    .string()
    .nullable()
    .describe("Notes for this scheduled route."),
  /**
   * Unique identifier that identifies the region associated with the underlying route.
   */
  RegionID: z
    .number()
    .describe(
      "Unique identifier that identifies the region associated with the underlying route."
    ),
  /**
   * Service disruption alerts that are currently affecting the scheduled route.
   */
  ServiceDisruptions: z
    .array(
      z.object({
        /** Unique identifier for the alert. */
        BulletinID: z.number().describe("Unique identifier for the alert."),
        /**
         * A flag that, when true, indicates the alert is also being used as a bulletin.
         */
        BulletinFlag: z
          .boolean()
          .describe(
            "A flag that, when true, indicates the alert is also being used as a bulletin."
          ),
        /** The date the alert was published. */
        PublishDate: zDotnetDate()
          .nullable()
          .describe("The date the alert was published."),
        /** The service disruption text associated with the alert. */
        DisruptionDescription: z
          .string()
          .describe("The service disruption text associated with the alert."),
      })
    )
    .describe(
      "Service disruption alerts that are currently affecting the scheduled route."
    ),
  /**
   * Defines periods of service for contingency routes (scheduled routes marked as ContingencyOnly). For non-contingency routes (scheduled routes where ContingencyOnly is false) it might define date ranges where the scheduled route is not in service.
   */
  ContingencyAdj: contingencyAdjsListSchema.describe(
    "Defines periods of service for contingency routes (scheduled routes marked as ContingencyOnly). For non-contingency routes (scheduled routes where ContingencyOnly is false) it might define date ranges where the scheduled route is not in service."
  ),
});

export type SchedRoute = z.infer<typeof schedRouteSchema>;

/**
 * Sched Routes List Schema - represents an list of scheduled routes
 */
export const schedRoutesListSchema = z
  .array(schedRouteSchema)
  .describe(
    "This operation provides a listing of routes that are active for a season. For example, \"Anacortes / Sidney B.C.\" may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`."
  );

export type SchedRouteList = z.infer<typeof schedRoutesListSchema>;
