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
 * This operation retrieves a date range for which schedule data is currently published & available. */
export const getValidDateRangeSchema = z
  .object({})
  .describe(
    "This operation retrieves a date range for which schedule data is currently published & available."
  );

export type GetValidDateRangeInput = z.infer<typeof getValidDateRangeSchema>;

/**
 * Schema for GetTerminals input parameters
 *
 * This operation retrieves valid departing terminals for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const getTerminalsSchema = z
  .object({
    /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  })
  .describe(
    "This operation retrieves valid departing terminals for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type GetTerminalsInput = z.infer<typeof getTerminalsSchema>;

/**
 * Schema for GetTerminalsAndMates input parameters
 *
 * This operation retrieves all valid departing and arriving terminal combinations for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const getTerminalsAndMatesSchema = z
  .object({
    /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  })
  .describe(
    "This operation retrieves all valid departing and arriving terminal combinations for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type GetTerminalsAndMatesInput = z.infer<
  typeof getTerminalsAndMatesSchema
>;

/**
 * Schema for GetTerminalsAndMatesByRoute input parameters
 *
 * This operation provides valid departing and arriving terminal combinations for a given trip date and route. Valid routes may be found by using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const getTerminalsAndMatesByRouteSchema = z
  .object({
    /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
    /** Unique identifier for a route. */
    RouteID: z.number().describe("Unique identifier for a route."),
  })
  .describe(
    "This operation provides valid departing and arriving terminal combinations for a given trip date and route. Valid routes may be found by using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type GetTerminalsAndMatesByRouteInput = z.infer<
  typeof getTerminalsAndMatesByRouteSchema
>;

/**
 * Schema for GetTerminalMates input parameters
 *
 * This operation provides arriving terminals for a given departing terminal and trip date. A valid departing terminal may be found by using `/terminals`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const getTerminalMatesSchema = z
  .object({
    /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
    /** Unique identifier for a terminal. */
    TerminalID: z.number().describe("Unique identifier for a terminal."),
  })
  .describe(
    "This operation provides arriving terminals for a given departing terminal and trip date. A valid departing terminal may be found by using `/terminals`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type GetTerminalMatesInput = z.infer<typeof getTerminalMatesSchema>;

/**
 * Schema for GetRoutes input parameters
 *
 * This operation retrieves the most basic / brief information pertaining to routes. If only a trip date is included in the URL string, all routes available for that date of travel are returned. If a trip date, departing terminal and arriving terminal are included then routes in the resultset are filtered to match accordingly. Valid departing and arriving terminals may be found using `/terminalsandmates`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const getRoutesSchema = z
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

export type GetRoutesInput = z.infer<typeof getRoutesSchema>;

/**
 * Schema for GetRoutesHavingServiceDisruptions input parameters
 *
 * This operation retrieves the most basic / brief information for routes currently associated with service disruptions. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const getRoutesHavingServiceDisruptionsSchema = z
  .object({
    /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  })
  .describe(
    "This operation retrieves the most basic / brief information for routes currently associated with service disruptions. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type GetRoutesHavingServiceDisruptionsInput = z.infer<
  typeof getRoutesHavingServiceDisruptionsSchema
>;

/**
 * Schema for GetRouteDetails input parameters
 *
 * This operation retrieves highly detailed information pertaining to routes. If only a trip date is included in the URL string, all routes available for that date of travel are returned. If a trip date, departing terminal and arriving terminal are included then routes in the resultset are filtered to match accordingly. Along the same lines, including only a trip date and route will filter the resultset to a single route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const getRouteDetailsSchema = z
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

export type GetRouteDetailsInput = z.infer<typeof getRouteDetailsSchema>;

/**
 * Schema for GetActiveScheduledSeasons input parameters
 *
 * This operation retrieves a summary of active seasons. */
export const getActiveScheduledSeasonsSchema = z
  .object({})
  .describe("This operation retrieves a summary of active seasons.");

export type GetActiveScheduledSeasonsInput = z.infer<
  typeof getActiveScheduledSeasonsSchema
>;

/**
 * Schema for GetSchedRoutes input parameters
 *
 * This operation provides a listing of routes that are active for a season. For example, "Anacortes / Sidney B.C." may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`. */
export const getSchedRoutesSchema = z
  .object({
    /** Unique identifier for a season. */
    ScheduleID: z
      .number()
      .optional()
      .describe("Unique identifier for a season."),
  })
  .describe(
    "This operation provides a listing of routes that are active for a season. For example, \"Anacortes / Sidney B.C.\" may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`."
  );

export type GetSchedRoutesInput = z.infer<typeof getSchedRoutesSchema>;

/**
 * Schema for GetSchedSailingsBySchedRoute input parameters
 *
 * This operation provides sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`. */
export const getSchedSailingsBySchedRouteSchema = z
  .object({
    /** Unique identifier for a scheduled route. */
    SchedRouteID: z
      .number()
      .describe("Unique identifier for a scheduled route."),
  })
  .describe(
    "This operation provides sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`."
  );

export type GetSchedSailingsBySchedRouteInput = z.infer<
  typeof getSchedSailingsBySchedRouteSchema
>;

/**
 * Schema for GetAllSchedSailingsBySchedRoute input parameters
 *
 * This operation provides all sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`. */
export const getAllSchedSailingsBySchedRouteSchema = z
  .object({
    /** Unique identifier for a scheduled route. */
    SchedRouteID: z
      .number()
      .describe("Unique identifier for a scheduled route."),
  })
  .describe(
    "This operation provides all sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`."
  );

export type GetAllSchedSailingsBySchedRouteInput = z.infer<
  typeof getAllSchedSailingsBySchedRouteSchema
>;

/**
 * Schema for GetTimeAdj input parameters
 *
 * This operation provides a listing of all additions and cancellations that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). */
export const getTimeAdjSchema = z
  .object({})
  .describe(
    "This operation provides a listing of all additions and cancellations that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014)."
  );

export type GetTimeAdjInput = z.infer<typeof getTimeAdjSchema>;

/**
 * Schema for GetTimeAdjByRoute input parameters
 *
 * This operation provides a listing of all additions and cancellations for a route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid route may be determined using `/routes`. */
export const getTimeAdjByRouteSchema = z
  .object({
    /** Unique identifier for a route. */
    RouteID: z.number().describe("Unique identifier for a route."),
  })
  .describe(
    "This operation provides a listing of all additions and cancellations for a route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid route may be determined using `/routes`."
  );

export type GetTimeAdjByRouteInput = z.infer<typeof getTimeAdjByRouteSchema>;

/**
 * Schema for GetTimeAdjBySchedRoute input parameters
 *
 * This operation provides a listing of all additions and cancellations for a scheduled route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid scheduled route may be determined using `/schedroutes`. */
export const getTimeAdjBySchedRouteSchema = z
  .object({
    /** Unique identifier for a scheduled route. */
    SchedRouteID: z
      .number()
      .describe("Unique identifier for a scheduled route."),
  })
  .describe(
    "This operation provides a listing of all additions and cancellations for a scheduled route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid scheduled route may be determined using `/schedroutes`."
  );

export type GetTimeAdjBySchedRouteInput = z.infer<
  typeof getTimeAdjBySchedRouteSchema
>;

/**
 * Schema for GetScheduleByTerminalCombo input parameters
 *
 * This operation provides departure times for either a trip date and route or a trip date and terminal combination. The resultset accounts for all contingencies, sailing date ranges and time adjustments. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const getScheduleByTerminalComboSchema = z
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

export type GetScheduleByTerminalComboInput = z.infer<
  typeof getScheduleByTerminalComboSchema
>;

/**
 * Schema for GetScheduleByRoute input parameters
 *
 * This operation provides departure times for either a trip date and route or a trip date and terminal combination. The resultset accounts for all contingencies, sailing date ranges and time adjustments. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const getScheduleByRouteSchema = z
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

export type GetScheduleByRouteInput = z.infer<typeof getScheduleByRouteSchema>;

/**
 * Schema for GetTodaysScheduleByTerminalCombo input parameters
 *
 * This operation provides today's departure times for either a terminal combination or a route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. For the OnlyRemainingTimes value, please indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included in the resultset. */
export const getTodaysScheduleByTerminalComboSchema = z
  .object({
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
  })
  .describe(
    "This operation provides today's departure times for either a terminal combination or a route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. For the OnlyRemainingTimes value, please indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included in the resultset."
  );

export type GetTodaysScheduleByTerminalComboInput = z.infer<
  typeof getTodaysScheduleByTerminalComboSchema
>;

/**
 * Schema for GetTodaysScheduleByRoute input parameters
 *
 * This operation provides today's departure times for either a terminal combination or a route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. For the OnlyRemainingTimes value, please indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included in the resultset. */
export const getTodaysScheduleByRouteSchema = z
  .object({
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
  })
  .describe(
    "This operation provides today's departure times for either a terminal combination or a route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. For the OnlyRemainingTimes value, please indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included in the resultset."
  );

export type GetTodaysScheduleByRouteInput = z.infer<
  typeof getTodaysScheduleByRouteSchema
>;

/**
 * Schema for GetAllAlerts input parameters
 *
 * This operation provides alert information tailored for routes, bulletins, service disruptions, etc. */
export const getAllAlertsSchema = z
  .object({})
  .describe(
    "This operation provides alert information tailored for routes, bulletins, service disruptions, etc."
  );

export type GetAllAlertsInput = z.infer<typeof getAllAlertsSchema>;
