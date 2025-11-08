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
    SchedRouteID: z
      .number()
      .describe(
        "Unique identifier for scheduled route, as an integer ID. E.g., '2401' for Anacortes/San Juan Islands route in Fall 2025, '2383' for Port Townsend/Coupeville route. Use GetScheduledRoutes to retrieve valid scheduled route IDs. Used to identify which scheduled route to retrieve sailings for."
      ),
  })
  .describe(
    "Retrieves sailings for specified scheduled route, returning departure times organized by direction, days of operation, and date ranges. Sailings mirror the groupings found in printed PDF schedules. Use GetScheduledRoutes to find valid scheduled route IDs. Use for displaying schedule structure and sailing groups."
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
    SchedRouteID: z
      .number()
      .describe(
        "Unique identifier for scheduled route, as an integer ID. E.g., '2401' for Anacortes/San Juan Islands route in Fall 2025. Use GetScheduledRoutes to retrieve valid scheduled route IDs. Used to identify which scheduled route to retrieve all sailings for."
      ),
  })
  .describe(
    "Retrieves all sailings for specified scheduled route including inactive sailings, returning departure times organized by direction, days of operation, and date ranges. Includes all sailing groups including those not currently active. Use GetScheduledRoutes to find valid scheduled route IDs. Use for comprehensive schedule structure access."
  );

export type AllSailingsBySchedRouteIDInput = z.infer<
  typeof allSailingsBySchedRouteIDInputSchema
>;
