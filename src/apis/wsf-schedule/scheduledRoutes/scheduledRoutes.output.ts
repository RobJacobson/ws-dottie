/**
 * @fileoverview WSF Schedule API Output Schemas for Scheduled Routes
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API scheduled routes operations.
 */

import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod-openapi-init";

/**
 * Schema for ContingencyAdj - represents contingency adjustment information
 */
export const contingencyAdjSchema = z
  .object({
    DateFrom: zDotnetDate().describe(
      "Precise date and time when contingency adjustment starts, as a UTC datetime. E.g., '2025-11-15T08:00:00.000Z' for adjustment starting November 15, 2025. Indicates when contingency period begins."
    ),
    DateThru: zDotnetDate().describe(
      "Precise date and time when contingency adjustment ends, as a UTC datetime. E.g., '2025-11-20T08:00:00.000Z' for adjustment ending November 20, 2025. Indicates when contingency period ends."
    ),
    EventID: z
      .number()
      .nullable()
      .describe(
        "Unique identifier for event prompting contingency adjustment, as an integer ID. E.g., null when no specific event triggers adjustment. Used to link adjustment to specific events or contingencies."
      ),
    EventDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable description of what prompted contingency adjustment, as an event description. E.g., null when description is unavailable, description when adjustment relates to specific events. Provides context for why contingency adjustment exists."
      ),
    AdjType: z
      .union([z.literal(1), z.literal(2)])
      .describe(
        "Type of contingency adjustment, as an adjustment type code. Valid values: 1 (Addition), 2 (Cancellation). E.g., '1' indicates service addition, '2' indicates service cancellation. Used to determine if adjustment adds or removes service."
      ),
    ReplacedBySchedRouteID: z
      .number()
      .nullable()
      .describe(
        "Unique identifier for contingency scheduled route replacing cancelled non-contingency route, as an integer ID. E.g., null when route is not being replaced, scheduled route ID when non-contingency route (ContingencyOnly false) is cancelled (AdjType 2) and replaced by contingency route. Used to identify replacement route for cancelled service."
      ),
  })
  .describe(
    "Represents contingency adjustment information including start/end dates, event details, adjustment type, and replacement route ID. E.g., cancellation adjustment (type 2) from November 15-20, 2025 with replacement route. Used for tracking service modifications and contingency periods."
  );

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
export const schedRouteSchema = z
  .object({
    ScheduleID: z
      .number()
      .describe(
        "Unique schedule season identifier, as an integer ID. E.g., '193' for Fall 2025 schedule. Used to identify which schedule season this scheduled route belongs to."
      ),
    SchedRouteID: z
      .number()
      .describe(
        "Unique scheduled route identifier, as an integer ID. E.g., '2401' for Anacortes/San Juan Islands route in Fall 2025, '2383' for Port Townsend/Coupeville route. Used as primary key for scheduled route identification."
      ),
    ContingencyOnly: z
      .boolean()
      .describe(
        "Indicator whether scheduled route is contingency-only, as a boolean. E.g., false for regular routes operating majority of season, true for contingency routes active only during periods specified in ContingencyAdj list. For contingency routes, see ContingencyAdj additions for active periods. For non-contingency routes, ContingencyAdj may define cancellation periods. Used to determine route type and operation pattern."
      ),
    RouteID: z
      .number()
      .describe(
        "Unique identifier for underlying route, as an integer ID. E.g., '9' for Anacortes/San Juan Islands route, '8' for Port Townsend/Coupeville route. Used to identify base route for scheduled route."
      ),
    RouteAbbrev: z
      .string()
      .describe(
        "Abbreviation code for underlying route, as a route identifier. E.g., 'ana-sj' for Anacortes/San Juan Islands, 'pt-key' for Port Townsend/Coupeville, 'muk-cl' for Mukilteo/Clinton. Used for compact route identification."
      ),
    Description: z
      .string()
      .describe(
        "Human-readable full name of scheduled route, as a route description. E.g., 'Anacortes / San Juan Islands' for route 9, 'Port Townsend / Coupeville' for route 8, 'Mukilteo / Clinton' for route 7. Provides route identification for display."
      ),
    SeasonalRouteNotes: z
      .string()
      .nullable()
      .describe(
        "Notes and information for scheduled route during season, as seasonal notes. E.g., 'The Anacortes-San Juan Islands route will operate its regular schedule on Thanksgiving and Christmas.' for holiday notes, HTML-formatted notes for Port Townsend/Coupeville route, null when notes are unavailable. Provides seasonal route information and special conditions."
      ),
    RegionID: z
      .number()
      .describe(
        "Unique identifier for WSF region associated with underlying route, as an integer ID. E.g., '1' for region 1 routes, '2' for region 2 routes. Used for regional route organization."
      ),
    ServiceDisruptions: z
      .array(
        z
          .object({
            BulletinID: z
              .number()
              .describe(
                "Unique bulletin/alert identifier, as an integer ID. Used to identify specific service disruption bulletin. Used as primary key for disruption identification."
              ),
            BulletinFlag: z
              .boolean()
              .describe(
                "Indicator whether alert is also used as bulletin, as a boolean. E.g., true when alert serves dual purpose as bulletin, false when alert is disruption-only. Used to determine if disruption should be displayed as bulletin."
              ),
            PublishDate: zDotnetDate()
              .nullable()
              .describe(
                "Date when service disruption alert was published, as a UTC datetime. E.g., null when publish date is unavailable. Indicates when disruption information was made public."
              ),
            DisruptionDescription: z
              .string()
              .describe(
                "Text description of service disruption, as a disruption description. E.g., disruption text explaining route modifications, delays, or service changes. Provides details about service disruption affecting scheduled route."
              ),
          })
          .describe(
            "Represents service disruption information including bulletin ID, bulletin flag, publish date, and disruption description. Used for tracking and displaying service disruptions affecting scheduled routes."
          )
      )
      .describe(
        "Array of service disruption alerts currently affecting scheduled route, as service disruption objects. E.g., empty array when no disruptions, array containing disruption details when route is affected. Used for identifying scheduled routes with active service disruptions."
      ),
    ContingencyAdj: contingencyAdjsListSchema.describe(
      "Array of contingency adjustments defining service periods for contingency routes or cancellation periods for non-contingency routes, as contingency adjustment objects. E.g., empty array for regular routes, array containing active periods for contingency routes. For contingency routes (ContingencyOnly true), defines when route is active. For non-contingency routes (ContingencyOnly false), may define cancellation periods. Used for tracking service modifications and contingency periods."
    ),
  })
  .describe(
    "Represents scheduled route information including schedule/route IDs, contingency flag, route details, seasonal notes, region, service disruptions, and contingency adjustments. E.g., scheduled route 2401 (Anacortes/San Juan Islands, route 9) in Fall 2025 schedule with no disruptions. Used for route discovery, route identification, and schedule management."
  );

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
