/**
 * @fileoverview WSF Schedule API Output Schemas for Scheduled Routes
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API scheduled routes operations.
 */

import { zDotnetDate } from "@/apis/shared";
import { z } from "@/shared/zod";

/**
 * Schema for ContingencyAdj - represents contingency adjustment information
 */
export const contingencyAdjSchema = z
  .object({
    DateFrom: zDotnetDate().describe(
      "UTC datetime when the contingency adjustment period starts."
    ),
    DateThru: zDotnetDate().describe(
      "UTC datetime when the contingency adjustment period ends."
    ),
    EventID: z
      .number()
      .nullable()
      .describe("Numeric ID of the event prompting this adjustment."),
    EventDescription: z
      .string()
      .nullable()
      .describe("Description of the event that prompted this adjustment."),
    AdjType: z
      .union([z.literal(1), z.literal(2)])
      .describe(
        "Code indicating adjustment type: 1 = Addition, 2 = Cancellation."
      ),
    ReplacedBySchedRouteID: z
      .number()
      .nullable()
      .describe(
        "Numeric ID of the scheduled route replacing a cancelled route."
      ),
  })
  .describe(
    "Contingency adjustment defining service periods for contingency routes or cancellation periods for regular routes."
  );

export type ContingencyAdj = z.infer<typeof contingencyAdjSchema>;

/**
 * Contingency Adjs List Schema - represents an list of contingency adjustments
 */
export const contingencyAdjsListSchema = z
  .array(contingencyAdjSchema)
  .describe("Array of contingency adjustments.");

export type ContingencyAdjList = z.infer<typeof contingencyAdjsListSchema>;

/**
 * Schema for SchedRoute - represents scheduled route information
 */
export const schedRouteSchema = z
  .object({
    ScheduleID: z.number().describe("Numeric ID of the schedule season."),
    SchedRouteID: z.number().describe("Numeric ID of the scheduled route."),
    ContingencyOnly: z
      .boolean()
      .describe(
        "True if this is a contingency-only route active only during periods in ContingencyAdj; otherwise false. For contingency routes, ContingencyAdj defines active periods. For regular routes, ContingencyAdj may define cancellation periods."
      ),
    RouteID: z.number().describe("Numeric ID of the underlying route."),
    RouteAbbrev: z.string().describe("Abbreviation code for the route."),
    Description: z.string().describe("Display name of the scheduled route."),
    SeasonalRouteNotes: z
      .string()
      .nullable()
      .describe("HTML-formatted seasonal notes and special conditions."),
    RegionID: z
      .number()
      .describe("Numeric ID of the WSF region for this route."),
    ServiceDisruptions: z
      .array(
        z
          .object({
            BulletinID: z
              .number()
              .describe("Numeric ID of the service disruption bulletin."),
            BulletinFlag: z
              .boolean()
              .describe(
                "True if alert is also used as bulletin; otherwise false."
              ),
            PublishDate: zDotnetDate()
              .nullable()
              .describe(
                "UTC datetime when the disruption alert was published."
              ),
            DisruptionDescription: z
              .string()
              .describe("Text description of the service disruption."),
          })
          .describe(
            "Service disruption information affecting this scheduled route."
          )
      )
      .describe(
        "Array of service disruption alerts currently affecting this route."
      ),
    ContingencyAdj: contingencyAdjsListSchema.describe(
      "Array of contingency adjustments. For contingency routes, defines active periods. For regular routes, may define cancellation periods."
    ),
  })
  .describe(
    "Scheduled route information including schedule and route IDs, contingency flag, route details, seasonal notes, region, service disruptions, and contingency adjustments."
  );

export type SchedRoute = z.infer<typeof schedRouteSchema>;

/**
 * Sched Routes List Schema - represents an list of scheduled routes
 */
export const schedRoutesListSchema = z
  .array(schedRouteSchema)
  .describe("Array of scheduled routes.");

export type SchedRouteList = z.infer<typeof schedRoutesListSchema>;
