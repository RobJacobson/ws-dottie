// WSDOT Border Crossings API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___border_crossings.html

// API functions
export { getBorderCrossings } from "./api";
// React Query hooks
export { useBorderCrossings } from "./hook";
// TypeScript types
export type {
  BorderCrossingData,
  BorderCrossingLocation,
  BorderCrossingsResponse,
} from "./types";
