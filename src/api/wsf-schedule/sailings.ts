import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { zWsdotDate } from "@/shared/fetching/validation/schemas";
import { createUseQueryWsf, tanstackQueryOptions } from "@/shared/tanstack";

import { getCacheFlushDateSchedule } from "../wsf/cacheFlushDate";

// ============================================================================
// API Function
//
// getSailings
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/sailings/{schedRouteId}";

export const getSailings = async (
  params: GetSailingsParams
): Promise<SailingsResponse> => {
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

export const getSailingsParamsSchema = z.object({
  schedRouteId: z.number().int().positive(),
});

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

export const terminalTimeSchema = z.object({
  JourneyTerminalID: z.number(),
  TerminalID: z.number(),
  TerminalDescription: z.string(),
  TerminalBriefDescription: z.string(),
  Time: zWsdotDate().nullable(),
  DepArrIndicator: z.number().nullable(),
  IsNA: z.boolean(),
  Annotations: z.array(z.any()).optional(),
});

export const journeySchema = z.object({
  JourneyID: z.number(),
  ReservationInd: z.boolean(),
  InternationalInd: z.boolean(),
  InterislandInd: z.boolean(),
  VesselID: z.number(),
  VesselName: z.string(),
  VesselHandicapAccessible: z.boolean(),
  VesselPositionNum: z.number(),
  TerminalTimes: z.array(terminalTimeSchema),
});

export const sailingSchema = z.object({
  SailingID: z.number(),
  SchedRouteID: z.number(),
  SailingDate: zWsdotDate(),
  SailingTime: zWsdotDate(),
  VesselID: z.number(),
  VesselName: z.string(),
  VesselHandicapAccessible: z.boolean(),
  VesselPositionNum: z.number(),
  Journeys: z.array(journeySchema),
});

export const sailingsArraySchema = z.array(sailingSchema);

export type Sailing = z.infer<typeof sailingSchema>;

/**
 * Sailings type - represents an array of sailing objects
 */
export type Sailings = z.infer<typeof sailingsArraySchema>;

// ============================================================================
// API RESPONSE SCHEMAS (based on real API responses)
// ============================================================================

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

export const sailingsResponseArraySchema = z.array(sailingResponseSchema);

export type SailingResponse = z.infer<typeof sailingResponseSchema>;

/**
 * SailingsResponse type - represents an array of sailing response objects
 */
export type SailingsResponse = z.infer<typeof sailingsResponseArraySchema>;

// ============================================================================
// TanStack Query Hook
//
// useSailings
// ============================================================================

export const useSailings = createUseQueryWsf({
  queryFn: getSailings,
  queryKeyPrefix: ["wsf", "schedule", "sailings", "getSailings"],
  defaultOptions: tanstackQueryOptions.ONE_DAY_POLLING,
  getCacheFlushDate: getCacheFlushDateSchedule,
});
