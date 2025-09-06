import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  terminalsAndMatesByRouteSchema,
  type TerminalsAndMatesByRoute,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getTerminalsAndMatesByRouteParamsSchema
// GetTerminalsAndMatesByRouteParams
// ============================================================================

export const getTerminalsAndMatesByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetTerminalsAndMatesByRouteParams = z.infer<
  typeof getTerminalsAndMatesByRouteParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalsAndMatesByRouteSchema (imported from terminalsAndMatesByRoute.zod)
// TerminalsAndMatesByRoute (imported from terminalsAndMatesByRoute.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getTerminalsAndMatesByRoute (terminal combinations for specific route and date)
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/terminalsandmatesbyroute/{tripDate}/{routeId}";

export const getTerminalsAndMatesByRoute = zodFetch<
  GetTerminalsAndMatesByRouteParams,
  TerminalsAndMatesByRoute
>(
  ENDPOINT,
  getTerminalsAndMatesByRouteParamsSchema,
  terminalsAndMatesByRouteSchema
);

// ============================================================================
// TanStack Query Hooks
//
// useTerminalsAndMatesByRoute
// ============================================================================

export const terminalsAndMatesByRouteOptions = createQueryOptions({
  apiFunction: getTerminalsAndMatesByRoute,
  queryKey: [
    "wsf",
    "schedule",
    "terminalsandmatesbyroute",
    "getTerminalsAndMatesByRoute",
  ],
  cacheStrategy: "DAILY_STATIC",
});
