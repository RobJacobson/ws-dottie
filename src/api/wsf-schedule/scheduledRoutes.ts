import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";
import { serviceDisruptionSchema } from "./routeDetails";

// ============================================================================
// API Functions
//
// getScheduledRoutes (all scheduled routes)
// getScheduledRoutesBySeason (scheduled routes for specific season)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/schedule/rest/schedroutes";
const ENDPOINT_BY_SEASON =
  "/ferries/api/schedule/rest/scheduledroutesbyseason/{seasonId}";

/**
 * Retrieves all scheduled routes in the WSF system.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<ScheduledRoute[]> - Array of all scheduled route information
 *
 * @example
 * const scheduledRoutes = await getScheduledRoutes();
 * console.log(scheduledRoutes.length);  // 20
 * console.log(scheduledRoutes[0].Description);  // "Anacortes / San Juan Islands"
 *
 * @throws {Error} When API is unavailable
 */
export const getScheduledRoutes = async (): Promise<ScheduledRoute[]> => {
  return zodFetch(ENDPOINT_ALL, {
    output: scheduledRoutesArraySchema,
  });
};

/**
 * Retrieves scheduled routes for a specific season.
 *
 * @param params - Parameters object for season-specific route query
 * @param params.seasonId - Unique season identifier (positive integer)
 * @returns Promise<ScheduledRoute[]> - Array of scheduled routes for the specified season
 *
 * @example
 * const summerRoutes = await getScheduledRoutesBySeason({ seasonId: 192 });
 * console.log(summerRoutes.length);  // 15
 * console.log(summerRoutes[0].Description);  // "Anacortes / San Juan Islands"
 *
 * @throws {Error} When season ID is invalid or API is unavailable
 */
export const getScheduledRoutesBySeason = async (
  params: GetScheduledRoutesBySeasonParams
): Promise<ScheduledRoute[]> => {
  return zodFetch(
    ENDPOINT_BY_SEASON,
    {
      input: getScheduledRoutesBySeasonParamsSchema,
      output: scheduledRoutesArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getScheduledRoutesBySeasonParamsSchema
// GetScheduledRoutesBySeasonParams
// ============================================================================

/**
 * Parameters for retrieving scheduled routes for a specific season
 */
export const getScheduledRoutesBySeasonParamsSchema = z
  .object({
    seasonId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetScheduledRoutesBySeasonParams = z.infer<
  typeof getScheduledRoutesBySeasonParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// contingencyAdjustmentSchema
// scheduledRouteSchema
// scheduledRoutesArraySchema
// ScheduledRoute
// ============================================================================

/**
 * Contingency adjustment information - represents schedule changes for specific date ranges
 */
export const contingencyAdjustmentSchema = z
  .object({
    DateFrom: zWsdotDate().describe(""),
    DateThru: zWsdotDate().describe(""),
    EventID: z.number().nullable().describe(""),
    EventDescription: z.string().nullable().describe(""),
    AdjType: z.number().describe(""),
    ReplacedBySchedRouteID: z.number().nullable().describe(""),
  })
  .describe("");

/**
 * Scheduled route information schema - includes route details, seasonal notes, and operational status
 */
export const scheduledRouteSchema = z
  .object({
    ScheduleID: z.number().describe(""),
    SchedRouteID: z.number().describe(""),
    ContingencyOnly: z.boolean().describe(""),
    RouteID: z.number().describe(""),
    RouteAbbrev: z.string().describe(""),
    Description: z.string().describe(""),
    SeasonalRouteNotes: z.string().describe(""),
    RegionID: z.number().describe(""),
    ServiceDisruptions: z.array(serviceDisruptionSchema).describe(""),
    ContingencyAdj: z.array(contingencyAdjustmentSchema).describe(""),
  })
  .describe("");

/**
 * Array of scheduled route objects - wrapper around scheduledRouteSchema
 */
export const scheduledRoutesArraySchema = z.array(scheduledRouteSchema);

/**
 * ScheduledRoute type - represents a scheduled ferry route with operational details
 */
export type ScheduledRoute = z.infer<typeof scheduledRouteSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useScheduledRoutes
// useScheduledRoutesBySeason
// ============================================================================

/**
 * TanStack Query hook for all scheduled routes with automatic updates.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<ScheduledRoute[], Error> - Query result with all scheduled route data
 *
 * @example
 * const { data: scheduledRoutes, isLoading } = useScheduledRoutes();
 * if (scheduledRoutes) {
 *   console.log(scheduledRoutes.length);  // 20
 *   console.log(scheduledRoutes[0].Description);  // "Anacortes / San Juan Islands"
 * }
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

/**
 * TanStack Query hook for season-specific scheduled routes with automatic updates.
 *
 * @param params - Parameters object for season-specific route query
 * @param params.seasonId - Unique season identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<ScheduledRoute[], Error> - Query result with season-specific route data
 *
 * @example
 * const { data: summerRoutes, isLoading } = useScheduledRoutesBySeason({ seasonId: 192 });
 * if (summerRoutes) {
 *   console.log(summerRoutes.length);  // 15
 *   console.log(summerRoutes[0].Description);  // "Anacortes / San Juan Islands"
 * }
 */
export const useScheduledRoutesBySeason = (
  params: GetScheduledRoutesBySeasonParams,
  options?: TanStackOptions<ScheduledRoute[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "scheduledRoutesBySeason",
      JSON.stringify(params),
    ],
    queryFn: () => getScheduledRoutesBySeason(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
