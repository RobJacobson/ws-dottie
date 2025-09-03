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

export type TerminalComboVerboses = z.infer<
  typeof terminalComboVerboseArraySchema
>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalCombo (singular item)
// useTerminalComboVerbose (array)
// ============================================================================

export const terminalComboOptions = (params: GetTerminalComboParams) =>
  queryOptions({
    queryKey: [
      "wsf",
      "fares",
      "terminalCombo",
      "getTerminalCombo",
      {
        ...params,
        tripDate:
          params.tripDate instanceof Date
            ? params.tripDate.toISOString()
            : params.tripDate,
      },
    ],
    queryFn: () => getTerminalCombo(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const terminalComboVerboseOptions = (
  params: GetTerminalComboVerboseParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "fares",
      "terminalCombo",
      "getTerminalComboVerbose",
      {
        ...params,
        tripDate:
          params.tripDate instanceof Date
            ? params.tripDate.toISOString()
            : params.tripDate,
      },
    ],
    queryFn: () => getTerminalComboVerbose(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
