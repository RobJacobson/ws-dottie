import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import type { ScheduledRoute } from "./getScheduledRoutes";
import { scheduledRouteSchema } from "./getScheduledRoutes";

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/scheduledroutesbyseason/{seasonId}";

/**
 * API function for fetching scheduled routes by season from WSF Schedule API
 *
 * Retrieves scheduled routes for a specific season. This endpoint provides
 * information about route schedules for a particular schedule period.
 *
 * @param params - Object containing seasonId
 * @param params.seasonId - The unique identifier for the season
 * @returns Promise resolving to an array of ScheduledRoute objects containing scheduled route information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const scheduledRoutes = await getScheduledRoutesBySeason({ seasonId: 1 });
 * console.log(scheduledRoutes[0].RouteAbbrev); // "SEA-BI"
 * ```
 */
export const getScheduledRoutesBySeason = async (
  params: GetScheduledRoutesBySeasonParams
): Promise<ScheduledRoute[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getScheduledRoutesBySeasonParamsSchema,
      output: scheduledRoutesArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getScheduledRoutesBySeasonParamsSchema = z
  .object({
    seasonId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the season to get scheduled routes for."
      ),
  })
  .describe(
    "Parameters for retrieving scheduled routes for a specific season."
  );

export type GetScheduledRoutesBySeasonParams = z.infer<
  typeof getScheduledRoutesBySeasonParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const scheduledRoutesArraySchema = z.array(scheduledRouteSchema);

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching scheduled routes by season from WSF Schedule API
 *
 * Retrieves scheduled routes for a specific season. This endpoint provides
 * information about route schedules for a particular schedule period.
 *
 * @param params - Object containing seasonId
 * @param params.seasonId - The unique identifier for the season
 * @param options - Optional React Query options
 * @returns React Query result object containing scheduled route information
 *
 * @example
 * ```typescript
 * const { data: scheduledRoutes } = useScheduledRoutesBySeason({ seasonId: 1 });
 * console.log(scheduledRoutes?.[0]?.RouteAbbrev); // "SEA-BI"
 * ```
 */
export const useScheduledRoutesBySeason = (
  params: GetScheduledRoutesBySeasonParams,
  options?: TanStackOptions<ScheduledRoute[]>
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "scheduledRoutesBySeason", params.seasonId],
    queryFn: () => getScheduledRoutesBySeason(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
