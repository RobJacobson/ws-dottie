import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import type { Route } from "./getRoutes";
import { routeSchema } from "./getRoutes";

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/routesbyterminals/{tripDate}/{departingTerminalId}/{arrivingTerminalId}";

/**
 * API function for fetching routes by terminals from WSF Schedule API
 *
 * Retrieves routes between specific terminal pairs for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate, departingTerminalId, and arrivingTerminalId
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @returns Promise resolving to an array of Route objects containing route information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const routes = await getRoutesByTerminals({
 *   tripDate: new Date('2024-01-15'),
 *   departingTerminalId: 1,
 *   arrivingTerminalId: 2
 * });
 * console.log(routes[0].RouteAbbrev); // "SEA-BI"
 * ```
 */
export const getRoutesByTerminals = async (
  params: GetRoutesByTerminalsParams
): Promise<Route[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getRoutesByTerminalsParamsSchema,
      output: routesArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getRoutesByTerminalsParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe("The trip date for which to retrieve route information."),
    departingTerminalId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the departing terminal."),
    arrivingTerminalId: z
      .number()
      .int()
      .positive()
      .describe("Unique identifier for the arriving terminal."),
  })
  .describe(
    "Parameters for retrieving routes between specific terminal pairs on a given trip date."
  );

export type GetRoutesByTerminalsParams = z.infer<
  typeof getRoutesByTerminalsParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const routesArraySchema = z.array(routeSchema);

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching routes by terminals from WSF Schedule API
 *
 * Retrieves routes between specific terminal pairs for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate, departingTerminalId, and arrivingTerminalId
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @param options - Optional React Query options
 * @returns React Query result object containing route information
 *
 * @example
 * ```typescript
 * const { data: routes } = useRoutesByTerminals({
 *   tripDate: new Date('2024-01-15'),
 *   departingTerminalId: 1,
 *   arrivingTerminalId: 2
 * });
 * console.log(routes?.[0]?.RouteAbbrev); // "SEA-BI"
 * ```
 */
export const useRoutesByTerminals = (
  params: GetRoutesByTerminalsParams,
  options?: TanStackOptions<Route[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "routesByTerminals",
      params.tripDate,
      params.departingTerminalId,
      params.arrivingTerminalId,
    ],
    queryFn: () => getRoutesByTerminals(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
