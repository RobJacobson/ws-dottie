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

export const faresTerminalsOptions = (params: GetFaresTerminalsParams) =>
  queryOptions({
    queryKey: [
      "wsf",
      "fares",
      "terminals",
      "getFaresTerminals",
      {
        ...params,
        tripDate:
          params.tripDate instanceof Date
            ? params.tripDate.toISOString()
            : params.tripDate,
      },
    ],
    queryFn: () => getFaresTerminals(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const faresTerminalMatesOptions = (
  params: GetFaresTerminalMatesParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "fares",
      "terminals",
      "getFaresTerminalMates",
      {
        ...params,
        tripDate:
          params.tripDate instanceof Date
            ? params.tripDate.toISOString()
            : params.tripDate,
      },
    ],
    queryFn: () => getFaresTerminalMates(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
