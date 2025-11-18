/**
 * @fileoverview WSF Schedule API Input Schemas for Terminals
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to terminal operations.
 */

import type {
  TerminalMatesInput as SharedTerminalMatesInput,
  TerminalsInput as SharedTerminalsInput,
} from "@/apis/shared/terminals.input";
import {
  terminalMatesInputSchema as sharedTerminalMatesInputSchema,
  terminalsInputSchema as sharedTerminalsInputSchema,
} from "@/apis/shared/terminals.input";
import { z } from "@/shared/zod";

/**
 * Schema for Terminals input parameters
 *
 * This operation retrieves valid departing terminals for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalsInputSchema = sharedTerminalsInputSchema;
export type TerminalsInput = SharedTerminalsInput;

/**
 * Schema for TerminalsAndMates input parameters
 *
 * This operation retrieves all valid departing and arriving terminal combinations for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalsAndMatesInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date for which to retrieve all terminal combinations, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025. Must be within valid date range from GetScheduleValidDateRange. Used to filter terminal combinations by trip date availability."
      ),
  })
  .describe(
    "Input parameters for retrieving all valid terminal pairs for a trip date."
  );

export type TerminalsAndMatesInput = z.infer<
  typeof terminalsAndMatesInputSchema
>;

/**
 * Schema for TerminalsAndMatesByRoute input parameters
 *
 * This operation provides valid departing and arriving terminal combinations for a given trip date and route. Valid routes may be found by using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalsAndMatesByRouteInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date in YYYY-MM-DD format. Must be within valid date range from GetScheduleValidDateRange."
      ),
    RouteID: z.number().describe("Numeric ID of the route."),
  })
  .describe(
    "Input parameters for retrieving valid terminal pairs for a specific route and trip date."
  );

export type TerminalsAndMatesByRouteInput = z.infer<
  typeof terminalsAndMatesByRouteInputSchema
>;

/**
 * Schema for TerminalMates input parameters
 *
 * This operation provides arriving terminals for a given departing terminal and trip date. A valid departing terminal may be found by using `/terminals`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalMatesScheduleInputSchema = sharedTerminalMatesInputSchema;
export type TerminalMatesScheduleInput = SharedTerminalMatesInput;
