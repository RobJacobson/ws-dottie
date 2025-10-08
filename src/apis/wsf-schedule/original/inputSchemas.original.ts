/**
 * @fileoverview WSF Schedule API Input Schemas
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints.
 */

import { z } from "zod";

/**
 * Schema for ValidDateRange input parameters
 *
 * This operation retrieves a date range for which schedule data is currently published & available. */
export const validDateRangeSchema = z
  .object({})
  .describe(
    "This operation retrieves a date range for which schedule data is currently published & available."
  );

export type ValidDateRangeInput = z.infer<typeof validDateRangeSchema>;

/**
 * Schema for Terminals input parameters
 *
 * This operation retrieves valid departing terminals for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalsSchema = z
  .object({
    /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  })
  .describe(
    "This operation retrieves valid departing terminals for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type TerminalsInput = z.infer<typeof terminalsSchema>;

/**
 * Schema for TerminalsAndMates input parameters
 *
 * This operation retrieves all valid departing and arriving terminal combinations for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalsAndMatesSchema = z
  .object({
    /** The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01'). */
    TripDate: z
      .string()
      .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
  })
  .describe(
    "This operation retrieves all valid departing and arriving terminal combinations for a given trip date. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type TerminalsAndMatesInput = z.infer<typeof terminalsAndMatesSchema>;

/**
 * Schema for TerminalsAndMatesByRoute input parameters
 *
 * This operation provides valid departing and arriving terminal combinations for a given trip date and route. Valid routes may be found by using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014). */
export const terminalsAndMatesByRouteSchema = z
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
      .describe("The trip date in 'YYYY-MM-DD' format (e.g., '2014-04-01')."),
    /** Unique identifier for a terminal. */
    TerminalID: z.number().describe("Unique identifier for a terminal."),
  })
  .describe(
    "This operation provides arriving terminals for a given departing terminal and trip date. A valid departing terminal may be found by using `/terminals`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type TerminalMatesInput = z.infer<typeof terminalMatesSchema>;

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

/**
 * Schema for ActiveScheduledSeasons input parameters
 *
 * This operation retrieves a summary of active seasons. */
export const activeScheduledSeasonsSchema = z
  .object({})
  .describe("This operation retrieves a summary of active seasons.");

export type ActiveScheduledSeasonsInput = z.infer<
  typeof activeScheduledSeasonsSchema
>;

/**
 * Schema for SchedRoutes input parameters
 *
 * This operation provides a listing of routes that are active for a season. For example, "Anacortes / Sidney B.C." may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`. */
export const scheduledRoutesSchema = z
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

export type ScheduledRoutesInput = z.infer<typeof scheduledRoutesSchema>;
/**
 * Schema for SchedRoutes input parameters
 *
 * This operation provides a listing of routes that are active for a season. For example, "Anacortes / Sidney B.C." may be a valid route, but if it's not scheduled to run during Winter 2014, it won't be returned as part of the Winter 2014 scheduled routes resultset. Results will include all known scheduled routes spanning current and upcoming seasons or, alternatively, results can be filtered to only include scheduled routes for a specific season (when the season is specified with a ScheduleID value). Seasons may be determined using `/activeseasons`. */

export const scheduledRoutesByScheduleIdSchema = z
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

export type ScheduledRoutesByScheduleIdInput = z.infer<
  typeof scheduledRoutesByScheduleIdSchema
>;

/**
 * Schema for SchedSailingsBySchedRoute input parameters
 *
 * This operation provides sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`. */
export const sailingsByRouteIdSchema = z
  .object({
    /** Unique identifier for a scheduled route. */
    SchedRouteID: z
      .number()
      .describe("Unique identifier for a scheduled route."),
  })
  .describe(
    "This operation provides sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`."
  );

export type SailingsByRouteIdInput = z.infer<typeof sailingsByRouteIdSchema>;

/**
 * Schema for AllSchedSailingsBySchedRoute input parameters
 *
 * This operation provides all sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`. */
export const allSchedSailingsBySchedRouteSchema = z
  .object({
    /** Unique identifier for a scheduled route. */
    SchedRouteID: z
      .number()
      .describe("Unique identifier for a scheduled route."),
  })
  .describe(
    "This operation provides all sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`."
  );

export type AllSchedSailingsBySchedRouteInput = z.infer<
  typeof allSchedSailingsBySchedRouteSchema
>;

/**
 * Schema for TimeAdj input parameters
 *
 * This operation provides a listing of all additions and cancellations that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). */
export const timeAdjSchema = z
  .object({})
  .describe(
    "This operation provides a listing of all additions and cancellations that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014)."
  );

export type TimeAdjInput = z.infer<typeof timeAdjSchema>;

/**
 * Schema for TimeAdjByRoute input parameters
 *
 * This operation provides a listing of all additions and cancellations for a route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid route may be determined using `/routes`. */
export const timeAdjByRouteSchema = z
  .object({
    /** Unique identifier for a route. */
    RouteID: z.number().describe("Unique identifier for a route."),
  })
  .describe(
    "This operation provides a listing of all additions and cancellations for a route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid route may be determined using `/routes`."
  );

export type TimeAdjByRouteInput = z.infer<typeof timeAdjByRouteSchema>;

/**
 * Schema for TimeAdjBySchedRoute input parameters
 *
 * This operation provides a listing of all additions and cancellations for a scheduled route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid scheduled route may be determined using `/schedroutes`. */
export const timeAdjBySchedRouteSchema = z
  .object({
    /** Unique identifier for a scheduled route. */
    SchedRouteID: z
      .number()
      .describe("Unique identifier for a scheduled route."),
  })
  .describe(
    "This operation provides a listing of all additions and cancellations for a scheduled route that deviate on specific dates from the scheduled times found in the `/sailings` resultset (eg. tidal cancellations affecting Port Townsend departures on 9/9/2014). A valid scheduled route may be determined using `/schedroutes`."
  );

export type TimeAdjBySchedRouteInput = z.infer<
  typeof timeAdjBySchedRouteSchema
>;

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

/**
 * Schema for TodaysScheduleByTerminalCombo input parameters
 *
 * This operation provides today's departure times for either a terminal combination or a route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. For the OnlyRemainingTimes value, please indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included in the resultset. */
export const todaysScheduleByTerminalComboSchema = z
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

export type TodaysScheduleByTerminalComboInput = z.infer<
  typeof todaysScheduleByTerminalComboSchema
>;

/**
 * Schema for TodaysScheduleByRoute input parameters
 *
 * This operation provides today's departure times for either a terminal combination or a route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. For the OnlyRemainingTimes value, please indicate 'true' if departure times prior to now should not be included in the resultset and 'false' if they should be included in the resultset. */
export const scheduleTodayByRouteSchema = z
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

export type ScheduleTodayByRouteInput = z.infer<
  typeof scheduleTodayByRouteSchema
>;

/**
 * Schema for AllAlerts input parameters
 *
 * This operation provides alert information tailored for routes, bulletins, service disruptions, etc. */
export const allAlertsSchema = z
  .object({})
  .describe(
    "This operation provides alert information tailored for routes, bulletins, service disruptions, etc."
  );

export type AllAlertsInput = z.infer<typeof allAlertsSchema>;
