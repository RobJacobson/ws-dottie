/**
 * @fileoverview WSF Schedule API Input Schemas for Routes
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to route operations.
 */

import { z } from "zod";

/**
 * Schema for Routes input parameters
 *
 * This operation retrieves the most basic / brief information pertaining to routes. If only a trip date is included in the URL string, all routes available for that date of travel are returned. If a trip date, departing terminal and arriving terminal are included then routes in the resultset are filtered to match accordingly. Valid departing and arriving terminals may be found using `/terminalsandmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const routesSchema = z
  .object({
    /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
    /** Unique identifier for the departing terminal. */
    DepartingTerminalID: z
      .number()
      .optional()
      .describe("Unique identifier for the departing terminal."),
    /** Unique identifier for the arriving terminal. */
    ArrivingTerminalID: z
      .number()
      .optional()
      .describe("Unique identifier for the arriving terminal."),
  })
  .describe(
    "This operation retrieves the most basic / brief information pertaining to routes. If only a trip date is included in the URL string, all routes available for that date of travel are returned. If a trip date, departing terminal and arriving terminal are included then routes in the resultset are filtered to match accordingly. Valid departing and arriving terminals may be found using `/terminalsandmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type RoutesInput = z.infer<typeof routesSchema>;

/**
 * Schema for RoutesHavingServiceDisruptions input parameters
 *
 * This operation retrieves the most basic / brief information for routes currently associated with service disruptions. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const routesHavingServiceDisruptionsSchema = z
  .object({
    /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  })
  .describe(
    "This operation retrieves the most basic / brief information for routes currently associated with service disruptions. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type RoutesHavingServiceDisruptionsInput = z.infer<
  typeof routesHavingServiceDisruptionsSchema
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
      .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
    /** Unique identifier for the departing terminal. */
    DepartingTerminalID: z
      .number()
      .optional()
      .describe("Unique identifier for the departing terminal."),
    /** Unique identifier for the arriving terminal. */
    ArrivingTerminalID: z
      .number()
      .optional()
      .describe("Unique identifier for the arriving terminal."),
    /** Unique identifier for a route. */
    RouteID: z.number().optional().describe("Unique identifier for a route."),
  })
  .describe(
    "This operation retrieves highly detailed information pertaining to routes. If only a trip date is included in the URL string, all routes available for that date of travel are returned. If a trip date, departing terminal and arriving terminal are included then routes in the resultset are filtered to match accordingly. Along the same lines, including only a trip date and route will filter the resultset to a single route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type RouteDetailsInput = z.infer<typeof routeDetailsSchema>;

/**
 * Schema for RouteDetailsByTripDate input parameters
 *
 * This operation retrieves highly detailed information pertaining to routes for a specific trip date.
 */
export const routeDetailsByTripDateSchema = z
  .object({
    /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  })
  .describe(
    "This operation retrieves highly detailed information pertaining to routes for a specific trip date."
  );

export type RouteDetailsByTripDateInput = z.infer<
  typeof routeDetailsByTripDateSchema
>;

/**
 * Schema for RouteDetailsByTripDateAndRouteId input parameters
 *
 * This operation retrieves highly detailed information pertaining to a specific route for a specific trip date.
 */
export const routeDetailsByTripDateAndRouteIdSchema = z
  .object({
    /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
    /** Unique identifier for a route. */
    RouteID: z.number().describe("Unique identifier for a route."),
  })
  .describe(
    "This operation retrieves highly detailed information pertaining to a specific route for a specific trip date."
  );

export type RouteDetailsByTripDateAndRouteIdInput = z.infer<
  typeof routeDetailsByTripDateAndRouteIdSchema
>;

/**
 * Schema for RouteDetailsByTripDateAndTerminals input parameters
 *
 * This operation retrieves highly detailed information pertaining to routes for a specific trip date and terminal combination.
 */
export const routeDetailsByTripDateAndTerminalsSchema = z
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
    "This operation retrieves highly detailed information pertaining to routes for a specific trip date and terminal combination."
  );

export type RouteDetailsByTripDateAndTerminalsInput = z.infer<
  typeof routeDetailsByTripDateAndTerminalsSchema
>;

/**
 * Schema for RoutesByTerminals input parameters
 *
 * This operation retrieves routes for a specific trip date and terminal combination.
 */
export const routesByTerminalsSchema = z
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
    "This operation retrieves routes for a specific trip date and terminal combination."
  );

export type RoutesByTerminalsInput = z.infer<typeof routesByTerminalsSchema>;
