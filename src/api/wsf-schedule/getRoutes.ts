import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { useQueryWithAutoUpdate } from "@/shared/tanstack";

import { getCacheFlushDateSchedule } from "./getCacheFlushDateSchedule";
import { serviceDisruptionSchema } from "./getRouteDetails";

// ============================================================================
// API Function
//
// getRoutes
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/routes/{tripDate}";

/**
 * API function for fetching routes from WSF Schedule API
 *
 * Retrieves valid routes for a given trip date. A valid trip date may be determined
 * using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @returns Promise resolving to an array of Route objects containing route information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const routes = await getRoutes({ tripDate: new Date('2024-01-15') });
 * console.log(routes[0].RouteAbbrev); // "SEA-BI"
 * ```
 */
export const getRoutes = async (params: GetRoutesParams): Promise<Route[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getRoutesParamsSchema,
      output: routesArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getRoutesParamsSchema
// GetRoutesParams
// ============================================================================

export const getRoutesParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve schedule information. This date determines which schedule data is returned."
      ),
  })
  .describe("Parameters for retrieving valid routes for a given trip date.");

export type GetRoutesParams = z.infer<typeof getRoutesParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// routeSchema
// routesArraySchema
// Route
// ============================================================================

export const routeSchema = z
  .object({
    RouteID: z
      .number()
      .describe(
        "Unique identifier for the ferry route. Primary key for route identification and used consistently across all WSF systems and APIs."
      ),
    RouteAbbrev: z
      .string()
      .describe(
        "Abbreviated name for the route. Short identifier used in displays, schedules, and references (e.g., 'SEA-BI' for Seattle to Bainbridge Island, 'ANA-SID' for Anacortes to Sidney BC)."
      ),
    Description: z
      .string()
      .describe(
        "Full description of the route. Provides detailed information about the route's purpose, terminals served, and operational characteristics for passenger information."
      ),
    RegionID: z
      .number()
      .describe(
        "Geographic region identifier for the route. Groups routes by geographic area and helps organize ferry operations by service region within the WSF system."
      ),
    ServiceDisruptions: z
      .array(serviceDisruptionSchema)
      .optional()
      .describe(
        "Optional array of service disruption information for this route. Contains current disruption status, delays, cancellations, or other operational issues affecting this specific route."
      ),
  })
  .describe(
    "Basic route information including identification, description, geographic region, and optional alert status. This schema provides the fundamental route data used across the WSF system for passenger information and operational management."
  );

export const routesArraySchema = z.array(routeSchema);

export type Route = z.infer<typeof routeSchema>;

// ============================================================================
// TanStack Query Hook
//
// useRoutes
// ============================================================================

/**
 * React Query hook for fetching routes from WSF Schedule API
 *
 * Retrieves valid routes for a given trip date. A valid trip date may be determined
 * using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing route information
 *
 * @example
 * ```typescript
 * const { data: routes } = useRoutes({ tripDate: new Date('2024-01-15') });
 * console.log(routes?.[0]?.RouteAbbrev); // "SEA-BI"
 * ```
 */
export const useRoutes = (
  params: GetRoutesParams,
  options?: TanStackOptions<Route[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "routes", JSON.stringify(params)],
    queryFn: () => getRoutes(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
