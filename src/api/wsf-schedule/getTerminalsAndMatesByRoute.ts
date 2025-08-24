import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/utils";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { getCacheFlushDateSchedule } from "./getCacheFlushDateSchedule";

// ============================================================================
// API Function
//
// getTerminalsAndMatesByRoute
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/terminalsandmatesbyroute/{tripDate}/{routeId}";

/**
 * API function for fetching terminals and mates by route from WSF Schedule API
 *
 * Retrieves valid terminal combinations (departing and arriving pairs) for a specific route and trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate and routeId
 * @param params.tripDate - The trip date as a Date object
 * @param params.routeId - The unique identifier for the route to get terminals for
 * @returns Promise resolving to an array of ScheduleTerminalCombo objects containing terminal combination information for the route
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const terminalCombos = await getTerminalsAndMatesByRoute({
 *   tripDate: new Date('2024-01-15'),
 *   routeId: 1
 * });
 * console.log(terminalCombos[0].DepartingDescription); // "Anacortes"
 * ```
 */
export const getTerminalsAndMatesByRoute = async (
  params: GetTerminalsAndMatesByRouteParams
): Promise<ScheduleTerminalCombo[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTerminalsAndMatesByRouteParamsSchema,
      output: scheduleTerminalCombosArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalsAndMatesByRouteParamsSchema
// GetTerminalsAndMatesByRouteParams
// ============================================================================

export const getTerminalsAndMatesByRouteParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe("The trip date for which to retrieve terminal information."),
    routeId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the ferry route to get terminals for."),
  })
  .describe(
    "Parameters for retrieving terminals and their mates for a specific route and trip date."
  );

export type GetTerminalsAndMatesByRouteParams = z.infer<
  typeof getTerminalsAndMatesByRouteParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// scheduleTerminalComboSchema
// scheduleTerminalCombosArraySchema
// ScheduleTerminalCombo
// ============================================================================

export const scheduleTerminalComboSchema = z
  .object({
    DepartingTerminalID: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the departing terminal"),
    DepartingDescription: z
      .string()
      .describe("Human-readable name for the departing terminal"),
    ArrivingTerminalID: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the arriving terminal"),
    ArrivingDescription: z
      .string()
      .describe("Human-readable name for the arriving terminal"),
  })
  .describe(
    "Schedule terminal combination information including departing and arriving terminal details"
  );

export const scheduleTerminalCombosArraySchema = z.array(
  scheduleTerminalComboSchema
);

export type ScheduleTerminalCombo = z.infer<typeof scheduleTerminalComboSchema>;

// ============================================================================
// TanStack Query Hook
//
// useTerminalsAndMatesByRoute
// ============================================================================

/**
 * React Query hook for fetching terminals and mates by route from WSF Schedule API
 *
 * Retrieves valid terminal combinations (departing and arriving pairs) for a specific route and trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate and routeId
 * @param params.tripDate - The trip date as a Date object
 * @param params.routeId - The unique identifier for the route to get terminals for
 * @param options - Optional React Query options
 * @returns React Query result object containing terminal combination information for the route
 *
 * @example
 * ```typescript
 * const { data: terminalCombos } = useTerminalsAndMatesByRoute({
 *   tripDate: new Date('2024-01-15'),
 *   routeId: 1
 * });
 * console.log(terminalCombos?.[0]?.DepartingDescription); // "Anacortes"
 * ```
 */
export const useTerminalsAndMatesByRoute = (
  params: { tripDate: Date; routeId: number },
  options?: TanStackOptions<ScheduleTerminalCombo[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "terminalsAndMatesByRoute",
      JSON.stringify(params),
    ],
    queryFn: () => getTerminalsAndMatesByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
