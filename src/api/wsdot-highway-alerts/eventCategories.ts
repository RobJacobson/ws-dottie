/**
 * Event Categories API
 *
 * Retrieves available event categories used to classify highway alerts within the WSDOT system.
 * This API provides the list of valid event category names that are used to categorize different
 * types of traffic incidents, construction activities, weather events, and special circumstances.
 *
 * The API returns a list of event categories that can be used to understand the types of alerts
 * available and potentially filter alerts by category in future implementations.
 *
 * API Functions:
 * - getEventCategories: Returns an array of string event category names
 *
 * Input/Output Overview:
 * - getEventCategories: Input: none, Output: string[]
 *
 * Base Type: Event Categories
 *
 * Common event categories include: "Construction", "Incident", "Weather", "Special Event"
 * Each category represents a different type of traffic alert or road condition.
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetEventCategoriesAsJson?AccessCode=$WSDOT_ACCESS_TOKEN"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   "Construction",
 *   "Incident",
 *   "Weather",
 *   "Special Event",
 *   "Maintenance",
 *   "Emergency"
 * ]
 * ```
 *
 * Note: The API requires a valid WSDOT access token. Event categories are predefined
 * classifications used by WSDOT to organize traffic alert information. These categories help
 * users understand the nature of traffic events and can be used for filtering and display purposes.
 */

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

/**
 * Retrieves all available event categories used to classify highway alerts.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @returns Promise<string[]> - Array of event category names
 *
 * @example
 * const categories = await getEventCategories();
 * console.log(categories.length);  // 6
 * console.log(categories[0]);  // "Construction"
 * console.log(categories.includes("Weather"));  // true
 *
 * @throws {Error} When API is unavailable
 */
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

/**
 * Parameters for retrieving event categories (no parameters required)
 */
export const getEventCategoriesParamsSchema = z.object({}).describe("");

export type GetEventCategoriesParams = z.infer<
  typeof getEventCategoriesParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// eventCategoriesArraySchema
// EventCategories
// ============================================================================

/**
 * Array of event category strings - wrapper around z.array(z.string())
 */
export const eventCategoriesArraySchema = z.array(z.string()).describe("");

export type EventCategories = z.infer<typeof eventCategoriesArraySchema>;

// ============================================================================
// TanStack Query Hook
//
// useEventCategories
// ============================================================================

/**
 * TanStack Query hook for event categories data with automatic updates.
 *
 * @param params - Parameters object (no parameters required, defaults to empty object)
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<string[], Error> - Query result with event categories data
 *
 * @example
 * const { data: categories, isLoading } = useEventCategories();
 * if (categories) {
 *   console.log(categories.length);  // 6
 * }
 */
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
