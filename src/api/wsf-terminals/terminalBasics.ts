import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createUseQueryWsf, tanstackQueryOptions } from "@/shared/tanstack";

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
): Promise<TerminalBasicsArray> => {
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

export const getTerminalBasicsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export const getTerminalBasicsParamsSchema = z.object({});

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

export const terminalBasicsSchema = z.object({
  TerminalID: z.number(),
  TerminalSubjectID: z.number(),
  RegionID: z.number(),
  TerminalName: z.string(),
  TerminalAbbrev: z.string(),
  SortSeq: z.number(),
  OverheadPassengerLoading: z.boolean(),
  Elevator: z.boolean(),
  WaitingRoom: z.boolean(),
  FoodService: z.boolean(),
  Restroom: z.boolean(),
});

export type TerminalBasics = z.infer<typeof terminalBasicsSchema>;

export const terminalBasicsArraySchema = z.array(terminalBasicsSchema);

/**
 * TerminalBasicsArray type - represents an array of terminal basics objects
 */
export type TerminalBasicsArray = z.infer<typeof terminalBasicsArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalBasicsByTerminalId (singular item)
// useTerminalBasics (array)
// ============================================================================

export const useTerminalBasicsByTerminalId = createUseQueryWsf({
  queryFn: getTerminalBasicsByTerminalId,
  queryKeyPrefix: [
    "wsf",
    "terminals",
    "basics",
    "getTerminalBasicsByTerminalId",
  ],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getCacheFlushDateTerminals,
});

export const useTerminalBasics = createUseQueryWsf({
  queryFn: getTerminalBasics,
  queryKeyPrefix: ["wsf", "terminals", "basics", "getTerminalBasics"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getCacheFlushDateTerminals,
});
