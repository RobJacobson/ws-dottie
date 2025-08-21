// WSDOT Border Crossings API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___border_crossings.html

// API functions
export { getBorderCrossings } from "./api";
// Input parameter types
export type { GetBorderCrossingsParams } from "./inputs";
// Types inferred from Zod schemas
export type {
  BorderCrossingData,
  BorderCrossingLocation,
} from "./outputs";
// React Query hooks
export { useBorderCrossings } from "./queries";
