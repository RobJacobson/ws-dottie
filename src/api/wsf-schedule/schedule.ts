/**
 * WSF Schedule API - Schedule
 *
 * Provides comprehensive schedule information for Washington State Ferry routes including:
 * - Complete sailing schedules between terminal pairs and by route
 * - Today's schedule information with remaining sailing times
 * - Vessel assignments and operational details
 * - Schedule metadata including PDF URLs and seasonal information
 * - Terminal combinations with sailing times and annotations
 *
 * This API returns detailed schedule data organized by terminal pairs or routes, including
 * multiple sailing times per day with vessel assignments. The schedule includes both
 * regular schedules and today's schedules with remaining sailing times, making it ideal
 * for real-time passenger information and trip planning applications.
 *
 * API Functions:
 * - getScheduleByTerminals: Returns schedule for a specific terminal pair on a given date
 * - getScheduleByRoute: Returns schedule for a specific route on a given date
 * - getScheduleTodayByTerminals: Returns today's schedule for a terminal pair (remaining sailings)
 * - getScheduleTodayByRoute: Returns today's schedule for a specific route
 *
 * Input/Output Overview:
 * - getScheduleByTerminals: Input: { tripDate: Date, departingTerminalId: number, arrivingTerminalId: number }, Output: ScheduleResponse[]
 * - getScheduleByRoute: Input: { tripDate: Date, routeId: number }, Output: ScheduleResponse[]
 * - getScheduleTodayByTerminals: Input: { departingTerminalId: number, arrivingTerminalId: number }, Output: ScheduleResponse
 * - getScheduleTodayByRoute: Input: { tripDate: Date, routeId: number }, Output: ScheduleResponse[]
 *
 * Base Type: ScheduleResponse
 *
 * interface ScheduleResponse {
 *   ScheduleID: number;
 *   ScheduleName: string;
 *   ScheduleSeason: number;
 *   SchedulePDFUrl: string;
 *   ScheduleStart: Date;
 *   ScheduleEnd: Date;
 *   AllRoutes: number[];
 *   TerminalCombos: Array<{
 *     DepartingTerminalID: number;
 *     DepartingTerminalName: string;
 *     ArrivingTerminalID: number;
 *     ArrivingTerminalName: string;
 *     SailingNotes: string;
 *     Annotations: Annotation[];
 *     Times: Array<{
 *       DepartingTime: Date;
 *       ArrivingTime: Date | null;
 *       LoadingRule: number;
 *       VesselID: number;
 *       VesselName: string;
 *       VesselHandicapAccessible: boolean;
 *       VesselPositionNum: number;
 *       Routes: number[];
 *       AnnotationIndexes: number[];
 *     }>;
 *     AnnotationsIVR: string[];
 *   }>;
 * }
 *
 * Note: The API endpoints use different URL patterns than initially implemented.
 * The correct endpoints are /schedule/{tripDate}/{departingTerminalId}/{arrivingTerminalId}
 * and /schedule/{tripDate}/{routeId} for the main schedule functions.
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/schedule/rest/schedule/2025-08-26/7/3?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * {
 *   "ScheduleID": 192,
 *   "ScheduleName": "Summer 2025",
 *   "ScheduleSeason": 1,
 *   "SchedulePDFUrl": "http://www.wsdot.wa.gov/ferries/pdf/2025Summer.pdf",
 *   "ScheduleStart": "/Date(1749970800000-0700)/",
 *   "ScheduleEnd": "/Date(1758351600000-0700)/",
 *   "AllRoutes": [5],
 *   "TerminalCombos": [{
 *     "DepartingTerminalID": 7,
 *     "DepartingTerminalName": "Seattle",
 *     "ArrivingTerminalID": 3,
 *     "ArrivingTerminalName": "Bainbridge Island",
 *     "SailingNotes": "",
 *     "Annotations": [],
 *     "Times": [{
 *       "DepartingTime": "/Date(1756211400000-0700)/",
 *       "ArrivingTime": null,
 *       "LoadingRule": 3,
 *       "VesselID": 32,
 *       "VesselName": "Tacoma",
 *       "VesselHandicapAccessible": true,
 *       "VesselPositionNum": 1,
 *       "Routes": [5],
 *       "AnnotationIndexes": []
 *     }],
 *     "AnnotationsIVR": []
 *   }]
 * }
 * ```
 *
 * @see {@link https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html WSF Schedule API Documentation}
 * @see {@link https://www.wsdot.wa.gov/ferries/schedule/ WSF Schedules}
 *
 * @example
 * ```typescript
 * import { getScheduleByTerminals, getScheduleByRoute } from '@ferryjoy/ws-dottie';
 *
 * // Get schedule between Seattle and Bainbridge Island
 * const schedule = await getScheduleByTerminals({
 *   tripDate: new Date('2025-08-26'),
 *   departingTerminalId: 7,  // Seattle
 *   arrivingTerminalId: 3   // Bainbridge Island
 * });
 *
 * // Access schedule details
 * schedule.forEach(sched => {
 *   console.log(`Schedule: ${sched.ScheduleName}`);
 *   console.log(`Terminal Combinations: ${sched.TerminalCombos.length}`);
 *
 *   sched.TerminalCombos.forEach(combo => {
 *     console.log(`From ${combo.DepartingTerminalName} to ${combo.ArrivingTerminalName}`);
 *     console.log(`Sailing Times: ${combo.Times.length}`);
 *   });
 * });
 * ```
 *
 * @module wsf-schedule/schedule
 */

import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";
import { annotationSchema } from "./routeDetails";

// ============================================================================
// API Functions
//
// getScheduleByTerminals (schedule for terminal pair)
// getScheduleByRoute (schedule for specific route)
// ============================================================================

const ENDPOINT_BY_TERMINALS =
  "/ferries/api/schedule/rest/schedulebyterminals/{tripDate}/{departingTerminalId}/{arrivingTerminalId}";
const ENDPOINT_BY_ROUTE =
  "/ferries/api/schedule/rest/schedulebyroute/{tripDate}/{routeId}";
const ENDPOINT_TODAY_BY_TERMINALS =
  "/ferries/api/schedule/rest/scheduletoday/{departingTerminalId}/{arrivingTerminalId}/{onlyRemainingTimes}";
const ENDPOINT_TODAY_BY_ROUTE =
  "/ferries/api/schedule/rest/scheduletodaybyroute/{tripDate}/{routeId}";

/**
 * Retrieves schedule information for a specific terminal pair on a given date.
 *
 * @param params - Parameters object for terminal-based schedule query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @param params.departingTerminalId - Unique identifier for departing terminal (positive integer)
 * @param params.arrivingTerminalId - Unique identifier for arriving terminal (positive integer)
 * @returns Promise<ScheduleResponse[]> - Array of schedule information including sailing times and vessel details
 *
 * @example
 * const schedule = await getScheduleByTerminals({
 *   tripDate: new Date('2025-01-27'),
 *   departingTerminalId: 7,  // Seattle
 *   arrivingTerminalId: 3   // Bainbridge Island
 * });
 * console.log(schedule[0].ScheduleName);  // "Summer Schedule"
 * console.log(schedule[0].TerminalCombos.length);  // 1
 *
 * @throws {Error} When terminal IDs are invalid, date is invalid, or API is unavailable
 */
export const getScheduleByTerminals = async (
  params: GetScheduleByTerminalsParams
): Promise<ScheduleResponse[]> => {
  return zodFetch(
    ENDPOINT_BY_TERMINALS,
    {
      input: getScheduleByTerminalsParamsSchema,
      output: scheduleResponseArraySchema,
    },
    params
  );
};

/**
 * Retrieves schedule information for a specific route on a given date.
 *
 * @param params - Parameters object for route-based schedule query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @param params.routeId - Unique identifier for the route (positive integer)
 * @returns Promise<ScheduleResponse[]> - Array of schedule information including sailing times and vessel details
 *
 * @example
 * const schedule = await getScheduleByRoute({
 *   tripDate: new Date('2025-01-27'),
 *   routeId: 5  // Seattle/Bainbridge Island route
 * });
 * console.log(schedule[0].ScheduleName);  // "Summer Schedule"
 * console.log(schedule[0].TerminalCombos.length);  // 1
 *
 * @throws {Error} When route ID is invalid, date is invalid, or API is unavailable
 */
export const getScheduleByRoute = async (
  params: GetScheduleByRouteParams
): Promise<ScheduleResponse[]> => {
  return zodFetch(
    ENDPOINT_BY_ROUTE,
    {
      input: getScheduleByRouteParamsSchema,
      output: scheduleResponseArraySchema,
    },
    params
  );
};

/**
 * Retrieves today's schedule information for a specific terminal pair.
 *
 * @param params - Parameters object for today's terminal-based schedule query
 * @param params.departingTerminalId - Unique identifier for departing terminal (positive integer)
 * @param params.arrivingTerminalId - Unique identifier for arriving terminal (positive integer)
 * @returns Promise<ScheduleResponse> - Today's schedule information including remaining sailing times and vessel details
 *
 * @example
 * const todaySchedule = await getScheduleTodayByTerminals({
 *   departingTerminalId: 7,  // Seattle
 *   arrivingTerminalId: 3   // Bainbridge Island
 * });
 * console.log(todaySchedule.ScheduleName);  // "Summer 2025"
 * console.log(todaySchedule.TerminalCombos[0].Times.length);  // 8 (remaining sailings)
 *
 * @throws {Error} When terminal IDs are invalid or API is unavailable
 */
export const getScheduleTodayByTerminals = async (
  params: GetScheduleTodayByTerminalsParams
): Promise<ScheduleResponse> => {
  return zodFetch(
    ENDPOINT_TODAY_BY_TERMINALS,
    {
      input: getScheduleTodayByTerminalsParamsSchema,
      output: scheduleResponseSchema,
    },
    params
  );
};

/**
 * Retrieves today's schedule information for a specific route.
 *
 * @param params - Parameters object for today's route-based schedule query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @param params.routeId - Unique identifier for the route (positive integer)
 * @returns Promise<ScheduleResponse[]> - Array of today's schedule information including sailing times and vessel details
 *
 * @example
 * const todaySchedule = await getScheduleTodayByRoute({
 *   tripDate: new Date('2025-01-27'),
 *   routeId: 5  // Seattle/Bainbridge Island route
 * });
 * console.log(todaySchedule[0].ScheduleName);  // "Summer 2025"
 *
 * @throws {Error} When route ID is invalid, date is invalid, or API is unavailable
 *
 * Note: This endpoint may have implementation issues based on testing results.
 */
export const getScheduleTodayByRoute = async (
  params: GetScheduleTodayByRouteParams
): Promise<ScheduleResponse[]> => {
  return zodFetch(
    ENDPOINT_TODAY_BY_ROUTE,
    {
      input: getScheduleTodayByRouteParamsSchema,
      output: scheduleResponseArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getScheduleByTerminalsParamsSchema
// GetScheduleByTerminalsParams
// getScheduleByRouteParamsSchema
// GetScheduleByRouteParams
// ============================================================================

/**
 * Parameters for retrieving schedule information between specific terminal pairs
 */
export const getScheduleByTerminalsParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    departingTerminalId: z.number().int().positive().describe(""),
    arrivingTerminalId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetScheduleByTerminalsParams = z.infer<
  typeof getScheduleByTerminalsParamsSchema
>;

/**
 * Parameters for retrieving schedule information for a specific route
 */
export const getScheduleByRouteParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    routeId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetScheduleByRouteParams = z.infer<
  typeof getScheduleByRouteParamsSchema
>;

/**
 * Parameters for retrieving today's schedule information between specific terminal pairs
 */
export const getScheduleTodayByTerminalsParamsSchema = z
  .object({
    departingTerminalId: z.number().int().positive().describe(""),
    arrivingTerminalId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetScheduleTodayByTerminalsParams = z.infer<
  typeof getScheduleTodayByTerminalsParamsSchema
>;

/**
 * Parameters for retrieving today's schedule information for a specific route
 */
export const getScheduleTodayByRouteParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    routeId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetScheduleTodayByRouteParams = z.infer<
  typeof getScheduleTodayByRouteParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// sailingTimeSchema
// scheduleRouteTerminalComboSchema
// scheduleResponseSchema
// scheduleResponseArraySchema
// ScheduleResponse
// SailingTime
// ScheduleRouteTerminalCombo
// ============================================================================

/**
 * Sailing time information schema - includes departure/arrival times and vessel details
 */
export const sailingTimeSchema = z
  .object({
    DepartingTime: zWsdotDate().describe(""),
    ArrivingTime: zWsdotDate().nullable().describe(""),
    LoadingRule: z.number().describe(""),
    VesselID: z.number().describe(""),
    VesselName: z.string().describe(""),
    VesselHandicapAccessible: z.boolean().describe(""),
    VesselPositionNum: z.number().describe(""),
    Routes: z.array(z.number()).describe(""),
    AnnotationIndexes: z.array(z.number()).describe(""),
  })
  .describe("");

/**
 * Schedule route terminal combination schema - includes terminal pair information and sailing times
 */
export const scheduleRouteTerminalComboSchema = z
  .object({
    DepartingTerminalID: z.number().describe(""),
    DepartingTerminalName: z.string().describe(""),
    ArrivingTerminalID: z.number().describe(""),
    ArrivingTerminalName: z.string().describe(""),
    SailingNotes: z.string().describe(""),
    Annotations: z.array(annotationSchema).describe(""),
    Times: z.array(sailingTimeSchema).describe(""),
    AnnotationsIVR: z.array(z.string()).describe(""),
  })
  .describe("");

/**
 * Complete schedule response schema - includes schedule metadata and terminal combinations
 */
export const scheduleResponseSchema = z
  .object({
    ScheduleID: z.number().describe(""),
    ScheduleName: z.string().describe(""),
    ScheduleSeason: z.number().describe(""),
    SchedulePDFUrl: z.string().describe(""),
    ScheduleStart: zWsdotDate().describe(""),
    ScheduleEnd: zWsdotDate().describe(""),
    AllRoutes: z.array(z.number()).describe(""),
    TerminalCombos: z.array(scheduleRouteTerminalComboSchema).describe(""),
  })
  .describe("");

/**
 * Array of schedule response objects - wrapper around scheduleResponseSchema
 */
export const scheduleResponseArraySchema = z.array(scheduleResponseSchema);

/**
 * ScheduleResponse type - represents complete schedule information including metadata and terminal combinations
 */
export type ScheduleResponse = z.infer<typeof scheduleResponseSchema>;

/**
 * SailingTime type - represents a single sailing time with vessel and route information
 */
export type SailingTime = z.infer<typeof sailingTimeSchema>;

/**
 * ScheduleRouteTerminalCombo type - represents terminal pair information with sailing times
 */
export type ScheduleRouteTerminalCombo = z.infer<
  typeof scheduleRouteTerminalComboSchema
>;

// ============================================================================
// TanStack Query Hooks
//
// useScheduleByTerminals
// useScheduleByRoute
// ============================================================================

/**
 * TanStack Query hook for terminal-based schedules with automatic updates.
 *
 * @param params - Parameters object for terminal-based schedule query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @param params.departingTerminalId - Unique identifier for departing terminal (positive integer)
 * @param params.arrivingTerminalId - Unique identifier for arriving terminal (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<ScheduleResponse[], Error> - Query result with terminal-based schedule data
 *
 * @example
 * const { data: schedule, isLoading } = useScheduleByTerminals({
 *   tripDate: new Date('2025-01-27'),
 *   departingTerminalId: 7,  // Seattle
 *   arrivingTerminalId: 3   // Bainbridge Island
 * });
 * if (schedule) {
 *   console.log(schedule[0].ScheduleName);  // "Summer Schedule"
 * }
 */
export const useScheduleByTerminals = (
  params: GetScheduleByTerminalsParams,
  options?: TanStackOptions<ScheduleResponse[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleByTerminals",
      JSON.stringify(params),
    ],
    queryFn: () => getScheduleByTerminals(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });

/**
 * TanStack Query hook for route-based schedules with automatic updates.
 *
 * @param params - Parameters object for route-based schedule query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @param params.routeId - Unique identifier for the route (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<ScheduleResponse[], Error> - Query result with route-based schedule data
 *
 * @example
 * const { data: schedule, isLoading } = useScheduleByRoute({
 *   tripDate: new Date('2025-01-27'),
 *   routeId: 5  // Seattle/Bainbridge Island route
 * });
 * if (schedule) {
 *   console.log(schedule[0].ScheduleName);  // "Summer Schedule"
 * }
 */
export const useScheduleByRoute = (
  params: GetScheduleByRouteParams,
  options?: TanStackOptions<ScheduleResponse[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "scheduleByRoute", JSON.stringify(params)],
    queryFn: () => getScheduleByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });

/**
 * TanStack Query hook for today's terminal-based schedules with automatic updates.
 *
 * @param params - Parameters object for today's terminal-based schedule query
 * @param params.departingTerminalId - Unique identifier for departing terminal (positive integer)
 * @param params.arrivingTerminalId - Unique identifier for arriving terminal (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<ScheduleResponse, Error> - Query result with today's terminal-based schedule data
 *
 * @example
 * const { data: todaySchedule, isLoading } = useScheduleTodayByTerminals({
 *   departingTerminalId: 7,  // Seattle
 *   arrivingTerminalId: 3   // Bainbridge Island
 * });
 * if (todaySchedule) {
 *   console.log(todaySchedule.ScheduleName);  // "Summer 2025"
 *   console.log(todaySchedule.TerminalCombos[0].Times.length);  // 8 (remaining sailings)
 * }
 */
export const useScheduleTodayByTerminals = (
  params: GetScheduleTodayByTerminalsParams,
  options?: TanStackOptions<ScheduleResponse>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleTodayByTerminals",
      JSON.stringify(params),
    ],
    queryFn: () => getScheduleTodayByTerminals(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });

/**
 * TanStack Query hook for today's route-based schedules with automatic updates.
 *
 * @param params - Parameters object for today's route-based schedule query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @param params.routeId - Unique identifier for the route (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<ScheduleResponse[], Error> - Query result with today's route-based schedule data
 *
 * @example
 * const { data: todaySchedule, isLoading } = useScheduleTodayByRoute({
 *   tripDate: new Date('2025-01-27'),
 *   routeId: 5  // Seattle/Bainbridge Island route
 * });
 * if (todaySchedule) {
 *   console.log(todaySchedule[0].ScheduleName);  // "Summer 2025"
 * }
 *
 * Note: This endpoint may have implementation issues based on testing results.
 */
export const useScheduleTodayByRoute = (
  params: GetScheduleTodayByRouteParams,
  options?: TanStackOptions<ScheduleResponse[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleToday",
      "scheduleTodayByRoute",
      JSON.stringify(params),
    ],
    queryFn: () => getScheduleTodayByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
