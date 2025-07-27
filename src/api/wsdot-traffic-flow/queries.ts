// WSDOT Traffic Flow API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html
// API Help: https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc/Help

import { useQuery } from "@tanstack/react-query";
import type { UseQueryResult } from "@tanstack/react-query";

import { tanstackQueryOptions } from "@/shared/caching/config";
import type { QueryOptionsWithoutKey } from "@/shared/types";

import { getTrafficFlowById, getTrafficFlows } from "./api";
import type { TrafficFlow } from "./types";

/**
 * React Query hook for retrieving all traffic flow data
 *
 * Retrieves current traffic flow readings from all flow stations.
 *
 * @param options - Optional query options
 * @returns React Query result containing traffic flow data
 *
 * @example
 * ```typescript
 * const { data: trafficFlows } = useTrafficFlows();
 * console.log(trafficFlows[0].FlowReadingValue); // 45
 * ```
 */
export const useTrafficFlows = (
  options?: QueryOptionsWithoutKey<TrafficFlow[]>
): UseQueryResult<TrafficFlow[], Error> => {
  return useQuery({
    queryKey: ["wsdot", "traffic-flow", "getTrafficFlows"],
    queryFn: () => getTrafficFlows(),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};

/**
 * React Query hook for retrieving a specific traffic flow by ID
 *
 * Returns detailed information about a specific traffic flow station
 * identified by its ID.
 *
 * @param params - Object containing flowDataID
 * @param params.flowDataID - The ID of the specific traffic flow station
 * @param options - Optional query options
 * @returns React Query result containing traffic flow data
 *
 * @example
 * ```typescript
 * const { data: trafficFlow } = useTrafficFlowById({ flowDataID: 2482 });
 * console.log(trafficFlow.FlowReadingValue); // 45
 * ```
 */
export const useTrafficFlowById = (
  params: { flowDataID: number },
  options?: QueryOptionsWithoutKey<TrafficFlow>
): UseQueryResult<TrafficFlow, Error> => {
  return useQuery({
    queryKey: [
      "wsdot",
      "traffic-flow",
      "getTrafficFlowById",
      params.flowDataID,
    ],
    queryFn: () => getTrafficFlowById({ flowDataID: params.flowDataID }),
    ...tanstackQueryOptions.MINUTE_UPDATES,
    ...options,
  });
};
