/**
 * @fileoverview WSF Schedule API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints.
 */

import { z } from "zod";

/**
 * Schema for GetValidDateRange input parameters
 *
 * Used for retrieving the date range for which schedule data is available.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getValidDateRangeInputSchema = z.object({});

export type GetValidDateRangeInput = z.infer<
  typeof getValidDateRangeInputSchema
>;

/**
 * Schema for GetTerminals input parameters
 *
 * Used for retrieving valid departing terminals for a given trip date.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTerminalsInputSchema = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
});

export type GetTerminalsInput = z.infer<typeof getTerminalsInputSchema>;

/**
 * Schema for GetTerminalsAndMates input parameters
 *
 * Used for retrieving all valid departing and arriving terminal combinations
 * for a given trip date.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTerminalsAndMatesInputSchema = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
});

export type GetTerminalsAndMatesInput = z.infer<
  typeof getTerminalsAndMatesInputSchema
>;

/**
 * Schema for GetTerminalsAndMatesByRoute input parameters
 *
 * Used for retrieving valid departing and arriving terminal combinations
 * for a given trip date and route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTerminalsAndMatesByRouteInputSchema = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  /** Unique identifier for a route. */
  RouteID: z.number().describe("Unique identifier for a route."),
});

export type GetTerminalsAndMatesByRouteInput = z.infer<
  typeof getTerminalsAndMatesByRouteInputSchema
>;

/**
 * Schema for GetTerminalMates input parameters
 *
 * Used for retrieving arriving terminals for a given departing terminal
 * and trip date.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTerminalMatesInputSchema = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  /** Unique identifier for a terminal. */
  TerminalID: z.number().describe("Unique identifier for a terminal."),
});

export type GetTerminalMatesInput = z.infer<typeof getTerminalMatesInputSchema>;

/**
 * Schema for GetRoutes input parameters
 *
 * Used for retrieving route information. Can be filtered by terminal combination.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getRoutesInputSchema = z.object({
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
});

export type GetRoutesInput = z.infer<typeof getRoutesInputSchema>;

/**
 * Schema for GetRoutesHavingServiceDisruptions input parameters
 *
 * Used for retrieving routes currently associated with service disruptions.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getRoutesHavingServiceDisruptionsInputSchema = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
});

export type GetRoutesHavingServiceDisruptionsInput = z.infer<
  typeof getRoutesHavingServiceDisruptionsInputSchema
>;

/**
 * Schema for GetRouteDetails input parameters
 *
 * Used for retrieving detailed route information. Can be filtered by various criteria.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getRouteDetailsInputSchema = z.object({
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
});

export type GetRouteDetailsInput = z.infer<typeof getRouteDetailsInputSchema>;

/**
 * Schema for GetActiveScheduledSeasons input parameters
 *
 * Used for retrieving a summary of active seasons.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getActiveScheduledSeasonsInputSchema = z.object({});

export type GetActiveScheduledSeasonsInput = z.infer<
  typeof getActiveScheduledSeasonsInputSchema
>;

/**
 * Schema for GetSchedRoutes input parameters
 *
 * Used for retrieving scheduled routes. Can be filtered by season.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getSchedRoutesInputSchema = z.object({
  /** Unique identifier for a season. */
  ScheduleID: z.number().optional().describe("Unique identifier for a season."),
});

export type GetSchedRoutesInput = z.infer<typeof getSchedRoutesInputSchema>;

/**
 * Schema for GetSchedSailingsBySchedRoute input parameters
 *
 * Used for retrieving sailings for a particular scheduled route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getSchedSailingsBySchedRouteInputSchema = z.object({
  /** Unique identifier for a scheduled route. */
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
});

export type GetSchedSailingsBySchedRouteInput = z.infer<
  typeof getSchedSailingsBySchedRouteInputSchema
>;

/**
 * Schema for GetAllSchedSailingsBySchedRoute input parameters
 *
 * Used for retrieving all sailings for a particular scheduled route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getAllSchedSailingsBySchedRouteInputSchema = z.object({
  /** Unique identifier for a scheduled route. */
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
  /** Parameter Y for the request. */
  Y: z.number().describe("Parameter Y for the request."),
});

export type GetAllSchedSailingsBySchedRouteInput = z.infer<
  typeof getAllSchedSailingsBySchedRouteInputSchema
>;

/**
 * Schema for GetTimeAdj input parameters
 *
 * Used for retrieving time adjustments for all routes.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTimeAdjInputSchema = z.object({});

export type GetTimeAdjInput = z.infer<typeof getTimeAdjInputSchema>;

/**
 * Schema for GetTimeAdjByRoute input parameters
 *
 * Used for retrieving time adjustments for a specific route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTimeAdjByRouteInputSchema = z.object({
  /** Unique identifier for a route. */
  RouteID: z.number().describe("Unique identifier for a route."),
});

export type GetTimeAdjByRouteInput = z.infer<
  typeof getTimeAdjByRouteInputSchema
>;

/**
 * Schema for GetTimeAdjBySchedRoute input parameters
 *
 * Used for retrieving time adjustments for a specific scheduled route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTimeAdjBySchedRouteInputSchema = z.object({
  /** Unique identifier for a scheduled route. */
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
});

export type GetTimeAdjBySchedRouteInput = z.infer<
  typeof getTimeAdjBySchedRouteInputSchema
>;

/**
 * Schema for GetScheduleByTerminalCombo input parameters
 *
 * Used for retrieving schedule by terminal combination.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getScheduleByTerminalComboInputSchema = z.object({
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
});

export type GetScheduleByTerminalComboInput = z.infer<
  typeof getScheduleByTerminalComboInputSchema
>;

/**
 * Schema for GetScheduleByRoute input parameters
 *
 * Used for retrieving schedule by route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getScheduleByRouteInputSchema = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  /** Unique identifier for a route. */
  RouteID: z.number().describe("Unique identifier for a route."),
});

export type GetScheduleByRouteInput = z.infer<
  typeof getScheduleByRouteInputSchema
>;

/**
 * Schema for GetTodaysScheduleByTerminalCombo input parameters
 *
 * Used for retrieving today's schedule by terminal combination.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTodaysScheduleByTerminalComboInputSchema = z.object({
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
});

export type GetTodaysScheduleByTerminalComboInput = z.infer<
  typeof getTodaysScheduleByTerminalComboInputSchema
>;

/**
 * Schema for GetTodaysScheduleByRoute input parameters
 *
 * Used for retrieving today's schedule by route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTodaysScheduleByRouteInputSchema = z.object({
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
});

export type GetTodaysScheduleByRouteInput = z.infer<
  typeof getTodaysScheduleByRouteInputSchema
>;

/**
 * Schema for GetAllAlerts input parameters
 *
 * Used for retrieving alert information.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getAllAlertsInputSchema = z.object({});

export type GetAllAlertsInput = z.infer<typeof getAllAlertsInputSchema>;
