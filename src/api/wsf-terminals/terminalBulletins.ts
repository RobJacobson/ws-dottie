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

export const terminalBulletinsByTerminalIdOptions = (
  params: GetTerminalBulletinsByTerminalIdParams
) =>
  queryOptions({
    queryKey: [
      "wsf",
      "terminals",
      "bulletins",
      "getTerminalBulletinsByTerminalId",
      params,
    ],
    queryFn: () => getTerminalBulletinsByTerminalId(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });

export const terminalBulletinsOptions = () =>
  queryOptions({
    queryKey: ["wsf", "terminals", "bulletins", "getTerminalBulletins"],
    queryFn: () => getTerminalBulletins({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
