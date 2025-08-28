import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import {
  tanstackQueryOptions,
  useQueryWithAutoUpdate,
} from "@/shared/tanstack";
import { getCacheFlushDateTerminals } from "../wsf/cacheFlushDate";

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
): Promise<TerminalSailingSpaces> => {
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

export const getTerminalSailingSpaceByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export const getTerminalSailingSpaceParamsSchema = z.object({});

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

export const terminalArrivalSpaceSchema = z.object({
  TerminalID: z.number().int(),
  TerminalName: z.string(),
  VesselID: z.number().int(),
  VesselName: z.string(),
  DisplayReservableSpace: z.boolean(),
  ReservableSpaceCount: z.number().int().min(0).nullable(),
  ReservableSpaceHexColor: z.string().nullable(),
  DisplayDriveUpSpace: z.boolean(),
  DriveUpSpaceCount: z.number().int(),
  DriveUpSpaceHexColor: z.string(),
  MaxSpaceCount: z.number().int(),
  ArrivalTerminalIDs: z.array(z.number().int()),
});

export const terminalDepartingSpaceSchema = z.object({
  Departure: zWsdotDate(),
  IsCancelled: z.boolean(),
  VesselID: z.number().int(),
  VesselName: z.string(),
  MaxSpaceCount: z.number().int(),
  SpaceForArrivalTerminals: z.array(terminalArrivalSpaceSchema),
});

export const terminalSailingSpaceSchema = z.object({
  TerminalID: z.number().int(),
  TerminalSubjectID: z.number().int(),
  RegionID: z.number().int(),
  TerminalName: z.string(),
  TerminalAbbrev: z.string(),
  SortSeq: z.number().int(),
  DepartingSpaces: z.array(terminalDepartingSpaceSchema),
  IsNoFareCollected: z.boolean().nullable(),
  NoFareCollectedMsg: z.string().nullable(),
});

export const terminalSailingSpaceArraySchema = z.array(
  terminalSailingSpaceSchema
);

export type TerminalSailingSpace = z.infer<typeof terminalSailingSpaceSchema>;
export type TerminalDepartingSpace = z.infer<
  typeof terminalDepartingSpaceSchema
>;
export type TerminalArrivalSpace = z.infer<typeof terminalArrivalSpaceSchema>;

/**
 * TerminalSailingSpaces type - represents an array of terminal sailing space objects
 */
export type TerminalSailingSpaces = z.infer<
  typeof terminalSailingSpaceArraySchema
>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalSailingSpaceByTerminalId (singular item)
// useTerminalSailingSpace (array)
// ============================================================================

export const useTerminalSailingSpaceByTerminalId = (
  params: GetTerminalSailingSpaceByTerminalIdParams,
  options?: UseQueryOptions
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "sailingSpace", params.terminalId],
    queryFn: () => getTerminalSailingSpaceByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

export const useTerminalSailingSpace = (
  params: GetTerminalSailingSpaceParams = {},
  options?: UseQueryOptions
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "sailingSpace"],
    queryFn: () => getTerminalSailingSpace(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
