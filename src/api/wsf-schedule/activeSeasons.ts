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

export type ActiveSeasons = z.infer<typeof activeSeasonsArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useActiveSeasons
// ============================================================================

export const activeSeasonsOptions = () =>
  queryOptions({
    queryKey: ["wsf", "schedule", "activeSeasons", "getActiveSeasons"],
    queryFn: () => getActiveSeasons({}),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
