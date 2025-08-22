import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import { type RouteDetails, routeDetailsArraySchema } from "./getRouteDetails";

// ======================================================d======================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getRouteDetailsByTerminalsParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe("The trip date for which to retrieve route details."),
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
    "Parameters for retrieving detailed route information between specific terminal pairs on a given trip date."
  );

export type GetRouteDetailsByTerminalsParams = z.infer<
  typeof getRouteDetailsByTerminalsParamsSchema
>;

// ============================================================================
// API FUNCTION
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/routedetailsbyterminals/{tripDate}/{departingTerminalId}/{arrivingTerminalId}";

/**
 * API function for fetching route details by terminals from WSF Schedule API
 *
 * Retrieves detailed route information between specific terminal pairs for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate, departingTerminalId, and arrivingTerminalId
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @returns Promise resolving to an array of RouteDetails objects containing detailed route information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const routeDetails = await getRouteDetailsByTerminals({
 *   tripDate: new Date('2024-01-15'),
 *   departingTerminalId: 1,
 *   arrivingTerminalId: 2
 * });
 * console.log(routeDetails[0].RouteAbbrev); // "SEA-BI"
 * ```
 */
export const getRouteDetailsByTerminals = async (
  params: GetRouteDetailsByTerminalsParams
): Promise<RouteDetails[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getRouteDetailsByTerminalsParamsSchema,
      output: routeDetailsArraySchema,
    },
    params
  );
};

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching route details by terminals from WSF Schedule API
 *
 * Retrieves detailed route information between specific terminal pairs for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate, departingTerminalId, and arrivingTerminalId
 * @param params.tripDate - The trip date as a Date object
 * @param params.departingTerminalId - The unique identifier for the departing terminal
 * @param params.arrivingTerminalId - The unique identifier for the arriving terminal
 * @param options - Optional React Query options
 * @returns React Query result object containing detailed route information
 *
 * @example
 * ```typescript
 * const { data: routeDetails } = useRouteDetailsByTerminals({
 *   tripDate: new Date('2024-01-15'),
 *   departingTerminalId: 1,
 *   arrivingTerminalId: 2
 * });
 * console.log(routeDetails?.[0]?.RouteAbbrev); // "SEA-BI"
 * ```
 */
export const useRouteDetailsByTerminals = (
  params: GetRouteDetailsByTerminalsParams,
  options?: TanStackOptions<RouteDetails[]>
) =>
  useQuery({
    queryKey: [
      "wsf",
      "schedule",
      "routeDetailsByTerminals",
      params.tripDate,
      params.departingTerminalId,
      params.arrivingTerminalId,
    ],
    queryFn: () => getRouteDetailsByTerminals(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
