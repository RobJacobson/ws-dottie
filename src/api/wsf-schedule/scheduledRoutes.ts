import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";
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

export const getScheduledRoutes = async (): Promise<ScheduledRoute[]> => {
  return zodFetch(ENDPOINT_ALL, {
    output: scheduledRoutesArraySchema,
  });
};

export const getScheduledRoutesBySeason = async (
  params: GetScheduledRoutesBySeasonParams
): Promise<ScheduledRoute[]> => {
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

export const getScheduledRoutesParamsSchema = z.object({}).describe("");

export type GetScheduledRoutesParams = z.infer<
  typeof getScheduledRoutesParamsSchema
>;

export const getScheduledRoutesBySeasonParamsSchema = z
  .object({
    seasonId: z.number().int().positive().describe(""),
  })
  .describe("");

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

export const contingencyAdjustmentSchema = z
  .object({
    DateFrom: zWsdotDate().describe(""),
    DateThru: zWsdotDate().describe(""),
    EventID: z.number().nullable().describe(""),
    EventDescription: z.string().nullable().describe(""),
    AdjType: z.number().describe(""),
    ReplacedBySchedRouteID: z.number().nullable().describe(""),
  })
  .describe("");

export const scheduledRouteSchema = z
  .object({
    ScheduleID: z.number().describe(""),
    SchedRouteID: z.number().describe(""),
    ContingencyOnly: z.boolean().describe(""),
    RouteID: z.number().describe(""),
    RouteAbbrev: z.string().describe(""),
    Description: z.string().describe(""),
    SeasonalRouteNotes: z.string().describe(""),
    RegionID: z.number().describe(""),
    ServiceDisruptions: z.array(serviceDisruptionSchema).describe(""),
    ContingencyAdj: z.array(contingencyAdjustmentSchema).describe(""),
  })
  .describe("");

export const scheduledRoutesArraySchema = z.array(scheduledRouteSchema);

export type ScheduledRoute = z.infer<typeof scheduledRouteSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useScheduledRoutes
// useScheduledRoutesBySeason
// ============================================================================

export const useScheduledRoutes = (
  options?: TanStackOptions<ScheduledRoute[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "scheduledRoutes"],
    queryFn: () => getScheduledRoutes(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
  });

export const useScheduledRoutesBySeason = (
  params: GetScheduledRoutesBySeasonParams,
  options?: TanStackOptions<ScheduledRoute[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "scheduledRoutesBySeason",
      JSON.stringify(params),
    ],
    queryFn: () => getScheduledRoutesBySeason(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
