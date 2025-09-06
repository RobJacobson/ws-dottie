import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  scheduleResponseSchema,
  type ScheduleResponse,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getScheduleTodayByScheduleTerminalsParamsSchema
// GetScheduleTodayByScheduleTerminalsParams
// ============================================================================

export const getScheduleTodayByScheduleTerminalsParamsSchema = z.object({
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetScheduleTodayByScheduleTerminalsParams = z.infer<
  typeof getScheduleTodayByScheduleTerminalsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// scheduleResponseSchema (imported from scheduleResponse.zod)
// ScheduleResponse (imported from scheduleResponse.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getScheduleTodayByScheduleTerminals (today's schedule for terminal pair)
// ============================================================================

const ENDPOINT_TODAY_BY_TERMINALS =
  "/ferries/api/schedule/rest/scheduletoday/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}/{onlyRemainingTimes}";

export const getScheduleTodayByScheduleTerminals = zodFetch<
  GetScheduleTodayByScheduleTerminalsParams,
  ScheduleResponse
>(
  ENDPOINT_TODAY_BY_TERMINALS,
  getScheduleTodayByScheduleTerminalsParamsSchema,
  scheduleResponseSchema
);

// ============================================================================
// TanStack Query Hooks
//
// useScheduleTodayByScheduleTerminals
// ============================================================================

export const scheduleTodayByScheduleTerminalsOptions = createQueryOptions({
  apiFunction: getScheduleTodayByScheduleTerminals,
  queryKey: [
    "wsf",
    "schedule",
    "scheduletoday",
    "getScheduleTodayByScheduleTerminals",
  ],
  cacheStrategy: "DAILY_STATIC",
});
