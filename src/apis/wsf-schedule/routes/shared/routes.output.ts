/**
 * @fileoverview WSF Schedule API Output Schemas for Routes
 *
 * This module provides Zod schemas for validating responses from the WSF
 * Schedule API route operations.
 */

import { z } from "@/shared/zod";

/**
 * Base route schema containing common route fields
 */
export const routeBaseSchema = z
  .object({
    RouteID: z.number().describe("Numeric ID of the route."),
    RouteAbbrev: z
      .string()
      .nullable()
      .describe("Route abbreviation code for compact identification."),
    Description: z.string().nullable().describe("Display name of the route."),
    RegionID: z
      .number()
      .describe("Numeric ID of the WSF region associated with route."),
  })
  .describe(
    "Base route information including identifier, abbreviation, description, and region association."
  );

export type RouteBase = z.infer<typeof routeBaseSchema>;

/**
 * Schema for ServiceDisruption - represents service disruption information
 */
export const serviceDisruptionSchema = z
  .object({
    BulletinID: z
      .number()
      .describe("Numeric ID of the service disruption bulletin."),
    BulletinFlag: z
      .boolean()
      .describe("True if alert is also used as bulletin; otherwise false."),
    PublishDate: z.date()
      .nullable()
      .describe("UTC datetime when the disruption alert was published."),
    DisruptionDescription: z
      .string()
      .describe("Text description of the service disruption."),
  })
  .describe(
    "Service disruption information including bulletin ID, flag, publish date, and description."
  );

export type ServiceDisruption = z.infer<typeof serviceDisruptionSchema>;

/**
 * Service Disruptions List Schema - represents an list of service disruptions
 */
export const serviceDisruptionsListSchema = z
  .array(serviceDisruptionSchema)
  .describe("Array of service disruption information.");

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
        "Array of service disruption alerts currently affecting route, or null if unavailable."
      ),
  })
  .describe(
    "Basic route information including identification, abbreviation, description, region, and service disruptions."
  );

export type Route = z.infer<typeof routeSchema>;

/**
 * Schema for Alert - represents alert information
 *
 * A Highway Alert.
 */
export const routeAlertSchema = z
  .object({
    BulletinID: z.number().describe("Numeric ID of the alert bulletin."),
    BulletinFlag: z
      .boolean()
      .describe("True if alert is also used as bulletin; otherwise false."),
    CommunicationFlag: z
      .boolean()
      .describe(
        "True if alert is also used as communications announcement; otherwise false."
      ),
    PublishDate: z.date()
      .nullable()
      .describe("UTC datetime when the alert was published."),
    AlertDescription: z
      .string()
      .nullable()
      .describe("Brief route announcement text, or null if unavailable."),
    DisruptionDescription: z
      .string()
      .nullable()
      .describe(
        "Service disruption text associated with alert, or null if not disruption-specific."
      ),
    AlertFullTitle: z.string().describe("Full title of the alert."),
    AlertFullText: z
      .string()
      .nullable()
      .describe("Full HTML-formatted alert text, or null if unavailable."),
    IVRText: z
      .string()
      .nullable()
      .describe(
        "Alert text formatted for Interactive Voice Response systems, or null if unavailable."
      ),
  })
  .describe(
    "Alert information including bulletin ID, flags, publish date, descriptions, and IVR text."
  );

export type RouteAlert = z.infer<typeof routeAlertSchema>;

/**
 * Alerts List Schema - represents an list of alerts
 */
export const alertsListSchema = z
  .array(routeAlertSchema)
  .describe("Array of alert information.");

export type AlertList = z.infer<typeof alertsListSchema>;

/**
 * Schema for RouteDetail - represents detailed route information
 */
export const routeDetailSchema = routeBaseSchema
  .extend({
    VesselWatchID: z
      .number()
      .describe("Numeric ID used to group routes for VesselWatch system."),
    ReservationFlag: z
      .boolean()
      .describe(
        "True if route supports advance vehicle reservations; otherwise false."
      ),
    InternationalFlag: z
      .boolean()
      .describe(
        "True if route operates outside United States; otherwise false."
      ),
    PassengerOnlyFlag: z
      .boolean()
      .describe(
        "True if route services only passengers without vehicles; otherwise false."
      ),
    CrossingTime: z
      .string()
      .nullable()
      .describe(
        "Estimated crossing time in minutes as string, or null if unavailable."
      ),
    AdaNotes: z
      .string()
      .nullable()
      .describe(
        "ADA accessibility information in HTML format, or null if unavailable."
      ),
    GeneralRouteNotes: z
      .string()
      .nullable()
      .describe(
        "Miscellaneous route information in HTML format, or null if unavailable."
      ),
    SeasonalRouteNotes: z
      .string()
      .nullable()
      .describe(
        "Route notes specific to schedule season in HTML format, or null if unavailable."
      ),
    Alerts: alertsListSchema.describe("Array of alerts associated with route."),
  })
  .describe(
    "Detailed route information including identification, flags, crossing time, notes, and alerts."
  );

export type RouteDetail = z.infer<typeof routeDetailSchema>;

/**
 * Schema for RouteDetailsList - represents a list of route details
 */
export const routeDetailsListSchema = z
  .array(routeDetailSchema)
  .describe("Array of detailed route information.");

export type RouteDetailsList = z.infer<typeof routeDetailsListSchema>;
