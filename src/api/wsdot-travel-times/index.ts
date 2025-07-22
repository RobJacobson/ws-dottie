// WSDOT Travel Times API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___travel_times.html
// API Help: https://wsdot.wa.gov/traffic/api/TravelTimes/TravelTimesREST.svc/Help

// API functions
export {
  getTravelTimeById,
  getTravelTimes,
} from "./api";
// React Query hooks
export {
  useTravelTimeById,
  useTravelTimes,
} from "./queries";
// TypeScript types
export type {
  TravelTimeEndpoint,
  TravelTimeRoute,
  TravelTimesResponse,
} from "./types";
