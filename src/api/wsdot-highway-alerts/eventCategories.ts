import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_MINUTE,
  ONE_HOUR,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

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

export const eventCategoriesOptions = () =>
  queryOptions({
    queryKey: ["wsdot", "highway-alerts", "getEventCategories"],
    queryFn: () => getEventCategories({}),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
