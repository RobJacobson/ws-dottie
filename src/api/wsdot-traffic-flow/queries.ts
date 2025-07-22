// WSDOT Traffic Flow API React Query hooks
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html
// API Help: https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc/Help

import { useQuery } from "@tanstack/react-query";

import { REACT_QUERY } from "@/shared/caching";

import { getTrafficFlowById, getTrafficFlows } from "./api";
import type { TrafficFlow } from "./types";

/**
 * React Query hook for retrieving all traffic flow data
 *
 * @returns React Query result containing traffic flow data
 *
 * @example
 * ```typescript
 * const { data: trafficFlows, isLoading, error } = useTrafficFlows();
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     {trafficFlows?.map(flow => (
 *       <div key={flow.FlowDataID}>
 *         <h3>{flow.FlowStationLocation.Description}</h3>
 *         <p>Flow Value: {flow.FlowReadingValue}</p>
 *         <p>Direction: {flow.FlowStationLocation.Direction}</p>
 *       </div>
 *     ))}
 *   </div>
 * );
 * ```
 */
export const useTrafficFlows = () => {
  return useQuery({
    queryKey: ["traffic-flows"],
    queryFn: getTrafficFlows,
    ...REACT_QUERY.MINUTE_UPDATES,
  });
};

/**
 * React Query hook for retrieving a specific traffic flow by ID
 *
 * @param flowDataId - The ID of the specific traffic flow station
 * @returns React Query result containing traffic flow data
 *
 * @example
 * ```typescript
 * const { data: trafficFlow, isLoading, error } = useTrafficFlowById(2482);
 *
 * if (isLoading) return <div>Loading...</div>;
 * if (error) return <div>Error: {error.message}</div>;
 *
 * return (
 *   <div>
 *     <h2>{trafficFlow?.FlowStationLocation.Description}</h2>
 *     <p>Flow Value: {trafficFlow?.FlowReadingValue}</p>
 *     <p>Direction: {trafficFlow?.FlowStationLocation.Direction}</p>
 *     <p>Region: {trafficFlow?.Region}</p>
 *   </div>
 * );
 * ```
 */
export const useTrafficFlowById = (
  flowDataId: number,
  options?: Parameters<typeof useQuery<TrafficFlow>>[0]
) => {
  return useQuery({
    queryKey: ["traffic-flow", "byId", flowDataId],
    queryFn: () => getTrafficFlowById(flowDataId),
    ...REACT_QUERY.MINUTE_UPDATES,
    enabled: flowDataId > 0,
    ...options,
  });
};
