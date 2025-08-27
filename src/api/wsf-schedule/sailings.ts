/**
 * WSF Schedule API - Sailings
 *
 * Provides detailed sailing information for Washington State Ferry routes including:
 * - Complete sailing schedules with vessel assignments and terminal times
 * - Journey details with operational information (daily patterns, holiday schedules)
 * - Vessel accessibility and reservation indicators
 * - Active date ranges and service notes
 * - Terminal annotations and operational instructions
 *
 * This API returns comprehensive sailing data organized by scheduled routes, including
 * multiple journeys per sailing with detailed terminal timing information. Each journey
 * contains vessel assignments, terminal times, and operational annotations that provide
 * important service information for passengers.
 *
 * API Functions:
 * - getSailings: Returns an array of SailingResponse objects for a specific scheduled route
 *
 * Input/Output Overview:
 * - getSailings: Input: { schedRouteId: number }, Output: SailingResponse[]
 *
 * Base Type: SailingResponse
 *
 * interface SailingResponse {
 *   ScheduleID: number;
 *   SchedRouteID: number;
 *   RouteID: number; // Undocumented field
 *   SailingID: number;
 *   SailingDescription: string;
 *   SailingNotes: string;
 *   DisplayColNum: number;
 *   SailingDir: number;
 *   DayOpDescription: string;
 *   DayOpUseForHoliday: boolean;
 *   ActiveDateRanges: Array<{
 *     DateFrom: Date | null;
 *     DateThru: Date | null;
 *     EventID: number | null;
 *     EventDescription: string | null;
 *   }>;
 *   Journs: Array<{
 *     JourneyID: number;
 *     ReservationInd: boolean;
 *     InternationalInd: boolean;
 *     InterislandInd: boolean;
 *     VesselID: number;
 *     VesselName: string;
 *     VesselHandicapAccessible: boolean;
 *     VesselPositionNum: number;
 *     TerminalTimes: Array<{
 *       JourneyTerminalID: number;
 *       TerminalID: number;
 *       TerminalDescription: string;
 *       TerminalBriefDescription: string;
 *       Time: Date | null;
 *       DepArrIndicator: number | null;
 *       IsNA: boolean;
 *       Annotations: Array<{
 *         AnnotationID: number;
 *         AnnotationText: string;
 *         AnnotationIVRText: string;
 *         AdjustedCrossingTime: Date | null;
 *         AnnotationImg: string;
 *         TypeDescription: string;
 *         SortSeq: number;
 *       }>; // Undocumented field
 *     }>;
 *   }>;
 * }
 *
 * Note: The API response includes additional fields like RouteID and Annotations arrays
 * that provide valuable operational information but are not documented in the official API
 * specification.
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/schedule/rest/sailings/2327?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * {
 *   "ScheduleID": 192,
 *   "SchedRouteID": 2327,
 *   "RouteID": 9,
 *   "SailingID": 7422,
 *   "SailingDescription": "Leave Westbound",
 *   "SailingNotes": "",
 *   "DisplayColNum": 0,
 *   "SailingDir": 1,
 *   "DayOpDescription": "Daily",
 *   "DayOpUseForHoliday": true,
 *   "ActiveDateRanges": [{
 *     "DateFrom": "/Date(1749970800000-0700)/",
 *     "DateThru": "/Date(1758351600000-0700)/",
 *     "EventID": null,
 *     "EventDescription": null
 *   }],
 *   "Journs": [{
 *     "JourneyID": 158204,
 *     "ReservationInd": false,
 *     "InternationalInd": false,
 *     "InterislandInd": false,
 *     "VesselID": 69,
 *     "VesselName": "Samish",
 *     "VesselHandicapAccessible": true,
 *     "VesselPositionNum": 2,
 *     "TerminalTimes": [{
 *       "JourneyTerminalID": 224498,
 *       "TerminalID": 1,
 *       "TerminalDescription": "Anacortes",
 *       "TerminalBriefDescription": "Anacortes",
 *       "Time": "/Date(-2208945600000-0800)/",
 *       "DepArrIndicator": 1,
 *       "IsNA": false,
 *       "Annotations": [] // Undocumented field
 *     }]
 *   }]
 * }
 * ```
 *
 * @see {@link https://www.wsdot.wa.gov/ferries/api/schedule/documentation/rest.html WSF Schedule API Documentation}
 * @see {@link https://www.wsdot.wa.gov/ferries/schedule/ WSF Schedules}
 *
 * @example
 * ```typescript
 * import { getSailings } from '@ferryjoy/ws-dottie';
 *
 * // Get sailing information for a specific scheduled route
 * const sailings = await getSailings({ schedRouteId: 2327 });
 *
 * // Access sailing details
 * sailings.forEach(sailing => {
 *   console.log(`Sailing: ${sailing.SailingDescription}`);
 *   console.log(`Day Operation: ${sailing.DayOpDescription}`);
 *   console.log(`Journeys: ${sailing.Journs.length}`);
 *
 *   // Access journey details
 *   sailing.Journs.forEach(journey => {
 *     console.log(`Vessel: ${journey.VesselName} (${journey.VesselID})`);
 *     console.log(`Handicap Accessible: ${journey.VesselHandicapAccessible}`);
 *   });
 * });
 * ```
 *
 * @module wsf-schedule/sailings
 */

import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import type { UseQueryOptions } from "@tanstack/react-query";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";

// ============================================================================
// API Function
//
// getSailings
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/sailings/{schedRouteId}";

/**
 * Retrieves detailed sailing information for a specific scheduled route.
 *
 * @param params - Parameters object for sailing query
 * @param params.schedRouteId - Unique scheduled route identifier (positive integer)
 * @returns Promise<SailingResponse[]> - Array of sailing information including schedules, vessels, and terminal times
 *
 * @example
 * const sailings = await getSailings({ schedRouteId: 2329 });
 * console.log(sailings[0].SailingDescription);  // "Leave Seattle"
 * console.log(sailings[0].DayOpDescription);  // "Monday through Friday"
 * console.log(sailings[0].Journs.length);  // 20
 *
 * @throws {Error} When scheduled route ID is invalid or API is unavailable
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

/**
 * Parameters for retrieving sailing information for a specific scheduled route
 */
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

/**
 * Terminal time information for a specific journey - includes departure/arrival times and terminal details
 */
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

/**
 * Journey information for a specific sailing - includes vessel assignment and terminal times
 */
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

/**
 * Sailing information schema - represents a single sailing with vessel and journey details
 */
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

/**
 * Array of sailing objects - wrapper around sailingSchema
 */
export const sailingsArraySchema = z.array(sailingSchema);

/**
 * Sailing type - represents a single sailing with vessel and journey details
 */
export type Sailing = z.infer<typeof sailingSchema>;

// ============================================================================
// API RESPONSE SCHEMAS (based on real API responses)
// ============================================================================

/**
 * Complete sailing response schema - includes schedule information, operational details, and journey data
 */
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

/**
 * Array of sailing response objects - wrapper around sailingResponseSchema
 */
export const sailingsResponseArraySchema = z.array(sailingResponseSchema);

/**
 * SailingResponse type - represents complete sailing information including schedule and operational details
 */
export type SailingResponse = z.infer<typeof sailingResponseSchema>;

// ============================================================================
// TanStack Query Hook
//
// useSailings
// ============================================================================

/**
 * TanStack Query hook for sailing data with automatic updates.
 *
 * @param params - Parameters object for sailing query
 * @param params.schedRouteId - Unique scheduled route identifier (positive integer)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<SailingResponse[], Error> - Query result with sailing schedule data
 *
 * @example
 * const { data: sailings, isLoading } = useSailings({ schedRouteId: 2329 });
 * if (sailings) {
 *   console.log(sailings[0].SailingDescription);  // "Leave Seattle"
 *   console.log(sailings[0].DayOpDescription);  // "Monday through Friday"
 * }
 */
export const useSailings = (
  params: GetSailingsParams,
  options?: UseQueryOptions<SailingResponse[], Error>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "sailings", JSON.stringify(params)],
    queryFn: () => getSailings(params),
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
    params,
  });
};
