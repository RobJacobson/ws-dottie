/**
 * @module WSDOT — Highway Alerts: Event Categories
 * @description Event category list for highway alerts.
 *
 * Provides:
 * - Event categories used for classifying highway alerts
 *
 * Data includes:
 * - Array of category strings
 *
 * @functions
 *   - getEventCategories: Returns event categories
 *
 * @input
 *   - getEventCategories: {}
 *
 * @output
 *   - getEventCategories: EventCategories (string[])
 *
 * @cli
 *   - getEventCategories: node dist/cli.mjs getEventCategories
 *
 * @exampleResponse
 * [
 *   "",
 *   "Abandoned Vehicle",
 *   "Administrative"
 * ]
 *
 * @see https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
 */
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
// ============================================================================

const ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetEventCategoriesAsJson";

/** Fetches event categories */
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
// ============================================================================

/** Params schema for getEventCategories (none) */
export const getEventCategoriesParamsSchema = z.object({});

/** GetEventCategories params type */
export type GetEventCategoriesParams = z.infer<
  typeof getEventCategoriesParamsSchema
>;

// ============================================================================
// Output Schema & Types
// ============================================================================

/** Event categories array schema */
export const eventCategoriesArraySchema = z.array(z.string());

/** EventCategories type */
export type EventCategories = z.infer<typeof eventCategoriesArraySchema>;

// ============================================================================
// TanStack Query Options
// ============================================================================

/** Returns options for event categories; polls every 60s */
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
