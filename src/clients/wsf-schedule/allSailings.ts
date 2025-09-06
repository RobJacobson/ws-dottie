import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  sailingResponseSchema,
  sailingResponsesArraySchema,
} from "@/schemas/wsf-schedule";

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
// sailingResponseSchema (imported from sailingResponse.zod)
// sailingResponsesArraySchema (imported from sailingResponse.zod)
// SailingResponse (imported from sailingResponse.zod)
// ============================================================================

// Re-export schemas and types for convenience
export { sailingResponseSchema, sailingResponsesArraySchema };
export const sailingsArraySchema = sailingResponsesArraySchema;
export type Sailings = z.infer<typeof sailingsArraySchema>;

// ============================================================================
// API Functions
//
// getAllSailings
// ============================================================================

export const getAllSailings = zodFetch<GetAllSailingsParams, Sailings>(
  "/ferries/api/schedule/rest/allsailings/{schedRouteId}",
  getAllSailingsParamsSchema,
  sailingsArraySchema
);

// ============================================================================
// TanStack Query Hooks
//
// useAllSailings
// ============================================================================

export const allSailingsOptions = createQueryOptions({
  apiFunction: getAllSailings,
  queryKey: ["wsf", "schedule", "allSailings", "getAllSailings"],
  cacheStrategy: "DAILY_STATIC",
});
