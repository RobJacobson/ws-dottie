import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import {
  tanstackQueryOptions,
  useQueryWithAutoUpdate,
} from "@/shared/tanstack";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getActiveSeasons
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/activeseasons";

export const getActiveSeasons = async (
  params: GetActiveSeasonsParams = {}
): Promise<ActiveSeasons> => {
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

export const getActiveSeasonsParamsSchema = z.object({});

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

export const activeSeasonSchema = z.object({
  ScheduleID: z.number().int().positive(),
  ScheduleName: z.string(),
  ScheduleSeason: z.number().int().positive(),
  SchedulePDFUrl: z.string().url(),
  ScheduleStart: zWsdotDate(),
  ScheduleEnd: zWsdotDate(),
});

export const activeSeasonsArraySchema = z.array(activeSeasonSchema);

export type ActiveSeason = z.infer<typeof activeSeasonSchema>;

/**
 * ActiveSeasons type - represents an array of active season objects
 */
export type ActiveSeasons = z.infer<typeof activeSeasonsArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useActiveSeasons
// ============================================================================

export const useActiveSeasons = (
  params: GetActiveSeasonsParams = {},
  options?: UseQueryOptions
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "activeSeasons"],
    queryFn: () => getActiveSeasons(params),
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
