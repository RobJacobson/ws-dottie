import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createQueryOptions } from "@/shared/factories/queryOptionsFactory";
import {
  routesWithServiceDisruptionsSchema,
  type RoutesWithServiceDisruptions,
} from "@/schemas/wsf-schedule";

// ============================================================================
// Input Schemas & Types
//
// getRoutesHavingServiceDisruptionsParamsSchema
// GetRoutesHavingServiceDisruptionsParams
// ============================================================================

export const getRoutesHavingServiceDisruptionsParamsSchema = z.object({
  tripDate: z.date(),
});

export type GetRoutesHavingServiceDisruptionsParams = z.infer<
  typeof getRoutesHavingServiceDisruptionsParamsSchema
>;

// ============================================================================
// Output Schemas & Types
//
// routesWithServiceDisruptionsSchema (imported from routesWithServiceDisruptions.zod)
// RoutesWithServiceDisruptions (imported from routesWithServiceDisruptions.zod)
// ============================================================================

// ============================================================================
// API Functions
//
// getRoutesHavingServiceDisruptions (routes with service disruptions for a date)
// ============================================================================

const ENDPOINT =
  "/ferries/api/schedule/rest/routeshavingservicedisruptions/{tripDate}";

export const getRoutesHavingServiceDisruptions = zodFetch<
  GetRoutesHavingServiceDisruptionsParams,
  RoutesWithServiceDisruptions
>(
  ENDPOINT,
  getRoutesHavingServiceDisruptionsParamsSchema,
  routesWithServiceDisruptionsSchema
);

// ============================================================================
// TanStack Query Hooks
//
// useRoutesHavingServiceDisruptions
// ============================================================================

export const routesHavingServiceDisruptionsOptions = createQueryOptions({
  apiFunction: getRoutesHavingServiceDisruptions,
  queryKey: [
    "wsf",
    "schedule",
    "routeshavingservicedisruptions",
    "getRoutesHavingServiceDisruptions",
  ],
  cacheStrategy: "DAILY_STATIC",
});
