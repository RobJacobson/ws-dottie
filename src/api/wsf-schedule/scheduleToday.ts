import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import { getCacheFlushDateSchedule } from "./cacheFlushDateSchedule";
// Import the complete schema from schedule
import {
  type ScheduleResponse,
  scheduleResponseSchema,
  scheduleResponseArraySchema,
} from "./schedule";

// ============================================================================
// API Functions
//
// getScheduleTodayByTerminals (today's schedule for terminal pair)
// getScheduleTodayByRoute (today's schedule for specific route)
// ============================================================================

const ENDPOINT_BY_TERMINALS =
  "/ferries/api/schedule/rest/scheduletoday/{departingTerminalId}/{arrivingTerminalId}/{onlyRemainingTimes}";
const ENDPOINT_BY_ROUTE =
  "/ferries/api/schedule/rest/scheduletodaybyroute/{tripDate}/{routeId}";

export const getScheduleTodayByTerminals = async (
  params: GetScheduleTodayByTerminalsParams
): Promise<ScheduleResponse> => {
  return zodFetch(
    ENDPOINT_BY_TERMINALS,
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
    ENDPOINT_BY_ROUTE,
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
// getScheduleTodayByTerminalsParamsSchema
// GetScheduleTodayByTerminalsParams
// getScheduleTodayByRouteParamsSchema
// GetScheduleTodayByRouteParams
// ============================================================================

export const getScheduleTodayByTerminalsParamsSchema = z
  .object({
    departingTerminalId: z.number().int().positive().describe(""),
    arrivingTerminalId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetScheduleTodayByTerminalsParams = z.infer<
  typeof getScheduleTodayByTerminalsParamsSchema
>;

export const getScheduleTodayByRouteParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    routeId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetScheduleTodayByRouteParams = z.infer<
  typeof getScheduleTodayByRouteParamsSchema
>;

// ============================================================================
// TanStack Query Hooks
//
// useScheduleTodayByTerminals
// useScheduleTodayByRoute
// ============================================================================

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
      "scheduleTodayByRoute",
      JSON.stringify(params),
    ],
    queryFn: () => getScheduleTodayByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
