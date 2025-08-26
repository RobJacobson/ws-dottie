import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "./cacheFlushDateSchedule";

// ============================================================================
// API Function
//
// getAllSailings
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/allsailings/{schedRouteId}";

/**
 * API function for fetching all sailings from WSF Schedule API
 *
 * Retrieves all sailings for a specific scheduled route. This endpoint provides
 * comprehensive information about all ferry departures for a particular route schedule.
 *
 * @param params - Object containing schedRouteId
 * @param params.schedRouteId - The unique identifier for the scheduled route
 * @returns Promise resolving to an array of ActualSailingResponse objects containing all sailing information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * ```typescript
 * const allSailings = await getAllSailings({ schedRouteId: 1 });
 * console.log(allSailings[0].SailingDescription); // "Leave Anacortes - Summer"
 * ```
 */
export const getAllSailings = async (
  params: GetAllSailingsParams
): Promise<SailingResponse[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getAllSailingsParamsSchema,
      output: sailingsArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getAllSailingsParamsSchema
// GetAllSailingsParams
// ============================================================================

export const getAllSailingsParamsSchema = z
  .object({
    schedRouteId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetAllSailingsParams = z.infer<typeof getAllSailingsParamsSchema>;

// ============================================================================
// Output Schema & Types (based on actual API response)
//
// terminalTimeSchema
// journeySchema
// sailingResponseSchema
// sailingsArraySchema
// SailingResponse
// ============================================================================

export const terminalTimeSchema = z
  .object({
    JourneyTerminalID: z.number().describe(""),
    TerminalID: z.number().describe(""),
    TerminalDescription: z.string().describe(""),
    TerminalBriefDescription: z.string().describe(""),
    Time: zWsdotDate().nullable().describe(""),
    DepArrIndicator: z.number().nullable().describe(""),
    TidalAdj: z.number().nullable().optional().describe(""),
    TimeToAdj: z.number().nullable().optional().describe(""),
    Annotations: z
      .union([z.string(), z.array(z.unknown())])
      .nullable()
      .optional()
      .describe(""),
  })
  .describe("");

export const journeySchema = z
  .object({
    JourneyID: z.number().describe(""),
    VesselID: z.number().describe(""),
    VesselName: z.string().describe(""),
    VesselHandicapAccessible: z.boolean().describe(""),
    VesselPositionNum: z.number().describe(""),
    TerminalTimes: z.array(terminalTimeSchema).describe(""),
  })
  .describe("");

// API response schema for all sailings
export const sailingResponseSchema = z.object({
  ScheduleID: z.number(),
  SchedRouteID: z.number(),
  RouteID: z.number(),
  SailingID: z.number(),
  SailingDescription: z.string(),
  SailingNotes: z.string(),
  DisplayColNum: z.number(),
  SailingDir: z.number(),
  DayOpDescription: z.string(),
  DayOpUseForHoliday: z.boolean(),
  ActiveDateRanges: z.array(
    z.object({
      DateFrom: zWsdotDate().nullable(),
      DateThru: zWsdotDate().nullable(),
      EventID: z.number().nullable(),
      EventDescription: z.string().nullable(),
    })
  ),
  Journs: z.array(journeySchema),
});

export const sailingsArraySchema = z.array(sailingResponseSchema);

export type SailingResponse = z.infer<typeof sailingResponseSchema>;

// ============================================================================
// TanStack Query Hook
//
// useAllSailings
// ============================================================================

/**
 * React Query hook for fetching all sailings from WSF Schedule API
 *
 * Retrieves all sailings for a specific scheduled route. This endpoint provides
 * comprehensive information about all ferry departures for a particular route schedule.
 *
 * @param params - Object containing schedRouteId
 * @param params.schedRouteId - The unique identifier for the scheduled route
 * @param options - Optional React Query options
 * @returns React Query result object containing all sailing information
 *
 * @example
 * ```typescript
 * const { data: allSailings } = useAllSailings({ schedRouteId: 1 });
 * console.log(allSailings?.[0]?.SailingDescription); // "Leave Anacortes - Summer"
 * ```
 */
export const useAllSailings = (
  params: GetAllSailingsParams,
  options?: TanStackOptions<SailingResponse[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "allSailings", JSON.stringify(params)],
    queryFn: () => getAllSailings(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
