/**
 * @fileoverview WSF Schedule API Input Schemas for Sailings
 *
 * This module provides Zod schemas for validating input parameters for the WSF
 * Schedule API endpoints related to sailing operations.
 */

import { z } from "@/shared/zod";

/**
 * Schema for SchedSailingsBySchedRoute input parameters
 *
 * This operation provides sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`. */
export const sailingsByRouteIDInputSchema = z
  .object({
    SchedRouteID: z.number().describe("Numeric ID of the scheduled route."),
  })
  .describe(
    "Input parameters for sailings by route ID endpoint. Scheduled route ID required."
  );

export type SailingsByRouteIDInput = z.infer<
  typeof sailingsByRouteIDInputSchema
>;

/**
 * Schema for AllSchedSailingsBySchedRoute input parameters
 *
 * This operation provides all sailings for a particular scheduled route. Sailings are departure times organized by direction of travel (eastbound / westbound), days of operation groups (daily, weekday, weekend, etc) and, in some cases, date ranges (eg. Early Fall / Late Fall). Sailings largely mimic the groupings of departures found on the printed PDF version of the schedule. Scheduled routes may be determined using `/schedroutes`. */
export const allSailingsBySchedRouteIDInputSchema = z
  .object({
    SchedRouteID: z.number().describe("Numeric ID of the scheduled route."),
  })
  .describe(
    "Input parameters for all sailings by route ID endpoint. Scheduled route ID required."
  );

export type AllSailingsBySchedRouteIDInput = z.infer<
  typeof allSailingsBySchedRouteIDInputSchema
>;
