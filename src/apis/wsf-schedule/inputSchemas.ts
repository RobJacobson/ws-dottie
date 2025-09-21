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
export const GetValidDateRangeInputSchema = z.object({});

export type GetValidDateRangeInput = z.infer<
  typeof GetValidDateRangeInputSchema
>;

/**
 * Schema for GetTerminals input parameters
 *
 * Used for retrieving valid departing terminals for a given trip date.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetTerminalsInputSchema = z.object({
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
});

export type GetTerminalsInput = z.infer<typeof GetTerminalsInputSchema>;

/**
 * Schema for GetTerminalsAndMates input parameters
 *
 * Used for retrieving all valid departing and arriving terminal combinations
 * for a given trip date.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetTerminalsAndMatesInputSchema = z.object({
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
});

export type GetTerminalsAndMatesInput = z.infer<
  typeof GetTerminalsAndMatesInputSchema
>;

/**
 * Schema for GetTerminalsAndMatesByRoute input parameters
 *
 * Used for retrieving valid departing and arriving terminal combinations
 * for a given trip date and route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetTerminalsAndMatesByRouteInputSchema = z.object({
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  RouteID: z.number().describe("Unique identifier for a route."),
});

export type GetTerminalsAndMatesByRouteInput = z.infer<
  typeof GetTerminalsAndMatesByRouteInputSchema
>;

/**
 * Schema for GetTerminalMates input parameters
 *
 * Used for retrieving arriving terminals for a given departing terminal
 * and trip date.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetTerminalMatesInputSchema = z.object({
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  TerminalID: z.number().describe("Unique identifier for a terminal."),
});

export type GetTerminalMatesInput = z.infer<typeof GetTerminalMatesInputSchema>;

/**
 * Schema for GetRoutes input parameters
 *
 * Used for retrieving route information. Can be filtered by terminal combination.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetRoutesInputSchema = z.object({
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  DepartingTerminalID: z
    .number()
    .optional()
    .describe("Unique identifier for the departing terminal."),
  ArrivingTerminalID: z
    .number()
    .optional()
    .describe("Unique identifier for the arriving terminal."),
});

export type GetRoutesInput = z.infer<typeof GetRoutesInputSchema>;

/**
 * Schema for GetRoutesHavingServiceDisruptions input parameters
 *
 * Used for retrieving routes currently associated with service disruptions.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetRoutesHavingServiceDisruptionsInputSchema = z.object({
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
});

export type GetRoutesHavingServiceDisruptionsInput = z.infer<
  typeof GetRoutesHavingServiceDisruptionsInputSchema
>;

/**
 * Schema for GetRouteDetails input parameters
 *
 * Used for retrieving detailed route information. Can be filtered by various criteria.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetRouteDetailsInputSchema = z.object({
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  DepartingTerminalID: z
    .number()
    .optional()
    .describe("Unique identifier for the departing terminal."),
  ArrivingTerminalID: z
    .number()
    .optional()
    .describe("Unique identifier for the arriving terminal."),
  RouteID: z.number().optional().describe("Unique identifier for a route."),
});

export type GetRouteDetailsInput = z.infer<typeof GetRouteDetailsInputSchema>;

/**
 * Schema for GetActiveScheduledSeasons input parameters
 *
 * Used for retrieving a summary of active seasons.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetActiveScheduledSeasonsInputSchema = z.object({});

export type GetActiveScheduledSeasonsInput = z.infer<
  typeof GetActiveScheduledSeasonsInputSchema
>;

/**
 * Schema for GetSchedRoutes input parameters
 *
 * Used for retrieving scheduled routes. Can be filtered by season.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetSchedRoutesInputSchema = z.object({
  ScheduleID: z.number().optional().describe("Unique identifier for a season."),
});

export type GetSchedRoutesInput = z.infer<typeof GetSchedRoutesInputSchema>;

/**
 * Schema for GetSchedSailingsBySchedRoute input parameters
 *
 * Used for retrieving sailings for a particular scheduled route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetSchedSailingsBySchedRouteInputSchema = z.object({
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
});

export type GetSchedSailingsBySchedRouteInput = z.infer<
  typeof GetSchedSailingsBySchedRouteInputSchema
>;

/**
 * Schema for GetAllSchedSailingsBySchedRoute input parameters
 *
 * Used for retrieving all sailings for a particular scheduled route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetAllSchedSailingsBySchedRouteInputSchema = z.object({
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
  Y: z.number().describe("Parameter Y for the request."),
});

export type GetAllSchedSailingsBySchedRouteInput = z.infer<
  typeof GetAllSchedSailingsBySchedRouteInputSchema
>;

/**
 * Schema for GetTimeAdj input parameters
 *
 * Used for retrieving time adjustments for all routes.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetTimeAdjInputSchema = z.object({});

export type GetTimeAdjInput = z.infer<typeof GetTimeAdjInputSchema>;

/**
 * Schema for GetTimeAdjByRoute input parameters
 *
 * Used for retrieving time adjustments for a specific route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetTimeAdjByRouteInputSchema = z.object({
  RouteID: z.number().describe("Unique identifier for a route."),
});

export type GetTimeAdjByRouteInput = z.infer<
  typeof GetTimeAdjByRouteInputSchema
>;

/**
 * Schema for GetTimeAdjBySchedRoute input parameters
 *
 * Used for retrieving time adjustments for a specific scheduled route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetTimeAdjBySchedRouteInputSchema = z.object({
  SchedRouteID: z.number().describe("Unique identifier for a scheduled route."),
});

export type GetTimeAdjBySchedRouteInput = z.infer<
  typeof GetTimeAdjBySchedRouteInputSchema
>;

/**
 * Schema for GetScheduleByTerminalCombo input parameters
 *
 * Used for retrieving schedule by terminal combination.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetScheduleByTerminalComboInputSchema = z.object({
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  DepartingTerminalID: z
    .number()
    .describe("Unique identifier for the departing terminal."),
  ArrivingTerminalID: z
    .number()
    .describe("Unique identifier for the arriving terminal."),
});

export type GetScheduleByTerminalComboInput = z.infer<
  typeof GetScheduleByTerminalComboInputSchema
>;

/**
 * Schema for GetScheduleByRoute input parameters
 *
 * Used for retrieving schedule by route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetScheduleByRouteInputSchema = z.object({
  TripDate: z
    .string()
    .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  RouteID: z.number().describe("Unique identifier for a route."),
});

export type GetScheduleByRouteInput = z.infer<
  typeof GetScheduleByRouteInputSchema
>;

/**
 * Schema for GetTodaysScheduleByTerminalCombo input parameters
 *
 * Used for retrieving today's schedule by terminal combination.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetTodaysScheduleByTerminalComboInputSchema = z.object({
  DepartingTerminalID: z
    .number()
    .describe("Unique identifier for the departing terminal."),
  ArrivingTerminalID: z
    .number()
    .describe("Unique identifier for the arriving terminal."),
  OnlyRemainingTimes: z
    .boolean()
    .describe(
      "Indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included."
    ),
});

export type GetTodaysScheduleByTerminalComboInput = z.infer<
  typeof GetTodaysScheduleByTerminalComboInputSchema
>;

/**
 * Schema for GetTodaysScheduleByRoute input parameters
 *
 * Used for retrieving today's schedule by route.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetTodaysScheduleByRouteInputSchema = z.object({
  RouteID: z.number().describe("Unique identifier for a route."),
  OnlyRemainingTimes: z
    .boolean()
    .describe(
      "Indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included."
    ),
});

export type GetTodaysScheduleByRouteInput = z.infer<
  typeof GetTodaysScheduleByRouteInputSchema
>;

/**
 * Schema for GetAllAlerts input parameters
 *
 * Used for retrieving alert information.
 * AccessCode is handled separately and not included in input schemas.
 */
export const GetAllAlertsInputSchema = z.object({});

export type GetAllAlertsInput = z.infer<typeof GetAllAlertsInputSchema>;
