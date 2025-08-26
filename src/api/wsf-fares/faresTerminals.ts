import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import { jsDateToYyyyMmDd } from "@/shared/fetching/zod/dateParsers";

import { getFaresCacheFlushDate } from "./getFaresCacheFlushDate";

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

export const getFaresTerminalsParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
  })
  .describe("");

export type GetFaresTerminalsParams = z.infer<
  typeof getFaresTerminalsParamsSchema
>;

export const getFaresTerminalMatesParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    terminalID: z.number().int().positive().describe(""),
  })
  .describe("");

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

export const faresTerminalSchema = z
  .object({
    TerminalID: z.number().int().positive().describe(""),
    Description: z.string().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

export const faresTerminalsArraySchema = z
  .array(faresTerminalSchema)
  .describe("");

export type FaresTerminal = z.infer<typeof faresTerminalSchema>;

export const terminalMateSchema = z
  .object({
    TerminalID: z.number().int().positive().describe(""),
    Description: z.string().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

export const terminalMatesArraySchema = z
  .array(terminalMateSchema)
  .describe("");

export type TerminalMate = z.infer<typeof terminalMateSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminals
// useFaresTerminalMates
// ============================================================================

export const useFaresTerminals = (
  params: GetFaresTerminalsParams,
  options?: TanStackOptions<FaresTerminal[]>
): UseQueryResult<FaresTerminal[]> => {
  return useQueryWithAutoUpdate(
    tanstackQueryOptions(
      {
        queryKey: ["wsf-fares", "terminals", jsDateToYyyyMmDd(params.tripDate)],
        queryFn: () => getFaresTerminals(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
      },
      options
    )
  );
};

export const useFaresTerminalMates = (
  params: GetFaresTerminalMatesParams,
  options?: TanStackOptions<TerminalMate[]>
): UseQueryResult<TerminalMate[]> => {
  return useQueryWithAutoUpdate(
    tanstackQueryOptions(
      {
        queryKey: [
          "wsf-fares",
          "terminal-mates",
          jsDateToYyyyMmDd(params.tripDate),
          params.terminalID,
        ],
        queryFn: () => getFaresTerminalMates(params),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
      },
      options
    )
  );
};
