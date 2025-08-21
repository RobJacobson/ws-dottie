// WSDOT Traffic Flow API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___traffic_flow.html
// API Help: https://wsdot.wa.gov/traffic/api/TrafficFlow/TrafficFlowREST.svc/Help

// API functions
export {
  getTrafficFlowById,
  getTrafficFlows,
} from "./api";
// Input parameter types
export type {
  GetTrafficFlowByIdParams,
  GetTrafficFlowsParams,
} from "./inputs";
// Export types
export type {
  FlowStationLocation,
  TrafficFlow,
} from "./outputs";
// React Query hooks
export {
  useTrafficFlowById,
  useTrafficFlows,
} from "./queries";
