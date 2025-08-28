import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createUseQueryWsf, tanstackQueryOptions } from "@/shared/tanstack";

import { getFaresCacheFlushDate } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getTerminalCombo (singular item)
// getTerminalComboVerbose (array)
// ============================================================================

const ENDPOINT_SINGULAR =
  "/ferries/api/fares/rest/terminalcombo/{tripDate}/{departingTerminalID}/{arrivingTerminalID}";
const ENDPOINT_ARRAY =
  "/ferries/api/fares/rest/terminalcomboverbose/{tripDate}";

export const getTerminalCombo = async (
  params: GetTerminalComboParams
): Promise<TerminalCombo> => {
  return zodFetch(
    ENDPOINT_SINGULAR,
    {
      input: getTerminalComboParamsSchema,
      output: terminalComboSchema,
    },
    params
  );
};

export const getTerminalComboVerbose = async (
  params: GetTerminalComboVerboseParams
): Promise<TerminalComboVerboses> => {
  return zodFetch(
    ENDPOINT_ARRAY,
    {
      input: getTerminalComboVerboseParamsSchema,
      output: terminalComboVerboseArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTerminalComboParamsSchema
// getTerminalComboVerboseParamsSchema
// GetTerminalComboParams
// GetTerminalComboVerboseParams
// ============================================================================

export const getTerminalComboParamsSchema = z.object({
  tripDate: z.date(),
  departingTerminalID: z.number().int().positive(),
  arrivingTerminalID: z.number().int().positive(),
});

export const getTerminalComboVerboseParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetTerminalComboParams = z.infer<
  typeof getTerminalComboParamsSchema
>;

export type GetTerminalComboVerboseParams = z.infer<
  typeof getTerminalComboVerboseParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalComboSchema
// terminalComboVerboseSchema
// terminalComboVerboseArraySchema
// TerminalCombo
// TerminalComboVerbose
// ============================================================================

export const terminalComboSchema = z.object({
  DepartingDescription: z.string(),
  ArrivingDescription: z.string(),
  CollectionDescription: z.string(),
});

export const terminalComboVerboseSchema = z.object({
  DepartingTerminalID: z.number().int().positive(),
  DepartingDescription: z.string(),
  ArrivingTerminalID: z.number().int().positive(),
  ArrivingDescription: z.string(),
  CollectionDescription: z.string(),
});

export const terminalComboVerboseArraySchema = z.array(
  terminalComboVerboseSchema
);

export type TerminalCombo = z.infer<typeof terminalComboSchema>;
export type TerminalComboVerbose = z.infer<typeof terminalComboVerboseSchema>;

/**
 * TerminalComboVerboses type - represents an array of terminal combo verbose objects
 */
export type TerminalComboVerboses = z.infer<
  typeof terminalComboVerboseArraySchema
>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalCombo (singular item)
// useTerminalComboVerbose (array)
// ============================================================================

export const useTerminalCombo = createUseQueryWsf({
  queryFn: getTerminalCombo,
  queryKeyPrefix: ["wsf", "fares", "terminalCombo", "getTerminalCombo"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getFaresCacheFlushDate,
});

export const useTerminalComboVerbose = createUseQueryWsf({
  queryFn: getTerminalComboVerbose,
  queryKeyPrefix: ["wsf", "fares", "terminalCombo", "getTerminalComboVerbose"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getFaresCacheFlushDate,
});
