import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";
import { annotationSchema } from "./routeDetails";

// ============================================================================
// API Functions
//
// getScheduleByTerminals (schedule for terminal pair)
// getScheduleByRoute (schedule for specific route)
// ============================================================================

const ENDPOINT_BY_TERMINALS =
  "/ferries/api/schedule/rest/schedulebyterminals/{tripDate}/{departingTerminalId}/{arrivingTerminalId}";
const ENDPOINT_BY_ROUTE =
  "/ferries/api/schedule/rest/schedulebyroute/{tripDate}/{routeId}";
const ENDPOINT_TODAY_BY_TERMINALS =
  "/ferries/api/schedule/rest/scheduletoday/{departingTerminalId}/{arrivingTerminalId}/{onlyRemainingTimes}";
const ENDPOINT_TODAY_BY_ROUTE =
  "/ferries/api/schedule/rest/scheduletodaybyroute/{tripDate}/{routeId}";

export const getScheduleByTerminals = async (
  params: GetScheduleByTerminalsParams
): Promise<ScheduleResponse[]> => {
  return zodFetch(
    ENDPOINT_BY_TERMINALS,
    {
      input: getScheduleByTerminalsParamsSchema,
      output: scheduleResponseArraySchema,
    },
    params
  );
};

export const getScheduleByRoute = async (
  params: GetScheduleByRouteParams
): Promise<ScheduleResponse[]> => {
  return zodFetch(
    ENDPOINT_BY_ROUTE,
    {
      input: getScheduleByRouteParamsSchema,
      output: scheduleResponseArraySchema,
    },
    params
  );
};

export const getScheduleTodayByTerminals = async (
  params: GetScheduleTodayByTerminalsParams
): Promise<ScheduleResponse> => {
  return zodFetch(
    ENDPOINT_TODAY_BY_TERMINALS,
    {
      input: getScheduleTodayByTerminalsParamsSchema,
      output: scheduleResponseSchema,
    },
    params
  );
};

export const getScheduleTodayByRoute = async (
  params: GetScheduleTodayByRouteParams
): Promise<ScheduleResponse[]> => {
  return zodFetch(
    ENDPOINT_TODAY_BY_ROUTE,
    {
      input: getScheduleTodayByRouteParamsSchema,
      output: scheduleResponseArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getScheduleByTerminalsParamsSchema
// GetScheduleByTerminalsParams
// getScheduleByRouteParamsSchema
// GetScheduleByRouteParams
// ============================================================================

export const getScheduleByTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
});

export type GetScheduleByTerminalsParams = z.infer<
  typeof getScheduleByTerminalsParamsSchema
>;

export const getScheduleByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetScheduleByRouteParams = z.infer<
  typeof getScheduleByRouteParamsSchema
>;

export const getScheduleTodayByTerminalsParamsSchema = z.object({
  departingTerminalId: z.number().int().positive(),
  arrivingTerminalId: z.number().int().positive(),
});

export type GetScheduleTodayByTerminalsParams = z.infer<
  typeof getScheduleTodayByTerminalsParamsSchema
>;

export const getScheduleTodayByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetScheduleTodayByRouteParams = z.infer<
  typeof getScheduleTodayByRouteParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// sailingTimeSchema
// scheduleRouteTerminalComboSchema
// scheduleResponseSchema
// scheduleResponseArraySchema
// ScheduleResponse
// SailingTime
// ScheduleRouteTerminalCombo
// ============================================================================

export const sailingTimeSchema = z.object({
  DepartingTime: zWsdotDate(),
  ArrivingTime: zWsdotDate().nullable(),
  LoadingRule: z.number(),
  VesselID: z.number(),
  VesselName: z.string(),
  VesselHandicapAccessible: z.boolean(),
  VesselPositionNum: z.number(),
  Routes: z.array(z.number()),
  AnnotationIndexes: z.array(z.number()),
});

export const scheduleRouteTerminalComboSchema = z.object({
  DepartingTerminalID: z.number(),
  DepartingTerminalName: z.string(),
  ArrivingTerminalID: z.number(),
  ArrivingTerminalName: z.string(),
  SailingNotes: z.string(),
  Annotations: z.array(annotationSchema),
  Times: z.array(sailingTimeSchema),
  AnnotationsIVR: z.array(z.string()),
});

export const scheduleResponseSchema = z.object({
  ScheduleID: z.number(),
  ScheduleName: z.string(),
  ScheduleSeason: z.number(),
  SchedulePDFUrl: z.string(),
  ScheduleStart: zWsdotDate(),
  ScheduleEnd: zWsdotDate(),
  AllRoutes: z.array(z.number()),
  TerminalCombos: z.array(scheduleRouteTerminalComboSchema),
});

export const scheduleResponseArraySchema = z.array(scheduleResponseSchema);

export type ScheduleResponse = z.infer<typeof scheduleResponseSchema>;

export type SailingTime = z.infer<typeof sailingTimeSchema>;

export type ScheduleRouteTerminalCombo = z.infer<
  typeof scheduleRouteTerminalComboSchema
>;

// ============================================================================
// TanStack Query Hooks
//
// useScheduleByTerminals
// useScheduleByRoute
// ============================================================================

export const useScheduleByTerminals = (
  params: GetScheduleByTerminalsParams,
  options?: TanStackOptions<ScheduleResponse[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleByTerminals",
      JSON.stringify(params),
    ],
    queryFn: () => getScheduleByTerminals(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });

export const useScheduleByRoute = (
  params: GetScheduleByRouteParams,
  options?: TanStackOptions<ScheduleResponse[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "scheduleByRoute", JSON.stringify(params)],
    queryFn: () => getScheduleByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });

export const useScheduleTodayByTerminals = (
  params: GetScheduleTodayByTerminalsParams,
  options?: TanStackOptions<ScheduleResponse>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleTodayByTerminals",
      JSON.stringify(params),
    ],
    queryFn: () => getScheduleTodayByTerminals(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });

export const useScheduleTodayByRoute = (
  params: GetScheduleTodayByRouteParams,
  options?: TanStackOptions<ScheduleResponse[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "scheduleToday",
      "scheduleTodayByRoute",
      JSON.stringify(params),
    ],
    queryFn: () => getScheduleTodayByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
