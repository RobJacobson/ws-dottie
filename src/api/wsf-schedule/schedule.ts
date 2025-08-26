import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "./cacheFlushDateSchedule";
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

// ============================================================================
// Input Schemas & Types
//
// getScheduleByTerminalsParamsSchema
// GetScheduleByTerminalsParams
// getScheduleByRouteParamsSchema
// GetScheduleByRouteParams
// ============================================================================

export const getScheduleByTerminalsParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    departingTerminalId: z.number().int().positive().describe(""),
    arrivingTerminalId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetScheduleByTerminalsParams = z.infer<
  typeof getScheduleByTerminalsParamsSchema
>;

export const getScheduleByRouteParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    routeId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetScheduleByRouteParams = z.infer<
  typeof getScheduleByRouteParamsSchema
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

export const sailingTimeSchema = z
  .object({
    DepartingTime: zWsdotDate().describe(""),
    ArrivingTime: zWsdotDate().nullable().describe(""),
    LoadingRule: z.number().describe(""),
    VesselID: z.number().describe(""),
    VesselName: z.string().describe(""),
    VesselHandicapAccessible: z.boolean().describe(""),
    VesselPositionNum: z.number().describe(""),
    Routes: z.array(z.number()).describe(""),
    AnnotationIndexes: z.array(z.number()).describe(""),
  })
  .describe("");

export const scheduleRouteTerminalComboSchema = z
  .object({
    DepartingTerminalID: z.number().describe(""),
    DepartingTerminalName: z.string().describe(""),
    ArrivingTerminalID: z.number().describe(""),
    ArrivingTerminalName: z.string().describe(""),
    SailingNotes: z.string().describe(""),
    Annotations: z.array(annotationSchema).describe(""),
    Times: z.array(sailingTimeSchema).describe(""),
    AnnotationsIVR: z.array(z.string()).describe(""),
  })
  .describe("");

export const scheduleResponseSchema = z
  .object({
    ScheduleID: z.number().describe(""),
    ScheduleName: z.string().describe(""),
    ScheduleSeason: z.number().describe(""),
    SchedulePDFUrl: z.string().describe(""),
    ScheduleStart: zWsdotDate().describe(""),
    ScheduleEnd: zWsdotDate().describe(""),
    AllRoutes: z.array(z.number()).describe(""),
    TerminalCombos: z.array(scheduleRouteTerminalComboSchema).describe(""),
  })
  .describe("");

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
