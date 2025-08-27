import type { UseQueryOptions, UseQueryResult } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getActiveSeasons
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/activeseasons";

export const getActiveSeasons = async (
  params: GetActiveSeasonsParams = {}
): Promise<ActiveSeason[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getActiveSeasonsParamsSchema,
      output: activeSeasonsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schemas & Types
//
// getActiveSeasonsParamsSchema
// GetActiveSeasonsParams
// ============================================================================

export const getActiveSeasonsParamsSchema = z.object({}).describe("");

export type GetActiveSeasonsParams = z.infer<
  typeof getActiveSeasonsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// activeSeasonSchema
// activeSeasonsArraySchema
// ActiveSeason
// ============================================================================

export const activeSeasonSchema = z
  .object({
    ScheduleID: z.number().int().positive().describe(""),
    ScheduleName: z.string().describe(""),
    ScheduleSeason: z.number().int().positive().describe(""),
    SchedulePDFUrl: z.string().url().describe(""),
    ScheduleStart: zWsdotDate().describe(""),
    ScheduleEnd: zWsdotDate().describe(""),
  })
  .describe("");

export const activeSeasonsArraySchema = z.array(activeSeasonSchema);

export type ActiveSeason = z.infer<typeof activeSeasonSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useActiveSeasons
// ============================================================================

export const useActiveSeasons = (
  params: GetActiveSeasonsParams = {},
  options?: UseQueryOptions<ActiveSeason[], Error>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "activeSeasons"],
    queryFn: () => getActiveSeasons(params),
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
