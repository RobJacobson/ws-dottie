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
// getTerminalSailingSpaceByTerminalId (singular item)
// getTerminalSailingSpace (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalsailingspace/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalsailingspace";

export const getTerminalSailingSpaceByTerminalId = async (
  params: GetTerminalSailingSpaceByTerminalIdParams
): Promise<TerminalSailingSpace> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getTerminalSailingSpaceByTerminalIdParamsSchema,
      output: terminalSailingSpaceSchema,
    },
    params
  );
};

export const getTerminalSailingSpace = async (
  params: GetTerminalSailingSpaceParams = {}
): Promise<TerminalSailingSpace[]> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getTerminalSailingSpaceParamsSchema,
      output: terminalSailingSpaceArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getTerminalSailingSpaceByTerminalIdParamsSchema
// getTerminalSailingSpaceParamsSchema
// GetTerminalSailingSpaceByTerminalIdParams
// GetTerminalSailingSpaceParams
// ============================================================================

export const getTerminalSailingSpaceByTerminalIdParamsSchema = z
  .object({
    terminalId: z.number().int().describe(""),
  })
  .describe("");

export const getTerminalSailingSpaceParamsSchema = z.object({}).describe("");

export type GetTerminalSailingSpaceByTerminalIdParams = z.infer<
  typeof getTerminalSailingSpaceByTerminalIdParamsSchema
>;

export type GetTerminalSailingSpaceParams = z.infer<
  typeof getTerminalSailingSpaceParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// terminalArrivalSpaceSchema
// terminalDepartingSpaceSchema
// terminalSailingSpaceSchema
// terminalSailingSpaceArraySchema
// TerminalSailingSpace
// TerminalDepartingSpace
// TerminalArrivalSpace
// ============================================================================

export const terminalArrivalSpaceSchema = z
  .object({
    TerminalID: z.number().int().describe(""),
    TerminalName: z.string().describe(""),
    VesselID: z.number().int().describe(""),
    VesselName: z.string().describe(""),
    DisplayReservableSpace: z.boolean().describe(""),
    ReservableSpaceCount: z.number().int().min(0).nullable().describe(""),
    ReservableSpaceHexColor: z.string().nullable().describe(""),
    DisplayDriveUpSpace: z.boolean().describe(""),
    DriveUpSpaceCount: z.number().int().describe(""),
    DriveUpSpaceHexColor: z.string().describe(""),
    MaxSpaceCount: z.number().int().describe(""),
    ArrivalTerminalIDs: z.array(z.number().int()).describe(""),
  })
  .describe("");

export const terminalDepartingSpaceSchema = z
  .object({
    Departure: zWsdotDate().describe(""),
    IsCancelled: z.boolean().describe(""),
    VesselID: z.number().int().describe(""),
    VesselName: z.string().describe(""),
    MaxSpaceCount: z.number().int().describe(""),
    SpaceForArrivalTerminals: z.array(terminalArrivalSpaceSchema).describe(""),
  })
  .describe("");

export const terminalSailingSpaceSchema = z
  .object({
    TerminalID: z.number().int().describe(""),
    TerminalSubjectID: z.number().int().describe(""),
    RegionID: z.number().int().describe(""),
    TerminalName: z.string().describe(""),
    TerminalAbbrev: z.string().describe(""),
    SortSeq: z.number().int().describe(""),
    DepartingSpaces: z.array(terminalDepartingSpaceSchema).describe(""),
    IsNoFareCollected: z.boolean().nullable().describe(""),
    NoFareCollectedMsg: z.string().nullable().describe(""),
  })
  .describe("");

export const terminalSailingSpaceArraySchema = z
  .array(terminalSailingSpaceSchema)
  .describe("");

export type TerminalSailingSpace = z.infer<typeof terminalSailingSpaceSchema>;
export type TerminalDepartingSpace = z.infer<
  typeof terminalDepartingSpaceSchema
>;
export type TerminalArrivalSpace = z.infer<typeof terminalArrivalSpaceSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalSailingSpaceByTerminalId (singular item)
// useTerminalSailingSpace (array)
// ============================================================================

export const useTerminalSailingSpaceByTerminalId = (
  params: GetTerminalSailingSpaceByTerminalIdParams,
  options?: TanStackOptions<TerminalSailingSpace>
): UseQueryResult<TerminalSailingSpace, Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "sailingSpace", params.terminalId],
    queryFn: () => getTerminalSailingSpaceByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

export const useTerminalSailingSpace = (
  options?: TanStackOptions<TerminalSailingSpace[]>
): UseQueryResult<TerminalSailingSpace[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "sailingSpace"],
    queryFn: getTerminalSailingSpace,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
