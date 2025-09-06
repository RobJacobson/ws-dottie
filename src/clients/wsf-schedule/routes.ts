import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { routesArraySchema, type RoutesArray } from "@/schemas/wsf-schedule";
import {
  routesWithServiceDisruptionsArraySchema,
  type RoutesWithServiceDisruptions,
  type RoutesWithServiceDisruptionsArray,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getRoutesByScheduleTerminalsParamsSchema
// GetRoutesByScheduleTerminalsParams
// getRoutesParamsSchema
// GetRoutesParams
// ============================================================================

export const getRoutesByScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetRoutesByScheduleTerminalsParams = z.infer<
  typeof getRoutesByScheduleTerminalsParamsSchema
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
// Output Schemas & Types
//
// routeSchema (imported from route.zod)
// routesArraySchema (imported from route.zod)
// Route (imported from route.zod)
// routesWithServiceDisruptionsSchema (imported from routesWithServiceDisruptions.zod)
// routesWithServiceDisruptionsArraySchema (imported from routesWithServiceDisruptions.zod)
// RoutesWithServiceDisruptions (imported from routesWithServiceDisruptions.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { routesArraySchema, routesWithServiceDisruptionsArraySchema };
export type Routes = RoutesArray;
export type RouteWithDisruptions = RoutesWithServiceDisruptions;
export type RoutesWithDisruptions = RoutesWithServiceDisruptionsArray;

// ============================================================================
// API Functions
//
// getRoutesByScheduleTerminals (routes for terminal pair)
// getRoutes (all routes for a date)
// ============================================================================

const ENDPOINT_BY_TERMINALS =
  "/ferries/api/schedule/rest/routesbyterminals/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}";
const ENDPOINT_ALL = "/ferries/api/schedule/rest/routes/{tripDate}";
const ENDPOINT_WITH_DISRUPTIONS =
  "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}";

export const getRoutesByScheduleTerminals = zodFetch<
  GetRoutesByScheduleTerminalsParams,
  Routes
>(ENDPOINT_BY_TERMINALS, getRoutesByScheduleTerminalsParamsSchema, routesArraySchema);

export const getRoutes = zodFetch<GetRoutesParams, Routes>(
  ENDPOINT_ALL,
  getRoutesParamsSchema,
  routesArraySchema
);

export const getRoutesWithDisruptions = zodFetch<
  GetRoutesWithDisruptionsParams,
  RoutesWithDisruptions
>(
  ENDPOINT_WITH_DISRUPTIONS,
  getRoutesWithDisruptionsParamsSchema,
  routesWithServiceDisruptionsArraySchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const routesByScheduleTerminalsOptions = createQueryOptions({
  apiFunction: getRoutesByScheduleTerminals,
  queryKey: ["wsf", "schedule", "routes", "getRoutesByScheduleTerminals"],
  cacheStrategy: "DAILY_STATIC",
});

export const routesOptions = createQueryOptions({
  apiFunction: getRoutes,
  queryKey: ["wsf", "schedule", "routes", "getRoutes"],
  cacheStrategy: "DAILY_STATIC",
});

export const routesWithDisruptionsOptions = createQueryOptions({
  apiFunction: getRoutesWithDisruptions,
  queryKey: ["wsf", "schedule", "routes", "getRoutesWithDisruptions"],
  cacheStrategy: "DAILY_STATIC",
});
