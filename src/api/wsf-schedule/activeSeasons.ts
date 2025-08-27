/**
 * WSF Schedule API - Active Seasons
 *
 * Provides access to Washington State Ferries active schedule seasons including
 * Summer, Fall, Winter, and Spring schedules. This API returns information about
 * which schedule periods are currently available and their valid date ranges.
 *
 * The API helps determine which schedule periods are active for planning ferry
 * trips and accessing route-specific schedules. Each season has a unique ID,
 * descriptive name, and specific start/end dates when the schedule is valid.
 *
 * API Functions:
 * - getActiveSeasons: Returns all active schedule seasons with their date ranges
 *
 * Input/Output Overview:
 * - getActiveSeasons: Input: none (no parameters required), Output: ActiveSeason[]
 *
 * Base Type: ActiveSeason
 *
 * interface ActiveSeason {
 *   ScheduleID: number;
 *   ScheduleName: string;
 *   ScheduleSeason: number;
 *   SchedulePDFUrl: string;
 *   ScheduleStart: Date;
 *   ScheduleEnd: Date;
 * }
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/schedule/rest/activeseasons?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "ScheduleID": 192,
 *     "ScheduleName": "Summer 2025",
 *     "ScheduleSeason": 1,
 *     "SchedulePDFUrl": "http://www.wsdot.wa.gov/ferries/pdf/2025Summer.pdf",
 *     "ScheduleStart": "/Date(1749970800000-0700)/",
 *     "ScheduleEnd": "/Date(1758351600000-0700)/"
 *   },
 *   {
 *     "ScheduleID": 193,
 *     "ScheduleName": "Fall 2025",
 *     "ScheduleSeason": 2,
 *     "SchedulePDFUrl": "http://www.wsdot.wa.gov/ferries/pdf/2025Fall.pdf",
 *     "ScheduleStart": "/Date(1758438000000-0700)/",
 *     "ScheduleEnd": "/Date(1766822400000-0800)/"
 *   }
 * ]
 *
 * Note: The API returns different seasons based on the current date and upcoming
 * schedule publications. Summer and Fall schedules are typically available year-round,
 * while Winter and Spring schedules may be published closer to their effective dates.
 */

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

/**
 * Retrieves all active schedule seasons with their date ranges and PDF URLs.
 *
 * This endpoint returns information about which schedule periods are currently
 * available, including Summer, Fall, Winter, and Spring schedules. Each season
 * has a unique ID, descriptive name, and specific start/end dates when the
 * schedule is valid.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<ActiveSeason[]> - Array of active schedule seasons with date ranges
 *
 * @example
 * const activeSeasons = await getActiveSeasons();
 * console.log(activeSeasons.length);  // 2
 * console.log(activeSeasons[0].ScheduleName);  // "Summer 2025"
 * console.log(activeSeasons[0].ScheduleStart);  // 2025-01-13T00:00:00.000Z
 * console.log(activeSeasons[0].SchedulePDFUrl);  // "http://www.wsdot.wa.gov/ferries/pdf/2025Summer.pdf"
 *
 * @throws {Error} When API is unavailable or authentication fails
 */
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

/**
 * Parameters for retrieving active schedule seasons (no parameters required)
 */
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

/**
 * Active season schema - represents a schedule season with its date range and metadata
 */
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

/**
 * Array of active season objects - wrapper around activeSeasonSchema
 */
export const activeSeasonsArraySchema = z.array(activeSeasonSchema);

/**
 * ActiveSeason type - represents a schedule season with its date range and metadata
 */
export type ActiveSeason = z.infer<typeof activeSeasonSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useActiveSeasons
// ============================================================================

/**
 * TanStack Query hook for active schedule seasons with automatic updates.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<ActiveSeason[], Error> - Query result with active schedule seasons
 *
 * @example
 * const { data: activeSeasons, isLoading } = useActiveSeasons();
 * if (activeSeasons) {
 *   console.log(activeSeasons.length);  // 2
 *   console.log(activeSeasons[0].ScheduleName);  // "Summer 2025"
 * }
 */
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
