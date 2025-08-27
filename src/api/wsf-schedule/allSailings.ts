/**
 * WSF Schedule API - All Sailings
 *
 * Provides access to Washington State Ferries comprehensive sailing information
 * for specific scheduled routes. This API returns detailed sailing data including
 * vessel assignments, terminal times, annotations, and operational details for
 * all sailings on a particular route schedule.
 *
 * The API returns complete sailing information organized by direction (westbound/eastbound)
 * with detailed journey information including vessel assignments, terminal arrival/departure
 * times, and special annotations for operational notes, restrictions, and service updates.
 *
 * API Functions:
 * - getAllSailings: Returns all sailings for a specific scheduled route
 *
 * Input/Output Overview:
 * - getAllSailings: Input: { schedRouteId: number }, Output: SailingResponse[]
 *
 * Base Type: SailingResponse
 *
 * interface SailingResponse {
 *   ScheduleID: number;
 *   SchedRouteID: number;
 *   RouteID: number;
 *   SailingID: number;
 *   SailingDescription: string;
 *   SailingNotes: string;
 *   DisplayColNum: number;
 *   SailingDir: number;
 *   DayOpDescription: string;
 *   DayOpUseForHoliday: boolean;
 *   ActiveDateRanges: ActiveDateRange[];
 *   Journs: Journey[];
 * }
 *
 * interface Journey {
 *   JourneyID: number;
 *   ReservationInd: boolean;
 *   InternationalInd: boolean;
 *   InterislandInd: boolean;
 *   VesselID: number;
 *   VesselName: string;
 *   VesselHandicapAccessible: boolean;
 *   VesselPositionNum: number;
 *   TerminalTimes: TerminalTime[];
 * }
 *
 * interface TerminalTime {
 *   JourneyTerminalID: number;
 *   TerminalID: number;
 *   TerminalDescription: string;
 *   TerminalBriefDescription: string;
 *   Time: Date | null;
 *   DepArrIndicator: number | null;
 *   IsNA: boolean;
 *   Annotations: Annotation[];
 * }
 *
 * Example Usage:
 *
 * curl -s "https://www.wsdot.wa.gov/ferries/api/schedule/rest/allsailings/2327?apiaccesscode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "ScheduleID": 192,
 *     "SchedRouteID": 2327,
 *     "RouteID": 9,
 *     "SailingID": 7422,
 *     "SailingDescription": "Leave Westbound",
 *     "SailingNotes": "",
 *     "DisplayColNum": 0,
 *     "SailingDir": 1,
 *     "DayOpDescription": "Daily",
 *     "DayOpUseForHoliday": true,
 *     "ActiveDateRanges": [
 *       {
 *         "DateFrom": "/Date(1749970800000-0700)/",
 *         "DateThru": "/Date(1758351600000-0700)/",
 *         "EventID": null,
 *         "EventDescription": null
 *       }
 *     ],
 *     "Journs": [
 *       {
 *         "JourneyID": 158204,
 *         "ReservationInd": false,
 *         "InternationalInd": false,
 *         "InterislandInd": false,
 *         "VesselID": 69,
 *         "VesselName": "Samish",
 *         "VesselHandicapAccessible": true,
 *         "VesselPositionNum": 2,
 *         "TerminalTimes": [
 *           {
 *             "JourneyTerminalID": 224498,
 *             "TerminalID": 1,
 *             "TerminalDescription": "Anacortes",
 *             "TerminalBriefDescription": "Anacortes",
 *             "Time": "/Date(-2208945600000-0800)/",
 *             "DepArrIndicator": 1,
 *             "IsNA": false,
 *             "Annotations": []
 *           }
 *         ]
 *       }
 *     ]
 *   }
 * ]
 *
 * Note: The API returns comprehensive sailing information including vessel assignments,
 * terminal times, and operational annotations. SailingDir indicates direction (1=westbound,
 * 2=eastbound). TerminalTimes include arrival/departure indicators and special annotations
 * for operational notes, restrictions, and service updates.
 */

import type { UseQueryOptions } from "@tanstack/react-query";
import { z } from "zod";

import { useQueryWithAutoUpdate } from "@/shared/tanstack";
import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";

// ============================================================================
// API Functions
//
// getAllSailings
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/allsailings/{schedRouteId}";

/**
 * Retrieves all sailings for a specific scheduled route with comprehensive details.
 *
 * This endpoint returns detailed sailing information including vessel assignments,
 * terminal arrival/departure times, operational annotations, and service notes
 * for all sailings on a particular route schedule. Data is organized by sailing
 * direction and includes complete journey information.
 *
 * @param params - Parameters object for all sailings query
 * @param params.schedRouteId - Unique identifier for the scheduled route
 * @returns Promise<SailingResponse[]> - Array of comprehensive sailing information
 *
 * @example
 * const allSailings = await getAllSailings({ schedRouteId: 2327 });
 * console.log(allSailings.length);  // 2 (westbound and eastbound)
 * console.log(allSailings[0].SailingDescription);  // "Leave Westbound"
 * console.log(allSailings[0].Journs.length);  // 25 (number of journeys)
 * console.log(allSailings[0].Journs[0].VesselName);  // "Samish"
 *
 * @throws {Error} When API is unavailable, invalid schedRouteId, or authentication fails
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
// Input Schemas & Types
//
// getAllSailingsParamsSchema
// GetAllSailingsParams
// ============================================================================

/**
 * Parameters for retrieving all sailings for a specific scheduled route
 */
export const getAllSailingsParamsSchema = z
  .object({
    schedRouteId: z.number().int().positive().describe(""),
  })
  .describe("");

export type GetAllSailingsParams = z.infer<typeof getAllSailingsParamsSchema>;

// ============================================================================
// Output Schemas & Types
//
// annotationSchema
// terminalTimeSchema
// journeySchema
// activeDateRangeSchema
// sailingResponseSchema
// sailingsArraySchema
// SailingResponse
// ============================================================================

/**
 * Annotation schema - represents operational notes and special instructions
 */
export const annotationSchema = z
  .object({
    AnnotationID: z.number().int().positive().describe(""),
    AnnotationText: z.string().describe(""),
    AnnotationIVRText: z.string().describe(""),
    AdjustedCrossingTime: zWsdotDate().nullable().describe(""),
    AnnotationImg: z.string().url().describe(""),
    TypeDescription: z.string().describe(""),
    SortSeq: z.number().int().min(0).describe(""),
  })
  .describe("");

/**
 * Terminal time schema - represents arrival/departure times at specific terminals
 */
export const terminalTimeSchema = z
  .object({
    JourneyTerminalID: z.number().int().positive().describe(""),
    TerminalID: z.number().int().positive().describe(""),
    TerminalDescription: z.string().describe(""),
    TerminalBriefDescription: z.string().describe(""),
    Time: zWsdotDate().nullable().describe(""),
    DepArrIndicator: z.number().int().nullable().describe(""),
    IsNA: z.boolean().describe(""),
    Annotations: z.array(annotationSchema).describe(""),
  })
  .describe("");

/**
 * Journey schema - represents individual vessel journeys with terminal times
 */
export const journeySchema = z
  .object({
    JourneyID: z.number().int().positive().describe(""),
    ReservationInd: z.boolean().describe(""),
    InternationalInd: z.boolean().describe(""),
    InterislandInd: z.boolean().describe(""),
    VesselID: z.number().int().positive().describe(""),
    VesselName: z.string().describe(""),
    VesselHandicapAccessible: z.boolean().describe(""),
    VesselPositionNum: z.number().int().positive().describe(""),
    TerminalTimes: z.array(terminalTimeSchema).describe(""),
  })
  .describe("");

/**
 * Active date range schema - represents when a sailing is active
 */
export const activeDateRangeSchema = z
  .object({
    DateFrom: zWsdotDate().nullable().describe(""),
    DateThru: zWsdotDate().nullable().describe(""),
    EventID: z.number().int().positive().nullable().describe(""),
    EventDescription: z.string().nullable().describe(""),
  })
  .describe("");

/**
 * Sailing response schema - represents comprehensive sailing information
 */
export const sailingResponseSchema = z
  .object({
    ScheduleID: z.number().int().positive().describe(""),
    SchedRouteID: z.number().int().positive().describe(""),
    RouteID: z.number().int().positive().describe(""),
    SailingID: z.number().int().positive().describe(""),
    SailingDescription: z.string().describe(""),
    SailingNotes: z.string().describe(""),
    DisplayColNum: z.number().int().min(0).describe(""),
    SailingDir: z.number().int().min(1).max(2).describe(""),
    DayOpDescription: z.string().describe(""),
    DayOpUseForHoliday: z.boolean().describe(""),
    ActiveDateRanges: z.array(activeDateRangeSchema).describe(""),
    Journs: z.array(journeySchema).describe(""),
  })
  .describe("");

/**
 * Array of sailing response objects - wrapper around sailingResponseSchema
 */
export const sailingsArraySchema = z.array(sailingResponseSchema);

/**
 * SailingResponse type - represents comprehensive sailing information
 */
export type SailingResponse = z.infer<typeof sailingResponseSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useAllSailings
// ============================================================================

/**
 * TanStack Query hook for all sailings with automatic updates.
 *
 * @param params - Parameters object for all sailings query
 * @param params.schedRouteId - Unique identifier for the scheduled route
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<SailingResponse[], Error> - Query result with comprehensive sailing information
 *
 * @example
 * const { data: allSailings, isLoading } = useAllSailings({ schedRouteId: 2327 });
 * if (allSailings) {
 *   console.log(allSailings.length);  // 2 (westbound and eastbound)
 *   console.log(allSailings[0].SailingDescription);  // "Leave Westbound"
 *   console.log(allSailings[0].Journs[0].VesselName);  // "Samish"
 * }
 */
export const useAllSailings = (
  params: GetAllSailingsParams,
  options?: UseQueryOptions<SailingResponse[], Error>
) => {
  return useQueryWithAutoUpdate({
    queryKey: ["wsf", "schedule", "allSailings", params.schedRouteId],
    queryFn: () => getAllSailings(params),
    fetchLastUpdateTime: getCacheFlushDateSchedule,
    options: { ...tanstackQueryOptions.DAILY_UPDATES, ...options },
  });
};
