// WSDOT Bridge Clearances API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/class_clearance.html

// API functions
export { getBridgeClearances } from "./api";
// React Query hooks
export { useBridgeClearances } from "./queries";
// Types inferred from Zod schemas
export type { BridgeDataGIS } from "./schemas";
