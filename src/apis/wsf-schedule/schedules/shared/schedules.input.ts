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
        "Trip date in YYYY-MM-DD format. Must be within valid date range."
      ),
    DepartingTerminalID: z
      .number()
      .describe("Numeric ID of the departing terminal."),
    ArrivingTerminalID: z
      .number()
      .describe("Numeric ID of the arriving terminal."),
  })
  .describe(
    "Input parameters for retrieving schedule by trip date and terminal pair."
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
        "Trip date in YYYY-MM-DD format. Must be within valid date range."
      ),
    RouteID: z.number().describe("Numeric ID of the route."),
  })
  .describe("Input parameters for retrieving schedule by trip date and route.");

export type ScheduleByTripDateAndRouteIdInput = z.infer<
  typeof scheduleByTripDateAndRouteIdInputSchema
>;
