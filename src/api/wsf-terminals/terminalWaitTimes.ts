import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_DAY,
  TWO_DAYS,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

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

export type TerminalWaitTimesArray = z.infer<
  typeof terminalWaitTimesArraySchema
>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalWaitTimesByTerminalId (singular item)
// useTerminalWaitTimes (array)
// ============================================================================

export const terminalWaitTimesByTerminalIdOptions = (
  params: GetTerminalWaitTimesByTerminalIdParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "terminals",
      "waitTimes",
      "getTerminalWaitTimesByTerminalId",
      params,
    ],
    queryFn: () => getTerminalWaitTimesByTerminalId(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const terminalWaitTimesOptions = () =>
  queryOptions({
    queryKey: ["wsf", "terminals", "waitTimes", "getTerminalWaitTimes"],
    queryFn: () => getTerminalWaitTimes({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
