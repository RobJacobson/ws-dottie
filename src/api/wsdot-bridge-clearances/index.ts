// WSDOT Bridge Clearances API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html

// Input parameter types and types inferred from Zod schemas
export type {
  BridgeDataGIS,
  GetBridgeClearancesParams,
} from "./getBridgeClearances";
// API functions and React Query hooks
export {
  getBridgeClearances,
  useBridgeClearances,
} from "./getBridgeClearances";
