/**
 * @fileoverview WSF Schedule API Output Schemas for Routes
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API route operations.
 */

import { z } from "zod";

import { zDotnetDate } from "@/apis/shared";

/**
 * Base route schema containing common route fields
 */
export const routeBaseSchema = z
  .object({
    RouteID: z
      .number()
      .describe(
        "Unique route identifier, as an integer ID. E.g., '9' for Anacortes/San Juan Islands route, '6' for Edmonds/Kingston route, '13' for Fauntleroy/Southworth route. Used as primary key for route identification and lookups."
      ),
    RouteAbbrev: z
      .string()
      .nullable()
      .describe(
        "Route abbreviation code, as a route identifier. E.g., 'ana-sj' for Anacortes/San Juan Islands, 'ed-king' for Edmonds/Kingston, 'f-s' for Fauntleroy/Southworth, 'f-v-s' for Fauntleroy/Vashon, 'muk-cl' for Mukilteo/Clinton, null when abbreviation is unavailable. Used for compact route identification in displays and URLs."
      ),
    Description: z
      .string()
      .nullable()
      .describe(
        "Human-readable full route name, as a route description. E.g., 'Anacortes / San Juan Islands' for route 9, 'Edmonds / Kingston' for route 6, 'Fauntleroy (West Seattle) / Southworth' for route 13, null when description is unavailable. Provides route identification for display and user interfaces."
      ),
    RegionID: z
      .number()
      .describe(
        "Unique identifier for WSF region associated with route, as an integer ID. E.g., '1' for region 1 routes, '3' for region 3 routes, '5' for region 5 routes. Used for regional route organization and filtering."
      ),
  })
  .describe(
    "Represents base route information including route identifier, abbreviation, description, and region association. E.g., route 9 (ana-sj, Anacortes/San Juan Islands) in region 1. Used as foundation schema shared across route-related endpoints."
  );

export type RouteBase = z.infer<typeof routeBaseSchema>;

/**
 * Schema for ServiceDisruption - represents service disruption information
 */
export const serviceDisruptionSchema = z
  .object({
    BulletinID: z
      .number()
      .describe(
        "Unique bulletin/alert identifier, as an integer ID. Used to identify specific service disruption bulletin. Used as primary key for disruption identification."
      ),
    BulletinFlag: z
      .boolean()
      .describe(
        "Indicator whether alert is also used as bulletin, as a boolean. E.g., true when alert serves dual purpose as bulletin, false when alert is disruption-only. Used to determine if disruption should be displayed as bulletin."
      ),
    PublishDate: zDotnetDate()
      .nullable()
      .describe(
        "Date when service disruption alert was published, as a UTC datetime. E.g., null when publish date is unavailable. Indicates when disruption information was made public."
      ),
    DisruptionDescription: z
      .string()
      .describe(
        "Text description of service disruption, as a disruption description. E.g., disruption text explaining route modifications, delays, or service changes. Provides details about service disruption affecting route."
      ),
  })
  .describe(
    "Represents service disruption information including bulletin ID, bulletin flag, publish date, and disruption description. Used for tracking and displaying service disruptions affecting routes."
  );

export type ServiceDisruption = z.infer<typeof serviceDisruptionSchema>;

/**
 * Service Disruptions List Schema - represents an list of service disruptions
 */
export const serviceDisruptionsListSchema = z
  .array(serviceDisruptionSchema)
  .describe(
    "Array of service disruption information including bulletin IDs, bulletin flags, publish dates, and disruption descriptions. E.g., array containing disruption details for routes affected by service modifications, delays, or route changes. Used for tracking and displaying service disruptions affecting routes."
  );

export type ServiceDisruptionList = z.infer<
  typeof serviceDisruptionsListSchema
>;

/**
 * Schema for Route - represents basic route information
 */
export const routeSchema = routeBaseSchema
  .extend({
    ServiceDisruptions: serviceDisruptionsListSchema
      .nullable()
      .describe(
        "Array of service disruption alerts currently affecting route, as service disruption objects. E.g., empty array when no disruptions, array containing disruption details when route is affected, null when disruption information is unavailable. Used for identifying routes with active service disruptions."
      ),
  })
  .describe(
    "Represents basic route information including route identification, abbreviation, description, region association, and service disruptions. E.g., route 9 (ana-sj, Anacortes/San Juan Islands) in region 1 with no service disruptions. Used for route discovery, route identification, and disruption awareness."
  );

export type Route = z.infer<typeof routeSchema>;

/**
 * Schema for Alert - represents alert information
 */
export const alertSchema = z
  .object({
    BulletinID: z
      .number()
      .describe(
        "Unique bulletin/alert identifier, as an integer ID. Used to identify specific alert bulletin. Used as primary key for alert identification."
      ),
    BulletinFlag: z
      .boolean()
      .describe(
        "Indicator whether alert is also used as bulletin, as a boolean. E.g., true when alert serves dual purpose as bulletin, false when alert is alert-only. Used to determine if alert should be displayed as bulletin."
      ),
    CommunicationFlag: z
      .boolean()
      .describe(
        "Indicator whether alert is also used as communications announcement, as a boolean. E.g., true when alert serves as communications announcement, false when alert is route-only. Used to determine if alert should be used for communications."
      ),
    PublishDate: zDotnetDate()
      .nullable()
      .describe(
        "Date when alert was published, as a UTC datetime. E.g., '2025-11-02T18:53:19.000Z' for alert published at 6:53 PM on November 2, 2025, null when publish date is unavailable. Indicates when alert information was made public."
      ),
    AlertDescription: z
      .string()
      .nullable()
      .describe(
        "Alert text tailored as brief route announcement, as a route alert description. E.g., 'Route modifications due to maintenance' for route-specific alert, null when route alert text is unavailable. Compact format for route-specific displays."
      ),
    DisruptionDescription: z
      .string()
      .nullable()
      .describe(
        "Service disruption text associated with alert, as a disruption description. E.g., null when alert is not disruption-specific, disruption text when alert relates to service disruption. Used for identifying disruption-related alerts."
      ),
    AlertFullTitle: z
      .string()
      .describe(
        "Full title of alert, as an alert title. E.g., 'Route Service Alert' for general alert, 'Maintenance Delay' for maintenance alert. Provides alert identification for display."
      ),
    AlertFullText: z
      .string()
      .nullable()
      .describe(
        "Full text content of alert, as HTML-formatted alert text. E.g., '<p>Route modifications due to maintenance...</p>' for detailed alert content, null when full text is unavailable. HTML-formatted text for alert display."
      ),
    IVRText: z
      .string()
      .nullable()
      .describe(
        "Alert text tailored for Interactive Voice Response systems, as IVR description. E.g., null when IVR text is unavailable. Used for telephone-based alert information systems and text-to-speech playback."
      ),
  })
  .describe(
    "Represents alert information including bulletin ID, bulletin/communication flags, publish date, alert descriptions (brief and full), disruption description, and IVR text. E.g., alert with bulletin flag true, published November 2, 2025, with route announcement and full HTML text. Used for alert display, notification systems, and route-specific alert filtering."
  );

export type Alert = z.infer<typeof alertSchema>;

/**
 * Alerts List Schema - represents an list of alerts
 */
export const alertsListSchema = z
  .array(alertSchema)
  .describe(
    "Array of alert information including bulletin IDs, flags, publish dates, alert descriptions, and IVR text. E.g., array containing multiple alerts for route with different types and publication dates. Used for alert display and route-specific alert filtering."
  );

export type AlertList = z.infer<typeof alertsListSchema>;

/**
 * Schema for RouteDetail - represents detailed route information
 */
export const routeDetailSchema = routeBaseSchema
  .extend({
    VesselWatchID: z
      .number()
      .describe(
        "Unique identifier used to group routes for VesselWatch system, as an integer ID. E.g., '5' for Pt. Defiance/Tahlequah route grouping. Used for vessel tracking and monitoring system integration."
      ),
    ReservationFlag: z
      .boolean()
      .describe(
        "Indicator whether route supports advance vehicle reservations, as a boolean. E.g., false for routes without reservations like Pt. Defiance/Tahlequah, true for routes with reservation system like Anacortes/San Juan Islands. Used to determine if route supports advance booking."
      ),
    InternationalFlag: z
      .boolean()
      .describe(
        "Indicator whether route operates outside United States, as a boolean. E.g., false for domestic routes, true for international routes like Anacortes/Sidney B.C. Used to identify international voyages requiring customs documentation."
      ),
    PassengerOnlyFlag: z
      .boolean()
      .describe(
        "Indicator whether route services only passengers without vehicles, as a boolean. E.g., false for routes supporting vehicles and passengers, true for passenger-only routes. Used to determine if route accommodates vehicle traffic."
      ),
    CrossingTime: z
      .string()
      .nullable()
      .describe(
        "Estimated crossing time in minutes, as a string. E.g., '15' for 15-minute crossing on Pt. Defiance/Tahlequah route, null when crossing time is unavailable or route is multi-destination. Used for trip planning and duration estimation."
      ),
    AdaNotes: z
      .string()
      .nullable()
      .describe(
        "ADA accessibility information for route, as HTML-formatted accessibility notes. E.g., null when ADA information is unavailable, HTML text describing accessibility features and accommodations. Used for accessibility planning and compliance."
      ),
    GeneralRouteNotes: z
      .string()
      .nullable()
      .describe(
        'Miscellaneous route information and notes, as HTML-formatted route notes. E.g., \'<ul class="btttwinter2020"><li><a href="...">Best travel times</a></li></ul>\' for Pt. Defiance/Tahlequah route notes, null when notes are unavailable. HTML-formatted text for route information display.'
      ),
    SeasonalRouteNotes: z
      .string()
      .nullable()
      .describe(
        "Route notes specific to schedule season, as HTML-formatted seasonal notes. E.g., null when seasonal notes are unavailable, HTML text describing season-specific route information or modifications. Used for seasonal route information display."
      ),
    Alerts: alertsListSchema.describe(
      "Array of alerts associated with route, as alert objects. E.g., array containing route-specific alerts with bulletin flags and descriptions, empty array when no alerts. Used for displaying route alerts and notifications."
    ),
  })
  .describe(
    "Represents detailed route information including route identification, VesselWatch grouping, reservation/international/passenger-only flags, crossing time, ADA notes, general and seasonal route notes, and alerts. E.g., Pt. Defiance/Tahlequah route (ID 1, abbreviation pd-tal) with 15-minute crossing time, no reservations, and route notes. Used for comprehensive route information display and trip planning."
  );

export type RouteDetail = z.infer<typeof routeDetailSchema>;

/**
 * Schema for RouteDetailsList - represents a list of route details
 */
export const routeDetailsListSchema = z
  .array(routeDetailSchema)
  .describe(
    "Array of detailed route information including route identification, VesselWatch grouping, reservation/international/passenger-only flags, crossing times, ADA notes, route notes, and alerts. E.g., array containing all routes for trip date with complete route details, array filtered by terminal combination or specific route. Use GetTerminalsAndMates to find valid terminals and GetRoutes to find valid routes. Use GetScheduleValidDateRange to determine valid trip dates. Used for comprehensive route information display and trip planning."
  );

export type RouteDetailsList = z.infer<typeof routeDetailsListSchema>;
