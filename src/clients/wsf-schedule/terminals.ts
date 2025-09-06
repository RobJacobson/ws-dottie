import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  scheduleTerminalSchema as faresScheduleTerminalSchema,
  type ScheduleTerminal,
} from "@/schemas/wsf-schedule";
import {
  scheduleTerminalComboSchema as scheduleScheduleTerminalComboSchema,
  type ScheduleTerminalCombo as ScheduleScheduleTerminalCombo,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getScheduleTerminalsParamsSchema
// GetScheduleTerminalsParams
// getScheduleTerminalMatesParamsSchema
// GetScheduleTerminalMatesParams
// getScheduleTerminalsAndMatesParamsSchema
// GetScheduleTerminalsAndMatesParams
// getScheduleTerminalsAndMatesByRouteParamsSchema
// GetScheduleTerminalsAndMatesByRouteParams
// ============================================================================

export const getScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetScheduleTerminalsParams = z.infer<
  typeof getScheduleTerminalsParamsSchema
>;

export const getScheduleTerminalMatesParamsSchema = z.object({
  tripDate: z.date(),
  terminalId: z.number().int().positive(),
});

export type GetScheduleTerminalMatesParams = z.infer<
  typeof getScheduleTerminalMatesParamsSchema
>;

export const getScheduleTerminalsAndMatesParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetScheduleTerminalsAndMatesParams = z.infer<
  typeof getScheduleTerminalsAndMatesParamsSchema
>;

export const getScheduleTerminalsAndMatesByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetScheduleTerminalsAndMatesByRouteParams = z.infer<
  typeof getScheduleTerminalsAndMatesByRouteParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// scheduleScheduleTerminalSchema (imported from terminal.zod)
// scheduleScheduleTerminalComboSchema (imported from terminal.zod)
// ScheduleScheduleTerminal (imported from terminal.zod)
// ScheduleScheduleScheduleTerminalCombo (imported from terminal.zod)
// ============================================================================

export const scheduleScheduleTerminalsArraySchema = z.array(
  faresScheduleTerminalSchema
);
export const scheduleScheduleScheduleTerminalCombosArraySchema = z.array(
  scheduleScheduleTerminalComboSchema
);

export type ScheduleScheduleTerminal = ScheduleTerminal;
export type ScheduleScheduleScheduleTerminalCombo =
  ScheduleScheduleTerminalCombo;
export type ScheduleScheduleTerminals = z.infer<
  typeof scheduleScheduleTerminalsArraySchema
>;
export type ScheduleScheduleScheduleTerminalCombos = z.infer<
  typeof scheduleScheduleScheduleTerminalCombosArraySchema
>;

// ============================================================================
// API Functions
//
// getScheduleTerminals (all departing terminals for a date)
// getScheduleTerminalMates (arriving terminals from specific terminal and date)
// getScheduleTerminalsAndMates (all terminal combinations for a date)
// getScheduleTerminalsAndMatesByRoute (terminal combinations for specific route and date)
// ============================================================================

const ENDPOINT_TERMINALS = "/ferries/api/schedule/rest/terminals/{tripDate}";
const ENDPOINT_TERMINAL_MATES =
  "/ferries/api/schedule/rest/terminalmates/{tripDate}/{terminalId}";
const ENDPOINT_ALL_COMBOS =
  "/ferries/api/schedule/rest/terminalsandmates/{tripDate}";
const ENDPOINT_COMBOS_BY_ROUTE =
  "/ferries/api/schedule/rest/terminalsandmatesbyroute/{tripDate}/{routeId}";

export const getScheduleTerminals = zodFetch<
  GetScheduleTerminalsParams,
  ScheduleScheduleTerminals
>(
  ENDPOINT_TERMINALS,
  getScheduleTerminalsParamsSchema,
  scheduleScheduleTerminalsArraySchema
);

export const getScheduleTerminalMates = zodFetch<
  GetScheduleTerminalMatesParams,
  ScheduleScheduleTerminals
>(
  ENDPOINT_TERMINAL_MATES,
  getScheduleTerminalMatesParamsSchema,
  scheduleScheduleTerminalsArraySchema
);

export const getScheduleTerminalsAndMates = zodFetch<
  GetScheduleTerminalsAndMatesParams,
  ScheduleScheduleScheduleTerminalCombos
>(
  ENDPOINT_ALL_COMBOS,
  getScheduleTerminalsAndMatesParamsSchema,
  scheduleScheduleScheduleTerminalCombosArraySchema
);

export const getScheduleTerminalsAndMatesByRoute = zodFetch<
  GetScheduleTerminalsAndMatesByRouteParams,
  ScheduleScheduleScheduleTerminalCombos
>(
  ENDPOINT_COMBOS_BY_ROUTE,
  getScheduleTerminalsAndMatesByRouteParamsSchema,
  scheduleScheduleScheduleTerminalCombosArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useScheduleTerminals
// useScheduleTerminalMates
// useScheduleTerminalsAndMates
// useScheduleTerminalsAndMatesByRoute
// ============================================================================

export const terminalsOptions = createQueryOptions({
  apiFunction: getScheduleTerminals,
  queryKey: ["wsf", "schedule", "terminals", "getScheduleTerminals"],
  cacheStrategy: "DAILY_STATIC",
});

export const terminalMatesOptions = createQueryOptions({
  apiFunction: getScheduleTerminalMates,
  queryKey: ["wsf", "schedule", "terminals", "getScheduleTerminalMates"],
  cacheStrategy: "DAILY_STATIC",
});

export const terminalsAndMatesOptions = createQueryOptions({
  apiFunction: getScheduleTerminalsAndMates,
  queryKey: ["wsf", "schedule", "terminals", "getScheduleTerminalsAndMates"],
  cacheStrategy: "DAILY_STATIC",
});

export const terminalsAndMatesByRouteOptions = createQueryOptions({
  apiFunction: getScheduleTerminalsAndMatesByRoute,
  queryKey: [
    "wsf",
    "schedule",
    "terminals",
    "getScheduleTerminalsAndMatesByRoute",
  ],
  cacheStrategy: "DAILY_STATIC",
});
