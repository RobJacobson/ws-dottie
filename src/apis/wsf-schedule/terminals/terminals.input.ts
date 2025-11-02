/**
 * @fileoverview WSF Schedule API Input Schemas for Terminals
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to terminal operations.
 */

import { z } from "zod";

/**
 * Schema for Terminals input parameters
 *
 * This operation retrieves valid departing terminals for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalsSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date for which to retrieve valid departing terminals, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025. Must be within valid date range from GetScheduleValidDateRange. Used to filter terminals by trip date availability."
      ),
  })
  .describe(
    "Retrieves valid departing terminals for specified trip date, returning terminal IDs and names. Use GetScheduleValidDateRange to determine valid trip dates. Use for schedule workflows to identify available origin terminals."
  );

export type ScheduleTerminalsInput = z.infer<typeof terminalsSchema>;

/**
 * Schema for TerminalsAndMates input parameters
 *
 * This operation retrieves all valid departing and arriving terminal combinations for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalsAndMatesSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date for which to retrieve all terminal combinations, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025. Must be within valid date range from GetScheduleValidDateRange. Used to filter terminal combinations by trip date availability."
      ),
  })
  .describe(
    "Retrieves all valid departing and arriving terminal combinations for specified trip date, returning all terminal pairs with IDs and names. Use GetScheduleValidDateRange to determine valid trip dates. Use for comprehensive terminal combination lookup."
  );

export type TerminalsAndMatesInput = z.infer<typeof terminalsAndMatesSchema>;

/**
 * Schema for TerminalsAndMatesByRoute input parameters
 *
 * This operation provides valid departing and arriving terminal combinations for a given trip date and route. Valid routes may be found by using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalsAndMatesByRouteSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date for which to retrieve terminal combinations, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025. Must be within valid date range from GetScheduleValidDateRange. Used to filter terminal combinations by trip date and route."
      ),
    RouteID: z
      .number()
      .describe(
        "Unique identifier for route, as an integer ID. E.g., '9' for Anacortes/San Juan Islands route. Use GetRoutes to retrieve valid routes. Used to filter terminal combinations by specific route."
      ),
  })
  .describe(
    "Retrieves valid departing and arriving terminal combinations for specified route and trip date, returning terminal pairs with IDs and names. Use GetRoutes to find valid routes and GetScheduleValidDateRange for valid trip dates. Use for route-specific terminal combination lookup."
  );

export type TerminalsAndMatesByRouteInput = z.infer<
  typeof terminalsAndMatesByRouteSchema
>;

/**
 * Schema for TerminalMates input parameters
 *
 * This operation provides arriving terminals for a given departing terminal and trip date. A valid departing terminal may be found by using `/terminals`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalMatesSchema = z
  .object({
    /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe(
        "Trip date for which to retrieve terminal mates, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025. Must be within valid date range from GetScheduleValidDateRange. Used to filter terminal mates by trip date availability."
      ),
    /** Unique identifier for a terminal. */
    TerminalID: z
      .number()
      .describe(
        "Unique identifier for departing terminal, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Use GetTerminals to retrieve valid departing terminals. Used to identify origin terminal for finding available destination terminals."
      ),
  })
  .describe(
    "Retrieves arriving terminals (terminal mates) available from specified departing terminal on specified trip date, returning terminal IDs and names. Use GetTerminals to find valid departing terminals and GetScheduleValidDateRange for valid trip dates. Use for discovering available destination terminals from a specific origin."
  );

export type ScheduleTerminalMatesInput = z.infer<typeof terminalMatesSchema>;
