import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  routeDetailsArraySchema,
  type RouteDetailsArray,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getRouteDetailsByScheduleTerminalsParamsSchema
// GetRouteDetailsByScheduleTerminalsParams
// ============================================================================

export const getRouteDetailsByScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetRouteDetailsByScheduleTerminalsParams = z.infer<
  typeof getRouteDetailsByScheduleTerminalsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// routeDetailsArraySchema (imported from routeDetails.zod)
// RouteDetailsArray (imported from routeDetails.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getRouteDetailsByScheduleTerminals (route details for terminal pair)
// ============================================================================

const ENDPOINT_BY_TERMINALS =
  "/ferries/api/schedule/rest/routedetailsbyterminals/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}";

export const getRouteDetailsByScheduleTerminals = zodFetch<
  GetRouteDetailsByScheduleTerminalsParams,
  RouteDetailsArray
>(
  ENDPOINT_BY_TERMINALS,
  getRouteDetailsByScheduleTerminalsParamsSchema,
  routeDetailsArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useRouteDetailsByScheduleTerminals
// ============================================================================

export const routeDetailsByScheduleTerminalsOptions = createQueryOptions({
  apiFunction: getRouteDetailsByScheduleTerminals,
  queryKey: [
    "wsf",
    "schedule",
    "routeDetails",
    "getRouteDetailsByScheduleTerminals",
  ],
  cacheStrategy: "DAILY_STATIC",
});
