import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import {
  type TimeAdjustment,
  timeAdjustmentSchema,
} from "./getTimeAdjustmentsByRoute";

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTimeAdjustmentsBySchedRouteParamsSchema = z
  .object({
    schedRouteId: z
      .number()
      .int()
      .positive()
      .describe(
        "Unique identifier for the scheduled route to get time adjustments for."
      ),
  })
  .describe(
    "Parameters for retrieving time adjustments for a specific scheduled route."
  );

export type GetTimeAdjustmentsBySchedRouteParams = z.infer<
  typeof getTimeAdjustmentsBySchedRouteParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const timeAdjustmentsBySchedRouteArraySchema =
  z.array(timeAdjustmentSchema);

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/timeadjbyschedroute/{schedRouteId}";

/**
 * API function for fetching time adjustments by scheduled route from WSF Schedule API
 *
 * Retrieves time adjustments for a specific scheduled route. This endpoint provides
 * information about schedule modifications and time changes for a particular scheduled route.
 *
 * @param params - Object containing schedRouteId
 * @param params.schedRouteId - The unique identifier for the scheduled route
 * @returns Promise resolving to an array of TimeAdjustment objects containing time adjustment information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const timeAdjustments = await getTimeAdjustmentsBySchedRoute({ schedRouteId: 1 });
 * console.log(timeAdjustments[0].AdjustmentMinutes); // 15
 * ```
 */
export const getTimeAdjustmentsBySchedRoute = async (
  params: GetTimeAdjustmentsBySchedRouteParams
): Promise<TimeAdjustment[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTimeAdjustmentsBySchedRouteParamsSchema,
      output: timeAdjustmentsBySchedRouteArraySchema,
    },
    params
  );
};

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching time adjustments by scheduled route from WSF Schedule API
 *
 * Retrieves time adjustments for a specific scheduled route. This endpoint provides
 * information about schedule modifications and time changes for a particular scheduled route.
 *
 * @param params - Object containing schedRouteId
 * @param params.schedRouteId - The unique identifier for the scheduled route
 * @param options - Optional React Query options
 * @returns React Query result object containing time adjustment information
 *
 * @example
 * ```typescript
 * const { data: timeAdjustments } = useTimeAdjustmentsBySchedRoute({ schedRouteId: 1 });
 * console.log(timeAdjustments?.[0]?.AdjustmentMinutes); // 15
 * ```
 */
export const useTimeAdjustmentsBySchedRoute = (
  params: GetTimeAdjustmentsBySchedRouteParams,
  options?: TanStackOptions<TimeAdjustment[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "timeAdjustmentsBySchedRoute",
      params.schedRouteId,
    ],
    queryFn: () => getTimeAdjustmentsBySchedRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
