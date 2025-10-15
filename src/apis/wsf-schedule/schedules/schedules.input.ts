/**
 * @fileoverview WSF Schedule API Input Schemas for Schedules
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to schedule operations.
 */

import { z } from "zod";

/**
 * Schema for ScheduleByTerminalCombo input parameters
 *
 * This operation provides departure times for either a trip date and route or a trip date and terminal combination. The resultset accounts for all contingencies, sailing date ranges and time adjustments. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const scheduleByTerminalComboSchema = z
  .object({
    /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
    /** Unique identifier for the departing terminal. */
    DepartingTerminalID: z
      .number()
      .describe("Unique identifier for the departing terminal."),
    /** Unique identifier for the arriving terminal. */
    ArrivingTerminalID: z
      .number()
      .describe("Unique identifier for the arriving terminal."),
  })
  .describe(
    "This operation provides departure times for either a trip date and route or a trip date and terminal combination. The resultset accounts for all contingencies, sailing date ranges and time adjustments. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type ScheduleByTerminalComboInput = z.infer<
  typeof scheduleByTerminalComboSchema
>;

/**
 * Schema for ScheduleByRoute input parameters
 *
 * This operation provides departure times for either a trip date and route or a trip date and terminal combination. The resultset accounts for all contingencies, sailing date ranges and time adjustments. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const scheduleByRouteSchema = z
  .object({
    /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
    /** Unique identifier for a route. */
    RouteID: z.number().describe("Unique identifier for a route."),
  })
  .describe(
    "This operation provides departure times for either a trip date and route or a trip date and terminal combination. The resultset accounts for all contingencies, sailing date ranges and time adjustments. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type ScheduleByRouteInput = z.infer<typeof scheduleByRouteSchema>;
