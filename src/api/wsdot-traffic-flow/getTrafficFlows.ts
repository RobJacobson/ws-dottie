import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

import { tanstackQueryOptions } from "@/shared/caching/config";
import { zodFetch } from "@/shared/fetching";
import type { TanStackOptions } from "@/shared/types";

// Import schemas from single-item endpoint
import { trafficFlowSchema } from "./getTrafficFlowById";

// ============================================================================
// CONSTANTS
// ============================================================================

const ENDPOINT =
  "/traffic/api/TrafficFlow/TrafficFlowREST.svc/GetTrafficFlowsAsJson";

// ============================================================================
// API FUNCTION
// ============================================================================

/**
 * Get all traffic flow data from WSDOT Traffic Flow API
 *
 * Retrieves current traffic flow readings from all flow stations.
 *
 * IMPORTANT: API Response Discrepancy
 * The actual WSDOT API returns FlowReadingValue as numeric values (0, 1, 2, 3, 4),
 * but the official WSDOT documentation shows string enum values:
 *     0=Unknown/NoData, 1=WideOpen, 2=Moderate, 3=Heavy, 4=StopAndGo
 * This schema uses the actual numeric values returned by the API.
 *
 * @param params - No parameters required
 * @returns Promise containing all traffic flow data
 * @throws {Error} When the API request fails or validation fails
 */
export const getTrafficFlows = async (
  params: GetTrafficFlowsParams
): Promise<TrafficFlow[]> => {
  return zodFetch(
    ENDPOINT,
    {
      input: getTrafficFlowsParamsSchema,
      output: trafficFlowArraySchema,
    },
    params
  );
};

// ============================================================================
// INPUT SCHEMA & TYPES
// ============================================================================

export const getTrafficFlowsParamsSchema = z
  .object({})
  .describe(
    "Parameters for getting all traffic flow data. No parameters required."
  );

export type GetTrafficFlowsParams = z.infer<typeof getTrafficFlowsParamsSchema>;

// ============================================================================
// OUTPUT SCHEMA & TYPES
// ============================================================================

export const trafficFlowArraySchema = z
  .array(trafficFlowSchema)
  .describe(
    "Array of traffic flow data for all active monitoring stations across Washington State highways. This collection provides comprehensive flow information that enables traffic monitoring, congestion analysis, and transportation planning."
  );

// Import types from single-item endpoint
import type { TrafficFlow } from "./getTrafficFlowById";

// ============================================================================
// REACT QUERY HOOK
// ============================================================================

/**
 * React Query hook for retrieving all traffic flow data
 *
 * Retrieves current traffic flow readings from all flow stations.
 *
 * @param params - No parameters required
 * @param options - Optional query options
 * @returns React Query result containing traffic flow data
 *
 * @example
 * ```typescript
 * const { data: trafficFlows } = useTrafficFlows({});
 * console.log(trafficFlows[0].FlowReadingValue); // "WideOpen"
 * ```
 */
export const useTrafficFlows = (
  params: GetTrafficFlowsParams,
  options?: TanStackOptions<TrafficFlow[]>
): UseQueryResult<TrafficFlow[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "traffic-flow", "getTrafficFlows", params],
    queryFn: () => getTrafficFlows(params),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
