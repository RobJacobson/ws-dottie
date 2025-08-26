import type { UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateTerminals } from "./getCacheFlushDateTerminals";

// ============================================================================
// API Functions
//
// getTerminalWaitTimesByTerminalId (singular item)
// getTerminalWaitTimes (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalwaittimes/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalwaittimes";

export const getTerminalWaitTimesByTerminalId = async (
  params: GetTerminalWaitTimesByTerminalIdParams
): Promise<TerminalWaitTimes> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getTerminalWaitTimesByTerminalIdParamsSchema,
      output: terminalWaitTimesSchema,
    },
    params
  );
};

export const getTerminalWaitTimes = async (
  params: GetTerminalWaitTimesParams = {}
): Promise<TerminalWaitTimes[]> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getTerminalWaitTimesParamsSchema,
      output: terminalWaitTimesArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTerminalWaitTimesByTerminalIdParamsSchema
// getTerminalWaitTimesParamsSchema
// GetTerminalWaitTimesByTerminalIdParams
// GetTerminalWaitTimesParams
// ============================================================================

export const getTerminalWaitTimesByTerminalIdParamsSchema = z
  .object({
    terminalId: z.number().int().describe(""),
  })
  .describe("");

export const getTerminalWaitTimesParamsSchema = z.object({}).describe("");

export type GetTerminalWaitTimesByTerminalIdParams = z.infer<
  typeof getTerminalWaitTimesByTerminalIdParamsSchema
>;

export type GetTerminalWaitTimesParams = z.infer<
  typeof getTerminalWaitTimesParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalWaitTimeSchema
// terminalWaitTimesSchema
// terminalWaitTimesArraySchema
// TerminalWaitTimes
// TerminalWaitTime
// ============================================================================

export const terminalWaitTimeSchema = z
  .object({
    RouteID: z.number().nullable().describe(""),
    RouteName: z.string().nullable().describe(""),
    WaitTimeIVRNotes: z.string().nullable().describe(""),
    WaitTimeLastUpdated: zWsdotDate().describe(""),
    WaitTimeNotes: z.string().nullable().describe(""),
  })
  .describe("");

export const terminalWaitTimesSchema = z
  .object({
    TerminalID: z.number().describe(""),
    TerminalSubjectID: z.number().describe(""),
    RegionID: z.number().describe(""),
    TerminalName: z.string().describe(""),
    TerminalAbbrev: z.string().describe(""),
    SortSeq: z.number().describe(""),
    WaitTimes: z.array(terminalWaitTimeSchema).describe(""),
  })
  .describe("");

export const terminalWaitTimesArraySchema = z.array(terminalWaitTimesSchema);

export type TerminalWaitTimes = z.infer<typeof terminalWaitTimesSchema>;
export type TerminalWaitTime = z.infer<typeof terminalWaitTimeSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalWaitTimesByTerminalId (singular item)
// useTerminalWaitTimes (array)
// ============================================================================

export const useTerminalWaitTimesByTerminalId = (
  params: GetTerminalWaitTimesByTerminalIdParams,
  options?: TanStackOptions<TerminalWaitTimes>
): UseQueryResult<TerminalWaitTimes, Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "waitTimes", params.terminalId],
    queryFn: () => getTerminalWaitTimesByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

export const useTerminalWaitTimes = (
  options?: TanStackOptions<TerminalWaitTimes[]>
): UseQueryResult<TerminalWaitTimes[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "waitTimes"],
    queryFn: getTerminalWaitTimes,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
