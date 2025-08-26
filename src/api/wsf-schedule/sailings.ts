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
// getSailings
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/sailings/{schedRouteId}";

/**
 * API function for fetching sailings from WSF Schedule API
 *
 * Retrieves sailings for a specific scheduled route. This endpoint provides
 * information about all ferry departures for a particular route schedule.
 *
 * @param params - Object containing schedRouteId
 * @param params.schedRouteId - The unique identifier for the scheduled route
 * @returns Promise resolving to an array of actual sailing response objects containing sailing information
 * @throws {WsfApiError} When the API request fails
 *
 * @example
 * const sailings = await getSailings({ schedRouteId: 1 });
 * console.log(sailings[0].SailingDescription); // "Leave Anacortes - Summer"
 */
export const getSailings = async (
  params: GetSailingsParams
): Promise<SailingResponse[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getSailingsParamsSchema,
      output: sailingsResponseArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getSailingsParamsSchema
// GetSailingsParams
// ============================================================================

export const getSailingsParamsSchema = z
  .object({
    schedRouteId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetSailingsParams = z.infer<typeof getSailingsParamsSchema>;

// ============================================================================
// Output Schema & Types
//
// terminalTimeSchema
// journeySchema
// sailingSchema
// sailingsArraySchema
// Sailing
// sailingResponseSchema
// sailingsResponseArraySchema
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
    IsNA: z.boolean().describe(""),
  })
  .describe("");

export const journeySchema = z
  .object({
    JourneyID: z.number().describe(""),
    ReservationInd: z.boolean().describe(""),
    InternationalInd: z.boolean().describe(""),
    InterislandInd: z.boolean().describe(""),
    VesselID: z.number().describe(""),
    VesselName: z.string().describe(""),
    VesselHandicapAccessible: z.boolean().describe(""),
    VesselPositionNum: z.number().describe(""),
    TerminalTimes: z.array(terminalTimeSchema).describe(""),
  })
  .describe("");

export const sailingSchema = z
  .object({
    SailingID: z.number().describe(""),
    SchedRouteID: z.number().describe(""),
    SailingDate: zWsdotDate().describe(""),
    SailingTime: zWsdotDate().describe(""),
    VesselID: z.number().describe(""),
    VesselName: z.string().describe(""),
    VesselHandicapAccessible: z.boolean().describe(""),
    VesselPositionNum: z.number().describe(""),
    Journeys: z.array(journeySchema).describe(""),
  })
  .describe("");

export const sailingsArraySchema = z.array(sailingSchema);

export type Sailing = z.infer<typeof sailingSchema>;

// ============================================================================
// API RESPONSE SCHEMAS (based on real API responses)
// ============================================================================

// TODO:Add descriptions to schema for all fields
export const sailingResponseSchema = z
  .object({
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
  })
  .describe("");

export const sailingsResponseArraySchema = z.array(sailingResponseSchema);

export type SailingResponse = z.infer<typeof sailingResponseSchema>;

// ============================================================================
// TanStack Query Hook
//
// useSailings
// ============================================================================

/**
 * React Query hook for fetching sailings from WSF Schedule API
 *
 * Retrieves sailings for a specific scheduled route. This endpoint provides
 * information about all ferry departures for a particular route schedule.
 *
 * @param params - Object containing schedRouteId
 * @param params.schedRouteId - The unique identifier for the scheduled route
 * @param options - Optional React Query options
 * @returns React Query result object containing sailing information
 *
 * @example
 * ```typescript
 * const { data: sailings } = useSailings({ schedRouteId: 1 });
 * console.log(sailings?.[0]?.SailingDescription); // "Leave Anacortes - Summer"
 * ```
 */
export const useSailings = (
  params: GetSailingsParams,
  options?: TanStackOptions<SailingResponse[]>
) =>
  useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "sailings", JSON.stringify(params)],
    queryFn: () => getSailings(params),
    ...tanstackQueryOptions.DAILY_UPDATES,
    ...options,
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    params,
  });
