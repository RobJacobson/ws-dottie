import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createUseQueryWsf, tanstackQueryOptions } from "@/shared/tanstack";

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
): Promise<FaresTerminals> => {
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
): Promise<TerminalMates> => {
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

/**
 * FaresTerminals type - represents an array of fares terminal objects
 */
export type FaresTerminals = z.infer<typeof faresTerminalsArraySchema>;

/**
 * TerminalMates type - represents an array of terminal mate objects
 */
export type TerminalMates = z.infer<typeof terminalMatesArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useFaresTerminals
// useFaresTerminalMates
// ============================================================================

export const useFaresTerminals = createUseQueryWsf({
  queryFn: getFaresTerminals,
  queryKeyPrefix: ["wsf", "fares", "terminals", "getFaresTerminals"],
  defaultOptions: tanstackQueryOptions.ONE_HOUR_POLLING,
  getCacheFlushDate: getFaresCacheFlushDate,
});

export const useFaresTerminalMates = createUseQueryWsf({
  queryFn: getFaresTerminalMates,
  queryKeyPrefix: ["wsf", "fares", "terminals", "getFaresTerminalMates"],
  defaultOptions: tanstackQueryOptions.ONE_HOUR_POLLING,
  getCacheFlushDate: getFaresCacheFlushDate,
});
