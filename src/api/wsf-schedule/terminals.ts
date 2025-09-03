import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

// ============================================================================
// API Functions
//
// getTerminals (all departing terminals for a date)
// getTerminalMates (arriving terminals from specific terminal and date)
// getTerminalsAndMates (all terminal combinations for a date)
// getTerminalsAndMatesByRoute (terminal combinations for specific route and date)
// ============================================================================

const ENDPOINT_TERMINALS = "/ferries/api/schedule/rest/terminals/{tripDate}";
const ENDPOINT_TERMINAL_MATES =
  "/ferries/api/schedule/rest/terminalmates/{tripDate}/{terminalId}";
const ENDPOINT_ALL_COMBOS =
  "/ferries/api/schedule/rest/terminalsandmates/{tripDate}";
const ENDPOINT_COMBOS_BY_ROUTE =
  "/ferries/api/schedule/rest/terminalsandmatesbyroute/{tripDate}/{routeId}";

export const getTerminals = async (
  params: GetTerminalsParams
): Promise<ScheduleTerminals> => {
  return zodFetch(
    ENDPOINT_TERMINALS,
    {
      input: getTerminalsParamsSchema,
      output: scheduleTerminalsArraySchema,
    },
    params
  );
};

export const getTerminalMates = async (
  params: GetTerminalMatesParams
): Promise<ScheduleTerminals> => {
  return zodFetch(
    ENDPOINT_TERMINAL_MATES,
    {
      input: getTerminalMatesParamsSchema,
      output: scheduleTerminalsArraySchema,
    },
    params
  );
};

export const getTerminalsAndMates = async (
  params: GetTerminalsAndMatesParams
): Promise<ScheduleTerminalCombos> => {
  return zodFetch(
    ENDPOINT_ALL_COMBOS,
    {
      input: getTerminalsAndMatesParamsSchema,
      output: scheduleTerminalCombosArraySchema,
    },
    params
  );
};

export const getTerminalsAndMatesByRoute = async (
  params: GetTerminalsAndMatesByRouteParams
): Promise<ScheduleTerminalCombos> => {
  return zodFetch(
    ENDPOINT_COMBOS_BY_ROUTE,
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
// getTerminalsParamsSchema
// GetTerminalsParams
// getTerminalMatesParamsSchema
// GetTerminalMatesParams
// getTerminalsAndMatesParamsSchema
// GetTerminalsAndMatesParams
// getTerminalsAndMatesByRouteParamsSchema
// GetTerminalsAndMatesByRouteParams
// ============================================================================

export const getTerminalsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetTerminalsParams = z.infer<typeof getTerminalsParamsSchema>;

export const getTerminalMatesParamsSchema = z.object({
  tripDate: z.date(),
  terminalId: z.number().int().positive(),
});

export type GetTerminalMatesParams = z.infer<
  typeof getTerminalMatesParamsSchema
>;

export const getTerminalsAndMatesParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetTerminalsAndMatesParams = z.infer<
  typeof getTerminalsAndMatesParamsSchema
>;

export const getTerminalsAndMatesByRouteParamsSchema = z.object({
  tripDate: z.date(),
  routeId: z.number().int().positive(),
});

export type GetTerminalsAndMatesByRouteParams = z.infer<
  typeof getTerminalsAndMatesByRouteParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// scheduleTerminalSchema
// scheduleTerminalsArraySchema
// scheduleTerminalComboSchema
// scheduleTerminalCombosArraySchema
// ScheduleTerminal
// ScheduleTerminalCombo
// ============================================================================

export const scheduleTerminalSchema = z.object({
  TerminalID: z.number().int().positive(),
  Description: z.string(),
});

export const scheduleTerminalsArraySchema = z.array(scheduleTerminalSchema);

export type ScheduleTerminal = z.infer<typeof scheduleTerminalSchema>;

export const scheduleTerminalComboSchema = z.object({
  DepartingTerminalID: z.number().int().positive(),
  DepartingDescription: z.string(),
  ArrivingTerminalID: z.number().int().positive(),
  ArrivingDescription: z.string(),
});

export const scheduleTerminalCombosArraySchema = z.array(
  scheduleTerminalComboSchema
);

export type ScheduleTerminalCombo = z.infer<typeof scheduleTerminalComboSchema>;

/**
 * ScheduleTerminals type - represents an array of schedule terminal objects
 */
export type ScheduleTerminals = z.infer<typeof scheduleTerminalsArraySchema>;

/**
 * ScheduleTerminalCombos type - represents an array of schedule terminal combo objects
 */
export type ScheduleTerminalCombos = z.infer<
  typeof scheduleTerminalCombosArraySchema
>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminals
// useTerminalMates
// useTerminalsAndMates
// useTerminalsAndMatesByRoute
// ============================================================================

export const terminalsOptions = (params: GetTerminalsParams) =>
  queryOptions({
    queryKey: [
      "wsf",
      "schedule",
      "terminals",
      "getTerminals",
      {
        ...params,
        tripDate:
          params.tripDate instanceof Date
            ? params.tripDate.toISOString()
            : params.tripDate,
      },
    ],
    queryFn: () => getTerminals(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const terminalMatesOptions = (params: GetTerminalMatesParams) =>
  queryOptions({
    queryKey: [
      "wsf",
      "schedule",
      "terminals",
      "getTerminalMates",
      {
        ...params,
        tripDate:
          params.tripDate instanceof Date
            ? params.tripDate.toISOString()
            : params.tripDate,
      },
    ],
    queryFn: () => getTerminalMates(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const terminalsAndMatesOptions = (params: GetTerminalsAndMatesParams) =>
  queryOptions({
    queryKey: [
      "wsf",
      "schedule",
      "terminals",
      "getTerminalsAndMates",
      {
        ...params,
        tripDate:
          params.tripDate instanceof Date
            ? params.tripDate.toISOString()
            : params.tripDate,
      },
    ],
    queryFn: () => getTerminalsAndMates(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const terminalsAndMatesByRouteOptions = (
  params: GetTerminalsAndMatesByRouteParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "schedule",
      "terminals",
      "getTerminalsAndMatesByRoute",
      {
        ...params,
        tripDate:
          params.tripDate instanceof Date
            ? params.tripDate.toISOString()
            : params.tripDate,
      },
    ],
    queryFn: () => getTerminalsAndMatesByRoute(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
