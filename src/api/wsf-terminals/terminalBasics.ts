import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import { getCacheFlushDateTerminals } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getTerminalBasicsByTerminalId (singular item)
// getTerminalBasics (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalbasics/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalbasics";

export const getTerminalBasicsByTerminalId = async (
  params: GetTerminalBasicsByTerminalIdParams
): Promise<TerminalBasics> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getTerminalBasicsByTerminalIdParamsSchema,
      output: terminalBasicsSchema,
    },
    params
  );
};

export const getTerminalBasics = async (
  params: GetTerminalBasicsParams = {}
): Promise<TerminalBasics[]> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getTerminalBasicsParamsSchema,
      output: terminalBasicsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalBasicsByTerminalIdParamsSchema
// getTerminalBasicsParamsSchema
// GetTerminalBasicsByTerminalIdParams
// GetTerminalBasicsParams
// ============================================================================

export const getTerminalBasicsByTerminalIdParamsSchema = z
  .object({
    terminalId: z.number().int().describe(""),
  })
  .describe("");

export const getTerminalBasicsParamsSchema = z.object({}).describe("");

export type GetTerminalBasicsByTerminalIdParams = z.infer<
  typeof getTerminalBasicsByTerminalIdParamsSchema
>;
export type GetTerminalBasicsParams = z.infer<
  typeof getTerminalBasicsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalBasicsSchema
// terminalBasicsArraySchema
// TerminalBasics
// ============================================================================

export const terminalBasicsSchema = z
  .object({
    TerminalID: z.number().describe(""),
    TerminalSubjectID: z.number().describe(""),
    RegionID: z.number().describe(""),
    TerminalName: z.string().describe(""),
    TerminalAbbrev: z.string().describe(""),
    SortSeq: z.number().describe(""),
    OverheadPassengerLoading: z.boolean().describe(""),
    Elevator: z.boolean().describe(""),
    WaitingRoom: z.boolean().describe(""),
    FoodService: z.boolean().describe(""),
    Restroom: z.boolean().describe(""),
  })
  .describe("");

export type TerminalBasics = z.infer<typeof terminalBasicsSchema>;

export const terminalBasicsArraySchema = z.array(terminalBasicsSchema);

// ============================================================================
// TanStack Query Hooks
//
// useTerminalBasicsByTerminalId (singular item)
// useTerminalBasics (array)
// ============================================================================

export const useTerminalBasicsByTerminalId = (
  params: GetTerminalBasicsByTerminalIdParams,
  options?: TanStackOptions<TerminalBasics>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "basics", JSON.stringify(params)],
    queryFn: () => getTerminalBasicsByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};

export const useTerminalBasics = (
  options?: TanStackOptions<TerminalBasics[]>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "basics"],
    queryFn: getTerminalBasics,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
