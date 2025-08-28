import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import { createUseQueryWsf, tanstackQueryOptions } from "@/shared/tanstack";

import { getCacheFlushDateTerminals } from "../wsf/cacheFlushDate";

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
): Promise<TerminalWaitTimesArray> => {
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

export const getTerminalWaitTimesByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export const getTerminalWaitTimesParamsSchema = z.object({});

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

export const terminalWaitTimeSchema = z.object({
  RouteID: z.number().nullable(),
  RouteName: z.string().nullable(),
  WaitTimeIVRNotes: z.string().nullable(),
  WaitTimeLastUpdated: zWsdotDate(),
  WaitTimeNotes: z.string().nullable(),
});

export const terminalWaitTimesSchema = z.object({
  TerminalID: z.number(),
  TerminalSubjectID: z.number(),
  RegionID: z.number(),
  TerminalName: z.string(),
  TerminalAbbrev: z.string(),
  SortSeq: z.number(),
  WaitTimes: z.array(terminalWaitTimeSchema),
});

export const terminalWaitTimesArraySchema = z.array(terminalWaitTimesSchema);

export type TerminalWaitTimes = z.infer<typeof terminalWaitTimesSchema>;
export type TerminalWaitTime = z.infer<typeof terminalWaitTimeSchema>;

/**
 * TerminalWaitTimesArray type - represents an array of terminal wait times objects
 */
export type TerminalWaitTimesArray = z.infer<
  typeof terminalWaitTimesArraySchema
>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalWaitTimesByTerminalId (singular item)
// useTerminalWaitTimes (array)
// ============================================================================

export const useTerminalWaitTimesByTerminalId = createUseQueryWsf({
  queryFn: getTerminalWaitTimesByTerminalId,
  queryKeyPrefix: [
    "wsf",
    "terminals",
    "waitTimes",
    "getTerminalWaitTimesByTerminalId",
  ],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getCacheFlushDateTerminals,
});

export const useTerminalWaitTimes = createUseQueryWsf({
  queryFn: getTerminalWaitTimes,
  queryKeyPrefix: ["wsf", "terminals", "waitTimes", "getTerminalWaitTimes"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getCacheFlushDateTerminals,
});
