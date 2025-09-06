import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { scheduleTerminalSchema } from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getScheduleTerminalsParamsSchema
// GetScheduleTerminalsParams
// ============================================================================

export const getScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetScheduleTerminalsParams = z.infer<
  typeof getScheduleTerminalsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// scheduleTerminalSchema (imported from scheduleTerminal.zod)
// ScheduleTerminal (imported from scheduleTerminal.zod)
// ============================================================================

export const scheduleTerminalsArraySchema = z.array(scheduleTerminalSchema);
export type ScheduleTerminals = z.infer<typeof scheduleTerminalsArraySchema>;

// ============================================================================
// API Functions
//
// getScheduleTerminals (all departing terminals for a date)
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/terminals/{tripDate}";

export const getScheduleTerminals = zodFetch<
  GetScheduleTerminalsParams,
  ScheduleTerminals
>(ENDPOINT, getScheduleTerminalsParamsSchema, scheduleTerminalsArraySchema);

// ============================================================================
// TanStack Query Hooks
//
// useScheduleTerminals
// ============================================================================

export const scheduleTerminalsOptions = createQueryOptions({
  apiFunction: getScheduleTerminals,
  queryKey: ["wsf", "schedule", "terminals", "getScheduleTerminals"],
  cacheStrategy: "DAILY_STATIC",
});
