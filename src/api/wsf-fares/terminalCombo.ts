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

export const getTerminalComboParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
    departingTerminalID: z.number().int().positive().describe(""),
    arrivingTerminalID: z.number().int().positive().describe(""),
  })
  .describe("");

export const getTerminalComboVerboseParamsSchema = z
  .object({
    tripDate: z.date().describe(""),
  })
  .describe("");

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

export const terminalComboSchema = z
  .object({
    DepartingDescription: z.string().describe(""),
    ArrivingDescription: z.string().describe(""),
    CollectionDescription: z.string().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

export const terminalComboVerboseSchema = z
  .object({
    DepartingTerminalID: z.number().int().positive().describe(""),
    DepartingDescription: z.string().describe(""),
    ArrivingTerminalID: z.number().int().positive().describe(""),
    ArrivingDescription: z.string().describe(""),
    CollectionDescription: z.string().describe(""),
  })
  .catchall(z.unknown())
  .describe("");

export const terminalComboVerboseArraySchema = z
  .array(terminalComboVerboseSchema)
  .describe("");

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
  options?: Omit<
    UseQueryOptions<Awaited<ReturnType<typeof getTerminalCombo>>>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TerminalCombo, Error> => {
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
    UseQueryOptions<Awaited<ReturnType<typeof getTerminalComboVerbose>>>,
    "queryKey" | "queryFn"
  >
): UseQueryResult<TerminalComboVerbose[], Error> => {
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
