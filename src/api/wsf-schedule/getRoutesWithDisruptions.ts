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

const ENDPOINT = "/ferries/api/schedule/rest/routeswithdisruptions/{tripDate}";

/**
 * API function for fetching routes with disruptions from WSF Schedule API
 *
 * Retrieves routes with disruption information for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @returns Promise resolving to an array of Route objects containing route information with disruptions
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const routes = await getRoutesWithDisruptions({ tripDate: new Date('2024-01-15') });
 * console.log(routes[0].RouteAbbrev); // "SEA-BI"
 * ```
 */
export const getRoutesWithDisruptions = async (
  params: GetRoutesWithDisruptionsParams
): Promise<Route[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getRoutesWithDisruptionsParamsSchema,
      output: routesArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getRoutesWithDisruptionsParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve schedule information. This date determines which schedule data is returned."
      ),
  })
  .describe(
    "Parameters for retrieving routes with disruption information for a given trip date."
  );

export type GetRoutesWithDisruptionsParams = z.infer<
  typeof getRoutesWithDisruptionsParamsSchema
>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const routesArraySchema = z.array(routeSchema);

// ============================================================================
// QUERY HOOK
// ============================================================================

/**
 * React Query hook for fetching routes with disruptions from WSF Schedule API
 *
 * Retrieves routes with disruption information for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing route information with disruptions
 *
 * @example
 * ```typescript
 * const { data: routes } = useRoutesWithDisruptions({ tripDate: new Date('2024-01-15') });
 * console.log(routes?.[0]?.RouteAbbrev); // "SEA-BI"
 * ```
 */
export const useRoutesWithDisruptions = (
  params: GetRoutesWithDisruptionsParams,
  options?: TanStackOptions<Route[]>
) =>
  useQuery({
    queryKey: ["wsf", "schedule", "routesWithDisruptions", params.tripDate],
    queryFn: () => getRoutesWithDisruptions(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
  });
