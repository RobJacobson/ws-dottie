import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { nullableDateSchema } from "./shared-schemas";

// ============================================================================
// API FUNCTION
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
// INPUT SCHEMA & TYPES
// ============================================================================

// No input parameters for this endpoint

// ============================================================================
// OUTPUT SCHEMA & TYPES (based on actual API response)
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
    DateFrom: nullableDateSchema,
    DateThru: nullableDateSchema,
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
  AdjDateFrom: nullableDateSchema,
  AdjDateThru: nullableDateSchema,
  AdjType: z.number(),
  TidalAdj: z.union([z.number(), z.boolean()]).nullable(),
  TimeToAdj: z.union([z.number(), z.string()]).nullable(),
  Annotations: z.union([z.string(), z.array(z.unknown())]).nullable(),
  EventID: z.number().nullable(),
  EventDescription: z.string().nullable(),
});

export const timeAdjustmentsArraySchema = z.array(timeAdjustmentResponseSchema);

export type TimeAdjustmentResponse = z.infer<
  typeof timeAdjustmentResponseSchema
>;

// ============================================================================
// QUERY HOOK
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
  useQuery({
    queryKey: ["wsf", "schedule", "timeAdjustments"],
    queryFn: () => getTimeAdjustments(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
