import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

// Import the complete schema from getScheduleByRoute
import {
  type ScheduleResponse,
  scheduleResponseArraySchema,
} from "./getScheduleByRoute";

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/scheduletodaybyroute/{tripDate}/{routeId}";

/**
 * API function for fetching today's schedule by route from WSF Schedule API
 *
 * Retrieves today's schedule information for a specific route and trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate and routeId
 * @param params.tripDate - The trip date as a Date object
 * @param params.routeId - The unique identifier for the route
 * @returns Promise resolving to an array of ScheduleResponse objects containing today's schedule information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const schedule = await getScheduleTodayByRoute({
 *   tripDate: new Date('2024-01-15'),
 *   routeId: 1
 * });
 * console.log(schedule[0].RouteAbbrev); // "SEA-BI"
 * ```
 */
export const getScheduleTodayByRoute = async (
  params: GetScheduleTodayByRouteParams
): Promise<ScheduleResponse[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getScheduleTodayByRouteParamsSchema,
      output: scheduleResponseArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getScheduleTodayByRouteParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve today's schedule information."
      ),
    routeId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the route to get today's schedule for."),
  })
  .describe(
    "Parameters for retrieving today's schedule information for a specific route and trip date."
  );

export type GetScheduleTodayByRouteParams = z.infer<
  typeof getScheduleTodayByRouteParamsSchema
>;

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching today's schedule by route from WSF Schedule API
 *
 * Retrieves today's schedule information for a specific route and trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate and routeId
 * @param params.tripDate - The trip date as a Date object
 * @param params.routeId - The unique identifier for the route
 * @param options - Optional React Query options
 * @returns React Query result object containing today's schedule information
 *
 * @example
 * ```typescript
 * const { data: schedule } = useScheduleTodayByRoute({
 *   tripDate: new Date('2024-01-15'),
 *   routeId: 1
 * });
 * console.log(schedule?.[0]?.RouteAbbrev); // "SEA-BI"
 * ```
 */
export const useScheduleTodayByRoute = (
  params: GetScheduleTodayByRouteParams,
  options?: TanStackOptions<ScheduleResponse[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleTodayByRoute",
      params.tripDate,
      params.routeId,
    ],
    queryFn: () => getScheduleTodayByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
