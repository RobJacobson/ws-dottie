/**
 * @fileoverview WSF Schedule API Input Schemas for Routes
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to route operations.
 */

import { z } from "@/shared/zod";

/**
 * Schema for Routes input parameters
 *
 * This operation retrieves the most basic / brief information pertaining to routes. If only a trip date is included in the URL string, all routes available for that date of travel are returned. If a trip date, departing terminal and arriving terminal are included then routes in the resultset are filtered to match accordingly. Valid departing and arriving terminals may be found using `/terminalsandmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const routesByTripDateInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date in YYYY-MM-DD format. Must be within valid date range from GetScheduleValidDateRange."
      ),
    DepartingTerminalID: z
      .number()
      .optional()
      .describe("Numeric ID of the departing terminal. Optional."),
    ArrivingTerminalID: z
      .number()
      .optional()
      .describe("Numeric ID of the arriving terminal. Optional."),
  })
  .describe(
    "Input parameters for routes endpoint. Trip date required; terminal IDs optional for filtering."
  );

export type RoutesByTripDateInput = z.infer<typeof routesByTripDateInputSchema>;

/**
 * Schema for RoutesHavingServiceDisruptions input parameters
 *
 * This operation retrieves the most basic / brief information for routes currently associated with service disruptions. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const routesHavingServiceDisruptionsByTripDateInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date in YYYY-MM-DD format. Must be within valid date range."
      ),
  })
  .describe(
    "Input parameters for retrieving routes with service disruptions by trip date."
  );

export type RoutesHavingServiceDisruptionsByTripDateInput = z.infer<
  typeof routesHavingServiceDisruptionsByTripDateInputSchema
>;

/**
 * Schema for RouteDetails input parameters
 *
 * This operation retrieves highly detailed information pertaining to routes. If only a trip date is included in the URL string, all routes available for that date of travel are returned. If a trip date, departing terminal and arriving terminal are included then routes in the resultset are filtered to match accordingly. Along the same lines, including only a trip date and route will filter the resultset to a single route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const routeDetailsSchema = z
  .object({
    /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe(
        "Trip date for which to retrieve detailed route information, as a date string in YYYY-MM-DD format. E.g., '2025-11-02' for November 2, 2025. Must be within valid date range from GetScheduleValidDateRange. Used to filter routes by trip date availability."
      ),
    /** Unique identifier for the departing terminal. */
    DepartingTerminalID: z
      .number()
      .optional()
      .describe(
        "Unique identifier for departing terminal, as an integer ID. E.g., '1' for Anacortes terminal, '3' for Bainbridge Island terminal. Use GetTerminalsAndMates to retrieve valid departing terminals. Used to filter routes by origin terminal. Optional - if omitted, returns all routes for trip date."
      ),
    /** Unique identifier for the arriving terminal. */
    ArrivingTerminalID: z
      .number()
      .optional()
      .describe(
        "Unique identifier for arriving terminal, as an integer ID. E.g., '10' for Friday Harbor terminal, '13' for Lopez Island terminal. Use GetTerminalsAndMates to retrieve valid arriving terminals. Used to filter routes by destination terminal. Optional - if omitted, returns all routes for trip date."
      ),
    /** Unique identifier for a route. */
    RouteID: z
      .number()
      .optional()
      .describe(
        "Unique identifier for route, as an integer ID. E.g., '9' for Anacortes/San Juan Islands route, '6' for Edmonds/Kingston route. Use GetRoutes to retrieve valid routes. Used to filter to specific route. Optional - if omitted, returns all routes matching other filters."
      ),
  })
  .describe(
    "Retrieves highly detailed route information for specified trip date, optionally filtered by terminal combination or route ID. Returns route details including descriptions, alerts, crossing times, and schedule information. Use GetScheduleValidDateRange to determine valid trip dates. Use for comprehensive route information and route-specific schedule queries."
  );

export type RouteDetailsInput = z.infer<typeof routeDetailsSchema>;

/**
 * Schema for RouteDetailsByTripDate input parameters
 *
 * This operation retrieves highly detailed information pertaining to routes for a specific trip date.
 */
export const routeDetailsByTripDateInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date in YYYY-MM-DD format. Must be within valid date range from GetScheduleValidDateRange."
      ),
  })
  .describe(
    "Input parameters for route details by trip date endpoint. Trip date required."
  );

export type RouteDetailsByTripDateInput = z.infer<
  typeof routeDetailsByTripDateInputSchema
>;

/**
 * Schema for RouteDetailsByTripDateAndRouteId input parameters
 *
 * This operation retrieves highly detailed information pertaining to a specific route for a specific trip date.
 */
export const routeDetailsByTripDateAndRouteIdInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date in YYYY-MM-DD format. Must be within valid date range from GetScheduleValidDateRange."
      ),
    RouteID: z.number().describe("Numeric ID of the route."),
  })
  .describe(
    "Input parameters for route details by trip date and route ID endpoint."
  );

export type RouteDetailsByTripDateAndRouteIdInput = z.infer<
  typeof routeDetailsByTripDateAndRouteIdInputSchema
>;

/**
 * Schema for RouteDetailsByTripDateAndTerminals input parameters
 *
 * This operation retrieves highly detailed information pertaining to routes for a specific trip date and terminal combination.
 */
export const routeDetailsByTripDateAndTerminalsInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date in YYYY-MM-DD format. Must be within valid date range from GetScheduleValidDateRange."
      ),
    DepartingTerminalID: z
      .number()
      .describe("Numeric ID of the departing terminal."),
    ArrivingTerminalID: z
      .number()
      .describe("Numeric ID of the arriving terminal."),
  })
  .describe(
    "Input parameters for route details by trip date and terminals endpoint."
  );

export type RouteDetailsByTripDateAndTerminalsInput = z.infer<
  typeof routeDetailsByTripDateAndTerminalsInputSchema
>;

/**
 * Schema for RoutesByTerminals input parameters
 *
 * This operation retrieves routes for a specific trip date and terminal combination.
 */
export const routesByTripDateAndTerminalsInputSchema = z
  .object({
    TripDate: z
      .string()
      .describe(
        "Trip date in YYYY-MM-DD format. Must be within valid date range from GetScheduleValidDateRange."
      ),
    DepartingTerminalID: z
      .number()
      .describe("Numeric ID of the departing terminal."),
    ArrivingTerminalID: z
      .number()
      .describe("Numeric ID of the arriving terminal."),
  })
  .describe("Input parameters for routes by trip date and terminals endpoint.");

export type RoutesByTripDateAndTerminalsInput = z.infer<
  typeof routesByTripDateAndTerminalsInputSchema
>;
