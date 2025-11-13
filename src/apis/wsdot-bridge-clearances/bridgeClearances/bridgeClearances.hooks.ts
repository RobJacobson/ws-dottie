import {
  fetchBridgeClearances,
  fetchBridgeClearancesByRoute,
} from "./bridgeClearances.endpoints";

export const useBridgeClearances = fetchBridgeClearances.useQuery;
export const useBridgeClearancesByRoute = fetchBridgeClearancesByRoute.useQuery;
