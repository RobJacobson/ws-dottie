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
export const routeBaseSchema = z.object({
  /** Unique identifier for a route. */
  RouteID: z.number().describe("Unique identifier for a route."),
  /** The route's abbreviation. */
  RouteAbbrev: z.string().nullable().describe("The route's abbreviation."),
  /** The full name of the route. */
  Description: z.string().nullable().describe("The full name of the route."),
  /**
   * Unique identifier that identifies the region associated with the route.
   */
  RegionID: z
    .number()
    .describe(
      "Unique identifier that identifies the region associated with the route."
    ),
});

export type RouteBase = z.infer<typeof routeBaseSchema>;

/**
 * Schema for ServiceDisruption - represents service disruption information
 */
export const serviceDisruptionSchema = z.object({
  /** Unique identifier for the alert. */
  BulletinID: z.number().describe("Unique identifier for the alert."),
  /**
   * A flag that, when true, indicates the alert is also being used as a bulletin.
   */
  BulletinFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert is also being used as a bulletin."
    ),
  /** The date the alert was published. */
  PublishDate: zDotnetDate()
    .nullable()
    .describe("The date the alert was published."),
  /** The service disruption text associated with the alert. */
  DisruptionDescription: z
    .string()
    .describe("The service disruption text associated with the alert."),
});

export type ServiceDisruption = z.infer<typeof serviceDisruptionSchema>;

/**
 * Service Disruptions List Schema - represents an list of service disruptions
 */
export const serviceDisruptionsListSchema = z
  .array(serviceDisruptionSchema)
  .describe(
    "This operation retrieves the most basic / brief information for routes currently associated with service disruptions. A valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type ServiceDisruptionList = z.infer<
  typeof serviceDisruptionsListSchema
>;

/**
 * Schema for Route - represents basic route information
 */
export const routeSchema = routeBaseSchema.extend({
  /**
   * Service disruption alerts that are currently affecting the route.
   */
  ServiceDisruptions: serviceDisruptionsListSchema
    .nullable()
    .describe(
      "Service disruption alerts that are currently affecting the route."
    ),
});

export type Route = z.infer<typeof routeSchema>;

/**
 * Schema for Alert - represents alert information
 */
export const alertSchema = z.object({
  /** Unique identifier for the alert. */
  BulletinID: z.number().describe("Unique identifier for the alert."),
  /**
   * A flag that, when true, indicates the alert is also being used as a bulletin.
   */
  BulletinFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert is also being used as a bulletin."
    ),
  /**
   * A flag that, when true, indicates the alert is also being used as a communications announcement.
   */
  CommunicationFlag: z
    .boolean()
    .describe(
      "A flag that, when true, indicates the alert is also being used as a communications announcement."
    ),
  /** The date the alert was published. */
  PublishDate: zDotnetDate()
    .nullable()
    .describe("The date the alert was published."),
  /** The alert text, tailored as a brief route announcement. */
  AlertDescription: z
    .string()
    .nullable()
    .describe("The alert text, tailored as a brief route announcement."),
  /**
   * If present, indicates service disruption text associated with the alert.
   */
  DisruptionDescription: z
    .string()
    .nullable()
    .describe(
      "If present, indicates service disruption text associated with the alert."
    ),
  /** The title of the alert. */
  AlertFullTitle: z.string().describe("The title of the alert."),
  /** The full text of the alert. */
  AlertFullText: z.string().nullable().describe("The full text of the alert."),
  /** The alert text, tailored for text to speech systems. */
  IVRText: z
    .string()
    .nullable()
    .describe("The alert text, tailored for text to speech systems."),
});

export type Alert = z.infer<typeof alertSchema>;

/**
 * Alerts List Schema - represents an list of alerts
 */
export const alertsListSchema = z.array(alertSchema);

export type AlertList = z.infer<typeof alertsListSchema>;

/**
 * Schema for RouteDetail - represents detailed route information
 */
export const routeDetailSchema = routeBaseSchema.extend({
  /**
   * Unique identifier used to group routes for VesselWatch.
   */
  VesselWatchID: z
    .number()
    .describe("Unique identifier used to group routes for VesselWatch."),
  /**
   * Indicates whether or not the route is reservable.
   */
  ReservationFlag: z
    .boolean()
    .describe("Indicates whether or not the route is reservable."),
  /**
   * Indicates whether or not the route operates outside the US.
   */
  InternationalFlag: z
    .boolean()
    .describe("Indicates whether or not the route operates outside the US."),
  /**
   * If this flag is true, then the route does not service vehicles.
   */
  PassengerOnlyFlag: z
    .boolean()
    .describe(
      "If this flag is true, then the route does not service vehicles."
    ),
  /**
   * An estimated crossing time (in minutes) associated with the route. This value will likely be absent for multi-destination routes.
   */
  CrossingTime: z
    .string()
    .nullable()
    .describe(
      "An estimated crossing time (in minutes) associated with the route. This value will likely be absent for multi-destination routes."
    ),
  /** ADA information associated with the route. */
  AdaNotes: z
    .string()
    .nullable()
    .describe("ADA information associated with the route."),
  /** Miscellaneous information associated with the route. */
  GeneralRouteNotes: z
    .string()
    .nullable()
    .describe("Miscellaneous information associated with the route."),
  /**
   * Route notes specific to the season that the trip date is associated with.
   */
  SeasonalRouteNotes: z
    .string()
    .nullable()
    .describe(
      "Route notes specific to the season that the trip date is associated with."
    ),
  /** Alerts associated with the route. */
  Alerts: alertsListSchema.describe("Alerts associated with the route."),
});

export type RouteDetail = z.infer<typeof routeDetailSchema>;

/**
 * Schema for RouteDetailsList - represents a list of route details
 */
export const routeDetailsListSchema = z
  .array(routeDetailSchema)
  .describe(
    "This operation retrieves highly detailed information pertaining to routes. If only a trip date is included in the URL string, all routes available for that date of travel are returned. If a trip date, departing terminal and arriving terminal are included then routes in the resultset are filtered to match accordingly. Along the same lines, including only a trip date and route will filter the resultset to a single route. Valid departing and arriving terminals may be found using `/terminalsandmates` while valid routes may be found using `/routes`. Similarly, a valid trip date may be determined using `/validdaterange`. Please format the trip date input as `'YYYY-MM-DD'` (eg. `'2014-04-01'` for a trip date occurring on April 1, 2014)."
  );

export type RouteDetailsList = z.infer<typeof routeDetailsListSchema>;
