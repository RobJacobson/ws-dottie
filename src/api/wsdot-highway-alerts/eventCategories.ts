import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { createUseQueryWsdot, tanstackQueryOptions } from "@/shared/tanstack";

// ============================================================================
// API Function
//
// getEventCategories
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetEventCategoriesAsJson";

export const getEventCategories = async (
  params: GetEventCategoriesParams = {}
): Promise<string[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getEventCategoriesParamsSchema,
      output: eventCategoriesArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// getEventCategoriesParamsSchema
// GetEventCategoriesParams
// ============================================================================

export const getEventCategoriesParamsSchema = z.object({});

export type GetEventCategoriesParams = z.infer<
  typeof getEventCategoriesParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// eventCategoriesArraySchema
// EventCategories
// ============================================================================

export const eventCategoriesArraySchema = z.array(z.string());

export type EventCategories = z.infer<typeof eventCategoriesArraySchema>;

// ============================================================================
// TanStack Query Hook
//
// useEventCategories
// ============================================================================

export const useEventCategories = createUseQueryWsdot({
  queryFn: getEventCategories,
  queryKeyPrefix: ["wsdot", "highway-alerts", "getEventCategories"],
  defaultOptions: tanstackQueryOptions.ONE_MIN_POLLING,
});
