import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";
import { serviceDisruptionSchema } from "./routeDetails";

// ============================================================================
// API Functions
//
// getScheduledRoutes (all scheduled routes)
// getScheduledRoutesBySeason (scheduled routes for specific season)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/schedule/rest/schedroutes";
const ENDPOINT_BY_SEASON =
  "/ferries/api/schedule/rest/scheduledroutesbyseason/{seasonId}";

export const getScheduledRoutes = async (
  params: GetScheduledRoutesParams = {}
): Promise<ScheduledRoutes> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      output: scheduledRoutesArraySchema,
    },
    params
  );
};

export const getScheduledRoutesBySeason = async (
  params: GetScheduledRoutesBySeasonParams
): Promise<ScheduledRoutes> => {
  return zodFetch(
    ENDPOINT_BY_SEASON,
    {
      input: getScheduledRoutesBySeasonParamsSchema,
      output: scheduledRoutesArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getScheduledRoutesParamsSchema
// GetScheduledRoutesParams
// getScheduledRoutesBySeasonParamsSchema
// GetScheduledRoutesBySeasonParams
// ============================================================================

export const getScheduledRoutesParamsSchema = z.object({});

export type GetScheduledRoutesParams = z.infer<
  typeof getScheduledRoutesParamsSchema
>;

export const getScheduledRoutesBySeasonParamsSchema = z.object({
  seasonId: z.number().int().positive(),
});

export type GetScheduledRoutesBySeasonParams = z.infer<
  typeof getScheduledRoutesBySeasonParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// contingencyAdjustmentSchema
// scheduledRouteSchema
// scheduledRoutesArraySchema
// ScheduledRoute
// ============================================================================

export const contingencyAdjustmentSchema = z.object({
  DateFrom: zWsdotDate(),
  DateThru: zWsdotDate(),
  EventID: z.number().nullable(),
  EventDescription: z.string().nullable(),
  AdjType: z.number(),
  ReplacedBySchedRouteID: z.number().nullable(),
});

export const scheduledRouteSchema = z.object({
  ScheduleID: z.number(),
  SchedRouteID: z.number(),
  ContingencyOnly: z.boolean(),
  RouteID: z.number(),
  RouteAbbrev: z.string(),
  Description: z.string(),
  SeasonalRouteNotes: z.string(),
  RegionID: z.number(),
  ServiceDisruptions: z.array(serviceDisruptionSchema),
  ContingencyAdj: z.array(contingencyAdjustmentSchema),
});

export const scheduledRoutesArraySchema = z.array(scheduledRouteSchema);

export type ScheduledRoute = z.infer<typeof scheduledRouteSchema>;

export type ScheduledRoutes = z.infer<typeof scheduledRoutesArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useScheduledRoutes
// useScheduledRoutesBySeason
// ============================================================================

export const scheduledRoutesOptions = (params: GetScheduledRoutesParams = {}) =>
  queryOptions({
    queryKey: ["wsf", "schedule", "scheduledRoutes", "getScheduledRoutes"],
    queryFn: () => getScheduledRoutes(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const scheduledRoutesBySeasonOptions = (
  params: GetScheduledRoutesBySeasonParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "schedule",
      "scheduledRoutes",
      "getScheduledRoutesBySeason",
      { ...params },
    ],
    queryFn: () => getScheduledRoutesBySeason(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
