import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import { jsDateToYyyyMmDd } from "@/shared/fetching/zod/dateParsers";
import type { TanStackOptions } from "@/shared/tanstack";

import { getCacheFlushDateSchedule } from "./cacheFlushDateSchedule";
import { serviceDisruptionSchema } from "./routeDetails";

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
    tripDate: z.date().describe(""),
  })
  .describe("");

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
    RouteID: z.number().describe(""),
    RouteAbbrev: z.string().describe(""),
    Description: z.string().describe(""),
    RegionID: z.number().describe(""),
    ServiceDisruptions: z.array(serviceDisruptionSchema).describe(""),
  })
  .describe("");

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
