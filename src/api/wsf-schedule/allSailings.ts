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

export const getAllSailingsParamsSchema = z.object({
  schedRouteId: z.number().int().positive(),
});

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

export const annotationSchema = z.object({
  AnnotationID: z.number().int().positive(),
  AnnotationText: z.string(),
  AnnotationIVRText: z.string(),
  AdjustedCrossingTime: zWsdotDate().nullable(),
  AnnotationImg: z.string().url(),
  TypeDescription: z.string(),
  SortSeq: z.number().int().min(0),
});

export const terminalTimeSchema = z.object({
  JourneyTerminalID: z.number().int().positive(),
  TerminalID: z.number().int().positive(),
  TerminalDescription: z.string(),
  TerminalBriefDescription: z.string(),
  Time: zWsdotDate().nullable(),
  DepArrIndicator: z.number().int().nullable(),
  IsNA: z.boolean(),
  Annotations: z.array(annotationSchema),
});

export const journeySchema = z.object({
  JourneyID: z.number().int().positive(),
  ReservationInd: z.boolean(),
  InternationalInd: z.boolean(),
  InterislandInd: z.boolean(),
  VesselID: z.number().int().positive(),
  VesselName: z.string(),
  VesselHandicapAccessible: z.boolean(),
  VesselPositionNum: z.number().int().positive(),
  TerminalTimes: z.array(terminalTimeSchema),
});

export const activeDateRangeSchema = z.object({
  DateFrom: zWsdotDate().nullable(),
  DateThru: zWsdotDate().nullable(),
  EventID: z.number().int().positive().nullable(),
  EventDescription: z.string().nullable(),
});

export const sailingResponseSchema = z.object({
  ScheduleID: z.number().int().positive(),
  SchedRouteID: z.number().int().positive(),
  RouteID: z.number().int().positive(),
  SailingID: z.number().int().positive(),
  SailingDescription: z.string(),
  SailingNotes: z.string(),
  DisplayColNum: z.number().int().min(0),
  SailingDir: z.number().int().min(1).max(2),
  DayOpDescription: z.string(),
  DayOpUseForHoliday: z.boolean(),
  ActiveDateRanges: z.array(activeDateRangeSchema),
  Journs: z.array(journeySchema),
});

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
