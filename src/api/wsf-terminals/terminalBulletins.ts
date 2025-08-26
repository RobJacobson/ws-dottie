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
// getTerminalBulletinsByTerminalId (singular item)
// getTerminalBulletins (array)
// ============================================================================

const ENDPOINT_BY_ID =
  "/ferries/api/terminals/rest/terminalbulletins/{terminalId}";
const ENDPOINT_ALL = "/ferries/api/terminals/rest/terminalbulletins";

export const getTerminalBulletinsByTerminalId = async (
  params: GetTerminalBulletinsByTerminalIdParams
): Promise<TerminalBulletin> => {
  return zodFetch(
    ENDPOINT_BY_ID,
    {
      input: getTerminalBulletinsByTerminalIdParamsSchema,
      output: terminalBulletinSchema,
    },
    params
  );
};

export const getTerminalBulletins = async (
  params: GetTerminalBulletinsParams = {}
): Promise<TerminalBulletin[]> => {
  return zodFetch(
    ENDPOINT_ALL,
    {
      input: getTerminalBulletinsParamsSchema,
      output: terminalBulletinsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getTerminalBulletinsByTerminalIdParamsSchema
// getTerminalBulletinsParamsSchema
// GetTerminalBulletinsByTerminalIdParams
// GetTerminalBulletinsParams
// ============================================================================

export const getTerminalBulletinsByTerminalIdParamsSchema = z
  .object({
    terminalId: z.number().int().describe(""),
  })
  .describe("");

export const getTerminalBulletinsParamsSchema = z.object({}).describe("");

export type GetTerminalBulletinsByTerminalIdParams = z.infer<
  typeof getTerminalBulletinsByTerminalIdParamsSchema
>;
export type GetTerminalBulletinsParams = z.infer<
  typeof getTerminalBulletinsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// terminalBulletinItemSchema
// terminalBulletinSchema
// terminalBulletinsArraySchema
// TerminalBulletin
// TerminalBulletinItem
// ============================================================================

export const terminalBulletinItemSchema = z
  .object({
    BulletinTitle: z.string().describe(""),
    BulletinText: z.string().describe(""),
    BulletinSortSeq: z.number().int().describe(""),
    BulletinLastUpdated: zWsdotDate().optional().describe(""),
    BulletinLastUpdatedSortable: z.string().optional().describe(""),
  })
  .describe("");

export const terminalBulletinSchema = z
  .object({
    TerminalID: z.number().int().describe(""),
    TerminalSubjectID: z.number().int().describe(""),
    RegionID: z.number().int().describe(""),
    TerminalName: z.string().describe(""),
    TerminalAbbrev: z.string().describe(""),
    SortSeq: z.number().int().describe(""),
    Bulletins: z.array(terminalBulletinItemSchema).describe(""),
  })
  .describe("");

export const terminalBulletinsArraySchema = z.array(terminalBulletinSchema);

export type TerminalBulletin = z.infer<typeof terminalBulletinSchema>;
export type TerminalBulletinItem = z.infer<typeof terminalBulletinItemSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalBulletinsByTerminalId (singular item)
// useTerminalBulletins (array)
// ============================================================================

export const useTerminalBulletinsByTerminalId = (
  params: GetTerminalBulletinsByTerminalIdParams,
  options?: TanStackOptions<TerminalBulletin>
): UseQueryResult<TerminalBulletin, Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "bulletins", params.terminalId],
    queryFn: () => getTerminalBulletinsByTerminalId(params),
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};

export const useTerminalBulletins = (
  options?: TanStackOptions<TerminalBulletin[]>
): UseQueryResult<TerminalBulletin[], Error> => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "terminals", "bulletins"],
    queryFn: getTerminalBulletins,
    fetchLastUpdateTime: getCacheFlushDateTerminals,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
