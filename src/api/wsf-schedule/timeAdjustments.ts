import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getTimeAdjustments (all time adjustments)
// getTimeAdjustmentsByRoute (time adjustments for specific route)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/schedule/rest/timeadj";
const ENDPOINT_BY_ROUTE = "/ferries/api/schedule/rest/timeadjbyroute/{routeId}";

export const getTimeAdjustments = async (): Promise<
  TimeAdjustmentResponse[]
> => {
  return zodFetch(ENDPOINT_ALL, {
    output: timeAdjustmentsArraySchema,
  });
};

export const getTimeAdjustmentsByRoute = async (
  params: GetTimeAdjustmentsByRouteParams
): Promise<TimeAdjustment[]> => {
  return zodFetch(
    ENDPOINT_BY_ROUTE,
    {
      input: getTimeAdjustmentsByRouteParamsSchema,
      output: timeAdjustmentsByRouteArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTimeAdjustmentsParamsSchema
// GetTimeAdjustmentsParams
// getTimeAdjustmentsByRouteParamsSchema
// GetTimeAdjustmentsByRouteParams
// ============================================================================

export const getTimeAdjustmentsParamsSchema = z.object({});

export type GetTimeAdjustmentsParams = z.infer<
  typeof getTimeAdjustmentsParamsSchema
>;

export const getTimeAdjustmentsByRouteParamsSchema = z.object({
  routeId: z.number().int().positive(),
});

export type GetTimeAdjustmentsByRouteParams = z.infer<
  typeof getTimeAdjustmentsByRouteParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// timeAdjustmentResponseSchema
// timeAdjustmentsArraySchema
// TimeAdjustmentResponse
// timeAdjustmentSchema
// timeAdjustmentsByRouteArraySchema
// TimeAdjustment
// ============================================================================

export const timeAdjustmentResponseSchema = z.object({
  ScheduleID: z.number(),
  SchedRouteID: z.number(),
  RouteID: z.number(),
  RouteDescription: z.string(),
  RouteSortSeq: z.number(),
  SailingID: z.number(),
  SailingDescription: z.string(),
  ActiveSailingDateRange: z.object({
    DateFrom: zWsdotDate().nullable(),
    DateThru: zWsdotDate().nullable(),
    EventID: z.number().nullable(),
    EventDescription: z.string().nullable(),
  }),
  SailingDir: z.number(),
  JourneyID: z.number(),
  VesselID: z.number(),
  VesselName: z.string(),
  VesselHandicapAccessible: z.boolean(),
  VesselPositionNum: z.number(),
  TerminalID: z.number(),
  TerminalDescription: z.string(),
  TerminalBriefDescription: z.string(),
  JourneyTerminalID: z.number(),
  DepArrIndicator: z.number(),
  AdjDateFrom: zWsdotDate().nullable(),
  AdjDateThru: zWsdotDate().nullable(),
  AdjType: z.number(),
  TidalAdj: z.number().nullable(),
  TimeToAdj: z.number().nullable(),
  Annotations: z.array(z.string()).nullable(),
  EventID: z.number().nullable(),
  EventDescription: z.string().nullable(),
});

export const timeAdjustmentsArraySchema = z.array(timeAdjustmentResponseSchema);

export type TimeAdjustmentResponse = z.infer<
  typeof timeAdjustmentResponseSchema
>;

export const timeAdjustmentSchema = z.object({
  AdjustmentID: z.number(),
  SchedRouteID: z.number(),
  AdjustmentMinutes: z.number(),
  StartDate: zWsdotDate(),
  EndDate: zWsdotDate(),
  Reason: z.string(),
});

export const timeAdjustmentsByRouteArraySchema = z.array(timeAdjustmentSchema);

export type TimeAdjustment = z.infer<typeof timeAdjustmentSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTimeAdjustments
// useTimeAdjustmentsByRoute
// ============================================================================

export const useTimeAdjustments = (
  options?: TanStackOptions<TimeAdjustmentResponse[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "timeAdjustments"],
    queryFn: () => getTimeAdjustments(),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
  });

export const useTimeAdjustmentsByRoute = (
  params: GetTimeAdjustmentsByRouteParams,
  options?: TanStackOptions<TimeAdjustment[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "timeAdjustmentsByRoute",
      JSON.stringify(params),
    ],
    queryFn: () => getTimeAdjustmentsByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
