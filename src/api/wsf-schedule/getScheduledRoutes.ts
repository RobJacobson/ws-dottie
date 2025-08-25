import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "./getCacheFlushDateSchedule";
import { serviceDisruptionSchema } from "./getRouteDetails";

// ============================================================================
// API Function
//
// getScheduledRoutes
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/schedroutes";

/**
 * API function for fetching scheduled routes from WSF Schedule API
 *
 * Retrieves all scheduled routes. This endpoint provides information about
 * all route schedules that are currently available.
 *
 * @returns Promise resolving to an array of ScheduledRoute objects containing scheduled route information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const scheduledRoutes = await getScheduledRoutes();
 * console.log(scheduledRoutes[0].RouteAbbrev); // "SEA-BI"
 * ```
 */
export const getScheduledRoutes = async (): Promise<ScheduledRoute[]> => {
  return zodFetch(ENDPOINT, {
    output: scheduledRoutesArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// No input parameters required for this endpoint
// ============================================================================

// ============================================================================
// Output Schema & Types
//
// contingencyAdjustmentSchema
// scheduledRouteSchema
// scheduledRoutesArraySchema
// ScheduledRoute
// ============================================================================

export const contingencyAdjustmentSchema = z
  .object({
    DateFrom: zWsdotDate().describe(
      "Start date for the contingency adjustment period. Indicates when the adjustment becomes effective and begins affecting ferry schedules."
    ),
    DateThru: zWsdotDate().describe(
      "End date for the contingency adjustment period. Indicates when the adjustment expires and normal scheduling resumes."
    ),
    EventID: z
      .number()
      .nullable()
      .describe(
        "Unique identifier for the event causing the contingency adjustment. Null when no specific event is associated with the adjustment."
      ),
    EventDescription: z
      .string()
      .nullable()
      .describe(
        "Human-readable description of the event causing the contingency adjustment. Provides context about why the schedule modification is necessary (e.g., 'Maintenance', 'Weather', 'Special Event')."
      ),
    AdjType: z
      .number()
      .describe(
        "Type of adjustment being applied. Numeric code indicating the nature of the contingency change (e.g., 1=Delay, 2=Cancellation, 3=Route Change)."
      ),
    ReplacedBySchedRouteID: z
      .number()
      .nullable()
      .describe(
        "ID of the scheduled route that replaces the affected route during the contingency period. Null when no replacement route is provided or when the adjustment doesn't involve route substitution."
      ),
  })
  .describe(
    "Contingency adjustment information for schedule changes due to special events, maintenance, weather conditions, or other operational requirements. These adjustments modify normal ferry schedules to accommodate exceptional circumstances."
  );

export const scheduledRouteSchema = z
  .object({
    ScheduleID: z
      .number()
      .describe(
        "Unique identifier for the schedule season. Links the route to a specific schedule period and determines when the route is active."
      ),
    SchedRouteID: z
      .number()
      .describe(
        "Unique identifier for the scheduled route instance. Represents a specific route configuration within a schedule, allowing for multiple variations of the same route."
      ),
    ContingencyOnly: z
      .boolean()
      .describe(
        "Indicates whether this route is only available during contingency situations. True when the route is a backup option that operates when normal routes are disrupted."
      ),
    RouteID: z
      .number()
      .describe(
        "Unique identifier for the ferry route. Links to the base route definition and identifies the specific ferry corridor this schedule applies to."
      ),
    RouteAbbrev: z
      .string()
      .describe(
        "Abbreviated name for the route. Short identifier used in displays, schedules, and references (e.g., 'SEA-BI' for Seattle to Bainbridge Island)."
      ),
    Description: z
      .string()
      .describe(
        "Full description of the route. Provides detailed information about the route's purpose, terminals served, and operational characteristics."
      ),
    SeasonalRouteNotes: z
      .string()
      .describe(
        "Seasonal notes about the route. Contains information about route availability during different seasons, including summer schedules, winter modifications, and holiday operations."
      ),
    RegionID: z
      .number()
      .describe(
        "Geographic region identifier for the route. Groups routes by geographic area and helps organize ferry operations by service region."
      ),
    ServiceDisruptions: z
      .array(serviceDisruptionSchema)
      .describe(
        "Array of service disruption information for this route. Contains current disruption status, alerts, and operational issues affecting this specific route."
      ),
    ContingencyAdj: z
      .array(contingencyAdjustmentSchema)
      .describe(
        "Array of contingency adjustments for this route. Contains schedule modifications and special conditions that affect this route's normal operation."
      ),
  })
  .describe(
    "Scheduled route information including route details, schedule associations, operational status, and contingency information. This schema represents a complete view of how a route operates within a specific schedule period."
  );

export const scheduledRoutesArraySchema = z.array(scheduledRouteSchema);

export type ScheduledRoute = z.infer<typeof scheduledRouteSchema>;

// ============================================================================
// TanStack Query Hook
//
// useScheduledRoutes
// ============================================================================

/**
 * React Query hook for fetching scheduled routes from WSF Schedule API
 *
 * Retrieves all scheduled routes. This endpoint provides information about
 * all route schedules that are currently available.
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing scheduled route information
 *
 * @example
 * ```typescript
 * const { data: scheduledRoutes } = useScheduledRoutes();
 * console.log(scheduledRoutes?.[0]?.RouteAbbrev); // "SEA-BI"
 * ```
 */
export const useScheduledRoutes = (
  options?: TanStackOptions<ScheduledRoute[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "scheduledRoutes"],
    queryFn: () => getScheduledRoutes(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
  });
