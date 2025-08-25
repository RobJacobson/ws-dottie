import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "./getCacheFlushDateSchedule";
import { annotationSchema } from "./getRouteDetails";

// ============================================================================
// API Function
//
// getScheduleByRoute
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/schedulebyroute/{tripDate}/{routeId}";

/**
 * API function for fetching schedule by route from WSF Schedule API
 *
 * Retrieves schedule information for a specific route and trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate and routeId
 * @param params.tripDate - The trip date as a Date object
 * @param params.routeId - The unique identifier for the route
 * @returns Promise resolving to an array of ScheduleResponse objects containing schedule information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const schedule = await getScheduleByRoute({
 *   tripDate: new Date('2024-01-15'),
 *   routeId: 1
 * });
 * console.log(schedule[0].RouteAbbrev); // "SEA-BI"
 * ```
 */
export const getScheduleByRoute = async (
  params: GetScheduleByRouteParams
): Promise<ScheduleResponse[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getScheduleByRouteParamsSchema,
      output: scheduleResponseArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getScheduleByRouteParamsSchema
// GetScheduleByRouteParams
// ============================================================================

export const getScheduleByRouteParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe("The trip date for which to retrieve schedule information."),
    routeId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the route to get schedule for."),
  })
  .describe(
    "Parameters for retrieving schedule information for a specific route and trip date."
  );

export type GetScheduleByRouteParams = z.infer<
  typeof getScheduleByRouteParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// sailingTimeSchema
// scheduleRouteTerminalComboSchema
// scheduleResponseSchema
// scheduleResponseArraySchema
// ScheduleResponse
// SailingTime
// ScheduleRouteTerminalCombo
// ============================================================================

export const sailingTimeSchema = z
  .object({
    DepartingTime: zWsdotDate().describe("Departure time for this sailing"),
    ArrivingTime: zWsdotDate()
      .nullable()
      .describe("Arrival time for this sailing (may be null)"),
    LoadingRule: z
      .number()
      .describe("Loading rule identifier for this sailing"),
    VesselID: z
      .number()
      .describe("Unique identifier for the vessel assigned to this sailing"),
    VesselName: z
      .string()
      .describe("Name of the vessel assigned to this sailing"),
    VesselHandicapAccessible: z
      .boolean()
      .describe(
        "Whether the vessel is accessible for passengers with disabilities"
      ),
    VesselPositionNum: z
      .number()
      .describe("Position number of the vessel in the sailing sequence"),
    Routes: z
      .array(z.number())
      .describe("Array of route IDs associated with this sailing"),
    AnnotationIndexes: z
      .array(z.number())
      .describe("Indexes to annotation information for this sailing"),
  })
  .describe("Individual sailing time information");

export const scheduleRouteTerminalComboSchema = z
  .object({
    DepartingTerminalID: z
      .number()
      .describe("Unique identifier for the departing terminal"),
    DepartingTerminalName: z
      .string()
      .describe("Name of the departing terminal"),
    ArrivingTerminalID: z
      .number()
      .describe("Unique identifier for the arriving terminal"),
    ArrivingTerminalName: z.string().describe("Name of the arriving terminal"),
    SailingNotes: z
      .string()
      .describe("Additional notes about this terminal combination"),
    Annotations: z
      .array(annotationSchema)
      .describe("Array of annotations for this terminal combination"),
    Times: z
      .array(sailingTimeSchema)
      .describe("Array of sailing times for this terminal combination"),
    AnnotationsIVR: z
      .array(z.string())
      .describe("IVR-specific annotations for this terminal combination"),
  })
  .describe("Terminal combination with associated sailing times");

export const scheduleResponseSchema = z
  .object({
    ScheduleID: z.number().describe("Unique identifier for the schedule"),
    ScheduleName: z
      .string()
      .describe("Name of the schedule (e.g., 'Summer 2025')"),
    ScheduleSeason: z.number().describe("Season identifier for the schedule"),
    SchedulePDFUrl: z.string().describe("URL to PDF version of the schedule"),
    ScheduleStart: zWsdotDate().describe("Start date of the schedule"),
    ScheduleEnd: zWsdotDate().describe("End date of the schedule"),
    AllRoutes: z
      .array(z.number())
      .describe("Array of all route IDs covered by this schedule"),
    TerminalCombos: z
      .array(scheduleRouteTerminalComboSchema)
      .describe("Array of terminal combinations with sailing times"),
  })
  .describe(
    "Complete schedule response including schedule metadata and terminal combinations with sailing times. This schema provides comprehensive schedule information for a specific route and date."
  );

export const scheduleResponseArraySchema = z.array(scheduleResponseSchema);

export type ScheduleResponse = z.infer<typeof scheduleResponseSchema>;
export type SailingTime = z.infer<typeof sailingTimeSchema>;
export type ScheduleRouteTerminalCombo = z.infer<
  typeof scheduleRouteTerminalComboSchema
>;

// ============================================================================
// TanStack Query Hook
//
// useScheduleByRoute
// ============================================================================

/**
 * React Query hook for fetching schedule by route from WSF Schedule API
 *
 * Retrieves schedule information for a specific route and trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate and routeId
 * @param params.tripDate - The trip date as a Date object
 * @param params.routeId - The unique identifier for the route
 * @param options - Optional React Query options
 * @returns React Query result object containing schedule information
 *
 * @example
 * ```typescript
 * const { data: schedule } = useScheduleByRoute({
 *   tripDate: new Date('2024-01-15'),
 *   routeId: 1
 * });
 * console.log(schedule?.[0]?.RouteAbbrev); // "SEA-BI"
 * ```
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
