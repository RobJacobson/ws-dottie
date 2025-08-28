import {
  type UseQueryResult,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

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

export const useEventCategories = (
  params: GetEventCategoriesParams = {},
  options?: UseQueryOptions<EventCategories, Error>
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "highway-alerts",
      "getEventCategories",
      JSON.stringify(params),
    ],
    queryFn: () => getEventCategories(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
