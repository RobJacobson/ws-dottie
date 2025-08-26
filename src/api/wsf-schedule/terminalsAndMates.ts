import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import { getCacheFlushDateSchedule } from "./cacheFlushDateSchedule";

// ============================================================================
// API Functions
//
// getTerminalsAndMates (all terminal combinations for a date)
// getTerminalsAndMatesByRoute (terminal combinations for specific route and date)
// ============================================================================

const ENDPOINT_ALL = "/ferries/api/schedule/rest/terminalsandmates/{tripDate}";
const ENDPOINT_BY_ROUTE =
  "/ferries/api/schedule/rest/terminalsandmatesbyroute/{tripDate}/{routeId}";

export const getTerminalsAndMates = async (
  params: GetTerminalsAndMatesParams
): Promise<ScheduleTerminalCombo[]> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getTerminalsAndMatesParamsSchema,
      output: scheduleTerminalCombosArraySchema,
    },
    params
  );
};

export const getTerminalsAndMatesByRoute = async (
  params: GetTerminalsAndMatesByRouteParams
): Promise<ScheduleTerminalCombo[]> => {
  return zodFetch(
    ENDPOINT_BY_ROUTE,
    {
      input: getTerminalsAndMatesByRouteParamsSchema,
      output: scheduleTerminalCombosArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTerminalsAndMatesParamsSchema
// GetTerminalsAndMatesParams
// getTerminalsAndMatesByRouteParamsSchema
// GetTerminalsAndMatesByRouteParams
// ============================================================================

export const getTerminalsAndMatesParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
  })
  .describe("");

export type GetTerminalsAndMatesParams = z.infer<
  typeof getTerminalsAndMatesParamsSchema
>;

export const getTerminalsAndMatesByRouteParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    routeId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetTerminalsAndMatesByRouteParams = z.infer<
  typeof getTerminalsAndMatesByRouteParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// scheduleTerminalComboSchema
// scheduleTerminalCombosArraySchema
// ScheduleTerminalCombo
// ============================================================================

export const scheduleTerminalComboSchema = z
  .object({
    DepartingTerminalID: z.number().int().positive().describe(""),
    DepartingDescription: z.string().describe(""),
    ArrivingTerminalID: z.number().int().positive().describe(""),
    ArrivingDescription: z.string().describe(""),
  })
  .describe("");

export const scheduleTerminalCombosArraySchema = z.array(
  scheduleTerminalComboSchema
);

export type ScheduleTerminalCombo = z.infer<typeof scheduleTerminalComboSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalsAndMates
// useTerminalsAndMatesByRoute
// ============================================================================

export const useTerminalsAndMates = (
  params: { tripDate: Date },
  options?: TanStackOptions<ScheduleTerminalCombo[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "terminalsAndMates", JSON.stringify(params)],
    queryFn: () => getTerminalsAndMates(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });

export const useTerminalsAndMatesByRoute = (
  params: { tripDate: Date; routeId: number },
  options?: TanStackOptions<ScheduleTerminalCombo[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "schedule",
      "terminalsAndMatesByRoute",
      JSON.stringify(params),
    ],
    queryFn: () => getTerminalsAndMatesByRoute(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
