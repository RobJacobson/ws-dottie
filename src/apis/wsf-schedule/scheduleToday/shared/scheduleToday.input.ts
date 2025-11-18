/**
 * @fileoverview WSF Schedule API Input Schemas for Schedule Today
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to today's schedule operations.
 */

import { z } from "@/shared/zod";

/**
 * Schema for TodaysScheduleByTerminalCombo input parameters
 *
 * This operation provides today's departure times for either a terminal combination or a route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. For the OnlyRemainingTimes value, please indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included in the resultset. */
export const scheduleTodayByTerminalsInputSchema = z
  .object({
    DepartingTerminalID: z
      .number()
      .describe("Numeric ID of the departing terminal."),
    ArrivingTerminalID: z
      .number()
      .describe("Numeric ID of the arriving terminal."),
    OnlyRemainingTimes: z
      .boolean()
      .describe(
        "True to show only remaining departures today; false to include all departures."
      ),
  })
  .describe(
    "Input parameters for retrieving today's schedule by terminal pair."
  );

export type ScheduleTodayByTerminalsInput = z.infer<
  typeof scheduleTodayByTerminalsInputSchema
>;

/**
 * Schema for TodaysScheduleByRoute input parameters
 *
 * This operation provides today's departure times for either a terminal combination or a route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. For the OnlyRemainingTimes value, please indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included in the resultset. */
export const scheduleTodayByRouteSchema = z
  .object({
    RouteID: z.number().describe("Numeric ID of the route."),
    OnlyRemainingTimes: z
      .boolean()
      .describe(
        "True to show only remaining departures today; false to include all departures."
      ),
  })
  .describe("Input parameters for retrieving today's schedule by route.");

export type ScheduleTodayByRouteInput = z.infer<
  typeof scheduleTodayByRouteSchema
>;
