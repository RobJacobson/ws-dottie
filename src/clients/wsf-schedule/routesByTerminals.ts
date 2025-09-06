import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { routesArraySchema, type RoutesArray } from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getRoutesByScheduleTerminalsParamsSchema
// GetRoutesByScheduleTerminalsParams
// ============================================================================

export const getRoutesByScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetRoutesByScheduleTerminalsParams = z.infer<
  typeof getRoutesByScheduleTerminalsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// routesArraySchema (imported from route.zod)
// RoutesArray (imported from route.zod)
// ============================================================================

export type Routes = RoutesArray;

// ============================================================================
// API Functions
//
// getRoutesByScheduleTerminals (routes for terminal pair)
// ============================================================================

const ENDPOINT_BY_TERMINALS =
  "/ferries/api/schedule/rest/routesbyterminals/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}";

export const getRoutesByScheduleTerminals = zodFetch<
  GetRoutesByScheduleTerminalsParams,
  Routes
>(
  ENDPOINT_BY_TERMINALS,
  getRoutesByScheduleTerminalsParamsSchema,
  routesArraySchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const routesByScheduleTerminalsOptions = createQueryOptions({
  apiFunction: getRoutesByScheduleTerminals,
  queryKey: ["wsf", "schedule", "routes", "getRoutesByScheduleTerminals"],
  cacheStrategy: "DAILY_STATIC",
});
