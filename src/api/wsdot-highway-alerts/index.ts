// WSDOT Highway Alerts API exports
// Documentation: https://wsdot.wa.gov/traffic/api/Documentation/group___highway_alerts.html
// API Help: https://wsdot.wa.gov/traffic/api/HighwayAlerts/HighwayAlertsREST.svc/Help

// Export API functions
export {
  getHighwayAlertById,
  getHighwayAlerts,
  getHighwayAlertsByMapArea,
} from "./api";
// Input parameter types
export type {
  GetHighwayAlertByIdParams,
  GetHighwayAlertsByMapAreaParams,
  GetHighwayAlertsParams,
} from "./inputs";
// Export types
export type {
  HighwayAlert,
  RoadwayLocation,
} from "./outputs";
// Export React Query hooks
export {
  useHighwayAlertById,
  useHighwayAlerts,
  useHighwayAlertsByMapArea,
} from "./queries";
