import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import { scheduleTimeSchema, type ScheduleTime } from "@/schemas/wsf-schedule";
import {
  scheduleTerminalComboSchema as scheduleScheduleTerminalComboSchema,
  type ScheduleTerminalCombo as ScheduleScheduleTerminalCombo,
} from "@/schemas/wsf-schedule";
import {
  scheduleResponseSchema,
  scheduleResponsesArraySchema,
  type ScheduleResponse,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getScheduleByScheduleTerminalsParamsSchema
// GetScheduleByScheduleTerminalsParams
// getScheduleByRouteParamsSchema
// GetScheduleByRouteParams
// getScheduleTodayByScheduleTerminalsParamsSchema
// GetScheduleTodayByScheduleTerminalsParams
// getScheduleTodayByRouteParamsSchema
// GetScheduleTodayByRouteParams
// ============================================================================

export const getScheduleByScheduleTerminalsParamsSchema = z.object({
  tripDate: z.date(),
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetScheduleByScheduleTerminalsParams = z.infer<
  typeof getScheduleByScheduleTerminalsParamsSchema
>;

export const getScheduleByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetScheduleByRouteParams = z.infer<
  typeof getScheduleByRouteParamsSchema
>;

export const getScheduleTodayByScheduleTerminalsParamsSchema = z.object({
  departingScheduleTerminalId: z.number().int().positive(),
  arrivingScheduleTerminalId: z.number().int().positive(),
});

export type GetScheduleTodayByScheduleTerminalsParams = z.infer<
  typeof getScheduleTodayByScheduleTerminalsParamsSchema
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
// scheduleTimeSchema (imported from scheduleTime.zod)
// scheduleScheduleTerminalComboSchema (imported from terminalCombo.zod)
// scheduleResponseSchema (imported from scheduleResponse.zod)
// scheduleResponsesArraySchema (imported from scheduleResponse.zod)
// ScheduleResponse (imported from scheduleResponse.zod)
// ScheduleTime (imported from scheduleTime.zod)
// ScheduleScheduleTerminalCombo (imported from terminalCombo.zod)
// ============================================================================

export const scheduleRouteScheduleScheduleTerminalComboSchema =
  scheduleScheduleTerminalComboSchema;
export const sailingTimeSchema = scheduleTimeSchema;
export const scheduleResponseArraySchema = scheduleResponsesArraySchema;
export type SailingTime = ScheduleTime;
export type ScheduleRouteScheduleScheduleTerminalCombo =
  ScheduleScheduleTerminalCombo;

// ============================================================================
// API Functions
//
// getScheduleByScheduleTerminals (schedule for terminal pair)
// getScheduleByRoute (schedule for specific route)
// ============================================================================

const ENDPOINT_BY_TERMINALS =
  "/ferries/api/schedule/rest/schedulebyterminals/{tripDate}/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}";
const ENDPOINT_BY_ROUTE =
  "/ferries/api/schedule/rest/schedulebyroute/{tripDate}/{routeId}";
const ENDPOINT_TODAY_BY_TERMINALS =
  "/ferries/api/schedule/rest/scheduletoday/{departingScheduleTerminalId}/{arrivingScheduleTerminalId}/{onlyRemainingTimes}";
const ENDPOINT_TODAY_BY_ROUTE =
  "/ferries/api/schedule/rest/scheduletodaybyroute/{tripDate}/{routeId}";

export const getScheduleByScheduleTerminals = zodFetch<
  GetScheduleByScheduleTerminalsParams,
  ScheduleResponse[]
>(
  ENDPOINT_BY_TERMINALS,
  getScheduleByScheduleTerminalsParamsSchema,
  scheduleResponseArraySchema
);

export const getScheduleByRoute = zodFetch<
  GetScheduleByRouteParams,
  ScheduleResponse[]
>(
  ENDPOINT_BY_ROUTE,
  getScheduleByRouteParamsSchema,
  scheduleResponseArraySchema
);

export const getScheduleTodayByScheduleTerminals = zodFetch<
  GetScheduleTodayByScheduleTerminalsParams,
  ScheduleResponse
>(
  ENDPOINT_TODAY_BY_TERMINALS,
  getScheduleTodayByScheduleTerminalsParamsSchema,
  scheduleResponseSchema
);

export const getScheduleTodayByRoute = zodFetch<
  GetScheduleTodayByRouteParams,
  ScheduleResponse[]
>(
  ENDPOINT_TODAY_BY_ROUTE,
  getScheduleTodayByRouteParamsSchema,
  scheduleResponseArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useScheduleByScheduleTerminals
// useScheduleByRoute
// ============================================================================

export const scheduleByScheduleTerminalsOptions = createQueryOptions({
  apiFunction: getScheduleByScheduleTerminals,
  queryKey: ["wsf", "schedule", "schedule", "getScheduleByScheduleTerminals"],
  cacheStrategy: "DAILY_STATIC",
});

export const scheduleByRouteOptions = createQueryOptions({
  apiFunction: getScheduleByRoute,
  queryKey: ["wsf", "schedule", "schedule", "getScheduleByRoute"],
  cacheStrategy: "DAILY_STATIC",
});

export const scheduleTodayByScheduleTerminalsOptions = createQueryOptions({
  apiFunction: getScheduleTodayByScheduleTerminals,
  queryKey: [
    "wsf",
    "schedule",
    "schedule",
    "getScheduleTodayByScheduleTerminals",
  ],
  cacheStrategy: "DAILY_STATIC",
});

export const scheduleTodayByRouteOptions = createQueryOptions({
  apiFunction: getScheduleTodayByRoute,
  queryKey: ["wsf", "schedule", "schedule", "getScheduleTodayByRoute"],
  cacheStrategy: "DAILY_STATIC",
});
