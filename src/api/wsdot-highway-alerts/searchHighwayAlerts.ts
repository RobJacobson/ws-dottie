import { z } from "zod";
import { zodFetch } from "@/shared/fetching";
import { queryOptions } from "@tanstack/react-query";
import {
  ONE_MINUTE,
  ONE_HOUR,
  FIVE_SECONDS,
} from "@/shared/constants/queryOptions";

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

export const searchHighwayAlertsParamsSchema = z.object({
  StateRoute: z.string().optional(),
  Region: z.string().optional(),
  SearchTimeStart: z.date().optional(),
  SearchTimeEnd: z.date().optional(),
  StartingMilepost: z.number().optional(),
  EndingMilepost: z.number().optional(),
});

export type SearchHighwayAlertsParams = z.infer<
  typeof searchHighwayAlertsParamsSchema
>;

// ============================================================================
// Output Schema & Types
//
// highwayAlertArraySchema (imported from ./getHighwayAlerts)
// ============================================================================

// ============================================================================
// TanStack Query options
//
// useSearchHighwayAlerts
// ============================================================================

export const searchHighwayAlertsOptions = (params: SearchHighwayAlertsParams) =>
  queryOptions({
    queryKey: ["wsdot", "highway-alerts", "searchHighwayAlerts", params],
    queryFn: () => searchHighwayAlerts(params),
    staleTime: ONE_MINUTE,
    gcTime: ONE_HOUR,
    refetchInterval: ONE_MINUTE,
    retry: 3,
    retryDelay: FIVE_SECONDS,
  });
