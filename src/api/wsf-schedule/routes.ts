import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import {
  type TanStackOptions,
  tanstackQueryOptions,
  useQueryWithAutoUpdate,
} from "@/shared/tanstack";

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
): Promise<Routes> => {
  return zodFetch(
    ENDPOINT_BY_TERMINALS,
    {
      input: getRoutesByTerminalsParamsSchema,
      output: routesArraySchema,
    },
    params
  );
};

export const getRoutes = async (params: GetRoutesParams): Promise<Routes> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getRoutesParamsSchema,
      output: routesArraySchema,
    },
    params
  );
};

export const getRoutesWithDisruptions = async (
  params: GetRoutesWithDisruptionsParams
): Promise<RoutesWithDisruptions> => {
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

export const getRoutesByTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
});

export type GetRoutesByTerminalsParams = z.infer<
  typeof getRoutesByTerminalsParamsSchema
>;

export const getRoutesParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetRoutesParams = z.infer<typeof getRoutesParamsSchema>;

export const getRoutesWithDisruptionsParamsSchema = z.object({
  tripDate: z.date(),
});

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

export const routeSchema = z.object({
  RouteID: z.number(),
  RouteAbbrev: z.string(),
  Description: z.string(),
  RegionID: z.number(),
  ServiceDisruptions: z.array(serviceDisruptionSchema).optional(),
});

export const routesArraySchema = z.array(routeSchema);

export type Route = z.infer<typeof routeSchema>;

export const routeWithDisruptionsSchema = z.object({
  RouteID: z.number(),
  RouteAbbrev: z.string(),
  Description: z.string(),
  RegionID: z.number(),
  ServiceDisruptions: z.array(serviceDisruptionSchema),
});

export const routesWithDisruptionsArraySchema = z.array(
  routeWithDisruptionsSchema
);

export type RouteWithDisruptions = z.infer<typeof routeWithDisruptionsSchema>;

/**
 * Routes type - represents an array of route objects
 */
export type Routes = z.infer<typeof routesArraySchema>;

/**
 * RoutesWithDisruptions type - represents an array of route with disruptions objects
 */
export type RoutesWithDisruptions = z.infer<
  typeof routesWithDisruptionsArraySchema
>;

// ============================================================================
// TanStack Query Hooks
//
// useRoutesByTerminals
// useRoutes
// ============================================================================

export const useRoutesByTerminals = (
  params: GetRoutesByTerminalsParams,
  options?: TanStackOptions<Routes>
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
  options?: TanStackOptions<Routes>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "routes", JSON.stringify(params)],
    queryFn: () => getRoutes(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });

export const useRoutesWithDisruptions = (
  params: GetRoutesWithDisruptionsParams,
  options?: TanStackOptions<RoutesWithDisruptions>
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
