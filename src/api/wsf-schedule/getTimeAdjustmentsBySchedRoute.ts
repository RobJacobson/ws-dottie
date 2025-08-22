import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { dateSchema } from "./shared-schemas";

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
      output: timeAdjustmentsArraySchema,
    },
    params
  );
};

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

export const timeAdjustmentSchema = z
  .object({
    AdjustmentID: z
      .number()
      .describe(
        "Unique identifier for the time adjustment. Primary key for adjustment identification and used consistently across all WSF systems and APIs."
      ),
    SchedRouteID: z
      .number()
      .describe(
        "Unique identifier for the scheduled route. Links the adjustment to a specific route schedule."
      ),
    AdjustmentMinutes: z
      .number()
      .describe(
        "Time adjustment in minutes. Positive values indicate delays, negative values indicate early departures."
      ),
    StartDate: dateSchema.describe(
      "Start date for the time adjustment period. Indicates when the adjustment becomes effective."
    ),
    EndDate: dateSchema.describe(
      "End date for the time adjustment period. Indicates when the adjustment expires."
    ),
    Reason: z
      .string()
      .describe(
        "Reason for the time adjustment. Provides context about why the schedule modification is necessary."
      ),
  })
  .describe(
    "Time adjustment information including identification, schedule association, adjustment amount, date range, and reason. This schema provides information about schedule modifications and time changes."
  );

export const timeAdjustmentsArraySchema = z.array(timeAdjustmentSchema);

export type TimeAdjustment = z.infer<typeof timeAdjustmentSchema>;

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
