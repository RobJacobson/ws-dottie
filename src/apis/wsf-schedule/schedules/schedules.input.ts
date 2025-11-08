/**
 * @fileoverview WSF Schedule API Input Schemas for Schedules
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to schedule operations.
 */

import { z } from "@/shared/zod";

/**
 * Schema for ScheduleByTerminalCombo input parameters
 *
 * This operation provides departure times for either a trip date and route or a trip date and terminal combination. The resultset accounts for all contingencies, sailing date ranges and time adjustments. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const scheduleByTripDateAndTerminals = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date for schedule lookup, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025. Must be within valid date range from GetScheduleValidDateRange. Used to filter schedules by trip date."
      ),
    DepartingTerminalID: z
      .number()
      .describe(
        "Unique identifier for departing terminal, as an integer ID. E.g., '1' for Anacortes terminal, '10' for Friday Harbor terminal. Use GetTerminalsAndMates to retrieve valid departing terminals. Used to identify origin terminal for schedule lookup."
      ),
    ArrivingTerminalID: z
      .number()
      .describe(
        "Unique identifier for arriving terminal, as an integer ID. E.g., '13' for Lopez Island terminal, '15' for Orcas Island terminal. Use GetTerminalsAndMates to retrieve valid arriving terminals. Used to identify destination terminal for schedule lookup."
      ),
  })
  .describe(
    "Retrieves departure times for specified trip date and terminal combination, accounting for contingencies, sailing date ranges, and time adjustments. Returns scheduled departures with vessel information, loading rules, and annotations. Use GetTerminalsAndMates and GetScheduleValidDateRange to determine valid parameters. Use for terminal-pair schedule lookups."
  );

export type ScheduleByTripDateAndTerminalsInput = z.infer<
  typeof scheduleByTripDateAndTerminals
>;

/**
 * Schema for ScheduleByRoute input parameters
 *
 * This operation provides departure times for either a trip date and route or a trip date and terminal combination. The resultset accounts for all contingencies, sailing date ranges and time adjustments. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const scheduleByTripDateAndRouteIdInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date for schedule lookup, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025. Must be within valid date range from GetScheduleValidDateRange. Used to filter schedules by trip date."
      ),
    RouteID: z
      .number()
      .describe(
        "Unique identifier for route, as an integer ID. E.g., '9' for Anacortes/San Juan Islands route, '6' for Edmonds/Kingston route. Use GetRoutes to retrieve valid routes. Used to identify route for schedule lookup."
      ),
  })
  .describe(
    "Retrieves departure times for specified trip date and route, accounting for contingencies, sailing date ranges, and time adjustments. Returns scheduled departures for all terminal combinations on route with vessel information, loading rules, and annotations. Use GetRoutes and GetScheduleValidDateRange to determine valid parameters. Use for route-based schedule lookups."
  );

export type ScheduleByTripDateAndRouteIdInput = z.infer<
  typeof scheduleByTripDateAndRouteIdInputSchema
>;
