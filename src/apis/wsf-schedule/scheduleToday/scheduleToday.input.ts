/**
 * @fileoverview WSF Schedule API Input Schemas for Schedule Today
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to today's schedule operations.
 */

import { z } from "zod";

/**
 * Schema for TodaysScheduleByTerminalCombo input parameters
 *
 * This operation provides today's departure times for either a terminal combination or a route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. For the OnlyRemainingTimes value, please indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included in the resultset. */
export const todaysScheduleByTerminalComboSchema = z
  .object({
    /** Unique identifier for the departing terminal. */
    DepartingTerminalID: z
      .number()
      .describe("Unique identifier for the departing terminal."),
    /** Unique identifier for the arriving terminal. */
    ArrivingTerminalID: z
      .number()
      .describe("Unique identifier for the arriving terminal."),
    /**
     * Indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included.
     */
    OnlyRemainingTimes: z
      .boolean()
      .describe(
        "Indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included."
      ),
  })
  .describe(
    "This operation provides today's departure times for either a terminal combination or a route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. For the OnlyRemainingTimes value, please indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included in the resultset."
  );

export type TodaysScheduleByTerminalComboInput = z.infer<
  typeof todaysScheduleByTerminalComboSchema
>;

/**
 * Schema for TodaysScheduleByRoute input parameters
 *
 * This operation provides today's departure times for either a terminal combination or a route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. For the OnlyRemainingTimes value, please indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included in the resultset. */
export const scheduleTodayByRouteSchema = z
  .object({
    /** Unique identifier for a route. */
    RouteID: z.number().describe("Unique identifier for a route."),
    /**
     * Indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included.
     */
    OnlyRemainingTimes: z
      .boolean()
      .describe(
        "Indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included."
      ),
  })
  .describe(
    "This operation provides today's departure times for either a terminal combination or a route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. For the OnlyRemainingTimes value, please indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included in the resultset."
  );

export type ScheduleTodayByRouteInput = z.infer<
  typeof scheduleTodayByRouteSchema
>;
