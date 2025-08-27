/**
 * Search Highway Alerts API
 *
 * Advanced search functionality for highway alerts with multiple filter criteria including state route,
 * region, time range, and milepost range. This API provides comprehensive filtering capabilities for
 * targeted alert retrieval, allowing applications to find specific types of traffic events.
 *
 * The API supports both simple retrieval (no parameters) and advanced search with multiple filters.
 * When no search parameters are provided, it falls back to the basic alerts endpoint for simplicity.
 *
 * API Functions:
 * - searchHighwayAlerts: Returns an array of HighwayAlert objects matching search criteria
 *
 * Input/Output Overview:
 * - searchHighwayAlerts: Input: SearchHighwayAlertsParams (all optional), Output: HighwayAlert[]
 *
 * Base Type: SearchHighwayAlertsParams
 *
 * interface SearchHighwayAlertsParams {
 *   StateRoute?: string;           // Optional state route filter (e.g., "I-5", "US-2")
 *   Region?: string;               // Optional region filter (e.g., "Seattle", "Spokane")
 *   SearchTimeStart?: Date;        // Optional start time for search range
 *   SearchTimeEnd?: Date;          // Optional end time for search range
 *   StartingMilepost?: number;     // Optional starting milepost for route segment
 *   EndingMilepost?: number;       // Optional ending milepost for route segment
 * }
 *
 * Example Usage:
 *
 * curl -s "https://wsdot.wa.gov/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/SearchAlertsAsJson?AccessCode=$WSDOT_ACCESS_TOKEN&StateRoute=I-5&Region=Seattle"
 *
 * Here is example output from this curl command:
 *
 * ```json
 * [
 *   {
 *     "AlertID": 468632,
 *     "EndTime": "/Date(1756851229000-0700)/",
 *     "EventCategory": "Construction",
 *     "EventStatus": "Active",
 *     "ExtendedDescription": "Construction work on I-5 causing delays",
 *     "HeadlineDescription": "Construction on I-5 in Seattle",
 *     "Priority": "High",
 *     "Region": "Seattle"
 *   }
 * ]
 * ```
 *
 * Note: The API requires a valid WSDOT access token. All search parameters are optional - when
 * no parameters are provided, the API returns all current alerts. The search endpoint provides
 * flexible filtering for applications that need to find specific types of traffic events.
 */

import type { UseQueryResult, UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/tanstack";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/tanstack";

import type { HighwayAlert } from "./highwayAlerts";
import { highwayAlertArraySchema } from "./highwayAlerts";

// ============================================================================
// API Function
//
// searchHighwayAlerts
// ============================================================================

const SEARCH_ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/SearchAlertsAsJson?StateRoute={StateRoute}&Region={Region}&SearchTimeStart={SearchTimeStart}&SearchTimeEnd={SearchTimeEnd}&StartingMilepost={StartingMilepost}&EndingMilepost={EndingMilepost}";

const SIMPLE_ENDPOINT =
  "/Traffic/api/HighwayAlerts/HighwayAlertsREST.svc/GetAlertsAsJson";

/**
 * Advanced search for highway alerts with multiple filter criteria.
 *
 * @param params - Object containing optional search criteria parameters
 * @param params.StateRoute - Optional state route filter (e.g., "I-5", "US-2")
 * @param params.Region - Optional region filter (e.g., "Seattle", "Spokane")
 * @param params.SearchTimeStart - Optional start time for search range
 * @param params.SearchTimeEnd - Optional end time for search range
 * @param params.StartingMilepost - Optional starting milepost for route segment
 * @param params.EndingMilepost - Optional ending milepost for route segment
 * @returns Promise<HighwayAlert[]> - Array of highway alerts matching search criteria
 *
 * @example
 * const alerts = await searchHighwayAlerts({
 *   StateRoute: "I-5",
 *   Region: "Seattle"
 * });
 * console.log(alerts.length);  // 5
 * console.log(alerts[0].HeadlineDescription);  // "Construction on I-5 in Seattle"
 *
 * @throws {Error} When the API request fails or validation fails
 */
export const searchHighwayAlerts = async (
  params: SearchHighwayAlertsParams
): Promise<HighwayAlert[]> => {
  // If no parameters are provided, use the simple endpoint
  if (Object.keys(params).length === 0) {
    return zodFetch(
      SIMPLE_ENDPOINT,
      {
        input: searchHighwayAlertsParamsSchema,
        output: highwayAlertArraySchema,
      },
      {}
    );
  }

  // Otherwise, use the search endpoint with parameters
  return zodFetch(
    SEARCH_ENDPOINT,
    {
      input: searchHighwayAlertsParamsSchema,
      output: highwayAlertArraySchema,
    },
    params
  );
};

// ============================================================================
// Input Schema & Types
//
// searchHighwayAlertsParamsSchema
// SearchHighwayAlertsParams
// ============================================================================

/**
 * Parameters for advanced highway alert search with multiple optional filters
 */
export const searchHighwayAlertsParamsSchema = z
  .object({
    StateRoute: z.string().optional().describe(""),

    Region: z.string().optional().describe(""),

    SearchTimeStart: z.date().optional().describe(""),

    SearchTimeEnd: z.date().optional().describe(""),

    StartingMilepost: z.number().optional().describe(""),

    EndingMilepost: z.number().optional().describe(""),
  })
  .describe("");

export type SearchHighwayAlertsParams = z.infer<
  typeof searchHighwayAlertsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// highwayAlertArraySchema (imported from ./getHighwayAlerts)
// ============================================================================

// ============================================================================
// TanStack Query Hook
//
// useSearchHighwayAlerts
// ============================================================================

/**
 * TanStack Query hook for advanced highway alert search with automatic updates.
 *
 * @param params - Object containing optional search criteria parameters
 * @param params.StateRoute - Optional state route filter (e.g., "I-5", "US-2")
 * @param params.Region - Optional region filter (e.g., "Seattle", "Spokane")
 * @param params.SearchTimeStart - Optional start time for search range
 * @param params.SearchTimeEnd - Optional end time for search range
 * @param params.StartingMilepost - Optional starting milepost for route segment
 * @param params.EndingMilepost - Optional ending milepost for route segment
 * @param options - Optional TanStack Query options for caching and refetch behavior
 * @returns UseQueryResult<HighwayAlert[], Error> - Query result with filtered highway alert data
 *
 * @example
 * const { data: alerts, isLoading } = useSearchHighwayAlerts({
 *   StateRoute: "I-5",
 *   Region: "Seattle"
 * });
 * if (alerts) {
 *   console.log(alerts.length);  // 5
 * }
 */
export const useSearchHighwayAlerts = (
  params: SearchHighwayAlertsParams = {},
  options?: UseQueryOptions<HighwayAlert[], Error>
) => {
  return useQuery({
    queryKey: [
      "wsdot",
      "highway-alerts",
      "searchHighwayAlerts",
      JSON.stringify(params),
    ],
    queryFn: () => searchHighwayAlerts(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
