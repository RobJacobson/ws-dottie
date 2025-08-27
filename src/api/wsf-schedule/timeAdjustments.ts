/**
 * WSF Schedule API - Time Adjustments
 *
 * Provides comprehensive information about schedule time adjustments including:
 * - All time adjustments across all routes and schedules
 * - Route-specific time adjustments with detailed operational information
 * - Tidal adjustments and special operational conditions
 * - Date-specific schedule modifications and annotations
 *
 * This API returns detailed information about schedule changes, additions, and cancellations
 * that deviate from the standard published schedules. The data includes vessel assignments,
 * terminal information, and specific adjustment details for operational planning and
 * passenger information systems.
 *
 * API Functions:
 * - getTimeAdjustments: Returns all time adjustments across all routes (no parameters required)
 * - getTimeAdjustmentsByRoute: Returns time adjustments for a specific route
 *
 * Input/Output Overview:
 * - getTimeAdjustments: Input: none (no parameters required), Output: TimeAdjustmentResponse[]
 * - getTimeAdjustmentsByRoute: Input: { routeId: number }, Output: TimeAdjustment[]
 *
 * Base Type: TimeAdjustmentResponse
 *
 * interface TimeAdjustmentResponse {
 *   ScheduleID: number;
 *   SchedRouteID: number;
 *   RouteID: number;
 *   RouteDescription: string;
 *   RouteSortSeq: number;
 *   SailingID: number;
 *   SailingDescription: string;
 *   ActiveSailingDateRange: {
 *     DateFrom: Date | null;
 *     DateThru: Date | null;
 *     EventID: number | null;
 *     EventDescription: string | null;
 *   };
 *   SailingDir: number;
 *   JourneyID: number;
 *   VesselID: number;
 *   VesselName: string;
 *   VesselHandicapAccessible: boolean;
 *   VesselPositionNum: number;
 *   TerminalID: number;
 *   TerminalDescription: string;
 *   TerminalBriefDescription: string;
 *   JourneyTerminalID: number;
 *   DepArrIndicator: number;
 *   AdjDateFrom: Date | null;
 *   AdjDateThru: Date | null;
 *   AdjType: number;
 *   TidalAdj: number | null;
 *   TimeToAdj: Date | null;
 *   Annotations: string[] | null;
 *   EventID: number | null;
 *   EventDescription: string | null;
 * }
 *
 * Note: The API response includes complex adjustment information with tidal considerations,
 * date ranges for adjustments, and detailed operational annotations. The TidalAdj field
 * indicates whether adjustments are related to tidal conditions, which is common for
 * routes like Port Townsend/Coupeville.
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/schedule/rest/timeadj?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "ScheduleID": 192,
 *     "SchedRouteID": 2329,
 *     "RouteID": 5,
 *     "RouteDescription": "Seattle / Bainbridge Island",
 *     "RouteSortSeq": 60,
 *     "SailingID": 7432,
 *     "SailingDescription": "Leave Seattle",
 *     "ActiveSailingDateRange": {
 *       "DateFrom": "/Date(1749970800000-0700)/",
 *       "DateThru": "/Date(1758351600000-0700)/",
 *       "EventID": null,
 *       "EventDescription": null
 *     },
 *     "SailingDir": 1,
 *     "JourneyID": 158366,
 *     "VesselID": 36,
 *     "VesselName": "Walla Walla",
 *     "VesselHandicapAccessible": true,
 *     "VesselPositionNum": 2,
 *     "JourneyTerminalID": 224856,
 *     "TerminalID": 7,
 *     "TerminalDescription": "Seattle",
 *     "TerminalBriefDescription": "Colman P52",
 *     "TimeToAdj": "/Date(-2208893400000-0800)/",
 *     "AdjDateFrom": "/Date(1756191600000-0700)/",
 *     "AdjDateThru": "/Date(1756191600000-0700)/",
 *     "TidalAdj": false,
 *     "EventID": null,
 *     "EventDescription": null,
 *     "DepArrIndicator": 1,
 *     "AdjType": 2,
 *     "Annotations": []
 *   }
 * ]
 * ```
 *
 * @see {@link https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html WSF Schedule API Documentation}
 * @see {@link https://www.wsdot.wa.gov/ferries/schedule/ WSF Schedules}
 *
 * @example
 * ```typescript
 * import { getTimeAdjustments, getTimeAdjustmentsByRoute } from '@ferryjoy/ws-dottie';
 *
 * // Get all time adjustments
 * const allAdjustments = await getTimeAdjustments();
 * console.log(`Total adjustments: ${allAdjustments.length}`);  // 50+
 *
 * // Get adjustments for a specific route
 * const routeAdjustments = await getTimeAdjustmentsByRoute({ routeId: 8 });
 * console.log(`Route adjustments: ${routeAdjustments.length}`);  // 15
 *
 * // Access adjustment details
 * allAdjustments.forEach(adj => {
 *   console.log(`${adj.RouteDescription}: ${adj.SailingDescription}`);
 *   console.log(`Tidal Adjustment: ${adj.TidalAdj}`);
 *   console.log(`Adjustment Type: ${adj.AdjType}`);
 * });
 * ```
 *
 * @module wsf-schedule/timeAdjustments
 */

import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getTimeAdjustments (all time adjustments)
// getTimeAdjustmentsByRoute (time adjustments for specific route)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/schedule/rest/timeadj";
const ENDPOINT_BY_ROUTE = "/ferries/api/schedule/rest/timeadjbyroute/{routeId}";

/**
 * Retrieves all time adjustments across all routes and schedules.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<TimeAdjustmentResponse[]> - Array of all time adjustment information
 *
 * @example
 * const allAdjustments = await getTimeAdjustments();
 * console.log(allAdjustments.length);  // 50+
 * console.log(allAdjustments[0].RouteDescription);  // "Seattle / Bainbridge Island"
 * console.log(allAdjustments[0].TidalAdj);  // false
 *
 * @throws {Error} When API is unavailable
 */
export const getTimeAdjustments = async (): Promise<
  TimeAdjustmentResponse[]
> => {
  return zodFetch(ENDPOINT_ALL, {
    output: timeAdjustmentsArraySchema,
  });
};

/**
 * Retrieves time adjustments for a specific route.
 *
 * @param params - Parameters object for route-specific time adjustments query
 * @param params.routeId - Unique route identifier (positive integer)
 * @returns Promise<TimeAdjustment[]> - Array of time adjustment information for the specified route
 *
 * @example
 * const routeAdjustments = await getTimeAdjustmentsByRoute({ routeId: 8 });
 * console.log(routeAdjustments.length);  // 15
 * console.log(routeAdjustments[0].AdjustmentMinutes);  // 30
 * console.log(routeAdjustments[0].Reason);  // "Tidal conditions"
 *
 * @throws {Error} When route ID is invalid or API is unavailable
 */
export const getTimeAdjustmentsByRoute = async (
  params: GetTimeAdjustmentsByRouteParams
): Promise<TimeAdjustment[]> => {
  return zodFetch(
    ENDPOINT_BY_ROUTE,
    {
      input: getTimeAdjustmentsByRouteParamsSchema,
      output: timeAdjustmentsByRouteArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTimeAdjustmentsByRouteParamsSchema
// GetTimeAdjustmentsByRouteParams
// ============================================================================

export const getTimeAdjustmentsByRouteParamsSchema = z
  .object({
    routeId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetTimeAdjustmentsByRouteParams = z.infer<
  typeof getTimeAdjustmentsByRouteParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// timeAdjustmentResponseSchema
// timeAdjustmentsArraySchema
// TimeAdjustmentResponse
// timeAdjustmentSchema
// timeAdjustmentsByRouteArraySchema
// TimeAdjustment
// ============================================================================

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

export const timeAdjustmentSchema = z
  .object({
    AdjustmentID: z.number().describe(""),
    SchedRouteID: z.number().describe(""),
    AdjustmentMinutes: z.number().describe(""),
    StartDate: zWsdotDate().describe(""),
    EndDate: zWsdotDate().describe(""),
    Reason: z.string().describe(""),
  })
  .describe("");

export const timeAdjustmentsByRouteArraySchema = z.array(timeAdjustmentSchema);

export type TimeAdjustment = z.infer<typeof timeAdjustmentSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTimeAdjustments
// useTimeAdjustmentsByRoute
// ============================================================================

/**
 * TanStack Query hook for all time adjustments with automatic updates.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TimeAdjustmentResponse[], Error> - Query result with all time adjustment data
 *
 * @example
 * const { data: allAdjustments, isLoading } = useTimeAdjustments();
 * if (allAdjustments) {
 *   console.log(`Total adjustments: ${allAdjustments.length}`);  // 50+
 *   console.log(allAdjustments[0].RouteDescription);  // "Seattle / Bainbridge Island"
 * }
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

/**
 * TanStack Query hook for route-specific time adjustments with automatic updates.
 *
 * @param params - Parameters object for route-specific time adjustments query
 * @param params.routeId - Unique route identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<TimeAdjustment[], Error> - Query result with route-specific time adjustment data
 *
 * @example
 * const { data: routeAdjustments, isLoading } = useTimeAdjustmentsByRoute({ routeId: 8 });
 * if (routeAdjustments) {
 *   console.log(`Route adjustments: ${routeAdjustments.length}`);  // 15
 *   console.log(routeAdjustments[0].AdjustmentMinutes);  // 30
 * }
 */
export const useTimeAdjustmentsByRoute = (
  params: GetTimeAdjustmentsByRouteParams,
  options?: TanStackOptions<TimeAdjustment[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "timeAdjustmentsByRoute",
      JSON.stringify(params),
    ],
    queryFn: () => getTimeAdjustmentsByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
