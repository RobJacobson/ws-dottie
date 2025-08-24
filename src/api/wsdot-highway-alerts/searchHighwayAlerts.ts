import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

import type { HighwayAlert } from "./getHighwayAlertById";
import { highwayAlertArraySchema } from "./getHighwayAlerts";

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
 * Search highway alerts from WSDOT Highway Alerts API
 *
 * Advanced search for highway alerts with multiple filter criteria including
 * state route, region, time range, and milepost range. This endpoint provides
 * comprehensive filtering capabilities for targeted alert retrieval.
 *
 * @param params - Object containing search criteria parameters
 * @returns Promise containing filtered highway alert data
 * @throws {Error} When the API request fails or validation fails
 *
 * @example
 * ```typescript
 * const alerts = await searchHighwayAlerts({
 *   StateRoute: "I-5",
 *   Region: "Seattle",
 *   SearchTimeStart: new Date("2024-01-01"),
 *   SearchTimeEnd: new Date("2024-01-31")
 * });
 * console.log(alerts[0].HeadlineDescription); // "Collision on I-5"
 * ```
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

export const searchHighwayAlertsParamsSchema = z
  .object({
    StateRoute: z
      .string()
      .optional()
      .describe(
        "Optional state route identifier to filter alerts by specific highway or road. Examples include 'I-5', 'SR 520', 'US-2', or 'I-90'. When provided, only alerts for the specified route are returned."
      ),

    Region: z
      .string()
      .optional()
      .describe(
        "Optional region name to filter alerts by geographic area. Examples include 'Seattle', 'Tacoma', 'Spokane', 'Eastern Washington', or 'Western Washington'. When provided, only alerts for the specified region are returned."
      ),

    SearchTimeStart: z
      .date()
      .optional()
      .describe(
        "Optional start date for the search period. When provided, only alerts that started on or after this date are returned. Used to limit results to recent or specific time periods."
      ),

    SearchTimeEnd: z
      .date()
      .optional()
      .describe(
        "Optional end date for the search period. When provided, only alerts that started on or before this date are returned. Used in combination with SearchTimeStart to define a specific time range."
      ),

    StartingMilepost: z
      .number()
      .optional()
      .describe(
        "Optional starting milepost value to filter alerts by location along a highway. When provided, only alerts that start at or after this milepost are returned. Used to focus on specific highway segments."
      ),

    EndingMilepost: z
      .number()
      .optional()
      .describe(
        "Optional ending milepost value to filter alerts by location along a highway. When provided, only alerts that start at or before this milepost are returned. Used in combination with StartingMilepost to define a specific highway segment."
      ),
  })
  .describe(
    "Search parameters for filtering highway alerts by multiple criteria including route, region, time range, and milepost range. All parameters are optional, allowing flexible search combinations."
  );

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
 * Hook for searching highway alerts from WSDOT Highway Alerts API
 *
 * Advanced search for highway alerts with multiple filter criteria including
 * state route, region, time range, and milepost range. This endpoint provides
 * comprehensive filtering capabilities for targeted alert retrieval.
 *
 * @param params - Object containing search criteria parameters
 * @param options - Optional React Query options to override defaults
 * @returns React Query result with filtered highway alert data
 */
export const useSearchHighwayAlerts = (
  params: SearchHighwayAlertsParams,
  options?: TanStackOptions<HighwayAlert[]>
): UseQueryResult<HighwayAlert[], Error> => {
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
