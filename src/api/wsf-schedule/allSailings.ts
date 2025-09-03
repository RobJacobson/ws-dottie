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
// getAllSailings
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/allsailings/{schedRouteId}";

export const getAllSailings = async (
  params: GetAllSailingsParams
): Promise<Sailings> => {
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

export type Sailings = z.infer<typeof sailingsArraySchema>;

// ============================================================================
// TanStack Query Hooks
//
// useAllSailings
// ============================================================================

export const allSailingsOptions = (params: GetAllSailingsParams) =>
  queryOptions({
    queryKey: ["wsf", "schedule", "allSailings", "getAllSailings", params],
    queryFn: () => getAllSailings(params),
    staleTime: ONE_DAY,
    gcTime: TWO_DAYS,
    refetchInterval: ONE_DAY,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
