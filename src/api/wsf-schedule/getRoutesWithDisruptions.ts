import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/caching";
import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import { jsDateToYyyyMmDd } from "@/shared/fetching/parsing";
import type { TanStackOptions } from "@/shared/types";

import { getCacheFlushDateSchedule } from "./getCacheFlushDateSchedule";
import { serviceDisruptionSchema } from "./getRouteDetails";

// ============================================================================
// API Function
//
// getRoutesWithDisruptions
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}";

/**
 * API function for fetching routes with service disruptions from WSF Schedule API
 *
 * Retrieves routes that currently have service disruptions for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @returns Promise resolving to an array of Route objects containing route information with disruptions
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const routesWithDisruptions = await getRoutesWithDisruptions({ tripDate: new Date('2024-01-15') });
 * console.log(routesWithDisruptions[0].RouteAbbrev); // "SEA-BI"
 * ```
 */
export const getRoutesWithDisruptions = async (
  params: GetRoutesWithDisruptionsParams
): Promise<RouteWithDisruptions[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getRoutesWithDisruptionsParamsSchema,
      output: routesWithDisruptionsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getRoutesWithDisruptionsParamsSchema
// GetRoutesWithDisruptionsParams
// ============================================================================

export const getRoutesWithDisruptionsParamsSchema = z
  .object({
    tripDate: z
      .date()
      .describe(
        "The trip date for which to retrieve routes with service disruptions. This date determines which schedule data is returned."
      ),
  })
  .describe(
    "Parameters for retrieving routes with service disruptions for a given trip date."
  );

export type GetRoutesWithDisruptionsParams = z.infer<
  typeof getRoutesWithDisruptionsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// routeWithDisruptionsSchema
// routesWithDisruptionsArraySchema
// RouteWithDisruptions
// ============================================================================

export const routeWithDisruptionsSchema = z
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
      .describe(
        "Array of service disruption information for this route. Contains current disruption status, delays, cancellations, or other operational issues affecting this specific route."
      ),
  })
  .describe(
    "Route information for routes currently experiencing service disruptions. This schema provides basic route details along with current disruption status for passenger information and operational management."
  );

export const routesWithDisruptionsArraySchema = z.array(
  routeWithDisruptionsSchema
);

export type RouteWithDisruptions = z.infer<typeof routeWithDisruptionsSchema>;

// ============================================================================
// TanStack Query Hook
//
// useRoutesWithDisruptions
// ============================================================================

/**
 * React Query hook for fetching routes with service disruptions from WSF Schedule API
 *
 * Retrieves routes that currently have service disruptions for a given trip date.
 * A valid trip date may be determined using validDateRange.
 *
 * @param params - Object containing tripDate
 * @param params.tripDate - The trip date as a Date object
 * @param options - Optional React Query options
 * @returns React Query result object containing route information with disruptions
 *
 * @example
 * ```typescript
 * const { data: routesWithDisruptions } = useRoutesWithDisruptions({ tripDate: new Date('2024-01-15') });
 * console.log(routesWithDisruptions?.[0]?.RouteAbbrev); // "SEA-BI"
 * ```
 */
export const useRoutesWithDisruptions = (
  params: GetRoutesWithDisruptionsParams,
  options?: TanStackOptions<RouteWithDisruptions[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "routesWithDisruptions",
      JSON.stringify(params),
    ],
    queryFn: () => getRoutesWithDisruptions(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
