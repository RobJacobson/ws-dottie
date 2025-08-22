import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import { jsDateToYyyyMmDd } from "@/shared/fetching/parsing";
import type { TanStackOptions } from "@/shared/types";

// ============================================================================
// API FUNCTION
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
// INPUT SCHEMA & TYPES
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
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const scheduleResponseSchema = z
  .object({
    RouteID: z
      .number()
      .describe(
        "Unique identifier for the route. Links the schedule to a specific ferry route."
      ),
    RouteAbbrev: z
      .string()
      .describe(
        "Abbreviated name for the route. Short identifier used in displays and references."
      ),
    Description: z
      .string()
      .describe(
        "Full description of the route. Provides detailed information about the route's purpose and characteristics."
      ),
    Schedules: z
      .array(z.unknown())
      .describe(
        "Array of schedule information for this route. Contains detailed scheduling data."
      ),
  })
  .describe(
    "Schedule response information including route details and schedule data. This schema provides comprehensive schedule information for a specific route."
  );

export const scheduleResponseArraySchema = z.array(scheduleResponseSchema);

export type ScheduleResponse = z.infer<typeof scheduleResponseSchema>;

// ============================================================================
// QUERY HOOK
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
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleByRoute",
      params.tripDate,
      params.routeId,
    ],
    queryFn: () => getScheduleByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
