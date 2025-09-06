import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  scheduleResponsesArraySchema as scheduleResponseArraySchema,
  type ScheduleResponse,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getScheduleByScheduleTerminalsParamsSchema
// GetScheduleByScheduleTerminalsParams
// ============================================================================

export const getScheduleByScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetScheduleByScheduleTerminalsParams = z.infer<
  typeof getScheduleByScheduleTerminalsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// scheduleResponsesArraySchema (imported from scheduleResponse.zod)
// ScheduleResponse (imported from scheduleResponse.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getScheduleByScheduleTerminals (schedule for terminal pair)
// ============================================================================

const ENDPOINT_BY_TERMINALS =
  "/ferries/api/schedule/rest/schedulebyterminals/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}";

export const getScheduleByScheduleTerminals = zodFetch<
  GetScheduleByScheduleTerminalsParams,
  ScheduleResponse[]
>(
  ENDPOINT_BY_TERMINALS,
  getScheduleByScheduleTerminalsParamsSchema,
  scheduleResponseArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useScheduleByScheduleTerminals
// ============================================================================

export const scheduleByScheduleTerminalsOptions = createQueryOptions({
  apiFunction: getScheduleByScheduleTerminals,
  queryKey: ["wsf", "schedule", "schedule", "getScheduleByScheduleTerminals"],
  cacheStrategy: "DAILY_STATIC",
});
