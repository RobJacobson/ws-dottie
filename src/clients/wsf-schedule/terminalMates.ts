import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { scheduleTerminalSchema } from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getTerminalMatesParamsSchema
// GetTerminalMatesParams
// ============================================================================

export const getTerminalMatesParamsSchema = z.object({
  tripDate: z.date(),
  terminalId: z.number().int().positive(),
});

export type GetTerminalMatesParams = z.infer<
  typeof getTerminalMatesParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// scheduleTerminalSchema (imported from scheduleTerminal.zod)
// ScheduleTerminal (imported from scheduleTerminal.zod)
// ============================================================================

export const scheduleTerminalMatesArraySchema = z.array(scheduleTerminalSchema);
export type ScheduleTerminalMates = z.infer<
  typeof scheduleTerminalMatesArraySchema
>;

// ============================================================================
// API Functions
//
// getTerminalMates (arriving terminals from specific terminal and date)
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/terminalmates/{tripDate}/{terminalId}";

export const getTerminalMates = zodFetch<
  GetTerminalMatesParams,
  ScheduleTerminalMates
>(ENDPOINT, getTerminalMatesParamsSchema, scheduleTerminalMatesArraySchema);

// ============================================================================
// TanStack Query Hooks
//
// useTerminalMates
// ============================================================================

export const scheduleTerminalMatesOptions = createQueryOptions({
  apiFunction: getTerminalMates,
  queryKey: ["wsf", "schedule", "terminalmates", "getTerminalMates"],
  cacheStrategy: "DAILY_STATIC",
});
