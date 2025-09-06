import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  routesWithServiceDisruptionsArraySchema,
  type RoutesWithServiceDisruptionsArray,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getRoutesWithDisruptionsParamsSchema
// GetRoutesWithDisruptionsParams
// ============================================================================

export const getRoutesWithDisruptionsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetRoutesWithDisruptionsParams = z.infer<
  typeof getRoutesWithDisruptionsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// routesWithServiceDisruptionsArraySchema (imported from routesWithServiceDisruptions.zod)
// RoutesWithServiceDisruptionsArray (imported from routesWithServiceDisruptions.zod)
// ============================================================================

export type RoutesWithDisruptions = RoutesWithServiceDisruptionsArray;

// ============================================================================
// API Functions
//
// getRoutesWithDisruptions (routes with service disruptions)
// ============================================================================

const ENDPOINT_WITH_DISRUPTIONS =
  "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}";

export const getRoutesWithDisruptions = zodFetch<
  GetRoutesWithDisruptionsParams,
  RoutesWithDisruptions
>(
  ENDPOINT_WITH_DISRUPTIONS,
  getRoutesWithDisruptionsParamsSchema,
  routesWithServiceDisruptionsArraySchema
);

// ============================================================================
// TanStack Query Options
// ============================================================================

export const routesWithDisruptionsOptions = createQueryOptions({
  apiFunction: getRoutesWithDisruptions,
  queryKey: ["wsf", "schedule", "routes", "getRoutesWithDisruptions"],
  cacheStrategy: "DAILY_STATIC",
});
