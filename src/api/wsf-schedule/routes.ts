import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import { getCacheFlushDateSchedule } from "./cacheFlushDateSchedule";
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
