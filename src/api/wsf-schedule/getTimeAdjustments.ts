import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "./getCacheFlushDateSchedule";

// ============================================================================
// API Function
//
// getTimeAdjustments
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/timeadj";

/**
 * API function for fetching time adjustments from WSF Schedule API
 *
 * Retrieves time adjustments for ferry schedules. This endpoint provides
 * information about schedule modifications and time changes.
 *
 * @returns Promise resolving to an array of ActualTimeAdjustmentResponse objects containing time adjustment information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const timeAdjustments = await getTimeAdjustments();
 * console.log(timeAdjustments[0].RouteDescription); // "Anacortes - Friday Harbor"
 * ```
 */
export const getTimeAdjustments = async (): Promise<
  TimeAdjustmentResponse[]
> => {
  return zodFetch(ENDPOINT, {
    output: timeAdjustmentsArraySchema,
  });
};

// ============================================================================
// Input Schema & Types
//
// No input parameters for this endpoint
// ============================================================================

// ============================================================================
// Output Schema & Types (based on actual API response)
//
// timeAdjustmentResponseSchema
// timeAdjustmentsArraySchema
// TimeAdjustmentResponse
// ============================================================================

// API response schema for time adjustments
export const timeAdjustmentResponseSchema = z.object({
  ScheduleID: z.number(),
  SchedRouteID: z.number(),
  RouteID: z.number(),
  RouteDescription: z.string(),
  RouteSortSeq: z.number(),
  SailingID: z.number(),
  SailingDescription: z.string(),
  ActiveSailingDateRange: z.object({
    DateFrom: zWsdotDate().nullable(),
    DateThru: zWsdotDate().nullable(),
    EventID: z.number().nullable(),
    EventDescription: z.string().nullable(),
  }),
  SailingDir: z.number(),
  JourneyID: z.number(),
  VesselID: z.number(),
  VesselName: z.string(),
  VesselHandicapAccessible: z.boolean(),
  VesselPositionNum: z.number(),
  TerminalID: z.number(),
  TerminalDescription: z.string(),
  TerminalBriefDescription: z.string(),
  JourneyTerminalID: z.number(),
  DepArrIndicator: z.number(),
  AdjDateFrom: zWsdotDate().nullable(),
  AdjDateThru: zWsdotDate().nullable(),
  AdjType: z.number(),
  TidalAdj: z.number().nullable(),
  TimeToAdj: z.number().nullable(),
  Annotations: z.array(z.string()).nullable(),
  EventID: z.number().nullable(),
  EventDescription: z.string().nullable(),
});

export const timeAdjustmentsArraySchema = z.array(timeAdjustmentResponseSchema);

export type TimeAdjustmentResponse = z.infer<
  typeof timeAdjustmentResponseSchema
>;

// ============================================================================
// TanStack Query Hook
//
// useTimeAdjustments
// ============================================================================

/**
 * React Query hook for fetching time adjustments from WSF Schedule API
 *
 * Retrieves time adjustments for ferry schedules. This endpoint provides
 * information about schedule modifications and time changes.
 *
 * @param options - Optional React Query options
 * @returns React Query result object containing time adjustment information
 *
 * @example
 * ```typescript
 * const { data: timeAdjustments } = useTimeAdjustments();
 * console.log(timeAdjustments?.[0]?.RouteDescription); // "Anacortes - Friday Harbor"
 * ```
 */
export const useTimeAdjustments = (
  options?: TanStackOptions<TimeAdjustmentResponse[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "timeAdjustments"],
    queryFn: () => getTimeAdjustments(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
  });
