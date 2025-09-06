import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  sailingResponseSchema,
  sailingResponsesArraySchema,
} from "@/schemas/wsf-schedule";
import {
  terminalTimeSchema,
  type TerminalTime as ScheduleTerminalTime,
} from "@/schemas/wsf-schedule";
import { journeySchema, type Journey } from "@/schemas/wsf-schedule";
import {
  sailingSchema,
  sailingsArraySchema,
  type Sailing,
} from "@/schemas/wsf-schedule";

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
// terminalTimeSchema (imported from terminalTime.zod)
// journeySchema (imported from journey.zod)
// sailingSchema (imported from sailing.zod)
// sailingsArraySchema (imported from sailing.zod)
// Sailing (imported from sailing.zod)
// sailingResponseSchema (imported from sailingResponse.zod)
// sailingsResponseArraySchema (imported from sailingResponse.zod)
// SailingResponse (imported from sailingResponse.zod)
// ============================================================================

export type Sailings = z.infer<typeof sailingsArraySchema>;
export type SailingsResponse = z.infer<typeof sailingResponsesArraySchema>;

// ============================================================================
// API Function
//
// getSailings
// ============================================================================

const ENDPOINT = "/ferries/api/schedule/rest/sailings/{schedRouteId}";

export const getSailings = zodFetch<GetSailingsParams, SailingsResponse>(
  ENDPOINT,
  getSailingsParamsSchema,
  sailingResponsesArraySchema
);

// ============================================================================
// TanStack Query Hook
//
// useSailings
// ============================================================================

export const sailingsOptions = createQueryOptions({
  apiFunction: getSailings,
  queryKey: ["wsf", "schedule", "sailings", "getSailings"],
  cacheStrategy: "DAILY_STATIC",
});
