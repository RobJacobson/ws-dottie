import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";

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
): Promise<TerminalComboVerbose[]> => {
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

// ============================================================================
// TanStack Query Hooks
//
// useTerminalCombo (singular item)
// useTerminalComboVerbose (array)
// ============================================================================

export const useTerminalCombo = (
  params: {
    tripDate: Date;
    departingTerminalID: number;
    arrivingTerminalID: number;
  },
  options?: Omit<UseQueryOptions<TerminalCombo, Error>, "queryKey" | "queryFn">
) => {
  return useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "fares",
      "terminalCombo",
      params.tripDate.toISOString(),
      params.departingTerminalID,
      params.arrivingTerminalID,
    ],
    queryFn: () =>
      getTerminalCombo({
        tripDate: params.tripDate,
        departingTerminalID: params.departingTerminalID,
        arrivingTerminalID: params.arrivingTerminalID,
      }),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

export const useTerminalComboVerbose = (
  params: {
    tripDate: Date;
  },
  options?: Omit<
    UseQueryOptions<TerminalComboVerbose[], Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQueryWithAutoUpdate({
    queryKey: [
      "wsf",
      "fares",
      "terminalComboVerbose",
      params.tripDate.toISOString(),
    ],
    queryFn: () =>
      getTerminalComboVerbose({
        tripDate: params.tripDate,
      }),
    fetchLastUpdateTime: getFaresCacheFlushDate,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
