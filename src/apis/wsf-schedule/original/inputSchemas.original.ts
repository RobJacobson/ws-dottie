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
export const getValidDateRangeSchema = z.object({});

export type GetValidDateRangeInput = z.infer<typeof getValidDateRangeSchema>;

/**
 * Schema for GetTerminals input parameters
 *
 * Used for retrieving valid departing terminals for a given trip date.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTerminalsSchema = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
});

export type GetTerminalsInput = z.infer<typeof getTerminalsSchema>;

/**
 * Schema for GetTerminalsAndMates input parameters
 *
 * Used for retrieving all valid departing and arriving terminal combinations
 * for a given trip date.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTerminalsAndMatesSchema = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
});

export type GetTerminalsAndMatesInput = z.infer<
  typeof getTerminalsAndMatesSchema
>;

/**
 * Schema for GetTerminalsAndMatesByRoute input parameters
 *
 * Used for retrieving valid departing and arriving terminal combinations
 * for a given trip date and route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTerminalsAndMatesByRouteSchema = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  /** Unique identifier for a route. */
  RouteID: z.number().describe("Unique identifier for a route."),
});

export type GetTerminalsAndMatesByRouteInput = z.infer<
  typeof getTerminalsAndMatesByRouteSchema
>;

/**
 * Schema for GetTerminalMates input parameters
 *
 * Used for retrieving arriving terminals for a given departing terminal
 * and trip date.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTerminalMatesSchema = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  /** Unique identifier for a terminal. */
  TerminalID: z.number().describe("Unique identifier for a terminal."),
});

export type GetTerminalMatesInput = z.infer<typeof getTerminalMatesSchema>;

/**
 * Schema for GetRoutes input parameters
 *
 * Used for retrieving route information. Can be filtered by terminal combination.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getRoutesSchema = z.object({
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

export type GetRoutesInput = z.infer<typeof getRoutesSchema>;

/**
 * Schema for GetRoutesHavingServiceDisruptions input parameters
 *
 * Used for retrieving routes currently associated with service disruptions.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getRoutesHavingServiceDisruptionsSchema = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
});

export type GetRoutesHavingServiceDisruptionsInput = z.infer<
  typeof getRoutesHavingServiceDisruptionsSchema
>;

/**
 * Schema for GetRouteDetails input parameters
 *
 * Used for retrieving detailed route information. Can be filtered by various criteria.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getRouteDetailsSchema = z.object({
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

export type GetRouteDetailsInput = z.infer<typeof getRouteDetailsSchema>;

/**
 * Schema for GetActiveScheduledSeasons input parameters
 *
 * Used for retrieving a summary of active seasons.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getActiveScheduledSeasonsSchema = z.object({});

export type GetActiveScheduledSeasonsInput = z.infer<
  typeof getActiveScheduledSeasonsSchema
>;

/**
 * Schema for GetSchedRoutes input parameters
 *
 * Used for retrieving scheduled routes. Can be filtered by season.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getSchedRoutesSchema = z.object({
  /** Unique identifier for a season. */
  ScheduleID: z.number().optional().describe("Unique identifier for a season."),
});

export type GetSchedRoutesInput = z.infer<typeof getSchedRoutesSchema>;

/**
 * Schema for GetSchedSailingsBySchedRoute input parameters
 *
 * Used for retrieving sailings for a particular scheduled route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getSchedSailingsBySchedRouteSchema = z.object({
  /** Unique identifier for a scheduled route. */
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
});

export type GetSchedSailingsBySchedRouteInput = z.infer<
  typeof getSchedSailingsBySchedRouteSchema
>;

/**
 * Schema for GetAllSchedSailingsBySchedRoute input parameters
 *
 * Used for retrieving all sailings for a particular scheduled route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getAllSchedSailingsBySchedRouteSchema = z.object({
  /** Unique identifier for a scheduled route. */
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
  /** Parameter Y for the request. */
  Y: z.number().describe("Parameter Y for the request."),
});

export type GetAllSchedSailingsBySchedRouteInput = z.infer<
  typeof getAllSchedSailingsBySchedRouteSchema
>;

/**
 * Schema for GetTimeAdj input parameters
 *
 * Used for retrieving time adjustments for all routes.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTimeAdjSchema = z.object({});

export type GetTimeAdjInput = z.infer<typeof getTimeAdjSchema>;

/**
 * Schema for GetTimeAdjByRoute input parameters
 *
 * Used for retrieving time adjustments for a specific route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTimeAdjByRouteSchema = z.object({
  /** Unique identifier for a route. */
  RouteID: z.number().describe("Unique identifier for a route."),
});

export type GetTimeAdjByRouteInput = z.infer<typeof getTimeAdjByRouteSchema>;

/**
 * Schema for GetTimeAdjBySchedRoute input parameters
 *
 * Used for retrieving time adjustments for a specific scheduled route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTimeAdjBySchedRouteSchema = z.object({
  /** Unique identifier for a scheduled route. */
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
});

export type GetTimeAdjBySchedRouteInput = z.infer<
  typeof getTimeAdjBySchedRouteSchema
>;

/**
 * Schema for GetScheduleByTerminalCombo input parameters
 *
 * Used for retrieving schedule by terminal combination.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getScheduleByTerminalComboSchema = z.object({
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
  typeof getScheduleByTerminalComboSchema
>;

/**
 * Schema for GetScheduleByRoute input parameters
 *
 * Used for retrieving schedule by route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getScheduleByRouteSchema = z.object({
  /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  /** Unique identifier for a route. */
  RouteID: z.number().describe("Unique identifier for a route."),
});

export type GetScheduleByRouteInput = z.infer<typeof getScheduleByRouteSchema>;

/**
 * Schema for GetTodaysScheduleByTerminalCombo input parameters
 *
 * Used for retrieving today's schedule by terminal combination.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTodaysScheduleByTerminalComboSchema = z.object({
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
  typeof getTodaysScheduleByTerminalComboSchema
>;

/**
 * Schema for GetTodaysScheduleByRoute input parameters
 *
 * Used for retrieving today's schedule by route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getTodaysScheduleByRouteSchema = z.object({
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
  typeof getTodaysScheduleByRouteSchema
>;

/**
 * Schema for GetAllAlerts input parameters
 *
 * Used for retrieving alert information.
 * AccessCode is handled separately and not included in input schemas.
 */
export const getAllAlertsSchema = z.object({});

export type GetAllAlertsInput = z.infer<typeof getAllAlertsSchema>;
