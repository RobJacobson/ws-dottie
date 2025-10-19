/**
 * @fileoverview WSF Schedule API Input Schemas for Sailings
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to sailing operations.
 */

import { z } from "zod";

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
