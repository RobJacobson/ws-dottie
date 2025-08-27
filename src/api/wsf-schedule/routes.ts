/**
 * WSF Schedule API - Routes
 *
 * Provides access to Washington State Ferry route information including:
 * - All routes for a specific date
 * - Routes between specific terminal pairs
 * - Routes with current service disruptions
 * - Route IDs, abbreviations, descriptions, and region information
 *
 * @see {@link https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html WSF Schedule API Documentation}
 * @see {@link https://www.wsdot.wa.gov/ferries/schedule/ WSF Schedules}
 *
 * @example
 * ```typescript
 * import { getRoutes, getRoutesByTerminals, getRoutesWithDisruptions } from '@ferryjoy/ws-dottie';
 *
 * // Get all routes for a date
 * const allRoutes = await getRoutes({ tripDate: new Date('2025-08-27') });
 *
 * // Get routes between specific terminals
 * const terminalRoutes = await getRoutesByTerminals({
 *   tripDate: new Date('2025-08-27'),
 *   departingTerminalId: 1,
 *   arrivingTerminalId: 2
 * });
 *
 * // Get routes with service disruptions
 * const disruptedRoutes = await getRoutesWithDisruptions({ tripDate: new Date('2025-08-27') });
 * ```
 *
 * @module wsf-schedule/routes
 */

import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";
import { serviceDisruptionSchema } from "./routeDetails";

// ============================================================================
// API Functions
//
// getRoutesByTerminals (routes for terminal pair)
// getRoutes (all routes for a date)
// ============================================================================

const ENDPOINT_BY_TERMINALS =
  "/ferries/api/schedule/rest/routesbyterminals/{tripDate}/{departingTerminalId}/{arrivingTerminalId}";
const ENDPOINT_ALL = "/ferries/api/schedule/rest/routes/{tripDate}";
const ENDPOINT_WITH_DISRUPTIONS =
  "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}";

export const getRoutesByTerminals = async (
  params: GetRoutesByTerminalsParams
): Promise<Route[]> => {
  return zodFetch(
    ENDPOINT_BY_TERMINALS,
    {
      input: getRoutesByTerminalsParamsSchema,
      output: routesArraySchema,
    },
    params
  );
};

export const getRoutes = async (params: GetRoutesParams): Promise<Route[]> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getRoutesParamsSchema,
      output: routesArraySchema,
    },
    params
  );
};

/**
 * Retrieves routes that currently have service disruptions for a given trip date.
 *
 * @param params - Parameters object for routes with disruptions query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @returns Promise<RouteWithDisruptions[]> - Array of routes with service disruptions
 *
 * @example
 * const routesWithDisruptions = await getRoutesWithDisruptions({ tripDate: new Date('2025-01-27') });
 * console.log(routesWithDisruptions[0].RouteAbbrev);  // "SEA-BI"
 * console.log(routesWithDisruptions[0].ServiceDisruptions.length);  // 1 (number of disruptions)
 *
 * @throws {Error} When date is invalid or API is unavailable
 */
export const getRoutesWithDisruptions = async (
  params: GetRoutesWithDisruptionsParams
): Promise<RouteWithDisruptions[]> => {
  return zodFetch(
    ENDPOINT_WITH_DISRUPTIONS,
    {
      input: getRoutesWithDisruptionsParamsSchema,
      output: routesWithDisruptionsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getRoutesByTerminalsParamsSchema
// GetRoutesByTerminalsParams
// getRoutesParamsSchema
// GetRoutesParams
// ============================================================================

export const getRoutesByTerminalsParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    departingTerminalId: z.number().int().positive().describe(""),
    arrivingTerminalId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetRoutesByTerminalsParams = z.infer<
  typeof getRoutesByTerminalsParamsSchema
>;

export const getRoutesParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
  })
  .describe("");

export type GetRoutesParams = z.infer<typeof getRoutesParamsSchema>;

/**
 * Parameters for retrieving routes with service disruptions for a specific date
 */
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
// routeSchema
// routesArraySchema
// Route
// ============================================================================

export const routeSchema = z
  .object({
    RouteID: z.number().describe(""),
    RouteAbbrev: z.string().describe(""),
    Description: z.string().describe(""),
    RegionID: z.number().describe(""),
    ServiceDisruptions: z
      .array(serviceDisruptionSchema)
      .optional()
      .describe(""),
  })
  .describe("");

export const routesArraySchema = z.array(routeSchema);

export type Route = z.infer<typeof routeSchema>;

/**
 * Route with disruptions schema - includes route information with required service disruptions
 */
export const routeWithDisruptionsSchema = z
  .object({
    RouteID: z.number().describe(""),
    RouteAbbrev: z.string().describe(""),
    Description: z.string().describe(""),
    RegionID: z.number().describe(""),
    ServiceDisruptions: z.array(serviceDisruptionSchema).describe(""),
  })
  .describe("");

/**
 * Array of route with disruptions objects - wrapper around routeWithDisruptionsSchema
 */
export const routesWithDisruptionsArraySchema = z.array(
  routeWithDisruptionsSchema
);

/**
 * RouteWithDisruptions type - represents a route with service disruptions
 */
export type RouteWithDisruptions = z.infer<typeof routeWithDisruptionsSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useRoutesByTerminals
// useRoutes
// ============================================================================

export const useRoutesByTerminals = (
  params: GetRoutesByTerminalsParams,
  options?: TanStackOptions<Route[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "routesByTerminals", JSON.stringify(params)],
    queryFn: () => getRoutesByTerminals(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });

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

/**
 * TanStack Query hook for routes with service disruptions with automatic updates.
 *
 * @param params - Parameters object for routes with disruptions query
 * @param params.tripDate - Date for the trip (JavaScript Date object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<RouteWithDisruptions[], Error> - Query result with routes with disruptions data
 *
 * @example
 * const { data: routesWithDisruptions, isLoading } = useRoutesWithDisruptions({ tripDate: new Date('2025-01-27') });
 * if (routesWithDisruptions) {
 *   console.log(routesWithDisruptions[0].RouteAbbrev);  // "SEA-BI"
 *   console.log(routesWithDisruptions[0].ServiceDisruptions.length);  // 1 (number of disruptions)
 * }
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
