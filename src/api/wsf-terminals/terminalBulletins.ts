import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import { createUseQueryWsf, tanstackQueryOptions } from "@/shared/tanstack";

import { getCacheFlushDateTerminals } from "../wsf/cacheFlushDate";

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
): Promise<TerminalBulletins> => {
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

export const getTerminalBulletinsByTerminalIdParamsSchema = z.object({
  terminalId: z.number().int(),
});

export const getTerminalBulletinsParamsSchema = z.object({});

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

export const terminalBulletinItemSchema = z.object({
  BulletinTitle: z.string(),
  BulletinText: z.string(),
  BulletinSortSeq: z.number().int(),
  BulletinLastUpdated: zWsdotDate().optional(),
  BulletinLastUpdatedSortable: z.string().optional(),
});

export const terminalBulletinSchema = z.object({
  TerminalID: z.number().int(),
  TerminalSubjectID: z.number().int(),
  RegionID: z.number().int(),
  TerminalName: z.string(),
  TerminalAbbrev: z.string(),
  SortSeq: z.number().int(),
  Bulletins: z.array(terminalBulletinItemSchema),
});

export type TerminalBulletin = z.infer<typeof terminalBulletinSchema>;

export type TerminalBulletinItem = z.infer<typeof terminalBulletinItemSchema>;

export const terminalBulletinsArraySchema = z.array(terminalBulletinSchema);

/**
 * TerminalBulletins type - represents an array of terminal bulletin objects
 */
export type TerminalBulletins = z.infer<typeof terminalBulletinsArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useTerminalBulletinsByTerminalId (singular item)
// useTerminalBulletins (array)
// ============================================================================

export const useTerminalBulletinsByTerminalId = createUseQueryWsf({
  queryFn: getTerminalBulletinsByTerminalId,
  queryKeyPrefix: [
    "wsf",
    "terminals",
    "bulletins",
    "getTerminalBulletinsByTerminalId",
  ],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getCacheFlushDateTerminals,
});

export const useTerminalBulletins = createUseQueryWsf({
  queryFn: getTerminalBulletins,
  queryKeyPrefix: ["wsf", "terminals", "bulletins", "getTerminalBulletins"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getCacheFlushDateTerminals,
});
