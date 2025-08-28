import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import { jsDateToYyyyMmDd } from "@/shared/fetching/zod/dateParsers";

import { getFaresCacheFlushDate } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getFaresTerminals (valid departing terminals)
// getFaresTerminalMates (arriving terminals for a departing terminal)
// ============================================================================

const ENDPOINT_TERMINALS = "/ferries/api/fares/rest/terminals/{tripDate}";
const ENDPOINT_TERMINAL_MATES =
  "/ferries/api/fares/rest/terminalmates/{tripDate}/{terminalID}";

export const getFaresTerminals = async (
  params: GetFaresTerminalsParams
): Promise<FaresTerminal[]> => {
  return zodFetch(
    ENDPOINT_TERMINALS,
    {
      input: getFaresTerminalsParamsSchema,
      output: faresTerminalsArraySchema,
    },
    params
  );
};

export const getFaresTerminalMates = async (
  params: GetFaresTerminalMatesParams
): Promise<TerminalMate[]> => {
  return zodFetch(
    ENDPOINT_TERMINAL_MATES,
    {
      input: getFaresTerminalMatesParamsSchema,
      output: terminalMatesArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getFaresTerminalsParamsSchema
// GetFaresTerminalsParams
// getFaresTerminalMatesParamsSchema
// GetFaresTerminalMatesParams
// ============================================================================

export const getFaresTerminalsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetFaresTerminalsParams = z.infer<
  typeof getFaresTerminalsParamsSchema
>;

export const getFaresTerminalMatesParamsSchema = z.object({
  tripDate: z.date(),
  terminalID: z.number().int().positive(),
});

export type GetFaresTerminalMatesParams = z.infer<
  typeof getFaresTerminalMatesParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// faresTerminalSchema
// FaresTerminal
// terminalMateSchema
// TerminalMate
// ============================================================================

export const faresTerminalSchema = z.object({
  TerminalID: z.number().int().positive(),
  Description: z.string(),
});

export const faresTerminalsArraySchema = z.array(faresTerminalSchema);

export type FaresTerminal = z.infer<typeof faresTerminalSchema>;

export const terminalMateSchema = z.object({
  TerminalID: z.number().int().positive(),
  Description: z.string(),
});

export const terminalMatesArraySchema = z.array(terminalMateSchema);

export type TerminalMate = z.infer<typeof terminalMateSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminals
// useFaresTerminalMates
// ============================================================================

export const useFaresTerminals = (
  params: GetFaresTerminalsParams,
  options?: UseQueryOptions<FaresTerminal[], Error>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf-fares", "terminals", jsDateToYyyyMmDd(params.tripDate)],
    queryFn: () => getFaresTerminals(params),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.MODERATE_FREQUENCY, ...options },
  });
};

export const useFaresTerminalMates = (
  params: GetFaresTerminalMatesParams,
  options?: UseQueryOptions<TerminalMate[], Error>
) => {
  return useQueryWithAutoUpdate({
    queryKey: [
      "wsf-fares",
      "terminal-mates",
      jsDateToYyyyMmDd(params.tripDate),
      params.terminalID,
    ],
    queryFn: () => getFaresTerminalMates(params),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.MODERATE_FREQUENCY, ...options },
  });
};
