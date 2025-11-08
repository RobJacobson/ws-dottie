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
    /** Unique identifier for the departing terminal. */
    DepartingTerminalID: z
      .number()
      .describe(
        "Unique identifier for departing terminal, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Use GetTerminalsAndMates to retrieve valid departing terminals. Used to identify origin terminal for today's schedule."
      ),
    /** Unique identifier for the arriving terminal. */
    ArrivingTerminalID: z
      .number()
      .describe(
        "Unique identifier for arriving terminal, as an integer ID. E.g., '10' for Friday Harbor terminal, '13' for Lopez Island terminal. Use GetTerminalsAndMates to retrieve valid arriving terminals. Used to identify destination terminal for today's schedule."
      ),
    /**
     * Indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included.
     */
    OnlyRemainingTimes: z
      .boolean()
      .describe(
        "Filter flag controlling whether past departures are included, as a boolean. E.g., true to show only remaining departures today, false to include all departures including past ones. Used to filter schedule to only upcoming sailings when true."
      ),
  })
  .describe(
    "Retrieves today's departure times for specified terminal combination, returning sailing times, vessel information, and route details. Use GetTerminalsAndMates to find valid terminal combinations. Use for real-time schedule queries and today's sailing information."
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
    /** Unique identifier for a route. */
    RouteID: z
      .number()
      .describe(
        "Unique identifier for route, as an integer ID. E.g., '9' for Anacortes/San Juan Islands route, '6' for Edmonds/Kingston route. Use GetRoutes to retrieve valid routes. Used to identify route for today's schedule."
      ),
    /**
     * Indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included.
     */
    OnlyRemainingTimes: z
      .boolean()
      .describe(
        "Filter flag controlling whether past departures are included, as a boolean. E.g., true to show only remaining departures today, false to include all departures including past ones. Used to filter schedule to only upcoming sailings when true."
      ),
  })
  .describe(
    "Retrieves today's departure times for specified route, returning sailing times, vessel information, and terminal combinations. Use GetRoutes to find valid routes. Use for route-specific real-time schedule queries and today's sailing information."
  );

export type ScheduleTodayByRouteInput = z.infer<
  typeof scheduleTodayByRouteSchema
>;
