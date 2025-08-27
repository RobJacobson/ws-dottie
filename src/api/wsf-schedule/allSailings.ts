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

export const activeDateRangeSchema = z
  .object({
    DateFrom: zWsdotDate().nullable().describe(""),
    DateThru: zWsdotDate().nullable().describe(""),
    EventID: z.number().int().positive().nullable().describe(""),
    EventDescription: z.string().nullable().describe(""),
  })
  .describe("");

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

export const sailingsArraySchema = z.array(sailingResponseSchema);

export type SailingResponse = z.infer<typeof sailingResponseSchema>;

// ============================================================================
// TanStack Query Hooks
//
// useAllSailings
// ============================================================================

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
