import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import type { ScheduleTerminalCombo } from "./getScheduleTerminalComboById";
import { scheduleTerminalComboSchema } from "./getScheduleTerminalComboById";

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/terminalsandmatesbyroute/{tripDate}/{routeId}";

/**
 * API function for fetching terminals and mates by route from WSF Schedule API
 *
 * Provides valid departing and arriving terminal combinations for a given trip date and route.
 * Valid routes may be found by using routes. Similarly, a valid trip date may be determined
 * using validDateRange.
 *
 * @param params - Object containing tripDate and routeId
 * @param params.tripDate - The trip date as a Date object
 * @param params.routeId - The unique identifier for the route
 * @returns Promise resolving to an array of ScheduleTerminalCombo objects containing terminal combinations for the route
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const combos = await getTerminalsAndMatesByRoute({
 *   tripDate: new Date('2024-01-15'),
 *   routeId: 1
 * });
 * console.log(combos[0].DepartingDescription); // "Seattle"
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
// INPUT SCHEMA & TYPES
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
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const scheduleTerminalCombosArraySchema = z.array(
  scheduleTerminalComboSchema
);

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching terminals and mates by route from WSF Schedule API
 *
 * Provides valid departing and arriving terminal combinations for a given trip date and route.
 * Valid routes may be found by using routes. Similarly, a valid trip date may be determined
 * using validDateRange.
 *
 * @param params - Object containing tripDate and routeId
 * @param params.tripDate - The trip date as a Date object
 * @param params.routeId - The unique identifier for the route
 * @param options - Optional React Query options
 * @returns React Query result object containing terminal combinations for the route
 *
 * @example
 * ```typescript
 * const { data: combos } = useTerminalsAndMatesByRoute({
 *   tripDate: new Date('2024-01-15'),
 *   routeId: 1
 * });
 * console.log(combos?.[0]?.DepartingDescription); // "Seattle"
 * ```
 */
export const useTerminalsAndMatesByRoute = (
  params: GetTerminalsAndMatesByRouteParams,
  options?: TanStackOptions<ScheduleTerminalCombo[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "terminalsAndMatesByRoute",
      params.tripDate,
      params.routeId,
    ],
    queryFn: () => getTerminalsAndMatesByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
